---
id: SIGA-PLN-EQP-001
title: Plano Restritivo de Implantação — SDD-EQP-001
aliases:
  - Plano EQP-001
  - Implantação de Equipe, Funções e Períodos
  - Plano de Equipe do Trabalho
type: implementation-plan
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
implementation_status: em-execucao
version: 1.0
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
responsible:
  planning: work
  implementation: codex
  visual_implementation: lovable
  approval: responsavel-projeto
depends_on:
  - SIGA-SDD-EQP-001
  - SIGA-SDD-TRB-001
  - SIGA-SDD-USR-001
  - SIGA-SDD-ACL-001
  - SIGA-SDD-MVP-000
related:
  - "[[SDD-EQP-001]]"
  - "[[SDD-TRB-001]]"
  - "[[SDD-USR-001]]"
  - "[[SDD-ACL-001]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
obsidian:
  note_type: implementation-plan
  graph_role: execution-control
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - plano
  - eqp-001
  - equipe
  - funcoes
  - periodos
  - implementacao
---

# Plano Restritivo de Implantação — SDD-EQP-001

## 1. Finalidade

Este plano transforma a [[SDD-EQP-001]] em uma sequência controlada de implementação. Ele define limites, dependências, camadas, critérios de saída e condições para interromper o trabalho.

Este documento foi aprovado. Sua aprovação autoriza somente o início da Camada 1, de inspeção e reconciliação. Nenhum código, migration, dado real, alteração de RLS ou publicação está autorizado sem aprovação específica da respectiva camada.

## 2. Decisão central sobre usuários

A EQP-001 não implementará um CRUD completo de usuários.

O requisito mínimo para formar uma equipe é um diretório administrativo somente leitura, capaz de listar usuários já existentes e elegíveis na organização atual.

O diretório deverá consultar a cadeia:

```text
auth.users
    ↓
user_profiles
    ↓
organization_memberships
    ↓
usuários elegíveis para o trabalho
```

O cadastro, convite, edição, inativação, revogação e administração completa de usuários permanecerão fora deste plano e deverão ser tratados em evolução própria da `SDD-USR-001`.

## 3. Gargalo e condição de bloqueio

O código atual resolve o contexto do usuário autenticado, mas não oferece ainda um contrato específico para listar os demais usuários ativos da organização.

Também deverão ser confirmados:

- existência de repositório de diretório de usuários;
- políticas RLS para consulta administrativa;
- uso efetivo da permissão `users.view`;
- existência física das entidades de equipe, função e período;
- compatibilidade com o isolamento multiempresa.

O bloqueio será declarado se o sistema não puder listar usuários elegíveis sem:

- consultar por e-mail livre;
- acessar `auth.users` diretamente pela interface;
- ampliar RLS de forma genérica;
- misturar organizações;
- criar usuário durante a associação;
- usar dados simulados como se fossem persistência oficial.

## 4. Situação técnica encontrada

Na inspeção inicial do workspace foram identificados:

- `UserContextRepository` com operação para resolver somente o usuário atual;
- `supabaseUserContextRepository` consultando o próprio perfil e os próprios memberships;
- permissões declaradas `users.view` e `users.manage`;
- componente `OrganizationContextSummary`, sem CRUD administrativo de usuários;
- nenhuma rota operacional `/users` identificada;
- repositório de trabalhos com operações de trabalho, sem operações de equipe, função ou período;
- migrations de usuários e memberships com políticas de leitura do próprio contexto;
- necessidade de confirmar a existência física das entidades de equipe, função e período no ambiente oficial.

Essa situação não é erro. Ela define o ponto real de partida do plano.

## 5. Princípios restritivos

Durante esta implantação:

- uma camada por vez;
- nenhum código antes da aprovação da camada;
- nenhuma expansão automática do escopo;
- nenhum CRUD de usuários;
- nenhuma alteração de autenticação;
- nenhuma alteração de permissões sem decisão própria;
- nenhuma política RLS ampla;
- nenhuma leitura direta de `auth.users` pela interface;
- nenhuma alteração de dados reais sem autorização específica;
- nenhuma ativação do Lovable Cloud;
- nenhum uso de Superpowers;
- a skill formal de testes permanece reservada ao Grupo 07;
- nenhuma publicação ou merge sem aprovação humana.

## 6. Camadas de implantação

### Camada 1 — Reconciliação dos contratos

#### Objetivo

Comparar o modelo aprovado com o código, migrations, repositórios e políticas existentes.

#### Ações permitidas

- leitura dos contratos de usuário, membership, autorização e trabalho;
- leitura do modelo de domínio e modelo de dados;
- inspeção das migrations existentes;
- identificação de entidades físicas ausentes;
- elaboração de relatório de divergências;
- fechamento da lista de arquivos da Camada 2.

#### Ações proibidas

- alterar código;
- criar tabela;
- criar migration;
- alterar RLS;
- acessar ou alterar dados reais;
- iniciar interface;
- usar Lovable.

#### Saída

