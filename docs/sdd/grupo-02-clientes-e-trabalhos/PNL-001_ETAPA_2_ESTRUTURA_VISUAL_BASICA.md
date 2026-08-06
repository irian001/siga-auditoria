---
id: SIGA-PNL-001-E02
title: PNL-001 — Etapa 2 — Estrutura Visual Básica
aliases:
  - PNL-001 Etapa 2
  - Estrutura Visual Básica do Painel
type: autorizacao-operacional
domain: clientes-e-trabalhos
status: minuta
version: 0.1
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
depends_on:
  - SIGA-PNL-001-E01
related:
  - "[[Constituição do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-PNL-001]]"
  - "[[Plano da PNL-001]]"
  - "[[PNL-001 Etapa 1]]"
  - "[[Situação do Projeto]]"
obsidian:
  note_type: implementation-stage
  graph_role: operational
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - pnl-001
  - etapa-2
  - painel
  - trabalhos
  - interface
---

# PNL-001 — Etapa 2 — Estrutura Visual Básica

## 1. Finalidade

Esta minuta delimita a segunda das quatro etapas fechadas da [[PNL-001]].

Seu objetivo é transformar a base técnica da [[PNL-001 Etapa 1]] em uma primeira estrutura visual utilizável do painel do trabalho, preservando os contratos de leitura, a autorização existente e o resumo já disponível na listagem.

Esta etapa não cria uma nova camada de desenvolvimento. Também não autoriza a integração da equipe, períodos, ações de associação, módulos futuros ou qualquer persistência nova.

## 2. Pré-condições

Antes de iniciar, deverá estar confirmado que:

- a Etapa 1 foi revisada e homologada;
- o PR da Etapa 1 foi integrado à `main`;
- a rota `/trabalhos/$engagementId` está disponível;
- os contratos de trabalho, cliente e aceitação continuam funcionando;
- não há alteração local alheia a ser incorporada;
- o escopo desta etapa foi aprovado pelo responsável do projeto.

## 3. Objetivo autorizado

Implementar somente:

1. cabeçalho visual próprio do painel;
2. identificação clara do código e título do trabalho;
3. identificação do cliente e do estado atual;
4. apresentação organizada das informações gerais já carregadas;
5. apresentação organizada do escopo preliminar;
6. ação **Abrir painel** na listagem de trabalhos, quando o usuário possuir `engagements.view`;
7. navegação da listagem para o painel pelo identificador do trabalho;
8. ação clara de retorno à listagem;
9. preservação do resumo atual da listagem;
10. responsividade em desktop e largura reduzida;
11. rolagem funcional quando o conteúdo ultrapassar a altura da tela;
12. preservação do tema escuro e dos componentes visuais já homologados.

## 4. Escopo visual fechado

### 4.1 Cabeçalho

O painel deverá apresentar, no mínimo:

- título do trabalho;
- código do trabalho;
- cliente relacionado;
- estado atual;
- classificação, quando já disponível no contrato;
- ação de retorno para a listagem.

O cabeçalho não deverá criar indicadores, números ou informações que não venham dos contratos oficiais.

### 4.2 Informações gerais

Deverão ser organizados visualmente os dados já disponíveis da Etapa 1:

- código;
- título;
- cliente;
- aceitação relacionada;
- classificação;
- estado;
- data de criação;
- data da última atualização;
- escopo preliminar.

Os dados poderão ser distribuídos em blocos, cartões ou seções, desde que a composição permaneça simples e legível.

### 4.3 Ação na listagem

A listagem de trabalhos deverá receber uma ação explícita, preferencialmente denominada **Abrir painel**.

Essa ação deverá:

- aparecer somente para usuário que possa consultar o trabalho;
- navegar para `/trabalhos/$engagementId`;
- utilizar o identificador oficial do trabalho;
- não remover o botão ou diálogo de resumo já existente;
- não alterar ações de edição, encerramento ou cancelamento.

### 4.4 Retorno

O painel deverá oferecer retorno claro à listagem de trabalhos.

O retorno não deverá apagar dados, alterar estado, iniciar nova consulta de escrita ou modificar o trabalho.

## 5. Regras de acesso

A Etapa 2 deverá preservar integralmente as regras da Etapa 1:

- sessão autenticada;
- vínculo organizacional ativo;
- autorização ativa;
- permissão `engagements.view`;
- trabalho pertencente à organização atual;
- RLS e contratos oficiais como barreiras definitivas.

Não deverá ser criada nova permissão nesta etapa.

O frontend não poderá ser tratado como fonte única de autorização.

## 6. Fontes e contratos autorizados

Deverão ser reutilizados os contratos já existentes para:

- trabalho;
- cliente;
- aceitação;
- autenticação;
- autorização;
- organização atual.

Não deverá ser criado repositório exclusivo para o painel, tabela agregadora, view, RPC, migration ou armazenamento específico.

## 7. Arquivos autorizados

### 7.1 Arquivos existentes

Poderão ser alterados somente quando necessário para este escopo:

- `src/features/engagements/EngagementDashboardPage.tsx`;
- `src/features/engagements/EngagementsPage.tsx`;
- `src/features/engagements/engagementsPresentation.ts`, somente para rótulos ou textos da navegação;
- `src/routes/trabalhos.$engagementId.tsx`, somente se necessário para metadados ou integração da rota;
- testes diretamente relacionados ao painel e à navegação;
- `src/routeTree.gen.ts`, somente como resultado automático do gerador de rotas;
- documentação da PNL-001 e `docs/status/SITUACAO_DO_PROJETO.md`, somente para registrar o resultado da etapa.

