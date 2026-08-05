import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, FileCheck2, Plus, RotateCcw } from "lucide-react";
import { useState } from "react";

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
import {
  AcceptanceForm,
  type AcceptanceDraftSubmission,
} from "@/features/acceptance/AcceptanceForm";
import { AcceptanceHistory } from "@/features/acceptance/AcceptanceHistory";
import {
  ACCEPTANCE_PANEL_TITLE,
  ACCEPTANCE_SIMULATION_NOTICE,
  ACCEPTANCE_DRAFT_SAVED_NOTICE,
  buildSimulatedAssessments,
  formatAcceptanceCount,
} from "@/features/acceptance/acceptancePresentation";

const repositories = new Map<string, AcceptanceRepository>();

function getAcceptanceRepository(client: Client): AcceptanceRepository {
  const key = `${client.organizationId}:${client.id}`;
  const current = repositories.get(key);
  if (current) return current;

  const repository = new MockAcceptanceRepository({
    seed: buildSimulatedAssessments({
      clientId: client.id,
      organizationId: client.organizationId,
      preparedBy: "Auditor responsável (simulado)",
      decidedBy: "Sócio revisor (simulado)",
    }),
    activeClientIds: client.status === "active" ? [client.id] : [],
    delayMs: 250,
  });
  repositories.set(key, repository);
  return repository;
}

type AcceptancePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  context: RequestContext;
};

/** Painel somente leitura da Camada Visual 1 da SDD-ACE-001. */
export function AcceptancePanel({ open, onOpenChange, client, context }: AcceptancePanelProps) {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const query = useQuery({
    enabled: open && Boolean(client) && Boolean(context.organizationId) && Boolean(context.userId),
    queryKey: ["acceptance-simulado", context.organizationId, client?.id],
    queryFn: async () => {
      const result = await getAcceptanceRepository(client!).listByClient(context, client!.id);
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  const assessments = query.data ?? [];
  const draft = assessments.find((assessment) => assessment.status === "draft") ?? null;
  const hasOpenReview = assessments.some((assessment) => assessment.status === "pending_review");
  const canCreate = Boolean(client && client.status === "active" && !draft && !hasOpenReview);

  const saveDraftMutation = useMutation({
    mutationFn: async (submission: AcceptanceDraftSubmission) => {
      if (!client) throw new Error("Nenhum cliente selecionado.");
      const repository = getAcceptanceRepository(client);
      let assessmentId = submission.assessmentId;

      if (submission.createInput) {
        const created = await repository.create(context, submission.createInput);
        if (!created.ok) throw new Error(created.error.message);
        assessmentId = created.data.id;
      }

      if (!assessmentId) throw new Error("Não foi possível identificar o rascunho.");
      if (submission.answers.length > 0) {
        const saved = await repository.saveAnswers(context, assessmentId, submission.answers);
        if (!saved.ok) throw new Error(saved.error.message);
      }
      return assessmentId;
    },
    onSuccess: async () => {
      setFormOpen(false);
      setFormError(null);
      setSuccessMessage(ACCEPTANCE_DRAFT_SAVED_NOTICE);
      await queryClient.invalidateQueries({
        queryKey: ["acceptance-simulado", context.organizationId, client?.id],
      });
    },
    onError: (error) => setFormError(error.message),
  });

  function openDraftForm() {
    setFormError(null);
    setSuccessMessage(null);
    saveDraftMutation.reset();
    setFormOpen(true);
  }

  function handlePanelOpenChange(next: boolean) {
    if (!next && saveDraftMutation.isPending) return;
    onOpenChange(next);
    if (!next) {
      setFormOpen(false);
      setFormError(null);
      setSuccessMessage(null);
    }
  }

  return (
    <Sheet open={open} onOpenChange={handlePanelOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{ACCEPTANCE_PANEL_TITLE}</SheetTitle>
          <SheetDescription>
            {client ? client.displayName : "Nenhum cliente selecionado"}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-2 flex-1">
          <Alert variant="warning" className="mb-6">
            <FileCheck2 aria-hidden="true" />
            <AlertDescription>{ACCEPTANCE_SIMULATION_NOTICE}</AlertDescription>
          </Alert>

          {successMessage ? (
            <Alert variant="success" className="mb-6">
              <CheckCircle2 aria-hidden="true" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          ) : null}

          {query.isSuccess ? (
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {draft ? (
                <Button onClick={openDraftForm}>Continuar rascunho</Button>
              ) : (
                <Button onClick={openDraftForm} disabled={!canCreate}>
                  <Plus aria-hidden="true" />
                  Nova avaliação
                </Button>
              )}
              {!canCreate && !draft ? (
                <p className="text-xs text-muted-foreground">
                  {client?.status !== "active"
                    ? "Cliente inativo: nova avaliação indisponível."
                    : "Já existe uma avaliação aguardando decisão."}
                </p>
              ) : null}
            </div>
          ) : null}

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

        {client ? (
          <AcceptanceForm
            open={formOpen}
            onOpenChange={setFormOpen}
            clientId={client.id}
            assessments={assessments}
            draft={draft}
            submitting={saveDraftMutation.isPending}
            submitError={formError}
            onSubmit={(submission) => {
              if (saveDraftMutation.isPending) return;
              saveDraftMutation.mutate(submission);
            }}
          />
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
