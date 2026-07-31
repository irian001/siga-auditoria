---
id: SIGA-ADR-ORG-001
title: ADR-ORG-001 — Organização como raiz multiempresa
type: architecture-decision-record
status: aprovado
version: 1.0
created: 2026-07-31
updated: 2026-07-31
owner: responsavel-projeto
related:
  - "[[SDD-ORG-001]]"
  - "[[Arquitetura Tecnológica do SIGA]]"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]]"
tags: [siga, adr, organizacao, multiempresa, seguranca]
---

# ADR-ORG-001 — Organização como raiz multiempresa

## Contexto

O SIGA deverá atender várias organizações de auditoria, mantendo dados, usuários, clientes e trabalhos isolados. É necessário definir uma raiz estável antes da autenticação e das demais entidades.

## Decisão

`public.organizations` será a raiz do isolamento multiempresa. A própria tabela não terá `organization_id`; as entidades pertencentes a uma organização receberão esse vínculo em suas SDDs.

A tabela nascerá com RLS habilitado, sem políticas permissivas e sem privilégios para `anon` e `authenticated`. O acesso somente será definido após autenticação, associação e autorização contextual.

## Consequências

- nenhuma organização poderá ser cadastrada pelo frontend nesta etapa;
- futuras entidades deverão declarar seu vínculo e política de isolamento;
- não haverá exclusão física;
- a criação inicial exigirá processo administrativo controlado;
- a implementação da autenticação não poderá contornar o bloqueio padrão.

## Alternativas rejeitadas

- organização única fixa no código;
- criação pública antes da autenticação;
- políticas temporárias amplas;
- duplicar dados da organização em cada módulo.

## Histórico

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 1.0 | 2026-07-31 | Decisão inicial | Aprovada |
