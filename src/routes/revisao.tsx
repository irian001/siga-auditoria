import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

const item = getNavItem("revisao")!;

export const Route = createFileRoute("/revisao")({
  head: () => ({
    meta: [
      { title: "Revisão — SIGA" },
      { name: "description", content: item.description },
      { property: "og:title", content: "Revisão — SIGA" },
      { property: "og:description", content: item.description },
    ],
  }),
  component: () => <ModuloFuturoPage item={item} />,
});
