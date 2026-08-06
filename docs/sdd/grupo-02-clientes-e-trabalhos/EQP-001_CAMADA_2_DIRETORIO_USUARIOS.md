---
id: SIGA-EQP-001-C2
title: EQP-001 — Camada 2 — Diretório de Usuários Elegíveis
aliases:
  - Diretório Administrativo de Usuários
  - Usuários Elegíveis da Organização
  - EQP-001 Camada 2
type: implementation-specification
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: minuta
implementation_status: nao-iniciada
version: 0.1
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
responsible:
  planning: work
  implementation: codex
  approval: responsavel-projeto
depends_on:
  - SIGA-EQP-001-C1
  - SIGA-SDD-USR-001
  - SIGA-SDD-ACL-001
  - SIGA-SDD-TRB-001
related:
  - "[[SDD-EQP-001]]"
  - "[[PLANO-EQP-001_IMPLANTACAO]]"
  - "[[EQP-001 — Camada 1 — Relatório de Reconciliação]]"
  - "[[SDD-USR-001]]"
  - "[[SDD-ACL-001]]"
  - "[[SDD-TRB-001]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
obsidian:
  note_type: implementation-specification
  graph_role: security-gated-layer
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - eqp-001
  - camada-2
  - usuarios
  - diretorio
  - rls
  - somente-leitura
---

# EQP-001 — Camada 2 — Diretório de Usuários Elegíveis

## 1. Finalidade

Esta minuta define a capacidade mínima para consultar usuários que poderão ser selecionados futuramente como integrantes de um trabalho de auditoria.

O objetivo é disponibilizar um diretório administrativo seguro, somente leitura, sem criar ou administrar contas de usuários.

## 2. Situação de origem

A Camada 1 confirmou que:

- `user_profiles` existe no Supabase oficial;
- `organization_memberships` existe;
- o sistema resolve o usuário autenticado atual;
- não existe contrato para listar os demais usuários da organização;
- as políticas atuais permitem somente a leitura do próprio perfil e membership;
- `users.view` existe como permissão declarada;
- o Supabase ainda não possui as entidades físicas de equipe, funções e períodos.

Assim, esta camada deverá resolver somente o diretório de usuários. Ela não deverá criar as tabelas de equipe nem associar pessoas a trabalhos.

## 3. Objetivo funcional

Permitir que um usuário autorizado consulte uma lista de perfis ativos e memberships ativos da organização atual, para que uma camada posterior possa utilizar essa lista na associação de equipe.

O resultado deverá ser uma lista segura e limitada ao contexto organizacional atual.

## 4. Cadeia de dados permitida

```text
auth.users
    ↓ identidade de autenticação, não exposta
user_profiles
    ↓ perfil funcional
organization_memberships
    ↓ vínculo organizacional ativo
Diretório de usuários elegíveis
```

O frontend não deverá consultar `auth.users` diretamente. A senha, token, metadata de autenticação e demais credenciais nunca farão parte do contrato.

## 5. Regra de elegibilidade

Um registro somente será elegível quando todas as condições forem verdadeiras:

1. o perfil estiver com `status = active`;
2. existir membership na organização do contexto atual;
3. o membership estiver com `status = active`;
4. `active_from` estiver preenchido e já tiver iniciado;
5. `active_to` for nulo ou ainda não tiver expirado;
6. o usuário solicitante possuir contexto organizacional ativo;
7. o usuário solicitante possuir `users.view` vigente;
8. o registro consultado pertencer à mesma organização do contexto.

Membership `pending`, `inactive` ou `revoked` não deverá aparecer no diretório de elegíveis.

## 6. Autorização

### 6.1 Permissão necessária

A consulta administrativa exigirá `users.view`.

`engagements.manage` não substituirá `users.view`. Ter autorização para criar trabalho não significa ter autorização para consultar todos os usuários da organização.

### 6.2 Papel organizacional

O papel `organization_admin` poderá possuir `users.view`, conforme a ACL já aprovada, mas a decisão deverá ser verificada pelo mecanismo oficial de autorização. O sistema não deverá confiar apenas no texto do papel ou no e-mail do usuário.

