---
id: SIGA-PLN-TRB-001-C3
title: Plano Restritivo — TRB-001 Camada 3 — Criação Controlada
aliases:
  - Plano da Camada 3 da TRB-001
  - Plano de Criação Controlada de Trabalhos
type: plano-implantacao
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: minuta
implementation_status: nao-iniciada
version: 0.1
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
responsible:
  coordination: work
  implementation: codex-local-controlado
  visual_homologation: responsavel-projeto
  approval: responsavel-projeto
implements:
  - SIGA-TRB-001-C3
depends_on:
  - SIGA-SDD-TRB-001
  - SIGA-TRB-001-C2
  - SIGA-ACE-001
  - SIGA-CLI-001
related:
  - "[[SDD-TRB-001]]"
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
  - camada-03
  - plano
  - criacao
  - supabase
  - rastreabilidade
---

# Plano Restritivo — TRB-001 Camada 3 — Criação Controlada

## 1. Finalidade

Definir a execução controlada da Camada 3 da [[TRB-001 — Camada 3 — Criação Controlada do Trabalho]].

O objetivo é criar trabalhos reais em estado `draft`, usando o contrato e o RPC já implantados na Camada 1.

O plano não autoriza mudanças em banco, migrations, RPCs, RLS, ACL ou autenticação.

## 2. Resultado esperado

Um usuário autenticado com `engagements.manage` deverá conseguir:

- abrir o formulário de criação;
- selecionar cliente ativo da própria organização;
- selecionar avaliação ACE final aprovada e aplicável;
- informar código, título, escopo preliminar e classificação;
- enviar uma única vez;
- criar o trabalho em `draft`;
- visualizar o registro na lista após a criação;
- recarregar a página e consultar o registro persistido.

Usuários sem `engagements.manage` não deverão criar trabalhos.

## 3. Limite da camada

### Dentro do escopo

- formulário de criação;
- seleção de cliente elegível;
- seleção de avaliação ACE aprovada;
- validação visual dos campos;
- chamada a `AuditEngagementRepository.create`;
- confirmação de sucesso;
- atualização da lista;
- prevenção de envio duplicado;
- tratamento de erros de autorização, validação e conflito.

### Fora do escopo

- edição;
- ativação;
- cancelamento;
- encerramento;
- reabertura;
- equipe;
- funções;
- períodos;
- planejamento;
- balancete;
- riscos;
- procedimentos;
- documentos;
- evidências;
- novos dados estruturais;
- alterações no Supabase;
- Lovable Cloud;
- Superpowers.

## 4. Arquivos autorizados

### 4.1 Arquivo novo

- `src/features/engagements/EngagementForm.tsx`

### 4.2 Arquivos existentes

- `src/features/engagements/EngagementsPage.tsx` — abrir o formulário, carregar opções, executar a criação e atualizar a lista;
- `src/features/engagements/engagementsPresentation.ts` — somente textos, rótulos e mensagens da camada.

### 4.3 Arquivos proibidos

Nenhum outro arquivo poderá ser criado, alterado, removido ou renomeado.

São proibidos, especialmente:

- `src/domain/`;
- `src/data/`;
- `src/data/supabase/`;
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
- módulos Clientes e Aceitação.

## 5. Regras de seleção

### 5.1 Cliente

O formulário deverá carregar clientes por consulta autorizada e permitir somente cliente:

- da organização autenticada;
- com status `active`;
- disponível no contrato existente.

Cliente inativo não deverá ser enviado ao RPC.

### 5.2 Avaliação ACE

O formulário deverá apresentar somente avaliações:

- do cliente selecionado;
- da organização autenticada;
- com decisão final aprovada;
- aplicáveis à criação do trabalho;
- sem decisão posterior incompatível.

Se não houver avaliação elegível, a criação deverá permanecer bloqueada e a interface deverá orientar o usuário.

### 5.3 Revalidação no servidor

A filtragem visual não substitui a validação do RPC.

O servidor deverá continuar sendo responsável por rejeitar manipulação de identificadores, organização, cliente ou avaliação.

## 6. Campos e regras do formulário

| Campo | Obrigatório | Regra |
|---|---:|---|
| Cliente | Sim | Cliente ativo e elegível |
| Avaliação ACE | Sim | Avaliação final aprovada e aplicável |
| Código | Sim | Texto preenchido e único na organização |
| Título | Sim | Texto preenchido e compreensível |
| Escopo preliminar | Sim | Texto preenchido; não substitui planejamento |
| Classificação | Sim | Valor controlado `audit` |

O estado inicial não será um campo do formulário. Todo trabalho nascerá em `draft`.

## 7. Sequência de execução

### Etapa 1 — Preparação

- confirmar branch baseada na `main` após a Camada 2;
- confirmar worktree limpo;
- confirmar os três arquivos autorizados;
- confirmar que nenhum dado de homologação será criado ainda;
- verificar os contratos de clientes e ACE existentes.

