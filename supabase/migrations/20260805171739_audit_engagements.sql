-- TRB-001 / Camada 1 — entidade, ACL, RLS e operaÃ§Ãµes protegidas do trabalho.
-- Esta migration Ã© local nesta etapa. NÃ£o foi aplicada ao Supabase remoto.

create table public.audit_engagements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null
    references public.organizations(id) on delete restrict,
  client_id uuid not null,
  acceptance_assessment_id uuid not null,
  code text not null,
  title text not null,
  scope text not null,
  classification text not null default 'audit',
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  created_by uuid not null references public.user_profiles(id) on delete restrict,
  updated_at timestamptz not null default now(),
  updated_by uuid not null references public.user_profiles(id) on delete restrict,
  closed_at timestamptz,
  closed_by uuid references public.user_profiles(id) on delete restrict,
  cancelled_at timestamptz,
  cancelled_by uuid references public.user_profiles(id) on delete restrict,
  transition_history jsonb not null default '[]'::jsonb,
  constraint audit_engagements_organization_id_id_unique
    unique (organization_id, id),
  constraint audit_engagements_client_context_fk
    foreign key (organization_id, client_id)
    references public.clients (organization_id, id) on delete restrict,
  constraint audit_engagements_acceptance_context_fk
    foreign key (organization_id, acceptance_assessment_id)
    references public.acceptance_assessments (organization_id, id) on delete restrict,
  constraint audit_engagements_code_valid
    check (btrim(code) <> '' and char_length(code) <= 80),
  constraint audit_engagements_title_valid
    check (btrim(title) <> '' and char_length(title) <= 200),
  constraint audit_engagements_scope_valid
    check (btrim(scope) <> '' and char_length(scope) <= 4000),
  constraint audit_engagements_classification_valid
    check (classification in ('audit')),
  constraint audit_engagements_status_valid
    check (status in ('draft', 'active', 'closed', 'cancelled')),
  constraint audit_engagements_closed_consistent
    check (
      (status = 'closed' and closed_at is not null and closed_by is not null)
      or (status <> 'closed' and closed_at is null and closed_by is null)
    ),
  constraint audit_engagements_cancelled_consistent
    check (
      (status = 'cancelled' and cancelled_at is not null and cancelled_by is not null)
      or (status <> 'cancelled' and cancelled_at is null and cancelled_by is null)
    ),
  constraint audit_engagements_transition_history_valid
    check (jsonb_typeof(transition_history) = 'array')
);

create unique index audit_engagements_organization_code_unique
  on public.audit_engagements (organization_id, code);
create index audit_engagements_organization_client_status_idx
  on public.audit_engagements (organization_id, client_id, status);
create index audit_engagements_organization_updated_idx
  on public.audit_engagements (organization_id, updated_at desc);
create index audit_engagements_acceptance_idx
  on public.audit_engagements (organization_id, acceptance_assessment_id);

insert into public.permissions (ownership_scope, code, name, description)
values
  ('platform', 'engagements.view', 'Consultar trabalhos',
    'Permite consultar trabalhos da prÃ³pria organizaÃ§Ã£o.'),
  ('platform', 'engagements.manage', 'Administrar trabalhos',
    'Permite criar e alterar trabalhos permitidos da prÃ³pria organizaÃ§Ã£o.'),
  ('platform', 'engagements.close', 'Encerrar trabalhos',
    'Permite encerrar trabalhos da prÃ³pria organizaÃ§Ã£o.'),
  ('platform', 'engagements.cancel', 'Cancelar trabalhos',
    'Permite cancelar trabalhos da prÃ³pria organizaÃ§Ã£o.')
on conflict do nothing;

insert into public.role_permissions (organization_id, role_id, permission_id)
select r.organization_id, r.id, p.id
from public.roles r
cross join public.permissions p
where r.code = 'organization_admin'
  and r.status = 'active'
  and p.code in ('engagements.view', 'engagements.manage', 'engagements.close', 'engagements.cancel')
  and p.status = 'active'
on conflict do nothing;

