-- ACE-001 / API RPC controlada para o adaptador Supabase.
-- As funcoes publicas sao apenas fachadas para as funcoes protegidas no schema private.

create or replace function public.create_acceptance_assessment(
  p_client_id uuid,
  p_assessment_type text,
  p_assessment_date date,
  p_reference_period text default null,
  p_pending_summary text default null,
  p_previous_assessment_id uuid default null,
  p_reanalysis_rationale text default null
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.create_acceptance_assessment(
    p_client_id,
    p_assessment_type,
    p_assessment_date,
    p_reference_period,
    p_pending_summary,
    p_previous_assessment_id,
    p_reanalysis_rationale
  );
$$;

create or replace function public.save_acceptance_answers(
  p_assessment_id uuid,
  p_answers jsonb
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.save_acceptance_answers(p_assessment_id, p_answers);
$$;

create or replace function public.submit_acceptance_assessment(p_assessment_id uuid)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.submit_acceptance_assessment(p_assessment_id);
$$;

create or replace function public.return_acceptance_assessment_to_draft(
  p_assessment_id uuid,
  p_reason text
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.return_acceptance_assessment_to_draft(p_assessment_id, p_reason);
$$;

create or replace function public.decide_acceptance_assessment(
  p_assessment_id uuid,
  p_conclusion text,
  p_rationale text
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.decide_acceptance_assessment(
    p_assessment_id,
    p_conclusion,
    p_rationale
  );
$$;

create or replace function public.cancel_acceptance_assessment(
  p_assessment_id uuid,
  p_reason text
)
returns uuid
language sql
security invoker
set search_path = ''
as $$
  select private.cancel_acceptance_assessment(p_assessment_id, p_reason);
$$;

revoke all on function public.create_acceptance_assessment(uuid, text, date, text, text, uuid, text) from public;
revoke all on function public.save_acceptance_answers(uuid, jsonb) from public;
revoke all on function public.submit_acceptance_assessment(uuid) from public;
revoke all on function public.return_acceptance_assessment_to_draft(uuid, text) from public;
revoke all on function public.decide_acceptance_assessment(uuid, text, text) from public;
revoke all on function public.cancel_acceptance_assessment(uuid, text) from public;

grant execute on function public.create_acceptance_assessment(uuid, text, date, text, text, uuid, text) to authenticated;
grant execute on function public.save_acceptance_answers(uuid, jsonb) to authenticated;
grant execute on function public.submit_acceptance_assessment(uuid) to authenticated;
grant execute on function public.return_acceptance_assessment_to_draft(uuid, text) to authenticated;
grant execute on function public.decide_acceptance_assessment(uuid, text, text) to authenticated;
grant execute on function public.cancel_acceptance_assessment(uuid, text) to authenticated;

comment on function public.create_acceptance_assessment(uuid, text, date, text, text, uuid, text) is
  'Fachada RPC autenticada para criação protegida de avaliação ACE-001.';
comment on function public.save_acceptance_answers(uuid, jsonb) is
  'Fachada RPC autenticada para gravação protegida das respostas ACE-001.';
comment on function public.submit_acceptance_assessment(uuid) is
  'Fachada RPC autenticada para envio de avaliação ACE-001.';
comment on function public.return_acceptance_assessment_to_draft(uuid, text) is
  'Fachada RPC autenticada para devolução de avaliação ACE-001.';
comment on function public.decide_acceptance_assessment(uuid, text, text) is
  'Fachada RPC autenticada para decisão de avaliação ACE-001.';
comment on function public.cancel_acceptance_assessment(uuid, text) is
  'Fachada RPC autenticada para cancelamento de rascunho ACE-001.';
