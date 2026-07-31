import type { AppError } from "@/lib/app-error";

export type SigaEnvironment = "development" | "staging" | "production";

export type EntityId = string;

export type EntityMetadata = {
  id: EntityId;
  createdAt: string;
  updatedAt: string;
};

/** Contexto técnico preparado para a futura autenticação e multiempresa. */
export type RequestContext = {
  environment: SigaEnvironment;
  organizationId?: string;
  userId?: string;
};

export type PageRequest = {
  page?: number;
  pageSize?: number;
};

export type PageResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};

export type ListFilters = Record<string, string | number | boolean | undefined>;

export type OperationSuccess<T> = {
  ok: true;
  data: T;
};

export type OperationFailure = {
  ok: false;
  error: AppError;
};

export type OperationResult<T> = OperationSuccess<T> | OperationFailure;
