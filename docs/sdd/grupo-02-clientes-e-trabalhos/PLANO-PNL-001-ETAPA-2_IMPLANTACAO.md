---
id: SIGA-PLN-PNL-001-E02
title: Plano de Implementação — PNL-001 Etapa 2 — Estrutura Visual Básica
aliases:
  - Plano PNL-001 Etapa 2
  - Plano da Estrutura Visual Básica
type: plano-implementacao
domain: clientes-e-trabalhos
status: minuta
version: 0.1
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
depends_on:
  - SIGA-PNL-001-E02
  - SIGA-PLN-PNL-001-E01
related:
  - "[[Constituição do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-PNL-001]]"
  - "[[Plano da PNL-001]]"
  - "[[PNL-001 Etapa 2]]"
  - "[[PNL-001 Etapa 1]]"
  - "[[Situação do Projeto]]"
obsidian:
  note_type: implementation-plan
  graph_role: operational
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - pnl-001
  - etapa-2
  - plano
  - implementacao
  - interface
  - codex
---

# Plano de Implementação — PNL-001 Etapa 2

## Estrutura Visual Básica

## 1. Finalidade

Este plano transforma a [[PNL-001 Etapa 2]] aprovada em uma execução técnica curta, controlada e verificável.

O plano autoriza somente a estrutura visual básica do painel do trabalho e a navegação da listagem para a rota já criada na Etapa 1.

Não autoriza equipe, períodos, associação de usuários, ações de ciclo de vida, persistência nova, integração com banco, uso do Lovable ou avanço para a Etapa 3.

Não serão criadas subcamadas ou novos desdobramentos. A Etapa 2 será executada como um único incremento fechado, com revisão ao final.

## 2. Estado anterior

Estão concluídos e integrados:

- [[PNL-001 Etapa 1]] — rota protegida e composição de leitura;
- carregamento de trabalho, cliente e aceitação;
- tratamento de carregamento, erro, inexistência e acesso não autorizado;
- testes técnicos da composição inicial;
- PR da Etapa 1 integrado à `main`.

A listagem de trabalhos já possui resumo em diálogo. Esse resumo deverá permanecer disponível durante esta etapa.

## 3. Responsável e ferramentas

- execução: Codex, localmente, em branch própria;
- revisão funcional: responsável pelo projeto;
- revisão técnica: Codex, por diff, testes e compilação;
- Lovable: não utilizado neste plano;
- Superpowers: não utilizado, reservado ao Grupo 07;
- GitHub: publicação somente após revisão e autorização específica.

## 4. Pré-condições

Antes de alterar qualquer arquivo:

1. confirmar a `main` atualizada com a Etapa 1 integrada;
2. registrar o estado do Git;
3. preservar alterações locais não relacionadas;
4. confirmar que a rota `/trabalhos/$engagementId` permanece funcionando;
5. inspecionar a listagem atual de trabalhos;
6. confirmar os componentes visuais já homologados;
7. confirmar que não será necessário banco, migration, ACL ou dependência;
8. interromper se o escopo visual exigir alteração estrutural fora desta lista.

## 5. Arquivos autorizados

### 5.1 Arquivos existentes

Alterar somente quando necessário para o escopo deste plano:

- `src/features/engagements/EngagementDashboardPage.tsx`;
- `src/features/engagements/EngagementsPage.tsx`;
- `src/features/engagements/engagementsPresentation.ts`, somente para rótulos ou textos;
- `tests/features/engagementDashboardPage.test.ts`;
- `tests/features/engagementDashboardScope.test.ts`;
- testes diretamente ligados à navegação, somente se necessários;
- documentação da PNL-001 e `docs/status/SITUACAO_DO_PROJETO.md`, somente ao registrar o resultado.

### 5.2 Arquivos novos

Não há novo arquivo de aplicação autorizado.

Um novo arquivo de teste somente poderá ser criado se os testes existentes não puderem cobrir a navegação ou a preservação do resumo, com justificativa expressa no relatório final.

### 5.3 Arquivos proibidos

Não alterar:

- `src/domain/`;
- `src/data/` e repositórios oficiais;
- `src/integrations/`;
- `src/config/navigation.ts`;
- `src/routes/`, salvo necessidade comprovada de metadados da rota existente;
- `src/routeTree.gen.ts`, pois não há nova rota nesta etapa;
- `package.json` ou lockfiles;
- autenticação, ACL, permissões ou contexto organizacional;
- Supabase, migrations, RLS, tabelas, views, RPCs ou variáveis de ambiente;
- `supabase/.temp/`;
- Lovable Cloud;
- módulos dos Grupos 03 a 07.

## 6. Escopo autorizado

### 6.1 Cabeçalho do painel

Organizar visualmente:

- título;
- código;
- cliente;
- estado;
- classificação, quando disponível;
- ação de retorno à listagem.

Deverão ser utilizados os componentes visuais existentes, sem criar um segundo sistema de design.

### 6.2 Informações gerais

Organizar em blocos ou seções os dados já carregados na Etapa 1:

- cliente;
- aceitação relacionada;
- classificação;
- estado;
- data de criação;
- última atualização;
- escopo preliminar.

