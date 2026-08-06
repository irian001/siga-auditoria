import type { SupabaseClient } from "@supabase/supabase-js";

import type { EngagementTeamPeriodsRepository } from "@/data/engagementTeamRepository";
import type { OperationResult } from "@/domain/contracts";
import type {
  EngagementRoleOption,
  EngagementPeriodReadModel,
  EngagementTeamMemberAssignmentInput,
  EngagementTeamMemberReadModel,
  EngagementTeamPeriodsQueryContext,
  EngagementTeamPeriodsReadModel,
} from "@/domain/engagementTeam";
import { can } from "@/domain/authorization";
import { createAppError, unexpectedError, type AppError } from "@/lib/app-error";

type SupabaseErrorLike = {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
  status?: number;
};

type SupabaseResponse<T> = {
  data: T | null;
  error: SupabaseErrorLike | null;
};

type ProfileRow = {
  id: string;
  display_name: string;
  status: string;
};

type MembershipRow = {
  id: string;
  organization_id: string;
  user_profile_id: string;
  user_profiles: ProfileRow | ProfileRow[] | null;
};

type RoleRow = {
  id: string;
  organization_id: string;
  code: string;
  name: string;
  status: string;
};

const TEAM_MEMBER_SELECT =
  "id, organization_id, engagement_id, membership_id, engagement_role_id, active_from, active_to, status, organization_memberships!inner(id, organization_id, user_profile_id, user_profiles!inner(id, display_name, status)), engagement_roles!inner(id, organization_id, code, name, status)";

type TeamMemberRow = {
  id: string;
  organization_id: string;
  engagement_id: string;
  membership_id: string;
  engagement_role_id: string;
  active_from: string;
  active_to: string | null;
  status: string;
  organization_memberships: MembershipRow | MembershipRow[] | null;
  engagement_roles: RoleRow | RoleRow[] | null;
};

type PeriodRow = {
  id: string;
  organization_id: string;
  engagement_id: string;
  label: string;
  start_date: string;
  end_date: string | null;
  status: string;
};

function failure<T>(error: AppError): { ok: false; error: AppError } {
  return { ok: false, error };
}

function firstRelated<T>(value: T | T[] | null | undefined): T | null {
  return Array.isArray(value) ? (value[0] ?? null) : (value ?? null);
}

function requireContext(
  context: EngagementTeamPeriodsQueryContext,
): { ok: true; data: EngagementTeamPeriodsQueryContext } | { ok: false; error: AppError } {
  if (
    !context.organizationId ||
    !context.engagementId ||
    context.authorization.status !== "active"
  ) {
    return failure(
      createAppError("UNAUTHORIZED", "O contexto organizacional não está disponível."),
    );
  }

  if (!can(context.authorization, "engagements.view", context.organizationId)) {
    return failure(
      createAppError(
        "FORBIDDEN",
        "Você não possui permissão para consultar equipe e períodos.",
        true,
      ),
    );
  }

  return { ok: true, data: context };
}

function requireManageContext(
  context: EngagementTeamPeriodsQueryContext,
): { ok: true; data: EngagementTeamPeriodsQueryContext } | { ok: false; error: AppError } {
  if (
    !context.organizationId ||
    !context.engagementId ||
    context.authorization.status !== "active"
  ) {
    return failure(
      createAppError("UNAUTHORIZED", "O contexto organizacional não está disponível."),
    );
  }

  if (!can(context.authorization, "engagements.manage", context.organizationId)) {
    return failure(
      createAppError(
        "FORBIDDEN",
        "Você não possui permissão para associar equipe ao trabalho.",
        true,
      ),
    );
  }

  return { ok: true, data: context };
}

function mapSupabaseError(error: SupabaseErrorLike): AppError {
  if (error.code === "23505") {
    return createAppError("CONFLICT", "Este usuário já está associado ao trabalho.", true, error);
  }

  if (error.code === "23503" || error.code === "23514") {
    return createAppError(
      "VALIDATION_ERROR",
      "Os dados da associação não atendem às regras do trabalho.",
      true,
      error,
    );
  }

  if (error.code === "PGRST301" || error.status === 401) {
    return createAppError(
      "UNAUTHORIZED",
      "Sua sessão não está disponível. Entre novamente para continuar.",
      true,
      error,
    );
  }

  if (error.code === "42501" || error.status === 403) {
    return createAppError(
      "FORBIDDEN",
      "Você não possui permissão para consultar equipe e períodos.",
      true,
      error,
    );
  }

  if (error.code === "PGRST205" || error.code === "PGRST202") {
    return createAppError(
      "CONFIGURATION_ERROR",
      "A estrutura oficial de equipe e períodos ainda não está disponível neste ambiente.",
      false,
      error,
    );
  }

  return unexpectedError(error);
}

function mapCaughtError(error: unknown): AppError {
  if (
    error instanceof Error &&
    error.message.includes("Supabase authentication is not configured")
  ) {
    return createAppError(
      "CONFIGURATION_ERROR",
      "A conexão com o ambiente oficial ainda não está disponível.",
      false,
      error,
    );
  }

  if (error instanceof TypeError) {
    return createAppError(
      "NETWORK_ERROR",
      "Não foi possível comunicar com o ambiente oficial. Tente novamente.",
      true,
      error,
    );
  }

  return unexpectedError(error);
}

