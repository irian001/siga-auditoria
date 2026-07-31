---
id: SIGA-ADR-AUT-001
title: ADR-AUT-001 — Autenticação SSR com Supabase Auth
type: architecture-decision-record
status: aprovado
version: 1.0
created: 2026-07-31
updated: 2026-07-31
owner: responsavel-projeto
related: ["[[SDD-AUT-001]]", "[[SDD-ORG-001]]", "[[SDD-USR-001]]"]
tags: [siga, adr, autenticacao, supabase, seguranca]
---

# ADR-AUT-001 — Autenticação SSR com Supabase Auth

## Contexto

O SIGA utiliza TanStack Start com renderização no servidor. A autenticação precisa funcionar no navegador e no servidor, renovar cookies com segurança e não antecipar autorização organizacional.

## Decisão

- utilizar `@supabase/supabase-js` e `@supabase/ssr` em versões fixas;
- criar cliente de navegador singleton e cliente de servidor por requisição;
- usar cookies por meio de `getAll` e `setAll`;
- validar a identidade no servidor com `auth.getUser()`;
- executar a verificação central no `beforeLoad` da rota raiz;
- manter login, recuperação, redefinição e callback como rotas públicas;
- redirecionar toda identidade autenticada para acesso pendente até a USR-001;
- não liberar RLS nem dados de organização nesta SDD.

## Consequências

O aplicativo apresentará o login quando não houver sessão. Mesmo após login válido, nenhuma rota operacional será liberada antes da existência de `user_profiles` e `organization_memberships`.

## Alternativas rejeitadas

- sessão apenas no navegador;
- armazenamento manual de tokens;
- autorização por `user_metadata`;
- política ampla para qualquer usuário autenticado;
- cadastro público;
- cliente servidor compartilhado entre requisições.

## Histórico

| Versão | Data       | Alteração       | Situação |
| ------ | ---------- | --------------- | -------- |
| 1.0    | 2026-07-31 | Decisão inicial | Aprovada |
