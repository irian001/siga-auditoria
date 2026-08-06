import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  acceptanceQuestionnaire,
  isAcceptanceCommentRequired,
  type AcceptanceAnswerValue,
  type AcceptanceQuestionCode,
  type SaveAcceptanceAnswerInput,
} from "@/domain/acceptance";
import { ACCEPTANCE_ANSWER_LABELS } from "@/features/acceptance/acceptancePresentation";

type QuestionnaireValues = Partial<Record<AcceptanceQuestionCode, SaveAcceptanceAnswerInput>>;

type AcceptanceQuestionnaireProps = {
  values: QuestionnaireValues;
  errors: Partial<Record<AcceptanceQuestionCode, string>>;
  disabled?: boolean;
  onChange: (questionCode: AcceptanceQuestionCode, value: SaveAcceptanceAnswerInput) => void;
};

export function AcceptanceQuestionnaire({
  values,
  errors,
  disabled = false,
  onChange,
}: AcceptanceQuestionnaireProps) {
  const topics = [...new Set(acceptanceQuestionnaire.map((question) => question.topic))];

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle aria-hidden="true" />
        <AlertDescription>
          O rascunho pode ser salvo parcialmente. Respostas “Não”, “Não identificado” ou “Não se
          aplica” exigem comentário.
        </AlertDescription>
      </Alert>

      {topics.map((topic) => (
        <section key={topic} className="space-y-3" aria-labelledby={`topico-${topic}`}>
          <h3 id={`topico-${topic}`} className="text-sm font-semibold text-foreground">
            {topic}
          </h3>

          {acceptanceQuestionnaire
            .filter((question) => question.topic === topic)
            .map((question) => {
              const current = values[question.code];
              const commentRequired = current
                ? isAcceptanceCommentRequired(question, current.answer)
                : false;
              const errorId = errors[question.code] ? `${question.code}-erro` : undefined;

              return (
                <div key={question.code} className="space-y-3 rounded-lg border bg-card p-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-relaxed">{question.text}</p>
                    <p className="text-xs text-muted-foreground">{question.code}</p>
                  </div>

                  <RadioGroup
                    value={current?.answer}
                    onValueChange={(answer) =>
                      onChange(question.code, {
                        questionCode: question.code,
                        answer: answer as AcceptanceAnswerValue,
                        comment: current?.comment ?? "",
                      })
                    }
                    disabled={disabled}
                    aria-describedby={errorId}
                    className="grid gap-2 sm:grid-cols-2"
                  >
                    {Object.entries(ACCEPTANCE_ANSWER_LABELS)
                      .filter(
                        ([answer]) => answer !== "not_applicable" || question.allowsNotApplicable,
                      )
                      .map(([answer, label]) => (
                        <Label
                          key={answer}
                          htmlFor={`${question.code}-${answer}`}
                          className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 font-normal hover:bg-muted/50"
                        >
                          <RadioGroupItem
                            id={`${question.code}-${answer}`}
                            value={answer}
                            disabled={disabled}
                          />
                          {label}
                        </Label>
                      ))}
                  </RadioGroup>

                  {current ? (
                    <div className="space-y-1.5">
                      <Label htmlFor={`${question.code}-comentario`}>
                        Comentário{commentRequired ? " *" : " (opcional)"}
                      </Label>
                      <Textarea
                        id={`${question.code}-comentario`}
                        value={current.comment ?? ""}
                        onChange={(event) =>
                          onChange(question.code, { ...current, comment: event.target.value })
                        }
                        disabled={disabled}
                        aria-invalid={Boolean(errors[question.code])}
                        aria-describedby={errorId}
                        rows={3}
                        maxLength={4000}
                      />
                    </div>
                  ) : null}

                  {errors[question.code] ? (
                    <p id={errorId} role="alert" className="text-sm text-destructive">
                      {errors[question.code]}
                    </p>
                  ) : null}
                </div>
              );
            })}
        </section>
      ))}
    </div>
  );
}
