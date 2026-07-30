import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

const item = getNavItem("documentos-evidencias")!;

export const Route = createFileRoute("/documentos-evidencias")({
  head: () => ({
    meta: [
      { title: "Documentos e evidências — SIGA" },
      { name: "description", content: item.description },
      { property: "og:title", content: "Documentos e evidências — SIGA" },
      { property: "og:description", content: item.description },
    ],
  }),
  component: () => <ModuloFuturoPage item={item} />,
});
