---
id: SIGA-CON-12
title: Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA
aliases:
  - Título XII
  - Agentes e Skills do SIGA
type: documento-constitucional
domain: inteligencia-artificial
status: aprovado
version: 1.0
created: 2026-07-27
updated: 2026-07-27
owner: responsavel-projeto
obsidian:
  note_type: constitutional-document
  graph_role: primary
  backlinks_expected: true
  dataview_ready: true
constitution: [Art. 72, Art. 73, Art. 74, Art. 75, Art. 76, Art. 77, Art. 78]
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Governança do Desenvolvimento do SIGA]]"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]]"
  - "[[Qualidade, Testes e Validação do SIGA]]"
  - "[[Roadmap, Evolução e Continuidade do SIGA]]"
tags: [siga, constituicao, agentes, skills, automacao, revisao]
---

# TÍTULO XII — AGENTES DE INTELIGÊNCIA ARTIFICIAL, SKILLS E AUTOMAÇÃO ASSISTIDA DO SIGA

## Navegação constitucional

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- Anterior: [[Roadmap, Evolução e Continuidade do SIGA]]
- Próximo núcleo: [[Glossário do SIGA]]

## Agente e skill

Agente é executor orientado por objetivo, contexto, ferramentas, permissões, limites e saída. Skill é procedimento reutilizável com entradas, passos, critérios, limitações e versão. Um agente usa várias skills; uma skill pode servir a vários agentes.

## Princípio e fontes

IA apoia, não substitui, responsabilidade profissional, metodologia, aprovação, emissão de relatório, acesso controlado ou julgamento. Fontes são Constituição, documentos, regras, domínio, ADR, SDD, plano, tarefa, situação e arquivos autorizados. GitHub é fonte oficial; OneDrive é apoio, não versão oficial do código.

## Agentes iniciais

Governança documental; acompanhamento; qualidade e testes; arquitetura; rastreabilidade; segurança; treinamento; metodológico progressivo. Podem revisar YAML, links, versões, riscos sem procedimentos, isolamento, critérios, testes e situação do projeto.

## Autonomia

1. consulta;
2. proposta;
3. execução controlada em escopo e branch;
4. automação operacional limitada de baixo risco.

Aprovação humana é obrigatória para regras, metodologia, banco, migrações, permissões, produção, exclusões, relatórios, papéis e conteúdo confidencial.

## Segurança, arquivos e dados

Agentes recebem somente informação necessária e respeitam `organization_id`, cliente, trabalho, usuário e finalidade. Não movem, renomeiam, substituem ou excluem arquivos fora do escopo. Execuções registram agente, versão, solicitante, fontes, arquivos, ações, resultado, limitações, aprovação e versão gerada.

## Cooperação

```text
Work → planejamento e documentação
Lovable → interfaces e fluxos
Codex → regras, dados e testes
Agentes → revisões
Humano → aprovação
GitHub → versão oficial
```

Cada ferramenta entrega algo revisável pela próxima. Isso evita uma colcha de retalhos.

## Incerteza e conflitos

Agentes não inventam regras, fontes, IDs, testes, arquivos, resultados ou aprovações. Informam insuficiência. Em conflito documental, identificam versões, aplicam hierarquia, interrompem alterações irreversíveis e propõem decisão.

## Testes, incidentes e reversão

Agentes possuem testes com contexto incompleto, acesso proibido, conflito, escopo ampliado, dado de outra organização e ação destrutiva. Resultados inadequados geram interrupção, revogação, preservação de registros, correção, reteste e revisão da skill. Alterações devem ser reversíveis por branch, commit, versão, backup ou migração.

## Material para treinamento

Objetivos: diferenciar agente e skill, delimitar autonomia, proteger arquivos, usar Work, Lovable e Codex de forma coordenada e exigir aprovação humana.

Estudo de caso: agente documental aponta link quebrado e YAML inconsistente, não altera a branch principal; humano aprova, Codex corrige em branch e testes são executados.

## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-27 | Minuta inicial | Substituída |
| 1.0 | 2026-07-27 | Normalização e aprovação documental | Aprovada |
