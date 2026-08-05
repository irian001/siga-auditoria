import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { FormField } from "@/components/patterns/FormField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  createAcceptanceAssessmentSchema,
  validateAcceptanceAnswerInput,
  type AcceptanceAssessment,
  type AcceptanceQuestionCode,
  type CreateAcceptanceAssessmentInput,
  type SaveAcceptanceAnswerInput,
} from "@/domain/acceptance";
import { AcceptanceQuestionnaire } from "@/features/acceptance/AcceptanceQuestionnaire";
import {
  ACCEPTANCE_TYPE_LABELS,
  describeAssessmentRule,
} from "@/features/acceptance/acceptancePresentation";

export type AcceptanceDraftSubmission = {
  createInput?: CreateAcceptanceAssessmentInput;
  assessmentId?: string;
  answers: SaveAcceptanceAnswerInput[];
};

type AcceptanceFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  assessments: AcceptanceAssessment[];
  draft?: AcceptanceAssessment | null;
  submitting: boolean;
  submitError?: string | null;
  onSubmit: (submission: AcceptanceDraftSubmission) => void;
};

type MetadataState = {
  assessmentDate: string;
  referencePeriod: string;
  pendingSummary: string;
  reanalysisRationale: string;
};

type AnswerValues = Partial<Record<AcceptanceQuestionCode, SaveAcceptanceAnswerInput>>;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildAnswers(draft?: AcceptanceAssessment | null): AnswerValues {
  return Object.fromEntries(
    (draft?.answers ?? []).map((answer) => [
      answer.questionCode,
      {
        questionCode: answer.questionCode,
        answer: answer.answer,
        comment: answer.comment ?? "",
      },
    ]),
  );
}

