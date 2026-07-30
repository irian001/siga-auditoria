import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/states/EmptyState";
import { NAV_GROUP_LABELS, type NavItem } from "@/config/navigation";

type ModuloFuturoPageProps = {
  item: NavItem;
};

/**
 * Página-base comum das rotas de módulos ainda não implementados.
 * SDD-FND-001, seção 15. Não simula tabelas, formulários, filtros ou dados.
 */
export function ModuloFuturoPage({ item }: ModuloFuturoPageProps) {
  const Icon = item.icon;

  return (
    <>
      <PageHeader
        title={item.title}
        description={item.description}
        badge={<Badge variant="secondary">Planejado</Badge>}
        breadcrumbLabel={item.title}
      />

      <p className="mb-6 text-sm text-muted-foreground">
        Grupo do MVP:{" "}
        <span className="font-medium text-foreground">{NAV_GROUP_LABELS[item.group]}</span>
      </p>

      <EmptyState
        icon={Icon}
        title="Módulo ainda não implementado"
        description="Esta funcionalidade será implementada por uma especificação própria (SDD). Até lá, esta rota existe apenas para representar a estrutura de navegação do SIGA."
        action={
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft aria-hidden="true" />
              Voltar ao início
            </Link>
          </Button>
        }
      />
    </>
  );
}
