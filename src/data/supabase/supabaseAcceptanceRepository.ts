import type { SupabaseClient } from "@supabase/supabase-js";

import type { AcceptanceRepository } from "@/data/acceptanceRepository";
import {
  createAcceptanceAssessmentSchema,
  decisionRationaleSchema,
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
import { createAppError, unexpectedError, type AppError } from "@/lib/app-error";
import { getSupabaseBrowserClient } from "@/data/supabase/supabaseClient";

type SupabaseErrorLike = {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
  status?: number;
};

type SupabaseResponse<T> = {
  data: T;
  error: SupabaseErrorLike | null;
  count?: number | null;
};

type AcceptanceAnswerRow = {
  id: string;
  organization_id: string;
  assessment_id: string;
  question_code: AcceptanceAnswer["questionCode"];
  question_version: number;
  question_text_snapshot: string;
  answer: AcceptanceAnswer["answer"] | null;
  comment: string | null;
  is_blocking: boolean;
  answered_by: string | null;
  answered_at: string | null;
};

type AcceptanceTransitionRow = {
  id?: string;
  fromStatus?: AcceptanceAssessmentStatus | null;
  toStatus?: AcceptanceAssessmentStatus;
  reason?: string | null;
  performedBy?: string;
  performedAt?: string;
};

type AcceptanceAssessmentRow = {
  id: string;
  organization_id: string;
  client_id: string;
  assessment_type: AcceptanceAssessment["assessmentType"];
  assessment_date: string;
  reference_period: string | null;
  status: AcceptanceAssessmentStatus;
  conclusion: AcceptanceConclusion | null;
  rationale: string | null;
  pending_summary: string | null;
  previous_assessment_id: string | null;
  reanalysis_rationale: string | null;
  prepared_by: string;
  submitted_at: string | null;
  submitted_by: string | null;
  decided_at: string | null;
  decided_by: string | null;
  cancelled_at: string | null;
  cancelled_by: string | null;
  transition_history: AcceptanceTransitionRow[] | null;
  created_at: string;
  updated_at: string;
  acceptance_assessment_answers?: AcceptanceAnswerRow[] | null;
};

type RpcResult = string;

function failure<T>(error: AppError): OperationResult<T> {
  return { ok: false, error };
}

function requireContext(
  context: RequestContext,
): OperationResult<{ organizationId: string; userId: string }> {
  if (!context.organizationId || !context.userId) {
    return failure(
      createAppError("UNAUTHORIZED", "O contexto organizacional não está disponível."),
    );
  }

  return {
    ok: true,
    data: { organizationId: context.organizationId, userId: context.userId },
  };
}

function mapTransition(row: AcceptanceTransitionRow): AcceptanceAssessment["transitions"][number] {
  return {
    id: row.id ?? crypto.randomUUID(),
    fromStatus: row.fromStatus ?? undefined,
    toStatus: row.toStatus ?? "draft",
    reason: row.reason ?? undefined,
    performedBy: row.performedBy ?? "",
    performedAt: row.performedAt ?? "",
  };
}

function mapAnswer(row: AcceptanceAnswerRow): AcceptanceAnswer | null {
  if (!row.answer || !row.answered_by || !row.answered_at) return null;

  return {
    id: row.id,
    organizationId: row.organization_id,
    assessmentId: row.assessment_id,
    questionCode: row.question_code,
    questionVersion: row.question_version,
    questionTextSnapshot: row.question_text_snapshot,
    answer: row.answer,
    comment: row.comment ?? undefined,
    isBlocking: row.is_blocking,
    answeredBy: row.answered_by,
    answeredAt: row.answered_at,
  };
}

function mapAssessment(row: AcceptanceAssessmentRow): AcceptanceAssessment {
  const answers = (row.acceptance_assessment_answers ?? [])
    .map(mapAnswer)
    .filter((answer): answer is AcceptanceAnswer => answer !== null);

  return {
    id: row.id,
    organizationId: row.organization_id,
    clientId: row.client_id,
    assessmentType: row.assessment_type,
    assessmentDate: row.assessment_date,
    referencePeriod: row.reference_period ?? undefined,
    status: row.status,
    conclusion: row.conclusion ?? undefined,
    rationale: row.rationale ?? undefined,
    pendingSummary: row.pending_summary ?? undefined,
    previousAssessmentId: row.previous_assessment_id ?? undefined,
    reanalysisRationale: row.reanalysis_rationale ?? undefined,
    preparedBy: row.prepared_by,
    submittedAt: row.submitted_at ?? undefined,
    submittedBy: row.submitted_by ?? undefined,
    decidedAt: row.decided_at ?? undefined,
    decidedBy: row.decided_by ?? undefined,
    cancelledAt: row.cancelled_at ?? undefined,
    cancelledBy: row.cancelled_by ?? undefined,
    answers,
    transitions: (row.transition_history ?? []).map(mapTransition),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseError(error: SupabaseErrorLike): AppError {
  if (error.code === "23505") {
    return createAppError(
      "CONFLICT",
      "Já existe uma avaliação em andamento ou uma decisão incompatível para este cliente.",
      true,
      error,
    );
  }

  if (error.code === "23514" || error.code === "22023") {
    return createAppError(
      "VALIDATION_ERROR",
      "Os dados ou a transição da avaliação não são válidos.",
      true,
      error,
    );
  }

  if (error.code === "PGRST301" || error.status === 401) {
    return createAppError(
      "UNAUTHORIZED",
      "Sua sessão não está disponível. Entre novamente para continuar.",
      true,
      error,
    );
  }

  if (error.code === "42501" || error.status === 403) {
    return createAppError(
      "FORBIDDEN",
      "Você não possui permissão para operar avaliações neste contexto.",
      false,
      error,
    );
  }

  if (error.code === "PGRST202") {
    return createAppError(
      "CONFIGURATION_ERROR",
      "A operação oficial da avaliação ainda não está disponível neste ambiente.",
      false,
      error,
    );
  }

  return unexpectedError(error);
}

function mapCaughtError(error: unknown): AppError {
  if (
    error instanceof Error &&
    error.message.includes("Supabase authentication is not configured")
  ) {
    return createAppError(
      "CONFIGURATION_ERROR",
      "A conexão com o ambiente oficial ainda não está disponível.",
      false,
      error,
    );
  }

  if (error instanceof TypeError) {
    return createAppError(
      "NETWORK_ERROR",
      "Não foi possível comunicar com o ambiente oficial. Tente novamente.",
      true,
      error,
    );
  }

  return unexpectedError(error);
}

async function execute<T>(
  operation: () => Promise<SupabaseResponse<T>>,
): Promise<OperationResult<{ data: T; count?: number | null }>> {
  try {
    const response = await operation();
    if (response.error) return failure(mapSupabaseError(response.error));
    return { ok: true, data: { data: response.data, count: response.count } };
  } catch (error) {
    return failure(mapCaughtError(error));
  }
}

function parseAnswers(
  answers: SaveAcceptanceAnswerInput[],
): OperationResult<SaveAcceptanceAnswerInput[]> {
  const parsed = saveAcceptanceAnswersSchema.safeParse(answers);
  if (!parsed.success) {
    return failure(
      createAppError(
        "VALIDATION_ERROR",
        parsed.error.issues[0]?.message ?? "Respostas inválidas.",
        true,
      ),
    );
  }

  const duplicated = parsed.data.find(
    (answer, index) =>
      parsed.data.findIndex((candidate) => candidate.questionCode === answer.questionCode) !==
      index,
  );
  if (duplicated) {
    return failure(
      createAppError("VALIDATION_ERROR", "Existe mais de uma resposta para a mesma questão.", true),
    );
  }

  for (const answer of parsed.data) {
    const validationMessage = validateAcceptanceAnswerInput(answer);
    if (validationMessage) {
      return failure(createAppError("VALIDATION_ERROR", validationMessage, true));
    }
  }

  return { ok: true, data: parsed.data };
}

export function createSupabaseAcceptanceRepository(
  supabase: SupabaseClient = getSupabaseBrowserClient(),
): AcceptanceRepository {
  const selectWithAnswers =
    "*, acceptance_assessment_answers(*)" as const;

  async function getById(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
  ): Promise<OperationResult<AcceptanceAssessment>> {
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;

    const result = await execute(async () =>
      supabase
        .from("acceptance_assessments")
        .select(selectWithAnswers)
        .eq("organization_id", authorized.data.organizationId)
        .eq("id", assessmentId)
        .maybeSingle(),
    );
    if (!result.ok) return result;
    if (!result.data.data) {
      return failure(createAppError("NOT_FOUND", "Avaliação não encontrada.", true));
    }

    return { ok: true, data: mapAssessment(result.data.data as AcceptanceAssessmentRow) };
  }

  async function callRpc(name: string, args: Record<string, unknown>): Promise<OperationResult<RpcResult>> {
    const result = await execute(async () => supabase.rpc(name, args));
    if (!result.ok) return result;
    if (typeof result.data.data !== "string") return failure(unexpectedError(result.data.data));
    return { ok: true, data: result.data.data };
  }

  async function refresh(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
  ): Promise<OperationResult<AcceptanceAssessment>> {
    return getById(context, assessmentId);
  }

  return {
    async listByClient(
      context: RequestContext,
      clientId: string,
    ): Promise<OperationResult<AcceptanceAssessment[]>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const result = await execute(async () =>
        supabase
          .from("acceptance_assessments")
          .select(selectWithAnswers)
          .eq("organization_id", authorized.data.organizationId)
          .eq("client_id", clientId)
          .order("assessment_date", { ascending: false })
          .order("created_at", { ascending: false }),
      );
      if (!result.ok) return result;

      const rows = (result.data.data ?? []) as AcceptanceAssessmentRow[];
      return { ok: true, data: rows.map(mapAssessment) };
    },

    getById,

    async create(
      context: RequestContext,
      input: CreateAcceptanceAssessmentInput,
    ): Promise<OperationResult<AcceptanceAssessment>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const parsed = createAcceptanceAssessmentSchema.safeParse(input);
      if (!parsed.success) {
        return failure(
          createAppError(
            "VALIDATION_ERROR",
            parsed.error.issues[0]?.message ?? "Dados da avaliação inválidos.",
            true,
          ),
        );
      }

      const created = await callRpc("create_acceptance_assessment", {
        p_client_id: parsed.data.clientId,
        p_assessment_type: parsed.data.assessmentType,
        p_assessment_date: parsed.data.assessmentDate,
        p_reference_period: parsed.data.referencePeriod ?? null,
        p_pending_summary: parsed.data.pendingSummary ?? null,
        p_previous_assessment_id: parsed.data.previousAssessmentId ?? null,
        p_reanalysis_rationale: parsed.data.reanalysisRationale ?? null,
      });
      if (!created.ok) return created;

      return refresh(authorized.data, created.data);
    },

    async saveAnswers(
      context: RequestContext,
      assessmentId: AcceptanceAssessmentId,
      answers: SaveAcceptanceAnswerInput[],
    ): Promise<OperationResult<AcceptanceAssessment>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;
      const parsed = parseAnswers(answers);
      if (!parsed.ok) return parsed;

      const saved = await callRpc("save_acceptance_answers", {
        p_assessment_id: assessmentId,
        p_answers: parsed.data.map((answer) => ({
          questionCode: answer.questionCode,
          answer: answer.answer,
          comment: answer.comment?.trim() || null,
        })),
      });
      if (!saved.ok) return saved;

      return refresh(authorized.data, saved.data);
    },

    async submit(
      context: RequestContext,
      assessmentId: AcceptanceAssessmentId,
    ): Promise<OperationResult<AcceptanceAssessment>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;
      const submitted = await callRpc("submit_acceptance_assessment", {
        p_assessment_id: assessmentId,
      });
      if (!submitted.ok) return submitted;
      return refresh(authorized.data, submitted.data);
    },

    async returnToDraft(
      context: RequestContext,
      assessmentId: AcceptanceAssessmentId,
      reason: string,
    ): Promise<OperationResult<AcceptanceAssessment>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;
      const parsed = transitionReasonSchema.safeParse(reason);
      if (!parsed.success) {
        return failure(
          createAppError(
            "VALIDATION_ERROR",
            parsed.error.issues[0]?.message ?? "Motivo inválido.",
            true,
          ),
        );
      }

      const returned = await callRpc("return_acceptance_assessment_to_draft", {
        p_assessment_id: assessmentId,
        p_reason: parsed.data,
      });
      if (!returned.ok) return returned;
      return refresh(authorized.data, returned.data);
    },

    async decide(
      context: RequestContext,
      assessmentId: AcceptanceAssessmentId,
      conclusion: AcceptanceConclusion,
      rationale: string,
    ): Promise<OperationResult<AcceptanceAssessment>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;
      const parsed = decisionRationaleSchema.safeParse(rationale);
      if (!parsed.success) {
        return failure(
          createAppError(
            "VALIDATION_ERROR",
            parsed.error.issues[0]?.message ?? "Justificativa inválida.",
            true,
          ),
        );
      }

      const decided = await callRpc("decide_acceptance_assessment", {
        p_assessment_id: assessmentId,
        p_conclusion: conclusion,
        p_rationale: parsed.data,
      });
      if (!decided.ok) return decided;
      return refresh(authorized.data, decided.data);
    },

    async cancel(
      context: RequestContext,
      assessmentId: AcceptanceAssessmentId,
      reason: string,
    ): Promise<OperationResult<AcceptanceAssessment>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;
      const parsed = transitionReasonSchema.safeParse(reason);
      if (!parsed.success) {
        return failure(
          createAppError(
            "VALIDATION_ERROR",
            parsed.error.issues[0]?.message ?? "Motivo inválido.",
            true,
          ),
        );
      }

      const cancelled = await callRpc("cancel_acceptance_assessment", {
        p_assessment_id: assessmentId,
        p_reason: parsed.data,
      });
      if (!cancelled.ok) return cancelled;
      return refresh(authorized.data, cancelled.data);
    },

    async getApplicable(
      context: RequestContext,
      clientId: string,
      referencePeriod?: string,
    ): Promise<OperationResult<AcceptanceAssessment | null>> {
      const listed = await this.listByClient(context, clientId);
      if (!listed.ok) return listed;

      const finalDecisions = listed.data
        .filter(
          (assessment) =>
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
        data: latestDecision?.status === "approved" ? latestDecision : null,
      };
    },
  };
}
