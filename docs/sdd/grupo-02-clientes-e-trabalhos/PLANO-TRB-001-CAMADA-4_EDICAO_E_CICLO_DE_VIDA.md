---
id: SIGA-PLN-TRB-001-C4
title: Plano Restritivo — TRB-001 Camada 4 — Edição e Ciclo de Vida
aliases:
  - Plano da Camada 4 da TRB-001
  - Plano de Edição e Ciclo de Vida dos Trabalhos
type: plano-implantacao
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
implementation_status: concluida
version: 1.0
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
responsible:
  coordination: work
  implementation: codex-local-controlado
  visual_homologation: responsavel-projeto
  approval: responsavel-projeto
implements:
  - SIGA-TRB-001-C4
depends_on:
  - SIGA-SDD-TRB-001
  - SIGA-TRB-001-C3
  - SIGA-ACE-001
  - SIGA-CLI-001
related:
  - "[[SDD-TRB-001]]"
  - "[[TRB-001 — Camada 4 — Edição e Ciclo de Vida]]"
  - "[[TRB-001 — Camada 3 — Criação Controlada do Trabalho]]"
  - "[[Plano de Implantação — SDD-TRB-001 Criação e Gestão do Trabalho]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
obsidian:
  note_type: implementation-plan
  graph_role: execution-plan
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - grupo-02
  - trb-001
  - camada-04
  - plano
  - edicao
  - ciclo-de-vida
  - historico
---

# Plano Restritivo — TRB-001 Camada 4 — Edição e Ciclo de Vida

## 1. Finalidade

Definir a execução controlada da Camada 4 da [[TRB-001 — Camada 4 — Edição e Ciclo de Vida]].

O objetivo é permitir edição limitada, ativação, cancelamento e encerramento conforme estado e permissão, reutilizando os contratos oficiais já existentes.

Este plano não autoriza alterações de banco, migrations, RPCs, RLS, ACL, autenticação ou criação de dados de homologação.

---

## 2. Resultado esperado

Um usuário autenticado deverá conseguir, somente quando autorizado:

- editar título, escopo e classificação controlada de um trabalho em `draft` ou `active`;
- manter cliente, organização, código e avaliação ACE imutáveis;
- ativar um trabalho `draft` com `engagements.manage`;
- cancelar um trabalho `draft` ou `active` com `engagements.cancel` e justificativa;
- encerrar um trabalho `active` com `engagements.close` e justificativa;
- consultar o resultado e o histórico após cada operação;
- receber bloqueio claro para estados ou permissões incompatíveis.

Trabalhos `closed` ou `cancelled` permanecerão somente para consulta.

---

## 3. Limite da camada

### 3.1 Dentro do escopo

- formulário separado de edição limitada;
- ações de ativação, cancelamento e encerramento;
- confirmação de transição;
- justificativa para cancelamento e encerramento;
- uso de `AuditEngagementRepository.update`;
- uso de `AuditEngagementRepository.changeStatus`;
- invalidação da lista após sucesso;
- preservação dos metadados e histórico retornados pelo repositório;
- mensagens de erro, sucesso e bloqueio;
- validação local usando schemas já existentes;
- validação técnica local e validação visual autenticada.

### 3.2 Fora do escopo

- alteração de cliente, organização, código ou avaliação ACE;
- reabertura;
- exclusão física ou lógica;
- equipe;
- funções;
- períodos;
- planejamento;
- balancete;
- riscos;
- procedimentos;
- documentos;
- evidências;
- portal do cliente;
- revisão metodológica;
- relatório final;
- novos dados estruturais;
- novas permissões;
- novas migrations;
- Lovable Cloud;
- Superpowers;
- testes formais do Grupo 07.

---

## 4. Arquivos autorizados

### 4.1 Arquivos novos

- `src/features/engagements/EngagementEditForm.tsx` — formulário de edição limitada;
- `src/features/engagements/EngagementStatusDialog.tsx` — confirmação de ativação, cancelamento e encerramento.

### 4.2 Arquivos existentes

- `src/features/engagements/EngagementsPage.tsx` — ações, mutações, permissões e atualização da lista;
- `src/features/engagements/engagementsPresentation.ts` — somente rótulos, mensagens e textos da camada.

### 4.3 Arquivos proibidos

Nenhum outro arquivo poderá ser criado, alterado, removido ou renomeado.

São proibidos, especialmente:

