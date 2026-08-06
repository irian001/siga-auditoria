import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { AcceptanceAssessment, AcceptanceConclusion } from "@/domain/acceptance";

type AcceptanceDecisionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessment: AcceptanceAssessment | null;
  submitting: boolean;
  error?: string | null;
  onConfirm: (conclusion: AcceptanceConclusion, rationale: string) => void;
};

export function AcceptanceDecisionDialog({
  open,
  onOpenChange,
  assessment,
  submitting,
  error,
  onConfirm,
}: AcceptanceDecisionDialogProps) {
  const [conclusion, setConclusion] = useState<AcceptanceConclusion>("approved");
  const [rationale, setRationale] = useState("");
  const [rationaleError, setRationaleError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setConclusion("approved");
      setRationale("");
      setRationaleError(null);
    }
  }, [open]);

  function handleConfirm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !assessment) return;
    const trimmed = rationale.trim();
    if (!trimmed) {
      setRationaleError("Informe a justificativa da decisão.");
      return;
    }
    onConfirm(conclusion, trimmed);
  }

  return (
    <Dialog open={open} onOpenChange={(next) => (submitting ? undefined : onOpenChange(next))}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar decisão</DialogTitle>
          <DialogDescription>
            A decisão é profissional e humana. O sistema apenas registrará a conclusão informada.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleConfirm} noValidate>
          <div className="rounded-lg border bg-muted/30 p-4 text-sm">
            <p className="font-medium">Confirmação de responsabilidade</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Confirme que você revisou as respostas, os impedimentos e os documentos disponíveis
              antes de registrar a decisão.
            </p>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Conclusão</legend>
            <RadioGroup
              value={conclusion}
              onValueChange={(value) => setConclusion(value as AcceptanceConclusion)}
              disabled={submitting}
              className="grid gap-2 sm:grid-cols-2"
            >
              <label className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2">
                <RadioGroupItem value="approved" />
                Aprovar
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2">
                <RadioGroupItem value="rejected" />
                Rejeitar
              </label>
            </RadioGroup>
          </fieldset>

          <FormField label="Justificativa da decisão" required error={rationaleError ?? undefined}>
            {(field) => (
              <Textarea
                {...field}
                value={rationale}
                onChange={(event) => {
                  setRationale(event.target.value);
                  setRationaleError(null);
                }}
                rows={5}
                maxLength={8000}
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
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting || !assessment}>
              {submitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              Registrar decisão
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
