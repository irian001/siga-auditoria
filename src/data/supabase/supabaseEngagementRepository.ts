import type { SupabaseClient } from "@supabase/supabase-js";

import type { AuditEngagementRepository } from "@/data/engagementRepository";
import {
  changeAuditEngagementStatusSchema,
  createAuditEngagementSchema,
  updateAuditEngagementSchema,
  type AuditEngagement,
  type AuditEngagementFilters,
  type AuditEngagementId,
  type AuditEngagementStatus,
  type AuditEngagementTransition,
  type ChangeAuditEngagementStatusInput,
  type CreateAuditEngagementInput,
  type UpdateAuditEngagementInput,
} from "@/domain/engagement";
import type { OperationResult, PageRequest, PageResult, RequestContext } from "@/domain/contracts";
import { createAppError, unexpectedError, type AppError } from "@/lib/app-error";
import { getSupabaseBrowserClient } from "@/data/supabase/supabaseClient";

type SupabaseErrorLike = {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
  status?: number;
};

type SupabaseResponse<T> = {
  data: T;
  error: SupabaseErrorLike | null;
  count?: number | null;
};

type AuditEngagementTransitionRow = {
  id?: string;
  fromStatus?: AuditEngagementStatus | null;
  toStatus?: AuditEngagementStatus;
  reason?: string | null;
  performedBy?: string;
  performedAt?: string;
};

type AuditEngagementRow = {
  id: string;
  organization_id: string;
  client_id: string;
  acceptance_assessment_id: string;
  code: string;
  title: string;
  scope: string;
  classification: AuditEngagement["classification"];
  status: AuditEngagementStatus;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  closed_at: string | null;
  closed_by: string | null;
  cancelled_at: string | null;
  cancelled_by: string | null;
  transition_history: AuditEngagementTransitionRow[] | null;
};

type RpcResult = string;

function failure<T>(error: AppError): OperationResult<T> {
  return { ok: false, error };
}

function requireContext(
  context: RequestContext,
): OperationResult<{ organizationId: string; userId: string }> {
  if (!context.organizationId || !context.userId) {
    return failure(
      createAppError("UNAUTHORIZED", "O contexto organizacional nÃ£o estÃ¡ disponÃ­vel."),
    );
  }

  return { ok: true, data: { organizationId: context.organizationId, userId: context.userId } };
}

function mapTransition(
  row: AuditEngagementTransitionRow,
): AuditEngagementTransition {
  return {
    id: row.id ?? crypto.randomUUID(),
    fromStatus: row.fromStatus ?? undefined,
    toStatus: row.toStatus ?? "draft",
    reason: row.reason ?? undefined,
    performedBy: row.performedBy ?? "",
    performedAt: row.performedAt ?? "",
  };
}

function mapEngagement(row: AuditEngagementRow): AuditEngagement {
  return {
    id: row.id,
    organizationId: row.organization_id,
    clientId: row.client_id,
    acceptanceAssessmentId: row.acceptance_assessment_id,
    code: row.code,
    title: row.title,
    scope: row.scope,
    classification: row.classification,
    status: row.status,
    createdAt: row.created_at,
    createdBy: row.created_by,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
    closedAt: row.closed_at ?? undefined,
    closedBy: row.closed_by ?? undefined,
    cancelledAt: row.cancelled_at ?? undefined,
    cancelledBy: row.cancelled_by ?? undefined,
    transitionHistory: (row.transition_history ?? []).map(mapTransition),
  };
}

function mapSupabaseError(error: SupabaseErrorLike): AppError {
  if (error.code === "23505") {
    return createAppError(
      "CONFLICT",
      "JÃ¡ existe um trabalho com este cÃ³digo nesta organizaÃ§Ã£o.",
      true,
      error,
    );
  }

  if (error.code === "23514" || error.code === "22023") {
    return createAppError(
      "VALIDATION_ERROR",
      "Os dados ou a mudanÃ§a de estado do trabalho nÃ£o sÃ£o vÃ¡lidos.",
      true,
      error,
    );
  }

  if (error.code === "PGRST301" || error.status === 401) {
    return createAppError(
      "UNAUTHORIZED",
      "Sua sessÃ£o nÃ£o estÃ¡ disponÃ­vel. Entre novamente para continuar.",
      true,
      error,
    );
  }

  if (error.code === "42501" || error.status === 403) {
    return createAppError(
      "FORBIDDEN",
      "VocÃª nÃ£o possui permissÃ£o para operar trabalhos neste contexto.",
      false,
      error,
    );
  }

  if (error.code === "PGRST202") {
    return createAppError(
      "CONFIGURATION_ERROR",
      "A operaÃ§Ã£o oficial do trabalho ainda nÃ£o estÃ¡ disponÃ­vel neste ambiente.",
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
      "A conexÃ£o com o ambiente oficial ainda nÃ£o estÃ¡ disponÃ­vel.",
      false,
      error,
    );
  }

  if (error instanceof TypeError) {
    return createAppError(
      "NETWORK_ERROR",
      "NÃ£o foi possÃ­vel comunicar com o ambiente oficial. Tente novamente.",
      true,
      error,
    );
  }

  return unexpectedError(error);
}

