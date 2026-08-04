import type { AcceptanceRepository } from "@/data/acceptanceRepository";
import {
  canTransitionAcceptanceAssessment,
  createAcceptanceAssessmentSchema,
  decisionRationaleSchema,
  evaluateAcceptanceCompleteness,
  getAcceptanceQuestion,
  isAcceptanceAnswerBlocking,
  saveAcceptanceAnswersSchema,
  transitionReasonSchema,
  validateAcceptanceAnswerInput,
  type AcceptanceAnswer,
  type AcceptanceAssessment,
  type AcceptanceAssessmentId,
  type AcceptanceAssessmentStatus,
  type AcceptanceConclusion,
  type CreateAcceptanceAssessmentInput,
  type SaveAcceptanceAnswerInput,
} from "@/domain/acceptance";
import type { OperationResult, RequestContext } from "@/domain/contracts";
import { createAppError } from "@/lib/app-error";

type MockAcceptanceRepositoryOptions = {
  seed?: AcceptanceAssessment[];
  activeClientIds?: string[];
  delayMs?: number;
};

function cloneAssessment(assessment: AcceptanceAssessment): AcceptanceAssessment {
  return structuredClone(assessment);
}

function requireContext(
  context: RequestContext,
): OperationResult<{ organizationId: string; userId: string }> {
  if (!context.organizationId || !context.userId) {
    return {
      ok: false,
      error: createAppError("UNAUTHORIZED", "O contexto organizacional não está disponível."),
    };
  }
  return { ok: true, data: { organizationId: context.organizationId, userId: context.userId } };
}

export class MockAcceptanceRepository implements AcceptanceRepository {
  private assessments: AcceptanceAssessment[];
  private readonly activeClientIds?: Set<string>;
  private readonly delayMs: number;

  public constructor(options: MockAcceptanceRepositoryOptions = {}) {
    this.assessments = (options.seed ?? []).map(cloneAssessment);
    this.activeClientIds = options.activeClientIds ? new Set(options.activeClientIds) : undefined;
    this.delayMs = Math.max(0, options.delayMs ?? 0);
  }

  private async wait(): Promise<void> {
    if (this.delayMs > 0) await new Promise((resolve) => setTimeout(resolve, this.delayMs));
  }

  private findOwned(
    organizationId: string,
    assessmentId: string,
  ): AcceptanceAssessment | undefined {
    return this.assessments.find(
      (assessment) =>
        assessment.id === assessmentId && assessment.organizationId === organizationId,
    );
  }

  private update(assessment: AcceptanceAssessment): AcceptanceAssessment {
    this.assessments = this.assessments.map((current) =>
      current.id === assessment.id ? assessment : current,
    );
    return cloneAssessment(assessment);
  }

  private transition(
    assessment: AcceptanceAssessment,
    toStatus: AcceptanceAssessmentStatus,
    userId: string,
    reason?: string,
  ): AcceptanceAssessment {
    const now = new Date().toISOString();
    return {
      ...assessment,
      status: toStatus,
      updatedAt: now,
      transitions: [
        ...assessment.transitions,
        {
          id: crypto.randomUUID(),
          fromStatus: assessment.status,
          toStatus,
          reason,
          performedBy: userId,
          performedAt: now,
        },
      ],
    };
  }

  public async listByClient(
    context: RequestContext,
    clientId: string,
  ): Promise<OperationResult<AcceptanceAssessment[]>> {
    await this.wait();
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const items = this.assessments
      .filter(
        (assessment) =>
          assessment.organizationId === authorized.data.organizationId &&
          assessment.clientId === clientId,
      )
      .sort((left, right) => right.assessmentDate.localeCompare(left.assessmentDate))
      .map(cloneAssessment);
    return { ok: true, data: items };
  }

