import type { ReactNode } from "react";
import { AlertOctagon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ErrorStateProps = { title: string; description: string; action?: ReactNode };

/** Estado de erro com impacto e próximo passo explícitos. */
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
