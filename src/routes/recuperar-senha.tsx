import { createFileRoute } from "@tanstack/react-router";

import { AuthPage } from "@/features/auth/AuthPage";
import { PasswordRecoveryForm } from "@/features/auth/PasswordRecoveryForm";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({ meta: [{ title: "Recuperar senha — SIGA" }] }),
  component: RecoveryRoute,
});

function RecoveryRoute() {
  return (
    <AuthPage
      title="Recuperar senha"
      description="Informe seu e-mail para receber as orientações de recuperação."
    >
      <PasswordRecoveryForm />
    </AuthPage>
  );
}
