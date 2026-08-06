---
id: SIGA-EQP-001-C3-PLAN-001
title: Plano Restritivo — EQP-001 Camada 3 — Consulta da Equipe e dos Períodos
aliases:
  - Plano da Camada 3 da EQP-001
  - Plano de Consulta da Equipe e dos Períodos
type: implementation-plan
domain: equipe-funcoes-periodos
group: grupo-02-clientes-e-trabalhos
status: aprovado
version: 1.0
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
obsidian:
  note_type: implementation-plan
  graph_role: satellite
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[SDD-EQP-001]]"
  - "[[EQP-001_CAMADA_3_CONSULTA_EQUIPE_PERIODOS]]"
  - "[[EQP-001_GATE_C_CONCLUSAO]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[SDD-TRB-001]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
tags:
  - siga
  - sdd
  - eqp-001
  - camada-3
  - plano-restritivo
  - consulta
  - supabase
  - rls
---

# PLANO RESTRITIVO — EQP-001 CAMADA 3

## Consulta da Equipe e dos Períodos

## 1. Finalidade

Este plano transforma a minuta aprovada da [[EQP-001_CAMADA_3_CONSULTA_EQUIPE_PERIODOS]] em uma execução única, controlada e verificável.

O objetivo é criar a estrutura mínima para consultar equipe e períodos de um [[Trabalho de Auditoria]], sem habilitar associação, manutenção, criação de período ou qualquer CRUD.

Não haverá novas subdivisões com aprovação própria dentro deste plano.

## 2. Decisões fechadas para a execução

### 2.1 Estratégia

Será adotada a Alternativa A:

- criar a estrutura física mínima;
- aplicar RLS e isolamento multiempresa;
- implementar contratos de leitura;
- apresentar dados existentes ou estados vazios;
- não inserir dados artificiais;
- não disponibilizar comandos de escrita.

### 2.2 Permissão

Será reutilizada a permissão existente `engagements.view`.

Não será criada nova permissão, não será ampliada a ACL e não será usado `engagements.manage` apenas para consulta.

### 2.3 Escopo das funções

`engagement_roles` será tratado como catálogo pertencente à organização usuária, conforme o [[Modelo de Dados do SIGA]].

Esta execução não definirá catálogo inicial, não fará seed de funções e não criará tela de administração. A ausência de funções cadastradas deverá produzir estado vazio, sem dado fictício.

### 2.4 Participações

As participações existentes serão somente consultadas. A Camada 3 não decidirá estados, não impedirá duplicidade por comando de escrita e não alterará vigência.

### 2.5 Períodos

Será permitida a consulta de zero ou vários períodos existentes para o trabalho.

Esta camada verificará apenas a coerência estrutural mínima da leitura. Regras de criação, alteração, encerramento e sobreposição ficam reservadas às camadas próprias posteriores.

### 2.6 Histórico

Não será criada tabela de histórico nem serão gerados eventos de alteração. A consulta exibirá o estado persistido dos registros existentes.

### 2.7 Interface e Lovable

A interface será implementada localmente e de forma controlada pelo Codex.

O Lovable não será acionado neste plano. Qualquer uso futuro exigirá autorização separada, prompt fechado e lista de arquivos própria.

Superpowers não será utilizado. A skill formal de testes permanece reservada ao Grupo 07.

## 3. Resultado esperado

No detalhe/consulta de um trabalho, um usuário autorizado deverá visualizar:

- participantes conhecidos;
- função de cada participante, quando houver;
- situação e vigência da participação;
- períodos registrados;
- datas e situação dos períodos;
- estado vazio quando não houver dados;
- erro de autorização ou falha de consulta de forma compreensível.

O resultado deverá ser somente leitura e não poderá parecer uma tela de associação ou manutenção.

## 4. Estrutura física autorizada

A implementação poderá criar somente estas três tabelas no schema `public`:

### `engagement_roles`

Campos mínimos:

- `id uuid primary key`;
- `organization_id uuid not null`;
- `code text not null`;
- `name text not null`;
- `description text`;
- `status text not null`;
- campos de auditoria compatíveis com o padrão existente, se necessários.

Regras mínimas:

- FK para `organizations`;
- unicidade de `organization_id` e `code`;
- índice por organização e situação;
- nenhum seed de função nesta camada.

### `engagement_team_members`

Campos mínimos:

- `id uuid primary key`;
- `organization_id uuid not null`;
- `engagement_id uuid not null`;
- `membership_id uuid not null`;
- `engagement_role_id uuid not null`;
- `active_from date not null`;
- `active_to date`;
- `status text not null`;
- campos de auditoria compatíveis com o padrão existente, se necessários.

Regras mínimas:

- FK contextual para o trabalho;
- FK contextual para o membership;
- FK contextual para a função;
- índices por trabalho e situação;
- índice por membership;
- preservação da organização em todos os relacionamentos.

As regras de associação, duplicidade ativa e transição de estado não serão implementadas nesta camada.

### `engagement_periods`

Campos mínimos:

- `id uuid primary key`;
- `organization_id uuid not null`;
- `engagement_id uuid not null`;
- `label text not null`;
- `start_date date not null`;
- `end_date date`;
- `status text not null`;
- campos de auditoria compatíveis com o padrão existente, se necessários.

Regras mínimas:

- FK contextual para o trabalho;
- `start_date` não poderá ser posterior a `end_date`;
- índice por trabalho, situação e datas;
- nenhum bloqueio de sobreposição nesta camada;
- nenhum registro será criado automaticamente.

## 5. Segurança do Supabase

A migration deverá:

- habilitar RLS nas três tabelas;
- permitir somente `SELECT` para `authenticated` autorizado;
- restringir a linha à organização do contexto;
- exigir `private.has_acl_permission('engagements.view', organization_id)`;
- não conceder `INSERT`, `UPDATE` ou `DELETE` à aplicação;
- não expor `anon`;
- não consultar `auth.users` pela aplicação;
- não usar `service_role` ou chave secreta no navegador;
- evitar novas funções `security definer` quando o helper existente for suficiente;
- verificar a exposição da Data API e conceder somente o acesso de leitura necessário, se aplicável.

As políticas deverão ser escritas com `TO authenticated` e predicado de autorização real. Não será usada autenticação isolada como substituto de autorização.

## 6. Lista fechada de arquivos

Nenhum arquivo fora desta lista poderá ser criado, alterado, removido ou renomeado.

### 6.1 Documentação

- `docs/sdd/grupo-02-clientes-e-trabalhos/PLANO-EQP-001-CAMADA-3_CONSULTA_EQUIPE_PERIODOS.md` — este plano;
- `docs/sdd/grupo-02-clientes-e-trabalhos/EQP-001_CAMADA_3_CONSULTA_EQUIPE_PERIODOS.md` — atualização após conclusão;
- `docs/sdd/grupo-02-clientes-e-trabalhos/EQP-001_CAMADA_3_CONCLUSAO.md` — novo relatório final da camada;
- `docs/status/SITUACAO_DO_PROJETO.md` — atualização do próximo passo, somente após homologação.

### 6.2 Domínio e dados

- `src/domain/engagementTeam.ts` — novo contrato de leitura;
- `src/data/engagementTeamRepository.ts` — novo contrato de repositório;
- `src/data/mockEngagementTeamRepository.ts` — implementação controlada para testes e estados vazios;
- `src/data/supabase/supabaseEngagementTeamRepository.ts` — adaptador oficial somente leitura.

### 6.3 Interface

- `src/features/engagements/EngagementTeamPeriodsReadOnly.tsx` — novo componente somente leitura;
- `src/features/engagements/EngagementsPage.tsx` — integração limitada ao diálogo de consulta existente.

Não será alterado o formulário de trabalho, o fluxo de status, a navegação, a autenticação, o painel ou qualquer módulo de outra SDD.

### 6.4 Testes

- `tests/domain/engagementTeam.test.ts`;
- `tests/data/engagementTeamRepository.test.ts`;
- `tests/data/supabaseEngagementTeamRepository.test.ts`;
- `tests/features/engagementTeamPeriodsReadOnly.test.ts`.

### 6.5 Migration

Será criada uma única migration pelo mecanismo oficial do Supabase, usando nome descritivo equivalente a:

`*_eqp_engagement_team_periods_readonly.sql`

O prefixo temporal será gerado pela ferramenta oficial. Não será inventado manualmente. Nenhuma outra migration será autorizada neste plano.

O arquivo de migration deverá conter somente as três tabelas, constraints, índices, RLS, grants necessários e comentários relacionados a esta camada.

## 7. Sequência de execução

