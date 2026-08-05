---
id: SIGA-ACE-ETP14-001
title: ACE-001 — Etapa 14 — Integração real com Supabase
aliases:
  - Integração real da ACE-001
  - ACE-001 Etapa 14
type: implementation-record
domain: acceptance-continuance
group: grupo-02-clientes-e-trabalhos
status: em-validacao
version: 0.1
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
related:
  - "[[SDD-ACE-001]]"
  - "[[PLANO-ACE-001_IMPLANTACAO]]"
  - "[[ACE-001_ETAPA_7_PROJETO_FISICO]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Situacao do Projeto]]"
obsidian:
  note_type: implementation-record
  graph_role: execution-evidence
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - ace-001
  - supabase
  - rpc
  - integracao-real
---

# ACE-001 — Etapa 14 — Integração real com Supabase

## 1. Objetivo

Registrar a passagem da ACE-001 da persistência simulada para a persistência oficial, mantendo as regras do domínio, o contexto organizacional e a separação entre interface, contrato e banco.

## 2. Entregas realizadas

- adapter src/data/supabase/supabaseAcceptanceRepository.ts;
- leitura das avaliações e respostas por organização e cliente;
- criação, gravação de respostas, envio, devolução, decisão e cancelamento por RPC;
- troca do AcceptancePanel do repositório simulado para o Supabase oficial;
- atualização das mensagens da interface para distinguir dados oficiais de dados simulados;
- migration de fachadas RPC públicas com SECURITY INVOKER;
- migration corretiva de ACL explícita;
- preservação das funções protegidas no schema private;
- nenhuma ativação ou uso do Lovable Cloud.

## 3. Migrations locais e remotas

| Finalidade | Arquivo local | Versão remota |
|---|---|---|
| Tabelas, regras, RLS e funções protegidas | 20260805093003_acceptance_assessments.sql | 20260805142219 |
| Fachadas RPC autenticadas | 20260805142532_acceptance_rpc_api.sql | 20260805143933 |
| Correção de ACL das fachadas | 20260805144031_acceptance_rpc_api_acl.sql | 20260805144054 |

Os timestamps remotos foram gerados pelo ambiente Supabase e não devem ser usados para renomear ou reescrever migrations locais já versionadas.

## 4. Verificações remotas

Foram confirmados:

- tabela public.acceptance_assessments, com RLS ativo;
- tabela public.acceptance_assessment_answers, com RLS ativo;
- permissões acceptance.view, acceptance.prepare e acceptance.decide;
- seis funções públicas de fachada com SECURITY INVOKER;
- execução das fachadas negada para anon;
- execução das fachadas concedida para authenticated;
- seis funções privadas protegidas com SECURITY DEFINER;
- migration acceptance_rpc_api_acl aplicada após a descoberta da ACL explícita para anon.

## 5. Verificação local

- npm.cmd run build: aprovado;
- git diff --check: aprovado;
- src/routeTree.gen.ts: restaurado após alteração automática do build;
- nenhuma dependência, variável de ambiente, rota de autenticação ou configuração do Lovable foi alterada.

## 6. Pendências de homologação

Ainda é necessária uma validação funcional autenticada, usando a organização Audiconsult, para confirmar:

1. abertura do painel de aceitação;
2. criação de um rascunho;
3. gravação das respostas;
4. persistência após recarregar a página;
5. envio para decisão;
6. comportamento das permissões;
7. preservação do histórico;
8. ausência de dados simulados na tela.

Os dados de teste desta etapa serão gravados no banco oficial. A criação de registros deverá ocorrer somente durante a homologação autorizada.

## 7. Estado da SDD

A SDD-ACE-001 está em validação. A implementação técnica da persistência e da interface real foi realizada, mas a conclusão formal depende da homologação funcional, dos testes de autorização e da publicação da branch em PR.

## 8. Próximo passo

Executar a homologação autenticada, registrar o resultado, revisar o diff final e abrir o PR técnico sem fazer merge na main antes da aprovação humana.

## 9. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Registro da integração real, migrations remotas, adapter, troca da interface e pendências de homologação | Em validação |
