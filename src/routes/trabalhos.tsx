import { createFileRoute } from "@tanstack/react-router";

import { getNavItem } from "@/config/navigation";
import { EngagementsPage } from "@/features/engagements/EngagementsPage";

export const Route = createFileRoute("/trabalhos")({
  head: () => ({
    meta: [
      { title: "Trabalhos — SIGA" },
      { name: "description", content: getNavItem("trabalhos")!.description },
      { property: "og:title", content: "Trabalhos — SIGA" },
      { property: "og:description", content: getNavItem("trabalhos")!.description },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  return <EngagementsPage />;
}
