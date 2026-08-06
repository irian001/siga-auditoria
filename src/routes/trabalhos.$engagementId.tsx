import { createFileRoute } from "@tanstack/react-router";

import { EngagementDashboardPage } from "@/features/engagements/EngagementDashboardPage";

export const Route = createFileRoute("/trabalhos/$engagementId")({
  head: () => ({
    meta: [
      { title: "Painel do trabalho — SIGA" },
      {
        name: "description",
        content: "Consulta protegida do contexto de um trabalho de auditoria.",
      },
    ],
  }),
  component: EngagementDashboardRoute,
});

function EngagementDashboardRoute() {
  const { engagementId } = Route.useParams();
  return <EngagementDashboardPage engagementId={engagementId} />;
}
