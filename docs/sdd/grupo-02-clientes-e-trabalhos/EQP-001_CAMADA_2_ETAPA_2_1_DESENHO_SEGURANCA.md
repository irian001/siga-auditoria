---
id: SIGA-EQP-001-C2-2.1
title: EQP-001 Camada 2 — Desenho de Segurança do Diretório
aliases:
  - Desenho de Segurança EQP-001 Camada 2
  - Relatório Gate A do EQP-001
  - RLS do Diretório de Usuários
type: implementation-report
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: minuta
implementation_status: concluida
version: 0.1
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
responsible:
  analysis: codex
  review: responsavel-projeto
depends_on:
  - SIGA-EQP-001-C2
  - SIGA-EQP-001-C1
  - SIGA-PLN-EQP-001-C2
related:
  - "[[EQP-001 — Camada 2 — Diretório de Usuários]]"
  - "[[EQP-001 — Camada 1 — Reconciliação de Contratos]]"
  - "[[Plano Restritivo — EQP-001 Camada 2 — Diretório de Usuários]]"
  - "[[SDD-USR-001 — Usuários e Perfis]]"
  - "[[SDD-ACL-001 — Papéis e Permissões]]"
  - "[[Situação do Projeto]]"
obsidian:
  note_type: implementation-report
  graph_role: security-gate
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - eqp-001
  - camada-2
  - etapa-2-1
  - seguranca
  - rls
  - acl
  - users-view
  - somente-leitura
---

# EQP-001 — CAMADA 2 — DESENHO DE SEGURANÇA

## Etapa 2.1 — Gate A

## 1. Objetivo

Fechar o desenho de autorização, isolamento e consulta para o diretório de usuários elegíveis, sem criar código, migration, política, função, view ou dado no Supabase.

Este relatório transforma a minuta aprovada da Camada 2 em uma proposta técnica revisável para a próxima decisão.

## 2. Evidências utilizadas

Foram considerados:

- relatório aprovado da Camada 1;
- minuta da Camada 2;
- plano restritivo aprovado;
- contratos atuais de domínio e repositório;
- migrations versionadas de perfis, memberships e ACL;
- padrão de autorização já utilizado nas entidades de clientes e trabalhos.

Nenhuma consulta de escrita foi executada e nenhuma alteração foi feita no Supabase.

## 3. Situação confirmada

O sistema possui:

- user_profiles;
- organization_memberships;
- roles;
- permissions;
- role_permissions;
- membership_roles;
- resolução do contexto do usuário autenticado;
- permissão users.view;
- função privada existente private.has_acl_permission(permission_code, organization_id).

O sistema ainda não possui:

- contrato de diretório administrativo;
- repositório para listar os demais usuários da organização;
- tela definitiva do diretório;
- tabelas de equipe;
- vínculos de membros de equipe;
- funções de trabalho;
- períodos de trabalho.

As políticas atuais de user_profiles e organization_memberships permitem apenas a leitura do próprio perfil e dos próprios vínculos. Portanto, elas não atendem ao diretório administrativo.

## 4. Fonte dos campos

| Campo do contrato | Fonte física | Regra |
|---|---|---|
| userProfileId | user_profiles.id | Identificador interno do perfil |
| displayName | user_profiles.display_name | Único dado nominal exibido nesta camada |
| membershipId | organization_memberships.id | Identificador interno do vínculo |
| organizationId | organization_memberships.organization_id | Usado para escopo e validação interna |
| membershipStatus | organization_memberships.status | Deve ser active |
| activeFrom | organization_memberships.active_from | Deve ter iniciado |
| activeTo | organization_memberships.active_to | Nulo ou futuro |

O campo de e-mail não será incluído nesta primeira versão porque não existe como campo funcional aprovado em user_profiles. auth.users não será consultado diretamente pelo navegador.

## 5. Regra de elegibilidade

Um usuário somente poderá aparecer quando todas as condições forem verdadeiras:

