export const APP_ERROR_CODES = [
  "CONFIGURATION_ERROR",
  "NETWORK_ERROR",
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "VALIDATION_ERROR",
  "CONFLICT",
  "UNEXPECTED_ERROR",
] as const;

export type AppErrorCode = (typeof APP_ERROR_CODES)[number];

/** Erro seguro para contratos e interface; `cause` nunca deve ser exibida ao usuário. */
export type AppError = {
  code: AppErrorCode;
  message: string;
  recoverable: boolean;
  cause?: unknown;
};

export function createAppError(
  code: AppErrorCode,
  message: string,
  recoverable = false,
  cause?: unknown,
): AppError {
  return { code, message, recoverable, cause };
}

export function unexpectedError(cause?: unknown): AppError {
  return createAppError(
    "UNEXPECTED_ERROR",
    "Não foi possível concluir a operação. Tente novamente ou registre a ocorrência.",
    true,
    cause,
  );
}
