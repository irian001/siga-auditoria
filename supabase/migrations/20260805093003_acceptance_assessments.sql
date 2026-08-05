-- ACE-001 / Etapa 7 — projeto físico da aceitação e continuidade.
-- Esta migration é uma proposta local versionada. Não foi aplicada ao Supabase remoto.

-- A FK contextual abaixo exige uma chave única composta, embora clients.id já seja
-- único isoladamente. A coluna organization_id permanece parte da relação para
-- impedir que um objeto de uma organização seja associado a outra.
alter table public.clients
  add constraint clients_organization_id_id_unique unique (organization_id, id);

create table public.acceptance_assessments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null
    references public.organizations(id) on delete restrict,
  client_id uuid not null,
  assessment_type text not null,
  assessment_date date not null,
  reference_period text,
  status text not null default 'draft',
  conclusion text,
  rationale text,
  pending_summary text,
  previous_assessment_id uuid,
  reanalysis_rationale text,
  prepared_by uuid not null
    references public.user_profiles(id) on delete restrict,
  submitted_at timestamptz,
  submitted_by uuid
    references public.user_profiles(id) on delete restrict,
  decided_at timestamptz,
  decided_by uuid
    references public.user_profiles(id) on delete restrict,
  cancelled_at timestamptz,
  cancelled_by uuid
    references public.user_profiles(id) on delete restrict,
  transition_history jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint acceptance_assessments_organization_id_id_unique
    unique (organization_id, id),
  constraint acceptance_assessments_client_context_fk
    foreign key (organization_id, client_id)
    references public.clients (organization_id, id) on delete restrict,
  constraint acceptance_assessments_previous_context_fk
    foreign key (organization_id, previous_assessment_id)
    references public.acceptance_assessments (organization_id, id) on delete restrict,
  constraint acceptance_assessments_type_valid
    check (assessment_type in ('acceptance', 'continuance')),
  constraint acceptance_assessments_status_valid
    check (status in ('draft', 'pending_review', 'approved', 'rejected', 'cancelled')),
  constraint acceptance_assessments_conclusion_valid
    check (conclusion is null or conclusion in ('approved', 'rejected')),
  constraint acceptance_assessments_reference_period_valid
    check (reference_period is null or (
      btrim(reference_period) <> '' and char_length(reference_period) <= 80
    )),
  constraint acceptance_assessments_pending_summary_valid
    check (pending_summary is null or (
      btrim(pending_summary) <> '' and char_length(pending_summary) <= 4000
    )),
  constraint acceptance_assessments_rationale_valid
    check (rationale is null or (
      btrim(rationale) <> '' and char_length(rationale) <= 8000
    )),
  constraint acceptance_assessments_reanalysis_valid
    check (reanalysis_rationale is null or (
      btrim(reanalysis_rationale) <> '' and char_length(reanalysis_rationale) <= 4000
    )),
  constraint acceptance_assessments_type_previous_valid
    check (
      (assessment_type = 'continuance' and previous_assessment_id is not null)
      or assessment_type = 'acceptance'
    ),
  constraint acceptance_assessments_reanalysis_required
    check (
      assessment_type <> 'acceptance'
      or previous_assessment_id is null
      or btrim(coalesce(reanalysis_rationale, '')) <> ''
    ),
  constraint acceptance_assessments_not_self_related
    check (previous_assessment_id is null or previous_assessment_id <> id),
  constraint acceptance_assessments_status_conclusion_consistent
    check (
      (status in ('draft', 'pending_review', 'cancelled') and conclusion is null)
      or (status = 'approved' and conclusion = 'approved')
      or (status = 'rejected' and conclusion = 'rejected')
    ),
  constraint acceptance_assessments_pending_submission_consistent
    check (
      status <> 'pending_review'
      or (submitted_at is not null and submitted_by is not null)
    ),
  constraint acceptance_assessments_decision_consistent
    check (
      status not in ('approved', 'rejected')
      or (
        submitted_at is not null
        and submitted_by is not null
        and decided_at is not null
        and decided_by is not null
        and btrim(coalesce(rationale, '')) <> ''
      )
    ),
  constraint acceptance_assessments_decided_actor_consistent
    check (
      status in ('approved', 'rejected')
      or (decided_at is null and decided_by is null)
    ),
  constraint acceptance_assessments_cancelled_consistent
    check (
      (status = 'cancelled' and cancelled_at is not null and cancelled_by is not null)
      or (status <> 'cancelled' and cancelled_at is null and cancelled_by is null)
    ),
  constraint acceptance_assessments_transition_history_valid
    check (jsonb_typeof(transition_history) = 'array')
);

