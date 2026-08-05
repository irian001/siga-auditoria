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
import { createSupabaseAcceptanceRepository } from "@/data/supabase/supabaseAcceptanceRepository";
import type { AcceptanceAssessment, AcceptanceConclusion } from "@/domain/acceptance";
import type { Client } from "@/domain/client";
import type { RequestContext } from "@/domain/contracts";
import {
  AcceptanceForm,
  type AcceptanceDraftSubmission,
} from "@/features/acceptance/AcceptanceForm";
import { AcceptanceCancelDialog } from "@/features/acceptance/AcceptanceCancelDialog";
import { AcceptanceHistory } from "@/features/acceptance/AcceptanceHistory";
import { AcceptanceReview } from "@/features/acceptance/AcceptanceReview";
import { AcceptanceDecisionDialog } from "@/features/acceptance/AcceptanceDecisionDialog";
import {
  ACCEPTANCE_DECIDED_SUCCESS_NOTICE,
  ACCEPTANCE_PANEL_TITLE,
  ACCEPTANCE_RETURNED_SUCCESS_NOTICE,
  ACCEPTANCE_SUBMITTED_SUCCESS_NOTICE,
  ACCEPTANCE_OFFICIAL_NOTICE,
  ACCEPTANCE_DRAFT_SAVED_NOTICE,
  formatAcceptanceRegisteredCount,
} from "@/features/acceptance/acceptancePresentation";

let acceptanceRepository: AcceptanceRepository | undefined;

function getAcceptanceRepository(): AcceptanceRepository {
  acceptanceRepository ??= createSupabaseAcceptanceRepository();
  return acceptanceRepository;
}

type AcceptancePanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  context: RequestContext;
};

