import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

export const Route = createFileRoute("/papeis-trabalho")({
  head: () => ({
    meta: [
      { title: "Papéis de trabalho — SIGA" },
      { name: "description", content: getNavItem("papeis-trabalho")!.description },
      { property: "og:title", content: "Papéis de trabalho — SIGA" },
      { property: "og:description", content: getNavItem("papeis-trabalho")!.description },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  return <ModuloFuturoPage item={getNavItem("papeis-trabalho")!} />;
}
