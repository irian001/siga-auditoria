import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { FormField } from "@/components/patterns/FormField";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { can, type AuthorizationContext } from "@/domain/authorization";
import { createSupabaseEngagementTeamPeriodsRepository } from "@/data/supabase/supabaseEngagementTeamRepository";
import { createSupabaseUserDirectoryRepository } from "@/data/supabase/supabaseUserDirectoryRepository";
import { getSupabaseBrowserClient } from "@/data/supabase/supabaseClient";
import type { EngagementRoleOption } from "@/domain/engagementTeam";

let teamRepository: ReturnType<typeof createSupabaseEngagementTeamPeriodsRepository> | undefined;
let directoryRepository: ReturnType<typeof createSupabaseUserDirectoryRepository> | undefined;

function getTeamRepository() {
  teamRepository ??= createSupabaseEngagementTeamPeriodsRepository(getSupabaseBrowserClient());
  return teamRepository;
}

function getDirectoryRepository() {
  directoryRepository ??= createSupabaseUserDirectoryRepository(getSupabaseBrowserClient());
  return directoryRepository;
}

type EngagementTeamMemberAssignmentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId?: string;
  engagementId: string;
  authorization: AuthorizationContext | null;
};

export function EngagementTeamMemberAssignment({
  open,
  onOpenChange,
  organizationId,
  engagementId,
  authorization,
}: EngagementTeamMemberAssignmentProps) {
  const queryClient = useQueryClient();
  const [membershipId, setMembershipId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [activeFrom, setActiveFrom] = useState(today());
  const [formError, setFormError] = useState<string | null>(null);

  const canManage = Boolean(
    organizationId && authorization && can(authorization, "engagements.manage", organizationId),
  );
  const canViewUsers = Boolean(
    organizationId && authorization && can(authorization, "users.view", organizationId),
  );
  const context = useMemo(
    () =>
      organizationId && authorization ? { organizationId, engagementId, authorization } : null,
    [authorization, engagementId, organizationId],
  );

  const usersQuery = useQuery({
    enabled: open && canManage && canViewUsers && context !== null,
    queryKey: ["eligible-users", organizationId, engagementId],
    queryFn: async () => {
      if (!context) throw new Error("Contexto organizacional indisponível.");
      const result = await getDirectoryRepository().listEligibleUsers({
        ...context,
        asOf: new Date().toISOString(),
      });
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  const rolesQuery = useQuery({
    enabled: open && canManage && context !== null,
    queryKey: ["engagement-roles", organizationId, engagementId],
    queryFn: async () => {
      if (!context) throw new Error("Contexto organizacional indisponível.");
      const result = await getTeamRepository().listActiveRoles(context);
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
  });

  const assignmentMutation = useMutation({
    mutationFn: async () => {
      if (!context) throw new Error("Contexto organizacional indisponível.");
      const result = await getTeamRepository().assignMember(context, {
        organizationId: context.organizationId,
        engagementId: context.engagementId,
        membershipId,
        roleId,
        activeFrom,
      });
      if (!result.ok) throw new Error(result.error.message);
      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["engagement-team-periods", organizationId, engagementId],
      });
      onOpenChange(false);
    },
  });
  const { reset: resetAssignment } = assignmentMutation;

  useEffect(() => {
    if (!open) return;
    setMembershipId("");
    setRoleId("");
    setActiveFrom(today());
    setFormError(null);
    resetAssignment();
  }, [open, resetAssignment]);

  const users = usersQuery.data ?? [];
  const roles = rolesQuery.data ?? [];
  const loading = usersQuery.isPending || rolesQuery.isPending;
  const hasEmptyCatalog = !loading && (users.length === 0 || roles.length === 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (assignmentMutation.isPending) return;

    if (!canManage) {
      setFormError("Você não possui permissão para associar equipe ao trabalho.");
      return;
    }
    if (!canViewUsers) {
      setFormError("Você não possui permissão para consultar o diretório de usuários.");
      return;
    }
    if (!membershipId || !roleId || !/^\d{4}-\d{2}-\d{2}$/.test(activeFrom)) {
      setFormError("Selecione um usuário, uma função e uma data de início válida.");
      return;
    }

    setFormError(null);
    assignmentMutation.mutate();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (assignmentMutation.isPending ? undefined : onOpenChange(next))}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar participante</DialogTitle>
          <DialogDescription>
            Associe um usuário elegível a uma função neste trabalho. A participação nascerá ativa.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Alert variant="info">
            <AlertDescription>
              A associação respeita a organização, o diretório de usuários, a função ativa e a
              permissão de administração da equipe.
            </AlertDescription>
          </Alert>

          {!canManage ? (
            <Alert variant="destructive">
              <AlertDescription>
                Você não possui permissão para associar equipe ao trabalho.
              </AlertDescription>
            </Alert>
          ) : null}

          {canManage && !canViewUsers ? (
            <Alert variant="destructive">
              <AlertDescription>
                O diretório de usuários não está disponível para o seu contexto de acesso.
              </AlertDescription>
            </Alert>
          ) : null}

          {usersQuery.isError || rolesQuery.isError || assignmentMutation.isError ? (
            <Alert variant="destructive">
              <AlertDescription>
                {usersQuery.error?.message ??
                  rolesQuery.error?.message ??
                  assignmentMutation.error?.message}
              </AlertDescription>
            </Alert>
          ) : null}

          {hasEmptyCatalog ? (
            <Alert variant="warning">
              <AlertDescription>
                Não há usuários elegíveis ou funções ativas disponíveis. Nenhum registro será criado
                automaticamente.
              </AlertDescription>
            </Alert>
          ) : null}

          <FormField label="Usuário elegível" required>
            {({ id }) => (
              <Select
                value={membershipId || undefined}
                onValueChange={setMembershipId}
                disabled={loading || assignmentMutation.isPending || !canManage || !canViewUsers}
              >
                <SelectTrigger id={id}>
                  <SelectValue
                    placeholder={loading ? "Carregando usuários..." : "Selecione o usuário"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.membershipId} value={user.membershipId}>
                      {user.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormField>

          <FormField label="Função no trabalho" required>
            {({ id }) => (
              <Select
                value={roleId || undefined}
                onValueChange={setRoleId}
                disabled={loading || assignmentMutation.isPending || !canManage}
              >
                <SelectTrigger id={id}>
                  <SelectValue
                    placeholder={loading ? "Carregando funções..." : "Selecione a função"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {formatRole(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormField>

          <FormField label="Início da participação" required>
            {({ id }) => (
              <Input
                id={id}
                type="date"
                value={activeFrom}
                onChange={(event) => setActiveFrom(event.target.value)}
                disabled={assignmentMutation.isPending || !canManage}
              />
            )}
          </FormField>

          {formError ? (
            <Alert variant="destructive">
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={assignmentMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={
                assignmentMutation.isPending ||
                !canManage ||
                !canViewUsers ||
                users.length === 0 ||
                roles.length === 0
              }
            >
              {assignmentMutation.isPending ? <Loader2 className="animate-spin" /> : null}
              Associar participante
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatRole(role: EngagementRoleOption): string {
  return `${role.name} (${role.code})`;
}
