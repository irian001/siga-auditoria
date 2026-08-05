---
id: SIGA-TRB-001-C3
title: TRB-001 — Camada 3 — Criação Controlada do Trabalho
aliases:
  - Criação Controlada de Trabalhos
  - Camada 3 da TRB-001
type: camada-implementacao
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: minuta
implementation_status: nao-iniciada
version: 0.1
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
responsible:
  planning: work
  implementation: codex-local-controlado
  visual_homologation: responsavel-projeto
  approval: responsavel-projeto
depends_on:
  - SIGA-SDD-TRB-001
  - SIGA-TRB-001-C2
  - SIGA-ACE-001
  - SIGA-CLI-001
related:
  - "[[SDD-TRB-001]]"
  - "[[TRB-001 — Camada 2 — Consulta Visual dos Trabalhos]]"
  - "[[Plano de Implantação — SDD-TRB-001 Criação e Gestão do Trabalho]]"
  - "[[SDD-ACE-001]]"
  - "[[SDD-CLI-001]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
obsidian:
  note_type: implementation-layer
  graph_role: execution-step
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - grupo-02
  - trb-001
  - camada-03
  - criacao
  - supabase
  - rastreabilidade
---

# TRB-001 — Camada 3 — Criação Controlada do Trabalho

## 1. Finalidade da minuta

Definir a próxima camada de implementação da [[SDD-TRB-001]], destinada a permitir a criação real de um trabalho de auditoria no Supabase oficial, sempre em estado `draft` e somente quando o cliente e a avaliação ACE atenderem aos requisitos aprovados.

Esta minuta não autoriza ainda código, gravação, publicação ou criação de dados de homologação. O plano restritivo deverá ser elaborado e aprovado antes da execução.

## 2. Situação de origem

- a Camada 1 está integrada à `main`;
- a Camada 2 está integrada à `main` e foi aprovada visualmente;
- a tabela `audit_engagements` existe no Supabase oficial;
- o RPC `create_audit_engagement` já aplica as regras críticas no servidor;
- a consulta visual `/trabalhos` está disponível em modo somente leitura;
- a criação de trabalhos ainda não possui interface;
- edição, ativação, cancelamento e encerramento permanecem fora desta camada.

## 3. Objetivo único

Permitir que um usuário autenticado com `engagements.manage` crie um trabalho real em estado `draft`, vinculado a um cliente ativo da própria organização e a uma avaliação ACE final aprovada e aplicável.

## 4. Requisitos de elegibilidade

O formulário deverá permitir selecionar somente:

1. cliente pertencente à organização autenticada;
2. cliente com estado ativo;
3. avaliação ACE do mesmo cliente e da mesma organização;
4. avaliação ACE em estado final aprovado;
5. avaliação ACE mais recente aplicável, sem avaliação posterior incompatível;
6. usuário com `engagements.manage`.

A interface deverá bloquear opções inelegíveis, mas a decisão definitiva continuará sendo do RPC protegido no Supabase.

## 5. Dados da criação

O formulário deverá utilizar exclusivamente os campos já previstos:

- cliente;
- avaliação ACE aprovada utilizada;
- código do trabalho;
- título;
- escopo preliminar;
- classificação.

O valor inicial da classificação será o catálogo aprovado `audit`.

O trabalho nascerá sempre em `draft`.

Não haverá seleção de estado inicial pelo usuário.

## 6. Fluxo funcional

```text
Usuário autorizado
        ↓
Seleciona cliente ativo
        ↓
Sistema apresenta avaliação ACE aprovada aplicável
        ↓
Usuário informa código, título e escopo preliminar
        ↓
Sistema valida dados e permissão
        ↓
RPC protegido valida novamente cliente, organização e ACE
        ↓
Trabalho é criado em draft
        ↓
Lista é atualizada sem recarregar a aplicação
        ↓
Mensagem de sucesso e registro disponível para consulta
```

## 7. Bloqueios obrigatórios

A criação deverá ser impedida quando ocorrer qualquer situação abaixo:

- usuário sem `engagements.manage`;
- sessão ou contexto organizacional indisponível;
- cliente inexistente;
- cliente inativo;
- cliente de outra organização;
- avaliação ACE inexistente;
- avaliação em rascunho;
- avaliação aguardando decisão;
- avaliação rejeitada;
- avaliação cancelada;
- avaliação não aplicável ou substituída por decisão posterior;
- código vazio;
- código duplicado na organização;
- título vazio;
- escopo preliminar vazio;
- envio duplicado durante processamento.

As mensagens deverão orientar o usuário sem revelar dados de outra organização.

## 8. Arquivos autorizados para implementação futura

### 8.1 Arquivo novo permitido

- `src/features/engagements/EngagementForm.tsx`

### 8.2 Arquivos existentes permitidos

- `src/features/engagements/EngagementsPage.tsx` — somente para abrir o formulário, carregar opções elegíveis, executar `create` e atualizar a lista;
- `src/features/engagements/engagementsPresentation.ts` — somente rótulos, mensagens e textos da camada.

### 8.3 Arquivos proibidos

Não poderão ser criados, alterados, removidos ou renomeados:

- `src/domain/`;
- `src/data/`;
- `src/data/supabase/`;
- `supabase/`;
- migrations;
- RPCs;
- RLS;
- ACL e permissões;
- autenticação;
- `src/config/navigation.ts`;
- `src/routes/`;
- `package.json`;
- `bun.lock`;
- variáveis de ambiente;
- módulos Clientes e Aceitação;
- equipe, funções, períodos ou planejamento.

## 9. Regras de implementação

1. Usar o `AuditEngagementRepository.create` existente.
2. Usar os repositórios de leitura existentes para carregar clientes e avaliações elegíveis.
3. Não criar uma regra paralela no front-end que substitua o RPC.
4. Não enviar `organizationId` informado manualmente pelo navegador.
5. Não alterar o contrato da ACE-001.
6. Não alterar o contrato do trabalho.
7. Fechar o formulário após sucesso.
8. Invalidar a consulta da lista após sucesso.
9. Impedir novo envio enquanto a operação estiver pendente.
10. Manter o formulário em modo de criação; não incluir edição.
11. Não incluir botões de ativar, cancelar ou encerrar.
12. Não incluir equipe, período ou planejamento.

## 10. Segurança e persistência

- a gravação será feita somente pelo RPC protegido existente;
- a interface não poderá gravar diretamente na tabela;
- o Supabase oficial será o único destino autorizado;
- Lovable Cloud não poderá ser ativado nem usado;
- RLS e autorização do servidor permanecerão como proteção definitiva;
- a avaliação usada deverá permanecer no campo `acceptance_assessment_id`;
- a criação deverá gerar histórico no banco conforme a Camada 1;
- nenhum dado de teste deverá ser criado sem autorização específica.

## 11. Critérios de aceite

A camada será considerada pronta para homologação quando:

1. usuário com `engagements.manage` visualizar a ação `Novo trabalho`;
2. usuário sem essa permissão não visualizar a ação nem conseguir criar por chamada direta;
3. formulário apresentar somente os campos autorizados;
4. clientes inativos não puderem ser selecionados;
5. avaliações não aprovadas não puderem ser selecionadas;
6. cliente e avaliação forem apresentados de forma compreensível;
7. dados inválidos forem rejeitados antes do envio;
8. RPC rejeitar novamente qualquer tentativa inválida;
9. trabalho válido for criado em `draft`;
10. avaliação ACE utilizada ficar preservada;
11. código duplicado for tratado sem duplicar registro;
12. envio duplicado for impedido;
13. lista atualizar após criação;
14. registro permanecer disponível após recarregar;
15. nenhum fluxo de edição ou mudança de estado aparecer;
16. build e verificações locais passarem;
17. somente os arquivos autorizados forem alterados.

## 12. Verificações negativas obrigatórias

Antes de publicar a camada, confirmar que:

- não existe criação direta via `.insert` no front-end;
- não existe alteração de migration;
- não existe chamada a `update_audit_engagement`;
- não existe chamada a `change_audit_engagement_status`;
- não existe edição de trabalho;
- não existe ativação automática do trabalho;
- não existe alteração de cliente ou avaliação;
- não existe criação de equipe, período ou planejamento;
- não existe alteração de ACL, autenticação ou variáveis;
- não existe uso do Lovable Cloud;
- não existe uso de Superpowers;
- não existe alteração fora da lista autorizada.

## 13. Dados de homologação

Qualquer criação real no ambiente oficial deverá ser autorizada separadamente e identificada como dado de homologação.

O plano deverá definir, antes da execução:

- cliente elegível;
- avaliação ACE aprovada;
- código de teste;
- título de teste;
- escopo de teste;
- procedimento para não confundir o dado com trabalho real;
- forma de encerramento ou preservação do registro.

Nenhum dado será criado apenas porque a minuta foi aprovada.

## 14. Responsabilidades

| Atividade | Responsável |
|---|---|
| Revisar requisitos e minuta | Work + responsável do projeto |
| Elaborar plano restritivo | Work |
| Implementar localmente, se autorizado | Codex |
| Alterar o Lovable | Não autorizado por esta minuta |
| Homologar o fluxo | Responsável do projeto |
| Revisar diff e testes | Codex |
| Autorizar dados de homologação | Responsável do projeto |
| Aprovar PR e merge | Responsável do projeto |

## 15. Condições para iniciar

A execução somente poderá iniciar após:

- aprovação desta minuta;
- elaboração e aprovação do plano restritivo da Camada 3;
- definição do cliente e da avaliação ACE para homologação;
- confirmação da lista final de arquivos;
- confirmação de que a branch parte da `main` atualizada;
- autorização específica para gravação de dado de homologação, se necessária.

## 16. Condições de interrupção

A execução deverá parar imediatamente se:

- a interface exigir alteração do domínio ou repositório;
- a avaliação ACE não puder ser carregada pelo contrato existente;
- for necessário alterar RPC, RLS, ACL ou migration;
- o cliente de teste não possuir aprovação ACE aplicável;
- a ferramenta tentar criar dados sem autorização;
- a ferramenta tentar iniciar a Camada 4;
- houver tentativa de ativar Lovable Cloud;
- houver necessidade de alterar arquivo não autorizado.

## 17. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação da minuta da Camada 3 — criação controlada | Em revisão |

## 18. Decisão solicitada

Solicita-se a revisão e aprovação desta minuta para elaboração do plano restritivo da Camada 3.

A aprovação desta minuta não autoriza código, gravação de dados, publicação, PR ou merge.