async function execute<T>(
  operation: () => PromiseLike<SupabaseResponse<T>>,
): Promise<{ ok: true; data: T | null } | { ok: false; error: AppError }> {
  try {
    const response = await operation();
    if (response.error) return failure(mapSupabaseError(response.error));
    return { ok: true, data: response.data };
  } catch (error) {
    return failure(mapCaughtError(error));
  }
}

function mapTeamMember(row: TeamMemberRow): EngagementTeamMemberReadModel | null {
  const membership = firstRelated(row.organization_memberships);
  const profile = firstRelated(membership?.user_profiles);
  const role = firstRelated(row.engagement_roles);

  if (!membership || !profile || !role) return null;

  return {
    id: row.id,
    organizationId: row.organization_id,
    engagementId: row.engagement_id,
    membershipId: row.membership_id,
    userProfileId: profile.id,
    displayName: profile.display_name,
    roleId: row.engagement_role_id,
    roleCode: role.code,
    roleName: role.name,
    roleStatus: role.status,
    status: row.status,
    activeFrom: row.active_from,
    activeTo: row.active_to,
  };
}

function mapPeriod(row: PeriodRow): EngagementPeriodReadModel {
  return {
    id: row.id,
    organizationId: row.organization_id,
    engagementId: row.engagement_id,
    label: row.label,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
  };
}

function mapRole(row: RoleRow): EngagementRoleOption {
  return {
    id: row.id,
    organizationId: row.organization_id,
    code: row.code,
    name: row.name,
    status: row.status,
  };
}

export function createSupabaseEngagementTeamPeriodsRepository(
  supabase: SupabaseClient,
): EngagementTeamPeriodsRepository {
  return {
    async getByEngagement(
      context: EngagementTeamPeriodsQueryContext,
    ): Promise<OperationResult<EngagementTeamPeriodsReadModel>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const teamResult = await execute<TeamMemberRow[]>(async () =>
        supabase
          .from("engagement_team_members")
          .select(TEAM_MEMBER_SELECT)
          .eq("organization_id", authorized.data.organizationId)
          .eq("engagement_id", authorized.data.engagementId)
          .eq("organization_memberships.organization_id", authorized.data.organizationId)
          .eq("engagement_roles.organization_id", authorized.data.organizationId),
      );
      if (!teamResult.ok) return teamResult;

      const periodsResult = await execute<PeriodRow[]>(async () =>
        supabase
          .from("engagement_periods")
          .select("id, organization_id, engagement_id, label, start_date, end_date, status")
          .eq("organization_id", authorized.data.organizationId)
          .eq("engagement_id", authorized.data.engagementId),
      );
      if (!periodsResult.ok) return periodsResult;

      const teamMembers = (teamResult.data ?? [])
        .map(mapTeamMember)
        .filter((item): item is EngagementTeamMemberReadModel => item !== null)
        .sort((left, right) => left.displayName.localeCompare(right.displayName, "pt-BR"));
      const periods = (periodsResult.data ?? [])
        .map(mapPeriod)
        .sort((left, right) => left.startDate.localeCompare(right.startDate));

      return { ok: true, data: { teamMembers, periods } as EngagementTeamPeriodsReadModel };
    },

    async listActiveRoles(
      context: EngagementTeamPeriodsQueryContext,
    ): Promise<OperationResult<EngagementRoleOption[]>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const result = await execute<RoleRow[]>(async () =>
        supabase
          .from("engagement_roles")
          .select("id, organization_id, code, name, status")
          .eq("organization_id", authorized.data.organizationId)
          .eq("status", "active"),
      );
      if (!result.ok) return result;

      return {
        ok: true,
        data: (result.data ?? [])
          .map(mapRole)
          .sort((left, right) => left.name.localeCompare(right.name, "pt-BR")),
      };
    },

    async assignMember(
      context: EngagementTeamPeriodsQueryContext,
      input: EngagementTeamMemberAssignmentInput,
    ): Promise<OperationResult<EngagementTeamMemberReadModel>> {
      const authorized = requireManageContext(context);
      if (!authorized.ok) return authorized;

      if (
        input.organizationId !== authorized.data.organizationId ||
        input.engagementId !== authorized.data.engagementId ||
        !input.membershipId ||
        !input.roleId ||
        !/^\d{4}-\d{2}-\d{2}$/.test(input.activeFrom)
      ) {
        return failure(
          createAppError("VALIDATION_ERROR", "Os dados da associação são inválidos.", true),
        );
      }

      const result = await execute<TeamMemberRow>(async () =>
        supabase
          .from("engagement_team_members")
          .insert({
            organization_id: input.organizationId,
            engagement_id: input.engagementId,
            membership_id: input.membershipId,
            engagement_role_id: input.roleId,
            active_from: input.activeFrom,
            active_to: null,
            status: "active",
          })
          .select(TEAM_MEMBER_SELECT)
          .single(),
      );
      if (!result.ok) return result;
      if (!result.data) {
        return failure(
          createAppError("CONFIGURATION_ERROR", "A associação foi criada sem retorno do registro."),
        );
      }

      const member = mapTeamMember(result.data);
      if (!member) {
        return failure(
          createAppError("CONFIGURATION_ERROR", "A associação criada não pôde ser consultada."),
        );
      }

      return { ok: true, data: member };
    },
  };
}
