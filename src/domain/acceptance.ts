import { z } from "zod";

import type { EntityId, EntityMetadata } from "@/domain/contracts";

export const acceptanceAssessmentTypes = ["acceptance", "continuance"] as const;
export type AcceptanceAssessmentType = (typeof acceptanceAssessmentTypes)[number];

export const acceptanceAssessmentStatuses = [
  "draft",
  "pending_review",
  "approved",
  "rejected",
  "cancelled",
] as const;
export type AcceptanceAssessmentStatus = (typeof acceptanceAssessmentStatuses)[number];

export const acceptanceConclusions = ["approved", "rejected"] as const;
export type AcceptanceConclusion = (typeof acceptanceConclusions)[number];

export const acceptanceAnswerValues = ["yes", "no", "not_applicable", "unknown"] as const;
export type AcceptanceAnswerValue = (typeof acceptanceAnswerValues)[number];

export const acceptanceQuestionCodes = [
  "ACE-CLI-001",
  "ACE-INT-001",
  "ACE-IND-001",
  "ACE-CAP-001",
  "ACE-REC-001",
  "ACE-ESC-001",
  "ACE-INF-001",
  "ACE-ANT-001",
] as const;
export type AcceptanceQuestionCode = (typeof acceptanceQuestionCodes)[number];

export const ACCEPTANCE_QUESTIONNAIRE_VERSION = 1;

export type AcceptanceQuestion = {
  code: AcceptanceQuestionCode;
  version: number;
  topic: string;
  text: string;
  blockingAnswers: readonly AcceptanceAnswerValue[];
  allowsNotApplicable: boolean;
};

export const acceptanceQuestionnaire: readonly AcceptanceQuestion[] = [
  {
    code: "ACE-CLI-001",
    version: ACCEPTANCE_QUESTIONNAIRE_VERSION,
    topic: "Identificação",
    text: "As informações cadastrais essenciais do cliente foram verificadas e são suficientes para esta decisão?",
    blockingAnswers: ["no", "unknown"],
    allowsNotApplicable: false,
  },
  {
    code: "ACE-INT-001",
    version: ACCEPTANCE_QUESTIONNAIRE_VERSION,
    topic: "Integridade",
    text: "Não foram identificadas informações conhecidas que impeçam o relacionamento com a administração ou os responsáveis pelo cliente?",
    blockingAnswers: ["no", "unknown"],
    allowsNotApplicable: false,
  },
  {
    code: "ACE-IND-001",
    version: ACCEPTANCE_QUESTIONNAIRE_VERSION,
    topic: "Independência",
    text: "Não existe conflito, ameaça ou impedimento conhecido que inviabilize a aceitação ou continuidade?",
    blockingAnswers: ["no", "unknown"],
    allowsNotApplicable: false,
  },
  {
    code: "ACE-CAP-001",
    version: ACCEPTANCE_QUESTIONNAIRE_VERSION,
    topic: "Competência",
    text: "A organização possui ou poderá obter competência técnica compatível com o serviço pretendido?",
    blockingAnswers: ["no", "unknown"],
    allowsNotApplicable: false,
  },
  {
    code: "ACE-REC-001",
    version: ACCEPTANCE_QUESTIONNAIRE_VERSION,
    topic: "Recursos",
    text: "Existem condições preliminares de tempo e recursos para realizar o trabalho com qualidade?",
    blockingAnswers: ["no", "unknown"],
    allowsNotApplicable: false,
  },
  {
    code: "ACE-ESC-001",
    version: ACCEPTANCE_QUESTIONNAIRE_VERSION,
    topic: "Escopo",
    text: "O objetivo e o escopo preliminar pretendidos são compreensíveis e compatíveis com a atuação da organização?",
    blockingAnswers: ["no", "unknown"],
    allowsNotApplicable: false,
  },
  {
    code: "ACE-INF-001",
    version: ACCEPTANCE_QUESTIONNAIRE_VERSION,
    topic: "Informações",
    text: "Não existe limitação conhecida ao acesso às informações necessárias para avaliar ou realizar o trabalho?",
    blockingAnswers: ["no", "unknown"],
    allowsNotApplicable: false,
  },
  {
    code: "ACE-ANT-001",
    version: ACCEPTANCE_QUESTIONNAIRE_VERSION,
    topic: "Relacionamento anterior",
    text: "Quando aplicável, assuntos relevantes de trabalhos ou avaliações anteriores foram considerados?",
    blockingAnswers: ["no", "unknown"],
    allowsNotApplicable: true,
  },
] as const;

export type AcceptanceAnswer = {
  id: EntityId;
  organizationId: string;
  assessmentId: EntityId;
  questionCode: AcceptanceQuestionCode;
  questionVersion: number;
  questionTextSnapshot: string;
  answer: AcceptanceAnswerValue;
  comment?: string;
  isBlocking: boolean;
  answeredBy: string;
  answeredAt: string;
};

export type AcceptanceTransition = {
  id: EntityId;
  fromStatus?: AcceptanceAssessmentStatus;
  toStatus: AcceptanceAssessmentStatus;
  reason?: string;
  performedBy: string;
  performedAt: string;
};

