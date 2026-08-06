import type { SupabaseClient } from "@supabase/supabase-js";

import type { OrganizationMembership, UserAccessState } from "@/domain/organizationMembership";
import type { Organization } from "@/domain/organization";
import type { UserProfile } from "@/domain/user";
import type { UserContextRepository } from "@/data/userContextRepository";
import { createSupabaseAuthorizationRepository } from "@/data/supabase/supabaseAuthorizationRepository";

type ProfileRow = {
  id: string;
  auth_subject: string;
  display_name: string;
  status: "active" | "inactive";
};

type MembershipRow = {
  id: string;
  organization_id: string;
  user_profile_id: string;
  status: "pending" | "active" | "inactive" | "revoked";
  active_from: string | null;
  active_to: string | null;
};

type OrganizationRow = {
  id: string;
  legal_name: string;
  display_name: string;
  tax_id: string | null;
  status: "active" | "inactive";
  locale: string;
  timezone: string;
  created_at: string;
  updated_at: string;
  inactivated_at: string | null;
};

const isCurrentlyActive = (membership: MembershipRow, now: number) =>
  membership.status === "active" &&
  membership.active_from !== null &&
  Date.parse(membership.active_from) <= now &&
  (membership.active_to === null || Date.parse(membership.active_to) > now);

function mapMembership(row: MembershipRow): OrganizationMembership {
  return {
    id: row.id,
    organizationId: row.organization_id,
    userProfileId: row.user_profile_id,
    status: row.status,
    activeFrom: row.active_from,
    activeTo: row.active_to,
  };
}

function mapOrganization(row: OrganizationRow): Organization {
  return {
    id: row.id,
    legalName: row.legal_name,
    displayName: row.display_name,
    taxId: row.tax_id ?? undefined,
    status: row.status,
    locale: row.locale,
    timezone: row.timezone,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    inactivatedAt: row.inactivated_at ?? undefined,
  };
}

export function createSupabaseUserContextRepository(
  supabase: SupabaseClient,
): UserContextRepository {
  return {
    async resolveCurrentUserAccess(authSubject): Promise<UserAccessState> {
      const profileResult = await supabase
        .from("user_profiles")
        .select("id, auth_subject, display_name, status")
        .eq("auth_subject", authSubject)
        .maybeSingle();

      if (profileResult.error) return { status: "error", reason: "context-error", context: null };
      if (!profileResult.data)
        return { status: "pending", reason: "profile-missing", context: null };

      const profileRow = profileResult.data as ProfileRow;
      if (profileRow.status !== "active") {
        return { status: "blocked", reason: "profile-inactive", context: null };
      }

      const membershipsResult = await supabase
        .from("organization_memberships")
        .select("id, organization_id, user_profile_id, status, active_from, active_to")
        .eq("user_profile_id", profileRow.id);

      if (membershipsResult.error) {
        return { status: "error", reason: "context-error", context: null };
      }

      const memberships = (membershipsResult.data ?? []) as MembershipRow[];
      const activeMemberships = memberships.filter((item) => isCurrentlyActive(item, Date.now()));

      if (activeMemberships.length > 1) {
        return { status: "blocked", reason: "membership-ambiguous", context: null };
      }

      if (activeMemberships.length === 0) {
        const hasPending = memberships.some((item) => item.status === "pending");
        return {
          status: hasPending ? "pending" : "blocked",
          reason: hasPending ? "membership-pending" : "membership-inactive",
          context: null,
        };
      }

      const membership = activeMemberships[0];
      const organizationResult = await supabase
        .from("organizations")
        .select(
          "id, legal_name, display_name, tax_id, status, locale, timezone, created_at, updated_at, inactivated_at",
        )
        .eq("id", membership.organization_id)
        .maybeSingle();

      if (organizationResult.error || !organizationResult.data) {
        return { status: "blocked", reason: "organization-unavailable", context: null };
      }

      const profile: UserProfile = {
        id: profileRow.id,
        authSubject: profileRow.auth_subject,
        displayName: profileRow.display_name,
        status: profileRow.status,
      };

      const authorization = await createSupabaseAuthorizationRepository(
        supabase,
      ).resolveAuthorization(membership.id, membership.organization_id);

      if (authorization.status !== "active") {
        return {
          status: authorization.status === "pending" ? "pending" : "blocked",
          reason:
            authorization.status === "pending" ? "authorization-pending" : "authorization-blocked",
          context: null,
        };
      }

      return {
        status: "active",
        context: {
          profile,
          membership: mapMembership(membership),
          organization: mapOrganization(organizationResult.data as OrganizationRow),
          authorization,
        },
      };
    },
  };
}