async function execute<T>(
  operation: () => Promise<SupabaseResponse<T>>,
): Promise<OperationResult<{ data: T; count?: number | null }>> {
  try {
    const response = await operation();
    if (response.error) return failure(mapSupabaseError(response.error));
    return { ok: true, data: { data: response.data, count: response.count } };
  } catch (error) {
    return failure(mapCaughtError(error));
  }
}

function escapePostgrestSearch(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(",", "\\,")
    .replaceAll("%", "\\%")
    .replaceAll("_", "\\_");
}

export function createSupabaseEngagementRepository(
  supabase: SupabaseClient = getSupabaseBrowserClient(),
): AuditEngagementRepository {
  async function getById(
    context: RequestContext,
    id: AuditEngagementId,
  ): Promise<OperationResult<AuditEngagement>> {
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;

    const result = await execute(async () =>
      supabase
        .from("audit_engagements")
        .select("*")
        .eq("organization_id", authorized.data.organizationId)
        .eq("id", id)
        .maybeSingle(),
    );
    if (!result.ok) return result;
    if (!result.data.data) {
      return failure(createAppError("NOT_FOUND", "Trabalho nÃ£o encontrado.", true));
    }

    return { ok: true, data: mapEngagement(result.data.data as AuditEngagementRow) };
  }

  async function callRpc(
    name: string,
    args: Record<string, unknown>,
  ): Promise<OperationResult<RpcResult>> {
    const result = await execute(async () => supabase.rpc(name, args));
    if (!result.ok) return result;
    if (typeof result.data.data !== "string") return failure(unexpectedError(result.data.data));
    return { ok: true, data: result.data.data };
  }

  async function refresh(
    context: RequestContext,
    id: AuditEngagementId,
  ): Promise<OperationResult<AuditEngagement>> {
    return getById(context, id);
  }

  return {
    async list(
      context: RequestContext,
      filters: AuditEngagementFilters = {},
      page: PageRequest = {},
    ): Promise<OperationResult<PageResult<AuditEngagement>>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const currentPage = Math.max(1, page.page ?? 1);
      const pageSize = Math.max(1, page.pageSize ?? 20);
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("audit_engagements")
        .select("*", { count: "exact" })
        .eq("organization_id", authorized.data.organizationId);

      if (filters.clientId) query = query.eq("client_id", filters.clientId);
      if (filters.status) query = query.eq("status", filters.status);
      if (filters.search?.trim()) {
        const search = escapePostgrestSearch(filters.search.trim());
        query = query.or(`code.ilike.%${search}%,title.ilike.%${search}%`);
      }

      const result = await execute(async () =>
        query.order("updated_at", { ascending: false }).range(from, to),
      );
      if (!result.ok) return result;

      const rows = (result.data.data ?? []) as AuditEngagementRow[];
      return {
        ok: true,
        data: {
          items: rows.map(mapEngagement),
          page: currentPage,
          pageSize,
          total: result.data.count ?? rows.length,
        },
      };
    },

    getById,

    async create(
      context: RequestContext,
      input: CreateAuditEngagementInput,
    ): Promise<OperationResult<AuditEngagement>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const parsed = createAuditEngagementSchema.safeParse(input);
      if (!parsed.success) {
        return failure(
          createAppError(
            "VALIDATION_ERROR",
            parsed.error.issues[0]?.message ?? "Dados do trabalho invÃ¡lidos.",
            true,
          ),
        );
      }

      const created = await callRpc("create_audit_engagement", {
        p_client_id: parsed.data.clientId,
        p_acceptance_assessment_id: parsed.data.acceptanceAssessmentId,
        p_code: parsed.data.code,
        p_title: parsed.data.title,
        p_scope: parsed.data.scope,
        p_classification: parsed.data.classification,
      });
      if (!created.ok) return created;

      return refresh(authorized.data, created.data);
    },

    async update(
      context: RequestContext,
      id: AuditEngagementId,
      input: UpdateAuditEngagementInput,
    ): Promise<OperationResult<AuditEngagement>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const parsed = updateAuditEngagementSchema.safeParse(input);
      if (!parsed.success) {
        return failure(
          createAppError(
            "VALIDATION_ERROR",
            parsed.error.issues[0]?.message ?? "Dados do trabalho invÃ¡lidos.",
            true,
          ),
        );
      }

      const updated = await callRpc("update_audit_engagement", {
        p_engagement_id: id,
        p_title: parsed.data.title,
        p_scope: parsed.data.scope,
        p_classification: parsed.data.classification,
      });
      if (!updated.ok) return updated;

      return refresh(authorized.data, updated.data);
    },

    async changeStatus(
      context: RequestContext,
      id: AuditEngagementId,
      input: ChangeAuditEngagementStatusInput,
    ): Promise<OperationResult<AuditEngagement>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const parsed = changeAuditEngagementStatusSchema.safeParse(input);
      if (!parsed.success) {
        return failure(
          createAppError(
            "VALIDATION_ERROR",
            parsed.error.issues[0]?.message ?? "MudanÃ§a de estado invÃ¡lida.",
            true,
          ),
        );
      }

      const changed = await callRpc("change_audit_engagement_status", {
        p_engagement_id: id,
        p_status: parsed.data.status,
        p_reason: parsed.data.reason?.trim() || null,
      });
      if (!changed.ok) return changed;

      return refresh(authorized.data, changed.data);
    },
  };
}