### 7.2 Arquivos novos

Não há arquivo de aplicação novo previamente autorizado nesta minuta.

Um novo arquivo somente poderá ser criado se a necessidade for demonstrada, permanecer estritamente dentro do escopo visual e for aprovada antes da implementação.

## 8. Fora do escopo

Esta etapa não autoriza:

- equipe, funções ou períodos;
- associação de usuários;
- criação, edição ou exclusão de dados;
- edição, encerramento ou cancelamento do trabalho;
- alteração da aceitação;
- CRUD de usuários, funções ou períodos;
- planejamento da auditoria;
- balancete, materialidade, riscos ou procedimentos;
- documentos, evidências, papéis, achados ou relatórios;
- módulos futuros funcionais;
- indicadores, gráficos ou contagens fictícias;
- nova tabela, migration, RLS, RPC ou permissão;
- alteração de autenticação ou ACL;
- alteração de dependências, lockfiles ou variáveis de ambiente;
- ativação do Lovable Cloud;
- uso do Lovable nesta etapa, salvo autorização específica posterior;
- uso de Superpowers;
- publicação, PR ou merge como parte da execução desta minuta;
- avanço para a Etapa 3.

## 9. Restrições para Codex e Lovable

### 9.1 Codex

O Codex deverá:

- trabalhar localmente em branch própria;
- inspecionar o estado do Git antes de alterar arquivos;
- preservar alterações locais não relacionadas;
- reutilizar os componentes visuais existentes;
- evitar reescrever a rota e os contratos da Etapa 1;
- executar testes, lint aplicável e compilação;
- parar ao concluir o escopo visual;
- informar todos os arquivos criados e alterados.

### 9.2 Lovable

O Lovable não será utilizado automaticamente nesta etapa.

Se sua utilização for autorizada posteriormente, deverá receber prompt próprio e restritivo, com lista explícita de arquivos permitidos, arquivos proibidos, proibição de Supabase, autenticação, ACL, dependências, módulos futuros e ponto obrigatório de parada.

## 10. Estados e comportamento visual

Deverão permanecer tratados:

- carregamento;
- acesso não autorizado;
- trabalho inexistente;
- erro de consulta;
- painel pronto;
- dados opcionais ausentes;
- largura reduzida;
- tela desktop;
- conteúdo maior que a altura disponível.

A composição visual não deverá mascarar erros nem apresentar ausência de dados como informação válida.

## 11. Critérios de validação visual

O responsável pelo projeto deverá verificar:

- identificação inequívoca do trabalho;
- leitura clara do cliente e do estado;
- hierarquia das informações;
- coerência do cabeçalho;
- clareza do escopo preliminar;
- navegação de ida e volta;
- preservação do resumo atual;
- ausência de ações não autorizadas;
- ausência de dados fictícios;
- tema escuro preservado;
- rolagem funcionando em computador desktop;
- comportamento aceitável em largura reduzida;
- ausência de sobreposição ou corte de conteúdo.

## 12. Verificações técnicas mínimas

Antes de considerar a etapa pronta para revisão, deverão ser executados:

1. testes do painel;
2. teste de navegação para o painel;
3. teste de permissão `engagements.view`;
4. teste de trabalho de outra organização;
5. teste de trabalho inexistente;
6. teste de preservação do resumo existente;
7. lint dos arquivos afetados;
8. compilação local de produção.

O resultado deverá indicar claramente qualquer falha preexistente não causada pela etapa.

## 13. Critérios de conclusão

A Etapa 2 estará pronta para homologação quando:

- o cabeçalho visual estiver disponível;
- as informações gerais estiverem organizadas;
- a ação **Abrir painel** funcionar na listagem;
- o retorno à listagem funcionar;
- o resumo atual permanecer disponível;
- a rota continuar protegida;
- a rolagem funcionar em desktop e largura reduzida;
- nenhum arquivo proibido tiver sido alterado;
- não houver alteração em banco, Supabase, migrações, ACL, autenticação ou dependências;
- testes, lint aplicável e build forem apresentados;
- o diff e a lista de arquivos forem submetidos à revisão.

## 14. Ponto obrigatório de parada

Ao concluir a implementação, o Codex deverá parar e apresentar:

- resumo da estrutura visual criada;
- lista completa de arquivos criados e alterados;
- contratos reutilizados;
- testes e resultados;
- limitações ou lacunas;
- confirmação de que equipe, períodos e Etapa 3 não foram iniciados;
- confirmação de que não houve alteração em banco, Supabase, autenticação, ACL, dependências ou Lovable Cloud.

Não haverá publicação, PR, merge ou avanço para a Etapa 3 sem nova autorização do responsável pelo projeto.

## 15. Decisão solicitada

Solicita-se a revisão e aprovação desta minuta para, somente depois, elaborar o plano restritivo de implementação da Etapa 2.

A aprovação desta minuta não autoriza código, alteração de arquivos, uso do Lovable, publicação ou merge.

## 16. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação da minuta operacional da Etapa 2 da PNL-001 | Em revisão |
