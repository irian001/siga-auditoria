-- EQP-001 / Camada 4 — associação controlada de usuário e função.
-- Não cria usuários, funções, períodos ou dados iniciais.

create unique index if not exists engagement_team_members_active_member_unique
  on public.engagement_team_members (organization_id, engagement_id, membership_id)
  where status = 'active';

create or replace function private.can_assign_engagement_team_member(
  p_organization_id uuid,
  p_engagement_id uuid,
  p_membership_id uuid,
  p_engagement_role_id uuid,
  p_active_from date,
  p_active_to date,
  p_status text
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and p_active_to is null
    and p_status = 'active'
    and p_active_from is not null
    and private.has_acl_permission('engagements.manage', p_organization_id)
    and exists (
      select 1
      from public.audit_engagements ae
      where ae.organization_id = p_organization_id
        and ae.id = p_engagement_id
        and ae.status in ('draft', 'active')
    )
    and exists (
      select 1
      from public.organization_memberships om
      join public.user_profiles up on up.id = om.user_profile_id
      where om.organization_id = p_organization_id
        and om.id = p_membership_id
        and om.status = 'active'
        and om.active_from <= current_date
        and (om.active_to is null or om.active_to > current_date)
        and up.status = 'active'
    )
    and exists (
      select 1
      from public.engagement_roles er
      where er.organization_id = p_organization_id
        and er.id = p_engagement_role_id
        and er.status = 'active'
    )
    and not exists (
      select 1
      from public.engagement_team_members etm
      where etm.organization_id = p_organization_id
        and etm.engagement_id = p_engagement_id
        and etm.membership_id = p_membership_id
        and etm.status = 'active'
    );
$$;

revoke all on function private.can_assign_engagement_team_member(uuid, uuid, uuid, uuid, date, date, text)
  from public;
grant execute on function private.can_assign_engagement_team_member(uuid, uuid, uuid, uuid, date, date, text)
  to authenticated;

grant insert on table public.engagement_team_members to authenticated;

drop policy if exists "engagement_team_members_insert_authorized"
  on public.engagement_team_members;

create policy "engagement_team_members_insert_authorized"
  on public.engagement_team_members
  for insert
  to authenticated
  with check (
    private.can_assign_engagement_team_member(
      organization_id,
      engagement_id,
      membership_id,
      engagement_role_id,
      active_from,
      active_to,
      status
    )
  );

comment on index public.engagement_team_members_active_member_unique is
  'EQP-001 Camada 4: impede participação ativa duplicada do mesmo usuário no trabalho.';
