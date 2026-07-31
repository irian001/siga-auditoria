import type {
  EntityId,
  EntityMetadata,
  ListFilters,
  OperationResult,
  PageRequest,
  PageResult,
  RequestContext,
} from "@/domain/contracts";

/**
 * Contrato genérico: a interface não conhece React, Supabase ou entidades do SIGA.
 * Implementações reais serão introduzidas apenas nas SDDs próprias de dados e segurança.
 */
export type Repository<TEntity extends EntityMetadata, TCreate, TUpdate, TFilters = ListFilters> = {
  list(
    context: RequestContext,
    filters?: TFilters,
    page?: PageRequest,
  ): Promise<OperationResult<PageResult<TEntity>>>;
  getById(context: RequestContext, id: EntityId): Promise<OperationResult<TEntity>>;
  create(context: RequestContext, input: TCreate): Promise<OperationResult<TEntity>>;
  update(context: RequestContext, id: EntityId, input: TUpdate): Promise<OperationResult<TEntity>>;
  archive?(context: RequestContext, id: EntityId): Promise<OperationResult<void>>;
};
