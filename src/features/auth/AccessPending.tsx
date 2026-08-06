import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { Building2, CircleAlert, LogOut, ShieldAlert } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { supabaseAuthRepository } from "@/data/supabase/supabaseAuthRepository";

import { AuthPage } from "./AuthPage";

const rootRoute = getRouteApi("__root__");

const accessMessages = {
  pending: {
    title: "Liberação organizacional pendente",
    description:
      "Procure o administrador da sua organização para concluir seu vínculo e atribuir o papel necessário. Nenhum dado do SIGA pode ser acessado enquanto a liberação não estiver ativa.",
    variant: "info" as const,
    icon: Building2,
  },
  blocked: {
    title: "Acesso organizacional bloqueado",
    description:
      "Seu perfil, vínculo ou papel não autoriza este acesso. Procure o administrador da organização para revisar sua liberação.",
    variant: "warning" as const,
    icon: ShieldAlert,
  },
  error: {
    title: "Não foi possível validar o acesso",
    description:
      "O SIGA não conseguiu confirmar seu contexto organizacional. Encerre a sessão e tente novamente.",
    variant: "destructive" as const,
    icon: CircleAlert,
  },
};

export function AccessPending() {
  const { auth } = rootRoute.useRouteContext();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const accessStatus =
    auth.access?.status === "active" ? "error" : (auth.access?.status ?? "error");
  const message = accessMessages[accessStatus];
  const MessageIcon = message.icon;

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
        <Alert variant={message.variant}>
          <MessageIcon aria-hidden="true" />
          <div>
            <AlertTitle>{message.title}</AlertTitle>
            <AlertDescription>{message.description}</AlertDescription>
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
