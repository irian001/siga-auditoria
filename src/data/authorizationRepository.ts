import type { AuthorizationContext, PermissionCode } from "@/domain/authorization";

export interface AuthorizationRepository {
  resolveAuthorization(membershipId: string, organizationId: string): Promise<AuthorizationContext>;
  hasPermission(
    membershipId: string,
    organizationId: string,
    permissionCode: PermissionCode,
  ): Promise<boolean>;
}