create or replace function private.set_audit_engagement_audit_fields()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_profile_id uuid;
begin
  v_profile_id := private.current_user_profile_id();
  if v_profile_id is null then
    raise exception 'Perfil funcional ativo nÃ£o encontrado.' using errcode = '42501';
  end if;

  if tg_op = 'INSERT' then
    new.created_at := now();
    new.created_by := v_profile_id;
    new.updated_at := now();
    new.updated_by := v_profile_id;
    new.status := 'draft';
    new.closed_at := null;
    new.closed_by := null;
    new.cancelled_at := null;
    new.cancelled_by := null;
  else
    if new.organization_id <> old.organization_id
       or new.client_id <> old.client_id
       or new.acceptance_assessment_id <> old.acceptance_assessment_id
       or new.code <> old.code then
      raise exception 'OrganizaÃ§Ã£o, cliente, aceitaÃ§Ã£o e cÃ³digo nÃ£o podem ser alterados.'
        using errcode = '23514';
    end if;
    new.created_at := old.created_at;
    new.created_by := old.created_by;
    new.updated_at := now();
    new.updated_by := v_profile_id;
  end if;

  return new;
end;
$$;

create trigger audit_engagements_set_audit_fields
before insert or update on public.audit_engagements
for each row execute function private.set_audit_engagement_audit_fields();

create or replace function private.audit_engagement_append_transition(
  p_history jsonb,
  p_from_status text,
  p_to_status text,
  p_reason text,
  p_profile_id uuid,
  p_performed_at timestamptz
)
returns jsonb
language sql
volatile
security invoker
set search_path = ''
as $$
  select coalesce(p_history, '[]'::jsonb) || jsonb_build_array(
    jsonb_build_object(
      'id', gen_random_uuid()::text,
      'fromStatus', p_from_status,
      'toStatus', p_to_status,
      'reason', p_reason,
      'performedBy', p_profile_id::text,
      'performedAt', p_performed_at
    )
  );
$$;

create or replace function private.create_audit_engagement(
  p_client_id uuid,
  p_acceptance_assessment_id uuid,
  p_code text,
  p_title text,
  p_scope text,
  p_classification text default 'audit'
)
returns uuid
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_profile_id uuid;
  v_organization_id uuid;
  v_latest_assessment_id uuid;
  v_latest_assessment_status text;
  v_engagement_id uuid := gen_random_uuid();
  v_now timestamptz := clock_timestamp();
begin
  if (select auth.uid()) is null then
    raise exception 'SessÃ£o nÃ£o autenticada.' using errcode = '42501';
  end if;

  v_profile_id := private.current_user_profile_id();
  if v_profile_id is null then
    raise exception 'Perfil funcional ativo nÃ£o encontrado.' using errcode = '42501';
  end if;

  select c.organization_id
    into v_organization_id
    from public.clients c
   where c.id = p_client_id
     and c.status = 'active';

  if v_organization_id is null
     or not private.has_acl_permission('engagements.manage', v_organization_id) then
    raise exception 'Cliente nÃ£o disponÃ­vel para este contexto.' using errcode = '42501';
  end if;

  if p_classification is null or p_classification <> 'audit' then
    raise exception 'ClassificaÃ§Ã£o de trabalho invÃ¡lida.' using errcode = '23514';
  end if;

  if btrim(coalesce(p_code, '')) = '' or char_length(p_code) > 80
     or btrim(coalesce(p_title, '')) = '' or char_length(p_title) > 200
     or btrim(coalesce(p_scope, '')) = '' or char_length(p_scope) > 4000 then
    raise exception 'Os campos obrigatÃ³rios do trabalho sÃ£o invÃ¡lidos.' using errcode = '23514';
  end if;

  if exists (
    select 1
      from public.acceptance_assessments a
     where a.organization_id = v_organization_id
       and a.client_id = p_client_id
       and a.status in ('draft', 'pending_review')
  ) then
    raise exception 'O cliente possui uma avaliaÃ§Ã£o de aceitaÃ§Ã£o ou continuidade aguardando decisÃ£o.'
      using errcode = '23514';
  end if;

  select a.id, a.status
    into v_latest_assessment_id, v_latest_assessment_status
    from public.acceptance_assessments a
   where a.organization_id = v_organization_id
     and a.client_id = p_client_id
     and a.status in ('approved', 'rejected')
   order by a.decided_at desc nulls last, a.updated_at desc, a.id desc
   limit 1;

  if v_latest_assessment_id is null
     or v_latest_assessment_status <> 'approved'
     or p_acceptance_assessment_id is distinct from v_latest_assessment_id then
    raise exception 'O cliente nÃ£o possui uma avaliaÃ§Ã£o aprovada e aplicÃ¡vel para criar o trabalho.'
      using errcode = '23514';
  end if;

  insert into public.audit_engagements (
    id, organization_id, client_id, acceptance_assessment_id,
    code, title, scope, classification, status,
    created_at, created_by, updated_at, updated_by, transition_history
  )
  values (
    v_engagement_id, v_organization_id, p_client_id, p_acceptance_assessment_id,
    btrim(p_code), btrim(p_title), btrim(p_scope), p_classification, 'draft',
    v_now, v_profile_id, v_now, v_profile_id,
    jsonb_build_array(
      jsonb_build_object(
        'id', gen_random_uuid()::text,
        'fromStatus', null,
        'toStatus', 'draft',
        'reason', null,
        'performedBy', v_profile_id::text,
        'performedAt', v_now
      )
    )
  );

  return v_engagement_id;