A execução será uma única entrega controlada, nesta ordem:

1. confirmar que a branch está limpa, exceto alterações preexistentes explicitamente registradas;
2. criar a migration oficial com as três tabelas e RLS;
3. criar contratos de domínio e repositório;
4. implementar mock e adaptador Supabase somente leitura;
5. integrar o componente ao diálogo de consulta do trabalho;
6. executar testes, lint e build;
7. validar as tabelas e políticas no Supabase oficial;
8. revisar diff e confirmar a lista fechada de arquivos;
9. publicar branch e abrir PR;
10. aguardar homologação autenticada e aprovação antes do merge.

Nenhum passo autoriza associação, criação de função, criação de período ou ativação do Lovable.

## 8. Critérios de teste

### 8.1 Contrato e mock

- trabalho válido retorna equipe e períodos;
- ausência de dados retorna coleções vazias;
- campos são mapeados sem perda;
- contexto ausente produz erro de autorização;
- nenhum método de escrita existe no contrato.

### 8.2 Adaptador Supabase

- consulta filtra `organization_id`;
- consulta filtra `engagement_id`;
- participante, membership e função são relacionados corretamente;
- períodos são relacionados ao trabalho correto;
- erros de autorização são tratados;
- tabela ausente produz erro de configuração claro, sem fallback silencioso para dado fictício.

### 8.3 RLS e isolamento

- usuário autorizado consulta apenas sua organização;
- usuário sem `engagements.view` não consulta;
- trabalho de outra organização não retorna equipe nem período;
- usuário anônimo não consulta;
- `INSERT`, `UPDATE` e `DELETE` não estão disponíveis para o papel da aplicação;
- nenhuma credencial ou dado de `auth.users` é retornado.

### 8.4 Interface

- consulta exibe as duas seções separadas;
- estado vazio é claro;
- não há botões de inclusão, edição ou exclusão;
- trabalho terminal continua somente leitura;
- falha de consulta é informada sem expor detalhes sensíveis;
- tema visual existente é preservado.

## 9. Verificações obrigatórias antes do PR

Deverão ser apresentados:

- lista dos arquivos alterados;
- diff revisado;
- testes direcionados aprovados;
- lint direcionado aprovado;
- build local aprovado;
- nome e conteúdo da migration;
- tabelas e RLS confirmados no Supabase oficial;
- teste autenticado de leitura;
- teste de isolamento entre organizações;
- confirmação de que não houve escrita, Lovable Cloud, nova ACL ou alteração em outro módulo.

## 10. Critérios de parada

A execução deverá parar sem contornar o problema se ocorrer:

- necessidade de nova permissão;
- necessidade de `service_role` no cliente;
- impossibilidade de aplicar RLS sem função privilegiada não prevista;
- conflito entre o modelo de dados e o schema existente;
- necessidade de criar dados artificiais para a tela parecer preenchida;
- tentativa de alterar associação ou período;
- tentativa do Lovable de editar arquivos fora da lista;
- erro de isolamento entre organizações;
- necessidade de alterar `src/routeTree.gen.ts` ou outro arquivo fora da lista;
- necessidade de criar uma quarta tabela ou segunda migration.

## 11. Definição de pronto

A Camada 3 estará pronta somente quando:

- a consulta real estiver disponível para dados existentes;
- os estados vazios funcionarem sem dados artificiais;
- as tabelas possuírem RLS validada;
- não houver operações de escrita expostas;
- os testes técnicos passarem;
- a interface estiver limitada à consulta;
- o PR estiver revisado;
- a homologação autenticada estiver registrada;
- o responsável aprovar o merge.

## 12. Próximo passo

Este plano está apresentado para aprovação. Após sua aprovação, será executada a única entrega da Camada 3 conforme a lista fechada acima.

Nenhuma implementação será iniciada antes dessa aprovação.

## 13. Navegação

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- [[SDD-EQP-001]]
- [[EQP-001_CAMADA_3_CONSULTA_EQUIPE_PERIODOS]]
- [[EQP-001_GATE_C_CONCLUSAO]]
- [[Modelo de Dados do SIGA]]
- [[SDD-TRB-001]]
- [[Plano Mestre das SDDs do MVP do SIGA]]

## 14. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação do plano restritivo único da Camada 3 | Substituída |
| 1.0 | 2026-08-06 | Plano aprovado para execução única e controlada | Aprovada |
