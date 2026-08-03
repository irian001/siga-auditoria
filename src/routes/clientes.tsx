import { createFileRoute } from "@tanstack/react-router";

import { ClientsPage } from "@/features/clients/ClientsPage";
import { getNavItem } from "@/config/navigation";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes — SIGA" },
      { name: "description", content: getNavItem("clientes")!.description },
      { property: "og:title", content: "Clientes — SIGA" },
      { property: "og:description", content: getNavItem("clientes")!.description },
    ],
  }),
  component: ClientesRoute,
});

function ClientesRoute() {
  return <ClientsPage />;
}