Não criar contagens, gráficos, indicadores ou dados de preenchimento.

### 6.3 Ação Abrir painel

Adicionar à listagem uma ação clara, preferencialmente **Abrir painel**, que:

- use o identificador oficial do trabalho;
- navegue para `/trabalhos/$engagementId`;
- respeite `engagements.view`;
- preserve o botão **Ver resumo**;
- não altere editar, encerrar ou cancelar;
- não grave dados.

### 6.4 Responsividade e rolagem

Garantir:

- leitura em computador desktop;
- rolagem vertical quando necessária;
- ausência de corte de conteúdo;
- comportamento aceitável em largura reduzida;
- ausência de sobreposição entre cabeçalho, blocos e ações;
- preservação do tema escuro.

## 7. Sequência fechada de execução

### Passo 1 — Inspeção da base

Confirmar:

- branch originada da `main` atual;
- estado do Git;
- rota existente;
- componentes reutilizáveis;
- comportamento atual da listagem;
- testes já disponíveis.

Se a inspeção revelar necessidade de alteração de contrato, banco, autorização ou dependência, interromper e apresentar o bloqueio.

### Passo 2 — Estrutura visual do painel

Implementar o cabeçalho e os blocos de informações gerais usando exclusivamente os dados já carregados.

Não incluir equipe, períodos, associação, ações de ciclo de vida ou áreas funcionais futuras.

### Passo 3 — Navegação controlada

Adicionar **Abrir painel** à listagem, mantendo o resumo atual e garantindo retorno claro à listagem.

Testar acesso direto pela URL e navegação iniciada pela listagem.

### Passo 4 — Responsividade

Verificar a composição em desktop e largura reduzida, corrigindo somente problemas de hierarquia, overflow, corte ou rolagem dentro dos arquivos autorizados.

### Passo 5 — Verificações

Executar os testes, lint aplicável e compilação local definidos neste plano.

### Passo 6 — Gate de revisão

Parar antes de publicar a branch e apresentar o diff completo, a lista de arquivos e os resultados.

## 8. Testes mínimos

Deverão ser verificados:

1. usuário autorizado acessa o painel;
2. usuário sem `engagements.view` recebe acesso negado;
3. trabalho de outra organização não é revelado;
4. trabalho inexistente recebe estado apropriado;
5. cabeçalho apresenta trabalho, cliente e estado corretos;
6. informações gerais correspondem aos contratos oficiais;
7. **Abrir painel** usa o identificador correto;
8. retorno para a listagem funciona;
9. resumo atual continua disponível;
10. ações de edição, encerramento e cancelamento não são alteradas;
11. ausência de dados não gera conteúdo fictício;
12. rolagem funciona em desktop e largura reduzida;
13. não houve escrita ou alteração persistente.

## 9. Verificações locais

Ao final, executar:

- testes direcionados da PNL-001;
- suíte existente, quando proporcional;
- lint dos arquivos afetados;
- compilação local de produção;
- conferência do diff;
- conferência da lista completa de arquivos alterados;
- conferência de que não houve arquivo fora do escopo.

Falha de build, alteração fora da lista ou necessidade de ampliar o escopo interrompe a execução.

## 10. Validação visual pelo responsável

O responsável deverá verificar:

- identificação inequívoca do trabalho;
- cliente e estado legíveis;
- hierarquia visual;
- navegação de ida e volta;
- preservação do resumo;
- ausência de botões indevidos;
- tema escuro;
- rolagem no desktop;
- comportamento em largura reduzida;
- ausência de corte ou sobreposição.

A validação visual não autoriza automaticamente publicação ou merge.

## 11. Critérios de conclusão

A Etapa 2 estará pronta para revisão quando:

- o cabeçalho estiver disponível;
- as informações gerais estiverem organizadas;
- **Abrir painel** funcionar;
- o retorno funcionar;
- o resumo permanecer disponível;
- a rota e as permissões continuarem protegidas;
- a rolagem e a responsividade forem verificadas;
- testes, lint e build forem apresentados;
- nenhum arquivo proibido tiver sido alterado;
- banco, Supabase, migrations, ACL, autenticação e dependências permanecerem intactos;
- equipe, períodos e Etapa 3 não tiverem sido iniciados.

## 12. Ponto obrigatório de parada

Ao concluir, o Codex deverá apresentar:

- resumo da implementação;
- arquivos criados e alterados;
- contratos reutilizados;
- testes e resultados;
- limitações e falhas preexistentes;
- confirmação de preservação do resumo;
- confirmação de que não usou Lovable ou Superpowers;
- confirmação de que não alterou banco, Supabase, autenticação, ACL, dependências ou Cloud.

Não haverá publicação, PR, merge ou avanço para a Etapa 3 sem autorização posterior.

## 13. Próximo passo após aprovação deste plano

Criar uma branch própria a partir da `main` atualizada, executar o Passo 1 — Inspeção da base — e iniciar a implementação local da Etapa 2.

Ao primeiro bloqueio real, parar e solicitar decisão. Não criar subcamadas para contornar bloqueios.

## 14. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação do plano restritivo da Etapa 2 da PNL-001 | Em revisão |
