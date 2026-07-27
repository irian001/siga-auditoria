---
id: SIGA-MAT-CON-001
title: Matriz Mestra da Constituição do SIGA
aliases:
  - Matriz Mestra do SIGA
  - Índice Constitucional do SIGA
type: matriz-mestra
domain: governanca-documental
status: aprovado
version: 1.0
created: 2026-07-27
updated: 2026-07-27
owner: responsavel-projeto
obsidian:
  note_type: hub
  graph_role: central
  canvas_ready: true
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[Constituição do SIGA]]"
  - "[[Glossário do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Matriz de Rastreabilidade do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[Roadmap do MVP]]"
tags: [siga, constituicao, matriz-mestra, hub, obsidian, governanca]
---

# MATRIZ MESTRA DA CONSTITUIÇÃO DO SIGA

## Navegação

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- [[Relatório de Normalização Obsidian do SIGA]]

## Função da matriz

Esta nota é o hub de navegação e controle da Constituição. Não substitui a [[Constituição do SIGA]] nem os doze documentos dos Títulos I a XII. Liga a Constituição aos documentos constitucionais, documentos estruturantes, SDDs, planos, tarefas e testes.

## Títulos constitucionais

| Título | ID | Arquivo | Artigos | Versão atual | Status |
|---|---|---|---|---|---|
| I — Identidade e Finalidade | SIGA-CON-01 | [[Identidade e Finalidade do SIGA]] | 1–4 | 1.0 | aprovado |
| II — Princípios Fundamentais | SIGA-CON-02 | [[Princípios Fundamentais do SIGA]] | 5–15 | 1.0 | aprovado |
| III — Públicos e Perfis | SIGA-CON-03 | [[Públicos e Perfis de Uso do SIGA]] | 16–19 | 1.0 | aprovado |
| IV — Estrutura Funcional | SIGA-CON-04 | [[Estrutura Funcional do SIGA]] | 20–24 | 1.0 | aprovado |
| V — Arquitetura Tecnológica | SIGA-CON-05 | [[Arquitetura Tecnológica do SIGA]] | 25–31 | 1.0 | aprovado |
| VI — Governança do Desenvolvimento | SIGA-CON-06 | [[Governança do Desenvolvimento do SIGA]] | 32–38 | 1.0 | aprovado |
| VII — Dados, Segurança, Privacidade e Histórico | SIGA-CON-07 | [[Dados, Segurança, Privacidade e Histórico do SIGA]] | 39–44 | 1.0 | aprovado |
| VIII — Conhecimento e Treinamento | SIGA-CON-08 | [[Conhecimento, Treinamento e Produção Educacional do SIGA]] | 45–53 | 1.0 | aprovado |
| IX — Regras de Negócio e Metodologia | SIGA-CON-09 | [[Regras de Negócio e Metodologia de Auditoria]] | 54–58 | 1.0 | aprovado |
| X — Qualidade, Testes e Validação | SIGA-CON-10 | [[Qualidade, Testes e Validação do SIGA]] | 59–65 | 1.0 | aprovado |
| XI — Roadmap, Evolução e Continuidade | SIGA-CON-11 | [[Roadmap, Evolução e Continuidade do SIGA]] | 66–71 | 1.0 | aprovado |
| XII — Agentes, Skills e Automação | SIGA-CON-12 | [[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]] | 72–78 | 1.0 | aprovado |

## Cobertura constitucional

- primeiro artigo: Art. 1;
- último artigo: Art. 78;
- lacunas de numeração: nenhuma;
- sobreposição de faixas: nenhuma;
- títulos sem documento complementar: nenhum.

## Decisões consolidadas

- A organização usuária é a empresa de auditoria; o SIGA poderá ser comercializado para várias organizações.
- O GitHub é a fonte oficial de código e documentação.
- OneDrive e similares servem para apoio e cópias, não para controlar a versão oficial do código.
- Lovable fabrica interfaces e fluxos delimitados; Codex trata regras, dados, testes e integração; Work planeja e documenta.
- Agentes e skills têm escopo, autonomia, fontes, versão, registro, testes e aprovação humana.
- Solicitação, instrução, documento recebido e evidência são objetos distintos.
- O histórico registra eventos; a trilha de auditoria organiza esses eventos em contexto.
- O núcleo do MVP preserva segurança, isolamento, rastreabilidade, responsáveis, histórico e vínculos metodológicos.

## Navegação para a próxima camada

- [[Glossário do SIGA]]
- [[Modelo de Domínio do SIGA]]
- [[Modelo de Dados do SIGA]]
- [[Matriz de Rastreabilidade do SIGA]]
- [[Situação do Projeto]]
- [[Roadmap do MVP]]
- [[Spec-Driven Development]]
- [[Registro de Agentes do SIGA]]
- [[Catálogo de Skills do SIGA]]

## Uso no Obsidian

Esta nota deve funcionar como hub. Os doze documentos constitucionais possuem links de retorno para esta matriz, permitindo backlinks. A propriedade `obsidian.graph_role: central` identifica sua posição no grafo. Links para notas futuras permanecem intencionais e indicam a próxima camada documental.

Consulta Dataview sugerida:

```dataview
TABLE id, version, status
FROM "outputs/siga-constituicao-obsidian"
WHERE type = "documento-constitucional"
SORT id ASC
```

Canvas conceitual:

```text
Constituição → Matriz Mestra → Títulos I–XII → Documentos estruturantes → SDDs → Tarefas → Código
```

## Pendências explícitas

1. A nota integral `[[Constituição do SIGA]]` não estava disponível no workspace e deve ser adicionada a partir do arquivo oficial antes da publicação final.
2. Os links para Glossário, Modelo de Domínio, Modelo de Dados, Rastreabilidade, Situação, Roadmap detalhado, SDD, Registro de Agentes e Catálogo de Skills são notas futuras ainda não criadas.
3. A pasta final do repositório GitHub deverá substituir o caminho local usado na consulta Dataview.

## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-27 | Matriz inicial dos títulos e artigos 1–78 | Substituída |
| 1.0 | 2026-07-27 | Normalização como hub Obsidian, aliases, navegação, matriz e pendências explícitas | Aprovada |