Relatório curto contendo contratos reutilizáveis, contratos ausentes, tabelas existentes, tabelas ausentes, políticas aplicáveis, dependências, bloqueios e a lista fechada da Camada 2.

### Camada 2 — Diretório de usuários elegíveis

#### Objetivo

Disponibilizar consulta somente leitura de usuários ativos da organização atual.

#### Requisitos

- filtrar por organização;
- filtrar por perfil ativo;
- filtrar por membership ativo e vigente;
- respeitar `users.view`;
- não retornar credenciais;
- não retornar dados de outras organizações;
- não criar nem alterar usuários;
- registrar erro de autorização de forma clara.

#### Saída

Contrato de consulta e lista mínima de usuários selecionáveis para a equipe, contendo somente campos necessários, como identificador do perfil, nome de exibição e situação.

#### Gate obrigatório

Sem a aprovação da consulta e do isolamento, a Camada 3 não poderá iniciar.

### Camada 3 — Consulta da equipe e dos períodos

Exibir os vínculos existentes do trabalho, seus participantes, funções, situações e períodos. Esta camada ainda poderá ser somente leitura.

### Camada 4 — Associação de usuário e função

Associar usuário elegível a trabalho com função válida, impedindo duplicidade, associação entre organizações e atribuição de função inexistente.

### Camada 5 — Manutenção e encerramento

Permitir alteração limitada de função ou vigência e encerramento de participação, preservando histórico e bloqueando alterações em trabalhos terminais.

### Camada 6 — Períodos, histórico e integração

Validar datas, conflitos, histórico e integração com os estados da `SDD-TRB-001`, sem antecipar planejamento ou painel.

### Camada 7 — Revisão e preparação do painel

Executar revisão documental, testes de isolamento e ACL, homologação autenticada e preparação do contrato para a `SDD-PNL-001`. O painel não será implementado nesta camada.

## 7. Arquivos e áreas candidatas

A lista definitiva será fechada ao final da Camada 1. A inspeção inicial aponta como áreas candidatas:

- `src/domain/user.ts`;
- `src/domain/organizationMembership.ts`;
- `src/domain/authorization.ts`;
- `src/data/userContextRepository.ts`;
- `src/data/supabase/supabaseUserContextRepository.ts`;
- novos contratos de diretório, somente se necessários;
- novos contratos de equipe, somente se necessários;
- `src/domain/engagement.ts`;
- `src/data/engagementRepository.ts`;
- `src/data/supabase/supabaseEngagementRepository.ts`;
- componentes de trabalho, somente nas camadas visuais aprovadas;
- migrations, somente se a Camada 1 comprovar ausência física e o plano da camada autorizar.

Nenhum arquivo desta lista está automaticamente autorizado para alteração. A lista fechada deverá ser aprovada antes da implementação de cada camada.

## 8. Uso de ferramentas

### Work

Responsável por documentação, decisões, escopo, critérios de aceite e atualização do status.

### Codex

Responsável pela implementação local controlada, contratos, repositórios, migrations quando autorizadas, testes técnicos e revisão do diff.

### Lovable

Não será utilizado nas Camadas 1 e 2. Poderá ser considerado somente para uma camada visual posterior, com prompt restritivo, lista fechada de arquivos e autorização específica.

### Superpowers

Não será utilizado nesta SDD. A skill formal de testes permanece reservada ao Grupo 07.

## 9. Critérios gerais de aceitação

A EQP-001 somente poderá ser considerada concluída quando:

- usuários elegíveis forem consultados com isolamento;
- equipe e períodos forem consultados corretamente;
- funções forem separadas de permissões;
- associações inválidas forem bloqueadas;
- trabalhos terminais forem protegidos;
- histórico for preservado;
- políticas e permissões forem verificadas;
- não houver CRUD de usuários indevidamente incluído;
- homologação autenticada for registrada;
- documentação, migrations e PR estiverem coerentes;
- a `SDD-PNL-001` puder consumir os contratos sem duplicação.

## 10. Critérios para interromper

O trabalho deverá parar e retornar para decisão quando:

- a consulta exigir acesso privilegiado não previsto;
- houver conflito entre modelo e banco;
- a RLS precisar ser ampliada sem regra clara;
- o Lovable alterar arquivos fora do escopo;
- surgir necessidade de CRUD de usuários;
- aparecer usuário de outra organização na consulta;
- as entidades físicas não puderem ser reconciliadas;
- o trabalho exigir planejamento ou painel antecipado.

## 11. Próxima ação

Após a aprovação deste plano, executar somente a Camada 1: reconciliação dos contratos e fechamento da lista de arquivos da Camada 2.

Nenhuma implementação visual ou persistente será iniciada antes da apresentação do relatório da Camada 1.

## 12. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação do plano restritivo da EQP-001 com sete camadas e diretório de usuários somente leitura | Em revisão |
| 1.0 | 2026-08-05 | Aprovação do plano e conclusão da Camada 1 de reconciliação | Aprovada |
