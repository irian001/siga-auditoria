import { getRouteApi } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness, Eye, RotateCcw, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/patterns/DataTableShell";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { appEnvironment } from "@/config/env";
import { getNavItem } from "@/config/navigation";
import { createSupabaseClientRepository } from "@/data/supabase/supabaseClientRepository";
import { createSupabaseEngagementRepository } from "@/data/supabase/supabaseEngagementRepository";
import type { RequestContext } from "@/domain/contracts";
import { can } from "@/domain/authorization";
import type {
  AuditEngagement,
  AuditEngagementFilters,
  AuditEngagementStatus,
} from "@/domain/engagement";
import {
  ENGAGEMENT_CLASSIFICATION_LABELS,
  ENGAGEMENTS_FUTURE_STEPS_NOTICE,
  ENGAGEMENTS_READ_ONLY_NOTICE,
  ENGAGEMENT_STATUS_BADGES,
  ENGAGEMENT_STATUS_FILTER_OPTIONS,
  ENGAGEMENT_STATUS_LABELS,
  formatEngagementDate,
  formatEngagementRecordCount,
} from "@/features/engagements/engagementsPresentation";

const rootRoute = getRouteApi("__root__");

let engagementRepository: ReturnType<typeof createSupabaseEngagementRepository> | undefined;
let clientRepository: ReturnType<typeof createSupabaseClientRepository> | undefined;

function getEngagementRepository() {
  engagementRepository ??= createSupabaseEngagementRepository();
  return engagementRepository;
}

function getClientRepository() {
  clientRepository ??= createSupabaseClientRepository();
  return clientRepository;
}

type StatusFilterValue = AuditEngagementStatus | "all";

