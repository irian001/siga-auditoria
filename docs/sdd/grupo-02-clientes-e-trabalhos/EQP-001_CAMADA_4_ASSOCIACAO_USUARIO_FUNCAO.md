---
id: SIGA-EQP-001-C4
title: EQP-001 — Camada 4 — Associação de Usuário e Função
aliases:
  - Camada 4 da EQP-001
  - Associação de usuário e função no trabalho
type: sdd-layer-draft
domain: equipe-funcoes-periodos
group: grupo-02-clientes-e-trabalhos
status: aprovado
version: 1.0
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
obsidian:
  note_type: implementation-layer
  graph_role: satellite
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[SDD-EQP-001]]"
  - "[[EQP-001_CAMADA_2_DIRETORIO_USUARIOS]]"
  - "[[EQP-001_CAMADA_3_CONSULTA_EQUIPE_PERIODOS]]"
  - "[[EQP-001_CAMADA_3_CONCLUSAO]]"
  - "[[PLANO-EQP-001_IMPLANTACAO]]"
  - "[[SDD-TRB-001]]"
  - "[[Situação do Projeto]]"
tags:
  - siga
  - sdd
  - eqp-001
  - camada-4
  - equipe
  - associacao
  - funcao
---

# EQP-001 — CAMADA 4 — ASSOCIAÇÃO DE USUÁRIO E FUNÇÃO

## 1. Situação desta minuta

Esta minuta inicia a definição da Camada 4 da [[SDD-EQP-001]]. Ela não autoriza código, migration, alteração de dados, publicação ou ativação do Lovable Cloud.

A Camada 3 foi homologada e permanece somente leitura. A Camada 4 tratará exclusivamente da criação controlada de uma participação de usuário em um trabalho, com uma função válida.

## 2. Objetivo

Permitir que um usuário elegível da organização atual seja associado a um [[Trabalho de Auditoria]], com uma função de trabalho válida e situação inicial controlada.

O fluxo deverá impedir:

- associação de usuário de outra organização;
- associação de usuário inativo ou sem membership vigente;
- associação de usuário inexistente no diretório elegível;
- função inexistente ou pertencente a outra organização;
- duplicidade ativa da mesma participação;
- escrita fora do trabalho autorizado;
- concessão de permissão sistêmica por causa da função atribuída.

## 3. Dependências

A implementação depende de:

1. [[EQP-001_CAMADA_2_DIRETORIO_USUARIOS]] para listar usuários elegíveis;
2. [[EQP-001_CAMADA_3_CONSULTA_EQUIPE_PERIODOS]] para consultar o estado atual da equipe;
3. [[SDD-TRB-001]] para identificar o trabalho e seus estados;
4. autorização `engagements.manage` ou outra permissão aprovada especificamente para a escrita;
5. políticas RLS e isolamento multiempresa definidos antes da implementação.

Se qualquer dependência não puder ser comprovada, a execução deverá parar sem criar uma alternativa fictícia.

## 4. Escopo funcional

A Camada 4 poderá contemplar somente:

- ação explícita de adicionar participante;
- seleção de usuário existente no diretório elegível;
- seleção de função válida do trabalho;
- confirmação da associação;
- criação de uma participação ativa;
- atualização da consulta da equipe;
- mensagens de sucesso, validação e erro;
- bloqueio de envio duplicado;
- registro mínimo de responsável e data da associação.

## 5. Regras de negócio preliminares

### 5.1 Elegibilidade

Somente usuário listado pelo diretório elegível poderá ser associado. O formulário não deverá aceitar e-mail ou identificador livre como substituto da consulta autorizada.

### 5.2 Organização

O usuário, o trabalho e a associação deverão pertencer à mesma organização usuária.

### 5.3 Função

A função deverá existir, estar disponível para o contexto do trabalho e não poderá ser confundida com permissão de acesso ao sistema.

### 5.4 Duplicidade

Não poderá existir mais de uma participação ativa equivalente para o mesmo usuário no mesmo trabalho, conforme a chave de negócio aprovada no plano.

### 5.5 Situação inicial

Uma nova participação deverá nascer com situação ativa somente após a validação integral da associação. A alteração, suspensão e encerramento ficarão para a Camada 5.

### 5.6 Trabalho terminal

Trabalhos em estado terminal não deverão aceitar novas associações.

## 6. Fora do escopo

Não serão implementados nesta camada:

- CRUD de usuários;
- convite, cadastro, edição ou inativação de usuários;
- alteração de papéis organizacionais;
- criação livre de funções;
- edição ou encerramento de participações;
- criação ou alteração de períodos;
- histórico completo de alterações;
- painel de equipe;
- planejamento da auditoria;
- alterações de autenticação;
- ampliação geral da ACL;
- integração com Lovable Cloud;
- dados artificiais para preencher a tela.

## 7. Segurança e autorização

A escrita deverá exigir uma permissão própria e explícita para administrar a equipe do trabalho. Não deverá ser utilizado apenas `users.view` nem uma permissão de consulta como substituto de autorização de escrita.

As políticas deverão:

- limitar a organização do registro;
- verificar o trabalho autorizado;
- impedir usuário de outra organização;
- impedir função fora do escopo;
- manter o acesso de leitura separado do acesso de escrita;
- não expor credenciais ou dados de `auth.users`.

## 8. Diretriz de implementação

Antes de qualquer código deverá ser preparado um plano restritivo único da Camada 4, contendo:

- lista fechada de arquivos;
- contrato de escrita;
- modelo de autorização;
- constraints e índices necessários;
- comportamento de erro;
- testes mínimos;
- critérios de homologação;
- estratégia de reversão.

O Codex deverá ser utilizado para implementação controlada. O Lovable não será acionado nesta camada sem autorização separada e prompt fechado.

## 9. Critérios de aceitação preliminares

A Camada 4 somente poderá ser considerada concluída quando:

- um usuário elegível puder ser associado ao trabalho;
- usuário de outra organização for bloqueado;
- usuário inativo ou sem membership vigente for bloqueado;
- função inválida for bloqueada;
- duplicidade ativa for impedida;
- trabalho terminal rejeitar nova associação;
- a participação aparecer na consulta da Camada 3;
- a autorização de escrita for verificada por RLS e testes;
- nenhum dado fictício for criado;
- o fluxo autenticado for homologado;
- o PR correspondente for aprovado e integrado;
- a documentação refletir a situação real.

## 10. Próximo passo controlado

Após a aprovação desta minuta, será preparado o plano restritivo da Camada 4. Nenhuma implementação será iniciada antes da aprovação desse plano.

## 11. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação da minuta da Camada 4 — associação de usuário e função | Em revisão |
| 1.0 | 2026-08-06 | Aprovação da minuta para elaboração do plano restritivo | Aprovada |
