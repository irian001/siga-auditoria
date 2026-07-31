create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  legal_name text not null,
  display_name text not null,
  tax_id text,
  status text not null default 'active',
  locale text not null default 'pt-BR',
  timezone text not null default 'America/Sao_Paulo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  inactivated_at timestamptz,
  constraint organizations_legal_name_not_blank check (btrim(legal_name) <> ''),
  constraint organizations_display_name_not_blank check (btrim(display_name) <> ''),
  constraint organizations_tax_id_format check (tax_id is null or tax_id ~ '^[0-9]{14}$'),
  constraint organizations_status_valid check (status in ('active', 'inactive')),
  constraint organizations_status_dates_consistent check (
    (status = 'active' and inactivated_at is null)
    or (status = 'inactive' and inactivated_at is not null)
  )
);

create unique index organizations_tax_id_unique
  on public.organizations (tax_id)
  where tax_id is not null;

create index organizations_status_idx on public.organizations (status);

alter table public.organizations enable row level security;

-- A liberação da API depende da futura autenticação e associação usuário-organização.
-- RLS sem políticas mantém bloqueio por padrão; os grants também são revogados explicitamente.
revoke all on table public.organizations from anon, authenticated;

comment on table public.organizations is
  'Organizações usuárias do SIGA; raiz do isolamento multiempresa.';
