import { useQuery } from "@tanstack/react-query";
import { FileCheck2, RotateCcw } from "lucide-react";

import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { LoadingState } from "@/components/states/LoadingState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { AcceptanceRepository } from "@/data/acceptanceRepository";
import { MockAcceptanceRepository } from "@/data/mockAcceptanceRepository";
import type { Client } from "@/domain/client";
import type { RequestContext } from "@/domain/contracts";
import { AcceptanceHistory } from "@/features/acceptance/AcceptanceHistory";
import {
  ACCEPTANCE_PANEL_TITLE,
  ACCEPTANCE_SIMULATION_NOTICE,
  buildSimulatedAssessments,
  formatAcceptanceCount,
} from "@/features/acceptance/acceptancePresentation";

const SIMULATED_PREPARER = "Auditor responsável (simulado)";
const SIMULATED_DECIDER = "Sócio revisor (simulado)";

/** Instâncias em memória por cliente — nenhum dado é gravado no banco oficial. */
const repositories = new Map<string, AcceptanceRepository>();

function getAcceptanceRepository(clientId: string, organizationId: string): AcceptanceRepository {
  const key = `${organizationId}:${clientId}`;
  let repository = repositories.get(key);
  if (!repository) {
    repository = new MockAcceptanceRepository({
      seed: buildSimulatedAssessments({
        clientId,
        organizationId,
        preparedBy: SIMULATED_PREPARER,
        decidedBy: SIMULATED_DECIDER,
      }),
      activeClientIds: [clientId],
      delayMs: 250,
    });
    repositories.set(key, repository);
  }
  return repository;
}

type AcceptancePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  context: RequestContext;
};

/** Painel somente leitura do histórico de aceitação e continuidade — SDD-ACE-001, Camada Visual 1. */
export function AcceptancePanel({ open, onOpenChange, client, context }: AcceptancePanelProps) {
  const organizationId = context.organizationId;

  const query = useQuery({
    enabled: open && Boolean(client) && Boolean(organizationId),
    queryKey: ["acceptance-simulado", organizationId, client?.id],
    queryFn: async () => {
      const result = await getAcceptanceRepository(client!.id, organizationId!).listByClient(
        context,
        client!.id,
      );
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  const assessments = query.data ?? [];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{ACCEPTANCE_PANEL_TITLE}</SheetTitle>
          <SheetDescription>
            {client ? client.displayName : "Nenhum cliente selecionado"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <Alert variant="warning" className="mb-6">
            <FileCheck2 aria-hidden="true" />
            <AlertDescription>{ACCEPTANCE_SIMULATION_NOTICE}</AlertDescription>
          </Alert>

          {query.isPending ? <LoadingState variant="cartao" lines={2} /> : null}

          {query.isError ? (
            <ErrorState
              title="Não foi possível carregar as avaliações"
              description="Não foi possível concluir a consulta simulada. Tente novamente."
              action={
                <Button variant="outline" onClick={() => query.refetch()}>
                  <RotateCcw aria-hidden="true" />
                  Tentar novamente
                </Button>
              }
            />
          ) : null}

          {query.isSuccess && assessments.length === 0 ? (
            <EmptyState
              icon={FileCheck2}
              title="Nenhuma avaliação registrada"
              description="Este cliente ainda não possui avaliação de aceitação ou continuidade no ambiente de validação."
            />
          ) : null}

          {query.isSuccess && assessments.length > 0 ? (
            <>
              <p className="mb-3 text-xs text-muted-foreground">
                {formatAcceptanceCount(assessments.length)} — da mais recente para a mais antiga.
              </p>
              <AcceptanceHistory assessments={assessments} />
            </>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