export function EngagementsPage() {
  const navItem = getNavItem("trabalhos")!;
  const { auth } = rootRoute.useRouteContext();
  const access = auth.access?.status === "active" ? auth.access.context : null;
  const authorization = access?.authorization ?? null;
  const canView = can(authorization, "engagements.view");

  const context = useMemo<RequestContext>(
    () => ({
      environment: appEnvironment.environment,
      organizationId: access?.organization.id,
      userId: access?.profile.id,
    }),
    [access?.organization.id, access?.profile.id],
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilterValue>("all");
  const [clientId, setClientId] = useState("all");
  const [selectedEngagement, setSelectedEngagement] = useState<AuditEngagement | null>(null);

  const filters = useMemo<AuditEngagementFilters>(
    () => ({
      search: search.trim() || undefined,
      status: status === "all" ? undefined : status,
      clientId: clientId === "all" ? undefined : clientId,
    }),
    [clientId, search, status],
  );

  const query = useQuery({
    enabled: canView,
    queryKey: ["engagements", context.organizationId, filters],
    queryFn: async () => {
      const result = await getEngagementRepository().list(context, filters, {
        page: 1,
        pageSize: 50,
      });
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  const clientsQuery = useQuery({
    enabled: canView,
    queryKey: ["engagement-filter-clients", context.organizationId],
    queryFn: async () => {
      const result = await getClientRepository().list(context, {}, { page: 1, pageSize: 100 });
      if (!result.ok) throw new Error(result.error.message);
      return result.data.items;
    },
  });

  const clientsById = useMemo(
    () => new Map((clientsQuery.data ?? []).map((client) => [client.id, client])),
    [clientsQuery.data],
  );

  const items = query.data?.items ?? [];
  const total = query.data?.total ?? 0;
  const hasActiveFilters = Boolean(filters.search) || status !== "all" || clientId !== "all";
  const state = query.isPending
    ? "carregando"
    : query.isError
      ? "erro"
      : items.length === 0
        ? "vazio"
        : "pronto";

  const header = (
    <PageHeader title="Trabalhos" description={navItem.description} breadcrumbLabel="Trabalhos" />
  );

  if (!canView) {
    return (
      <>
        {header}
        <ErrorState
          title="Acesso não autorizado"
          description="Você não possui permissão para consultar trabalhos desta organização."
        />
      </>
    );
  }

  function clearFilters() {
    setSearch("");
    setStatus("all");
    setClientId("all");
  }

  return (
    <>
      {header}

      <div className="mb-6 space-y-2">
        <p className="text-sm text-muted-foreground">{ENGAGEMENTS_READ_ONLY_NOTICE}</p>
        <p className="text-xs text-muted-foreground">{ENGAGEMENTS_FUTURE_STEPS_NOTICE}</p>
      </div>

      <DataTableShell
        title="Trabalhos da organização"
        description={formatEngagementRecordCount(total)}
        state={state}
        toolbar={
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
            <div className="w-full space-y-1.5 sm:w-64">
              <Label htmlFor="trabalhos-pesquisa">Pesquisar</Label>
              <Input
                id="trabalhos-pesquisa"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Código ou título"
              />
            </div>
            <div className="w-full space-y-1.5 sm:w-44">
              <Label htmlFor="trabalhos-estado">Estado</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as StatusFilterValue)}>
                <SelectTrigger id="trabalhos-estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ENGAGEMENT_STATUS_FILTER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-1.5 sm:w-56">
              <Label htmlFor="trabalhos-cliente">Cliente</Label>
              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger id="trabalhos-cliente">
                  <SelectValue placeholder="Todos os clientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os clientes</SelectItem>
                  {(clientsQuery.data ?? []).map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        }
        empty={
          hasActiveFilters ? (
            <EmptyState
              icon={BriefcaseBusiness}
              title="Nenhum trabalho para os filtros aplicados"
              description="Revise a pesquisa, o estado ou o cliente selecionado."
              action={
                <Button variant="outline" onClick={clearFilters}>
                  <RotateCcw aria-hidden="true" />
                  Limpar filtros
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={BriefcaseBusiness}
              title="Nenhum trabalho disponível"
              description="Esta organização ainda não possui trabalhos para consulta. A criação será disponibilizada em uma camada posterior."
            />
          )
        }
        error={
          <ErrorState
            title="Não foi possível carregar os trabalhos"
            description="Não foi possível concluir a consulta. Tente novamente."
            action={
              <Button variant="outline" onClick={() => query.refetch()}>
                <RotateCcw aria-hidden="true" />
                Tentar novamente
              </Button>
            }
          />
        }
      >
        <Table>
          <caption className="sr-only">
            Trabalhos de auditoria da organização ativa, em modo somente leitura.
          </caption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Código</TableHead>
              <TableHead scope="col">Título</TableHead>
              <TableHead scope="col">Cliente</TableHead>
              <TableHead scope="col">Estado</TableHead>
              <TableHead scope="col">Atualizado</TableHead>
              <TableHead scope="col" className="text-right">
                Consulta
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((engagement) => (
              <TableRow key={engagement.id}>
                <TableCell className="font-medium text-foreground">{engagement.code}</TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">{engagement.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {ENGAGEMENT_CLASSIFICATION_LABELS[engagement.classification]}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {clientsById.get(engagement.clientId)?.displayName ?? engagement.clientId}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={ENGAGEMENT_STATUS_BADGES[engagement.status]}
                    label={ENGAGEMENT_STATUS_LABELS[engagement.status]}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatEngagementDate(engagement.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedEngagement(engagement)}
                    aria-label={`Consultar trabalho ${engagement.code}`}
                  >
                    <Eye aria-hidden="true" />
                    Ver resumo
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataTableShell>

      <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldAlert aria-hidden="true" className="size-4" />
        Esta camada não permite criar, editar, cancelar ou encerrar trabalhos.
      </p>

      <Dialog
        open={selectedEngagement !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedEngagement(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEngagement?.title ?? "Resumo do trabalho"}</DialogTitle>
            <DialogDescription>
              Consulta somente leitura do trabalho {selectedEngagement?.code ?? ""}.
            </DialogDescription>
          </DialogHeader>

          {selectedEngagement ? (
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <Detail label="Código" value={selectedEngagement.code} />
              <Detail label="Estado" value={ENGAGEMENT_STATUS_LABELS[selectedEngagement.status]} />
              <Detail
                label="Cliente"
                value={clientsById.get(selectedEngagement.clientId)?.displayName ?? selectedEngagement.clientId}
              />
              <Detail
                label="Classificação"
                value={ENGAGEMENT_CLASSIFICATION_LABELS[selectedEngagement.classification]}
              />
              <Detail label="Avaliação ACE utilizada" value={selectedEngagement.acceptanceAssessmentId} />
              <Detail label="Criado em" value={formatEngagementDate(selectedEngagement.createdAt)} />
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Escopo preliminar
                </dt>
                <dd className="mt-1 whitespace-pre-wrap text-foreground">{selectedEngagement.scope}</dd>
              </div>
            </dl>
          ) : null}

          <Badge variant="neutral" className="w-fit">
            Somente consulta
          </Badge>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-foreground">{value}</dd>
    </div>
  );
}
