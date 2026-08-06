import type { OperationResult } from "@/domain/contracts";
import type {
  EngagementRoleOption,
  EngagementTeamMemberAssignmentInput,
  EngagementTeamMemberReadModel,
  EngagementTeamPeriodsQueryContext,
  EngagementTeamPeriodsReadModel,
} from "@/domain/engagementTeam";

export type EngagementTeamPeriodsRepository = {
  getByEngagement(
    context: EngagementTeamPeriodsQueryContext,
  ): Promise<OperationResult<EngagementTeamPeriodsReadModel>>;
  listActiveRoles(
    context: EngagementTeamPeriodsQueryContext,
  ): Promise<OperationResult<EngagementRoleOption[]>>;
  assignMember(
    context: EngagementTeamPeriodsQueryContext,
    input: EngagementTeamMemberAssignmentInput,
  ): Promise<OperationResult<EngagementTeamMemberReadModel>>;
};
