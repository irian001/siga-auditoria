---
id: SIGA-CON-10
title: Qualidade, Testes e Validação do SIGA
aliases:
  - Título X
  - Qualidade e Testes do SIGA
type: documento-constitucional
domain: qualidade
status: aprovado
version: 1.0
created: 2026-07-26
updated: 2026-07-27
owner: responsavel-projeto
obsidian:
  note_type: constitutional-document
  graph_role: primary
  backlinks_expected: true
  dataview_ready: true
constitution: [Art. 59, Art. 60, Art. 61, Art. 62, Art. 63, Art. 64, Art. 65]
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Governança do Desenvolvimento do SIGA]]"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]]"
  - "[[Regras de Negócio e Metodologia de Auditoria]]"
  - "[[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]]"
tags: [siga, constituicao, qualidade, testes, validacao, revisao]
---

# TÍTULO X — QUALIDADE, TESTES E VALIDAÇÃO DO SIGA

## Navegação constitucional

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- Anterior: [[Regras de Negócio e Metodologia de Auditoria]]
- Próximo: [[Roadmap, Evolução e Continuidade do SIGA]]

## Dimensões de qualidade

Qualidade abrange funcionalidade, metodologia, dados, técnica, segurança, experiência do usuário e documentação. Deve existir desde necessidade, regra, domínio e SDD até produção e acompanhamento.

## Testes

Usar combinação de testes unitários, componentes, integração, fluxo, ponta a ponta e exploratórios. Regras críticas têm testes: aceitação, autorrevisão, documento versus evidência, isolamento, versão de instrução e relatório com aprovação.

Testes metodológicos verificam risco referencial, risco do trabalho, procedimento planejado e executado, documento recebido, evidência, papel, achado, amostragem e encerramento.

## Rastreabilidade, permissões e segurança

Testar caminhos diretos e reversos entre grupo, risco, procedimento, solicitação, evidência, papel, achado e relatório. Testes de permissão devem incluir positivos e negativos. Isolamento multiempresa, RLS, arquivos, links, histórico e migrações são críticos e impeditivos quando falham.

## Amostragem e cálculos

Testar população, completude, método, tamanho, seleção, cobertura, justificativa e reprodutibilidade. Verificar bases de cálculo, arredondamento, moeda, nulos, negativos e limites. Distinguir cálculo automático de decisão do auditor.

## Aceite e pronto

Critérios devem usar, quando adequado, “Dado que / Quando / Então” e cobrir fluxo, validações, exceções, permissões, estados, histórico e segurança. Definição de pronto exige escopo atendido, critérios, testes, revisão, homologação, documentação, versionamento, evidências e falhas críticas tratadas.

## Falhas e liberação

Falhas são classificadas por gravidade. Acesso entre organizações, perda de dados, evidência exposta, aprovação indevida, histórico perdido e migração destrutiva bloqueiam liberação. Correção exige reteste e regressão. Liberação deve verificar backup, reversão, comunicação e monitoramento.

## Agentes

Agentes apoiam revisão de código, cobertura, rastreabilidade, documentação e segurança, mas não aprovam sozinhos. Resultados devem registrar agente, versão, escopo, fontes, achados e responsável pela avaliação.

## Material para treinamento

Objetivos: criar critérios, testar regras, executar testes negativos, avaliar isolamento, registrar evidências, classificar defeitos e homologar.

Estudo de caso: cliente acessa arquivo de outra organização alterando URL; falha crítica bloqueia liberação até correção, reteste e regressão.

## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-26 | Minuta inicial | Substituída |
| 1.0 | 2026-07-27 | Normalização e aprovação documental | Aprovada |
