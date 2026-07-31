import type { OperationResult, PageRequest, PageResult, RequestContext } from "@/domain/contracts";
import type {
  CreateOrganizationInput,
  Organization,
  OrganizationFilters,
  OrganizationId,
  UpdateOrganizationInput,
} from "@/domain/organization";

/** Contrato da raiz multiempresa. Não oferece exclusão física. */
export type OrganizationRepository = {
  list(
    context: RequestContext,
    filters?: OrganizationFilters,
    page?: PageRequest,
  ): Promise<OperationResult<PageResult<Organization>>>;
  getById(context: RequestContext, id: OrganizationId): Promise<OperationResult<Organization>>;
  getByTaxId(context: RequestContext, taxId: string): Promise<OperationResult<Organization>>;
  create(
    context: RequestContext,
    input: CreateOrganizationInput,
  ): Promise<OperationResult<Organization>>;
  update(
    context: RequestContext,
    id: OrganizationId,
    input: UpdateOrganizationInput,
  ): Promise<OperationResult<Organization>>;
  inactivate(context: RequestContext, id: OrganizationId): Promise<OperationResult<Organization>>;
  reactivate(context: RequestContext, id: OrganizationId): Promise<OperationResult<Organization>>;
};
