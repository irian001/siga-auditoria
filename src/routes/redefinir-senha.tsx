import { createFileRoute } from "@tanstack/react-router";

import { AuthPage } from "@/features/auth/AuthPage";
import { PasswordUpdateForm } from "@/features/auth/PasswordUpdateForm";

export const Route = createFileRoute("/redefinir-senha")({
  head: () => ({ meta: [{ title: "Redefinir senha — SIGA" }] }),
  component: PasswordUpdateRoute,
});

function PasswordUpdateRoute() {
  return (
    <AuthPage title="Definir nova senha" description="Escolha uma nova senha para sua conta.">
      <PasswordUpdateForm />
    </AuthPage>
  );
}