end;
$$;

create or replace function private.update_audit_engagement(
  p_engagement_id uuid,
  p_title text,
  p_scope text,
  p_classification text default 'audit'
)
returns uuid
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_profile_id uuid;
  v_organization_id uuid;
  v_status text;
  v_now timestamptz := clock_timestamp();
begin
  if (select auth.uid()) is null then
    raise exception 'SessÃ£o nÃ£o autenticada.' using errcode = '42501';
  end if;

  v_profile_id := private.current_user_profile_id();
  if v_profile_id is null then
    raise exception 'Perfil funcional ativo nao encontrado.' using errcode = '42501';
  end if;
  select e.organization_id, e.status
    into v_organization_id, v_status
    from public.audit_engagements e
   where e.id = p_engagement_id
   for update;

  if v_organization_id is null
     or not private.has_acl_permission('engagements.manage', v_organization_id) then
    raise exception 'Trabalho nÃ£o disponÃ­vel para este contexto.' using errcode = '42501';
  end if;

  if v_status not in ('draft', 'active') then
    raise exception 'Trabalhos encerrados ou cancelados nÃ£o podem ser editados.'
      using errcode = '23514';
  end if;

  if p_classification <> 'audit'
     or btrim(coalesce(p_title, '')) = '' or char_length(p_title) > 200
     or btrim(coalesce(p_scope, '')) = '' or char_length(p_scope) > 4000 then
    raise exception 'Os campos editÃ¡veis do trabalho sÃ£o invÃ¡lidos.' using errcode = '23514';
  end if;

  update public.audit_engagements
     set title = btrim(p_title),
         scope = btrim(p_scope),
         classification = p_classification,
         updated_at = v_now,
         updated_by = v_profile_id
   where id = p_engagement_id
     and organization_id = v_organization_id;

  return p_engagement_id;
end;
$$;

create or replace function private.change_audit_engagement_status(
  p_engagement_id uuid,
  p_status text,
  p_reason text default null
)
returns uuid
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  v_profile_id uuid;
  v_organization_id uuid;
  v_current_status text;
  v_now timestamptz := clock_timestamp();
begin
  if (select auth.uid()) is null then
    raise exception 'SessÃ£o nÃ£o autenticada.' using errcode = '42501';
  end if;

  if p_status not in ('active', 'closed', 'cancelled') then
    raise exception 'Estado de destino invÃ¡lido.' using errcode = '23514';
  end if;

  if p_status in ('closed', 'cancelled')
     and (btrim(coalesce(p_reason, '')) = '' or char_length(p_reason) > 4000) then
    raise exception 'Informe a justificativa da mudanÃ§a de estado.' using errcode = '22023';
  end if;

  v_profile_id := private.current_user_profile_id();
  if v_profile_id is null then
    raise exception 'Perfil funcional ativo nao encontrado.' using errcode = '42501';
  end if;
  select e.organization_id, e.status
    into v_organization_id, v_current_status
    from public.audit_engagements e
   where e.id = p_engagement_id
   for update;

  if v_organization_id is null then
    raise exception 'Trabalho nÃ£o disponÃ­vel para este contexto.' using errcode = '42501';
  end if;

  if p_status = 'active' then
    if not private.has_acl_permission('engagements.manage', v_organization_id) then
      raise exception 'VocÃª nÃ£o possui permissÃ£o para ativar trabalhos.' using errcode = '42501';
    end if;
    if v_current_status <> 'draft' then
      raise exception 'Somente trabalhos em elaboraÃ§Ã£o podem ser ativados.' using errcode = '23514';
    end if;
  elsif p_status = 'closed' then
    if not private.has_acl_permission('engagements.close', v_organization_id) then
      raise exception 'VocÃª nÃ£o possui permissÃ£o para encerrar trabalhos.' using errcode = '42501';
    end if;
    if v_current_status <> 'active' then
      raise exception 'Somente trabalhos ativos podem ser encerrados.' using errcode = '23514';
    end if;
  else
    if not private.has_acl_permission('engagements.cancel', v_organization_id) then
      raise exception 'VocÃª nÃ£o possui permissÃ£o para cancelar trabalhos.' using errcode = '42501';
    end if;
    if v_current_status not in ('draft', 'active') then
      raise exception 'Somente trabalhos em elaboraÃ§Ã£o ou ativos podem ser cancelados.'
        using errcode = '23514';
    end if;
  end if;

  update public.audit_engagements
     set status = p_status,
         closed_at = case when p_status = 'closed' then v_now else null end,
         closed_by = case when p_status = 'closed' then v_profile_id else null end,
         cancelled_at = case when p_status = 'cancelled' then v_now else null end,
         cancelled_by = case when p_status = 'cancelled' then v_profile_id else null end,
         transition_history = private.audit_engagement_append_transition(
           transition_history, v_current_status, p_status, nullif(btrim(p_reason), ''),
           v_profile_id, v_now
         ),
         updated_at = v_now,
         updated_by = v_profile_id
   where id = p_engagement_id
     and organization_id = v_organization_id;

  return p_engagement_id;