export function AcceptanceForm({
  open,
  onOpenChange,
  clientId,
  assessments,
  draft = null,
  submitting,
  submitError,
  onSubmit,
}: AcceptanceFormProps) {
  const latestApproved = assessments.find((assessment) => assessment.status === "approved");
  const latestRejected = assessments.find((assessment) => assessment.status === "rejected");
  const assessmentType = latestApproved ? "continuance" : "acceptance";
  const previousAssessment = latestApproved ?? latestRejected;
  const isReanalysis = !latestApproved && Boolean(latestRejected);

  const [metadata, setMetadata] = useState<MetadataState>({
    assessmentDate: today(),
    referencePeriod: "",
    pendingSummary: "",
    reanalysisRationale: "",
  });
  const [answers, setAnswers] = useState<AnswerValues>({});
  const [metadataErrors, setMetadataErrors] = useState<
    Partial<Record<keyof MetadataState, string>>
  >({});
  const [answerErrors, setAnswerErrors] = useState<Partial<Record<AcceptanceQuestionCode, string>>>(
    {},
  );

  useEffect(() => {
    setMetadata({
      assessmentDate: draft?.assessmentDate ?? today(),
      referencePeriod: draft?.referencePeriod ?? "",
      pendingSummary: draft?.pendingSummary ?? "",
      reanalysisRationale: draft?.reanalysisRationale ?? "",
    });
    setAnswers(buildAnswers(draft));
    setMetadataErrors({});
    setAnswerErrors({});
  }, [draft, open]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  function updateMetadata<K extends keyof MetadataState>(field: K, value: MetadataState[K]) {
    setMetadata((current) => ({ ...current, [field]: value }));
    setMetadataErrors((current) => ({ ...current, [field]: undefined }));
  }

  function updateAnswer(questionCode: AcceptanceQuestionCode, value: SaveAcceptanceAnswerInput) {
    setAnswers((current) => ({ ...current, [questionCode]: value }));
    setAnswerErrors((current) => ({ ...current, [questionCode]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const answerList = Object.values(answers).filter(
      (answer): answer is SaveAcceptanceAnswerInput => Boolean(answer),
    );
    const nextAnswerErrors: Partial<Record<AcceptanceQuestionCode, string>> = {};
    for (const answer of answerList) {
      const message = validateAcceptanceAnswerInput(answer);
      if (message) nextAnswerErrors[answer.questionCode] = message;
    }
    setAnswerErrors(nextAnswerErrors);
    if (Object.keys(nextAnswerErrors).length > 0) return;

    if (draft) {
      onSubmit({ assessmentId: draft.id, answers: answerList });
      return;
    }

    const createInput: CreateAcceptanceAssessmentInput = {
      clientId,
      assessmentType,
      assessmentDate: metadata.assessmentDate,
      referencePeriod: metadata.referencePeriod || undefined,
      pendingSummary: metadata.pendingSummary || undefined,
      previousAssessmentId: previousAssessment?.id,
      reanalysisRationale: isReanalysis ? metadata.reanalysisRationale : undefined,
    };
    const parsed = createAcceptanceAssessmentSchema.safeParse(createInput);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof MetadataState, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof MetadataState | undefined;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setMetadataErrors(nextErrors);
      return;
    }

    onSubmit({ createInput, answers: answerList });
  }

  return (
    <Dialog open={open} onOpenChange={(next) => (submitting ? undefined : onOpenChange(next))}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{draft ? "Continuar rascunho" : "Nova avaliação"}</DialogTitle>
          <DialogDescription>
            {draft
              ? "Revise as respostas e salve novamente o rascunho."
              : describeAssessmentRule(assessmentType, isReanalysis)}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium">
              Tipo: {ACCEPTANCE_TYPE_LABELS[draft?.assessmentType ?? assessmentType]}
            </p>
            {previousAssessment ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Relacionada à avaliação de {previousAssessment.assessmentDate}.
              </p>
            ) : null}
          </div>

          {assessmentType === "continuance" ? (
            <Alert>
              <AlertDescription>
                Esta continuidade está vinculada à avaliação aprovada mais recente do cliente.
              </AlertDescription>
            </Alert>
          ) : null}

          {isReanalysis ? (
            <Alert variant="warning">
              <AlertDescription>
                Existe uma rejeição anterior. A justificativa da reanálise é obrigatória.
              </AlertDescription>
            </Alert>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Data da avaliação" required error={metadataErrors.assessmentDate}>
              {(field) => (
                <Input
                  {...field}
                  type="date"
                  value={metadata.assessmentDate}
                  onChange={(event) => updateMetadata("assessmentDate", event.target.value)}
                  disabled={Boolean(draft)}
                />
              )}
            </FormField>
            <FormField label="Período de referência" error={metadataErrors.referencePeriod}>
              {(field) => (
                <Input
                  {...field}
                  value={metadata.referencePeriod}
                  onChange={(event) => updateMetadata("referencePeriod", event.target.value)}
                  placeholder="Ex.: Exercício de 2026"
                  maxLength={80}
                  disabled={Boolean(draft)}
                />
              )}
            </FormField>
          </div>

          <FormField label="Resumo de assuntos pendentes" error={metadataErrors.pendingSummary}>
            {(field) => (
              <Textarea
                {...field}
                value={metadata.pendingSummary}
                onChange={(event) => updateMetadata("pendingSummary", event.target.value)}
                rows={3}
                maxLength={4000}
                disabled={Boolean(draft)}
              />
            )}
          </FormField>

          {isReanalysis && !draft ? (
            <FormField
              label="Justificativa da reanálise"
              required
              error={metadataErrors.reanalysisRationale}
            >
              {(field) => (
                <Textarea
                  {...field}
                  value={metadata.reanalysisRationale}
                  onChange={(event) => updateMetadata("reanalysisRationale", event.target.value)}
                  rows={3}
                  maxLength={4000}
                />
              )}
            </FormField>
          ) : null}

          <div className="flex items-center justify-between gap-3 border-t pt-5">
            <div>
              <h2 className="text-base font-semibold">Questionário</h2>
              <p className="text-xs text-muted-foreground">
                {answeredCount} de 8 respostas preenchidas
              </p>
            </div>
          </div>

          <AcceptanceQuestionnaire
            values={answers}
            errors={answerErrors}
            disabled={submitting}
            onChange={updateAnswer}
          />

          {submitError ? (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              {submitting ? "Salvando…" : "Salvar rascunho"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
