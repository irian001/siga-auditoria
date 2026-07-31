import { createFileRoute } from "@tanstack/react-router";

import { AuthPage } from "@/features/auth/AuthPage";
import { LoginForm } from "@/features/auth/LoginForm";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — SIGA" }] }),
  component: LoginRoute,
});

function LoginRoute() {
  return (
    <AuthPage title="Entrar" description="Use as credenciais concedidas pela sua organização.">
      <LoginForm />
    </AuthPage>
  );
}
