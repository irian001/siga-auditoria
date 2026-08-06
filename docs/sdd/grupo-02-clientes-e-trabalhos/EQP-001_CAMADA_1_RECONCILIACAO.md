---
id: SIGA-EQP-001-C1
title: EQP-001 — Camada 1 — Relatório de Reconciliação
aliases:
  - Reconciliação da EQP-001
  - Relatório da Camada 1 da EQP-001
type: implementation-report
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
implementation_status: concluida
version: 1.0
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
related:
  - "[[SDD-EQP-001]]"
  - "[[PLANO-EQP-001_IMPLANTACAO]]"
  - "[[SDD-USR-001]]"
  - "[[SDD-ACL-001]]"
  - "[[SDD-TRB-001]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
obsidian:
  note_type: implementation-report
  graph_role: reconciliation-evidence
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - eqp-001
  - camada-1
  - reconciliacao
  - supabase
  - rls
---

# EQP-001 — Camada 1 — Relatório de Reconciliação

## 1. Objetivo

Verificar os contratos atuais de usuários, memberships, autorização e trabalhos, comparar a documentação com o código e confirmar a situação física do Supabase antes de iniciar o diretório de usuários da Camada 2.

## 2. Escopo executado

Foram inspecionados:

- modelo de domínio de usuários, memberships e trabalhos;
- contratos de repositório;
- resolução do contexto do usuário autenticado;
- permissões declaradas;
- migrations versionadas no GitHub;
- tabelas, colunas, RLS e migrations do projeto Supabase oficial;
- existência física das entidades previstas para equipe, funções e períodos.

Nenhum arquivo de código foi alterado. Nenhuma migration, política, tabela ou dado foi criado ou modificado.

## 3. Resultado dos contratos locais

### 3.1 Usuário autenticado

O `UserContextRepository` oferece `resolveCurrentUserAccess`, destinado a resolver o contexto do usuário que iniciou a sessão.

O `supabaseUserContextRepository` consulta o próprio perfil, os próprios memberships, a organização ativa e a autorização do membership atual. Esse contrato não lista os demais usuários da organização.

### 3.2 Diretório administrativo

Não foi localizado:

- contrato de listagem de usuários da organização;
- repositório de diretório de usuários;
- rota operacional `/users`;
- tela administrativa de usuários;
- fluxo de convite ou administração de usuários no frontend.

As permissões `users.view` e `users.manage` existem no domínio de autorização, mas a capacidade funcional correspondente ainda não está implementada.

### 3.3 Trabalho, equipe e período

O repositório atual possui operações do trabalho, mas não operações para listar equipe, associar membro, atribuir função, encerrar participação ou criar e consultar períodos.

## 4. Resultado do Supabase oficial

Projeto consultado:

- nome: `siga-auditoria`;
- referência: `umuassmgminmliuypoyp`.

### 4.1 Entidades existentes

Foram confirmadas no schema `public`:

- `user_profiles` — 1 registro;
- `organization_memberships` — 1 registro;
- `audit_engagements` — 2 registros;
- `roles`, `permissions` e `membership_roles`.

Todas as tabelas verificadas estão com RLS habilitado.

### 4.2 Entidades EQP ausentes

Não foram encontradas no ambiente oficial:

- `engagement_roles`;
- `engagement_team_members`;
- `engagement_periods`.

Também não existem migrations oficiais correspondentes a essas entidades. Equipe, funções e períodos ainda estão apenas no nível documental e lógico.

### 4.3 Políticas atuais de usuários

As políticas consultadas são:

- `user_profiles_select_own` — permite consultar somente o próprio perfil;
- `organization_memberships_select_own` — permite consultar somente os próprios memberships.

Não existe atualmente uma política que permita a um administrador consultar todos os perfis e memberships ativos da própria organização usando `users.view`.

## 5. Gargalo confirmado

O bloqueio não é a ausência de CRUD completo de usuários.

O bloqueio é a combinação de dois fatos:

1. o frontend e os repositórios não possuem diretório administrativo de usuários;
2. as políticas RLS atuais não permitem enumerar os usuários da organização.

Sem resolver esses pontos, o sistema não poderá apresentar uma lista segura para selecionar membros da equipe.

Não será permitido contornar o bloqueio por meio de campo de e-mail livre, consulta direta de `auth.users` pela interface, chave privilegiada no navegador, liberação genérica para `authenticated`, mistura de organizações ou dados simulados tratados como persistência oficial.

## 6. Contratos reutilizáveis

Podem ser reutilizados:

- `UserProfile`;
- `OrganizationMembership`;
- `AuthorizationContext`;
- `PermissionCode`;
- `RequestContext`;
- resolução da organização atual;
- isolamento já aplicado aos trabalhos.

## 7. Contratos ausentes

Precisarão ser definidos em camada posterior:

- consulta de usuários elegíveis da organização;
- regra de autorização para essa consulta;
- retorno mínimo do diretório;
- entidades físicas de funções;
- vínculos de equipe;
- períodos do trabalho;
- histórico dessas relações;
- repositórios correspondentes.

## 8. Decisão para a Camada 2

A Camada 2 deverá ser planejada como um diretório somente leitura, com consulta limitada à organização atual, filtragem por perfil e membership ativos, autorização baseada em `users.view` ou regra equivalente aprovada, política RLS específica e nenhum cadastro, convite, edição, inativação ou exclusão de usuário.

A alteração de RLS e a criação de qualquer função, view ou migration deverão ser tratadas no plano específico da Camada 2. Não foram executadas nesta Camada 1.

## 9. Lista fechada preliminar da Camada 2

Antes da implementação, deverão ser confirmados e aprovados os arquivos exatos entre estas áreas:

- domínio de usuário e membership;
- contrato e implementação do diretório;
- autorização;
- política ou migration necessária;
- testes de isolamento e ACL;
- eventual componente de consulta.

O arquivo final só será fechado após a aprovação do desenho de segurança da Camada 2.

## 10. Critério de saída

A Camada 1 está concluída porque os contratos existentes foram identificados, o contrato de diretório ausente foi registrado, as entidades EQP ausentes foram confirmadas no Supabase, as políticas RLS atuais foram verificadas, o gargalo foi explicitado e nenhum código ou dado foi alterado.

## 11. Próximo passo

Preparar a minuta restritiva da Camada 2 — diretório administrativo de usuários elegíveis, somente leitura — incluindo desenho da consulta, RLS, permissão `users.view`, campos retornados, testes e lista fechada de arquivos.

Nenhuma tabela de equipe, função ou período será criada antes de a Camada 2 estar resolvida e homologada.

## 12. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 1.0 | 2026-08-05 | Conclusão da reconciliação local e oficial da Camada 1 da EQP-001 | Aprovada |
