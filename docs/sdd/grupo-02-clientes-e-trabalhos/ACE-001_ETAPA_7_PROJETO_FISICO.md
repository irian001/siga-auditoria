---
id: SIGA-ACE-ETP7-001
title: ACE-001 — Etapa 7 — Projeto físico do banco
type: implementation-record
domain: acceptance-continuance
status: aplicado-e-verificado
version: 1.0
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
related:
  - "[[SDD-ACE-001 — Aceitação e Continuidade Simplificada]]"
  - "[[Plano de Implantação da ACE-001]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]]"
  - "[[Qualidade, Testes e Validação do SIGA]]"
  - "[[AGENTS.md]]"
tags:
  - siga
  - ace-001
  - supabase
  - migration
  - projeto-fisico
  - rls
---

# ACE-001 — Etapa 7 — Projeto físico do banco

## 1. Objetivo

Registrar o projeto físico da [[SDD-ACE-001 — Aceitação e Continuidade Simplificada]] e seu resultado de aplicação controlada no Supabase remoto.

## 2. Arquivo da migration

```text
supabase/migrations/20260805093003_acceptance_assessments.sql
```

O arquivo foi criado pelo comando oficial `supabase migration new` e preenchido somente nesta branch:

```text
feat/ace-001-etapa-7-projeto-fisico
```

## 3. Estruturas propostas

### `public.acceptance_assessments`

Contém:

- organização e cliente;
- tipo, data e período de referência;
- estado, conclusão e justificativas;
- relação com avaliação anterior;
- responsáveis e momentos de preparação, envio, decisão e cancelamento;
- histórico de transições em `transition_history`;
- timestamps de criação e atualização.

### `public.acceptance_assessment_answers`

Contém:

- organização e avaliação proprietária;
- código e versão da questão;
- texto congelado da questão;
- resposta, comentário e indicador de impedimento;
- perfil e momento da resposta.

## 4. Regras físicas incorporadas

- `organization_id` e `client_id` possuem relação contextual;
- avaliação anterior deve pertencer à mesma organização e ao mesmo cliente;
- cliente usado na criação deve estar ativo, regra revalidada pela função protegida;
- tipos, estados, conclusões e respostas possuem checks;
- continuidade exige avaliação anterior aprovada;
- reanálise após rejeição exige relação e justificativa;
- existe no máximo uma avaliação em `draft` ou `pending_review` por cliente e organização;
- respostas `no`, `unknown` e `not_applicable` exigem comentário;
- `not_applicable` é permitido somente para `ACE-ANT-001`;
- snapshots canônicos não são recebidos do navegador;
- exclusão física não é concedida aos papéis `anon` e `authenticated`;
- tabelas possuem RLS habilitado;
- leitura exige permissão contextual;
- escrita direta nas tabelas não é concedida à aplicação;
- transições sensíveis utilizam funções privadas protegidas por sessão e ACL.

## 5. Permissões adicionadas

A migration propõe, de forma idempotente:

```text
acceptance.view
acceptance.prepare
acceptance.decide
```

As três permissões são atribuídas ao papel organizacional `organization_admin` quando esse papel existir na organização. Permissões anteriores não são removidas.

## 6. Funções protegidas propostas

As funções ficam no schema privado e não são expostas como tabelas ou funções públicas do Data API:

```text
private.create_acceptance_assessment
private.save_acceptance_answers
private.submit_acceptance_assessment
private.return_acceptance_assessment_to_draft
private.decide_acceptance_assessment
private.cancel_acceptance_assessment
```

Cada função deriva o perfil da sessão, identifica a organização a partir do cliente ou avaliação, verifica membership e permissão e valida a transição antes de escrever.

O uso de `SECURITY DEFINER` é restrito a essas operações de escrita porque a aplicação não recebe `INSERT`, `UPDATE` ou `DELETE` direto nas tabelas. As funções ficam em schema não exposto, fixam `search_path` vazio e verificam `auth.uid()` e ACL antes de atuar.

## 7. Decisões físicas que exigem revisão humana

### 7.1 Questões pré-criadas em rascunho

A criação protegida insere as oito questões com snapshots canônicos, mas deixa `answer`, `answered_by` e `answered_at` nulos até a resposta. Assim, a tabela filha representa simultaneamente a questão aplicada e seu estado ainda não respondido.

Na versão vigente do questionário do MVP, a gravação protegida atualiza explicitamente apenas `question_version = 1`. Uma futura versão do questionário deverá ser acompanhada por migration e ajuste explícito do contrato de gravação.

Essa decisão preserva a exigência de snapshot sem transformar uma avaliação nova em avaliação respondida. Deve ser confirmada antes da aplicação remota.

### 7.2 Histórico de transições

O domínio aprovado possui `transitions[]`. Para manter a SDD limitada às duas tabelas previstas, o histórico foi materializado em `acceptance_assessments.transition_history` como JSONB append-only, atualizado somente pelas funções protegidas.

Essa escolha evita criar uma terceira tabela nesta SDD, mas deverá ser avaliada quanto à futura consulta, auditoria e migração para uma trilha de eventos comum.

### 7.3 Chave contextual de `clients`

A migration acrescenta a restrição única composta `(organization_id, id)` em `public.clients`. Ela é logicamente redundante com a chave primária `id`, mas permite que as FKs compostas expressem no banco que cliente e avaliação pertencem à mesma organização.

## 8. Verificações realizadas

- migrations existentes foram inspecionadas;
- nenhuma migration anterior foi alterada;
- branch própria foi criada a partir da `main` atual;
- migration foi gerada pelo Supabase CLI;
- tabelas, FKs, checks, índices, RLS, grants, revokes e funções foram revisados estaticamente;
- a migration foi aplicada no projeto Supabase remoto e verificada após a aplicação;
- não houve alteração no Lovable, na autenticação, nas dependências ou no código visual.

## 9. Limitações atuais

O repositório ainda não possui `supabase/config.toml`, banco local ou ambiente Docker Supabase configurado. Portanto, nesta etapa não foi possível executar `db reset`, aplicar a migration localmente, executar consultas de teste ou rodar advisors contra um banco local.

As estruturas propostas foram aplicadas no projeto `umuassmgminmliuypoyp` após autorização humana específica. A versão registrada remotamente possui timestamp próprio, diferente do nome local da migration.

## 10. Próximo passo oficial

Concluir a integração do adapter Supabase, validar a interface autenticada e preparar o PR técnico. A homologação funcional ainda é necessária antes de considerar a SDD concluída.

## 11. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação da proposta local da Etapa 7 e registro das decisões físicas pendentes | Em revisão |
