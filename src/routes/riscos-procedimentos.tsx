import { createFileRoute } from "@tanstack/react-router";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { getNavItem } from "@/config/navigation";

const item = getNavItem("riscos-procedimentos")!;

export const Route = createFileRoute("/riscos-procedimentos")({
  head: () => ({
    meta: [
      { title: "Riscos e procedimentos — SIGA" },
      { name: "description", content: item.description },
      { property: "og:title", content: "Riscos e procedimentos — SIGA" },
      { property: "og:description", content: item.description },
    ],
  }),
  component: () => <ModuloFuturoPage item={item} />,
});