1. user_profiles.status = active;
2. existir vínculo em organization_memberships;
3. o vínculo pertencer à organização consultada;
4. organization_memberships.status = active;
5. active_from estiver preenchido e for menor ou igual ao momento atual;
6. active_to for nulo ou maior que o momento atual;
7. a organização do vínculo estiver autorizada para o usuário solicitante;
8. o usuário solicitante possuir users.view vigente nessa organização.

Membership pending, inactive, revoked ou expirado não aparecerá.

## 6. Regra de autorização

A consulta exigirá, simultaneamente:

- sessão autenticada;
- contexto organizacional ativo;
- permissão efetiva users.view;
- organização do recurso coincidente com a organização consultada;
- RLS aplicada no banco;
- nenhum acesso privilegiado no navegador.

engagements.manage não substituirá users.view.

O texto do papel, o e-mail, user_metadata e raw_user_meta_data não serão utilizados para autorização.

## 7. Contexto organizacional

O repositório deverá receber a organização resolvida pelo contexto autorizado do usuário, e não uma organização livre informada pela tela.

A consulta deverá ser escopada por organizationId, mas esse valor não será considerado suficiente para autorizar o acesso. A autorização final deverá ser feita pelo banco com base na sessão, no vínculo ativo e na permissão users.view.

A implementação atual bloqueia contexto ambíguo quando o usuário possui mais de um vínculo ativo. Esse comportamento será preservado. Caso o produto passe a permitir múltiplas organizações simultâneas, a regra de seleção de organização deverá ser revisada antes de ampliar o diretório.

## 8. Proposta de consulta

A consulta deverá usar organization_memberships como entidade de escopo e relacionar o perfil funcional:

1. filtrar organization_id pelo contexto ativo;
2. filtrar membership status active;
3. validar active_from e active_to;
4. relacionar user_profiles pelo user_profile_id;
5. filtrar user_profiles.status active;
6. selecionar somente os campos do contrato;
7. ordenar por displayName ou outro critério aprovado;
8. não incluir auth_subject, metadados de autenticação ou credenciais.

A camada de dados deverá rejeitar contexto ausente, contexto bloqueado ou contexto sem users.view antes de executar a consulta.

## 9. Proposta de RLS

### 9.1 organization_memberships

Recomenda-se uma política adicional de SELECT para permitir somente memberships ativos e vigentes de organizações nas quais a sessão possui users.view.

A política deverá:

- ser destinada a authenticated;
- verificar status active;
- verificar active_from e active_to;
- usar private.has_acl_permission('users.view', organization_id);
- manter a política existente de leitura do próprio vínculo;
- não conceder INSERT, UPDATE ou DELETE.

A função private.has_acl_permission já existe, está em schema privado e é usada por políticas aprovadas de entidades do SIGA. Não deverá ser criada uma segunda função equivalente sem necessidade.

### 9.2 user_profiles

A política de SELECT deverá permitir somente perfis ativos vinculados a uma organização na qual a sessão possua users.view.

A política existente de leitura do próprio perfil deverá permanecer.

Há uma limitação técnica importante: a política atual de organization_memberships permite ao usuário comum enxergar somente os próprios vínculos. Uma política de user_profiles que tente descobrir diretamente os vínculos de terceiros poderá ficar limitada pela própria RLS ou produzir dependência recursiva.

Por isso, a solução deverá escolher uma destas alternativas antes do Gate C:

- helper privado, mínimo e exclusivamente de leitura, que valide o perfil alvo, o vínculo ativo e users.view, com security definer controlada;
- operação de servidor protegida, com contrato mínimo e autorização explícita;
- outra solução equivalente, documentada e revisada.

A primeira alternativa é a recomendação preliminar, porque preserva o acesso pelo Data API sem expor auth.users, mas exige revisão de segurança específica.

Se for utilizado helper privado, ele deverá:

- ficar fora do schema exposto;
- possuir search_path fixo;
- validar auth.uid();
- validar perfil ativo;
- validar membership ativo e vigente;
- validar a organização autorizada;
- validar users.view;
- retornar apenas booleano ou dados mínimos necessários;
- revogar execução pública;
- conceder execução somente ao papel necessário;
- não aceitar SQL, tabela ou coluna controlados pelo cliente.

