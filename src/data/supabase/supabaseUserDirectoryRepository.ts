import type { SupabaseClient } from "@supabase/supabase-js";

import type { UserDirectoryRepository } from "@/data/userDirectoryRepository";
import type { EligibleOrganizationUser, UserDirectoryQueryContext } from "@/domain/userDirectory";
import type { OperationResult } from "@/domain/contracts";
import { createAppError, unexpectedError, type AppError } from "@/lib/app-error";

type ProfileRow = {
  id: string;
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
  user_profiles: ProfileRow | ProfileRow[] | null;
};

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

function failure<T>(error: AppError): OperationResult<T> {
  return { ok: false, error };
}

function requireContext(
  context: UserDirectoryQueryContext,
): OperationResult<{ organizationId: string; asOf: string }> {
  if (!context.organizationId || context.authorization.status !== "active") {
    return failure(
      createAppError("UNAUTHORIZED", "O contexto organizacional não está disponível."),
    );
  }

  if (
    context.authorization.organizationId !== context.organizationId ||
    !context.authorization.permissionCodes.includes("users.view")
  ) {
    return failure(
      createAppError(
        "FORBIDDEN",
        "Você não possui permissão para consultar o diretório de usuários.",
        true,
      ),
    );
  }

  const asOf = context.asOf ? Date.parse(context.asOf) : Date.now();
  if (!Number.isFinite(asOf)) {
    return failure(
      createAppError("VALIDATION_ERROR", "A data de referência do diretório é inválida.", true),
    );
  }

  return {
    ok: true,
    data: { organizationId: context.organizationId, asOf: new Date(asOf).toISOString() },
  };
}

function mapSupabaseError(error: SupabaseErrorLike): AppError {
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
      "Você não possui permissão para consultar o diretório de usuários.",
      true,
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
): Promise<OperationResult<T | null>> {
  try {
    const response = await operation();
    if (response.error) return failure(mapSupabaseError(response.error));
    return { ok: true, data: response.data };
  } catch (error) {
    return failure(mapCaughtError(error));
  }
}

function getProfile(row: MembershipRow): ProfileRow | null {
  if (Array.isArray(row.user_profiles)) return row.user_profiles[0] ?? null;
  return row.user_profiles;
}

function mapMembership(row: MembershipRow): EligibleOrganizationUser | null {
  const profile = getProfile(row);
  if (
    row.status !== "active" ||
    row.active_from === null ||
    profile === null ||
    profile.status !== "active"
  ) {
    return null;
  }

  return {
    userProfileId: profile.id,
    displayName: profile.display_name,
    membershipId: row.id,
    organizationId: row.organization_id,
    membershipStatus: "active",
    activeFrom: row.active_from,
    activeTo: row.active_to,
  };
}

export function createSupabaseUserDirectoryRepository(
  supabase: SupabaseClient,
): UserDirectoryRepository {
  return {
    async listEligibleUsers(
      context: UserDirectoryQueryContext,
    ): Promise<OperationResult<EligibleOrganizationUser[]>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const result = await execute<MembershipRow[]>(async () =>
        supabase
          .from("organization_memberships")
          .select(
            "id, organization_id, user_profile_id, status, active_from, active_to, user_profiles!inner(id, display_name, status)",
          )
          .eq("organization_id", authorized.data.organizationId)
          .eq("status", "active")
          .lte("active_from", authorized.data.asOf)
          .or(`active_to.is.null,active_to.gt.${authorized.data.asOf}`)
          .eq("user_profiles.status", "active"),
      );
      if (!result.ok) return result;

      const rows = result.data ?? [];
      const users = rows
        .map(mapMembership)
        .filter((user): user is EligibleOrganizationUser => user !== null)
        .sort((left, right) => left.displayName.localeCompare(right.displayName, "pt-BR"));

      return { ok: true, data: users };
    },
  };
}
