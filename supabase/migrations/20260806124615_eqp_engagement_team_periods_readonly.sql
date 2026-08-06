-- EQP-001 / Camada 3 — estrutura mínima para consulta somente leitura.
-- Não cria vínculos, funções ou períodos e não oferece operações de escrita.

create table public.engagement_roles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  code text not null,
  name text not null,
  description text,
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint engagement_roles_organization_id_id_unique
    unique (organization_id, id),
  constraint engagement_roles_code_valid
    check (btrim(code) <> '' and char_length(code) <= 80),
  constraint engagement_roles_name_valid
    check (btrim(name) <> '' and char_length(name) <= 160),
  constraint engagement_roles_status_valid
    check (btrim(status) <> '')
);

create table public.engagement_team_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  engagement_id uuid not null,
  membership_id uuid not null,
  engagement_role_id uuid not null,
  active_from date not null,
  active_to date,
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint engagement_team_members_organization_id_id_unique
    unique (organization_id, id),
  constraint engagement_team_members_engagement_context_fk
    foreign key (organization_id, engagement_id)
    references public.audit_engagements (organization_id, id)
    on delete restrict,
  constraint engagement_team_members_membership_context_fk
    foreign key (organization_id, membership_id)
    references public.organization_memberships (organization_id, id)
    on delete restrict,
  constraint engagement_team_members_role_context_fk
    foreign key (organization_id, engagement_role_id)
    references public.engagement_roles (organization_id, id)
    on delete restrict,
  constraint engagement_team_members_dates_valid
    check (active_to is null or active_to >= active_from),
  constraint engagement_team_members_status_valid
    check (btrim(status) <> '')
);

create table public.engagement_periods (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  engagement_id uuid not null,
  label text not null,
  start_date date not null,
  end_date date,
  status text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint engagement_periods_organization_id_id_unique
    unique (organization_id, id),
  constraint engagement_periods_engagement_context_fk
    foreign key (organization_id, engagement_id)
    references public.audit_engagements (organization_id, id)
    on delete restrict,
  constraint engagement_periods_label_valid
    check (btrim(label) <> '' and char_length(label) <= 160),
  constraint engagement_periods_dates_valid
    check (end_date is null or end_date >= start_date),
  constraint engagement_periods_status_valid
    check (btrim(status) <> '')
);

create index engagement_roles_organization_status_idx
  on public.engagement_roles (organization_id, status);
create index engagement_team_members_engagement_status_idx
  on public.engagement_team_members (organization_id, engagement_id, status);
create index engagement_team_members_membership_idx
  on public.engagement_team_members (organization_id, membership_id);
create index engagement_team_members_role_idx
  on public.engagement_team_members (organization_id, engagement_role_id);
create index engagement_periods_engagement_dates_idx
  on public.engagement_periods (organization_id, engagement_id, start_date, end_date);

alter table public.engagement_roles enable row level security;
alter table public.engagement_team_members enable row level security;
alter table public.engagement_periods enable row level security;

revoke all on table public.engagement_roles from anon, authenticated;
revoke all on table public.engagement_team_members from anon, authenticated;
revoke all on table public.engagement_periods from anon, authenticated;

grant select on table public.engagement_roles to authenticated;
grant select on table public.engagement_team_members to authenticated;
grant select on table public.engagement_periods to authenticated;

create policy "engagement_roles_select_authorized"
  on public.engagement_roles for select to authenticated
  using (private.has_acl_permission('engagements.view', organization_id));

create policy "engagement_team_members_select_authorized"
  on public.engagement_team_members for select to authenticated
  using (private.has_acl_permission('engagements.view', organization_id));

create policy "engagement_periods_select_authorized"
  on public.engagement_periods for select to authenticated
  using (private.has_acl_permission('engagements.view', organization_id));

comment on table public.engagement_roles is
  'EQP-001 Camada 3: catálogo organizacional consultado em modo somente leitura.';
comment on table public.engagement_team_members is
  'EQP-001 Camada 3: vínculos de equipe consultados em modo somente leitura.';
comment on table public.engagement_periods is
  'EQP-001 Camada 3: períodos consultados em modo somente leitura.';
