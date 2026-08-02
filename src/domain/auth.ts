import { z } from "zod";

export type AuthStatus =
  | "checking"
  | "signed-out"
  | "signing-in"
  | "authenticated"
  | "access-pending"
  | "expired"
  | "error";

export type AuthIdentity = {
  id: string;
  email: string;
  emailVerified: boolean;
};

export type AuthSession = {
  identity: AuthIdentity;
  expiresAt?: number;
};

export type AuthErrorCode =
  | "AUTH_CONFIGURATION_ERROR"
  | "AUTH_INVALID_CREDENTIALS"
  | "AUTH_SESSION_EXPIRED"
  | "AUTH_RECOVERY_ERROR"
  | "AUTH_UNEXPECTED_ERROR";

export type AuthError = { code: AuthErrorCode; message: string };
export type AuthResult<T> = { ok: true; data: T } | { ok: false; error: AuthError };

const emailSchema = z.string().trim().toLowerCase().email("Informe um e-mail válido.");

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Informe a senha."),
});

export const passwordResetSchema = z.object({ email: emailSchema });

export const updatePasswordSchema = z
  .object({
    password: z.string().min(8, "A nova senha deve possuir ao menos 8 caracteres."),
    passwordConfirmation: z.string().min(1, "Confirme a nova senha."),
  })
  .refine((input) => input.password === input.passwordConfirmation, {
    message: "As senhas informadas são diferentes.",
    path: ["passwordConfirmation"],
  });

export type SignInInput = z.input<typeof signInSchema>;
export type PasswordResetInput = z.input<typeof passwordResetSchema>;
export type UpdatePasswordInput = z.input<typeof updatePasswordSchema>;
