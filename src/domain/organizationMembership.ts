import type { Organization } from "@/domain/organization";
import type { UserProfile } from "@/domain/user";

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
};

export type UserAccessReason =
  | "profile-missing"
  | "profile-inactive"
  | "membership-pending"
  | "membership-inactive"
  | "membership-ambiguous"
  | "organization-unavailable"
  | "context-error";

export type UserAccessState =
  | { status: "active"; context: OrganizationContext }
  | { status: "pending" | "blocked" | "error"; reason: UserAccessReason; context: null };
