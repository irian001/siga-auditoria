import { Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import type { AcceptanceAssessment } from "@/domain/acceptance";
import { transitionReasonSchema } from "@/domain/acceptance";
import { useState } from "react";

type AcceptanceCancelDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessment: AcceptanceAssessment | null;
  submitting: boolean;
  error?: string | null;
  onConfirm: (reason: string) => void;
};

export function AcceptanceCancelDialog({
  open,
  onOpenChange,
  assessment,
  submitting,
  error,
  onConfirm,
}: AcceptanceCancelDialogProps) {
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);

  function handleConfirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !assessment) return;
    const parsed = transitionReasonSchema.safeParse(reason);
    if (!parsed.success) {
      setReasonError(parsed.error.issues[0]?.message ?? "Informe o motivo do cancelamento.");
      return;
    }
    onConfirm(parsed.data);
  }

  function handleOpenChange(next: boolean) {
    if (submitting) return;
    if (!next) {
      setReason("");
      setReasonError(null);
    }
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cancelar rascunho</DialogTitle>
          <DialogDescription>
            O registro será preservado no histórico com o estado cancelado. Esta ação não poderá ser
            desfeita no banco oficial.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleConfirm} noValidate>
          <FormField label="Motivo do cancelamento" required error={reasonError ?? undefined}>
            {(field) => (
              <Textarea
                {...field}
                value={reason}
                onChange={(event) => {
                  setReason(event.target.value);
                  setReasonError(null);
                }}
                rows={5}
                maxLength={4000}
                disabled={submitting}
              />
            )}
          </FormField>

          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={submitting}
            >
              Voltar
            </Button>
            <Button type="submit" variant="destructive" disabled={submitting || !assessment}>
              {submitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              Confirmar cancelamento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
