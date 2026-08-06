import { createFileRoute } from "@tanstack/react-router";

import { AccessPending } from "@/features/auth/AccessPending";

export const Route = createFileRoute("/acesso-pendente")({
  head: () => ({ meta: [{ title: "Acesso aguardando liberação — SIGA" }] }),
  component: AccessPending,
});
