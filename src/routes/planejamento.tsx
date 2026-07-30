import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

const item = getNavItem("planejamento")!;

export const Route = createFileRoute("/planejamento")({
  head: () => ({
    meta: [
      { title: "Planejamento — SIGA" },
      { name: "description", content: item.description },
      { property: "og:title", content: "Planejamento — SIGA" },
      { property: "og:description", content: item.description },
    ],
  }),
  component: () => <ModuloFuturoPage item={item} />,
});
