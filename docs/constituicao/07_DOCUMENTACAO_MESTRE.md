---
id: SIGA-CON-07
title: Documentação Mestre do SIGA
aliases:
  - Título VII
  - Sistema Documental do SIGA
type: documento-constitucional
domain: governanca-documental
status: aprovado
version: 1.1
created: 2026-07-27
updated: 2026-08-06
owner: responsavel-projeto
obsidian:
  note_type: constitutional-document
  graph_role: primary
  backlinks_expected: true
  dataview_ready: true
constitution: [Art. 39, Art. 40, Art. 41, Art. 42, Art. 43, Art. 44]
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Governança do Desenvolvimento do SIGA]]"
  - "[[Conhecimento, Treinamento e Produção Educacional do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
tags: [siga, constituicao, documentacao, governanca-documental, obsidian, github]
---

# TÍTULO VII — DOCUMENTAÇÃO MESTRE DO SIGA

## Navegação constitucional

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- Anterior: [[Governança do Desenvolvimento do SIGA]]
- Próximo: [[Conhecimento, Treinamento e Produção Educacional do SIGA]]

## Sistema documental

A documentação do SIGA é organizada hierarquicamente, versionada e para leitura progressiva. Os documentos usam Markdown, YAML válido, identificadores únicos e ligações explícitas entre si. Recursos do Obsidian são complementares e não impedem a leitura no GitHub.

## Documentos fundamentais

A estrutura mínima compreende a [[Constituição do SIGA]], visão do produto, arquitetura do sistema, modelo de domínio, metodologia de auditoria, regras de negócio, modelo de banco de dados, padrões de interface, regras de desenvolvimento, roadmap, situação do projeto, histórico de mudanças, decisões arquiteturais, especificações dos módulos, planos de sprint e materiais de treinamento.

Quando aplicável, a estrutura também inclui SDDs, tarefas e registros que conectem decisões, especificações, código e evidências.

## Constituição e hierarquia

A [[Constituição do SIGA]] é a norma superior do projeto; os demais documentos são interpretados de forma compatível com seus princípios. Em caso de conflito, observa-se esta ordem:

1. Constituição do SIGA;
2. decisões expressamente aprovadas pelo responsável do projeto;
3. especificação funcional vigente;
4. regras de negócio;
5. arquitetura aprovada;
6. especificação do módulo;
7. plano da sprint;
8. instruções temporárias de execução.

Para a execução do MVP, essa hierarquia é detalhada operacionalmente como: roadmap → [[Plano Mestre das SDDs do MVP do SIGA]] → SDD individual → plano de implementação → tarefa → prompt → código e testes. O Plano Mestre organiza a sequência e as dependências, mas não cria regras de negócio nem substitui documentos superiores.

## Situação do projeto

O arquivo [[Situação do Projeto]] informa a última etapa concluída, as atividades em andamento, pendências, bloqueios, riscos, branch atual, último commit relevante e próximo passo exato. Para preservar a continuidade, referencia de forma rastreável os documentos, as tarefas e as decisões vigentes.

## Decisões arquiteturais

Cada decisão arquitetural relevante é registrada em documento próprio com contexto, problema, opções consideradas, decisão, justificativa, consequências, data e responsável.

## Critérios de conformidade

Este documento está conforme os artigos 39 a 44 quando mantém organização hierárquica, versionamento e leitura progressiva; usa Markdown, YAML válido, identificador único e ligações explícitas; apresenta a estrutura documental mínima; respeita a Constituição como norma superior; explicita a ordem de hierarquia; e identifica os conteúdos obrigatórios da situação do projeto e das decisões arquiteturais.

## Material para treinamento

Objetivos: reconhecer a documentação como base hierárquica e versionada; localizar a norma superior em caso de conflito; identificar os documentos fundamentais; e distinguir o registro de situação do projeto do registro de decisão arquitetural.

Exercício: a partir de uma atividade em andamento, identificar as informações que pertencem à situação do projeto e os campos que pertencem ao registro de uma decisão arquitetural, conforme os artigos 43 e 44.

## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.9 | 2026-07-27 | Criação do detalhamento dos artigos 39 a 44 | Substituída |
| 1.0 | 2026-07-28 | Primeira versão constitucional consolidada e aprovada | Aprovada |
| 1.1 | 2026-08-06 | Inclusão da posição documental do Plano Mestre das SDDs | Aprovada |