create table public.acceptance_assessment_answers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null,
  assessment_id uuid not null,
  question_code text not null,
  question_version integer not null,
  question_text_snapshot text not null,
  answer text,
  comment text,
  is_blocking boolean not null default false,
  answered_by uuid
    references public.user_profiles(id) on delete restrict,
  answered_at timestamptz,
  constraint acceptance_answers_assessment_context_fk
    foreign key (organization_id, assessment_id)
    references public.acceptance_assessments (organization_id, id) on delete restrict,
  constraint acceptance_answers_question_code_valid
    check (question_code in (
      'ACE-CLI-001', 'ACE-INT-001', 'ACE-IND-001', 'ACE-CAP-001',
      'ACE-REC-001', 'ACE-ESC-001', 'ACE-INF-001', 'ACE-ANT-001'
    )),
  constraint acceptance_answers_question_version_valid
    check (question_version > 0),
  constraint acceptance_answers_question_snapshot_valid
    check (btrim(question_text_snapshot) <> ''),
  constraint acceptance_answers_value_valid
    check (answer is null or answer in ('yes', 'no', 'not_applicable', 'unknown')),
  constraint acceptance_answers_not_applicable_valid
    check (answer <> 'not_applicable' or question_code = 'ACE-ANT-001'),
  constraint acceptance_answers_answered_state_consistent
    check (
      (answer is null and comment is null and is_blocking = false
        and answered_by is null and answered_at is null)
      or (answer is not null and answered_by is not null and answered_at is not null)
    ),
  constraint acceptance_answers_comment_required
    check (
      comment is null
      or char_length(comment) <= 4000
    ),
  constraint acceptance_answers_comment_required_for_value
    check (
      answer not in ('no', 'unknown', 'not_applicable')
      or btrim(coalesce(comment, '')) <> ''
    ),
  constraint acceptance_answers_blocking_consistent
    check (is_blocking = coalesce(answer in ('no', 'unknown'), false)),
  constraint acceptance_answers_unique_question_version
    unique (organization_id, assessment_id, question_code, question_version)
);

create unique index acceptance_assessments_one_open_per_client_idx
  on public.acceptance_assessments (organization_id, client_id)
  where status in ('draft', 'pending_review');

create index acceptance_assessments_client_date_idx
  on public.acceptance_assessments (organization_id, client_id, assessment_date desc);

create index acceptance_assessments_status_date_idx
  on public.acceptance_assessments (organization_id, status, assessment_date desc);

create index acceptance_assessments_previous_idx
  on public.acceptance_assessments (organization_id, previous_assessment_id);

create index acceptance_answers_assessment_idx
  on public.acceptance_assessment_answers (organization_id, assessment_id, question_code);

insert into public.permissions (ownership_scope, code, name, description)
values
  ('platform', 'acceptance.view', 'Consultar aceitações',
    'Permite consultar avaliações de aceitação e continuidade da própria organização.'),
  ('platform', 'acceptance.prepare', 'Preparar aceitações',
    'Permite criar, responder, editar e enviar avaliações da própria organização.'),
  ('platform', 'acceptance.decide', 'Decidir aceitações',
    'Permite devolver, aprovar ou rejeitar avaliações da própria organização.')
