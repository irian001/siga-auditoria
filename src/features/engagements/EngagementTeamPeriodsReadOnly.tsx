import { CalendarDays, Plus, UsersRound } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { can, type AuthorizationContext } from "@/domain/authorization";
import { createSupabaseEngagementTeamPeriodsRepository } from "@/data/supabase/supabaseEngagementTeamRepository";
import { getSupabaseBrowserClient } from "@/data/supabase/supabaseClient";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EngagementTeamMemberAssignment } from "@/features/engagements/EngagementTeamMemberAssignment";

let repository: ReturnType<typeof createSupabaseEngagementTeamPeriodsRepository> | undefined;

function getRepository() {
  repository ??= createSupabaseEngagementTeamPeriodsRepository(getSupabaseBrowserClient());
  return repository;
}

type EngagementTeamPeriodsReadOnlyProps = {
  organizationId?: string;
  engagementId: string;
  authorization: AuthorizationContext | null;
};

export function EngagementTeamPeriodsReadOnly({
  organizationId,
  engagementId,
  authorization,
}: EngagementTeamPeriodsReadOnlyProps) {
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const canView = Boolean(
    organizationId && authorization && can(authorization, "engagements.view", organizationId),
  );

  const query = useQuery({
    enabled: canView,
    queryKey: ["engagement-team-periods", organizationId, engagementId],
    queryFn: async () => {
      if (!organizationId || !authorization) {
        throw new Error("Contexto organizacional indisponível.");
      }

      const result = await getRepository().getByEngagement({
        organizationId,
        engagementId,
        authorization,
      });
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  if (!canView) {
    return (
      <ErrorState
        title="Consulta não autorizada"
        description="Você não possui permissão para consultar equipe e períodos deste trabalho."
      />
    );
  }

  if (query.isPending) {
    return <p className="text-sm text-muted-foreground">Carregando equipe e períodos...</p>;
  }

  if (query.isError) {
    return (
      <ErrorState
        title="Não foi possível carregar equipe e períodos"
        description={query.error.message}
      />
    );
  }

  const { teamMembers, periods } = query.data;
  const canManage = Boolean(
    organizationId && authorization && can(authorization, "engagements.manage", organizationId),
  );

  return (
    <section className="mt-6 space-y-5 border-t border-border pt-5" aria-label="Equipe e períodos">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Equipe e períodos</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Consulte os vínculos existentes. A associação é permitida somente para usuários com a
            autorização adequada.
          </p>
        </div>
        {canManage ? (
          <Button type="button" size="sm" onClick={() => setAssignmentOpen(true)}>
            <Plus aria-hidden="true" />
            Adicionar participante
          </Button>
        ) : null}
      </div>

      <EngagementTeamMemberAssignment
        open={assignmentOpen}
        onOpenChange={setAssignmentOpen}
        organizationId={organizationId}
        engagementId={engagementId}
        authorization={authorization}
      />

      <div className="space-y-3">
        <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <UsersRound aria-hidden="true" className="size-4" />
          Equipe
        </h4>
        {teamMembers.length === 0 ? (
          <EmptyState
            title="Nenhum participante registrado"
            description="Este trabalho ainda não possui vínculos de equipe persistidos."
            icon={UsersRound}
          />
        ) : (
          <div className="grid gap-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-foreground">{member.displayName}</p>
                  <Badge variant="neutral">{member.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.roleName} ({member.roleCode})
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Vigência: {formatDate(member.activeFrom)} até {formatDate(member.activeTo)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <CalendarDays aria-hidden="true" className="size-4" />
          Períodos
        </h4>
        {periods.length === 0 ? (
          <EmptyState
            title="Nenhum período registrado"
            description="Este trabalho ainda não possui períodos persistidos."
            icon={CalendarDays}
          />
        ) : (
          <div className="grid gap-3">
            {periods.map((period) => (
              <div key={period.id} className="rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-foreground">{period.label}</p>
                  <Badge variant="neutral">{period.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(period.startDate)} até {formatDate(period.endDate)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function formatDate(value: string | null): string {
  if (!value) return "em aberto";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(
    new Date(`${value.slice(0, 10)}T00:00:00`),
  );
}
