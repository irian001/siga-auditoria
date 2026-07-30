import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

export const Route = createFileRoute("/trabalhos")({
  head: () => ({
    meta: [
      { title: "Trabalhos — SIGA" },
      { name: "description", content: getNavItem("trabalhos")!.description },
      { property: "og:title", content: "Trabalhos — SIGA" },
      { property: "og:description", content: getNavItem("trabalhos")!.description },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  return <ModuloFuturoPage item={getNavItem("trabalhos")!} />;
}
