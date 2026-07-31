---
id: SIGA-PLN-ORG-001
title: Plano de Implantação da SDD-ORG-001
aliases:
  - Plano ORG-001
  - Implantação da Organização Usuária
type: implementation-plan
domain: organizacao-e-acesso
status: aprovado
version: 1.0
created: 2026-07-31
updated: 2026-07-31
owner: responsavel-projeto
related:
  - "[[SDD-ORG-001]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[SDD-AUT-001]]"
tags: [siga, grupo-01, organizacao, multiempresa, implementacao]
---

# Plano de Implantação — SDD-ORG-001

## 1. Regra de execução

A implementação será realizada pelo Codex em branch própria. Superpowers não será usado nesta SDD; permanece reservado à auditoria formal do Grupo 07.

O Lovable não será acionado para migration, segurança ou regras. Eventual apoio visual dependerá de nova autorização.

## 2. Branch e integração

```text
Branch: feat/org-001-organizacao-usuaria
Base: main após publicação desta documentação
Entrega: Pull Request
Merge: somente após validação humana
```

## 3. Etapas

1. publicar a SDD e este plano;
2. criar migration pelo Supabase CLI;
3. implementar tabela, constraints, RLS e bloqueio de acesso;
4. criar tipos, validações e normalização do domínio;
5. criar contrato especializado de repositório;
6. criar painel estrutural somente leitura;
7. registrar a decisão arquitetural da raiz multiempresa;
8. compilar e revisar o escopo;
9. abrir Pull Request para validação humana.

## 4. Interrupções obrigatórias

Interromper e solicitar decisão se houver necessidade de:

- conectar ou alterar o projeto Supabase remoto;
- criar usuário, associação, perfil ou política de acesso;
- adicionar dependência;
- alterar arquivo de lock;
- usar credencial real;
- criar formulário funcional;
- alterar módulos fora da Organização Usuária;
- modificar documentação aprovada não prevista no escopo.

## 5. Verificações

- migration criada pela CLI e revisada;
- RLS habilitado sem políticas permissivas;
- privilégios de `anon` e `authenticated` revogados;
- domínio validado com casos válidos e inválidos;
- ausência de exclusão física;
- ausência de credenciais e dados reais;
- interface sem gravação;
- compilação aprovada;
- diff restrito aos arquivos autorizados.

## 6. Entrega

O relatório final deverá informar branch, commit, arquivos alterados, verificações executadas, limitações, pendências e link do Pull Request.

## 7. Histórico

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-31 | Criação da minuta | Substituída |
| 1.0 | 2026-07-31 | Plano aprovado para implantação | Aprovada |
