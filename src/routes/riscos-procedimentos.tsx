import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

export const Route = createFileRoute("/riscos-procedimentos")({
  head: () => ({
    meta: [
      { title: "Riscos e procedimentos — SIGA" },
      { name: "description", content: getNavItem("riscos-procedimentos")!.description },
      { property: "og:title", content: "Riscos e procedimentos — SIGA" },
      { property: "og:description", content: getNavItem("riscos-procedimentos")!.description },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  return <ModuloFuturoPage item={getNavItem("riscos-procedimentos")!} />;
}
