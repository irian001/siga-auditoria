import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabaseAuthRepository } from "@/data/supabase/supabaseAuthRepository";
import { AuthPage } from "@/features/auth/AuthPage";

const searchSchema = z.object({
  code: z.string().optional(),
  next: z.string().default("/redefinir-senha"),
});

export const Route = createFileRoute("/auth/callback")({
  validateSearch: searchSchema,
  component: AuthCallbackRoute,
});

function AuthCallbackRoute() {
  const { code, next } = Route.useSearch();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!code) {
      setError("O link é inválido ou expirou.");
      return;
    }

    void supabaseAuthRepository.exchangeRecoveryCode(code).then(async (result) => {
      if (!result.ok) {
        setError(result.error.message);
        return;
      }
      const destination = next === "/redefinir-senha" ? "/redefinir-senha" : "/acesso-pendente";
      await navigate({ to: destination, replace: true });
    });
  }, [code, navigate, next]);

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
