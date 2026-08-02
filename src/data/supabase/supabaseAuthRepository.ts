import type { User } from "@supabase/supabase-js";

import type { AuthRepository } from "@/data/authRepository";
import type { AuthError, AuthIdentity, AuthResult, AuthSession } from "@/domain/auth";
import { passwordResetSchema, signInSchema, updatePasswordSchema } from "@/domain/auth";
import { getSupabaseBrowserClient } from "@/data/supabase/supabaseClient";

function identityFromUser(user: User): AuthIdentity {
  return {
    id: user.id,
    email: user.email ?? "",
    emailVerified: Boolean(user.email_confirmed_at),
  };
}

function safeError(code: AuthError["code"], message: string): AuthResult<never> {
  return { ok: false, error: { code, message } };
}

function unexpectedError(): AuthResult<never> {
  return safeError(
    "AUTH_UNEXPECTED_ERROR",
    "Não foi possível concluir a operação. Tente novamente.",
  );
}

export const supabaseAuthRepository: AuthRepository = {
  async getCurrentSession() {
    try {
      const { data, error } = await getSupabaseBrowserClient().auth.getSession();
      if (error) return unexpectedError();
      if (!data.session) return { ok: true, data: null };
      return {
        ok: true,
        data: {
          identity: identityFromUser(data.session.user),
          expiresAt: data.session.expires_at,
        },
      };
    } catch {
      return safeError("AUTH_CONFIGURATION_ERROR", "A autenticação ainda não está disponível.");
    }
  },

  async getCurrentIdentity() {
    try {
      const { data, error } = await getSupabaseBrowserClient().auth.getUser();
      if (error || !data.user) return { ok: true, data: null };
      return { ok: true, data: identityFromUser(data.user) };
    } catch {
      return safeError("AUTH_CONFIGURATION_ERROR", "A autenticação ainda não está disponível.");
    }
  },

  async signIn(input) {
    const parsed = signInSchema.safeParse(input);
    if (!parsed.success) {
      return safeError(
        "AUTH_INVALID_CREDENTIALS",
        parsed.error.issues[0]?.message ?? "Dados inválidos.",
      );
    }

    try {
      const { data, error } = await getSupabaseBrowserClient().auth.signInWithPassword(parsed.data);
      if (error || !data.session) {
        return safeError(
          "AUTH_INVALID_CREDENTIALS",
          "Não foi possível entrar. Verifique as informações e tente novamente.",
        );
      }
      return {
        ok: true,
        data: {
          identity: identityFromUser(data.session.user),
          expiresAt: data.session.expires_at,
        },
      };
    } catch {
      return unexpectedError();
    }
  },

  async signOut() {
    try {
      const { error } = await getSupabaseBrowserClient().auth.signOut();
      return error ? unexpectedError() : { ok: true, data: undefined };
    } catch {
      return unexpectedError();
    }
  },

  async requestPasswordReset(input) {
    const parsed = passwordResetSchema.safeParse(input);
    if (!parsed.success) {
      return safeError(
        "AUTH_RECOVERY_ERROR",
        parsed.error.issues[0]?.message ?? "E-mail inválido.",
      );
    }
    try {
      const redirectTo = `${window.location.origin}/auth/callback?next=/redefinir-senha`;
      await getSupabaseBrowserClient().auth.resetPasswordForEmail(parsed.data.email, {
        redirectTo,
      });
      return { ok: true, data: undefined };
    } catch {
      return { ok: true, data: undefined };
    }
  },

  async updatePassword(input) {
    const parsed = updatePasswordSchema.safeParse(input);
    if (!parsed.success) {
      return safeError("AUTH_RECOVERY_ERROR", parsed.error.issues[0]?.message ?? "Senha inválida.");
    }
    try {
      const { error } = await getSupabaseBrowserClient().auth.updateUser({
        password: parsed.data.password,
      });
      return error ? unexpectedError() : { ok: true, data: undefined };
    } catch {
      return unexpectedError();
    }
  },

  async exchangeRecoveryCode(code) {
    try {
      const { error } = await getSupabaseBrowserClient().auth.exchangeCodeForSession(code);
      return error
        ? safeError("AUTH_RECOVERY_ERROR", "O link é inválido ou expirou.")
        : { ok: true, data: undefined };
    } catch {
      return safeError("AUTH_RECOVERY_ERROR", "O link é inválido ou expirou.");
    }
  },

  onAuthStateChange(listener) {
    const { data } = getSupabaseBrowserClient().auth.onAuthStateChange((_event, session) => {
      listener(session?.user ? identityFromUser(session.user) : null);
    });
    return { unsubscribe: () => data.subscription.unsubscribe() };
  },
};
