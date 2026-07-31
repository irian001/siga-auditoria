import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  /** Ações da seção, alinhadas à direita em telas maiores. */
  actions?: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Título de seção — SDD-DSG-001, seções 5.3 e 5.4.
 * Nível intermediário entre o cabeçalho da página e o título do cartão.
 */
export function SectionHeader({
  title,
  description,
  actions,
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap",
        className,
      )}
    >
      <div className="min-w-0">
        <h2 id={id} className="text-lg font-semibold leading-tight text-foreground">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}
