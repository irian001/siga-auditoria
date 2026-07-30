import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — SIGA" },
      { name: "description", content: getNavItem("configuracoes")!.description },
      { property: "og:title", content: "Configurações — SIGA" },
      { property: "og:description", content: getNavItem("configuracoes")!.description },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  return <ModuloFuturoPage item={getNavItem("configuracoes")!} />;
}
