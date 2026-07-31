import { createFileRoute } from "@tanstack/react-router";
import { CircleAlert, Info } from "lucide-react";

import { ModuloFuturoPage } from "@/components/states/ModuloFuturoPage";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { DataTableShell } from "@/components/patterns/DataTableShell";
import { FormField } from "@/components/patterns/FormField";
import { SectionHeader } from "@/components/patterns/SectionHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, STATUS_MAP, type StatusKey } from "@/components/ui/status-badge";
import { getNavItem } from "@/config/navigation";

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

const STATUS_KEYS = Object.keys(STATUS_MAP) as StatusKey[];

const TIPOGRAFIA = [
  { rotulo: "Título da página", classe: "text-2xl font-semibold tracking-tight sm:text-3xl" },
  { rotulo: "Título de seção", classe: "text-lg font-semibold" },
  { rotulo: "Título de cartão", classe: "text-base font-semibold" },
  { rotulo: "Texto de apoio", classe: "text-sm text-muted-foreground" },
  { rotulo: "Mensagem de status", classe: "text-xs text-muted-foreground" },
];

const SUPERFICIES = [
  { rotulo: "Fundo principal", classe: "bg-background" },
  { rotulo: "Navegação", classe: "bg-sidebar" },
  { rotulo: "Cartão", classe: "bg-card" },
  { rotulo: "Apoio", classe: "bg-muted" },
];

/** Referência visual interna — SDD-DSG-001, seções 6 a 8. Sem dados de auditoria. */
function ReferenciaVisual() {
  return (
    <section aria-labelledby="padroes-visuais" className="mt-12">
      <SectionHeader
        id="padroes-visuais"
        title="Padrões visuais (referência interna)"
        description="Amostra dos tokens, componentes e estados consolidados pela SDD-DSG-001. Não representa dados, cadastros ou funcionalidades de auditoria."
      />

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Superfícies e bordas</CardTitle>
            <CardDescription>
              Grafite em camadas, delimitado por borda em cinza frio.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-4">
            {SUPERFICIES.map((item) => (
              <div key={item.rotulo} className="space-y-2">
                <div className={`h-16 rounded-md border border-border ${item.classe}`} />
                <p className="text-xs text-muted-foreground">{item.rotulo}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hierarquia tipográfica</CardTitle>
            <CardDescription>Hierarquia mínima entre título, apoio e status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {TIPOGRAFIA.map((item) => (
              <p key={item.rotulo} className={item.classe}>
                {item.rotulo}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações</CardTitle>
            <CardDescription>
              Ação principal, secundária, terciária e destrutiva, com foco visível por teclado.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Ação principal</Button>
            <Button variant="secondary">Ação secundária</Button>
            <Button variant="outline">Ação alternativa</Button>
            <Button variant="ghost">Ação discreta</Button>
            <Button variant="destructive">Ação destrutiva</Button>
            <Button disabled>Indisponível</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Etiquetas de situação</CardTitle>
            <CardDescription>
              Cada situação é comunicada por texto e ícone, não apenas por cor.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {STATUS_KEYS.map((key) => (
              <StatusBadge key={key} status={key} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mensagens</CardTitle>
            <CardDescription>
              Informam o que ocorreu, o impacto e o que fazer a seguir.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert variant="info">
              <Info aria-hidden="true" />
              <div>
                <AlertTitle>Orientação</AlertTitle>
                <AlertDescription>
                  Este módulo será implementado por especificação própria. Nenhuma ação é necessária
                  no momento.
                </AlertDescription>
              </div>
            </Alert>
            <Alert variant="success">
              <Info aria-hidden="true" />
              <div>
                <AlertTitle>Registro concluído</AlertTitle>
                <AlertDescription>
                  As informações foram gravadas e passam a integrar o histórico do trabalho.
                </AlertDescription>
              </div>
            </Alert>
            <Alert variant="warning">
              <CircleAlert aria-hidden="true" />
              <div>
                <AlertTitle>Atenção</AlertTitle>
                <AlertDescription>
                  Há itens pendentes de revisão. A conclusão permanece disponível, mas o
                  responsável deverá registrar a justificativa.
                </AlertDescription>
              </div>
            </Alert>
            <ErrorState
              title="Não foi possível concluir a operação"
              description="A informação não foi gravada e o conteúdo anterior permanece preservado. Tente novamente ou registre a ocorrência para o responsável técnico."
              action={
                <Button variant="outline" size="sm">
                  Tentar novamente
                </Button>
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campos de formulário</CardTitle>
            <CardDescription>
              Rótulo explícito, obrigatoriedade indicada por texto, ajuda e erro adjacentes ao
              campo.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <FormField
              label="Identificação"
              help="Texto de ajuda exibido abaixo do campo quando necessário."
              required
            >
              {(field) => <Input {...field} placeholder="Exemplo de preenchimento" />}
            </FormField>
            <FormField label="Identificação" error="Informe um valor para continuar." required>
              {(field) => <Input {...field} placeholder="Exemplo de preenchimento" />}
            </FormField>
            <FormField label="Campo indisponível" help="Somente leitura neste contexto.">
              {(field) => <Input {...field} disabled placeholder="Indisponível" />}
            </FormField>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <DataTableShell
            title="Listagem — estado vazio"
            description="Moldura padrão de listagem, sem dados."
            state="vazio"
            empty={
              <EmptyState
                title="Nenhum registro para exibir"
                description="Quando o módulo correspondente for implementado, os registros vinculados à organização aparecerão aqui."
              />
            }
          />
          <DataTableShell
            title="Listagem — carregando"
            description="Esqueleto reutilizável de tabela."
            state="carregando"
          />
          <DataTableShell
            title="Listagem — erro"
            description="Mensagem com contexto e recuperação possível."
            state="erro"
            error={
              <ErrorState
                title="Não foi possível carregar a listagem"
                description="Nenhum dado foi alterado. Atualize a página ou tente novamente em instantes."
              />
            }
          />
        </div>
      </div>
    </section>
  );
}

function ModuleRoute() {
  return (
    <>
      <ModuloFuturoPage item={getNavItem("configuracoes")!} />
      <Separator className="mt-12" />
      <ReferenciaVisual />
    </>
  );
}
