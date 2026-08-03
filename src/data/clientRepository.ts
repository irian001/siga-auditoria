import type { OperationResult, PageRequest, PageResult, RequestContext } from "@/domain/contracts";
import type {
  Client,
  ClientFilters,
  ClientId,
  ClientStatus,
  CreateClientInput,
  UpdateClientInput,
} from "@/domain/client";

/** Contrato do cadastro de clientes. Não oferece exclusão física. */
export type ClientRepository = {
  list(
    context: RequestContext,
    filters?: ClientFilters,
    page?: PageRequest,
  ): Promise<OperationResult<PageResult<Client>>>;
  getById(context: RequestContext, id: ClientId): Promise<OperationResult<Client>>;
  create(context: RequestContext, input: CreateClientInput): Promise<OperationResult<Client>>;
  update(
    context: RequestContext,
    id: ClientId,
    input: UpdateClientInput,
  ): Promise<OperationResult<Client>>;
  changeStatus(
    context: RequestContext,
    id: ClientId,
    status: ClientStatus,
  ): Promise<OperationResult<Client>>;
};
