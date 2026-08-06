import type { AuthorizationContext } from "@/domain/authorization";

export type EligibleOrganizationUser = {
  userProfileId: string;
  displayName: string;
  membershipId: string;
  organizationId: string;
  membershipStatus: "active";
  activeFrom: string;
  activeTo: string | null;
};

export type UserDirectoryQueryContext = {
  organizationId: string;
  authorization: AuthorizationContext;
  asOf?: string;
};
