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
                      className="flex items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar data-[status=active]:border-primary data-[status=active]:bg-sidebar-accent data-[status=active]:font-semibold data-[status=active]:text-sidebar-accent-foreground"
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