end;
$$;

revoke all on function private.set_audit_engagement_audit_fields() from public;
revoke all on function private.audit_engagement_append_transition(jsonb, text, text, text, uuid, timestamptz) from public;
revoke all on function private.create_audit_engagement(uuid, uuid, text, text, text, text) from public;
revoke all on function private.update_audit_engagement(uuid, text, text, text) from public;
revoke all on function private.change_audit_engagement_status(uuid, text, text) from public;
grant execute on function private.create_audit_engagement(uuid, uuid, text, text, text, text) to authenticated;
grant execute on function private.update_audit_engagement(uuid, text, text, text) to authenticated;
grant execute on function private.change_audit_engagement_status(uuid, text, text) to authenticated;

alter table public.audit_engagements enable row level security;
revoke all on table public.audit_engagements from anon, authenticated;
grant select on table public.audit_engagements to authenticated;

create policy "audit_engagements_select_authorized"
  on public.audit_engagements for select to authenticated
  using (
    private.has_acl_permission('engagements.view', organization_id)
    or private.has_acl_permission('engagements.manage', organization_id)
  );

create or replace function public.create_audit_engagement(
  p_client_id uuid,
  p_acceptance_assessment_id uuid,
  p_code text,
  p_title text,
  p_scope text,
  p_classification text default 'audit'
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.create_audit_engagement(
    p_client_id, p_acceptance_assessment_id, p_code, p_title, p_scope, p_classification
  );
$$;

create or replace function public.update_audit_engagement(
  p_engagement_id uuid,
  p_title text,
  p_scope text,
  p_classification text default 'audit'
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.update_audit_engagement(
    p_engagement_id, p_title, p_scope, p_classification
  );
$$;

create or replace function public.change_audit_engagement_status(
  p_engagement_id uuid,
  p_status text,
  p_reason text default null
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.change_audit_engagement_status(p_engagement_id, p_status, p_reason);
$$;

revoke all on function public.create_audit_engagement(uuid, uuid, text, text, text, text) from public, anon;
revoke all on function public.update_audit_engagement(uuid, text, text, text) from public, anon;
revoke all on function public.change_audit_engagement_status(uuid, text, text) from public, anon;
grant execute on function public.create_audit_engagement(uuid, uuid, text, text, text, text) to authenticated;
grant execute on function public.update_audit_engagement(uuid, text, text, text) to authenticated;
grant execute on function public.change_audit_engagement_status(uuid, text, text) to authenticated;

comment on table public.audit_engagements is
  'Trabalhos de auditoria vinculados a cliente ativo e Ã  avaliaÃ§Ã£o ACE aprovada que fundamentou sua criaÃ§Ã£o.';
comment on column public.audit_engagements.acceptance_assessment_id is
  'AvaliaÃ§Ã£o aprovada e aplicÃ¡vel preservada como fundamento imutÃ¡vel da criaÃ§Ã£o do trabalho.';
