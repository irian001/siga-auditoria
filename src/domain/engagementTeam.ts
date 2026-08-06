import type { AuthorizationContext } from "@/domain/authorization";

export type EngagementTeamPeriodsQueryContext = {
  organizationId: string;
  engagementId: string;
  authorization: AuthorizationContext;
};

export type EngagementTeamMemberReadModel = {
  id: string;
  organizationId: string;
  engagementId: string;
  membershipId: string;
  userProfileId: string;
  displayName: string;
  roleId: string;
  roleCode: string;
  roleName: string;
  roleStatus: string;
  status: string;
  activeFrom: string;
  activeTo: string | null;
};

export type EngagementRoleOption = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: string;
};

export type EngagementTeamMemberAssignmentInput = {
  organizationId: string;
  engagementId: string;
  membershipId: string;
  roleId: string;
  activeFrom: string;
};

export type EngagementPeriodReadModel = {
  id: string;
  organizationId: string;
  engagementId: string;
  label: string;
  startDate: string;
  endDate: string | null;
  status: string;
};

export type EngagementTeamPeriodsReadModel = {
  teamMembers: EngagementTeamMemberReadModel[];
  periods: EngagementPeriodReadModel[];
};
