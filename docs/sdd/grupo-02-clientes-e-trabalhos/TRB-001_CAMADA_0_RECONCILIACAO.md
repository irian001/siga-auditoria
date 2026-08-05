---
id: SIGA-TRB-001-C0
title: TRB-001 — Camada 0 de Reconciliação do Contrato
aliases:
  - Decisões da Camada 0 da TRB-001
  - Reconciliação do Trabalho de Auditoria
type: decision-record
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
version: 1.0
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
implements:
  - SIGA-SDD-TRB-001
related:
  - "[[PLANO-TRB-001_IMPLANTACAO]]"
  - "[[SDD-TRB-001]]"
  - "[[SDD-ACE-001]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Catálogo de Permissões do SIGA]]"
obsidian:
  note_type: decision-record
  graph_role: implementation-gate
  backlinks_expected: true
  dataview_ready: true
tags: [siga, trb-001, camada-0, decisoes, contrato, rastreabilidade]
---

# TRB-001 — Camada 0 de Reconciliação do Contrato

## 1. Finalidade

Registrar as verificações e decisões necessárias antes da implementação da [[SDD-TRB-001]].

Esta camada não cria código, migration, tabela, política, permissão remota, rota ou interface.

## 2. Resultado da inspeção

### 2.1 Componentes confirmados

- `clients` já existe como entidade implantada;
- `acceptance_assessments` já existe como entidade implantada;
- a ACE-001 possui contrato de consulta da avaliação aplicável;
- o Modelo de Dados prevê `audit_engagements` como entidade do MVP;
- o ACL existente utiliza permissões atômicas com escopo `platform`;
- o catálogo de permissões da aplicação ainda não possui códigos de trabalho;
- equipe, funções e períodos permanecem fora da TRB-001.

### 2.2 Lacuna encontrada

O Modelo de Dados descreve `audit_engagements` com:

- `organization_id`;
- `client_id`;
- `code`;
- `title`;
- `scope`;
- `status`;
- `classification`.

Entretanto, não descreve um campo ou tabela para preservar qual avaliação ACE autorizou a criação do trabalho.

A SDD-TRB-001 exige essa relação. Portanto, não é permitido iniciar a migration sem resolver a lacuna.

## 3. Decisões recomendadas

As decisões abaixo são propostas para aprovação do responsável pelo projeto.

### C0-001 — Vínculo com a avaliação ACE

**Recomendação:** acrescentar `acceptance_assessment_id` em `audit_engagements`, com FK para `acceptance_assessments` e validação de que:

- avaliação e trabalho pertencem à mesma organização;
- avaliação pertence ao mesmo cliente;
- avaliação está aprovada e aplicável no momento da criação;
- a decisão utilizada não é substituída silenciosamente;
- o vínculo permanece consultável depois da criação.

**Motivo:** é a forma mais simples e direta de preservar a origem da decisão, sem criar uma tabela intermediária desnecessária no MVP.

**Situação:** proposta pendente de aprovação.

### C0-002 — Estado inicial

**Recomendação:** todo trabalho será criado em `draft`.

O trabalho não será considerado ativo, iniciado ou pronto para execução apenas por existir no banco.

**Situação:** proposta pendente de aprovação.

### C0-003 — Catálogo inicial de estados

**Recomendação:** utilizar somente:

| Código | Significado |
|---|---|
| `draft` | Trabalho em elaboração |
| `active` | Trabalho liberado para etapas posteriores |
| `closed` | Trabalho encerrado |
| `cancelled` | Trabalho cancelado |

Reabertura e estados de revisão ficarão para SDDs posteriores.

**Situação:** proposta pendente de aprovação.

### C0-004 — Classificação inicial

**Recomendação:** manter `classification` obrigatório e controlado, com o valor inicial `audit` no MVP.

Não será criada uma lista arbitrária de modalidades. Novas classificações dependerão de decisão e SDD própria.

**Motivo:** todo registro desta SDD é um trabalho de auditoria; um único valor inicial evita inventar categorias antes da definição metodológica.

**Situação:** proposta pendente de aprovação.

### C0-005 — Permissões

**Recomendação:** criar no catálogo de permissões de plataforma:

- `engagements.view` — consultar trabalhos;
- `engagements.manage` — criar e editar trabalhos permitidos;
- `engagements.close` — encerrar trabalhos;
- `engagements.cancel` — cancelar trabalhos.

As permissões deverão ser atribuídas aos papéis por migration própria e nunca apenas pelo front-end.

**Situação:** proposta pendente de aprovação.

### C0-006 — Arquivos da Camada 1

**Recomendação inicial de lista branca:**

- domínio e tipos de trabalho;
- contrato do repositório de trabalho;
- adaptador Supabase de trabalho;
- migration de `audit_engagements` e vínculo ACE;
- migration de permissões, se necessária;
- RPCs ou funções protegidas da operação;
- autorização da aplicação;
- testes técnicos diretamente relacionados;
- documentação da migration e da decisão.

Nenhum arquivo de equipe, período, planejamento, rota gerada ou módulo de outra SDD deverá entrar na Camada 1.

**Situação:** proposta pendente de aprovação.

## 4. Fluxo autorizado após a aprovação

```text
Cliente ativo
→ Avaliação ACE aprovada e aplicável
→ Código, título, escopo e classificação
→ Validação organizacional
→ Trabalho em draft
→ Vínculo da avaliação preservado
```

## 5. O que não foi executado

- nenhuma migration foi criada ou aplicada;
- nenhuma tabela foi criada;
- nenhuma permissão foi adicionada;
- nenhum arquivo de código foi alterado;
- nenhum prompt foi enviado ao Lovable;
- nenhum crédito do Lovable foi consumido;
- nenhum dado de homologação foi criado;
- nenhuma alteração foi feita no Supabase oficial.

## 6. Gate para a Camada 1

A Camada 1 somente poderá começar após aprovação explícita de:

1. vínculo direto com `acceptance_assessment_id`;
2. estado inicial `draft`;
3. catálogo de quatro estados;
4. classificação inicial `audit`;
5. quatro permissões propostas;
6. lista branca inicial de arquivos.

## 7. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Inspeção e propostas da Camada 0 da TRB-001 | Substituída |
| 1.0 | 2026-08-05 | Aprovação do gate: ACE aprovada obrigatória antes da criação do trabalho | Aprovada |
