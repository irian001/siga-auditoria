import { useState } from "react";
import { Menu } from "lucide-react";

import { MainNav } from "@/components/navigation/MainNav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { APP_FULL_NAME, APP_NAME } from "@/config/navigation";

/** Navegação em painel para telas menores — SDD-FND-001, seção 13.3. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden" aria-label="Abrir navegação">
          <Menu aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-xs overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle>
            <span className="block text-base font-bold tracking-tight">{APP_NAME}</span>
            <span className="block text-xs font-normal text-muted-foreground">{APP_FULL_NAME}</span>
          </SheetTitle>
        </SheetHeader>
        <div className="px-2 pb-6">
          <MainNav onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
