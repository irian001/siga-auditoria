import type { OperationResult } from "@/domain/contracts";
import type { EligibleOrganizationUser, UserDirectoryQueryContext } from "@/domain/userDirectory";

export type UserDirectoryRepository = {
  listEligibleUsers(
    context: UserDirectoryQueryContext,
  ): Promise<OperationResult<EligibleOrganizationUser[]>>;
};
