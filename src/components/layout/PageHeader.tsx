import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  badge?: ReactNode;
  breadcrumbLabel?: string;
};

/** Cabeçalho padrão da área de conteúdo — SDD-FND-001, seção 12.4. */
export function PageHeader({ title, description, badge, breadcrumbLabel }: PageHeaderProps) {
  return (
    <header className="mb-8 border-b border-border pb-6">
      {breadcrumbLabel ? (
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          SIGA / {breadcrumbLabel}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {badge}
      </div>
      {description ? (
        <p className="mt-3 max-w-prose text-sm text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}
