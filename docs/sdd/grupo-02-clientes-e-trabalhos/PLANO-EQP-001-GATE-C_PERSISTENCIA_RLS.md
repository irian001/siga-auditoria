---
id: SIGA-PLN-EQP-001-GATE-C
title: Plano Único de Conclusão — EQP-001 Camada 2 — Persistência e RLS
aliases:
  - Plano Gate C EQP-001
  - Conclusão da Camada 2 do EQP-001
  - Persistência Oficial do Diretório
type: implementation-plan
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
implementation_status: concluida
version: 0.1
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
responsible:
  planning: work
  implementation: codex
  approval: responsavel-projeto
depends_on:
  - SIGA-EQP-001-C2-2.1
  - SIGA-EQP-001-C2-2.2
  - SIGA-EQP-001-C2
  - SIGA-PLN-EQP-001-C2
related:
  - "[[EQP-001 — Camada 2 — Desenho de Segurança do Diretório]]"
  - "[[EQP-001 — Camada 2 — Contrato Local do Diretório]]"
  - "[[EQP-001 — Camada 2 — Diretório de Usuários]]"
  - "[[Plano Restritivo — EQP-001 Camada 2 — Diretório de Usuários]]"
  - "[[SDD-USR-001 — Usuários e Perfis]]"
  - "[[SDD-ACL-001 — Papéis e Permissões]]"
  - "[[Situação do Projeto]]"
obsidian:
  note_type: implementation-plan
  graph_role: bounded-completion-plan
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - eqp-001
  - camada-2
  - gate-c
  - rls
  - supabase
  - persistencia
  - conclusao
  - plano-unico
---

# PLANO ÚNICO DE CONCLUSÃO

## EQP-001 — Camada 2 — Diretório de usuários elegíveis

## 1. Finalidade

Este plano autoriza, após aprovação, um único pacote de implementação para concluir a Camada 2 da EQP-001.

O pacote deverá conectar o contrato local já aprovado à persistência oficial do Supabase, implantar a proteção RLS necessária, validar autorização e isolamento e encerrar formalmente a Camada 2.

Não serão criadas novas camadas, novos planos intermediários ou novas subdivisões de implementação.

## 2. Resultado final esperado

Ao final do pacote, o SIGA deverá conseguir:

- consultar usuários elegíveis da organização atual;
- usar a permissão users.view;
- consultar somente perfis ativos;
- consultar somente memberships ativos e vigentes;
- impedir acesso entre organizações;
- retornar somente o contrato mínimo já aprovado;
- utilizar o Supabase oficial como fonte de leitura;
- manter o contrato local e o mock existentes;
- comprovar o comportamento com testes;
- registrar a conclusão da Camada 2.

O resultado continuará sendo somente leitura. A tela de equipe e a associação de usuários a trabalhos permanecem para as camadas posteriores da EQP-001.

## 3. Escopo fechado do pacote

### 3.1 Persistência e segurança

Será criada uma migration única, gerada pelo fluxo oficial do Supabase, contendo somente o necessário para:

- política de SELECT administrativa em organization_memberships;
- política de SELECT correspondente em user_profiles;
- eventual helper privado mínimo para resolver a visibilidade segura do perfil;
- grants e revokes estritamente necessários;
- comentários de segurança, se necessários.

A migration não criará:

- novas tabelas de equipe;
- engagement_team_members;
- engagement_roles;
- engagement_periods;
- colunas novas em user_profiles;
- colunas novas em organization_memberships;
- dados de usuários;
- convites;
- funções de administração de usuários.

### 3.2 Código

Será criado somente o adaptador Supabase do contrato já existente:

- src/data/supabase/supabaseUserDirectoryRepository.ts

Poderá ser ajustada a composição necessária para selecionar o adaptador oficial, sem alterar autenticação, rotas ou interface.

O adaptador deverá:

- receber o contexto organizacional autorizado;
- verificar users.view antes da consulta;
- consultar organization_memberships como escopo;
- relacionar user_profiles;
- filtrar status e vigência;
- selecionar apenas os campos do contrato;
- converter erros para OperationResult;
- não possuir operações de escrita;
- não acessar auth.users;
- não conter service_role.

### 3.3 Testes

Serão adicionados ou ajustados somente testes relacionados ao diretório:

- contrato local;
- adaptador Supabase;
- autorização;
- elegibilidade;
- isolamento organizacional;
- ausência de dados sensíveis;
- ausência de operações de escrita.

Os testes oficiais deverão comprovar, no mínimo:

- users.view permite a consulta;
- ausência de users.view bloqueia;
- sessão anônima bloqueia;
- engagements.manage isoladamente não permite;
- perfil inactive não aparece;
- membership pending não aparece;
- membership inactive não aparece;
- membership revoked não aparece;
- membership expirado não aparece;
- organização diferente não aparece;
- campos de autenticação não são retornados;
- leitura não cria nem altera registros.

### 3.4 Documentação

Ao concluir, serão atualizados:

- relatório da Etapa 2.2;
- SDD da Camada 2;
- plano restritivo da Camada 2;
- situação do projeto;
- Plano Mestre das SDDs;
- histórico da migration e do pacote de implementação.

A documentação deverá declarar se a Camada 2 foi concluída ou bloqueada.

## 4. Decisão técnica de RLS

A implementação deverá reutilizar a função privada existente private.has_acl_permission(permission_code, organization_id), sem criar uma segunda função geral de autorização.

A política de organization_memberships deverá exigir:

- papel authenticated;
- status active;
- active_from iniciado;
- active_to nulo ou futuro;
- private.has_acl_permission('users.view', organization_id).

A política de user_profiles deverá exigir:

