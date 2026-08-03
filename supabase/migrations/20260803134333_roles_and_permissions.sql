create schema if not exists private;
revoke all on schema private from public;

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  code text not null,
  name text not null,
  description text,
  status text not null default 'active',
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  inactivated_at timestamptz,
  constraint roles_code_not_blank check (btrim(code) <> ''),
  constraint roles_name_not_blank check (btrim(name) <> ''),
  constraint roles_status_valid check (status in ('active', 'inactive')),
  constraint roles_status_dates_consistent check (
    (status = 'active' and inactivated_at is null)
    or (status = 'inactive' and inactivated_at is not null)
  ),
  constraint roles_organization_id_id_unique unique (organization_id, id),
  constraint roles_organization_code_unique unique (organization_id, code)
);

create table public.permissions (
  id uuid primary key default gen_random_uuid(),
  ownership_scope text not null default 'platform',
  organization_id uuid references public.organizations(id) on delete restrict,
  code text not null,
  name text not null,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  inactivated_at timestamptz,
  constraint permissions_code_not_blank check (btrim(code) <> ''),
  constraint permissions_name_not_blank check (btrim(name) <> ''),
  constraint permissions_scope_valid check (ownership_scope in ('platform', 'organization')),
  constraint permissions_scope_organization_consistent check (
    (ownership_scope = 'platform' and organization_id is null)
    or (ownership_scope = 'organization' and organization_id is not null)
  ),
  constraint permissions_status_valid check (status in ('active', 'inactive')),
  constraint permissions_status_dates_consistent check (
    (status = 'active' and inactivated_at is null)
    or (status = 'inactive' and inactivated_at is not null)
  )
);

create unique index permissions_platform_code_unique
  on public.permissions (code)
  where ownership_scope = 'platform';
create unique index permissions_organization_code_unique
  on public.permissions (organization_id, code)
  where ownership_scope = 'organization';

create table public.role_permissions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  role_id uuid not null,
  permission_id uuid not null references public.permissions(id) on delete restrict,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  inactivated_at timestamptz,
  constraint role_permissions_role_organization_fk
    foreign key (organization_id, role_id)
    references public.roles (organization_id, id) on delete restrict,
  constraint role_permissions_status_valid check (status in ('active', 'inactive')),
  constraint role_permissions_status_dates_consistent check (
    (status = 'active' and inactivated_at is null)
    or (status = 'inactive' and inactivated_at is not null)
  ),
  constraint role_permissions_unique unique (organization_id, role_id, permission_id)
);

alter table public.organization_memberships
  add constraint organization_memberships_organization_id_id_unique
  unique (organization_id, id);

create table public.membership_roles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  membership_id uuid not null,
  role_id uuid not null,
  status text not null default 'active',
  active_from timestamptz not null default now(),
  active_to timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  revoked_at timestamptz,
  constraint membership_roles_membership_organization_fk
    foreign key (organization_id, membership_id)
    references public.organization_memberships (organization_id, id) on delete restrict,
  constraint membership_roles_role_organization_fk
    foreign key (organization_id, role_id)
    references public.roles (organization_id, id) on delete restrict,
  constraint membership_roles_status_valid check (status in ('active', 'inactive', 'revoked')),
  constraint membership_roles_date_order_valid check (
    active_to is null or active_to > active_from
  ),
  constraint membership_roles_revocation_consistent check (
    (status = 'revoked' and revoked_at is not null)
    or (status <> 'revoked' and revoked_at is null)
  )
);

create unique index membership_roles_one_active_idx
  on public.membership_roles (organization_id, membership_id, role_id)
  where status = 'active' and active_to is null;
create index roles_organization_status_idx on public.roles (organization_id, status);
create index permissions_scope_status_idx
  on public.permissions (ownership_scope, organization_id, status);
create index role_permissions_role_idx
  on public.role_permissions (organization_id, role_id, status);
create index role_permissions_permission_idx on public.role_permissions (permission_id, status);
create index membership_roles_membership_idx
  on public.membership_roles (organization_id, membership_id, status);
create index membership_roles_role_idx on public.membership_roles (role_id, status);

create function private.validate_role_permission_ownership()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  permission_scope text;
  permission_organization_id uuid;
begin
  select ownership_scope, organization_id
    into permission_scope, permission_organization_id
    from public.permissions
    where id = new.permission_id;

  if permission_scope = 'organization' and permission_organization_id <> new.organization_id then
    raise exception 'Permission and role must belong to the same organization.';
  end if;

  return new;
