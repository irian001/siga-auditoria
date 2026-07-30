import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

export const Route = createFileRoute("/planejamento")({
  head: () => ({
    meta: [
      { title: "Planejamento — SIGA" },
      { name: "description", content: getNavItem("planejamento")!.description },
      { property: "og:title", content: "Planejamento — SIGA" },
      { property: "og:description", content: getNavItem("planejamento")!.description },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  return <ModuloFuturoPage item={getNavItem("planejamento")!} />;
}
