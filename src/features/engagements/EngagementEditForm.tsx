import { useEffect, useState, type FormEvent } from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  updateAuditEngagementSchema,
  type AuditEngagement,
  type UpdateAuditEngagementInput,
} from "@/domain/engagement";

type EngagementEditFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engagement: AuditEngagement | null;
  submitting: boolean;
  submitError?: string | null;
  onSubmit: (input: UpdateAuditEngagementInput) => void;
};

type FormState = Pick<UpdateAuditEngagementInput, "title" | "scope">;
type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_STATE: FormState = { title: "", scope: "" };

export function EngagementEditForm({
  open,
  onOpenChange,
  engagement,
  submitting,
  submitError,
  onSubmit,
}: EngagementEditFormProps) {
  const [values, setValues] = useState<FormState>(EMPTY_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open || !engagement) return;
    setValues({ title: engagement.title, scope: engagement.scope });
    setErrors({});
  }, [engagement, open]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const parsed = updateAuditEngagementSchema.safeParse({
      title: values.title,
      scope: values.scope,
      classification: "audit",
    });

    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormErrors | undefined;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    onSubmit(parsed.data);
  }

  return (
    <Dialog open={open} onOpenChange={submitting ? undefined : onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar trabalho</DialogTitle>
          <DialogDescription>
            Atualize somente os dados descritivos. A identidade, o cliente, a organização, a
            avaliação ACE e o estado do trabalho permanecem preservados.
          </DialogDescription>
        </DialogHeader>

        {engagement ? (
          <div className="grid gap-3 rounded-md border border-border bg-muted/30 px-3 py-3 text-sm sm:grid-cols-3">
            <Detail label="Código" value={engagement.code} />
            <Detail label="Cliente" value={engagement.clientId} />
            <Detail
              label="Estado"
              value={engagement.status === "draft" ? "Em elaboração" : "Ativo"}
            />
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Alert variant="info">
            <AlertDescription>
              Cliente, organização, código e avaliação ACE não podem ser alterados nesta camada.
            </AlertDescription>
          </Alert>

          <FormField label="Classificação" required help="Fixa nesta SDD como auditoria.">
            {({ id }) => <Input id={id} value="Auditoria" disabled aria-readonly="true" />}
          </FormField>

          <FormField label="Título do trabalho" required error={errors.title}>
            {(field) => (
              <Input
                {...field}
                value={values.title}
                onChange={(event) => updateField("title", event.target.value)}
                autoComplete="off"
              />
            )}
          </FormField>

          <FormField label="Escopo preliminar" required error={errors.scope}>
            {(field) => (
              <Textarea
                {...field}
                value={values.scope}
                onChange={(event) => updateField("scope", event.target.value)}
                rows={6}
              />
            )}
          </FormField>

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
            <Button type="submit" disabled={submitting || !engagement}>
              {submitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              {submitting ? "Salvando alterações..." : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 break-words text-foreground">{value}</dd>
    </div>
  );
}
