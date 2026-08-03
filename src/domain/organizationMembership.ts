import type { Organization } from "@/domain/organization";
import type { UserProfile } from "@/domain/user";
import type { AuthorizationContext } from "@/domain/authorization";

export const membershipStatuses = ["pending", "active", "inactive", "revoked"] as const;
export type MembershipStatus = (typeof membershipStatuses)[number];

export type OrganizationMembership = {
  id: string;
  organizationId: string;
  userProfileId: string;
  status: MembershipStatus;
  activeFrom: string | null;
  activeTo: string | null;
};

export type OrganizationContext = {
  profile: UserProfile;
  membership: OrganizationMembership;
  organization: Organization;
  authorization: AuthorizationContext;
};

export type UserAccessReason =
  | "profile-missing"
  | "profile-inactive"
  | "membership-pending"
  | "membership-inactive"
  | "membership-ambiguous"
  | "authorization-pending"
  | "authorization-blocked"
  | "organization-unavailable"
  | "context-error";

export type UserAccessState =
  | { status: "active"; context: OrganizationContext }
  | { status: "pending" | "blocked" | "error"; reason: UserAccessReason; context: null };
