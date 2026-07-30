import { Link } from "@tanstack/react-router";

import { NAV_GROUPS, getNavItemsByGroup } from "@/config/navigation";
import { cn } from "@/lib/utils";

type MainNavProps = {
  onNavigate?: () => void;
  className?: string;
};

/** Navegação principal do SIGA — SDD-FND-001, seções 10 e 12.3. */
export function MainNav({ onNavigate, className }: MainNavProps) {
  return (
    <nav aria-label="Navegação principal" className={cn("space-y-6", className)}>
      {NAV_GROUPS.map((group) => {
        const items = getNavItemsByGroup(group.id);
        if (items.length === 0) return null;

        return (
          <div key={group.id}>
            <h2 className="px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.label}
            </h2>
            <ul className="mt-2 space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === "/" }}
                      onClick={onNavigate}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[status=active]:bg-secondary data-[status=active]:font-semibold data-[status=active]:text-secondary-foreground"
                      activeProps={{ "aria-current": "page" }}
                    >
                      <Icon aria-hidden="true" className="size-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
