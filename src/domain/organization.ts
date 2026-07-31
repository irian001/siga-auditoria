import { z } from "zod";

import type { EntityId, EntityMetadata } from "@/domain/contracts";

export const organizationStatuses = ["active", "inactive"] as const;
export type OrganizationStatus = (typeof organizationStatuses)[number];

export type Organization = EntityMetadata & {
  legalName: string;
  displayName: string;
  taxId?: string;
  status: OrganizationStatus;
  locale: string;
  timezone: string;
  inactivatedAt?: string;
};

export type OrganizationFilters = {
  status?: OrganizationStatus;
  search?: string;
};

export function normalizeTaxId(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidCnpj(value: string): boolean {
  const digits = normalizeTaxId(value);
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) return false;

  const calculateDigit = (length: number) => {
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

const optionalCnpjSchema = z
  .string()
  .transform(normalizeTaxId)
  .refine((value) => value.length === 14, "O CNPJ deve conter 14 dígitos.")
  .refine(isValidCnpj, "Informe um CNPJ válido.")
  .optional();

export const createOrganizationSchema = z.object({
  legalName: z.string().trim().min(1, "Informe a razão social."),
  displayName: z.string().trim().min(1, "Informe o nome de exibição."),
  taxId: optionalCnpjSchema,
  locale: z.string().trim().min(1).default("pt-BR"),
  timezone: z.string().trim().min(1).default("America/Sao_Paulo"),
});

export type CreateOrganizationInput = z.input<typeof createOrganizationSchema>;

export const updateOrganizationSchema = createOrganizationSchema.partial();
export type UpdateOrganizationInput = z.input<typeof updateOrganizationSchema>;

export type OrganizationId = EntityId;
