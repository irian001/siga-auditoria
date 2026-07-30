import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

export const Route = createFileRoute("/revisao")({
  head: () => ({
    meta: [
      { title: "Revisão — SIGA" },
      { name: "description", content: getNavItem("revisao")!.description },
      { property: "og:title", content: "Revisão — SIGA" },
      { property: "og:description", content: getNavItem("revisao")!.description },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  return <ModuloFuturoPage item={getNavItem("revisao")!} />;
}
