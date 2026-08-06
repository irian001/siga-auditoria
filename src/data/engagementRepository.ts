import type {
  AuditEngagement,
  AuditEngagementFilters,
  AuditEngagementId,
  ChangeAuditEngagementStatusInput,
  CreateAuditEngagementInput,
  UpdateAuditEngagementInput,
} from "@/domain/engagement";
import type { OperationResult, PageRequest, PageResult, RequestContext } from "@/domain/contracts";

/** Contract for audit engagements. Physical deletion is not available. */
export type AuditEngagementRepository = {
  list(
    context: RequestContext,
    filters?: AuditEngagementFilters,
    page?: PageRequest,
  ): Promise<OperationResult<PageResult<AuditEngagement>>>;
  getById(
    context: RequestContext,
    id: AuditEngagementId,
  ): Promise<OperationResult<AuditEngagement>>;
  create(
    context: RequestContext,
    input: CreateAuditEngagementInput,
  ): Promise<OperationResult<AuditEngagement>>;
  update(
    context: RequestContext,
    id: AuditEngagementId,
    input: UpdateAuditEngagementInput,
  ): Promise<OperationResult<AuditEngagement>>;
  changeStatus(
    context: RequestContext,
    id: AuditEngagementId,
    input: ChangeAuditEngagementStatusInput,
  ): Promise<OperationResult<AuditEngagement>>;
};