on conflict do nothing;

insert into public.role_permissions (organization_id, role_id, permission_id)
select r.organization_id, r.id, p.id
from public.roles r
cross join public.permissions p
where r.code = 'organization_admin'
  and r.status = 'active'
  and p.code in ('acceptance.view', 'acceptance.prepare', 'acceptance.decide')
  and p.status = 'active'
on conflict do nothing;

-- A tabela permanece protegida mesmo antes da integração do repositório real.
-- As operações de escrita serão expostas apenas por funções privadas com
-- SECURITY DEFINER, validação de sessão e autorização contextual.
alter table public.acceptance_assessments enable row level security;
alter table public.acceptance_assessment_answers enable row level security;

revoke all on table public.acceptance_assessments from anon, authenticated;
revoke all on table public.acceptance_assessment_answers from anon, authenticated;
grant select on table public.acceptance_assessments to authenticated;
grant select on table public.acceptance_assessment_answers to authenticated;

revoke delete on table public.acceptance_assessments from anon, authenticated;
revoke delete on table public.acceptance_assessment_answers from anon, authenticated;

create policy "acceptance_assessments_select_authorized"
  on public.acceptance_assessments for select to authenticated
  using (
    private.has_acl_permission('acceptance.view', organization_id)
    or private.has_acl_permission('acceptance.prepare', organization_id)
    or private.has_acl_permission('acceptance.decide', organization_id)
  );

create policy "acceptance_answers_select_authorized"
  on public.acceptance_assessment_answers for select to authenticated
  using (
    exists (
      select 1
      from public.acceptance_assessments a
      where a.id = public.acceptance_assessment_answers.assessment_id
        and a.organization_id = public.acceptance_assessment_answers.organization_id
        and (
          private.has_acl_permission('acceptance.view', a.organization_id)
          or private.has_acl_permission('acceptance.prepare', a.organization_id)
          or private.has_acl_permission('acceptance.decide', a.organization_id)
        )
    )
  );

create or replace function private.acceptance_assessment_is_complete(p_assessment_id uuid)
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select
    count(*) = 8
    and count(*) filter (where answer is not null) = 8
    and count(*) filter (
      where answer in ('no', 'unknown', 'not_applicable')
        and btrim(coalesce(comment, '')) = ''
    ) = 0
  from public.acceptance_assessment_answers
  where assessment_id = p_assessment_id;
$$;

