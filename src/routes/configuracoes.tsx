import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

const item = getNavItem("configuracoes")!;

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — SIGA" },
      { name: "description", content: item.description },
      { property: "og:title", content: "Configurações — SIGA" },
      { property: "og:description", content: item.description },
    ],
  }),
  component: () => <ModuloFuturoPage item={item} />,
});