- `src/domain/`;
- `src/data/`;
- `src/data/supabase/`;
- `src/integrations/`;
- `supabase/`;
- migrations;
- RPCs;
- RLS;
- ACL;
- permissões;
- autenticação;
- rotas;
- navegação;
- `package.json`;
- `bun.lock`;
- variáveis de ambiente;
- `EngagementForm.tsx` da criação, salvo autorização posterior e específica.

---

## 5. Contratos obrigatórios

A implementação deverá reutilizar:

- `AuditEngagementRepository.update`;
- `AuditEngagementRepository.changeStatus`;
- `updateAuditEngagementSchema`;
- `changeAuditEngagementStatusSchema`;
- `engagements.manage`;
- `engagements.close`;
- `engagements.cancel`.

Não será permitido acesso direto às tabelas nem operação direta de atualização na interface.

---

## 6. Regras de edição

O formulário de edição deverá permitir somente:

| Campo | Regra |
|---|---|
| Título | Obrigatório, não vazio, até 200 caracteres |
| Escopo | Obrigatório, não vazio, até 4.000 caracteres |
| Classificação | Valor controlado `audit` |

O formulário deverá iniciar com os valores atuais e não poderá expor edição para:

- código;
- cliente;
- organização;
- avaliação ACE;
- estado;
- autoria;
- datas;
- histórico.

A edição deverá ser disponibilizada somente para `draft` e `active`. A validação do RPC permanecerá a proteção definitiva.

---

## 7. Regras de transição

| Operação | Estado atual | Permissão | Justificativa |
|---|---|---|---|
| Ativar | `draft` | `engagements.manage` | Não obrigatória |
| Cancelar | `draft` ou `active` | `engagements.cancel` | Obrigatória |
| Encerrar | `active` | `engagements.close` | Obrigatória |

Regras adicionais:

- `closed` não poderá mudar de estado;
- `cancelled` não poderá mudar de estado;
- ativação de `active` será bloqueada;
- encerramento de `draft` será bloqueado;
- cancelamento de `closed` ou `cancelled` será bloqueado;
- justificativa vazia ou acima do limite será rejeitada;
- nenhum estado será alterado localmente antes da confirmação do RPC.

---

## 8. Permissões e visibilidade

A página deverá continuar exigindo `engagements.view` para consulta.

As ações deverão respeitar:

- `engagements.manage` para editar e ativar;
- `engagements.cancel` para cancelar;
- `engagements.close` para encerrar.

A interface poderá ocultar ações não autorizadas, mas não deverá depender disso como segurança. O servidor deverá continuar rejeitando qualquer tentativa fora da permissão.

---

## 9. Histórico e atualização

Após uma operação válida:

1. o repositório deverá retornar o trabalho atualizado;
2. a consulta `engagements` deverá ser invalidada;
3. a lista deverá apresentar o novo estado e data de atualização;
4. o resumo deverá preservar cliente, organização, ACE e código;
5. a mensagem deverá informar a operação concluída;
6. o histórico deverá permanecer no registro retornado.

Nenhuma operação deverá apagar ou reconstruir manualmente o histórico no front-end.

---

## 10. Sequência de execução

### Etapa 1 — Preparação

- confirmar branch baseada na `main` após o PR #41;
- confirmar worktree limpo;
- confirmar os quatro arquivos autorizados;
- confirmar que `update` e `changeStatus` já existem;
- confirmar que não será criado dado de homologação ainda;
- revisar a minuta e este plano.

### Etapa 2 — Implementação local

- criar `EngagementEditForm.tsx`;
- criar `EngagementStatusDialog.tsx`;
- adicionar ações controladas na `EngagementsPage.tsx`;
- usar apenas os repositórios existentes;
- manter a criação da Camada 3 intacta;
- adicionar apenas mensagens necessárias em `engagementsPresentation.ts`.

### Etapa 3 — Verificação técnica

- build local;
- lint dos arquivos autorizados;
- `git diff --check`;
- conferência de arquivos alterados;
- busca por operações diretas proibidas;
- busca por alterações fora do escopo;
- conferência de que nenhuma migration ou RPC foi criada.

### Etapa 4 — Validação visual

- ação de edição aparece somente em estado permitido e com permissão;
- campos imutáveis não aparecem como editáveis;
- ações de transição respeitam estado e permissão;
- cancelamento e encerramento exigem justificativa;
- sucesso atualiza lista e resumo;
- erros são apresentados sem perder o formulário;
- trabalhos terminais permanecem somente para consulta;
- tema visual existente é preservado.

