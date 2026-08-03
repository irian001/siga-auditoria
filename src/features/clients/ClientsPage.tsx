import { getRouteApi } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Building2, CheckCircle2, Plus, RotateCcw, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";


import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/patterns/DataTableShell";
import { EmptyState } from "@/components/states/EmptyState";
import { ErrorState } from "@/components/states/ErrorState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appEnvironment } from "@/config/env";
import { getNavItem } from "@/config/navigation";
import { MockClientRepository } from "@/data/mockClientRepository";
import type { ClientRepository } from "@/data/clientRepository";
import type { Client, ClientFilters, CreateClientInput, UpdateClientInput } from "@/domain/client";
import type { RequestContext } from "@/domain/contracts";
import { can } from "@/domain/authorization";
import { ClientForm } from "@/features/clients/ClientForm";
import { ClientsList } from "@/features/clients/ClientsList";
import { ClientStatusDialog } from "@/features/clients/ClientStatusDialog";
import {
  CLASSIFICATION_FILTER_OPTIONS,
  CLIENT_ACTIVATED_NOTICE,
  CLIENT_INACTIVATED_NOTICE,
  CLIENT_UPDATED_NOTICE,
  SIMULATED_PERSISTENCE_NOTICE,
  STATUS_FILTER_OPTIONS,
  formatRecordCount,
  type ClassificationFilterValue,
  type StatusFilterValue,
} from "@/features/clients/clientsPresentation";




const rootRoute = getRouteApi("__root__");

/**
 * Único ponto de instanciação do repositório nesta camada visual.
 * A instância permanece vazia: nenhum cliente fictício é criado.
 */
const clientRepository: ClientRepository = new MockClientRepository();

