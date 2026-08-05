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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createAuditEngagementSchema, type CreateAuditEngagementInput } from "@/domain/engagement";
import type { AcceptanceAssessment } from "@/domain/acceptance";
import type { Client } from "@/domain/client";

type EngagementFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clients: Client[];
  selectedClientId: string;
  acceptance: AcceptanceAssessment | null;
  acceptanceLoading: boolean;
  acceptanceError?: string | null;
  clientsLoading: boolean;
  clientsError?: string | null;
  submitting: boolean;
  submitError?: string | null;
  onClientChange: (clientId: string) => void;
  onSubmit: (input: CreateAuditEngagementInput) => void;
};

type FormState = {
  code: string;
  title: string;
  scope: string;
};

type FormErrors = Partial<Record<keyof FormState | "clientId" | "acceptanceAssessmentId", string>>;

const INITIAL_STATE: FormState = {
  code: "",
  title: "",
  scope: "",
};

export function EngagementForm({
  open,
  onOpenChange,
  clients,
  selectedClientId,
  acceptance,
  acceptanceLoading,
  acceptanceError,
  clientsLoading,
  clientsError,
  submitting,
  submitError,
  onClientChange,
  onSubmit,
}: EngagementFormProps) {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!open) return;
    setValues(INITIAL_STATE);
    setErrors({});
  }, [open]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    if (acceptanceLoading) {
      setErrors({ acceptanceAssessmentId: "Aguarde a verificação da avaliação ACE." });
      return;
    }

    const parsed = createAuditEngagementSchema.safeParse({
      clientId: selectedClientId,
      acceptanceAssessmentId: acceptance?.id ?? "",
      code: values.code,
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

    if (!acceptance) {
      setErrors({
        acceptanceAssessmentId: "O cliente precisa possuir uma avaliação ACE aprovada e aplicável.",
      });
      return;
    }

    onSubmit(parsed.data);
  }

  const noEligibleClient = !clientsLoading && clients.length === 0;
  const canSubmit = Boolean(
    selectedClientId && acceptance && !acceptanceLoading && !noEligibleClient,
  );

  return (
    <Dialog open={open} onOpenChange={(next) => (submitting ? undefined : onOpenChange(next))}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo trabalho de auditoria</DialogTitle>
          <DialogDescription>
            Criação controlada. O trabalho nascerá em elaboração e ficará vinculado ao cliente e à
            avaliação ACE aprovada.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Alert variant="info">
            <AlertDescription>
              Somente clientes ativos com avaliação ACE aprovada e aplicável podem iniciar um
              trabalho. Nenhuma mudança de estado será realizada nesta camada.
            </AlertDescription>
          </Alert>

          {clientsError ? (
            <Alert variant="destructive">
              <AlertDescription>{clientsError}</AlertDescription>
            </Alert>
          ) : null}

          {noEligibleClient ? (
            <Alert variant="warning">
              <AlertDescription>
                Não há clientes ativos disponíveis para iniciar um trabalho nesta organização.
              </AlertDescription>
            </Alert>
          ) : null}

          <FormField
            label="Cliente ativo"
            required
            error={errors.clientId}
            help="Clientes inativos não podem iniciar novos trabalhos."
          >
            {(field) => (
              <Select
                value={selectedClientId || undefined}
                onValueChange={onClientChange}
                disabled={clientsLoading || submitting || noEligibleClient}
              >
                <SelectTrigger id={field.id} aria-describedby={field["aria-describedby"]}>
                  <SelectValue
                    placeholder={clientsLoading ? "Carregando clientes..." : "Selecione o cliente"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormField>

          <FormField
            label="Avaliação ACE aplicável"
            required
            error={errors.acceptanceAssessmentId}
            help="A avaliação é consultada automaticamente e não pode ser escolhida fora das regras de aplicabilidade."
          >
            {({ id, "aria-describedby": describedBy }) => (
              <div
                id={id}
                aria-describedby={describedBy}
                className="rounded-md border border-border bg-muted/30 px-3 py-2 text-sm"
              >
                {acceptanceLoading ? (
                  <span className="text-muted-foreground">Verificando avaliação aprovada...</span>
                ) : acceptance ? (
                  <span className="text-foreground">
                    {acceptance.assessmentType === "acceptance" ? "Aceitação" : "Continuidade"} —{" "}
                    {acceptance.assessmentDate}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Nenhuma avaliação ACE aprovada e aplicável encontrada.
                  </span>
                )}
              </div>
            )}
          </FormField>

          {acceptanceError ? (
            <Alert variant="destructive">
              <AlertDescription>{acceptanceError}</AlertDescription>
            </Alert>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Código do trabalho" required error={errors.code}>
              {(field) => (
                <Input
                  {...field}
                  value={values.code}
                  onChange={(event) => updateField("code", event.target.value)}
                  autoComplete="off"
                  placeholder="Ex.: AUD-2026-001"
                />
              )}
            </FormField>

            <FormField label="Classificação" required help="Fixa nesta SDD como auditoria.">
              {({ id }) => (
                <Select value="audit" disabled>
                  <SelectTrigger id={id}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audit">Auditoria</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </FormField>
          </div>

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
                rows={5}
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
            <Button type="submit" disabled={submitting || !canSubmit}>
              {submitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              {submitting ? "Criando trabalho..." : "Criar trabalho"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