Nenhuma função helper será criada nesta etapa.

## 10. Uso da função privada existente

A função private.has_acl_permission será tratada como dependência existente e não será alterada neste Gate A.

Ela deverá ser verificada no Gate C quanto a:

- schema privado;
- search_path fixo;
- execução revogada de public;
- execução limitada a authenticated;
- uso de auth.uid();
- filtragem por membership ativo;
- filtragem por papel, permissão e vigência;
- isolamento por organization_id.

Se essa verificação revelar risco ou comportamento incompatível, a implementação deverá parar antes da migration.

## 11. Decisões fechadas nesta etapa

Ficam definidos para a próxima etapa:

- somente leitura;
- contrato sem e-mail;
- nenhum acesso direto a auth.users pelo navegador;
- users.view como permissão necessária;
- engagements.manage não concede acesso ao diretório;
- organization_memberships como escopo da consulta;
- perfil e membership ativos e vigentes como condição de elegibilidade;
- organização como barreira obrigatória;
- service_role proibido no navegador;
- Lovable não será utilizado;
- Superpowers não será utilizado;
- nenhuma tabela de equipe será criada nesta camada.

## 12. Decisões ainda pendentes

Antes do Gate C deverão ser aprovados:

1. o helper privado para liberar a leitura de perfis vinculados a terceiros; ou uma alternativa equivalente;
2. os nomes exatos das políticas;
3. a forma final da consulta do adaptador Supabase;
4. a necessidade de uma migration apenas de RLS;
5. os testes reais de isolamento;
6. a lista final de arquivos alterados.

Esses itens não impedem a conclusão do desenho, mas impedem a aplicação no banco.

## 13. Riscos e controles

| Risco | Controle |
|---|---|
| Liberar qualquer usuário autenticado | Exigir users.view e organization_id autorizado |
| Expor usuários de outra organização | RLS, filtro de organização e testes cruzados |
| Consultar auth.users no navegador | Proibir a origem e limitar o contrato |
| Expor e-mail sem fonte aprovada | Omitir e-mail nesta versão |
| Recursão entre políticas | Revisar helper e dependências antes da migration |
| Usar security definer de forma ampla | Schema privado, search_path fixo e execução restrita |
| Confiar apenas no botão da interface | Repetir autorização no repositório e no banco |
| Confundir engagements.manage com users.view | Teste negativo específico |
| Acessar outra organização por parâmetro | RLS deve validar a organização, não apenas o parâmetro |
| Criar CRUD antecipadamente | Lista de arquivos fechada e critérios de parada |
| Acionar Lovable fora do escopo | Lovable proibido nesta camada |

## 14. Resultado do Gate A

O desenho funcional e de autorização está suficientemente definido para preparar o contrato local da Etapa 2.2.

O desenho de persistência ainda não está autorizado para aplicação. A decisão sobre o helper privado e as políticas exatas deverá ser aprovada antes de qualquer migration ou alteração no Supabase.

## 15. Arquivos que poderão ser analisados na Etapa 2.2

A lista inicial para o contrato local é:

- src/domain/user.ts;
- src/domain/organizationMembership.ts;
- src/domain/authorization.ts;
- src/domain/contracts.ts;
- novo contrato de diretório em src/data/;
- novo adaptador Supabase em src/data/supabase/;
- testes específicos do contrato e autorização.

Nenhum desses arquivos foi alterado nesta Etapa 2.1.

## 16. Critério para iniciar a Etapa 2.2

A Etapa 2.2 poderá iniciar após aprovação humana deste relatório, com autorização restrita à criação do contrato local e seus testes.

Essa aprovação não autorizará:

- migration;
- alteração de RLS;
- criação de função;
- criação de view;
- alteração de tabela;
- Lovable;
- Superpowers;
- publicação.

## 17. Situação

Etapa 2.1 concluída como desenho técnico para revisão.

Implementação: não iniciada.

Supabase: sem alterações.

## 18. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Desenho de autorização, contexto, contrato, RLS, riscos e decisões pendentes da Camada 2 | Em revisão |