export function ClientsPage() {
  const navItem = getNavItem("clientes")!;
  const { auth } = rootRoute.useRouteContext();
  const access = auth.access?.status === "active" ? auth.access.context : null;
  const authorization = access?.authorization ?? null;

  const canView = can(authorization, "clients.view");
  const canManage = can(authorization, "clients.manage");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilterValue>("active");
  const [classification, setClassification] = useState<ClassificationFilterValue>("all");

  const context = useMemo<RequestContext>(
    () => ({
      environment: appEnvironment.environment,
      organizationId: access?.organization.id,
      userId: access?.profile.id,
    }),
    [access?.organization.id, access?.profile.id],
  );

  const filters = useMemo<ClientFilters>(
    () => ({
      search: search.trim() || undefined,
      status: status === "all" ? undefined : status,
      classification: classification === "all" ? undefined : classification,
    }),
    [search, status, classification],
  );

  const hasActiveFilters =
    Boolean(filters.search) || status !== "active" || classification !== "all";

  const query = useQuery({
    enabled: canView,
    queryKey: ["clients", context.organizationId, filters],
    queryFn: async () => {
      const result = await clientRepository.list(context, filters, { page: 1, pageSize: 20 });
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: async (input: CreateClientInput) => {
      const result = await clientRepository.create(context, input);
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
    onSuccess: async (client) => {
      setFormOpen(false);
      setEditingClient(null);
      setSuccessMessage(`Cliente "${client.displayName}" registrado no ambiente de validação.`);
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (variables: { id: string; input: UpdateClientInput }) => {
      const result = await clientRepository.update(context, variables.id, variables.input);
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
    onSuccess: async () => {
      setFormOpen(false);
      setEditingClient(null);
      setSuccessMessage(CLIENT_UPDATED_NOTICE);
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const statusMutation = useMutation({
    mutationFn: async (variables: { id: string; status: ClientStatus }) => {
      const result = await clientRepository.changeStatus(context, variables.id, variables.status);
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
    onSuccess: async (client) => {
      setStatusDialogOpen(false);
      setStatusClient(null);
      setSuccessMessage(
        client.status === "inactive" ? CLIENT_INACTIVATED_NOTICE : CLIENT_ACTIVATED_NOTICE,
      );
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  function openForm() {
    setSuccessMessage(null);
    createMutation.reset();
    updateMutation.reset();
    setEditingClient(null);
    setFormOpen(true);
  }

  function openEditForm(client: Client) {
    setSuccessMessage(null);
    createMutation.reset();
    updateMutation.reset();
    setEditingClient(client);
    setFormOpen(true);
  }

  function openStatusDialog(client: Client) {
    setSuccessMessage(null);
    statusMutation.reset();
    setStatusClient(client);
    setStatusDialogOpen(true);
  }

  function handleStatusDialogOpenChange(next: boolean) {
    if (statusMutation.isPending) return;
    setStatusDialogOpen(next);
    if (!next) setStatusClient(null);
  }

  function handleFormOpenChange(next: boolean) {
    setFormOpen(next);
    if (!next) setEditingClient(null);
  }


  function clearFilters() {
    setSearch("");
    setStatus("active");
    setClassification("all");
  }



  const header = (
    <PageHeader
      title="Clientes"
      description={navItem.description}
      breadcrumbLabel="Clientes"
    />
  );

  if (!canView) {
    return (
      <>
        {header}
        <ErrorState
          title="Acesso não autorizado"
          description="Você não possui permissão para consultar clientes."
        />
      </>
    );
  }

  const total = query.data?.total ?? 0;
  const items = query.data?.items ?? [];

  const state = query.isPending
    ? "carregando"
    : query.isError
      ? "erro"
      : items.length === 0
        ? "vazio"
        : "pronto";

  return (
    <>
      {header}

      {canManage ? (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Button onClick={openForm} aria-describedby="novo-cliente-ajuda">
            <Plus aria-hidden="true" />
            Novo cliente
          </Button>
          <p id="novo-cliente-ajuda" className="text-xs text-muted-foreground">
            {SIMULATED_PERSISTENCE_NOTICE}
          </p>
        </div>
      ) : null}

      {successMessage ? (
        <Alert variant="success" className="mb-6">
          <CheckCircle2 aria-hidden="true" />
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      ) : null}

      {canManage ? (
        <ClientForm
          open={formOpen}
          onOpenChange={handleFormOpenChange}
          client={editingClient}
          submitting={editingClient ? updateMutation.isPending : createMutation.isPending}
          submitError={
            editingClient
              ? updateMutation.isError
                ? updateMutation.error.message
                : null
              : createMutation.isError
                ? createMutation.error.message
                : null
          }
          onSubmit={(input) => {
            if (editingClient) {
              updateMutation.mutate({ id: editingClient.id, input: input as UpdateClientInput });
              return;
            }
            createMutation.mutate(input);
          }}
        />

      ) : null}


      <DataTableShell
        title="Clientes da organização"
        description={formatRecordCount(total)}
        state={state}
        toolbar={
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-end">
            <div className="w-full space-y-1.5 sm:w-64">
              <Label htmlFor="clientes-pesquisa">Pesquisar</Label>
              <Input
                id="clientes-pesquisa"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nome ou identificador"
              />
            </div>
            <div className="w-full space-y-1.5 sm:w-40">
              <Label htmlFor="clientes-estado">Estado</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as StatusFilterValue)}>
                <SelectTrigger id="clientes-estado">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_FILTER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-1.5 sm:w-48">
              <Label htmlFor="clientes-classificacao">Classificação</Label>
              <Select
                value={classification}
                onValueChange={(value) => setClassification(value as ClassificationFilterValue)}
              >
                <SelectTrigger id="clientes-classificacao">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CLASSIFICATION_FILTER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
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
              icon={Building2}
              title="Nenhum resultado para os filtros aplicados"
              description="Revise a pesquisa, o estado ou a classificação selecionada."
              action={
                <Button variant="outline" onClick={clearFilters}>
                  <RotateCcw aria-hidden="true" />
                  Limpar filtros
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={Building2}
              title="Nenhum cliente cadastrado"
              description="Esta organização ainda não possui clientes registrados. Utilize “Novo cliente” para registrar no ambiente de validação."
            />
          )
        }
        error={
          <ErrorState
            title="Não foi possível carregar os clientes"
            description="Não foi possível concluir a operação. Tente novamente."
            action={
              <Button variant="outline" onClick={() => query.refetch()}>
                <RotateCcw aria-hidden="true" />
                Tentar novamente
              </Button>
            }
          />
        }
      >
        <ClientsList clients={items} canManage={canManage} onEdit={openEditForm} />
      </DataTableShell>

      {!canManage ? (
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldAlert aria-hidden="true" className="size-4" />
          Você possui acesso apenas de consulta a este módulo.
        </p>
      ) : null}
    </>
  );
}
