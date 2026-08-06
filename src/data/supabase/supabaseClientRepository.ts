import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { ClientRepository } from "@/data/clientRepository";
import {
  clientStatuses,
  createClientSchema,
  type Client,
  type ClientFilters,
  type ClientId,
  type ClientStatus,
  type CreateClientInput,
  type UpdateClientInput,
} from "@/domain/client";
import type { OperationResult, PageRequest, PageResult, RequestContext } from "@/domain/contracts";
import { createAppError, unexpectedError, type AppError } from "@/lib/app-error";
import { getSupabaseBrowserClient } from "@/data/supabase/supabaseClient";

type ClientRow = {
  id: string;
  organization_id: string;
  display_name: string;
  legal_name: string;
  tax_identifier_type: Client["taxIdentifierType"];
  tax_identifier: string | null;
  classification: Client["classification"];
  status: ClientStatus;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  inactivated_at: string | null;
  inactivated_by: string | null;
};

type ClientWritePayload = {
  display_name: string;
  legal_name: string;
  tax_identifier_type: ClientRow["tax_identifier_type"];
  tax_identifier: string | null;
  classification: ClientRow["classification"];
};

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

type SuccessfulResponse<T> = {
  data: T;
  count?: number | null;
};

type NormalizedClientInput = z.output<typeof createClientSchema>;

function failure<T>(error: AppError): OperationResult<T> {
  return { ok: false, error };
}

function requireContext(
  context: RequestContext,
): OperationResult<{ organizationId: string; userId: string }> {
  if (!context.organizationId || !context.userId) {
    return failure(
      createAppError("UNAUTHORIZED", "O contexto organizacional não está disponível."),
    );
  }

  return {
    ok: true,
    data: { organizationId: context.organizationId, userId: context.userId },
  };
}

function mapClient(row: ClientRow): Client {
  return {
    id: row.id,
    organizationId: row.organization_id,
    displayName: row.display_name,
    legalName: row.legal_name,
    taxIdentifierType: row.tax_identifier_type,
    taxIdentifier: row.tax_identifier ?? undefined,
    classification: row.classification,
    status: row.status,
    createdAt: row.created_at,
    createdBy: row.created_by,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by,
    inactivatedAt: row.inactivated_at ?? undefined,
    inactivatedBy: row.inactivated_by ?? undefined,
  };
}

function clientWritePayload(input: NormalizedClientInput): ClientWritePayload {
  return {
    display_name: input.displayName,
    legal_name: input.legalName,
    tax_identifier_type: input.taxIdentifierType,
    tax_identifier: input.taxIdentifier ?? null,
    classification: input.classification,
  };
}

function validationFailure(
  input: CreateClientInput | UpdateClientInput,
): { ok: true; data: NormalizedClientInput } | { ok: false; error: AppError } {
  const parsed = createClientSchema.safeParse(input);
  if (!parsed.success) {
    return failure(
      createAppError(
        "VALIDATION_ERROR",
        parsed.error.issues[0]?.message ?? "Dados inválidos.",
        true,
      ),
    );
  }

  return { ok: true, data: parsed.data };
}

