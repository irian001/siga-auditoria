import { Building2, LockKeyhole } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

const fields = [
  "Razão social",
  "Nome de exibição",
  "CNPJ",
  "Situação",
  "Idioma e região",
  "Fuso horário",
];

export function OrganizationSummary() {
  return (
    <section aria-labelledby="organizacao-usuaria" className="mt-12">
      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Building2 aria-hidden="true" className="size-5" />
              </div>
              <div>
                <CardTitle id="organizacao-usuaria">Organização usuária</CardTitle>
                <CardDescription>
                  A firma de auditoria que utiliza e administra o SIGA.
                </CardDescription>
              </div>
            </div>
            <StatusBadge status="indisponivel" label="Aguardando autenticação" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <Alert variant="info">
            <LockKeyhole aria-hidden="true" />
            <div>
              <AlertTitle>Acesso protegido</AlertTitle>
              <AlertDescription>
                O cadastro e a consulta serão liberados somente após a implantação da autenticação e
                das permissões por organização.
              </AlertDescription>
            </div>
          </Alert>

          <div>
            <p className="text-sm font-medium text-foreground">Informações previstas</p>
            <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
              {fields.map((field) => (
                <li key={field} className="rounded-md border border-border bg-muted/30 px-3 py-2">
                  {field}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-muted-foreground">
            Nenhuma organização real está sendo exibida ou gravada nesta etapa.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