create or replace function private.acceptance_append_transition(
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

create or replace function private.create_acceptance_assessment(
  p_client_id uuid,
  p_assessment_type text,
  p_assessment_date date,
  p_reference_period text default null,
  p_pending_summary text default null,
  p_previous_assessment_id uuid default null,
  p_reanalysis_rationale text default null
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
  v_assessment_id uuid := gen_random_uuid();
  v_latest_rejected_id uuid;
  v_now timestamptz := clock_timestamp();
begin
  if (select auth.uid()) is null then
    raise exception 'Sessão não autenticada.' using errcode = '42501';
  end if;

  v_profile_id := private.current_user_profile_id();
  if v_profile_id is null then
    raise exception 'Perfil funcional ativo não encontrado.' using errcode = '42501';
  end if;

  select c.organization_id
    into v_organization_id
    from public.clients c
   where c.id = p_client_id
     and c.status = 'active';

  if v_organization_id is null
     or not private.has_acl_permission('acceptance.prepare', v_organization_id) then
    raise exception 'Cliente não disponível para este contexto.' using errcode = '42501';
  end if;

  if p_assessment_type is null
     or p_assessment_type not in ('acceptance', 'continuance') then
    raise exception 'Tipo de avaliação inválido.' using errcode = '23514';
  end if;

  if exists (
    select 1
      from public.acceptance_assessments a
     where a.organization_id = v_organization_id
       and a.client_id = p_client_id
       and a.status in ('draft', 'pending_review')
  ) then
    raise exception 'Este cliente já possui uma avaliação em andamento.' using errcode = '23505';
  end if;

  if p_assessment_type = 'continuance' then
    if p_previous_assessment_id is null or not exists (
      select 1
        from public.acceptance_assessments a
       where a.id = p_previous_assessment_id
         and a.organization_id = v_organization_id
         and a.client_id = p_client_id
         and a.status = 'approved'
    ) then
      raise exception 'A continuidade exige avaliação anterior aprovada do mesmo cliente.'
        using errcode = '23514';
    end if;
  else
    if exists (
      select 1
        from public.acceptance_assessments a
       where a.organization_id = v_organization_id
         and a.client_id = p_client_id
         and a.status = 'approved'
    ) then
      raise exception 'Este cliente já foi aceito; utilize continuidade.' using errcode = '23505';
    end if;

    select a.id
      into v_latest_rejected_id
      from public.acceptance_assessments a
     where a.organization_id = v_organization_id
       and a.client_id = p_client_id
       and a.status = 'rejected'
     order by a.decided_at desc nulls last, a.updated_at desc, a.id desc
     limit 1;

    if v_latest_rejected_id is not null then
      if p_previous_assessment_id is distinct from v_latest_rejected_id
         or btrim(coalesce(p_reanalysis_rationale, '')) = '' then
        raise exception 'A reanálise deve mencionar e justificar a decisão rejeitada anterior.'
          using errcode = '23514';
      end if;
    elsif p_previous_assessment_id is not null then
      raise exception 'A avaliação anterior informada não é válida para esta aceitação.'
        using errcode = '23514';
    end if;
  end if;

  insert into public.acceptance_assessments (
    id, organization_id, client_id, assessment_type, assessment_date,
    reference_period, status, pending_summary, previous_assessment_id,
    reanalysis_rationale, prepared_by, transition_history, created_at, updated_at
  )
  values (
    v_assessment_id,
    v_organization_id,
    p_client_id,
    p_assessment_type,
    p_assessment_date,
    nullif(btrim(p_reference_period), ''),
    'draft',
    nullif(btrim(p_pending_summary), ''),
    p_previous_assessment_id,
    nullif(btrim(p_reanalysis_rationale), ''),
    v_profile_id,
    jsonb_build_array(
      jsonb_build_object(
        'id', gen_random_uuid()::text,
        'fromStatus', null,
        'toStatus', 'draft',
        'reason', null,
        'performedBy', v_profile_id::text,
        'performedAt', v_now
      )
    ),
    v_now,
    v_now
  );

  insert into public.acceptance_assessment_answers (
    organization_id, assessment_id, question_code, question_version,
    question_text_snapshot, answer, comment, is_blocking, answered_by, answered_at
  )
  values
    (v_organization_id, v_assessment_id, 'ACE-CLI-001', 1,
      'As informações cadastrais essenciais do cliente foram verificadas e são suficientes para esta decisão?',
      null, null, false, null, null),
    (v_organization_id, v_assessment_id, 'ACE-INT-001', 1,
      'Não foram identificadas informações conhecidas que impeçam o relacionamento com a administração ou os responsáveis pelo cliente?',
      null, null, false, null, null),
    (v_organization_id, v_assessment_id, 'ACE-IND-001', 1,
      'Não existe conflito, ameaça ou impedimento conhecido que inviabilize a aceitação ou continuidade?',
      null, null, false, null, null),
    (v_organization_id, v_assessment_id, 'ACE-CAP-001', 1,
      'A organização possui ou poderá obter competência técnica compatível com o serviço pretendido?',
      null, null, false, null, null),
    (v_organization_id, v_assessment_id, 'ACE-REC-001', 1,
      'Existem condições preliminares de tempo e recursos para realizar o trabalho com qualidade?',
      null, null, false, null, null),
    (v_organization_id, v_assessment_id, 'ACE-ESC-001', 1,
      'O objetivo e o escopo preliminar pretendidos são compreensíveis e compatíveis com a atuação da organização?',
      null, null, false, null, null),
    (v_organization_id, v_assessment_id, 'ACE-INF-001', 1,
      'Não existe limitação conhecida ao acesso às informações necessárias para avaliar ou realizar o trabalho?',
      null, null, false, null, null),
    (v_organization_id, v_assessment_id, 'ACE-ANT-001', 1,
      'Quando aplicável, assuntos relevantes de trabalhos ou avaliações anteriores foram considerados?',
      null, null, false, null, null);

  return v_assessment_id;
end;
$$;

create or replace function private.save_acceptance_answers(
  p_assessment_id uuid,
  p_answers jsonb
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
  v_item jsonb;
  v_question_code text;
  v_answer text;
  v_comment text;
  v_now timestamptz := clock_timestamp();
begin
  if (select auth.uid()) is null then
    raise exception 'Sessão não autenticada.' using errcode = '42501';
  end if;

  v_profile_id := private.current_user_profile_id();
  if v_profile_id is null then
    raise exception 'Perfil funcional ativo não encontrado.' using errcode = '42501';
  end if;

  select a.organization_id, a.status
    into v_organization_id, v_status
    from public.acceptance_assessments a
   where a.id = p_assessment_id
   for update;

  if v_organization_id is null
     or not private.has_acl_permission('acceptance.prepare', v_organization_id) then
    raise exception 'Avaliação não disponível para este contexto.' using errcode = '42501';
  end if;

  if v_status <> 'draft' then
    raise exception 'Somente avaliações em rascunho podem ser alteradas.' using errcode = '23514';
  end if;

  if jsonb_typeof(p_answers) is distinct from 'array'
     or jsonb_array_length(p_answers) = 0 then
    raise exception 'Informe ao menos uma resposta.' using errcode = '22023';
  end if;

  if exists (
    select 1
      from jsonb_array_elements(p_answers) item
     group by item ->> 'questionCode'
    having count(*) > 1
  ) then
    raise exception 'Existe mais de uma resposta para a mesma questão.' using errcode = '23505';
  end if;

  for v_item in select value from jsonb_array_elements(p_answers)
  loop
    v_question_code := v_item ->> 'questionCode';
    v_answer := v_item ->> 'answer';
    v_comment := nullif(btrim(v_item ->> 'comment'), '');

    if v_question_code is null or v_answer is null then
      raise exception 'Questão ou resposta inválida.' using errcode = '22023';
    end if;

    if not exists (
      select 1
        from public.acceptance_assessment_answers a
       where a.assessment_id = p_assessment_id
         and a.organization_id = v_organization_id
         and a.question_code = v_question_code
    ) then
      raise exception 'Questão não pertence à avaliação.' using errcode = '22023';
    end if;

    if v_answer not in ('yes', 'no', 'not_applicable', 'unknown') then
      raise exception 'Resposta inválida.' using errcode = '22023';
    end if;

    if v_answer = 'not_applicable' and v_question_code <> 'ACE-ANT-001' then
      raise exception 'A resposta não se aplica não é permitida para esta questão.'
        using errcode = '23514';
    end if;

    if v_answer in ('no', 'unknown', 'not_applicable') and v_comment is null then
      raise exception 'Informe um comentário para esta resposta.' using errcode = '23514';
    end if;

    update public.acceptance_assessment_answers
       set answer = v_answer,
           comment = v_comment,
           is_blocking = v_answer in ('no', 'unknown'),
           answered_by = v_profile_id,
           answered_at = v_now
     where assessment_id = p_assessment_id
       and organization_id = v_organization_id
       and question_code = v_question_code;
  end loop;

  update public.acceptance_assessments
     set updated_at = v_now
   where id = p_assessment_id
     and organization_id = v_organization_id;

  return p_assessment_id;
end;
$$;

create or replace function private.submit_acceptance_assessment(p_assessment_id uuid)
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
    raise exception 'Sessão não autenticada.' using errcode = '42501';
  end if;

  v_profile_id := private.current_user_profile_id();
  select a.organization_id, a.status
    into v_organization_id, v_status
    from public.acceptance_assessments a
   where a.id = p_assessment_id
   for update;

  if v_organization_id is null
     or not private.has_acl_permission('acceptance.prepare', v_organization_id) then
    raise exception 'Avaliação não disponível para este contexto.' using errcode = '42501';
  end if;

  if v_status <> 'draft' then
    raise exception 'A avaliação não pode ser enviada neste estado.' using errcode = '23514';
  end if;

  if not private.acceptance_assessment_is_complete(p_assessment_id) then
    raise exception 'Responda corretamente todas as questões antes do envio.'
      using errcode = '23514';
  end if;

  update public.acceptance_assessments
     set status = 'pending_review',
         submitted_at = v_now,
         submitted_by = v_profile_id,
         transition_history = private.acceptance_append_transition(
           transition_history, status, 'pending_review', null, v_profile_id, v_now
         ),
         updated_at = v_now
   where id = p_assessment_id
     and organization_id = v_organization_id;

  return p_assessment_id;
end;
$$;

create or replace function private.return_acceptance_assessment_to_draft(
  p_assessment_id uuid,
  p_reason text
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
  if btrim(coalesce(p_reason, '')) = '' then
    raise exception 'Informe o motivo.' using errcode = '22023';
  end if;

  if char_length(p_reason) > 4000 then
    raise exception 'O motivo excede o limite permitido.' using errcode = '22023';
  end if;

  if (select auth.uid()) is null then
    raise exception 'Sessão não autenticada.' using errcode = '42501';
  end if;

  v_profile_id := private.current_user_profile_id();
  select a.organization_id, a.status
    into v_organization_id, v_status
    from public.acceptance_assessments a
   where a.id = p_assessment_id
   for update;

  if v_organization_id is null
     or not private.has_acl_permission('acceptance.decide', v_organization_id) then
    raise exception 'Avaliação não disponível para este contexto.' using errcode = '42501';
  end if;

  if v_status <> 'pending_review' then
    raise exception 'A avaliação não pode retornar para rascunho neste estado.'
      using errcode = '23514';
  end if;

  update public.acceptance_assessments
     set status = 'draft',
         transition_history = private.acceptance_append_transition(
           transition_history, status, 'draft', btrim(p_reason), v_profile_id, v_now
         ),
         updated_at = v_now
   where id = p_assessment_id
     and organization_id = v_organization_id;

  return p_assessment_id;
end;
$$;

create or replace function private.decide_acceptance_assessment(
  p_assessment_id uuid,
  p_conclusion text,
  p_rationale text
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
  if p_conclusion not in ('approved', 'rejected')
     or btrim(coalesce(p_rationale, '')) = '' then
    raise exception 'Conclusão ou justificativa inválida.' using errcode = '22023';
  end if;

  if (select auth.uid()) is null then
    raise exception 'Sessão não autenticada.' using errcode = '42501';
  end if;

  v_profile_id := private.current_user_profile_id();
  select a.organization_id, a.status
    into v_organization_id, v_status
    from public.acceptance_assessments a
   where a.id = p_assessment_id
   for update;

  if v_organization_id is null
     or not private.has_acl_permission('acceptance.decide', v_organization_id) then
    raise exception 'Avaliação não disponível para este contexto.' using errcode = '42501';
  end if;

  if v_status <> 'pending_review' then
    raise exception 'A avaliação não pode ser decidida neste estado.' using errcode = '23514';
  end if;

  if not private.acceptance_assessment_is_complete(p_assessment_id) then
    raise exception 'A avaliação está incompleta.' using errcode = '23514';
  end if;

  if p_conclusion = 'approved'
     and exists (
       select 1
         from public.acceptance_assessment_answers a
        where a.assessment_id = p_assessment_id
          and a.is_blocking
     ) then
    raise exception 'Existem respostas impeditivas que bloqueiam a aprovação.'
      using errcode = '23514';
  end if;

  update public.acceptance_assessments
     set status = p_conclusion,
         conclusion = p_conclusion,
         rationale = btrim(p_rationale),
         decided_at = v_now,
         decided_by = v_profile_id,
         transition_history = private.acceptance_append_transition(
           transition_history, status, p_conclusion, null, v_profile_id, v_now
         ),
         updated_at = v_now
   where id = p_assessment_id
     and organization_id = v_organization_id;

  return p_assessment_id;
end;
$$;

create or replace function private.cancel_acceptance_assessment(
  p_assessment_id uuid,
  p_reason text
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
  if btrim(coalesce(p_reason, '')) = '' then
    raise exception 'Informe o motivo.' using errcode = '22023';
  end if;

  if char_length(p_reason) > 4000 then
    raise exception 'O motivo excede o limite permitido.' using errcode = '22023';
  end if;

  if (select auth.uid()) is null then
    raise exception 'Sessão não autenticada.' using errcode = '42501';
  end if;

  v_profile_id := private.current_user_profile_id();
  select a.organization_id, a.status
    into v_organization_id, v_status
    from public.acceptance_assessments a
   where a.id = p_assessment_id
   for update;

  if v_organization_id is null
     or not private.has_acl_permission('acceptance.prepare', v_organization_id) then
    raise exception 'Avaliação não disponível para este contexto.' using errcode = '42501';
  end if;

  if v_status <> 'draft' then
    raise exception 'Somente rascunhos podem ser cancelados.' using errcode = '23514';
  end if;

  update public.acceptance_assessments
     set status = 'cancelled',
         cancelled_at = v_now,
         cancelled_by = v_profile_id,
         transition_history = private.acceptance_append_transition(
           transition_history, status, 'cancelled', btrim(p_reason), v_profile_id, v_now
         ),
         updated_at = v_now
   where id = p_assessment_id
     and organization_id = v_organization_id;

  return p_assessment_id;
end;
$$;

revoke all on function private.acceptance_assessment_is_complete(uuid) from public;
revoke all on function private.acceptance_append_transition(jsonb, text, text, text, uuid, timestamptz) from public;
revoke all on function private.create_acceptance_assessment(uuid, text, date, text, text, uuid, text) from public;
revoke all on function private.save_acceptance_answers(uuid, jsonb) from public;
revoke all on function private.submit_acceptance_assessment(uuid) from public;
revoke all on function private.return_acceptance_assessment_to_draft(uuid, text) from public;
revoke all on function private.decide_acceptance_assessment(uuid, text, text) from public;
revoke all on function private.cancel_acceptance_assessment(uuid, text) from public;

grant execute on function private.create_acceptance_assessment(uuid, text, date, text, text, uuid, text) to authenticated;
grant execute on function private.save_acceptance_answers(uuid, jsonb) to authenticated;
grant execute on function private.submit_acceptance_assessment(uuid) to authenticated;
grant execute on function private.return_acceptance_assessment_to_draft(uuid, text) to authenticated;
grant execute on function private.decide_acceptance_assessment(uuid, text, text) to authenticated;
grant execute on function private.cancel_acceptance_assessment(uuid, text) to authenticated;

comment on table public.acceptance_assessments is
  'Avaliações de aceitação e continuidade; decisões finais são imutáveis e o histórico de transições é preservado em JSONB.';
comment on table public.acceptance_assessment_answers is
  'Snapshots versionados das oito questões da ACE-001 e suas respostas; o navegador não define texto ou versão da questão.';
comment on column public.acceptance_assessments.transition_history is
  'Histórico append-only atualizado somente pelas funções protegidas da ACE-001.';
