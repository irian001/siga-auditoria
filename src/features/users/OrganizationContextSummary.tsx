import { getRouteApi } from "@tanstack/react-router";
import { Building2, ShieldCheck, UserRound } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

const rootRoute = getRouteApi("__root__");

export function OrganizationContextSummary() {
  const { auth } = rootRoute.useRouteContext();
  if (auth.access?.status !== "active") return null;

  const { profile, organization, authorization } = auth.access.context;

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Contexto de acesso</CardTitle>
            <CardDescription>Identidade e organização ativas nesta sessão.</CardDescription>
          </div>
          <StatusBadge status="concluido" label="Acesso ativo" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <UserRound className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm text-muted-foreground">Usuário</p>
            <p className="font-medium text-foreground">{profile.displayName}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Building2 className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm text-muted-foreground">Organização</p>
            <p className="font-medium text-foreground">{organization.displayName}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm text-muted-foreground">Papel organizacional</p>
            <p className="font-medium text-foreground">
              {authorization.roleCodes.join(", ") || "Não atribuído"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
