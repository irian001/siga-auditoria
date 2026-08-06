import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { ErrorState } from "@/components/states/ErrorState";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { appEnvironment } from "@/config/env";
import { createSupabaseAcceptanceRepository } from "@/data/supabase/supabaseAcceptanceRepository";
import { createSupabaseClientRepository } from "@/data/supabase/supabaseClientRepository";
import { createSupabaseEngagementRepository } from "@/data/supabase/supabaseEngagementRepository";
import { can } from "@/domain/authorization";
import type { AppErrorCode } from "@/lib/app-error";
import type { RequestContext } from "@/domain/contracts";
import {
  ENGAGEMENT_CLASSIFICATION_LABELS,
  ENGAGEMENT_STATUS_BADGES,
  ENGAGEMENT_STATUS_LABELS,
  formatEngagementDate,
} from "@/features/engagements/engagementsPresentation";

const rootRoute = getRouteApi("__root__");

let engagementRepository: ReturnType<typeof createSupabaseEngagementRepository> | undefined;
let clientRepository: ReturnType<typeof createSupabaseClientRepository> | undefined;
let acceptanceRepository: ReturnType<typeof createSupabaseAcceptanceRepository> | undefined;

function getEngagementRepository() {
  engagementRepository ??= createSupabaseEngagementRepository();
  return engagementRepository;
}

function getClientRepository() {
  clientRepository ??= createSupabaseClientRepository();
  return clientRepository;
}

function getAcceptanceRepository() {
  acceptanceRepository ??= createSupabaseAcceptanceRepository();
  return acceptanceRepository;
}

class DashboardReadError extends Error {
  public constructor(
    public readonly code: AppErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "DashboardReadError";
  }
}

type EngagementDashboardPageProps = {
  engagementId: string;
};

export function EngagementDashboardPage({ engagementId }: EngagementDashboardPageProps) {
  const { auth } = rootRoute.useRouteContext();
  const access = auth.access?.status === "active" ? auth.access.context : null;
  const authorization = access?.authorization ?? null;
  const organizationId = access?.organization.id;
  const canView = can(authorization, "engagements.view", organizationId);

  const context = useMemo<RequestContext>(
    () => ({
      environment: appEnvironment.environment,
      organizationId,
      userId: access?.profile.id,
    }),
    [access?.profile.id, organizationId],
  );

  const query = useQuery({
    enabled: canView,
    queryKey: ["engagement-dashboard", organizationId, engagementId],
    queryFn: async () => {
      const engagementResult = await getEngagementRepository().getById(context, engagementId);
      if (!engagementResult.ok) {
        throw new DashboardReadError(engagementResult.error.code, engagementResult.error.message);
      }

      const clientResult = await getClientRepository().getById(
        context,
        engagementResult.data.clientId,
      );
      if (!clientResult.ok) {
        throw new DashboardReadError(clientResult.error.code, clientResult.error.message);
      }

      const acceptanceResult = await getAcceptanceRepository().getById(
        context,
        engagementResult.data.acceptanceAssessmentId,
      );
      if (!acceptanceResult.ok) {
        throw new DashboardReadError(acceptanceResult.error.code, acceptanceResult.error.message);
      }

      return {
        engagement: engagementResult.data,
        client: clientResult.data,
        acceptance: acceptanceResult.data,
      };
    },
  });

  if (!canView) {
    return (
      <ErrorState
        title="Consulta não autorizada"
        description="Você não possui permissão para consultar este trabalho."
      />
    );
  }

  if (query.isPending) {
    return (
      <div className="space-y-4">
        <PageHeader title="Painel do trabalho" description="Carregando o contexto do trabalho..." />
        <p className="text-sm text-muted-foreground">Carregando trabalho, cliente e aceitação...</p>
      </div>
    );
  }

  if (query.isError) {
    const error = query.error as DashboardReadError;
    const notFound = error.code === "NOT_FOUND";
    return (
      <ErrorState
        title={notFound ? "Trabalho não encontrado" : "Não foi possível carregar o trabalho"}
        description={
          notFound
            ? "O trabalho não existe neste contexto organizacional ou não está disponível para consulta."
            : error.message
        }
      />
    );
  }

  const { engagement, client, acceptance } = query.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={engagement.title}
        description="Consulta protegida do contexto do trabalho."
        breadcrumbLabel="Trabalhos / Painel"
        badge={
          <StatusBadge status={ENGAGEMENT_STATUS_BADGES[engagement.status]}>
            {ENGAGEMENT_STATUS_LABELS[engagement.status]}
          </StatusBadge>
        }
      />

      <section
        className="rounded-lg border border-border bg-card p-5"
        aria-label="Resumo do trabalho"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Código
            </p>
            <p className="mt-1 text-lg font-semibold text-foreground">{engagement.code}</p>
          </div>
          <Badge variant="neutral">
            {ENGAGEMENT_CLASSIFICATION_LABELS[engagement.classification]}
          </Badge>
        </div>

        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-muted-foreground">Cliente</dt>
            <dd className="mt-1 font-medium text-foreground">{client.displayName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Aceitação</dt>
            <dd className="mt-1 font-medium text-foreground">{acceptance.status}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Criado em</dt>
            <dd className="mt-1 font-medium text-foreground">
              {formatEngagementDate(engagement.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Última atualização</dt>
            <dd className="mt-1 font-medium text-foreground">
              {formatEngagementDate(engagement.updatedAt)}
            </dd>
          </div>
        </dl>
      </section>

      <section
        className="rounded-lg border border-border bg-card p-5"
        aria-label="Escopo preliminar"
      >
        <h2 className="text-sm font-semibold text-foreground">Escopo preliminar</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
          {engagement.scope}
        </p>
      </section>
    </div>
  );
}
