import { useEffect, useMemo, useState } from "react";
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
import {
  clientClassifications,
  createClientSchema,
  taxIdentifierTypes,
  type ClientClassification,
  type CreateClientInput,
  type TaxIdentifierType,
} from "@/domain/client";
import {
  CLIENT_CLASSIFICATION_LABELS,
  SIMULATED_PERSISTENCE_NOTICE,
  TAX_IDENTIFIER_TYPE_LABELS,
} from "@/features/clients/clientsPresentation";

type ClientFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submitting: boolean;
  submitError?: string | null;
  onSubmit: (input: CreateClientInput) => void;
};

type FormState = {
  displayName: string;
  legalName: string;
  taxIdentifierType: TaxIdentifierType;
  taxIdentifier: string;
  classification: ClientClassification;
};

const INITIAL_STATE: FormState = {
  displayName: "",
  legalName: "",
  taxIdentifierType: "cnpj",
  taxIdentifier: "",
  classification: "legal_entity",
};

/**
 * Formulário de criação de cliente — Camada 2 da SDD-CLI-001.
 * Reutiliza integralmente os schemas e validações do domínio.
 */
export function ClientForm({
  open,
  onOpenChange,
  submitting,
  submitError,
  onSubmit,
}: ClientFormProps) {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  useEffect(() => {
    if (!open) {
      setValues(INITIAL_STATE);
      setErrors({});
    }
  }, [open]);

  const requiresBrazilianIdentifier =
    values.taxIdentifierType === "cnpj" || values.taxIdentifierType === "cpf";

  const identifierHelp = useMemo(() => {
    if (values.taxIdentifierType === "cnpj") return "Somente números ou formato 00.000.000/0000-00.";
    if (values.taxIdentifierType === "cpf") return "Somente números ou formato 000.000.000-00.";
    return "Campo opcional para identificadores estrangeiros ou outros.";
  }, [values.taxIdentifierType]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((current) => {
      const next = { ...current, [key]: value };
      // Sugestão visual: CNPJ costuma indicar pessoa jurídica e CPF, pessoa física.
      if (key === "taxIdentifierType") {
        if (value === "cnpj") next.classification = "legal_entity";
        if (value === "cpf") next.classification = "individual";
      }
      return next;
    });
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const parsed = createClientSchema.safeParse({
      displayName: values.displayName,
      legalName: values.legalName,
      taxIdentifierType: values.taxIdentifierType,
      taxIdentifier: values.taxIdentifier,
      classification: values.classification,
    });

    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormState | undefined;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      displayName: values.displayName,
      legalName: values.legalName,
      taxIdentifierType: values.taxIdentifierType,
      taxIdentifier: values.taxIdentifier,
      classification: values.classification,
    });
  }

  return (
    <Dialog open={open} onOpenChange={(next) => (submitting ? undefined : onOpenChange(next))}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo cliente</DialogTitle>
          <DialogDescription>
            Informe os dados de identificação do cliente desta organização.
          </DialogDescription>
        </DialogHeader>

        <p className="text-xs text-muted-foreground">{SIMULATED_PERSISTENCE_NOTICE}</p>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <FormField label="Nome de exibição" required error={errors.displayName}>
            {(field) => (
              <Input
                {...field}
                value={values.displayName}
                onChange={(event) => updateField("displayName", event.target.value)}
                autoComplete="off"
              />
            )}
          </FormField>

          <FormField label="Razão social ou nome jurídico" required error={errors.legalName}>
            {(field) => (
              <Input
                {...field}
                value={values.legalName}
                onChange={(event) => updateField("legalName", event.target.value)}
                autoComplete="off"
              />
            )}
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Tipo de identificador fiscal" required>
              {(field) => (
                <Select
                  value={values.taxIdentifierType}
                  onValueChange={(value) =>
                    updateField("taxIdentifierType", value as TaxIdentifierType)
                  }
                >
                  <SelectTrigger id={field.id} aria-describedby={field["aria-describedby"]}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {taxIdentifierTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {TAX_IDENTIFIER_TYPE_LABELS[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </FormField>

            <FormField
              label="Identificador fiscal"
              required={requiresBrazilianIdentifier}
              help={identifierHelp}
              error={errors.taxIdentifier}
            >
              {(field) => (
                <Input
                  {...field}
                  value={values.taxIdentifier}
                  onChange={(event) => updateField("taxIdentifier", event.target.value)}
                  inputMode={requiresBrazilianIdentifier ? "numeric" : "text"}
                  autoComplete="off"
                />
              )}
            </FormField>
          </div>

          <FormField label="Classificação" required error={errors.classification}>
            {(field) => (
              <Select
                value={values.classification}
                onValueChange={(value) =>
                  updateField("classification", value as ClientClassification)
                }
              >
                <SelectTrigger id={field.id} aria-describedby={field["aria-describedby"]}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {clientClassifications.map((classification) => (
                    <SelectItem key={classification} value={classification}>
                      {CLIENT_CLASSIFICATION_LABELS[classification]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 aria-hidden="true" className="animate-spin" /> : null}
              {submitting ? "Registrando…" : "Registrar cliente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
