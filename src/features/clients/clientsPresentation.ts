import type {
  ClientClassification,
  ClientStatus,
  TaxIdentifierType,
} from "@/domain/client";
import type { StatusKey } from "@/components/ui/status-badge";

/** Rótulos e mapeamentos apenas de apresentação. Nenhuma regra de negócio aqui. */

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  active: "Ativo",
  inactive: "Inativo",
};

export const CLIENT_STATUS_BADGE: Record<ClientStatus, StatusKey> = {
  active: "concluido",
  inactive: "indisponivel",
};

export const CLIENT_CLASSIFICATION_LABELS: Record<ClientClassification, string> = {
  legal_entity: "Pessoa jurídica",
  individual: "Pessoa física",
  other: "Outro",
};

export const TAX_IDENTIFIER_TYPE_LABELS: Record<TaxIdentifierType, string> = {
  cnpj: "CNPJ",
  cpf: "CPF",
  foreign: "Identificador estrangeiro",
  other: "Outro identificador",
};

export type StatusFilterValue = "active" | "inactive" | "all";
export type ClassificationFilterValue = ClientClassification | "all";

export const STATUS_FILTER_OPTIONS: { value: StatusFilterValue; label: string }[] = [
  { value: "active", label: "Ativos" },
  { value: "inactive", label: "Inativos" },
  { value: "all", label: "Todos" },
];

export const CLASSIFICATION_FILTER_OPTIONS: {
  value: ClassificationFilterValue;
  label: string;
}[] = [
  { value: "all", label: "Todas" },
  { value: "legal_entity", label: "Pessoa jurídica" },
  { value: "individual", label: "Pessoa física" },
  { value: "other", label: "Outro" },
];

export function formatRecordCount(total: number): string {
  if (total === 0) return "Nenhum registro";
  return total === 1 ? "1 registro" : `${total} registros`;
}

export const CLIENT_UPDATED_NOTICE = "Cliente atualizado com sucesso.";

/** Textos de inativação e reativação — Camada 4 da SDD-CLI-001. */
export const CLIENT_INACTIVATE_TITLE = "Inativar cliente";
export const CLIENT_INACTIVATE_DESCRIPTION =
  "ficará indisponível para novas etapas de trabalho, permanecendo consultável. O histórico será preservado e nenhum registro será excluído.";
export const CLIENT_INACTIVATE_CONFIRM_LABEL = "Inativar cliente";

export const CLIENT_ACTIVATE_TITLE = "Reativar cliente";
export const CLIENT_ACTIVATE_DESCRIPTION =
  "voltará a ficar disponível para novas etapas de trabalho. O histórico permanece preservado.";
export const CLIENT_ACTIVATE_CONFIRM_LABEL = "Reativar cliente";

export const CLIENT_INACTIVATED_NOTICE =
  "Cliente inativado com sucesso. O histórico foi preservado.";
export const CLIENT_ACTIVATED_NOTICE = "Cliente reativado com sucesso.";

