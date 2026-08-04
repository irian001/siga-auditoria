import { Link2 } from "lucide-react";

import { StatusBadge } from "@/components/ui/status-badge";
import type { AcceptanceAssessment } from "@/domain/acceptance";
import {
  ACCEPTANCE_CONCLUSION_LABELS,
  ACCEPTANCE_STATUS_BADGE,
  ACCEPTANCE_STATUS_LABELS,
  ACCEPTANCE_TYPE_LABELS,
  formatAcceptanceDate,
  formatAcceptanceDateTime,
} from "@/features/acceptance/acceptancePresentation";

type AcceptanceHistoryProps = {
  assessments: AcceptanceAssessment[];
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{value}</dd>
    </div>
  );
}

/** Apresentação somente leitura do histórico simulado — Camada Visual 1 da SDD-ACE-001. */
export function AcceptanceHistory({ assessments }: AcceptanceHistoryProps) {
  return (
    <ol className="space-y-4">
      {assessments.map((assessment) => (
        <li
          key={assessment.id}
          data-estado={assessment.status}
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              {ACCEPTANCE_TYPE_LABELS[assessment.assessmentType]}
            </h3>
            <StatusBadge
              status={ACCEPTANCE_STATUS_BADGE[assessment.status]}
              label={ACCEPTANCE_STATUS_LABELS[assessment.status]}
            />
          </div>

          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Data da avaliação" value={formatAcceptanceDate(assessment.assessmentDate)} />
            {assessment.referencePeriod ? (
              <Field label="Período de referência" value={assessment.referencePeriod} />
            ) : null}
            {assessment.conclusion ? (
              <Field
                label="Conclusão"
                value={ACCEPTANCE_CONCLUSION_LABELS[assessment.conclusion]}
              />
            ) : null}
            <Field label="Preparador" value={assessment.preparedBy} />
            {assessment.submittedAt ? (
              <Field label="Enviada em" value={formatAcceptanceDateTime(assessment.submittedAt)} />
            ) : null}
            {assessment.decidedBy ? (
              <Field label="Decisor" value={assessment.decidedBy} />
            ) : null}
            {assessment.decidedAt ? (
              <Field label="Decidida em" value={formatAcceptanceDateTime(assessment.decidedAt)} />
            ) : null}
          </dl>

          {assessment.previousAssessmentId ? (
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Link2 aria-hidden="true" className="size-4" />
              Vinculada a uma avaliação anterior deste cliente.
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
