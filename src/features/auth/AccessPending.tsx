import { useNavigate } from "@tanstack/react-router";
import { Building2, LogOut } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { supabaseAuthRepository } from "@/data/supabase/supabaseAuthRepository";

import { AuthPage } from "./AuthPage";

export function AccessPending() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await supabaseAuthRepository.signOut();
    await navigate({ to: "/login", replace: true });
  }

  return (
    <AuthPage
      title="Acesso aguardando liberação"
      description="Sua identidade foi confirmada, mas o acesso organizacional ainda não está disponível."
    >
      <div className="space-y-5">
        <Alert variant="info">
          <Building2 aria-hidden="true" />
          <div>
            <AlertTitle>Vínculo organizacional pendente</AlertTitle>
            <AlertDescription>
              Procure o administrador da sua organização para solicitar a liberação. Nenhum dado do
              SIGA pode ser acessado enquanto o vínculo não estiver ativo.
            </AlertDescription>
          </div>
        </Alert>
        <Button variant="outline" className="w-full" onClick={signOut} disabled={pending}>
          <LogOut />
          {pending ? "Saindo..." : "Encerrar sessão"}
        </Button>
      </div>
    </AuthPage>
  );
}
