import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

const item = getNavItem("trabalhos")!;

export const Route = createFileRoute("/trabalhos")({
  head: () => ({
    meta: [
      { title: "Trabalhos — SIGA" },
      { name: "description", content: item.description },
      { property: "og:title", content: "Trabalhos — SIGA" },
      { property: "og:description", content: item.description },
    ],
  }),
  component: () => <ModuloFuturoPage item={item} />,
});