### Etapa 2 — Implementação local

- criar `EngagementForm.tsx`;
- adicionar abertura controlada na `EngagementsPage.tsx`;
- carregar clientes e avaliações por leitura;
- chamar somente `repository.create` no envio;
- invalidar a lista após sucesso;
- adicionar textos e mensagens em `engagementsPresentation.ts`.

### Etapa 3 — Verificação técnica

- build local;
- `git diff --check`;
- conferência dos arquivos alterados;
- busca por operações proibidas;
- conferência de que não houve migration;
- conferência de que não houve chamada de edição ou mudança de estado.

### Etapa 4 — Validação visual

- usuário com permissão visualiza `Novo trabalho`;
- usuário sem permissão não visualiza a ação;
- cliente inativo não aparece como elegível;
- ACE pendente não aparece como elegível;
- formulário apresenta somente os campos aprovados;
- mensagens e bloqueios são compreensíveis;
- sucesso fecha o formulário e atualiza a lista.

### Etapa 5 — Homologação de persistência

Esta etapa somente ocorrerá após autorização específica para criar um dado de homologação no Supabase oficial.

O responsável deverá confirmar previamente:

- cliente elegível;
- avaliação ACE aprovada;
- código de teste;
- título de teste;
- escopo de teste;
- tratamento posterior do trabalho criado.

Sem essa autorização, a validação ficará restrita à implementação local e à revisão do fluxo.

## 8. Critérios de aceite

O plano será considerado executado quando:

1. formulário abrir somente para `engagements.manage`;
2. cliente ativo puder ser selecionado;
3. cliente inativo ficar bloqueado;
4. avaliação ACE aprovada puder ser selecionada;
5. avaliação pendente ficar bloqueada;
6. campos obrigatórios forem validados;
7. código duplicado for tratado sem duplicidade;
8. envio duplicado for impedido;
9. criação válida resultar em `draft`;
10. avaliação usada ficar preservada;
11. lista for atualizada após sucesso;
12. registro permanecer após recarregar, quando a homologação real for autorizada;
13. nenhum botão de edição ou transição for apresentado;
14. build passar;
15. somente os arquivos autorizados forem alterados;
16. relatório da execução confirmar as restrições.

## 9. Verificações negativas obrigatórias

Confirmar antes de publicar:

- nenhum `.insert` direto no front-end;
- nenhuma alteração em `src/domain`;
- nenhuma alteração em `src/data`;
- nenhuma alteração em Supabase;
- nenhuma nova migration;
- nenhuma chamada a `update_audit_engagement`;
- nenhuma chamada a `change_audit_engagement_status`;
- nenhum botão de ativar, editar, cancelar ou encerrar;
- nenhuma criação de equipe, período ou planejamento;
- nenhum uso do Lovable Cloud;
- nenhum uso de Superpowers;
- nenhum arquivo fora da lista autorizada.

## 10. Política de dados de homologação

A aprovação deste plano não autoriza a criação automática de dados reais.

O dado de homologação somente poderá ser criado depois de autorização expressa e deverá possuir identificação clara para não ser confundido com trabalho real.

Se não houver cliente com ACE aprovada, a execução deverá parar nessa etapa e registrar o bloqueio, sem criar avaliação ou cliente artificial.

## 11. Política de ferramentas

- Work: coordenação e acompanhamento;
- Codex: implementação local e verificações;
- Supabase: gravação somente no fluxo de homologação autorizada;
- Lovable: não autorizado nesta camada;
- Superpowers: não utilizar; reservada ao Grupo 07.

## 12. Condições de interrupção

Parar imediatamente se:

- for necessário alterar contrato existente;
- a ACE aprovada não estiver disponível;
- a criação exigir mudança de RPC, RLS ou migration;
- houver tentativa de gravar sem autorização;
- houver tentativa de ampliar o formulário;
- houver tentativa de iniciar edição ou ciclo de vida;
- houver tentativa de alterar arquivo não autorizado;
- houver tentativa de ativar Lovable Cloud.

## 13. Entrega obrigatória

O relatório da execução deverá informar:

- resumo da implementação;
- arquivos alterados;
- arquivos não alterados;
- regras de elegibilidade aplicadas;
- testes executados;
- resultado do build;
- resultado da validação visual;
- eventual dado de homologação criado;
- confirmação de que nenhum dado foi criado sem autorização;
- confirmação de que a Camada 4 não foi iniciada.

## 14. Aprovação solicitada

Este plano está em minuta e aguarda aprovação do responsável pelo projeto.

A aprovação autorizará somente a implementação local controlada da Camada 3, dentro da lista de arquivos e restrições acima.

A criação de dado no Supabase oficial, a publicação, a abertura de PR e o merge dependerão de autorizações específicas posteriores.

## 15. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação do plano restritivo da Camada 3 | Em revisão |
