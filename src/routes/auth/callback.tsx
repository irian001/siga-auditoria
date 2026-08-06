import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabaseAuthRepository } from "@/data/supabase/supabaseAuthRepository";
import { AuthPage } from "@/features/auth/AuthPage";

const searchSchema = z.object({
  code: z.string().optional(),
  token_hash: z.string().optional(),
  type: z.enum(["recovery"]).optional(),
  next: z.string().default("/redefinir-senha"),
});

export const Route = createFileRoute("/auth/callback")({
  validateSearch: searchSchema,
  component: AuthCallbackRoute,
});

function AuthCallbackRoute() {
  const { code, token_hash: tokenHash, type, next } = Route.useSearch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function validateLink() {
      const result =
        tokenHash && type === "recovery"
          ? await supabaseAuthRepository.verifyRecoveryToken(tokenHash)
          : code
            ? await supabaseAuthRepository.exchangeRecoveryCode(code)
            : await supabaseAuthRepository.getCurrentSession();

      if (!result.ok) {
        setError(result.error.message);
        return;
      }

      if (!tokenHash && !code && !result.data) {
        setError("O link é inválido ou expirou.");
        return;
      }

      const destination = next === "/redefinir-senha" ? "/redefinir-senha" : "/acesso-pendente";
      await navigate({ to: destination, replace: true });
    }

    void validateLink();
  }, [code, navigate, next, tokenHash, type]);

  return (
    <AuthPage title="Validando acesso" description="Aguarde enquanto o link é verificado.">
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <div className="flex items-center justify-center gap-3 py-6 text-sm text-muted-foreground">
          <Loader2 className="size-5 animate-spin text-primary" />
          Validando link seguro...
        </div>
      )}
    </AuthPage>
  );
}