/** Painel oficial de aceitaÃ§Ã£o e continuidade da SDD-ACE-001. */
export function AcceptancePanel({ open, onOpenChange, client, context }: AcceptancePanelProps) {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [reviewAssessmentId, setReviewAssessmentId] = useState<string | null>(null);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [workflowError, setWorkflowError] = useState<string | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const query = useQuery({
    enabled: open && Boolean(client) && Boolean(context.organizationId) && Boolean(context.userId),
    queryKey: ["acceptance", context.organizationId, client?.id],
    queryFn: async () => {
      const result = await getAcceptanceRepository().listByClient(context, client!.id);
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  const assessments = query.data ?? [];
  const draft = assessments.find((assessment) => assessment.status === "draft") ?? null;
  const hasOpenReview = assessments.some((assessment) => assessment.status === "pending_review");
  const canCreate = Boolean(client && client.status === "active" && !draft && !hasOpenReview);
  const actionableAssessment =
    assessments.find((assessment) => assessment.status === "draft") ??
    assessments.find((assessment) => assessment.status === "pending_review") ??
    null;
  const reviewAssessment =
    assessments.find((assessment) => assessment.id === reviewAssessmentId) ?? null;

  const saveDraftMutation = useMutation({
    mutationFn: async (submission: AcceptanceDraftSubmission) => {
      if (!client) throw new Error("Nenhum cliente selecionado.");
      const repository = getAcceptanceRepository();
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
        queryKey: ["acceptance", context.organizationId, client?.id],
      });
    },
    onError: (error) => setFormError(error.message),
  });

  const workflowMutation = useMutation({
    mutationFn: async (input: {
      action: "submit" | "return" | "decide";
      assessmentId: string;
      conclusion?: AcceptanceConclusion;
      rationale?: string;
    }) => {
      if (!client) throw new Error("Nenhum cliente selecionado.");
      const repository = getAcceptanceRepository();
      let result: Awaited<ReturnType<typeof repository.submit>>;
      if (input.action === "submit") {
        result = await repository.submit(context, input.assessmentId);
      } else if (input.action === "return") {
        result = await repository.returnToDraft(context, input.assessmentId, input.rationale ?? "");
      } else {
        result = await repository.decide(
          context,
          input.assessmentId,
          input.conclusion ?? "rejected",
          input.rationale ?? "",
        );
      }
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
    onSuccess: async (_assessment, variables) => {
      setWorkflowError(null);
      setDecisionOpen(false);
      setReviewAssessmentId(null);
      setSuccessMessage(
        variables.action === "submit"
          ? ACCEPTANCE_SUBMITTED_SUCCESS_NOTICE
          : variables.action === "return"
            ? ACCEPTANCE_RETURNED_SUCCESS_NOTICE
            : ACCEPTANCE_DECIDED_SUCCESS_NOTICE,
      );
      await queryClient.invalidateQueries({
        queryKey: ["acceptance", context.organizationId, client?.id],
      });
    },
    onError: (error) => setWorkflowError(error.message),
  });

  const cancelMutation = useMutation({
    mutationFn: async (input: { assessmentId: string; reason: string }) => {
      if (!client) throw new Error("Nenhum cliente selecionado.");
      const result = await getAcceptanceRepository().cancel(
        context,
        input.assessmentId,
        input.reason,
      );
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
    onSuccess: async () => {
      setCancelOpen(false);
      setCancelError(null);
      setReviewAssessmentId(null);
      setSuccessMessage("Rascunho cancelado e preservado no histórico.");
      await queryClient.invalidateQueries({
        queryKey: ["acceptance", context.organizationId, client?.id],
      });
    },
    onError: (error) => setCancelError(error.message),
  });

  function openDraftForm() {
    setFormError(null);
    setSuccessMessage(null);
    saveDraftMutation.reset();
    setFormOpen(true);
  }

  function openReview(assessment: AcceptanceAssessment) {
    setSuccessMessage(null);
    setWorkflowError(null);
    workflowMutation.reset();
    setReviewAssessmentId(assessment.id);
  }

  function openCancelDialog() {
    setCancelError(null);
    cancelMutation.reset();
    setCancelOpen(true);
  }

  function closeReview() {
    if (workflowMutation.isPending) return;
    setReviewAssessmentId(null);
    setWorkflowError(null);
  }

  function requestReturnToDraft() {
    if (!reviewAssessment) return;
    const reason = window.prompt("Informe o motivo da devolução para rascunho:");
    if (!reason?.trim()) return;
    workflowMutation.mutate({
      action: "return",
      assessmentId: reviewAssessment.id,
      rationale: reason,
    });
  }

  function handlePanelOpenChange(next: boolean) {
    if (!next && saveDraftMutation.isPending) return;
    onOpenChange(next);
    if (!next) {
      setFormOpen(false);
      setReviewAssessmentId(null);
      setDecisionOpen(false);
      setCancelOpen(false);
      setFormError(null);
      setWorkflowError(null);
      setCancelError(null);
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
            <AlertDescription>{ACCEPTANCE_OFFICIAL_NOTICE}</AlertDescription>
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

          {query.isSuccess && actionableAssessment && !reviewAssessment ? (
            <div className="mb-6 flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => openReview(actionableAssessment)}>
                Revisar avaliação
              </Button>
              {actionableAssessment.status === "draft" ? (
                <Button variant="destructive" onClick={openCancelDialog}>
                  Cancelar rascunho
                </Button>
              ) : null}
            </div>
          ) : null}

          {reviewAssessment ? (
            <>
              <AcceptanceReview
                assessment={reviewAssessment}
                submitting={workflowMutation.isPending || cancelMutation.isPending}
                error={workflowError}
                onSubmit={() => {
                  workflowMutation.mutate({
                    action: "submit",
                    assessmentId: reviewAssessment.id,
                  });
                }}
                onReturnToDraft={requestReturnToDraft}
                onDecide={() => setDecisionOpen(true)}
              />
              {reviewAssessment.status === "draft" ? (
                <div className="mb-6">
                  <Button
                    variant="destructive"
                    onClick={openCancelDialog}
                    disabled={workflowMutation.isPending || cancelMutation.isPending}
                  >
                    Cancelar rascunho
                  </Button>
                </div>
              ) : null}
            </>
          ) : null}

          {query.isPending ? <LoadingState variant="cartao" lines={2} /> : null}

          {query.isError ? (
            <ErrorState
              title="Não foi possível carregar as avaliações"
              description="Não foi possível concluir a consulta oficial. Tente novamente."
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
              description="Este cliente ainda não possui avaliação de aceitação ou continuidade no banco oficial."
            />
          ) : null}

          {query.isSuccess && assessments.length > 0 ? (
            <>
              <p className="mb-3 text-xs text-muted-foreground">
                {formatAcceptanceRegisteredCount(assessments.length)} — da mais recente para a mais antiga.
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

        <AcceptanceDecisionDialog
          open={decisionOpen}
          onOpenChange={setDecisionOpen}
          assessment={reviewAssessment}
          submitting={workflowMutation.isPending}
          error={workflowError}
          onConfirm={(conclusion, rationale) => {
            if (workflowMutation.isPending || !reviewAssessment) return;
            workflowMutation.mutate({
              action: "decide",
              assessmentId: reviewAssessment.id,
              conclusion,
              rationale,
            });
          }}
        />

        <AcceptanceCancelDialog
          open={cancelOpen}
          onOpenChange={setCancelOpen}
          assessment={actionableAssessment?.status === "draft" ? actionableAssessment : null}
          submitting={cancelMutation.isPending}
          error={cancelError}
          onConfirm={(reason) => {
            const target = reviewAssessment ?? actionableAssessment;
            if (cancelMutation.isPending || !target || target.status !== "draft") return;
            cancelMutation.mutate({ assessmentId: target.id, reason });
          }}
        />

        {reviewAssessment ? (
          <Button variant="ghost" onClick={closeReview} disabled={workflowMutation.isPending}>
            Fechar revisão
          </Button>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
