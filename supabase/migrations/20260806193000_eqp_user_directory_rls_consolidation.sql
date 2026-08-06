-- EQP-001 Gate C: correção da recursão de RLS e consolidação das políticas.
-- Este ajuste substitui as políticas permissivas paralelas por uma política
-- única por tabela e mantém a função de consulta restrita ao schema private.

create or replace function private.can_view_user_directory_profile(target_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and exists (
      select 1
      from public.organization_memberships om
      where om.user_profile_id = target_profile_id
        and om.status = 'active'
        and om.active_from <= now()
        and (om.active_to is null or om.active_to > now())
        and private.has_acl_permission('users.view', om.organization_id)
    );
$$;

revoke all on function private.can_view_user_directory_profile(uuid) from public;
grant usage on schema private to authenticated;
grant execute on function private.can_view_user_directory_profile(uuid) to authenticated;

drop policy if exists "user_profiles_select_authorized_directory" on public.user_profiles;
drop policy if exists "user_profiles_select_own" on public.user_profiles;

create policy "user_profiles_select_own_or_authorized_directory"
  on public.user_profiles for select to authenticated
  using (
    auth_subject = (select auth.uid())
    or (
      status = 'active'
      and private.can_view_user_directory_profile(id)
    )
  );

drop policy if exists "organization_memberships_select_authorized_directory"
  on public.organization_memberships;
drop policy if exists "organization_memberships_select_own"
  on public.organization_memberships;

create policy "organization_memberships_select_own_or_authorized_directory"
  on public.organization_memberships for select to authenticated
  using (
    user_profile_id = private.current_user_profile_id()
    or (
      status = 'active'
      and active_from <= now()
      and (active_to is null or active_to > now())
      and private.has_acl_permission('users.view', organization_id)
    )
  );

comment on function private.can_view_user_directory_profile(uuid) is
  'Verifica, sem recursão de RLS, se um perfil ativo possui vínculo vigente em uma organização na qual a sessão possui users.view.';
