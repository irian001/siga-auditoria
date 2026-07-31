import type { ReactNode } from "react";
import { AlertOctagon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ErrorStateProps = {
  /** O que ocorreu. */
  title: string;
  /** Qual é o impacto e o que o usuário pode fazer a seguir. */
  description: string;
  /** Ação de recuperação, quando existir. */
  action?: ReactNode;
};

/**
 * Estado de erro reutilizável — SDD-DSG-001, seções 6, 7 e 8.3.
 * Mensagens genéricas como "Erro" sem contexto não são admitidas.
 */
export function ErrorState({ title, description, action }: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <AlertOctagon aria-hidden="true" />
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </Alert>
  );
}
