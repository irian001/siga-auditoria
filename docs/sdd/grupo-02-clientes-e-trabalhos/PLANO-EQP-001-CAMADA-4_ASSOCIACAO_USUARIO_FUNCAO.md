---
id: SIGA-PLN-EQP-001-C4
title: Plano Restritivo — EQP-001 Camada 4 — Associação de Usuário e Função
aliases:
  - Plano da Camada 4 da EQP-001
  - Plano de associação de equipe
type: implementation-plan
domain: equipe-funcoes-periodos
group: grupo-02-clientes-e-trabalhos
status: aprovado
version: 1.0
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
approval_required: true
obsidian:
  note_type: implementation-plan
  graph_role: satellite
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[SDD-EQP-001]]"
  - "[[EQP-001_CAMADA_4_ASSOCIACAO_USUARIO_FUNCAO]]"
  - "[[EQP-001_CAMADA_3_CONCLUSAO]]"
  - "[[PLANO-EQP-001_IMPLANTACAO]]"
  - "[[SDD-TRB-001]]"
  - "[[Situação do Projeto]]"
tags:
  - siga
  - plano
  - eqp-001
  - camada-4
  - associacao
  - equipe
  - rls
  - acl
---

# PLANO RESTRITIVO — EQP-001 CAMADA 4

## Associação de usuário elegível e função válida

## 1. Finalidade

Este plano transforma a minuta aprovada da [[EQP-001_CAMADA_4_ASSOCIACAO_USUARIO_FUNCAO]] em uma execução única, controlada e verificável.

Ele autoriza somente a preparação e, após nova aprovação, a implementação da associação de um usuário elegível a um trabalho com uma função válida.

Não haverá novas subdivisões, subcamadas ou planos intermediários dentro desta execução.

## 2. Estado anterior

A Camada 3 foi homologada e está integrada à `main` pelo PR #44.

Ela fornece consulta somente leitura de:

- participantes;
- funções;
- situações;
- vigências;
- períodos.

A Camada 4 acrescentará uma operação de escrita controlada, sem alterar o escopo da Camada 3.

## 3. Objetivo fechado

Implementar o fluxo para:

1. carregar usuários elegíveis da organização atual;
2. carregar funções válidas disponíveis no contexto organizacional;
3. selecionar um trabalho aberto;
4. selecionar um usuário elegível;
5. selecionar uma função válida;
6. confirmar a associação;
7. criar uma participação ativa;
8. atualizar a consulta da equipe;
9. apresentar sucesso ou erro compreensível.

## 4. Decisão de implementação

Será utilizada uma operação atômica de associação no ambiente oficial, com validação no banco e no domínio.

A operação deverá:

- confirmar sessão autenticada;
- confirmar que a organização do contexto corresponde à organização solicitada;
- exigir `engagements.manage`;
- verificar que o trabalho pertence à organização;
- bloquear trabalhos `closed` ou `cancelled`;
- verificar usuário elegível, membership vigente e perfil ativo;
- verificar função ativa pertencente à organização;
- impedir participação ativa duplicada;
- gravar somente os campos permitidos;
- retornar o registro criado ou erro classificado.

O mecanismo principal será `INSERT` direto protegido por uma política RLS `WITH CHECK`, com grant de `INSERT` somente para `authenticated` e validação completa no banco. Não será criada RPC pública nem será concedida escrita ampla à tabela.

Se a RLS existente impedir a validação cruzada de membership, perfil, função ou trabalho, poderá ser criado somente um helper mínimo no schema privado, com `SECURITY DEFINER`, `search_path` controlado, autenticação explícita e execução restrita. Esse helper será usado pela política RLS e não será exposto como endpoint público. A necessidade deverá ser comprovada antes da criação.

## 5. Permissão e segurança

Será reutilizada a permissão existente `engagements.manage`.

Não será criada nova permissão nesta camada.

A autorização deverá ser aplicada em três pontos:

1. interface: ocultar ou desabilitar a ação quando o usuário não puder administrar;
2. domínio/repositório: rejeitar a operação sem contexto autorizado;
3. banco: impedir chamada ou gravação sem ACL e isolamento válidos.

A função atribuída no trabalho não concederá permissão de acesso ao sistema.

## 6. Modelo de dados

Será reutilizada a tabela `public.engagement_team_members` criada na Camada 3.

O novo registro deverá utilizar:

