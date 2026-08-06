-- Corrige as ACLs explicitas do PostgREST para as fachadas RPC da ACE-001.
-- Somente usuarios autenticados devem conseguir chamar estas operacoes.

revoke execute on function public.create_acceptance_assessment(uuid, text, date, text, text, uuid, text)
  from anon;
revoke execute on function public.save_acceptance_answers(uuid, jsonb)
  from anon;
revoke execute on function public.submit_acceptance_assessment(uuid)
  from anon;
revoke execute on function public.return_acceptance_assessment_to_draft(uuid, text)
  from anon;
revoke execute on function public.decide_acceptance_assessment(uuid, text, text)
  from anon;
revoke execute on function public.cancel_acceptance_assessment(uuid, text)
  from anon;

grant execute on function public.create_acceptance_assessment(uuid, text, date, text, text, uuid, text)
  to authenticated;
grant execute on function public.save_acceptance_answers(uuid, jsonb)
  to authenticated;
grant execute on function public.submit_acceptance_assessment(uuid)
  to authenticated;
grant execute on function public.return_acceptance_assessment_to_draft(uuid, text)
  to authenticated;
grant execute on function public.decide_acceptance_assessment(uuid, text, text)
  to authenticated;
grant execute on function public.cancel_acceptance_assessment(uuid, text)
  to authenticated;
