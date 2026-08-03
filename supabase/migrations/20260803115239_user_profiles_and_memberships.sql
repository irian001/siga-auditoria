create table public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_subject uuid not null references auth.users(id) on delete restrict,
  display_name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  inactivated_at timestamptz,
  constraint user_profiles_auth_subject_unique unique (auth_subject),
  constraint user_profiles_display_name_not_blank check (btrim(display_name) <> ''),
  constraint user_profiles_status_valid check (status in ('active', 'inactive')),
  constraint user_profiles_status_dates_consistent check (
    (status = 'active' and inactivated_at is null)
    or (status = 'inactive' and inactivated_at is not null)
  )
);

create table public.organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  user_profile_id uuid not null references public.user_profiles(id) on delete restrict,
  status text not null default 'pending',
  active_from timestamptz,
  active_to timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint organization_memberships_status_valid
    check (status in ('pending', 'active', 'inactive', 'revoked')),
  constraint organization_memberships_active_dates_valid check (
    (status = 'active' and active_from is not null)
    or status <> 'active'
  ),
  constraint organization_memberships_date_order_valid check (
    active_to is null or (active_from is not null and active_to > active_from)
  )
);

create index user_profiles_auth_subject_idx on public.user_profiles (auth_subject);
create index organization_memberships_profile_idx
  on public.organization_memberships (user_profile_id, status);
create index organization_memberships_organization_idx
  on public.organization_memberships (organization_id, status);
create unique index organization_memberships_one_active_idx
  on public.organization_memberships (organization_id, user_profile_id)
  where status = 'active';

alter table public.user_profiles enable row level security;
alter table public.organization_memberships enable row level security;

revoke all on table public.user_profiles from anon, authenticated;
revoke all on table public.organization_memberships from anon, authenticated;
grant select on table public.user_profiles to authenticated;
grant select on table public.organization_memberships to authenticated;
grant select on table public.organizations to authenticated;

create policy "user_profiles_select_own"
  on public.user_profiles for select to authenticated
  using ((select auth.uid()) = auth_subject);

create policy "organization_memberships_select_own"
  on public.organization_memberships for select to authenticated
  using (
    user_profile_id in (
      select id from public.user_profiles
      where auth_subject = (select auth.uid())
    )
  );

create policy "organizations_select_active_membership"
  on public.organizations for select to authenticated
  using (
    status = 'active'
    and id in (
      select organization_id
      from public.organization_memberships
      where user_profile_id in (
        select id from public.user_profiles
        where auth_subject = (select auth.uid()) and status = 'active'
      )
      and status = 'active'
      and active_from <= now()
      and (active_to is null or active_to > now())
    )
  );

comment on table public.user_profiles is
  'Perfil funcional do usuário, vinculado de forma única à identidade do Supabase Auth.';
comment on table public.organization_memberships is
  'Vínculos históricos entre perfis e organizações usuárias do SIGA.';
