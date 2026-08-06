---
id: SIGA-EQP-001-C2-GATE-C
title: EQP-001 — Conclusão da Camada 2 — Diretório de Usuários Elegíveis
aliases:
  - Conclusão Gate C EQP-001
  - Persistência Oficial do Diretório
type: implementation-report
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: concluido
implementation_status: concluida
version: 1.0
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
related:
  - "[[SDD-EQP-001 — Equipe, Funções e Períodos]]"
  - "[[EQP-001 — Camada 2 — Desenho de Segurança do Diretório]]"
  - "[[EQP-001 — Camada 2 — Contrato Local do Diretório]]"
  - "[[Plano Único de Conclusão — EQP-001 Camada 2 — Persistência e RLS]]"
  - "[[Situação do Projeto]]"
obsidian:
  note_type: implementation-report
  graph_role: completion-record
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - eqp-001
  - camada-2
  - gate-c
  - supabase
  - rls
  - concluido
---

# EQP-001 — Conclusão da Camada 2

## 1. Resultado

A Camada 2 — diretório de usuários elegíveis — foi implementada no escopo aprovado, sem CRUD de usuários, sem alteração de autenticação e sem criação de tabelas de equipe, funções ou períodos.

O pacote foi concluído em uma única execução controlada, com persistência oficial somente para consulta, RLS, adaptador real e testes.

## 2. Persistência e segurança

Foram aplicadas no Supabase oficial `siga-auditoria` (`umuassmgminmliuypoyp`):

- migration remota `20260806115405` — `eqp_user_directory_rls`;
- migration remota `20260806115823` — `eqp_user_directory_rls_consolidation`.

As migrations locais correspondentes são:

- `supabase/migrations/20260806190000_eqp_user_directory_rls.sql`;
- `supabase/migrations/20260806193000_eqp_user_directory_rls_consolidation.sql`.

As políticas permitem somente leitura de memberships ativos e vigentes, perfis ativos, usuários da organização autorizada e sessões com a permissão efetiva `users.view`.

Não foram concedidos `insert`, `update` ou `delete` para o diretório.

## 3. Correção de segurança aplicada

A primeira política de perfis revelou recursão de RLS no teste autenticado porque uma política consultava diretamente a tabela protegida de memberships.

O problema foi corrigido dentro do mesmo Gate C por meio de:

- helper privado `private.can_view_user_directory_profile(uuid)`;
- `security definer` controlada;
- `search_path` fixo;
- execução concedida somente a `authenticated`;
- consolidação das políticas próprias e administrativas em uma política única por tabela.

O helper não acessa `auth.users` pela aplicação, não expõe dados de autenticação e não possui operação de escrita.

## 4. Código implementado

Foi criado o adaptador `src/data/supabase/supabaseUserDirectoryRepository.ts`.

O adaptador exige contexto organizacional ativo e `users.view`, consulta somente os campos mínimos de `organization_memberships` e `user_profiles`, filtra organização, status e vigência, não retorna `auth_subject`, e-mail ou credenciais e não oferece métodos de escrita.

## 5. Verificações executadas

| Verificação | Resultado |
|---|---|
| Testes do mock e do adaptador | 10 aprovados, 0 falhos |
| Lint direcionado dos arquivos do pacote | Aprovado |
| Compilação local de produção | Aprovada |
| Políticas RLS no banco | Confirmadas |
| Teste autenticado simulado com o usuário do projeto | 1 vínculo e 1 perfil elegível retornados |
| Recursão de RLS | Corrigida |
| Políticas permissivas paralelas criadas pelo Gate C | Eliminadas |

Os avisos restantes do advisor de desempenho são anteriores ou externos a este pacote, relacionados a índices de chaves estrangeiras, índices não utilizados e configuração geral do Auth.

## 6. Limites preservados

Não foram implementados CRUD de usuários, convite, criação, edição, inativação ou reativação de usuários, equipe do trabalho, associação usuário-função, períodos, integração visual com painel, alteração de autenticação, Lovable ou Superpowers.

## 7. Encerramento

O Gate C está tecnicamente concluído. A Camada 2 poderá ser marcada como concluída após a revisão do diff e o merge do PR na `main`.

Não há nova subetapa prevista para esta camada. O próximo trabalho do Grupo 02 será definido somente após o encerramento deste PR.

## 8. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 1.0 | 2026-08-06 | Conclusão da persistência oficial, RLS, adaptador real e validações do Gate C | Concluído |
