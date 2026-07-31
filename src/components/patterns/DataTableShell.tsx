import type { ReactNode } from "react";

import { SectionHeader } from "@/components/patterns/SectionHeader";
import { LoadingState } from "@/components/states/LoadingState";
import { cn } from "@/lib/utils";

type DataTableShellProps = {
  title: string;
  description?: string;
  /** Filtros e ações em área previsível, acima da tabela. */
  toolbar?: ReactNode;
  /** Estado da listagem; controla o que é exibido na área de conteúdo. */
  state?: "pronto" | "carregando" | "vazio" | "erro";
  /** Conteúdo para os estados vazio e erro. */
  empty?: ReactNode;
  error?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/**
 * Moldura de listagem — SDD-DSG-001, seção 8.2.
 *
 * Padroniza título, área de ações, área rolável e os estados de
 * carregamento, vazio e erro. Não contém dados nem lógica de negócio.
 */
export function DataTableShell({
  title,
  description,
  toolbar,
  state = "pronto",
  empty,
  error,
  footer,
  className,
  children,
}: DataTableShellProps) {
  return (
    <section className={cn("rounded-lg border border-border bg-card", className)}>
      <div className="border-b border-border p-4 sm:p-6">
        <SectionHeader
          title={title}
          description={description}
          actions={toolbar}
          className="mb-0"
        />
      </div>

      <div className="p-4 sm:p-6">
        {state === "carregando" ? <LoadingState variant="tabela" /> : null}
        {state === "vazio" ? empty : null}
        {state === "erro" ? error : null}
        {state === "pronto" ? (
          <div className="w-full overflow-x-auto">{children}</div>
        ) : null}
      </div>

      {footer ? <div className="border-t border-border p-4 sm:px-6">{footer}</div> : null}
    </section>
  );
}