function mapSupabaseError(error: SupabaseErrorLike): AppError {
  if (error.code === "23505") {
    return createAppError(
      "CONFLICT",
      "Já existe um cliente com este identificador nesta organização.",
      true,
      error,
    );
  }

  if (error.code === "23514") {
    return createAppError("VALIDATION_ERROR", "Os dados do cliente são inválidos.", true, error);
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
      "Você não possui permissão para administrar clientes.",
      false,
      error,
    );
  }

  if (error.code === "PGRST116") {
    return createAppError("NOT_FOUND", "Cliente não encontrado.", true, error);
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
  operation: () => Promise<SupabaseResponse<T>>,
): Promise<OperationResult<SuccessfulResponse<T>>> {
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

export function createSupabaseClientRepository(
  supabase: SupabaseClient = getSupabaseBrowserClient(),
): ClientRepository {
  return {
    async list(
      context: RequestContext,
      filters: ClientFilters = {},
      page: PageRequest = {},
    ): Promise<OperationResult<PageResult<Client>>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const currentPage = Math.max(1, page.page ?? 1);
      const pageSize = Math.max(1, page.pageSize ?? 20);
      const from = (currentPage - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("clients")
        .select("*", { count: "exact" })
        .eq("organization_id", authorized.data.organizationId);

      if (filters.status) query = query.eq("status", filters.status);
      if (filters.classification) query = query.eq("classification", filters.classification);
      if (filters.search?.trim()) {
        const search = escapePostgrestSearch(filters.search.trim());
        query = query.or(
          `display_name.ilike.%${search}%,legal_name.ilike.%${search}%,tax_identifier.ilike.%${search}%`,
        );
      }

      const result = await execute(async () =>
        query.order("display_name", { ascending: true }).range(from, to),
      );
      if (!result.ok) return result;

      const rows = (result.data.data ?? []) as ClientRow[];
      return {
        ok: true,
        data: {
          items: rows.map(mapClient),
          page: currentPage,
          pageSize,
          total: result.data.count ?? rows.length,
        },
      };
    },

    async getById(context: RequestContext, id: ClientId): Promise<OperationResult<Client>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const result = await execute(async () =>
        supabase
          .from("clients")
          .select("*")
          .eq("id", id)
          .eq("organization_id", authorized.data.organizationId)
          .maybeSingle(),
      );
      if (!result.ok) return result;
      if (!result.data.data)
        return failure(createAppError("NOT_FOUND", "Cliente não encontrado.", true));

      return { ok: true, data: mapClient(result.data.data as ClientRow) };
    },

    async create(
      context: RequestContext,
      input: CreateClientInput,
    ): Promise<OperationResult<Client>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const parsed = validationFailure(input);
      if (!parsed.ok) return parsed;

      const result = await execute(async () =>
        supabase
          .from("clients")
          .insert({
            organization_id: authorized.data.organizationId,
            ...clientWritePayload(parsed.data),
          })
          .select("*")
          .single(),
      );
      if (!result.ok) return result;
      if (!result.data.data) return failure(unexpectedError());

      return { ok: true, data: mapClient(result.data.data as ClientRow) };
    },

    async update(
      context: RequestContext,
      id: ClientId,
      input: UpdateClientInput,
    ): Promise<OperationResult<Client>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;

      const parsed = validationFailure(input);
      if (!parsed.ok) return parsed;

      const result = await execute(async () =>
        supabase
          .from("clients")
          .update(clientWritePayload(parsed.data))
          .eq("id", id)
          .eq("organization_id", authorized.data.organizationId)
          .select("*")
          .maybeSingle(),
      );
      if (!result.ok) return result;
      if (!result.data.data)
        return failure(createAppError("NOT_FOUND", "Cliente não encontrado.", true));

      return { ok: true, data: mapClient(result.data.data as ClientRow) };
    },

    async changeStatus(
      context: RequestContext,
      id: ClientId,
      status: ClientStatus,
    ): Promise<OperationResult<Client>> {
      const authorized = requireContext(context);
      if (!authorized.ok) return authorized;
      if (!clientStatuses.includes(status)) {
        return failure(createAppError("VALIDATION_ERROR", "Estado de cliente inválido.", true));
      }

      const result = await execute(async () =>
        supabase
          .from("clients")
          .update({ status })
          .eq("id", id)
          .eq("organization_id", authorized.data.organizationId)
          .select("*")
          .maybeSingle(),
      );
      if (!result.ok) return result;
      if (!result.data.data)
        return failure(createAppError("NOT_FOUND", "Cliente não encontrado.", true));

      return { ok: true, data: mapClient(result.data.data as ClientRow) };
    },
  };
}