export type AcceptanceAssessment = EntityMetadata & {
  organizationId: string;
  clientId: string;
  assessmentType: AcceptanceAssessmentType;
  assessmentDate: string;
  referencePeriod?: string;
  status: AcceptanceAssessmentStatus;
  conclusion?: AcceptanceConclusion;
  rationale?: string;
  pendingSummary?: string;
  previousAssessmentId?: EntityId;
  reanalysisRationale?: string;
  preparedBy: string;
  submittedAt?: string;
  submittedBy?: string;
  decidedAt?: string;
  decidedBy?: string;
  cancelledAt?: string;
  cancelledBy?: string;
  answers: AcceptanceAnswer[];
  transitions: AcceptanceTransition[];
};

const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Informe uma data válida.");

export const createAcceptanceAssessmentSchema = z
  .object({
    clientId: z.string().uuid("Cliente inválido."),
    assessmentType: z.enum(acceptanceAssessmentTypes),
    assessmentDate: isoDateSchema,
    referencePeriod: z.string().trim().max(80).optional(),
    pendingSummary: z.string().trim().max(4000).optional(),
    previousAssessmentId: z.string().uuid("Avaliação anterior inválida.").optional(),
    reanalysisRationale: z.string().trim().max(4000).optional(),
  })
  .superRefine((input, context) => {
    if (input.assessmentType === "continuance" && !input.previousAssessmentId) {
      context.addIssue({
        code: "custom",
        path: ["previousAssessmentId"],
        message: "A continuidade exige uma avaliação anterior.",
      });
    }
    if (
      input.assessmentType === "acceptance" &&
      input.previousAssessmentId &&
      !input.reanalysisRationale?.trim()
    ) {
      context.addIssue({
        code: "custom",
        path: ["reanalysisRationale"],
        message: "Justifique a reanálise após a decisão anterior.",
      });
    }
  });
export type CreateAcceptanceAssessmentInput = z.input<typeof createAcceptanceAssessmentSchema>;

export const saveAcceptanceAnswerSchema = z.object({
  questionCode: z.enum(acceptanceQuestionCodes),
  answer: z.enum(acceptanceAnswerValues),
  comment: z.string().trim().max(4000).optional(),
});
export const saveAcceptanceAnswersSchema = z.array(saveAcceptanceAnswerSchema).min(1);
export type SaveAcceptanceAnswerInput = z.input<typeof saveAcceptanceAnswerSchema>;

export const transitionReasonSchema = z.string().trim().min(1, "Informe o motivo.").max(4000);
export const decisionRationaleSchema = z
  .string()
  .trim()
  .min(1, "Informe a justificativa da decisão.")
  .max(8000);

export function getAcceptanceQuestion(code: AcceptanceQuestionCode): AcceptanceQuestion {
  return acceptanceQuestionnaire.find((question) => question.code === code)!;
}

export function isAcceptanceCommentRequired(
  question: AcceptanceQuestion,
  answer: AcceptanceAnswerValue,
): boolean {
  return answer === "no" || answer === "unknown" || answer === "not_applicable";
}

export function isAcceptanceAnswerBlocking(
  question: AcceptanceQuestion,
  answer: AcceptanceAnswerValue,
): boolean {
  return question.blockingAnswers.includes(answer);
}

export function validateAcceptanceAnswerInput(input: SaveAcceptanceAnswerInput): string | null {
  const parsed = saveAcceptanceAnswerSchema.safeParse(input);
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Resposta inválida.";
  const question = getAcceptanceQuestion(parsed.data.questionCode);
  if (parsed.data.answer === "not_applicable" && !question.allowsNotApplicable) {
    return "A resposta não se aplica não é permitida para esta questão.";
  }
  if (isAcceptanceCommentRequired(question, parsed.data.answer) && !parsed.data.comment?.trim()) {
    return "Informe um comentário para esta resposta.";
  }
  return null;
}

export type AcceptanceCompleteness = {
  complete: boolean;
  missingQuestionCodes: AcceptanceQuestionCode[];
  invalidQuestionCodes: AcceptanceQuestionCode[];
  blockingQuestionCodes: AcceptanceQuestionCode[];
};

export function evaluateAcceptanceCompleteness(
  answers: readonly (AcceptanceAnswer | SaveAcceptanceAnswerInput)[],
): AcceptanceCompleteness {
  const byCode = new Map(answers.map((answer) => [answer.questionCode, answer]));
  const missingQuestionCodes: AcceptanceQuestionCode[] = [];
  const invalidQuestionCodes: AcceptanceQuestionCode[] = [];
  const blockingQuestionCodes: AcceptanceQuestionCode[] = [];

  for (const question of acceptanceQuestionnaire) {
    const answer = byCode.get(question.code);
    if (!answer) {
      missingQuestionCodes.push(question.code);
      continue;
    }
    if (validateAcceptanceAnswerInput(answer)) invalidQuestionCodes.push(question.code);
    if (isAcceptanceAnswerBlocking(question, answer.answer))
      blockingQuestionCodes.push(question.code);
  }

  return {
    complete: missingQuestionCodes.length === 0 && invalidQuestionCodes.length === 0,
    missingQuestionCodes,
    invalidQuestionCodes,
    blockingQuestionCodes,
  };
}

const allowedTransitions: Record<
  AcceptanceAssessmentStatus,
  readonly AcceptanceAssessmentStatus[]
> = {
  draft: ["pending_review", "cancelled"],
  pending_review: ["draft", "approved", "rejected"],
  approved: [],
  rejected: [],
  cancelled: [],
};

export function canTransitionAcceptanceAssessment(
  from: AcceptanceAssessmentStatus,
  to: AcceptanceAssessmentStatus,
): boolean {
  return allowedTransitions[from].includes(to);
}

export type AcceptanceAssessmentId = EntityId;
