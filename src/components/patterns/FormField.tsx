import { useId, type ReactElement } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  label: string;
  /** Texto de ajuda exibido abaixo do rótulo. */
  help?: string;
  /** Mensagem de erro exibida próxima ao campo. */
  error?: string;
  required?: boolean;
  className?: string;
  /** Recebe id, aria-describedby e aria-invalid já resolvidos. */
  children: (
    field: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean },
  ) => ReactElement;
};

/**
 * Campo de formulário — SDD-DSG-001, seção 8.1.
 *
 * Composição sobre `ui/label`: rótulo explícito, obrigatoriedade indicada
 * também por texto, ajuda opcional e erro adjacente ao controle.
 * Não implementa regra de negócio nem validação funcional.
 */
export function FormField({
  label,
  help,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  const id = useId();
  const helpId = `${id}-ajuda`;
  const errorId = `${id}-erro`;
  const describedBy = [help ? helpId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="ml-1 text-xs font-normal text-muted-foreground">(obrigatório)</span>
        ) : null}
      </Label>

      {children({
        id,
        "aria-describedby": describedBy || undefined,
        "aria-invalid": error ? true : undefined,
      })}

      {help ? (
        <p id={helpId} className="text-xs text-muted-foreground">
          {help}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
