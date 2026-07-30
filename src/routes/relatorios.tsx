import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

export const Route = createFileRoute("/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios — SIGA" },
      { name: "description", content: getNavItem("relatorios")!.description },
      { property: "og:title", content: "Relatórios — SIGA" },
      { property: "og:description", content: getNavItem("relatorios")!.description },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  return <ModuloFuturoPage item={getNavItem("relatorios")!} />;
}
