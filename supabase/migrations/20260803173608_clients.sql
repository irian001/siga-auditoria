create function private.is_valid_cpf(value text)
returns boolean
language plpgsql
immutable
strict
security invoker
set search_path = ''
as $$
declare
  first_digit integer := 0;
  second_digit integer := 0;
  index integer;
begin
  if value !~ '^[0-9]{11}$' or value ~ '^([0-9])\1{10}$' then
    return false;
  end if;

  for index in 1..9 loop
    first_digit := first_digit + substr(value, index, 1)::integer * (11 - index);
  end loop;
  first_digit := (first_digit * 10) % 11;
  if first_digit = 10 then first_digit := 0; end if;

  for index in 1..10 loop
    second_digit := second_digit + substr(value, index, 1)::integer * (12 - index);
  end loop;
  second_digit := (second_digit * 10) % 11;
  if second_digit = 10 then second_digit := 0; end if;

  return first_digit = substr(value, 10, 1)::integer
    and second_digit = substr(value, 11, 1)::integer;
end;
$$;

create function private.is_valid_cnpj(value text)
returns boolean
language plpgsql
immutable
strict
security invoker
set search_path = ''
as $$
declare
  weights_first integer[] := array[5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  weights_second integer[] := array[6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  total integer := 0;
  remainder integer;
  first_digit integer;
  second_digit integer;
  index integer;
begin
  if value !~ '^[0-9]{14}$' or value ~ '^([0-9])\1{13}$' then
    return false;
  end if;

  for index in 1..12 loop
    total := total + substr(value, index, 1)::integer * weights_first[index];
  end loop;
  remainder := total % 11;
  first_digit := case when remainder < 2 then 0 else 11 - remainder end;

  total := 0;
  for index in 1..13 loop
    total := total + substr(value, index, 1)::integer * weights_second[index];
  end loop;
  remainder := total % 11;
  second_digit := case when remainder < 2 then 0 else 11 - remainder end;

  return first_digit = substr(value, 13, 1)::integer
    and second_digit = substr(value, 14, 1)::integer;
end;
$$;

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  display_name text not null,
  legal_name text not null,
  tax_identifier_type text not null,
  tax_identifier text,
  classification text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  created_by uuid not null references public.user_profiles(id) on delete restrict,
  updated_at timestamptz not null default now(),
  updated_by uuid not null references public.user_profiles(id) on delete restrict,
  inactivated_at timestamptz,
  inactivated_by uuid references public.user_profiles(id) on delete restrict,
  constraint clients_display_name_not_blank check (btrim(display_name) <> ''),
  constraint clients_legal_name_not_blank check (btrim(legal_name) <> ''),
  constraint clients_tax_identifier_type_valid
    check (tax_identifier_type in ('cnpj', 'cpf', 'foreign', 'other')),
  constraint clients_tax_identifier_valid check (
    (tax_identifier_type = 'cnpj' and private.is_valid_cnpj(tax_identifier))
    or (tax_identifier_type = 'cpf' and private.is_valid_cpf(tax_identifier))
    or (tax_identifier_type in ('foreign', 'other') and (
      tax_identifier is null or btrim(tax_identifier) <> ''
    ))
  ),
  constraint clients_classification_valid
    check (classification in ('legal_entity', 'individual', 'other')),
  constraint clients_status_valid check (status in ('active', 'inactive')),
  constraint clients_status_dates_consistent check (
    (status = 'active' and inactivated_at is null and inactivated_by is null)
    or (status = 'inactive' and inactivated_at is not null and inactivated_by is not null)
  )
);

create unique index clients_tax_identifier_unique
  on public.clients (organization_id, tax_identifier_type, tax_identifier)
  where tax_identifier is not null;
create index clients_organization_status_idx
  on public.clients (organization_id, status);
create index clients_organization_display_name_idx
  on public.clients (organization_id, display_name);

insert into public.permissions (ownership_scope, code, name, description)
values
  ('platform', 'clients.view', 'Consultar clientes', 'Permite consultar clientes da própria organização.'),
  ('platform', 'clients.manage', 'Administrar clientes', 'Permite criar, editar, inativar e reativar clientes da própria organização.')
on conflict do nothing;

insert into public.role_permissions (organization_id, role_id, permission_id)
select r.organization_id, r.id, p.id
from public.roles r
cross join public.permissions p
where r.code = 'organization_admin'
  and r.status = 'active'
  and p.code in ('clients.view', 'clients.manage')
  and p.status = 'active'
on conflict do nothing;

create function private.current_user_profile_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select up.id
  from public.user_profiles up
  where up.auth_subject = (select auth.uid())
    and up.status = 'active';
$$;

create function private.has_acl_permission(permission_code text, resource_organization_id uuid)
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
      join public.user_profiles up
        on up.id = om.user_profile_id
      join public.membership_roles mr
        on mr.membership_id = om.id
        and mr.organization_id = om.organization_id
      join public.roles r
        on r.id = mr.role_id
        and r.organization_id = mr.organization_id
      join public.role_permissions rp
        on rp.role_id = r.id
        and rp.organization_id = r.organization_id
      join public.permissions p
        on p.id = rp.permission_id
      where up.auth_subject = (select auth.uid())
        and up.status = 'active'
        and om.organization_id = resource_organization_id
        and om.status = 'active'
        and om.active_from <= now()
        and (om.active_to is null or om.active_to > now())
        and mr.status = 'active'
        and mr.active_from <= now()
        and (mr.active_to is null or mr.active_to > now())
        and r.status = 'active'
        and rp.status = 'active'
        and p.code = permission_code
        and p.status = 'active'
    );
