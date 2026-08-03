export const permissionCodes = [
  "app.access",
  "organization.view",
  "users.view",
  "users.manage",
  "roles.view",
  "roles.manage",
] as const;

export type PermissionCode = (typeof permissionCodes)[number];
export type AuthorizationStatus = "active" | "pending" | "blocked" | "error";

export type AuthorizationContext = {
  membershipId: string;
  organizationId: string;
  roleCodes: string[];
  permissionCodes: PermissionCode[];
  status: AuthorizationStatus;
};

export function isPermissionCode(value: string): value is PermissionCode {
  return permissionCodes.includes(value as PermissionCode);
}

export function can(
  authorization: AuthorizationContext | null | undefined,
  permissionCode: PermissionCode,
  resourceOrganizationId?: string,
): boolean {
  if (!authorization || authorization.status !== "active") return false;
  if (
    resourceOrganizationId !== undefined &&
    resourceOrganizationId !== authorization.organizationId
  ) {
    return false;
  }

  return authorization.permissionCodes.includes(permissionCode);
}