- `organization_id` do contexto validado;
- `engagement_id` do trabalho selecionado;
- `membership_id` do usuário elegível;
- `engagement_role_id` da função válida;
- `active_from` igual à data de início aprovada, com padrão controlado quando aplicável;
- `active_to` nulo;
- `status` igual a `active`.

Será criada, se confirmada pela inspeção final, uma única proteção de duplicidade ativa por organização, trabalho e membership. A associação não deverá depender do nome ou e-mail do usuário.

Não serão criadas tabelas novas, catálogo automático de funções, períodos, histórico completo ou seed de dados nesta camada.

## 7. Regras de negócio obrigatórias

### 7.1 Usuário elegível

O usuário deverá:

- existir no diretório da organização;
- possuir perfil ativo;
- possuir membership ativa;
- estar dentro da vigência do membership;
- pertencer à mesma organização do trabalho.

### 7.2 Função válida

A função deverá:

- existir em `engagement_roles`;
- pertencer à mesma organização;
- estar ativa;
- possuir identificador selecionado da lista oficial.

Se não houver funções ativas cadastradas, a tela deverá apresentar estado vazio e não deverá criar função automaticamente.

### 7.3 Trabalho elegível

O trabalho deverá:

- existir;
- pertencer à organização atual;
- estar em estado não terminal;
- permitir alteração de equipe conforme a regra aprovada.

### 7.4 Duplicidade

Não será permitida outra participação ativa do mesmo usuário no mesmo trabalho.

O erro deverá ser tratado de forma compreensível, sem expor detalhes internos do banco.

### 7.5 Idempotência

O envio duplicado do formulário deverá ser bloqueado na interface e também rejeitado com segurança no banco.

## 8. Comportamento da interface

A interface poderá incluir a ação `Adicionar participante` na área de equipe já existente.

Deverá:

- aparecer somente para `engagements.manage`;
- apresentar usuários e funções em listas oficiais;
- impedir seleção vazia;
- mostrar trabalho atual e organização atual;
- permitir cancelar e fechar;
- bloquear duplo envio;
- atualizar a lista após sucesso;
- mostrar estado vazio sem criar dados artificiais;
- mostrar erros de autorização, conflito e configuração;
- preservar o tema visual e a rolagem global de diálogos.

Não será criada uma página independente de administração de usuários ou funções.

## 9. Arquivos autorizados

### 9.1 Arquivos existentes que poderão ser alterados

- `src/domain/engagementTeam.ts`;
- `src/data/engagementTeamRepository.ts`;
- `src/data/mockEngagementTeamRepository.ts`;
- `src/data/supabase/supabaseEngagementTeamRepository.ts`;
- `src/features/engagements/EngagementTeamPeriodsReadOnly.tsx`;
- `src/features/engagements/EngagementsPage.tsx`;
- `tests/domain/engagementTeam.test.ts`;
- `tests/data/engagementTeamRepository.test.ts`;
- `tests/data/supabaseEngagementTeamRepository.test.ts`;
- `tests/features/engagementTeamPeriodsReadOnly.test.ts`.

### 9.2 Arquivos novos permitidos

- `src/features/engagements/EngagementTeamMemberAssignment.tsx`;
- `tests/features/engagementTeamMemberAssignment.test.ts`;
- uma única migration `supabase/migrations/<timestamp>_eqp_engagement_team_assignment.sql`.

O nome temporal deverá ser gerado pela ferramenta oficial no momento da implementação. Não deverá ser inventado manualmente.

### 9.3 Arquivos proibidos

Não poderão ser alterados:

- `src/domain/authorization.ts`, salvo decisão específica sobre permissão já existente;
- `src/data/supabase/supabaseAuthorizationRepository.ts`;
- `src/data/supabase/supabaseClient.ts`;
- autenticação;
- ACL geral;
- `src/routes/`;
- `src/routeTree.gen.ts`;
- `src/config/navigation.ts`;
- módulos de clientes, aceitação e períodos;
- `package.json` e lockfile;
- migrations anteriores;
- `supabase/.temp/`;
- Lovable Cloud;
- qualquer arquivo fora da lista fechada.

## 10. Migration e banco

A migration única poderá conter somente:

- índice ou constraint de duplicidade ativa;
- política RLS de `INSERT` com `WITH CHECK`;
- helper mínimo no schema privado, somente se a validação cruzada exigir bypass controlado de RLS;
- grants e revogações estritamente necessários;
- comentários da Camada 4;
- nenhum seed.

Antes da aplicação no Supabase oficial deverão ser apresentados:

- SQL completo;
- justificativa de segurança;
- comportamento de autorização;
- estratégia de reversão;
- impacto nas tabelas existentes.

Se for necessário alterar ACL geral, criar nova permissão, criar RPC pública ou conceder escrita ampla, a execução deverá parar.

## 11. Testes mínimos

Deverão ser verificados:

- associação válida;
- usuário sem `users.view` não aparece no diretório;
- usuário de outra organização é bloqueado;
- membership pendente, inativa ou expirada é bloqueada;
- perfil inativo é bloqueado;
- função inexistente é bloqueada;
- função de outra organização é bloqueada;
- trabalho inexistente ou de outra organização é bloqueado;
- trabalho fechado ou cancelado é bloqueado;
- duplicidade ativa é bloqueada;
- ausência de `engagements.manage` é bloqueada;
- repetição do envio não cria dois registros;
- sucesso atualiza a consulta;
- estado vazio de funções é tratado sem seed;
- leitura da Camada 3 permanece funcionando;
- nenhum dado de `auth.users` é exposto.

Os testes deverão cobrir domínio, repositório, integração com Supabase, RLS/ACL e interface dentro do escopo.

## 12. Procedimento de execução

Após a aprovação deste plano:

1. confirmar branch limpa, preservando alterações preexistentes fora do escopo;
2. revisar contratos da Camada 2 e Camada 3;
3. confirmar existência de `engagements.manage` e de funções ativas;
4. apresentar a migration antes da aplicação;
5. implementar o contrato de escrita no domínio;
6. implementar mock controlado;
7. implementar repositório oficial;
8. implementar a ação visual limitada;
9. executar testes direcionados;
10. executar build local e lint direcionado;
11. aplicar a migration somente no Supabase oficial, se aprovada;
12. validar fluxo autenticado;
13. publicar branch e abrir um único PR;
14. aguardar revisão e aprovação antes do merge na `main`;
15. atualizar o relatório da Camada 4 e a situação do projeto.

Nenhum passo autoriza iniciar a Camada 5.

## 13. Uso de ferramentas

- Codex: implementação local controlada, testes e integração técnica;
- Lovable: não será utilizado nesta camada sem autorização separada;
- Supabase: somente após aprovação da migration e do plano;
- Superpowers: não será utilizado; a skill formal de testes permanece reservada ao Grupo 07.

## 14. Critérios de interrupção

A execução deverá parar quando ocorrer:

- ausência de função ativa sem alternativa aprovada;
- ausência de `engagements.manage` no ambiente oficial;
- necessidade de nova permissão;
- necessidade de CRUD de funções;
- necessidade de alterar autenticação ou ACL geral;
- impossibilidade de validar membership vigente;
- risco de associação entre organizações;
- conflito com estados terminais da TRB-001;
- necessidade de alterar arquivo fora da lista;
- necessidade de seed para a tela parecer funcional;
- falha de atomicidade ou idempotência;
- alteração automática pelo Lovable fora do escopo.

O bloqueio deverá ser relatado, sem criar nova camada automaticamente.

## 15. Definição de pronto

A Camada 4 estará pronta somente quando:

- associação válida funcionar;
- validações de organização, usuário, função e trabalho forem aplicadas;
- duplicidade ativa for impedida;
- autorização `engagements.manage` estiver protegida;
- RLS ou RPC estiverem verificadas no Supabase oficial;
- a Camada 3 continuar funcionando;
- testes direcionados forem aprovados;
- build local for aprovado;
- o fluxo autenticado for homologado;
- nenhum seed ou dado fictício tiver sido criado;
- o PR estiver revisado e aprovado;
- a documentação estiver atualizada;
- a Camada 5 permanecer fora da entrega.

## 16. Próximo passo

Este plano está apresentado para aprovação. Após aprovação, será executada a sequência fechada acima, sem novas subdivisões.

Nenhum código, migration, alteração de dados ou publicação será iniciado antes da aprovação deste plano.

## 17. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação do plano restritivo único da Camada 4 | Em revisão |
| 1.0 | 2026-08-06 | Plano aprovado para implementação local controlada | Aprovado |
