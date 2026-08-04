import type { StatusKey } from "@/components/ui/status-badge";
import type {
  AcceptanceAssessment,
  AcceptanceAssessmentStatus,
  AcceptanceAssessmentType,
  AcceptanceConclusion,
} from "@/domain/acceptance";

/** Rótulos, mapeamentos e dados simulados de apresentação — Camada Visual 1 da SDD-ACE-001. */

export const ACCEPTANCE_PANEL_TITLE = "Aceitação e continuidade";

export const ACCEPTANCE_SIMULATION_NOTICE =
  "Avaliação em ambiente de validação. Os dados não serão gravados no banco oficial.";

export const ACCEPTANCE_TYPE_LABELS: Record<AcceptanceAssessmentType, string> = {
  acceptance: "Aceitação",
  continuance: "Continuidade",
};

export const ACCEPTANCE_STATUS_LABELS: Record<AcceptanceAssessmentStatus, string> = {
  draft: "Em elaboração",
  pending_review: "Aguardando decisão",
  approved: "Aprovada",
  rejected: "Rejeitada",
  cancelled: "Cancelada",
};

export const ACCEPTANCE_STATUS_BADGE: Record<AcceptanceAssessmentStatus, StatusKey> = {
  draft: "em-andamento",
  pending_review: "atencao",
  approved: "concluido",
  rejected: "erro",
  cancelled: "indisponivel",
};

export const ACCEPTANCE_CONCLUSION_LABELS: Record<AcceptanceConclusion, string> = {
  approved: "Aprovada",
  rejected: "Rejeitada",
};

export function formatAcceptanceDate(value?: string): string {
  if (!value) return "—";
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

export function formatAcceptanceDateTime(value?: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export function formatAcceptanceCount(total: number): string {
  if (total === 0) return "Nenhuma avaliação registrada";
  return total === 1 ? "1 avaliação simulada" : `${total} avaliações simuladas`;
}

/** ---- Dados de demonstração em memória (não persistidos) ---- */

function hashToScenario(value: string, buckets: number): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 100000;
  }
  return hash % buckets;
}

type SimulatedInput = {
  clientId: string;
  organizationId: string;
  preparedBy: string;
  decidedBy: string;
};

function baseAssessment(
  input: SimulatedInput,
  overrides: Partial<AcceptanceAssessment> & { id: string; assessmentDate: string },
): AcceptanceAssessment {
  const timestamp = `${overrides.assessmentDate}T12:00:00.000Z`;
  return {
    organizationId: input.organizationId,
    clientId: input.clientId,
    assessmentType: "acceptance",
    status: "draft",
    preparedBy: input.preparedBy,
    answers: [],
    transitions: [],
    createdAt: timestamp,
    updatedAt: timestamp,
    ...overrides,
  };
}

/**
 * Gera cenários simulados determinísticos por cliente, apenas para alimentar
 * a instância em memória do MockAcceptanceRepository.
 */
export function buildSimulatedAssessments(input: SimulatedInput): AcceptanceAssessment[] {
  const scenario = hashToScenario(input.clientId, 5);
  const firstId = `${input.clientId}-sim-1`;
  const secondId = `${input.clientId}-sim-2`;

  if (scenario === 0) return [];

  if (scenario === 1) {
    return [
      baseAssessment(input, {
        id: firstId,
        assessmentDate: "2026-02-10",
        assessmentType: "acceptance",
        status: "approved",
        conclusion: "approved",
        rationale: "Não foram identificados impedimentos preliminares.",
        submittedAt: "2026-02-11T13:00:00.000Z",
        submittedBy: input.preparedBy,
        decidedAt: "2026-02-12T18:30:00.000Z",
        decidedBy: input.decidedBy,
      }),
    ];
  }

  if (scenario === 2) {
    return [
      baseAssessment(input, {
        id: firstId,
        assessmentDate: "2025-03-05",
        assessmentType: "acceptance",
        status: "approved",
        conclusion: "approved",
        submittedAt: "2025-03-06T13:00:00.000Z",
        submittedBy: input.preparedBy,
        decidedAt: "2025-03-07T16:00:00.000Z",
        decidedBy: input.decidedBy,
      }),
      baseAssessment(input, {
        id: secondId,
        assessmentDate: "2026-06-18",
        assessmentType: "continuance",
        referencePeriod: "Exercício de 2026",
        status: "draft",
        previousAssessmentId: firstId,
      }),
    ];
  }

  if (scenario === 3) {
    return [
      baseAssessment(input, {
        id: firstId,
        assessmentDate: "2026-01-22",
        assessmentType: "acceptance",
        status: "rejected",
        conclusion: "rejected",
        rationale: "Limitação relevante de acesso a informações essenciais.",
        submittedAt: "2026-01-23T12:00:00.000Z",
        submittedBy: input.preparedBy,
        decidedAt: "2026-01-24T19:00:00.000Z",
        decidedBy: input.decidedBy,
      }),
    ];
  }

  return [
    baseAssessment(input, {
      id: firstId,
      assessmentDate: "2025-11-04",
      assessmentType: "acceptance",
      status: "rejected",
      conclusion: "rejected",
      rationale: "Pendências de integridade não esclarecidas na ocasião.",
      submittedAt: "2025-11-05T12:00:00.000Z",
      submittedBy: input.preparedBy,
      decidedAt: "2025-11-06T17:45:00.000Z",
      decidedBy: input.decidedBy,
    }),
    baseAssessment(input, {
      id: secondId,
      assessmentDate: "2026-07-15",
      assessmentType: "acceptance",
      referencePeriod: "Exercício de 2026",
      status: "pending_review",
      previousAssessmentId: firstId,
      reanalysisRationale: "Reanálise após esclarecimento das pendências anteriores.",
      submittedAt: "2026-07-16T11:20:00.000Z",
      submittedBy: input.preparedBy,
    }),
  ];
}
