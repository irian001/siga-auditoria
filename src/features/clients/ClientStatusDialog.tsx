import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Client } from "@/domain/client";
import {
  CLIENT_ACTIVATE_CONFIRM_LABEL,
  CLIENT_ACTIVATE_DESCRIPTION,
  CLIENT_ACTIVATE_TITLE,
  CLIENT_INACTIVATE_CONFIRM_LABEL,
  CLIENT_INACTIVATE_DESCRIPTION,
  CLIENT_INACTIVATE_TITLE,
} from "@/features/clients/clientsPresentation";

type ClientStatusDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  submitting?: boolean;
  submitError?: string | null;
  onConfirm: () => void;
};

/**
 * Confirmação de inativação ou reativação de cliente — Camada 4 da SDD-CLI-001.
 * Apenas apresentação: a mudança de estado é executada pela página.
 */
export function ClientStatusDialog({
  open,
  onOpenChange,
  client,
  submitting = false,
  submitError = null,
  onConfirm,
}: ClientStatusDialogProps) {
  const isInactivating = client?.status === "active";

  return (
    <AlertDialog open={open} onOpenChange={submitting ? undefined : onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isInactivating ? CLIENT_INACTIVATE_TITLE : CLIENT_ACTIVATE_TITLE}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {client ? (
              <>
                <span className="font-medium text-foreground">{client.displayName}</span>{" "}
                {isInactivating ? CLIENT_INACTIVATE_DESCRIPTION : CLIENT_ACTIVATE_DESCRIPTION}
              </>
            ) : null}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {submitError ? (
          <p role="alert" className="text-sm text-destructive">
            {submitError}
          </p>
        ) : null}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={submitting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              if (submitting) return;
              onConfirm();
            }}
            disabled={submitting}
          >
            {submitting
              ? "Processando…"
              : isInactivating
                ? CLIENT_INACTIVATE_CONFIRM_LABEL
                : CLIENT_ACTIVATE_CONFIRM_LABEL}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
