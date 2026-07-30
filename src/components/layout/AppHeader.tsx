import { Link } from "@tanstack/react-router";

import { MobileNav } from "@/components/navigation/MobileNav";
import { Badge } from "@/components/ui/badge";
import { APP_ENVIRONMENT_LABEL, APP_FULL_NAME, APP_NAME } from "@/config/navigation";

/** Cabeçalho da aplicação — SDD-FND-001, seção 12.2. */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <MobileNav />

        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            aria-hidden="true"
            className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold tracking-tight text-primary-foreground"
          >
            SI
          </span>
          <span className="min-w-0">
            <span className="block text-base font-bold leading-tight tracking-tight text-foreground">
              {APP_NAME}
            </span>
            <span className="hidden truncate text-xs leading-tight text-muted-foreground sm:block">
              {APP_FULL_NAME}
            </span>
          </span>
        </Link>

        <div className="ml-auto">
          <Badge variant="outline" className="whitespace-nowrap">
            {APP_ENVIRONMENT_LABEL}
          </Badge>
        </div>
      </div>
    </header>
  );
}