end;
$$;

create trigger role_permissions_validate_ownership
before insert or update on public.role_permissions
for each row execute function private.validate_role_permission_ownership();

revoke all on function private.validate_role_permission_ownership() from public;

insert into public.permissions (ownership_scope, code, name, description)
values
  ('platform', 'app.access', 'Acessar o SIGA', 'Permite entrada na área interna do SIGA.'),
  ('platform', 'organization.view', 'Consultar organização', 'Permite consultar a própria organização.'),
  ('platform', 'users.view', 'Consultar usuários', 'Permite consultar usuários e vínculos da própria organização.'),
  ('platform', 'users.manage', 'Administrar usuários', 'Permite administrar usuários e vínculos autorizados.'),
  ('platform', 'roles.view', 'Consultar papéis', 'Permite consultar papéis e permissões aplicáveis.'),
  ('platform', 'roles.manage', 'Administrar papéis', 'Permite administrar papéis, permissões e concessões autorizadas.')
on conflict do nothing;

create function private.current_acl_membership_ids()
returns setof uuid
language sql
stable
security definer
set search_path = ''
as $$
  select om.id
  from public.organization_memberships om
  join public.user_profiles up on up.id = om.user_profile_id
  join public.organizations o on o.id = om.organization_id
  where up.auth_subject = (select auth.uid())
    and up.status = 'active'
    and om.status = 'active'
    and om.active_from <= now()
    and (om.active_to is null or om.active_to > now())
    and o.status = 'active';
$$;

create function private.current_acl_role_ids()
returns setof uuid
language sql
stable
security definer
set search_path = ''
as $$
  select distinct mr.role_id
  from public.membership_roles mr
  join public.roles r on r.id = mr.role_id and r.organization_id = mr.organization_id
  where mr.membership_id in (select private.current_acl_membership_ids())
    and mr.status = 'active'
    and mr.active_from <= now()
    and (mr.active_to is null or mr.active_to > now())
    and r.status = 'active';
$$;

create function private.current_acl_permission_ids()
returns setof uuid
language sql
stable
security definer
set search_path = ''
as $$
  select distinct rp.permission_id
  from public.role_permissions rp
  join public.permissions p on p.id = rp.permission_id
  where rp.role_id in (select private.current_acl_role_ids())
    and rp.status = 'active'
    and p.status = 'active';
$$;

revoke all on function private.current_acl_membership_ids() from public;
revoke all on function private.current_acl_role_ids() from public;
revoke all on function private.current_acl_permission_ids() from public;
grant usage on schema private to authenticated;
grant execute on function private.current_acl_membership_ids() to authenticated;
grant execute on function private.current_acl_role_ids() to authenticated;
grant execute on function private.current_acl_permission_ids() to authenticated;

alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.membership_roles enable row level security;

revoke all on table public.roles from anon, authenticated;
revoke all on table public.permissions from anon, authenticated;
revoke all on table public.role_permissions from anon, authenticated;
revoke all on table public.membership_roles from anon, authenticated;
grant select on table public.roles to authenticated;
grant select on table public.permissions to authenticated;
grant select on table public.role_permissions to authenticated;
grant select on table public.membership_roles to authenticated;

create policy "membership_roles_select_own"
  on public.membership_roles for select to authenticated
  using (
    membership_id in (select private.current_acl_membership_ids())
    and status = 'active'
    and active_from <= now()
    and (active_to is null or active_to > now())
  );

create policy "roles_select_effective"
  on public.roles for select to authenticated
  using (id in (select private.current_acl_role_ids()) and status = 'active');

create policy "role_permissions_select_effective"
  on public.role_permissions for select to authenticated
  using (role_id in (select private.current_acl_role_ids()) and status = 'active');

create policy "permissions_select_effective"
  on public.permissions for select to authenticated
  using (id in (select private.current_acl_permission_ids()) and status = 'active');

comment on table public.roles is 'Papéis organizacionais gerais; não representam funções em trabalhos de auditoria.';
comment on table public.permissions is 'Permissões atômicas estáveis utilizadas nas decisões de autorização.';
comment on table public.role_permissions is 'Associações entre papéis organizacionais e permissões.';
comment on table public.membership_roles is 'Concessões históricas de papéis a memberships organizacionais.';
