---
id: SIGA-PNL-001-E01
title: PNL-001 — Etapa 1 — Rota e Composição de Leitura
aliases:
  - PNL-001 Etapa 1
  - Rota e Composição de Leitura do Painel
type: autorizacao-operacional
domain: clientes-e-trabalhos
status: aprovado
version: 1.0
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
depends_on:
  - SIGA-SDD-PNL-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-PNL-001]]"
  - "[[Plano da PNL-001]]"
  - "[[Situação do Projeto]]"
obsidian:
  note_type: implementation-stage
  graph_role: operational
  backlinks_expected: true
  dataview_ready: true
tags: [siga, pnl-001, etapa-1, painel, trabalhos, leitura]
---

# PNL-001 — Etapa 1 — Rota e Composição de Leitura

## 1. Finalidade

Esta minuta delimita a primeira das quatro etapas fechadas do [[Plano da PNL-001]]. Não cria nova camada, não altera o plano aprovado e não autoriza avanço para a Etapa 2.

O resultado esperado é uma base técnica protegida para abrir um trabalho específico e reunir, em leitura, seu contexto essencial. A composição visual completa permanecerá fora desta etapa.

## 2. Fontes obrigatórias

A execução deverá respeitar:

- [[Constituição do SIGA]];
- [[Plano Mestre das SDDs do MVP do SIGA]];
- [[SDD-PNL-001]];
- [[Plano da PNL-001]];
- [[Situação do Projeto]];
- contratos e regras já homologados nas SDDs CLI-001, ACE-001, TRB-001 e EQP-001.

## 3. Objetivo autorizado

Implementar somente:

1. a rota protegida `/trabalhos/$engagementId`;
2. a obtenção do trabalho pelo identificador informado;
3. a obtenção do cliente vinculado ao trabalho;
4. a obtenção da avaliação de aceitação vinculada ao trabalho;
5. os estados técnicos de carregamento, erro, trabalho inexistente e acesso negado;
6. testes direcionados da proteção da rota e da composição de leitura.

## 4. Regras de acesso

A leitura exigirá simultaneamente:

- sessão autenticada;
- vínculo organizacional ativo;
- autorização ativa;
- permissão `engagements.view`;
- trabalho pertencente à organização atual.

As políticas RLS existentes continuarão como barreira definitiva. Não será utilizado `service_role`, chave privilegiada ou bypass de RLS.

## 5. Contratos que deverão ser reutilizados

A inspeção confirmou a existência dos contratos necessários:

- `AuditEngagementRepository.getById`;
- `ClientRepository.getById`;
- `AcceptanceRepository.getById`;
- contexto atual de autenticação e autorização.

Não deverá ser criado repositório exclusivo para o painel. Qualquer lacuna descoberta deverá ser demonstrada antes de alteração e provocará interrupção para revisão se ultrapassar o escopo mínimo aprovado.

## 6. Arquivos autorizados nesta etapa

### 6.1 Arquivos novos

- `src/routes/trabalhos.$engagementId.tsx`;
- `src/features/engagements/EngagementDashboardPage.tsx`;
- `tests/features/engagementDashboardPage.test.ts`;
- `tests/features/engagementDashboardScope.test.ts`, somente se a separação dos testes for necessária.

### 6.2 Arquivos existentes

- contratos e repositórios de trabalho, cliente e aceitação, somente se uma lacuna de leitura for comprovada;
- implementações Supabase correspondentes, sob a mesma condição;
- testes diretamente relacionados aos contratos eventualmente alterados;
- `src/routeTree.gen.ts`, exclusivamente como resultado automático do gerador de rotas;
- documentos da PNL-001 e [[Situação do Projeto]], somente para registrar o resultado da etapa.

## 7. Fora do escopo

Esta etapa não autoriza:

- cabeçalho visual definitivo;
- cartões de informações gerais;
- ação **Abrir painel** na listagem de trabalhos;
- equipe, funções ou períodos;
- associação de usuários;
- módulos futuros;
- edição ou mudança de estado do trabalho;
- nova tabela, migration, política RLS ou permissão;
- alteração de autenticação ou ACL geral;
- alteração de `package.json`, lockfiles ou variáveis de ambiente;
- Lovable ou Lovable Cloud;
- Superpowers;
- publicação ou merge;
- início da Etapa 2.

## 8. Tratamento dos resultados

O comportamento deverá distinguir claramente:

- carregamento em andamento;
- trabalho encontrado e autorizado;
- trabalho inexistente;
- acesso negado;
- falha de leitura;
- cliente ou aceitação vinculados que não possam ser recuperados.

Nenhuma ausência deverá ser mascarada com dado fictício.

## 9. Verificações mínimas

Deverão existir testes para comprovar, no mínimo:

1. usuário autorizado acessa trabalho da própria organização;
2. ausência de `engagements.view` impede a leitura;
3. trabalho inexistente recebe tratamento próprio;
4. trabalho fora da organização não é exposto;
5. trabalho, cliente e aceitação são compostos pelos contratos existentes;
6. erro de uma das leituras é apresentado sem criar informação fictícia;
7. a rota continua protegida pelo fluxo atual de autenticação e autorização.

Além dos testes direcionados, deverão ser executados lint dos arquivos alterados e compilação local antes da conclusão técnica.

## 10. Critérios de conclusão

A Etapa 1 estará tecnicamente pronta para revisão quando:

- a rota protegida existir;
- a leitura composta funcionar com dados reais autorizados;
- os estados de carregamento, erro, inexistência e acesso negado estiverem tratados;
- nenhum arquivo fora do escopo tiver sido alterado;
- nenhum banco, migration, RLS, autenticação ou dependência tiver sido modificado;
- os testes direcionados, lint aplicável e compilação forem apresentados;
- o diff completo e a lista de arquivos forem submetidos à revisão.

## 11. Ponto obrigatório de parada

Ao concluir a implementação, o Codex deverá parar e apresentar:

- resumo do que foi implementado;
- lista completa de arquivos criados e alterados;
- contratos reutilizados;
- testes e resultados;
- limitações ou lacunas encontradas;
- confirmação de que não avançou para a Etapa 2.

Não haverá publicação, PR, merge ou avanço visual sem nova autorização do responsável pelo projeto.

## 12. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação da minuta operacional da Etapa 1 da PNL-001 | Substituída |
| 1.0 | 2026-08-06 | Aprovação da minuta operacional da Etapa 1 | Aprovada |
