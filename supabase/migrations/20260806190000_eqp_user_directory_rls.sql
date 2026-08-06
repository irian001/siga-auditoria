-- EQP-001 Gate C: leitura administrativa do diretório de usuários elegíveis.
-- Não cria tabelas, não concede escrita e não expõe dados de auth.users.

create policy "organization_memberships_select_authorized_directory"
  on public.organization_memberships for select to authenticated
  using (
    status = 'active'
    and active_from <= now()
    and (active_to is null or active_to > now())
    and private.has_acl_permission('users.view', organization_id)
  );

create policy "user_profiles_select_authorized_directory"
  on public.user_profiles for select to authenticated
  using (
    status = 'active'
    and exists (
      select 1
      from public.organization_memberships om
      where om.user_profile_id = user_profiles.id
        and om.status = 'active'
        and om.active_from <= now()
        and (om.active_to is null or om.active_to > now())
        and private.has_acl_permission('users.view', om.organization_id)
    )
  );

comment on policy "organization_memberships_select_authorized_directory"
  on public.organization_memberships is
  'Permite somente a consulta de memberships ativos e vigentes da organização autorizada por users.view.';

comment on policy "user_profiles_select_authorized_directory"
  on public.user_profiles is
  'Permite somente a consulta de perfis ativos vinculados a memberships ativos de organizações autorizadas por users.view.';
