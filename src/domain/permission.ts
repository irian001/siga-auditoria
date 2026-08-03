import type { PermissionCode } from "@/domain/authorization";

export const permissionStatuses = ["active", "inactive"] as const;
export type PermissionStatus = (typeof permissionStatuses)[number];
export type PermissionOwnershipScope = "platform" | "organization";

export type Permission = {
  id: string;
  ownershipScope: PermissionOwnershipScope;
  organizationId: string | null;
  code: PermissionCode;
  name: string;
  description: string | null;
  status: PermissionStatus;
};

export type RolePermission = {
  id: string;
  organizationId: string;
  roleId: string;
  permissionId: string;
  status: PermissionStatus;
};

export type MembershipRoleStatus = "active" | "inactive" | "revoked";

export type MembershipRole = {
  id: string;
  organizationId: string;
  membershipId: string;
  roleId: string;
  status: MembershipRoleStatus;
  activeFrom: string;
  activeTo: string | null;
  revokedAt: string | null;
};