### 6.3 Usuário sem permissão

Usuário autenticado sem `users.view` deverá receber resposta de acesso negado ou lista vazia conforme o padrão de erro já adotado, sem revelar nomes, identificadores ou quantidade de usuários.

## 7. Modelo de segurança e RLS

A política deverá permitir a leitura administrativa de registros pertencentes à organização atual somente quando a permissão `users.view` estiver ativa.

O desenho deverá observar simultaneamente:

- `TO authenticated` como requisito de sessão;
- predicado de autorização por organização e permissão;
- filtragem por perfil e membership ativos;
- isolamento entre organizações;
- nenhuma autorização baseada em `user_metadata` ou e-mail;
- nenhuma liberação genérica para todos os usuários autenticados;
- RLS habilitado nas tabelas expostas;
- nenhuma chave `service_role` no navegador.

O mecanismo exato — política RLS direta, contrato específico ou outra solução restritiva — deverá ser fechado no plano de implementação após revisão técnica. Não será criada uma view ou função privilegiada apenas para contornar uma política.

Se uma função privilegiada for considerada indispensável, ela deverá permanecer fora do schema exposto, validar o usuário e a organização, possuir execução limitada e passar por revisão de segurança específica. A preferência inicial é não depender dela.

## 8. Contrato de consulta

O contrato lógico deverá retornar somente os campos necessários à seleção futura:

| Campo | Finalidade | Exposição |
|---|---|---|
| `userProfileId` | Identificar o perfil funcional | Permitida |
| `displayName` | Apresentar o nome do usuário | Permitida |
| `membershipId` | Identificar o vínculo organizacional | Permitida ao contexto interno |
| `organizationId` | Confirmar o contexto da consulta | Interna, não editável |
| `membershipStatus` | Informar a situação do vínculo | Permitida |
| `activeFrom` | Validar início da vigência | Permitida |
| `activeTo` | Validar término da vigência | Permitida quando existente |

Não deverão ser retornados:

- senha;
- token;
- `auth_subject` para a interface;
- `raw_user_meta_data`;
- `raw_app_meta_data`;
- dados de outra organização;
- informações não necessárias ao diretório.

O e-mail somente poderá ser exibido se existir fonte funcional aprovada e protegida. Como o modelo atual de `user_profiles` não possui e-mail funcional, a primeira versão deverá utilizar o nome de exibição e identificadores internos.

## 9. Comportamento esperado

### 9.1 Consulta autorizada

O usuário com `users.view` solicita o diretório no contexto da organização ativa. O sistema retorna apenas perfis e memberships elegíveis daquela organização.

### 9.2 Consulta sem permissão

O sistema bloqueia a consulta sem revelar dados de usuários.

### 9.3 Perfil inativo

Perfil inativo não aparece, mesmo que possua membership histórico.

### 9.4 Membership não vigente

Membership pendente, inativo, revogado ou fora do intervalo de vigência não aparece.

### 9.5 Mais de uma organização

O resultado deverá permanecer limitado à organização atualmente resolvida. A existência de memberships em outras organizações não poderá ampliar o resultado.

### 9.6 Nenhum resultado

O sistema deverá informar que não existem usuários elegíveis, sem tratar a situação como erro de infraestrutura.

## 10. Fora do escopo

Esta camada não implementará:

- criação de usuário;
- convite por e-mail;
- alteração de senha;
- alteração de nome;
- inativação ou reativação;
- revogação de membership;
- criação de organização;
- atribuição de papel;
- alteração de permissões;
- associação a trabalho;
- criação de funções de trabalho;
- criação de períodos;
- tabela `engagement_team_members`;
- tabela `engagement_roles`;
- tabela `engagement_periods`;
- painel do trabalho;
- Lovable Cloud;
- qualquer alteração fora da consulta autorizada.

## 11. Implementação técnica prevista

A implementação futura deverá possuir, no mínimo:

1. contrato de diretório no domínio ou camada de dados;
2. implementação Supabase da consulta;
3. filtragem por organização, perfil e membership;
4. integração com o contexto de autorização atual;
5. política RLS ou mecanismo equivalente aprovado;
6. testes de permissão e isolamento;
7. componente visual somente se necessário para validar a consulta.

Não será implementado ainda o seletor final de membro da equipe. A camada deverá entregar uma fonte confiável para uso posterior.

## 12. Lista preliminar de arquivos candidatos

A lista final deverá ser fechada no plano específico desta camada. As áreas candidatas são:

- `src/domain/user.ts`;
- `src/domain/organizationMembership.ts`;
- `src/domain/authorization.ts`;
- `src/data/` para o novo contrato de diretório;
- `src/data/supabase/` para a implementação da consulta;
- testes do domínio, repositório, autorização e isolamento;
- migration de RLS somente se necessária e aprovada;
- componente visual de consulta somente se indispensável.

Nenhum arquivo candidato está autorizado para alteração por esta minuta.

## 13. Testes obrigatórios

Deverão ser previstos, no mínimo:

- usuário com `users.view` consulta usuários ativos da própria organização;
- usuário sem `users.view` não consulta o diretório;
- usuário anônimo não consulta o diretório;
- perfil inativo não aparece;
- membership pending não aparece;
- membership inactive não aparece;
- membership revoked não aparece;
- membership expirado não aparece;
- usuário de outra organização não aparece;
- dados de `auth.users` não são expostos;
- `service_role` não aparece no código do navegador;
- o resultado não concede nenhuma permissão adicional;
- o usuário autenticado continua podendo resolver o próprio contexto.

## 14. Critérios de aceite

A Camada 2 será considerada concluída somente quando:

- existir contrato de consulta documentado;
- a consulta retornar somente usuários elegíveis;
- `users.view` for efetivamente verificado;
- RLS impedir acesso entre organizações;
- perfis e memberships não elegíveis forem excluídos;
- nenhum CRUD de usuário tiver sido incluído;
- nenhum dado de autenticação for exposto;
- testes obrigatórios forem executados;
- a validação autenticada for registrada;
- a lista de arquivos e eventual migration estiverem documentadas;
- o diff for revisado antes da publicação.

## 15. Critérios de interrupção

O trabalho deverá parar antes da implementação quando:

- a RLS exigir liberação ampla;
- a autorização não puder ser relacionada à organização;
- houver necessidade de acessar `auth.users` no frontend;
- a solução exigir `service_role` no navegador;
- surgir necessidade de CRUD de usuários;
- aparecer usuário de outra organização;
- a solução alterar ACL sem SDD própria;
- o Lovable tentar alterar arquivos fora da lista aprovada.

## 16. Uso das ferramentas

- Work: revisão da regra, documentação e critérios;
- Codex: implementação local controlada após aprovação do plano;
- Lovable: não utilizado nesta camada;
- Superpowers: não utilizado; a skill formal permanece reservada ao Grupo 07.

## 17. Material para treinamento

### Objetivos de aprendizagem

Ao final, o participante deverá compreender:

- diferença entre conta de autenticação, perfil, membership e usuário elegível;
- por que `users.view` não é igual a `users.manage`;
- por que RLS é necessária mesmo para usuários autenticados;
- por que o diretório não é um CRUD;
- por que a consulta deve respeitar a organização ativa.

### Estudo de caso

Irian possui acesso administrativo à Audiconsult. O sistema deve permitir a consulta dos perfis ativos da Audiconsult, mas não deve mostrar perfis de outra organização nem memberships pendentes ou revogados. A tela não poderá criar usuário nem alterar permissões.

## 18. Decisão solicitada

Solicita-se a aprovação desta minuta para que seja elaborado o plano restritivo da Camada 2, contendo:

- desenho técnico final da consulta;
- estratégia RLS;
- arquivos autorizados;
- eventual migration;
- testes;
- critérios de publicação;
- procedimento de reversão.

A aprovação desta minuta não autoriza implementação.

## 19. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação da minuta da Camada 2 — diretório administrativo de usuários elegíveis | Em revisão |
