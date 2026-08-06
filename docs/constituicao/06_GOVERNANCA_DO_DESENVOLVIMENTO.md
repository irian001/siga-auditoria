---
id: SIGA-CON-06
title: Governança do Desenvolvimento do SIGA
aliases:
  - Título VI
  - Governança do Desenvolvimento
type: documento-constitucional
domain: governanca-desenvolvimento
status: aprovado
version: 1.1
created: 2026-07-26
updated: 2026-08-06
owner: responsavel-projeto
obsidian:
  note_type: constitutional-document
  graph_role: primary
  backlinks_expected: true
  dataview_ready: true
constitution: [Art. 32, Art. 33, Art. 34, Art. 35, Art. 36, Art. 37, Art. 38]
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Arquitetura Tecnológica do SIGA]]"
  - "[[Regras de Negócio e Metodologia de Auditoria]]"
  - "[[Qualidade, Testes e Validação do SIGA]]"
  - "[[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
tags: [siga, constituicao, governanca, desenvolvimento, sdd, git]
---

# TÍTULO VI — GOVERNANÇA DO DESENVOLVIMENTO DO SIGA

## Navegação constitucional

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- Anterior: [[Arquitetura Tecnológica do SIGA]]
- Próximo: [[Documentação Mestre do SIGA]]

## Ciclo obrigatório

```text
Necessidade → Documento Funcional → Regra → Domínio
→ SDD → Plano → Tarefa → Implementação → Testes
→ Revisão → Validação → Documentação → GitHub
```

O desenvolvimento é incremental, documentado, verificável, reversível e orientado por especificações.

## Hierarquia documental

Constituição; decisões humanas expressamente aprovadas; documentos constitucionais; regras e metodologia; visão, domínio, dados e arquitetura; roadmap; [[Plano Mestre das SDDs do MVP do SIGA]]; SDD individual; plano de implementação; tarefa; prompt; código e testes. Documento inferior não pode contrariar superior.

O Plano Mestre é a ponte operacional entre a estratégia documentada e as SDDs individuais: organiza grupos, ordem, dependências, limites do MVP e critérios de avanço, sem substituir a especificação de cada módulo.

## SDD, plano e tarefa

O SDD pode ser criado antes da conclusão de toda a Constituição quando o módulo já possuir documentação suficiente. Deve conter objetivo, contexto, escopo, fora de escopo, usuários, fluxo, entidades, regras, estados, permissões, telas, critérios, testes e documentação.

O plano organiza sequência e dependências. A tarefa possui objetivo único, arquivos permitidos, alterações esperadas, fora de escopo, critérios, testes e documentação afetada. Prompts derivam de tarefas; não substituem especificações.

## Ferramentas e agentes

Work documenta e coordena; Lovable executa interfaces delimitadas; Codex integra regras, dados e testes; agentes revisam documentação, metodologia, rastreabilidade, arquitetura, segurança e qualidade. Aprovação final é humana.

## Controle de escopo e arquivos

Antes de alterar, verificar estado, dependências, testes e mudanças não integradas. Não excluir ou substituir conteúdo válido sem análise. Alterações relevantes usam branches, commits claros e pull requests.

## Qualidade e conclusão

Critérios de aceite devem ser verificáveis e abranger comportamento, validação, permissão, estado, histórico, segurança e documentação. Funcionalidade só está concluída com testes, revisão, validação funcional, documentação, versionamento e falhas críticas tratadas.

## Situação e continuidade

`[[Situação do Projeto]]` deve registrar fase, módulo, tarefas, bloqueios, decisões, branch, versão e próximo passo. A retomada consulta Constituição, documento funcional, regras, SDD, plano, situação, tarefa e decisões.

## Material para treinamento

Objetivos: distinguir SDD, plano, tarefa e prompt; controlar escopo; entender revisão e definição de concluído.

Estudo de caso: a importação de balancetes é dividida em upload, leitura, validação, inconsistências, armazenamento e testes; Lovable implementa interface e Codex valida regras.

## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-26 | Minuta inicial | Substituída |
| 1.0 | 2026-07-27 | Normalização e aprovação documental | Aprovada |
| 1.1 | 2026-08-06 | Formalização do Plano Mestre das SDDs na hierarquia de desenvolvimento | Aprovada |
