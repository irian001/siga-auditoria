import { can } from "@/domain/authorization";
import type { OperationResult } from "@/domain/contracts";
import type {
  EngagementPeriodReadModel,
  EngagementTeamMemberReadModel,
  EngagementTeamPeriodsQueryContext,
  EngagementTeamPeriodsReadModel,
} from "@/domain/engagementTeam";
import type { EngagementTeamPeriodsRepository } from "@/data/engagementTeamRepository";
import { createAppError } from "@/lib/app-error";

export type MockEngagementTeamPeriodsSeed = {
  teamMembers?: EngagementTeamMemberReadModel[];
  periods?: EngagementPeriodReadModel[];
};

export class MockEngagementTeamPeriodsRepository implements EngagementTeamPeriodsRepository {
  private readonly teamMembers: EngagementTeamMemberReadModel[];
  private readonly periods: EngagementPeriodReadModel[];

  public constructor(seed: MockEngagementTeamPeriodsSeed = {}) {
    this.teamMembers = (seed.teamMembers ?? []).map((item) => ({ ...item }));
    this.periods = (seed.periods ?? []).map((item) => ({ ...item }));
  }

  public async getByEngagement(
    context: EngagementTeamPeriodsQueryContext,
  ): Promise<OperationResult<EngagementTeamPeriodsReadModel>> {
    if (
      !context.organizationId ||
      !context.engagementId ||
      context.authorization.status !== "active"
    ) {
      return {
        ok: false,
        error: createAppError("UNAUTHORIZED", "O contexto organizacional não está disponível."),
      };
    }

    if (!can(context.authorization, "engagements.view", context.organizationId)) {
      return {
        ok: false,
        error: createAppError(
          "FORBIDDEN",
          "Você não possui permissão para consultar equipe e períodos.",
          true,
        ),
      };
    }

    return {
      ok: true,
      data: {
        teamMembers: this.teamMembers
          .filter(
            (item) =>
              item.organizationId === context.organizationId &&
              item.engagementId === context.engagementId,
          )
          .sort((left, right) => left.displayName.localeCompare(right.displayName, "pt-BR")),
        periods: this.periods
          .filter(
            (item) =>
              item.organizationId === context.organizationId &&
              item.engagementId === context.engagementId,
          )
          .sort((left, right) => left.startDate.localeCompare(right.startDate)),
      },
    };
  }
}
