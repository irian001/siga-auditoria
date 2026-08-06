import { can } from "@/domain/authorization";
import type { OperationResult } from "@/domain/contracts";
import type {
  EngagementRoleOption,
  EngagementPeriodReadModel,
  EngagementTeamMemberAssignmentInput,
  EngagementTeamMemberReadModel,
  EngagementTeamPeriodsQueryContext,
  EngagementTeamPeriodsReadModel,
} from "@/domain/engagementTeam";
import type { EngagementTeamPeriodsRepository } from "@/data/engagementTeamRepository";
import type { EligibleOrganizationUser } from "@/domain/userDirectory";
import { createAppError } from "@/lib/app-error";

export type MockEngagementTeamPeriodsSeed = {
  teamMembers?: EngagementTeamMemberReadModel[];
  periods?: EngagementPeriodReadModel[];
  roles?: EngagementRoleOption[];
  eligibleUsers?: EligibleOrganizationUser[];
};

export class MockEngagementTeamPeriodsRepository implements EngagementTeamPeriodsRepository {
  private readonly teamMembers: EngagementTeamMemberReadModel[];
  private readonly periods: EngagementPeriodReadModel[];
  private readonly roles: EngagementRoleOption[];
  private readonly eligibleUsers: EligibleOrganizationUser[];

  public constructor(seed: MockEngagementTeamPeriodsSeed = {}) {
    this.teamMembers = (seed.teamMembers ?? []).map((item) => ({ ...item }));
    this.periods = (seed.periods ?? []).map((item) => ({ ...item }));
    this.roles = (seed.roles ?? []).map((item) => ({ ...item }));
    this.eligibleUsers = (seed.eligibleUsers ?? []).map((item) => ({ ...item }));
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

  public async listActiveRoles(
    context: EngagementTeamPeriodsQueryContext,
  ): Promise<OperationResult<EngagementRoleOption[]>> {
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
          "Você não possui permissão para consultar as funções do trabalho.",
          true,
        ),
      };
    }

    return {
      ok: true,
      data: this.roles
        .filter(
          (role) => role.organizationId === context.organizationId && role.status === "active",
        )
        .sort((left, right) => left.name.localeCompare(right.name, "pt-BR")),
    };
  }

  public async assignMember(
    context: EngagementTeamPeriodsQueryContext,
    input: EngagementTeamMemberAssignmentInput,
  ): Promise<OperationResult<EngagementTeamMemberReadModel>> {
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

    if (!can(context.authorization, "engagements.manage", context.organizationId)) {
      return {
        ok: false,
        error: createAppError(
          "FORBIDDEN",
          "Você não possui permissão para associar equipe ao trabalho.",
          true,
        ),
      };
    }

    if (
      input.organizationId !== context.organizationId ||
      input.engagementId !== context.engagementId
    ) {
      return {
        ok: false,
        error: createAppError("FORBIDDEN", "A associação não pertence ao contexto atual.", true),
      };
    }

    const user = this.eligibleUsers.find(
      (item) =>
        item.organizationId === input.organizationId && item.membershipId === input.membershipId,
    );
    const role = this.roles.find(
      (item) =>
        item.organizationId === input.organizationId &&
        item.id === input.roleId &&
        item.status === "active",
    );
    if (!user || !role) {
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          "Selecione um usuário elegível e uma função ativa.",
          true,
        ),
      };
    }

    if (
      this.teamMembers.some(
        (item) =>
          item.organizationId === input.organizationId &&
          item.engagementId === input.engagementId &&
          item.membershipId === input.membershipId &&
          item.status === "active",
      )
    ) {
      return {
        ok: false,
        error: createAppError("CONFLICT", "Este usuário já está associado ao trabalho.", true),
      };
    }

    const created: EngagementTeamMemberReadModel = {
      id: `team-${this.teamMembers.length + 1}`,
      organizationId: input.organizationId,
      engagementId: input.engagementId,
      membershipId: input.membershipId,
      userProfileId: user.userProfileId,
      displayName: user.displayName,
      roleId: role.id,
      roleCode: role.code,
      roleName: role.name,
      roleStatus: role.status,
      status: "active",
      activeFrom: input.activeFrom,
      activeTo: null,
    };
    this.teamMembers.push(created);
    return { ok: true, data: { ...created } };
  }
}
