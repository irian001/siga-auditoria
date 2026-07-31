import { createAppError } from "@/lib/app-error";
import type {
  EntityId,
  EntityMetadata,
  ListFilters,
  OperationResult,
  PageRequest,
  PageResult,
  RequestContext,
} from "@/domain/contracts";
import type { Repository } from "@/data/repository";

type MockRepositoryOptions<TEntity extends EntityMetadata, TCreate, TUpdate> = {
  seed?: TEntity[];
  delayMs?: number;
  createEntity: (context: RequestContext, input: TCreate, id: EntityId, now: string) => TEntity;
  updateEntity: (entity: TEntity, input: TUpdate, now: string) => TEntity;
};

/**
 * Adaptador temporário em memória. Não persiste dados e não implementa regras de negócio.
 */
export class MockRepository<TEntity extends EntityMetadata, TCreate, TUpdate> implements Repository<
  TEntity,
  TCreate,
  TUpdate
> {
  private items: TEntity[];

  public constructor(private readonly options: MockRepositoryOptions<TEntity, TCreate, TUpdate>) {
    this.items = [...(options.seed ?? [])];
  }

  public async list(
    _context: RequestContext,
    _filters?: ListFilters,
    page: PageRequest = {},
  ): Promise<OperationResult<PageResult<TEntity>>> {
    await this.wait();
    const pageSize = Math.max(1, page.pageSize ?? 20);
    const currentPage = Math.max(1, page.page ?? 1);
    const start = (currentPage - 1) * pageSize;
    return {
      ok: true,
      data: {
        items: this.items.slice(start, start + pageSize),
        page: currentPage,
        pageSize,
        total: this.items.length,
      },
    };
  }

  public async getById(_context: RequestContext, id: EntityId): Promise<OperationResult<TEntity>> {
    await this.wait();
    const item = this.items.find((current) => current.id === id);
    return item
      ? { ok: true, data: item }
      : { ok: false, error: createAppError("NOT_FOUND", "Registro não encontrado.", true) };
  }

  public async create(context: RequestContext, input: TCreate): Promise<OperationResult<TEntity>> {
    await this.wait();
    const now = new Date().toISOString();
    const item = this.options.createEntity(context, input, crypto.randomUUID(), now);
    this.items = [...this.items, item];
    return { ok: true, data: item };
  }

  public async update(
    _context: RequestContext,
    id: EntityId,
    input: TUpdate,
  ): Promise<OperationResult<TEntity>> {
    await this.wait();
    const index = this.items.findIndex((current) => current.id === id);
    if (index < 0) {
      return { ok: false, error: createAppError("NOT_FOUND", "Registro não encontrado.", true) };
    }
    const updated = this.options.updateEntity(this.items[index], input, new Date().toISOString());
    this.items = this.items.map((item, currentIndex) => (currentIndex === index ? updated : item));
    return { ok: true, data: updated };
  }

  private async wait(): Promise<void> {
    if (!this.options.delayMs) return;
    await new Promise((resolve) => setTimeout(resolve, this.options.delayMs));
  }
}
