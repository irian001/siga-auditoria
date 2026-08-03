import { z } from "zod";

import type { EntityId, EntityMetadata } from "@/domain/contracts";

export const clientStatuses = ["active", "inactive"] as const;
export type ClientStatus = (typeof clientStatuses)[number];

export const clientClassifications = ["legal_entity", "individual", "other"] as const;
export type ClientClassification = (typeof clientClassifications)[number];

export const taxIdentifierTypes = ["cnpj", "cpf", "foreign", "other"] as const;
export type TaxIdentifierType = (typeof taxIdentifierTypes)[number];

export type Client = EntityMetadata & {
  organizationId: string;
  displayName: string;
  legalName: string;
  taxIdentifierType: TaxIdentifierType;
  taxIdentifier?: string;
  classification: ClientClassification;
  status: ClientStatus;
  createdBy: string;
  updatedBy: string;
  inactivatedAt?: string;
  inactivatedBy?: string;
};

export type ClientFilters = {
  status?: ClientStatus;
  classification?: ClientClassification;
  search?: string;
};

export function normalizeBrazilianTaxIdentifier(value: string): string {
  return value.replace(/\D/g, "");
}

function hasRepeatedDigits(value: string): boolean {
  return /^(\d)\1+$/.test(value);
}

export function isValidCpf(value: string): boolean {
  const digits = normalizeBrazilianTaxIdentifier(value);
  if (digits.length !== 11 || hasRepeatedDigits(digits)) return false;

  const calculateDigit = (length: number): number => {
    let total = 0;
    for (let index = 0; index < length; index += 1) {
      total += Number(digits[index]) * (length + 1 - index);
    }
    const remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return calculateDigit(9) === Number(digits[9]) && calculateDigit(10) === Number(digits[10]);
}

export function isValidCnpj(value: string): boolean {
  const digits = normalizeBrazilianTaxIdentifier(value);
  if (digits.length !== 14 || hasRepeatedDigits(digits)) return false;

  const calculateDigit = (length: number): number => {
    let factor = length - 7;
    let total = 0;
    for (let index = 0; index < length; index += 1) {
      total += Number(digits[index]) * factor;
      factor = factor === 2 ? 9 : factor - 1;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  return calculateDigit(12) === Number(digits[12]) && calculateDigit(13) === Number(digits[13]);
}

export function formatTaxIdentifier(type: TaxIdentifierType, value?: string): string {
  if (!value) return "Não informado";
  if (type === "cnpj") {
    const digits = normalizeBrazilianTaxIdentifier(value);
    return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }
  if (type === "cpf") {
    const digits = normalizeBrazilianTaxIdentifier(value);
    return digits.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  }
  return value;
}

export function maskTaxIdentifier(type: TaxIdentifierType, value?: string): string {
  if (!value) return "Não informado";
  const formatted = formatTaxIdentifier(type, value);
  if (type === "cnpj") return formatted.replace(/^\d{2}\.\d{3}/, "**.***");
  if (type === "cpf") return formatted.replace(/^\d{3}\.\d{3}/, "***.***");
  return formatted.length <= 4
    ? "****"
    : `${"*".repeat(formatted.length - 4)}${formatted.slice(-4)}`;
}

const taxIdentifierSchema = z
  .object({
    taxIdentifierType: z.enum(taxIdentifierTypes),
    taxIdentifier: z.string().trim().optional(),
  })
  .superRefine(({ taxIdentifier, taxIdentifierType }, context) => {
    if (taxIdentifierType === "cnpj") {
      if (!taxIdentifier || !isValidCnpj(taxIdentifier)) {
        context.addIssue({
          code: "custom",
          path: ["taxIdentifier"],
          message: "Informe um CNPJ válido.",
        });
      }
      return;
    }
    if (taxIdentifierType === "cpf") {
      if (!taxIdentifier || !isValidCpf(taxIdentifier)) {
        context.addIssue({
          code: "custom",
          path: ["taxIdentifier"],
          message: "Informe um CPF válido.",
        });
      }
    }
  });

const clientBaseSchema = z
  .object({
    displayName: z.string().trim().min(1, "Informe o nome de exibição."),
    legalName: z.string().trim().min(1, "Informe a razão social ou o nome jurídico."),
    classification: z.enum(clientClassifications),
  })
  .and(taxIdentifierSchema);

export const createClientSchema = clientBaseSchema.transform((input) => ({
  ...input,
  taxIdentifier:
    input.taxIdentifierType === "cnpj" || input.taxIdentifierType === "cpf"
      ? normalizeBrazilianTaxIdentifier(input.taxIdentifier ?? "")
      : input.taxIdentifier || undefined,
}));

export type CreateClientInput = z.input<typeof createClientSchema>;

export const updateClientSchema = createClientSchema;
export type UpdateClientInput = z.input<typeof updateClientSchema>;

export type ClientId = EntityId;
