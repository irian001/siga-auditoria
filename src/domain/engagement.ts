import { z } from "zod";

import type { EntityId, EntityMetadata } from "@/domain/contracts";

export const auditEngagementStatuses = ["draft", "active", "closed", "cancelled"] as const;
export type AuditEngagementStatus = (typeof auditEngagementStatuses)[number];

export const auditEngagementTransitionStatuses = ["active", "closed", "cancelled"] as const;
export type AuditEngagementTransitionStatus = (typeof auditEngagementTransitionStatuses)[number];

export const auditEngagementClassifications = ["audit"] as const;
export type AuditEngagementClassification = (typeof auditEngagementClassifications)[number];

export type AuditEngagement = EntityMetadata & {
  organizationId: string;
  clientId: string;
  acceptanceAssessmentId: string;
  code: string;
  title: string;
  scope: string;
  classification: AuditEngagementClassification;
  status: AuditEngagementStatus;
  createdBy: string;
  updatedBy: string;
  closedAt?: string;
  closedBy?: string;
  cancelledAt?: string;
  cancelledBy?: string;
  transitionHistory: AuditEngagementTransition[];
};

export type AuditEngagementTransition = {
  id: EntityId;
  fromStatus?: AuditEngagementStatus;
  toStatus: AuditEngagementStatus;
  reason?: string;
  performedBy: string;
  performedAt: string;
};

export type AuditEngagementFilters = {
  clientId?: string;
  status?: AuditEngagementStatus;
  search?: string;
};

const engagementText = (message: string, max: number) =>
  z.string().trim().min(1, message).max(max);

export const createAuditEngagementSchema = z.object({
  clientId: z.string().uuid("Cliente invalido."),
  acceptanceAssessmentId: z.string().uuid("Avaliacao aprovada invalida."),
  code: engagementText("Informe o codigo do trabalho.", 80),
  title: engagementText("Informe o titulo do trabalho.", 200),
  scope: engagementText("Informe o escopo preliminar do trabalho.", 4000),
  classification: z.enum(auditEngagementClassifications),
});
export type CreateAuditEngagementInput = z.input<typeof createAuditEngagementSchema>;

export const updateAuditEngagementSchema = z.object({
  title: engagementText("Informe o titulo do trabalho.", 200),
  scope: engagementText("Informe o escopo preliminar do trabalho.", 4000),
  classification: z.enum(auditEngagementClassifications),
});
export type UpdateAuditEngagementInput = z.input<typeof updateAuditEngagementSchema>;

export const changeAuditEngagementStatusSchema = z
  .object({
    status: z.enum(auditEngagementTransitionStatuses),
    reason: z.string().trim().max(4000).optional(),
  })
  .superRefine((input, context) => {
    if ((input.status === "closed" || input.status === "cancelled") && !input.reason?.trim()) {
      context.addIssue({
        code: "custom",
        path: ["reason"],
        message: "Informe a justificativa da mudanca de estado.",
      });
    }
  });
export type ChangeAuditEngagementStatusInput = z.input<
  typeof changeAuditEngagementStatusSchema
>;

const allowedTransitions: Record<
  AuditEngagementStatus,
  readonly AuditEngagementStatus[]
> = {
  draft: ["active", "cancelled"],
  active: ["closed", "cancelled"],
  closed: [],
  cancelled: [],
};

export function canTransitionAuditEngagement(
  from: AuditEngagementStatus,
  to: AuditEngagementStatus,
): boolean {
  return allowedTransitions[from].includes(to);
}

export type AuditEngagementId = EntityId;
