import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  APP_DESCRIPTION,
  APP_FULL_NAME,
  NAV_GROUPS,
  getNavItemsByGroup,
} from "@/config/navigation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início — SIGA" },
      {
        name: "description",
        content:
          "Página inicial do SIGA: visão estrutural do sistema de gerenciamento de auditoria e dos módulos previstos para o MVP.",
      },
      { property: "og:title", content: "Início — SIGA" },
      {
        property: "og:description",
        content:
          "Página inicial do SIGA: visão estrutural do sistema de gerenciamento de auditoria e dos módulos previstos para o MVP.",
      },
    ],
  }),
  component: Index,
});

const FLUXO = [
  "Clientes",
  "Trabalhos",
  "Planejamento",
  "Riscos e procedimentos",
  "Documentos e evidências",
  "Papéis de trabalho",
  "Revisão",
  "Relatórios",
];

function Index() {
  return (
    <>
      <PageHeader
        title="SIGA"
        description={`${APP_FULL_NAME}. ${APP_DESCRIPTION}`}
        badge={<Badge variant="secondary">MVP em construção</Badge>}
      />

      <section aria-labelledby="fluxo-titulo" className="mb-10">
        <h2 id="fluxo-titulo" className="text-lg font-semibold text-foreground">
          Fluxo geral do trabalho
        </h2>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          O SIGA acompanha o trabalho de auditoria da aceitação do cliente até a emissão do
          relatório, preservando a rastreabilidade entre risco, procedimento, evidência, papel de
          trabalho e conclusão.
        </p>
        <ol className="mt-4 flex flex-wrap items-center gap-2">
          {FLUXO.map((etapa, index) => (
            <li key={etapa} className="flex items-center gap-2">
              <span className="rounded-md border border-border bg-card px-3 py-1.5 text-sm text-foreground">
                {etapa}
              </span>
              {index < FLUXO.length - 1 ? (
                <ArrowRight aria-hidden="true" className="size-4 text-muted-foreground" />
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="modulos-titulo">
        <h2 id="modulos-titulo" className="text-lg font-semibold text-foreground">
          Módulos do sistema
        </h2>
        <p className="mt-2 max-w-prose text-sm text-muted-foreground">
          Os módulos serão disponibilizados progressivamente, cada um a partir da sua própria
          especificação aprovada. As páginas abaixo já existem para representar a estrutura de
          navegação.
        </p>

        <div className="mt-6 space-y-8">
          {NAV_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {group.label}
              </h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {getNavItemsByGroup(group.id).map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.id} className="h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
                            <CardTitle className="text-base">
                              <Link
                                to={item.to}
                                activeOptions={{ exact: item.to === "/" }}
                                className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              >
                                {item.title}
                              </Link>
                            </CardTitle>
                          </div>
                          <Badge variant={item.status === "disponivel" ? "default" : "outline"}>
                            {item.status === "disponivel" ? "Disponível" : "Planejado"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
