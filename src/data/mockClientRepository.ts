import type { ClientRepository } from "@/data/clientRepository";
import {
  createClientSchema,
  updateClientSchema,
  type Client,
  type ClientFilters,
  type ClientId,
  type ClientStatus,
  type CreateClientInput,
  type UpdateClientInput,
} from "@/domain/client";
import type { OperationResult, PageRequest, PageResult, RequestContext } from "@/domain/contracts";
import { createAppError } from "@/lib/app-error";

function requireContext(
  context: RequestContext,
): OperationResult<{ organizationId: string; userId: string }> {
  if (!context.organizationId || !context.userId) {
    return {
      ok: false,
      error: createAppError("UNAUTHORIZED", "O contexto organizacional não está disponível."),
    };
  }
  return { ok: true, data: { organizationId: context.organizationId, userId: context.userId } };
}

export class MockClientRepository implements ClientRepository {
  private clients: Client[];

  public constructor(seed: Client[] = []) {
    this.clients = [...seed];
  }

  public async list(
    context: RequestContext,
    filters: ClientFilters = {},
    page: PageRequest = {},
  ): Promise<OperationResult<PageResult<Client>>> {
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;

    const search = filters.search?.trim().toLocaleLowerCase("pt-BR");
    const filtered = this.clients.filter((client) => {
      if (client.organizationId !== authorized.data.organizationId) return false;
      if (filters.status && client.status !== filters.status) return false;
      if (filters.classification && client.classification !== filters.classification) return false;
      if (!search) return true;
      return [client.displayName, client.legalName, client.taxIdentifier]
        .filter(Boolean)
        .some((value) => value!.toLocaleLowerCase("pt-BR").includes(search));
    });
    const pageSize = Math.max(1, page.pageSize ?? 20);
    const currentPage = Math.max(1, page.page ?? 1);
    const start = (currentPage - 1) * pageSize;
    return {
      ok: true,
      data: {
        items: filtered.slice(start, start + pageSize),
        page: currentPage,
        pageSize,
        total: filtered.length,
      },
    };
  }

  public async getById(context: RequestContext, id: ClientId): Promise<OperationResult<Client>> {
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const client = this.clients.find(
      (item) => item.id === id && item.organizationId === authorized.data.organizationId,
    );
    return client
      ? { ok: true, data: client }
      : { ok: false, error: createAppError("NOT_FOUND", "Cliente não encontrado.", true) };
  }

  public async create(
    context: RequestContext,
    input: CreateClientInput,
  ): Promise<OperationResult<Client>> {
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const parsed = createClientSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          parsed.error.issues[0]?.message ?? "Dados inválidos.",
          true,
        ),
      };
    }
    if (
      parsed.data.taxIdentifier &&
      this.clients.some(
        (client) =>
          client.organizationId === authorized.data.organizationId &&
          client.taxIdentifierType === parsed.data.taxIdentifierType &&
          client.taxIdentifier === parsed.data.taxIdentifier,
      )
    ) {
      return {
        ok: false,
        error: createAppError(
          "CONFLICT",
          "Já existe um cliente com este identificador nesta organização.",
          true,
        ),
      };
    }
    const now = new Date().toISOString();
    const client: Client = {
      id: crypto.randomUUID(),
      organizationId: authorized.data.organizationId,
      ...parsed.data,
      status: "active",
      createdAt: now,
      createdBy: authorized.data.userId,
      updatedAt: now,
      updatedBy: authorized.data.userId,
    };
    this.clients = [...this.clients, client];
    return { ok: true, data: client };
  }

  public async update(
    context: RequestContext,
    id: ClientId,
    input: UpdateClientInput,
  ): Promise<OperationResult<Client>> {
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const parsed = updateClientSchema.safeParse(input);
    if (!parsed.success) {
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          parsed.error.issues[0]?.message ?? "Dados inválidos.",
          true,
        ),
      };
    }
    const current = await this.getById(context, id);
    if (!current.ok) return current;
    if (
      parsed.data.taxIdentifier &&
      this.clients.some(
        (client) =>
          client.id !== id &&
          client.organizationId === authorized.data.organizationId &&
          client.taxIdentifierType === parsed.data.taxIdentifierType &&
          client.taxIdentifier === parsed.data.taxIdentifier,
      )
    ) {
      return {
        ok: false,
        error: createAppError(
          "CONFLICT",
          "Já existe um cliente com este identificador nesta organização.",
          true,
        ),
      };
    }
    const updated: Client = {
      ...current.data,
      ...parsed.data,
      updatedAt: new Date().toISOString(),
      updatedBy: authorized.data.userId,
    };
    this.clients = this.clients.map((client) => (client.id === id ? updated : client));
    return { ok: true, data: updated };
  }

  public async changeStatus(
    context: RequestContext,
    id: ClientId,
    status: ClientStatus,
  ): Promise<OperationResult<Client>> {
    const authorized = requireContext(context);
    if (!authorized.ok) return authorized;
    const current = await this.getById(context, id);
    if (!current.ok) return current;
    const now = new Date().toISOString();
    const updated: Client = {
      ...current.data,
      status,
      updatedAt: now,
      updatedBy: authorized.data.userId,
      inactivatedAt: status === "inactive" ? now : undefined,
      inactivatedBy: status === "inactive" ? authorized.data.userId : undefined,
    };
    this.clients = this.clients.map((client) => (client.id === id ? updated : client));
    return { ok: true, data: updated };
  }
}
