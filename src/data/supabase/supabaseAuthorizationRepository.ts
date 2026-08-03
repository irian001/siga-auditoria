import type { SupabaseClient } from "@supabase/supabase-js";

import type { AuthorizationRepository } from "@/data/authorizationRepository";
import {
  isPermissionCode,
  type AuthorizationContext,
  type PermissionCode,
} from "@/domain/authorization";

type MembershipRoleRow = { role_id: string };
type RoleRow = { id: string; organization_id: string; code: string };
type RolePermissionRow = { permission_id: string };
type PermissionRow = { id: string; code: string };

export function createSupabaseAuthorizationRepository(
  supabase: SupabaseClient,
): AuthorizationRepository {
  return {
    async resolveAuthorization(membershipId, organizationId): Promise<AuthorizationContext> {
      const membershipRolesResult = await supabase
        .from("membership_roles")
        .select("role_id")
        .eq("membership_id", membershipId)
        .eq("organization_id", organizationId);

      if (membershipRolesResult.error) {
        return {
          membershipId,
          organizationId,
          roleCodes: [],
          permissionCodes: [],
          status: "error",
        };
      }

      const roleIds = [
        ...new Set(
          ((membershipRolesResult.data ?? []) as MembershipRoleRow[]).map((row) => row.role_id),
        ),
      ];
      if (roleIds.length === 0) {
        return {
          membershipId,
          organizationId,
          roleCodes: [],
          permissionCodes: [],
          status: "pending",
        };
      }

      const rolesResult = await supabase
        .from("roles")
        .select("id, organization_id, code")
        .in("id", roleIds)
        .eq("organization_id", organizationId);

      if (rolesResult.error) {
        return {
          membershipId,
          organizationId,
          roleCodes: [],
          permissionCodes: [],
          status: "error",
        };
      }

      const roles = (rolesResult.data ?? []) as RoleRow[];
      const validRoleIds = roles.map((role) => role.id);
      if (validRoleIds.length === 0) {
        return {
          membershipId,
          organizationId,
          roleCodes: [],
          permissionCodes: [],
          status: "blocked",
        };
      }

      const rolePermissionsResult = await supabase
        .from("role_permissions")
        .select("permission_id")
        .eq("organization_id", organizationId)
        .in("role_id", validRoleIds);

      if (rolePermissionsResult.error) {
        return {
          membershipId,
          organizationId,
          roleCodes: [],
          permissionCodes: [],
          status: "error",
        };
      }

      const permissionIds = [
        ...new Set(
          ((rolePermissionsResult.data ?? []) as RolePermissionRow[]).map(
            (row) => row.permission_id,
          ),
        ),
      ];
      if (permissionIds.length === 0) {
        return {
          membershipId,
          organizationId,
          roleCodes: roles.map((role) => role.code),
          permissionCodes: [],
          status: "blocked",
        };
      }

      const permissionsResult = await supabase
        .from("permissions")
        .select("id, code")
        .in("id", permissionIds);

      if (permissionsResult.error) {
        return {
          membershipId,
          organizationId,
          roleCodes: [],
          permissionCodes: [],
          status: "error",
        };
      }

      const effectivePermissionCodes = [
        ...new Set(
          ((permissionsResult.data ?? []) as PermissionRow[])
            .map((permission) => permission.code)
            .filter(isPermissionCode),
        ),
      ];

      return {
        membershipId,
        organizationId,
        roleCodes: [...new Set(roles.map((role) => role.code))],
        permissionCodes: effectivePermissionCodes,
        status: effectivePermissionCodes.includes("app.access") ? "active" : "blocked",
      };
    },

    async hasPermission(membershipId, organizationId, permissionCode): Promise<boolean> {
      const authorization = await this.resolveAuthorization(membershipId, organizationId);
      return (
        authorization.status === "active" &&
        authorization.permissionCodes.includes(permissionCode as PermissionCode)
      );
    },
  };
}
