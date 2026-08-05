import { AlertCircle, CheckCircle2, Send, Undo2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { evaluateAcceptanceCompleteness, type AcceptanceAssessment } from "@/domain/acceptance";
import {
  ACCEPTANCE_REVIEW_NOTICE,
  ACCEPTANCE_STATUS_LABELS,
  ACCEPTANCE_SUBMITTED_NOTICE,
} from "@/features/acceptance/acceptancePresentation";

type AcceptanceReviewProps = {
  assessment: AcceptanceAssessment;
  submitting: boolean;
  error?: string | null;
  onSubmit: () => void;
  onReturnToDraft: () => void;
  onDecide: () => void;
};

export function AcceptanceReview({
  assessment,
  submitting,
  error,
  onSubmit,
  onReturnToDraft,
  onDecide,
}: AcceptanceReviewProps) {
  const completeness = evaluateAcceptanceCompleteness(assessment.answers);
  const isDraft = assessment.status === "draft";
  const isPendingReview = assessment.status === "pending_review";

  return (
    <section className="mb-6 space-y-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold">Revisão da avaliação</h2>
          <p className="text-xs text-muted-foreground">
            Estado atual: {ACCEPTANCE_STATUS_LABELS[assessment.status]}
          </p>
        </div>
        <span className="rounded-full border px-2 py-1 text-xs text-muted-foreground">
          {assessment.answers.length} de 8 respostas
        </span>
      </div>

      <Alert variant={completeness.complete ? "success" : "warning"}>
        {completeness.complete ? (
          <CheckCircle2 aria-hidden="true" />
        ) : (
          <AlertCircle aria-hidden="true" />
        )}
        <AlertDescription>
          {completeness.complete
            ? "Questionário completo e válido para envio."
            : `${completeness.missingQuestionCodes.length} questão(ões) pendente(s) ou inválida(s).`}
          {completeness.blockingQuestionCodes.length > 0
            ? " Existem respostas impeditivas para aprovação."
            : ""}
        </AlertDescription>
      </Alert>

      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <p className="text-xs text-muted-foreground">
        {isDraft ? ACCEPTANCE_REVIEW_NOTICE : null}
        {isPendingReview ? ACCEPTANCE_SUBMITTED_NOTICE : null}
      </p>

      <div className="flex flex-wrap gap-2">
        {isDraft ? (
          <Button onClick={onSubmit} disabled={submitting || !completeness.complete}>
            <Send aria-hidden="true" />
            Enviar para decisão
          </Button>
        ) : null}
        {isPendingReview ? (
          <>
            <Button onClick={onDecide} disabled={submitting || !completeness.complete}>
              <CheckCircle2 aria-hidden="true" />
              Registrar decisão
            </Button>
            <Button variant="outline" onClick={onReturnToDraft} disabled={submitting}>
              <Undo2 aria-hidden="true" />
              Devolver para rascunho
            </Button>
          </>
        ) : null}
      </div>
    </section>
  );
}
