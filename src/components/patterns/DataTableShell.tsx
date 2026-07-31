import type { ReactNode } from "react";

import { SectionHeader } from "@/components/patterns/SectionHeader";
import { LoadingState } from "@/components/states/LoadingState";
import { cn } from "@/lib/utils";

type DataTableShellProps = {
  title: string;
  description?: string;
  toolbar?: ReactNode;
  state?: "pronto" | "carregando" | "vazio" | "erro";
  empty?: ReactNode;
  error?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Moldura de listagem sem dados nem regra de negócio. */
export function DataTableShell({
  title,
  description,
  toolbar,
  state = "pronto",
  empty,
  error,
  children,
  className,
}: DataTableShellProps) {
  return (
    <section className={cn("rounded-lg border border-border bg-card", className)}>
      <div className="border-b border-border p-4 sm:p-6">
        <SectionHeader title={title} description={description} actions={toolbar} />
      </div>
      <div className="p-4 sm:p-6">
        {state === "carregando" ? <LoadingState variant="tabela" /> : null}
        {state === "vazio" ? empty : null}
        {state === "erro" ? error : null}
        {state === "pronto" ? <div className="w-full overflow-x-auto">{children}</div> : null}
      </div>
    </section>
  );
}