$$;

create function private.set_client_audit_fields()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_profile_id uuid;
begin
  current_profile_id := private.current_user_profile_id();
  if current_profile_id is null then
    raise exception 'Perfil funcional ativo não encontrado.' using errcode = '42501';
  end if;

  if tg_op = 'INSERT' then
    new.created_at := now();
    new.created_by := current_profile_id;
    new.updated_at := now();
    new.updated_by := current_profile_id;
    new.status := 'active';
    new.inactivated_at := null;
    new.inactivated_by := null;
  else
    if new.organization_id <> old.organization_id then
      raise exception 'A organização do cliente não pode ser alterada.' using errcode = '23514';
    end if;
    new.created_at := old.created_at;
    new.created_by := old.created_by;
    new.updated_at := now();
    new.updated_by := current_profile_id;
    if new.status = 'inactive' and old.status <> 'inactive' then
      new.inactivated_at := now();
      new.inactivated_by := current_profile_id;
    elsif new.status = 'active' then
      new.inactivated_at := null;
      new.inactivated_by := null;
    else
      new.inactivated_at := old.inactivated_at;
      new.inactivated_by := old.inactivated_by;
    end if;
  end if;

  return new;
end;
$$;

revoke all on function private.current_user_profile_id() from public;
revoke all on function private.has_acl_permission(text, uuid) from public;
revoke all on function private.set_client_audit_fields() from public;
revoke all on function private.is_valid_cpf(text) from public;
revoke all on function private.is_valid_cnpj(text) from public;
grant execute on function private.current_user_profile_id() to authenticated;
grant execute on function private.has_acl_permission(text, uuid) to authenticated;
grant execute on function private.is_valid_cpf(text) to authenticated;
grant execute on function private.is_valid_cnpj(text) to authenticated;

create trigger clients_set_audit_fields
before insert or update on public.clients
for each row execute function private.set_client_audit_fields();

alter table public.clients enable row level security;

revoke all on table public.clients from anon, authenticated;
grant select, insert, update on table public.clients to authenticated;

create policy "clients_select_own_organization"
  on public.clients for select to authenticated
  using (
    private.has_acl_permission('clients.view', organization_id)
    or private.has_acl_permission('clients.manage', organization_id)
  );

create policy "clients_insert_own_organization"
  on public.clients for insert to authenticated
  with check (
    private.has_acl_permission('clients.manage', organization_id)
    and created_by = private.current_user_profile_id()
    and updated_by = private.current_user_profile_id()
  );

create policy "clients_update_own_organization"
  on public.clients for update to authenticated
  using (private.has_acl_permission('clients.manage', organization_id))
  with check (
    private.has_acl_permission('clients.manage', organization_id)
    and updated_by = private.current_user_profile_id()
  );

comment on table public.clients is
  'Clientes auditados ou atendidos, isolados por organização usuária do SIGA.';
comment on function private.has_acl_permission(text, uuid) is
  'Verifica permissão efetiva e membership ativo para uma organização específica.';
