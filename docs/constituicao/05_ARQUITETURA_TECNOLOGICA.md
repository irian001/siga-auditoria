---
id: SIGA-CON-05
title: Arquitetura Tecnológica do SIGA
aliases:
  - Título V
  - Arquitetura do SIGA
type: documento-constitucional
domain: arquitetura
status: aprovado
version: 1.0
created: 2026-07-25
updated: 2026-07-27
owner: responsavel-projeto
obsidian:
  note_type: constitutional-document
  graph_role: primary
  backlinks_expected: true
  dataview_ready: true
constitution: [Art. 25, Art. 26, Art. 27, Art. 28, Art. 29, Art. 30, Art. 31]
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Estrutura Funcional do SIGA]]"
  - "[[Governança do Desenvolvimento do SIGA]]"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]]"
  - "[[Qualidade, Testes e Validação do SIGA]]"
  - "[[Spec-Driven Development]]"
tags: [siga, constituicao, arquitetura, github, lovable, supabase, codex]
---

# TÍTULO V — ARQUITETURA TECNOLÓGICA DO SIGA

## Navegação constitucional

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- Anterior: [[Estrutura Funcional do SIGA]]
- Próximo: [[Governança do Desenvolvimento do SIGA]]

## Arquitetura e responsabilidades

A arquitetura inicial utiliza Next.js, React, TypeScript, Lovable, Supabase, GitHub, Codex e ChatGPT Work. A tecnologia deve servir à metodologia, preservar rastreabilidade, histórico, segurança, isolamento multiempresa e evolução.

- **ChatGPT Work:** planejamento, documentação, regras, SDD, tarefas, treinamento e acompanhamento.
- **Lovable:** interfaces, componentes, formulários, navegação e fluxos delimitados, inicialmente com dados simulados quando apropriado.
- **Codex:** diagnóstico do repositório, regras complexas, banco, integrações, testes, segurança e revisão técnica.
- **GitHub:** fonte oficial de código, documentação, branches, commits, pull requests e decisões.
- **Supabase:** banco, autenticação, autorização, RLS, armazenamento, funções e registros persistentes.

## Camadas

1. apresentação;
2. aplicação;
3. domínio;
4. infraestrutura.

A interface não deve conter sozinha regras críticas. Serviços, repositórios, casos de uso ou adaptadores devem separar interface e persistência. O modelo de domínio deve preceder o banco.

## Repositório e ambientes

O projeto oficial deverá manter `src/`, `tests/`, `supabase/` e `docs/`. Desenvolvimento, homologação e produção devem possuir credenciais e dados separados. Migrações de banco devem ser versionadas.

## Segurança arquitetural

Entidades devem possuir vínculo organizacional explícito. Permissões consideram organização, perfil, função, responsabilidade, estado, confidencialidade e segregação. RLS e testes diretos devem proteger o banco; filtros de interface não são suficientes.

## Arquivos e histórico

O arquivo físico é separado do registro metodológico. Evidências preservam origem, versão, vínculos e acesso. Alterações relevantes geram histórico.

## SDD e ADR

O SDD é criado depois dos documentos funcionais, metodológicos e arquiteturais necessários ao módulo. Deve existir por módulo, fluxo ou incremento, com objetivo, escopo, entidades, regras, estados, permissões, telas, critérios e testes. Decisões arquiteturais relevantes devem virar ADR.

## Situações proibidas

Não criar projeto Lovable paralelo, banco a partir apenas da tela, credenciais no GitHub, regras críticas somente em componentes, mudanças sem ADR quando necessária, dados misturados ou código sem especificação.

## Material para treinamento

Objetivos: explicar papéis das ferramentas, camadas, domínio versus banco, GitHub, Supabase, Lovable, Codex e SDD.

Estudo de caso: especificação define instruções de evidência; modelo de domínio define versão e vínculo; Lovable cria a tela; Codex implementa testes e integração; PR registra a mudança.

## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-25 | Minuta inicial | Substituída |
| 1.0 | 2026-07-27 | Normalização e aprovação documental | Aprovada |
