import type { StatusKey } from "@/components/ui/status-badge";
import type { AuditEngagementStatus } from "@/domain/engagement";

export const ENGAGEMENT_STATUS_LABELS: Record<AuditEngagementStatus, string> = {
  draft: "Em elaboração",
  active: "Ativo",
  closed: "Encerrado",
  cancelled: "Cancelado",
};

export const ENGAGEMENT_STATUS_BADGES: Record<AuditEngagementStatus, StatusKey> = {
  draft: "em-construcao",
  active: "em-andamento",
  closed: "concluido",
  cancelled: "indisponivel",
};

export const ENGAGEMENT_CLASSIFICATION_LABELS = {
  audit: "Auditoria",
} as const;

export const ENGAGEMENT_STATUS_FILTER_OPTIONS: {
  value: AuditEngagementStatus | "all";
  label: string;
}[] = [
  { value: "all", label: "Todos" },
  { value: "draft", label: ENGAGEMENT_STATUS_LABELS.draft },
  { value: "active", label: ENGAGEMENT_STATUS_LABELS.active },
  { value: "closed", label: ENGAGEMENT_STATUS_LABELS.closed },
  { value: "cancelled", label: ENGAGEMENT_STATUS_LABELS.cancelled },
];

export const ENGAGEMENTS_READ_ONLY_NOTICE =
  "Consulta somente leitura. Criação, edição e mudanças de estado serão disponibilizadas em etapas posteriores.";

export const ENGAGEMENTS_FUTURE_STEPS_NOTICE =
  "Equipe, período e planejamento ainda não fazem parte desta etapa.";

export const ENGAGEMENT_CREATED_NOTICE = "Trabalho criado em elaboração com sucesso.";

export const ENGAGEMENT_CREATION_SCOPE_NOTICE =
  "A criação exige cliente ativo e avaliação ACE aprovada e aplicável. O trabalho nasce em elaboração.";

export function formatEngagementRecordCount(total: number): string {
  if (total === 0) return "Nenhum trabalho";
  return total === 1 ? "1 trabalho" : `${total} trabalhos`;
}

export function formatEngagementDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(value));
}
