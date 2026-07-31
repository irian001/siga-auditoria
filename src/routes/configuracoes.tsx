import { createFileRoute } from "@tanstack/react-router";
import { CircleAlert, Info } from "lucide-react";

import { DataTableShell } from "@/components/patterns/DataTableShell";
import { FormField } from "@/components/patterns/FormField";
import { SectionHeader } from "@/components/patterns/SectionHeader";
import { ErrorState } from "@/components/states/ErrorState";
import { EmptyState } from "@/components/states/EmptyState";
import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, STATUS_MAP, type StatusKey } from "@/components/ui/status-badge";
import { getNavItem } from "@/config/navigation";
import { OrganizationSummary } from "@/features/organization/OrganizationSummary";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — SIGA" },
      { name: "description", content: getNavItem("configuracoes")!.description },
      { property: "og:title", content: "Configurações — SIGA" },
      { property: "og:description", content: getNavItem("configuracoes")!.description },
    ],
  }),
  component: ModuleRoute,
});

const statusKeys = Object.keys(STATUS_MAP) as StatusKey[];

function ReferenciaVisual() {
  return (
    <section aria-labelledby="padroes-visuais" className="mt-12">
      <SectionHeader
        title="Padrões visuais (referência interna)"
        description="Amostra interna de componentes reutilizáveis. Não representa cadastro, dados ou regras de auditoria."
      />

      <div className="mt-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Etiquetas e mensagens</CardTitle>
            <CardDescription>
              Todo estado é comunicado por texto e ícone, não apenas por cor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {statusKeys.map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
            </div>
            <div className="space-y-3">
              <Alert variant="info">
                <Info aria-hidden="true" />
                <div>
                  <AlertTitle>Orientação</AlertTitle>
                  <AlertDescription>
                    Este padrão poderá ser usado em módulos futuros quando houver contexto para o
                    usuário.
                  </AlertDescription>
                </div>
              </Alert>
              <Alert variant="warning">
                <CircleAlert aria-hidden="true" />
                <div>
                  <AlertTitle>Atenção</AlertTitle>
                  <AlertDescription>
                    Mensagens de aviso deverão indicar o impacto e a próxima ação esperada.
                  </AlertDescription>
                </div>
              </Alert>
              <ErrorState
                title="Exemplo de erro"
                description="Nenhuma informação foi alterada. Tente novamente ou registre a ocorrência para acompanhamento."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campo de formulário</CardTitle>
            <CardDescription>
              Rótulo, obrigatoriedade textual, ajuda e erro adjacente.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <FormField
              label="Identificação"
              help="Texto de ajuda exibido quando necessário."
              required
            >
              {(field) => <Input {...field} placeholder="Exemplo de preenchimento" />}
            </FormField>
            <FormField label="Identificação" error="Informe um valor para continuar." required>
              {(field) => <Input {...field} placeholder="Exemplo de preenchimento" />}
            </FormField>
          </CardContent>
        </Card>

        <DataTableShell
          title="Listagem — estado vazio"
          description="Moldura reutilizável para listagens, ainda sem dados de negócio."
          state="vazio"
          toolbar={
            <Button variant="outline" size="sm">
              Ação de exemplo
            </Button>
          }
          empty={
            <EmptyState
              title="Nenhum registro para exibir"
              description="Os registros aparecerão aqui quando o módulo correspondente for implementado."
            />
          }
        />
      </div>
    </section>
  );
}

function ModuleRoute() {
  return (
    <>
      <ModuloFuturoPage item={getNavItem("configuracoes")!} />
      <OrganizationSummary />
      <Separator className="mt-12" />
      <ReferenciaVisual />
    </>
  );
}