### Etapa 5 — Homologação real

Somente após autorização específica, poderá ser usado um trabalho de homologação no Supabase oficial para testar:

- edição;
- ativação;
- cancelamento;
- encerramento;
- persistência após recarregar;
- histórico;
- bloqueios.

Sem essa autorização, a validação ficará restrita ao código, build, contrato e interface.

---

## 11. Critérios de aceite

O plano será considerado executado quando:

1. somente os arquivos autorizados forem alterados;
2. a criação da Camada 3 continuar funcionando;
3. edição em `draft` for possível nos campos permitidos;
4. edição em `active` seguir o contrato atual;
5. cliente, organização, código e ACE permanecerem imutáveis;
6. ativação exigir `engagements.manage`;
7. cancelamento exigir `engagements.cancel` e justificativa;
8. encerramento exigir `engagements.close` e justificativa;
9. estados inválidos forem bloqueados;
10. trabalhos encerrados ou cancelados não puderem ser editados;
11. histórico e metadados forem preservados;
12. a lista for atualizada após sucesso;
13. erros de autorização e validação forem compreensíveis;
14. não houver exclusão ou reabertura;
15. build local passar;
16. lint do escopo alterado passar;
17. validação visual for aprovada;
18. nenhuma camada posterior for iniciada automaticamente.

---

## 12. Verificações negativas obrigatórias

Antes de publicar, confirmar:

- nenhuma alteração em `src/domain`;
- nenhuma alteração em `src/data`;
- nenhuma alteração em `supabase`;
- nenhuma migration nova;
- nenhuma RPC nova;
- nenhum `.update` ou `.delete` direto na interface;
- nenhuma alteração de cliente, organização, código ou ACE;
- nenhuma reabertura;
- nenhuma exclusão;
- nenhuma criação de equipe, período ou planejamento;
- nenhum novo permission code;
- nenhum uso do Lovable Cloud;
- nenhum uso de Superpowers;
- nenhum arquivo fora da lista autorizada.

---

## 13. Política de dados de homologação

A aprovação deste plano não autoriza criação, edição, ativação, cancelamento ou encerramento de registros no Supabase oficial.

O dado de homologação deverá ser autorizado separadamente, identificado e tratado conforme a operação executada.

Se não houver registro adequado para teste, a execução deverá parar e registrar o bloqueio, sem criar dados artificialmente.

---

## 14. Política de ferramentas

- Work: coordenação, documentação e acompanhamento;
- Codex: implementação local controlada e verificações;
- Supabase: somente consulta durante a preparação; escrita apenas com autorização específica;
- Lovable: não autorizado para implementar esta camada;
- Superpowers: não utilizar; reservado ao Grupo 07.

---

## 15. Condições de interrupção

Parar imediatamente se:

- for necessário alterar contrato existente;
- faltar uma permissão ou regra necessária;
- a operação exigir mudança de RPC, RLS, ACL ou migration;
- houver tentativa de alterar campos imutáveis;
- houver tentativa de reabrir ou excluir registro;
- houver tentativa de criar dado sem autorização;
- houver tentativa de alterar arquivo não autorizado;
- houver tentativa de iniciar equipe, período ou planejamento;
- houver tentativa de usar Lovable Cloud ou Superpowers.

---

## 16. Entrega obrigatória

O relatório da execução deverá informar:

- resumo da implementação;
- arquivos alterados;
- arquivos não alterados;
- permissões utilizadas;
- transições implementadas;
- testes executados;
- resultado do build;
- resultado do lint do escopo;
- validação visual;
- eventual dado de homologação autorizado;
- confirmação de preservação da Camada 3;
- confirmação de que a Camada 5 não foi iniciada.

---

## 17. Aprovação solicitada

Este plano está em minuta e aguarda aprovação do responsável pelo projeto.

A aprovação autorizará somente a implementação local controlada da Camada 4, dentro da lista fechada de arquivos e restrições acima.

A criação ou alteração de dados no Supabase oficial, a publicação, a abertura de PR e o merge dependerão de autorizações específicas posteriores.

---

## 18. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação do plano restritivo da Camada 4 | Em revisão |
| 1.0 | 2026-08-05 | Plano aprovado, executado e homologado no PR #42 | Aprovada |
