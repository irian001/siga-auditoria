---
id: SIGA-CON-04
title: Estrutura Funcional do SIGA
aliases:
  - Título IV
  - Módulos do SIGA
type: documento-constitucional
domain: produto
status: aprovado
version: 1.0
created: 2026-07-24
updated: 2026-07-27
owner: responsavel-projeto
obsidian:
  note_type: constitutional-document
  graph_role: primary
  backlinks_expected: true
  dataview_ready: true
constitution:
  - Art. 20
  - Art. 21
  - Art. 22
  - Art. 23
  - Art. 24
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Identidade e Finalidade do SIGA]]"
  - "[[Públicos e Perfis de Uso do SIGA]]"
  - "[[Regras de Negócio e Metodologia de Auditoria]]"
  - "[[Roadmap, Evolução e Continuidade do SIGA]]"
  - "[[Plano de Contas Referencial]]"
  - "[[Matriz de Riscos Referencial]]"
  - "[[Modelos de Solicitação]]"
  - "[[Instruções de Evidência]]"
tags:
  - siga
  - constituicao
  - estrutura-funcional
  - modulos
  - auditoria
  - base-metodologica
---

# TÍTULO IV — ESTRUTURA FUNCIONAL DO SIGA

## Navegação constitucional

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- Anterior: [[Públicos e Perfis de Uso do SIGA]]
- Próximo: [[Arquitetura Tecnológica do SIGA]]

## Princípio e fluxo

O SIGA combina uma [[Base Metodológica por Segmento]] reutilizável com a execução individual de cada [[Trabalho de Auditoria]].

Fluxo principal:

```text
Organização → Cliente → Aceitação → Trabalho → Segmento
→ Plano Referencial → Balancete → Mapeamento
→ Planejamento → Processos → Riscos → Controles
→ Procedimentos → Modelos de Solicitação → Solicitações
→ Instruções de Evidência → Documento Recebido → Evidência
→ Papéis de Trabalho → Achados → Revisão
→ Conclusões por Área → Relatório → Plano de Ação → Qualidade
```

## Camadas

1. institucional e administrativa;
2. base metodológica;
3. gestão dos trabalhos;
4. metodologia do trabalho;
5. execução e documentação;
6. comunicação e qualidade.

## Base metodológica

Segmentos econômicos podem possuir planos de contas referenciais, processos, riscos, controles, programas, procedimentos, modelos de solicitação, instruções de evidência, modelos de papéis, achados e relatórios. A base é versionada e não altera silenciosamente trabalhos já iniciados.

## Balancete e contas

O sistema importa balancetes, valida formato, período, duplicidades e consistência, e registra a origem. Contas do cliente podem ser mapeadas ao plano referencial manualmente, por sugestão ou por modelo anterior. Sugestões não substituem revisão do auditor.

## Riscos, procedimentos e evidências

Riscos referenciais podem ser selecionados, adaptados ou descartados com justificativa e transformados em riscos do trabalho. Procedimentos podem gerar solicitações. Solicitações podem possuir nenhuma, uma ou várias instruções. A instrução orienta a extração; o documento recebido só se torna evidência após avaliação do auditor.

## Núcleo mínimo e MVP

O núcleo mínimo inclui organização, usuários, cliente, segmento, aceitação, trabalho, base metodológica, balancete, mapeamento, planejamento, processos, riscos, procedimentos, solicitações, instruções, documentos, evidências, papéis, achados, revisão, conclusões e relatório.

O MVP pode simplificar automações, portal, relatório e quantidade de segmentos, mas preserva segurança, isolamento, rastreabilidade, histórico, responsáveis e vínculos metodológicos.

## Relação solicitação–instrução

Uma solicitação define o que, período, formato, prazo e responsáveis. Uma instrução define como localizar, extrair, filtrar, preparar e enviar. A versão efetivamente enviada deve ser preservada; alterações posteriores não alteram o que foi enviado.

## Critérios de conformidade

A estrutura está adequada quando representa o ciclo da auditoria, separa base e trabalho, relaciona balancete, contas, riscos e procedimentos, diferencia pedido, instrução, documento e evidência, permite especialização e suporta o MVP.

## Material para treinamento

Objetivos: explicar camadas, base metodológica, plano referencial, balancete, riscos, solicitações, evidências e MVP.

Estudo de caso: uma permissionária envia balancete; contas de faturamento são mapeadas; o SIGA sugere risco e procedimento; a solicitação apresenta instrução do ERP; o cliente envia relatório; o auditor valida e incorpora como evidência.

## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-24 | Minuta inicial | Substituída |
| 0.2 | 2026-07-25 | Inclusão da base metodológica, planos, balancetes, riscos e instruções | Substituída |
| 0.3 | 2026-07-25 | Relação opcional e versionada entre solicitação e instrução; documento recebido separado de evidência | Substituída |
| 1.0 | 2026-07-27 | Normalização e promoção da versão aprovada | Aprovada |
