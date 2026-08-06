import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

export const Route = createFileRoute("/documentos-evidencias")({
  head: () => ({
    meta: [
      { title: "Documentos e evidências — SIGA" },
      { name: "description", content: getNavItem("documentos-evidencias")!.description },
      { property: "og:title", content: "Documentos e evidências — SIGA" },
      { property: "og:description", content: getNavItem("documentos-evidencias")!.description },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  return <ModuloFuturoPage item={getNavItem("documentos-evidencias")!} />;
}
