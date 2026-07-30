import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/AppHeader";
import { MainNav } from "@/components/navigation/MainNav";

/** Layout raiz do SIGA — SDD-FND-001, seção 12. */
export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-sidebar px-3 py-6 lg:block">
          <MainNav />
        </aside>
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
