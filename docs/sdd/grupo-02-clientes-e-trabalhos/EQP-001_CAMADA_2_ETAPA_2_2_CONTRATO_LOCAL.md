---
id: SIGA-EQP-001-C2-2.2
title: EQP-001 Camada 2 — Contrato Local do Diretório
aliases:
  - Contrato Local EQP-001 Camada 2
  - Relatório Etapa 2.2 do EQP-001
  - Repositório Simulado de Usuários Elegíveis
type: implementation-report
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: minuta
implementation_status: concluida
version: 0.1
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
responsible:
  implementation: codex
  review: responsavel-projeto
depends_on:
  - SIGA-EQP-001-C2-2.1
  - SIGA-EQP-001-C2
related:
  - "[[EQP-001 — Camada 2 — Desenho de Segurança do Diretório]]"
  - "[[EQP-001 — Camada 2 — Diretório de Usuários]]"
  - "[[Plano Restritivo — EQP-001 Camada 2 — Diretório de Usuários]]"
  - "[[SDD-USR-001 — Usuários e Perfis]]"
  - "[[SDD-ACL-001 — Papéis e Permissões]]"
  - "[[Situação do Projeto]]"
obsidian:
  note_type: implementation-report
  graph_role: local-contract-evidence
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - eqp-001
  - camada-2
  - etapa-2-2
  - contrato
  - mock
  - testes
  - somente-leitura
---

# EQP-001 — CAMADA 2 — CONTRATO LOCAL

## Etapa 2.2 — Contrato e persistência simulada

## 1. Objetivo

Implementar o contrato local do diretório de usuários elegíveis e uma fonte simulada para validar as regras sem depender do Supabase oficial.

A etapa não implementa persistência real, RLS, migration, função, view, tela ou consulta a auth.users.

## 2. Arquivos criados

- src/domain/userDirectory.ts
- src/data/userDirectoryRepository.ts
- src/data/mockUserDirectoryRepository.ts
- tests/data/userDirectoryRepository.test.ts
- tests/alias-loader.mjs

Nenhum arquivo de autenticação, ACL, Supabase, migration ou interface foi alterado.

## 3. Contrato criado

O domínio agora possui o tipo EligibleOrganizationUser com os campos:

- userProfileId;
- displayName;
- membershipId;
- organizationId;
- membershipStatus;
- activeFrom;
- activeTo.

O contrato UserDirectoryRepository expõe somente:

- listEligibleUsers(context).

Não existem métodos de criação, alteração, exclusão, convite, inativação ou associação a trabalho.

## 4. Regras implementadas no mock

O repositório simulado:

- exige organização no contexto;
- exige autorização com status active;
- exige users.view;
- rejeita autorização vinculada a outra organização;
- filtra somente memberships active;
- verifica activeFrom;
- verifica activeTo;
- exclui perfil inactive;
- limita o resultado à organização solicitada;
- não retorna authSubject, e-mail ou metadados de autenticação;
- ordena o resultado pelo nome;
- não possui operações de escrita.

A data de referência pode ser informada nos testes para tornar o comportamento reproduzível.

## 5. Testes executados

Foram executados seis testes:

| Teste | Resultado |
|---|---|
| Retorna somente usuários ativos e vigentes da organização autorizada | Aprovado |
| Bloqueia usuário sem users.view | Aprovado |
| Bloqueia contexto não ativo ou incompleto | Aprovado |
| Impede ampliação por autorização de outra organização | Aprovado |
| Não expõe campos de autenticação nem oferece escrita | Aprovado |
| Rejeita data de referência inválida | Aprovado |

Resultado: 6 testes aprovados, 0 falhas.

## 6. Verificações técnicas

### Testes

Comando executado pelo runner nativo do Node:

- 6 testes executados;
- 6 aprovados;
- 0 falhas.

### Compilação

A compilação de produção foi executada com sucesso nos ambientes de cliente, SSR e Nitro.

### Lint direcionado

Os arquivos novos foram verificados individualmente pelo ESLint após formatação e não apresentaram erros.

A execução global do lint continua afetada por avisos de finais de linha CRLF já existentes em diversos arquivos do repositório. Esse problema não foi introduzido pela Etapa 2.2.

## 7. Limites preservados

Não foram realizados:

- alteração no Supabase;
- alteração de RLS;
- criação de migration;
- criação de tabela;
- criação de função;
- criação de view;
- criação de adaptador Supabase;
- consulta real de usuários;
- acesso direto a auth.users;
- uso de service_role;
- alteração de autenticação;
- alteração de ACL;
- alteração de interface;
- uso do Lovable;
- uso de Superpowers.

## 8. Situação do Gate B

O Gate B — contrato local somente leitura — está tecnicamente concluído para revisão.

O resultado ainda não está conectado à fonte oficial. A conexão real dependerá do Gate C, que exige decisão específica sobre as políticas RLS e eventual helper privado.

## 9. Próximo passo

Após homologação desta etapa, deverá ser preparada a proposta do Gate C:

- migration ou política RLS necessária;
- revisão da função privada existente;
- eventual helper privado para leitura controlada de perfis;
- grants e revokes;
- testes reais de isolamento;
- estratégia de reversão.

Nenhuma alteração no Supabase deverá ocorrer sem autorização específica para o Gate C.

## 10. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Implementação do contrato local, mock e seis testes da Etapa 2.2 | Em revisão |