- status active;
- vínculo ativo e vigente com organização autorizada;
- users.view efetiva;
- execução em mecanismo privado e controlado quando a RLS própria impedir a verificação direta do vínculo de terceiros.

Se o helper privado for necessário, ele deverá:

- permanecer no schema privado;
- usar search_path fixo;
- validar auth.uid();
- validar perfil ativo;
- validar vínculo ativo e vigente;
- validar users.view;
- não aceitar nomes de tabela, coluna ou SQL do cliente;
- não retornar dados de usuário;
- retornar apenas a decisão mínima necessária;
- revogar execução pública;
- conceder execução somente ao papel apropriado.

Nenhuma função security definer será criada por conveniência. Se a revisão identificar que o helper não pode ser protegido adequadamente, o pacote deverá parar e ser considerado bloqueado, sem abrir nova etapa automática.

## 5. Lista autorizada de arquivos

A lista autorizada para este pacote é:

- src/data/supabase/supabaseUserDirectoryRepository.ts;
- arquivos de composição estritamente necessários para o adaptador;
- tests/data/userDirectoryRepository.test.ts;
- testes adicionais estritamente relacionados ao adaptador;
- supabase/migrations/<timestamp>_eqp_user_directory_rls.sql;
- relatório de conclusão da Camada 2;
- atualização dos documentos de status e do Plano Mestre.

Não estão autorizados:

- src/routes/;
- src/features/;
- src/config/navigation.ts;
- autenticação;
- ACL geral;
- SDD-USR-001;
- tabelas de equipe;
- períodos;
- funções de trabalho;
- Lovable;
- package.json;
- bun.lock;
- dependências;
- variáveis de ambiente;
- arquivos fora da lista sem aprovação específica.

## 6. Ordem operacional única

O pacote deverá ser executado nesta ordem fixa:

1. revisar o diff dos arquivos autorizados;
2. gerar a migration oficial;
3. revisar a migration, grants, revokes, RLS e helper;
4. aplicar a alteração somente no projeto Supabase oficial;
5. verificar a estrutura e as políticas;
6. implementar o adaptador real;
7. executar testes locais e oficiais;
8. executar compilação;
9. validar o fluxo autenticado de consulta;
10. registrar evidências;
11. abrir um único PR;
12. homologar;
13. encerrar a Camada 2.

Essa ordem não cria novas etapas de produto. Ela apenas define a sequência operacional do único pacote de conclusão.

## 7. Regras de autorização para execução

A aprovação deste plano autoriza a preparação e execução do pacote completo, mas não autoriza alterações fora do escopo fechado.

Antes da aplicação no Supabase, deverá ser apresentada a migration final para conferência do responsável pelo projeto.

Não serão executadas alterações silenciosas.

Se a migration exigir uma decisão diferente da registrada neste plano, a execução deverá parar e registrar o bloqueio, sem criar nova camada.

## 8. Critérios de encerramento

A Camada 2 será considerada concluída quando todos os critérios forem verdadeiros:

- contrato local preservado;
- adaptador Supabase implementado;
- migration aplicada no projeto oficial;
- RLS habilitada e revisada;
- grants e revokes mínimos;
- users.view efetivamente exigida;
- isolamento organizacional comprovado;
- perfis e memberships inelegíveis excluídos;
- nenhum dado de auth.users exposto;
- nenhum service_role no navegador;
- nenhum CRUD de usuário criado;
- nenhum módulo de equipe criado;
- testes aprovados;
- compilação aprovada;
- fluxo autenticado homologado;
- um único PR revisado e aprovado;
- documentação atualizada;
- status da Camada 2 alterado para concluída.

## 9. Critérios de bloqueio

O pacote deverá ser interrompido, sem desdobramento automático, se ocorrer:

- RLS permissiva para usuários autenticados em geral;
- impossibilidade de comprovar users.view;
- exposição entre organizações;
- helper privado sem proteção suficiente;
- necessidade de consultar auth.users no navegador;
- necessidade de service_role;
- necessidade de criar tabela ou CRUD de usuários;
- alteração de ACL fora do escopo;
- alteração de autenticação;
- necessidade de criar nova camada;
- alteração fora da lista autorizada;
- falha em qualquer teste negativo de segurança.

O bloqueio deverá ser registrado no relatório final, com a decisão necessária para retomada.

## 10. Ferramentas

### Work

- manter o escopo;
- revisar documentação;
- consolidar decisões;
- acompanhar a conclusão.

### Codex

- implementar o adaptador;
- preparar e revisar migration;
- executar testes;
- verificar o diff;
- abrir o PR;
- registrar evidências.

### Supabase

- receber somente a migration autorizada;
- permanecer como fonte oficial;
- ser validado com RLS e isolamento.

### Lovable

Não será utilizado neste pacote.

### Superpowers

Não será utilizado neste pacote. O uso continua reservado à etapa formal de auditoria/testes do Grupo 07.

## 11. Não haverá nova subdivisão

Este documento é o plano final da Camada 2.

Depois de sua aprovação, a próxima ação será executar o pacote fechado acima. Não serão criados:

- novo plano para o adaptador;
- novo plano para a migration;
- nova minuta para RLS;
- nova camada intermediária;
- novo pacote de preparação;
- nova divisão para cada teste.

Ao final do pacote, a decisão será objetiva: Camada 2 concluída ou Camada 2 bloqueada com motivo documentado.

## 12. Decisão solicitada

Solicita-se a aprovação deste plano único para concluir a Camada 2 da EQP-001.

## 13. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação do plano único de conclusão da Camada 2, sem novas subdivisões | Aprovado |
| 1.0 | 2026-08-06 | Pacote executado com persistência oficial, RLS, adaptador real e validações | Concluído |