  public async getById(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
  ): Promise<OperationResult<AcceptanceAssessment>> {
    await this.wait();
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const assessment = this.findOwned(authorized.data.organizationId, assessmentId);
    return assessment
      ? { ok: true, data: cloneAssessment(assessment) }
      : {
          ok: false,
          error: createAppError("NOT_FOUND", "Avaliação não encontrada.", true),
        };
  }

  public async create(
    context: RequestContext,
    input: CreateAcceptanceAssessmentInput,
  ): Promise<OperationResult<AcceptanceAssessment>> {
    await this.wait();
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const parsed = createAcceptanceAssessmentSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          parsed.error.issues[0]?.message ?? "Dados da avaliação inválidos.",
          true,
        ),
      };
    }
    if (this.activeClientIds && !this.activeClientIds.has(parsed.data.clientId)) {
      return {
        ok: false,
        error: createAppError("VALIDATION_ERROR", "O cliente precisa estar ativo.", true),
      };
    }

    const clientAssessments = this.assessments.filter(
      (assessment) =>
        assessment.organizationId === authorized.data.organizationId &&
        assessment.clientId === parsed.data.clientId,
    );
    const previous = parsed.data.previousAssessmentId
      ? this.findOwned(authorized.data.organizationId, parsed.data.previousAssessmentId)
      : undefined;
    if (parsed.data.assessmentType === "continuance") {
      if (
        !previous ||
        previous.clientId !== parsed.data.clientId ||
        previous.status !== "approved"
      ) {
        return {
          ok: false,
          error: createAppError(
            "VALIDATION_ERROR",
            "A continuidade exige avaliação anterior aprovada do mesmo cliente.",
            true,
          ),
        };
      }
    }
    if (parsed.data.assessmentType === "acceptance") {
      const approvedExists = clientAssessments.some(
        (assessment) => assessment.status === "approved",
      );
      if (approvedExists) {
        return {
          ok: false,
          error: createAppError(
            "CONFLICT",
            "Este cliente já foi aceito; utilize continuidade.",
            true,
          ),
        };
      }
      const openAssessmentExists = clientAssessments.some(
        (assessment) => assessment.status === "draft" || assessment.status === "pending_review",
      );
      if (openAssessmentExists) {
        return {
          ok: false,
          error: createAppError(
            "CONFLICT",
            "Este cliente já possui uma avaliação em andamento.",
            true,
          ),
        };
      }
      const rejectedExists = clientAssessments.some(
        (assessment) => assessment.status === "rejected",
      );
      if (rejectedExists) {
        const latestDecision = [...clientAssessments]
          .filter((assessment) => assessment.status === "rejected")
          .sort((left, right) =>
            (right.decidedAt ?? right.updatedAt).localeCompare(left.decidedAt ?? left.updatedAt),
          )[0];
        if (!latestDecision || previous?.id !== latestDecision.id) {
          return {
            ok: false,
            error: createAppError(
              "VALIDATION_ERROR",
              "A reanálise deve mencionar a decisão rejeitada anterior.",
              true,
            ),
          };
        }
      }
    }

    const now = new Date().toISOString();
    const assessment: AcceptanceAssessment = {
      id: crypto.randomUUID(),
      organizationId: authorized.data.organizationId,
      clientId: parsed.data.clientId,
      assessmentType: parsed.data.assessmentType,
      assessmentDate: parsed.data.assessmentDate,
      referencePeriod: parsed.data.referencePeriod || undefined,
      pendingSummary: parsed.data.pendingSummary || undefined,
      previousAssessmentId: parsed.data.previousAssessmentId,
      reanalysisRationale: parsed.data.reanalysisRationale || undefined,
      status: "draft",
      preparedBy: authorized.data.userId,
      answers: [],
      transitions: [
        {
          id: crypto.randomUUID(),
          toStatus: "draft",
          performedBy: authorized.data.userId,
          performedAt: now,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };
    this.assessments = [...this.assessments, assessment];
    return { ok: true, data: cloneAssessment(assessment) };
  }

  public async saveAnswers(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
    answers: SaveAcceptanceAnswerInput[],
  ): Promise<OperationResult<AcceptanceAssessment>> {
    await this.wait();
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const assessment = this.findOwned(authorized.data.organizationId, assessmentId);
    if (!assessment) {
      return { ok: false, error: createAppError("NOT_FOUND", "Avaliação não encontrada.", true) };
    }
    if (assessment.status !== "draft") {
      return {
        ok: false,
        error: createAppError(
          "CONFLICT",
          "Somente avaliações em rascunho podem ser alteradas.",
          true,
        ),
      };
    }
    const parsed = saveAcceptanceAnswersSchema.safeParse(answers);
    if (!parsed.success) {
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          parsed.error.issues[0]?.message ?? "Respostas inválidas.",
          true,
        ),
      };
    }
    const duplicated = parsed.data.find(
      (answer, index) =>
        parsed.data.findIndex((candidate) => candidate.questionCode === answer.questionCode) !==
        index,
    );
    if (duplicated) {
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          "Existe mais de uma resposta para a mesma questão.",
          true,
        ),
      };
    }
    for (const answer of parsed.data) {
      const validationMessage = validateAcceptanceAnswerInput(answer);
      if (validationMessage) {
        return {
          ok: false,
          error: createAppError("VALIDATION_ERROR", validationMessage, true),
        };
      }
    }

    const now = new Date().toISOString();
    const answerMap = new Map(assessment.answers.map((answer) => [answer.questionCode, answer]));
    for (const input of parsed.data) {
      const question = getAcceptanceQuestion(input.questionCode);
      const existing = answerMap.get(input.questionCode);
      const answer: AcceptanceAnswer = {
        id: existing?.id ?? crypto.randomUUID(),
        organizationId: assessment.organizationId,
        assessmentId: assessment.id,
        questionCode: question.code,
        questionVersion: question.version,
        questionTextSnapshot: question.text,
        answer: input.answer,
        comment: input.comment?.trim() || undefined,
        isBlocking: isAcceptanceAnswerBlocking(question, input.answer),
        answeredBy: authorized.data.userId,
        answeredAt: now,
      };
      answerMap.set(input.questionCode, answer);
    }
    return {
      ok: true,
      data: this.update({ ...assessment, answers: [...answerMap.values()], updatedAt: now }),
    };
  }

  public async submit(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
  ): Promise<OperationResult<AcceptanceAssessment>> {
    await this.wait();
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const assessment = this.findOwned(authorized.data.organizationId, assessmentId);
    if (!assessment)
      return { ok: false, error: createAppError("NOT_FOUND", "Avaliação não encontrada.", true) };
    if (!canTransitionAcceptanceAssessment(assessment.status, "pending_review")) {
      return {
        ok: false,
        error: createAppError("CONFLICT", "A avaliação não pode ser enviada neste estado.", true),
      };
    }
    const completeness = evaluateAcceptanceCompleteness(assessment.answers);
    if (!completeness.complete) {
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          "Responda corretamente todas as questões antes do envio.",
          true,
        ),
      };
    }
    const now = new Date().toISOString();
    const transitioned = this.transition(assessment, "pending_review", authorized.data.userId);
    return {
      ok: true,
      data: this.update({ ...transitioned, submittedAt: now, submittedBy: authorized.data.userId }),
    };
  }

  public async returnToDraft(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
    reason: string,
  ): Promise<OperationResult<AcceptanceAssessment>> {
    await this.wait();
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const parsedReason = transitionReasonSchema.safeParse(reason);
    if (!parsedReason.success)
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          parsedReason.error.issues[0]?.message ?? "Motivo inválido.",
          true,
        ),
      };
    const assessment = this.findOwned(authorized.data.organizationId, assessmentId);
    if (!assessment)
      return { ok: false, error: createAppError("NOT_FOUND", "Avaliação não encontrada.", true) };
    if (!canTransitionAcceptanceAssessment(assessment.status, "draft")) {
      return {
        ok: false,
        error: createAppError(
          "CONFLICT",
          "A avaliação não pode retornar para rascunho neste estado.",
          true,
        ),
      };
    }
    return {
      ok: true,
      data: this.update(
        this.transition(assessment, "draft", authorized.data.userId, parsedReason.data),
      ),
    };
  }

  public async decide(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
    conclusion: AcceptanceConclusion,
    rationale: string,
  ): Promise<OperationResult<AcceptanceAssessment>> {
    await this.wait();
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const parsedRationale = decisionRationaleSchema.safeParse(rationale);
    if (!parsedRationale.success)
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          parsedRationale.error.issues[0]?.message ?? "Justificativa inválida.",
          true,
        ),
      };
    const assessment = this.findOwned(authorized.data.organizationId, assessmentId);
    if (!assessment)
      return { ok: false, error: createAppError("NOT_FOUND", "Avaliação não encontrada.", true) };
    if (!canTransitionAcceptanceAssessment(assessment.status, conclusion)) {
      return {
        ok: false,
        error: createAppError("CONFLICT", "A avaliação não pode ser decidida neste estado.", true),
      };
    }
    const completeness = evaluateAcceptanceCompleteness(assessment.answers);
    if (!completeness.complete)
      return {
        ok: false,
        error: createAppError("VALIDATION_ERROR", "A avaliação está incompleta.", true),
      };
    if (conclusion === "approved" && completeness.blockingQuestionCodes.length > 0) {
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          "Existem respostas impeditivas que bloqueiam a aprovação.",
          true,
        ),
      };
    }
    const now = new Date().toISOString();
    const transitioned = this.transition(assessment, conclusion, authorized.data.userId);
    return {
      ok: true,
      data: this.update({
        ...transitioned,
        conclusion,
        rationale: parsedRationale.data,
        decidedAt: now,
        decidedBy: authorized.data.userId,
      }),
    };
  }

  public async cancel(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
    reason: string,
  ): Promise<OperationResult<AcceptanceAssessment>> {
    await this.wait();
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const parsedReason = transitionReasonSchema.safeParse(reason);
    if (!parsedReason.success)
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          parsedReason.error.issues[0]?.message ?? "Motivo inválido.",
          true,
        ),
      };
    const assessment = this.findOwned(authorized.data.organizationId, assessmentId);
    if (!assessment)
      return { ok: false, error: createAppError("NOT_FOUND", "Avaliação não encontrada.", true) };
    if (!canTransitionAcceptanceAssessment(assessment.status, "cancelled")) {
      return {
        ok: false,
        error: createAppError("CONFLICT", "Somente rascunhos podem ser cancelados.", true),
      };
    }
    const now = new Date().toISOString();
    const transitioned = this.transition(
      assessment,
      "cancelled",
      authorized.data.userId,
      parsedReason.data,
    );
    return {
      ok: true,
      data: this.update({ ...transitioned, cancelledAt: now, cancelledBy: authorized.data.userId }),
    };
  }

  public async getApplicable(
    context: RequestContext,
    clientId: string,
    referencePeriod?: string,
  ): Promise<OperationResult<AcceptanceAssessment | null>> {
    await this.wait();
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const finalDecisions = this.assessments
      .filter(
        (assessment) =>
          assessment.organizationId === authorized.data.organizationId &&
          assessment.clientId === clientId &&
          (assessment.status === "approved" || assessment.status === "rejected") &&
          (!referencePeriod ||
            !assessment.referencePeriod ||
            assessment.referencePeriod === referencePeriod),
      )
      .sort((left, right) => {
        const leftDate = left.decidedAt ?? left.assessmentDate;
        const rightDate = right.decidedAt ?? right.assessmentDate;
        return rightDate.localeCompare(leftDate);
      });
    const latestDecision = finalDecisions[0];
    return {
      ok: true,
      data: latestDecision?.status === "approved" ? cloneAssessment(latestDecision) : null,
    };
  }
}
