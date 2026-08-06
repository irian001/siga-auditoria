import type { OperationResult } from "@/domain/contracts";
import type {
  EngagementTeamPeriodsQueryContext,
  EngagementTeamPeriodsReadModel,
} from "@/domain/engagementTeam";

export type EngagementTeamPeriodsRepository = {
  getByEngagement(
    context: EngagementTeamPeriodsQueryContext,
  ): Promise<OperationResult<EngagementTeamPeriodsReadModel>>;
};
