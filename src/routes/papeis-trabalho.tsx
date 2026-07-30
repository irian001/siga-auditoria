import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

const item = getNavItem("papeis-trabalho")!;

export const Route = createFileRoute("/papeis-trabalho")({
  head: () => ({
    meta: [
      { title: "Papéis de trabalho — SIGA" },
      { name: "description", content: item.description },
      { property: "og:title", content: "Papéis de trabalho — SIGA" },
      { property: "og:description", content: item.description },
    ],
  }),
  component: () => <ModuloFuturoPage item={item} />,
});
