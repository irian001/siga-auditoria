import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  changeAuditEngagementStatusSchema,
  type AuditEngagement,
  type AuditEngagementTransitionStatus,
  type ChangeAuditEngagementStatusInput,
} from "@/domain/engagement";
import { ENGAGEMENT_STATUS_LABELS } from "@/features/engagements/engagementsPresentation";

type EngagementStatusDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engagement: AuditEngagement | null;
  targetStatus: AuditEngagementTransitionStatus | null;
  submitting: boolean;
  submitError?: string | null;
  onConfirm: (input: ChangeAuditEngagementStatusInput) => void;
};

export function EngagementStatusDialog({
  open,
  onOpenChange,
  engagement,
  targetStatus,
  submitting,
  submitError,
  onConfirm,
}: EngagementStatusDialogProps) {
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);

  const reasonRequired = targetStatus === "closed" || targetStatus === "cancelled";
  const actionLabel = targetStatus ? ENGAGEMENT_STATUS_LABELS[targetStatus] : "Alterar estado";

  useEffect(() => {
    if (!open) return;
    setReason("");
    setReasonError(null);
  }, [engagement, open, targetStatus]);

  function handleConfirm() {
    if (submitting || !targetStatus) return;

    const parsed = changeAuditEngagementStatusSchema.safeParse({
      status: targetStatus,
      reason: reason || undefined,
    });

    if (!parsed.success) {
      setReasonError(parsed.error.issues[0]?.message ?? "Verifique a justificativa.");
      return;
    }

    setReasonError(null);
    onConfirm(parsed.data);
  }

  return (
    <Dialog open={open} onOpenChange={submitting ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{actionLabel} trabalho</DialogTitle>
          <DialogDescription>
            {engagement
              ? `Trabalho ${engagement.code}: ${engagement.title}.`
              : "Alteração de estado."}
          </DialogDescription>
        </DialogHeader>

        {targetStatus === "active" ? (
          <Alert variant="info">
            <AlertDescription>
              O trabalho passará de elaboração para ativo. Essa ação exige a permissão de gestão.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="warning">
            <AlertDescription>
              {targetStatus === "cancelled"
                ? "O cancelamento é terminal e não permite reabertura nesta etapa."
                : "O encerramento é terminal e não permite reabertura nesta etapa."}
            </AlertDescription>
          </Alert>
        )}

        {reasonRequired ? (
          <div className="space-y-2">
            <label htmlFor="engagement-status-reason" className="text-sm font-medium">
              Justificativa obrigatória
            </label>
            <Textarea
              id="engagement-status-reason"
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                setReasonError(null);
              }}
              rows={5}
              maxLength={4000}
              placeholder="Registre o motivo da mudança de estado."
              aria-invalid={Boolean(reasonError)}
            />
            <p className="text-xs text-muted-foreground">Até 4.000 caracteres.</p>
            {reasonError ? <p className="text-sm text-destructive">{reasonError}</p> : null}
          </div>
        ) : null}

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
            Voltar
          </Button>
          <Button type="button" onClick={handleConfirm} disabled={submitting || !targetStatus}>
            {submitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
            {submitting ? "Processando..." : `Confirmar ${actionLabel.toLowerCase()}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
