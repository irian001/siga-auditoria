---
id: SIGA-TRB-001-C2
title: TRB-001 — Camada 2 — Consulta Visual dos Trabalhos
aliases:
  - Consulta Visual de Trabalhos
  - Camada 2 da TRB-001
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
  - SIGA-PLN-TRB-001
  - SIGA-TRB-001-C0
  - SIGA-TRB-001-C1
related:
  - "[[SDD-TRB-001]]"
  - "[[Plano de Implantação — SDD-TRB-001 Criação e Gestão do Trabalho]]"
  - "[[TRB-001 — Camada 0 — Reconciliação do Contrato]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
obsidian:
  note_type: implementation-layer
  graph_role: execution-step
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - grupo-02
  - trb-001
  - camada-02
  - consulta
  - somente-leitura
  - visual
---

# TRB-001 — Camada 2 — Consulta Visual dos Trabalhos

## 1. Finalidade da minuta

Definir a próxima camada de implementação da [[SDD-TRB-001]], limitada à consulta visual e somente leitura dos trabalhos de auditoria já persistidos no Supabase oficial.

Esta minuta não autoriza ainda a implementação. Ela deverá ser revisada e aprovada antes da elaboração do plano restritivo e da execução.

## 2. Situação de origem

As seguintes entregas já estão disponíveis:

- Camada 0 de reconciliação aprovada;
- Camada 1 integrada à `main` pelo PR #39;
- tabela `audit_engagements` criada no Supabase oficial;
- RLS, permissões e RPCs da Camada 1 disponíveis;
- domínio e contrato do repositório de trabalhos versionados;
- rota `/trabalhos` ainda apresentada como módulo futuro;
- nenhuma camada visual de trabalhos implementada.

## 3. Objetivo único

Permitir que um usuário autenticado e autorizado consulte os trabalhos da própria organização, com busca, filtros básicos e visão resumida, sem criar, editar, cancelar, encerrar ou alterar qualquer dado.

## 4. Escopo autorizado

### 4.1 Consulta

- listar trabalhos retornados pelo `AuditEngagementRepository.list`;
- respeitar a organização do contexto autenticado;
- pesquisar por código ou título;
- filtrar por estado;
- filtrar por cliente quando o identificador estiver disponível;
- apresentar paginação ou limite compatível com o contrato existente;
- abrir uma visão resumida somente leitura;
- apresentar a avaliação ACE utilizada como fundamento, por seu identificador;
- apresentar estados vazios, carregamento e erro de forma compreensível;
- preservar o tema visual atual do SIGA.

### 4.2 Informações exibidas

Cada item poderá apresentar somente informações já disponíveis no contrato:

- código;
- título;
- cliente ou identificador do cliente;
- estado;
- classificação;
- escopo preliminar, quando exibido na visão resumida;
- identificador da avaliação ACE utilizada;
- data de criação;
- data da última atualização.

O estado `draft` deverá ser apresentado como elaboração. `active`, `closed` e `cancelled` deverão possuir rótulos compreensíveis, sem alterar os valores persistidos.

## 5. Fora do escopo

Não será permitido nesta camada:

- criar trabalho;
- editar trabalho;
- alterar estado;
- cancelar ou encerrar trabalho;
- excluir ou inativar trabalho;
- criar equipe, funções ou período;
- iniciar planejamento;
- acessar balancete, riscos, procedimentos, evidências ou papéis;
- criar tabelas, migrations, RPCs ou políticas;
- modificar ACL, autenticação ou variáveis de ambiente;
- ativar ou utilizar Lovable Cloud;
- adicionar dependências;
- alterar domínio ou repositório Supabase já implementado;
- corrigir problemas fora do escopo da TRB-001;
- iniciar a Camada 3.

## 6. Arquivos autorizados para implementação futura

### 6.1 Arquivos novos permitidos

- `src/features/engagements/EngagementsPage.tsx`;
- `src/features/engagements/engagementsPresentation.ts`.

### 6.2 Arquivos existentes permitidos

- `src/routes/trabalhos.tsx` — somente para substituir o placeholder pela página de consulta;
- `src/config/navigation.ts` — somente para disponibilizar o item Trabalhos e ajustar sua descrição, sem alterar outros módulos.

### 6.3 Arquivos proibidos

Não poderão ser criados, alterados, removidos ou renomeados:

- `src/domain/`;
- `src/data/`;
- `src/data/supabase/`;
- `supabase/`;
- migrations;
- autenticação;
- ACL e permissões;
- rotas diferentes de `src/routes/trabalhos.tsx`;
- `package.json`;
- `bun.lock`;
- variáveis de ambiente;
- componentes de outros módulos;
- arquivos de configuração não listados.

## 7. Regras funcionais

1. A página deverá verificar `engagements.view` antes de consultar.
2. Usuário sem essa permissão deverá receber uma mensagem de acesso não autorizado.
3. A consulta deverá utilizar o repositório Supabase já existente.
4. A organização não poderá ser informada livremente pela interface.
5. A consulta deverá permanecer somente leitura.
6. Nenhum botão ou ação de criação deverá aparecer nesta camada.
7. Nenhum formulário de trabalho deverá ser apresentado.
8. A avaliação ACE deverá ser apresentada como referência histórica, não como ação editável.
9. O usuário deverá compreender que equipe, período e planejamento pertencem a etapas posteriores.
10. Falhas de rede, sessão ou permissão deverão ser exibidas sem revelar dados de outra organização.

## 8. Regras de experiência visual

- utilizar os componentes e padrões visuais já existentes;
- preservar o tema escuro atual;
- evitar dashboards ou indicadores que não estejam previstos nesta camada;
- não apresentar campos vazios como se fossem funcionalidades disponíveis;
- utilizar textos claros para estados vazios e bloqueios;
- manter a navegação compatível com a estrutura existente;
- evitar mudanças em Clientes, Aceitação, Autenticação ou Fundação.

## 9. Estados obrigatórios da tela

### 9.1 Carregando

Informar que os trabalhos estão sendo consultados.

### 9.2 Pronto

Apresentar a lista, os filtros permitidos e a quantidade retornada pelo repositório.

### 9.3 Vazio

Informar que não há trabalhos disponíveis para a organização ou para os filtros atuais.

Não apresentar botão para criar trabalho nesta camada.

### 9.4 Sem autorização

Informar que o usuário não possui permissão para consultar trabalhos.

### 9.5 Erro

Informar que a consulta não pôde ser concluída, sem expor detalhes internos ou dados de outra organização.

## 10. Critérios de aceite

A camada será considerada pronta para homologação quando:

1. `/trabalhos` deixar de apresentar o placeholder de módulo futuro;
2. usuário autorizado conseguir consultar a lista;
3. a consulta utilizar o repositório oficial existente;
4. busca por código ou título funcionar;
5. filtro por estado funcionar;
6. filtro por cliente, se apresentado, respeitar a organização autenticada;
7. a visão resumida não permitir edição;
8. a avaliação ACE vinculada aparecer como referência;
9. usuário sem `engagements.view` não visualizar dados;
10. nenhum dado for criado ou alterado durante a consulta;
11. recarregar a página não provocar gravação nem alteração;
12. equipe, período e planejamento não aparecerem como implementados;
13. o tema visual permanecer consistente;
14. build e verificações locais passarem;
15. a lista completa de arquivos alterados coincidir com a lista autorizada.

## 11. Verificações negativas obrigatórias

Durante a revisão deverão ser confirmados:

- não existe botão `Novo trabalho` nesta camada;
- não existe formulário de criação;
- não existe chamada a `create_audit_engagement`;
- não existe chamada a `update_audit_engagement`;
- não existe chamada a `change_audit_engagement_status`;
- não existe escrita em tabela;
- não existe alteração de migration;
- não existe uso do Lovable Cloud;
- não existe alteração em clientes ou avaliações;
- não existe avanço para equipe, período ou planejamento.

## 12. Responsabilidades

| Atividade | Responsável |
|---|---|
| Revisar requisitos e esta minuta | Work + responsável do projeto |
| Definir plano restritivo da camada | Work |
| Implementar localmente, se autorizado | Codex |
| Alterar o Lovable | Não autorizado por esta minuta |
| Homologar visualmente | Responsável do projeto |
| Revisar diff e testes | Codex |
| Aprovar PR e merge | Responsável do projeto |

## 13. Condições para iniciar

A execução somente poderá iniciar após:

- aprovação desta minuta;
- elaboração e aprovação de um plano restritivo da Camada 2;
- confirmação da lista final de arquivos autorizados;
- confirmação de que a branch parte da `main` após o merge do PR #39;
- confirmação de que nenhuma escrita será realizada no Supabase nesta camada.

## 14. Pendências conhecidas

- decidir se o cliente será apresentado apenas pelo `clientId` ou por nome obtido por consulta de leitura separada;
- decidir se a visão resumida será um painel, diálogo ou rota própria;
- confirmar o limite de itens por página;
- manter registrada a diferença entre o nome local e o identificador remoto da migration da Camada 1.

Essas pendências deverão ser fechadas no plano, sem ampliar o escopo da camada.

## 15. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação da minuta da Camada 2 — consulta visual somente leitura | Em revisão |

## 16. Decisão solicitada

Solicita-se a revisão e aprovação desta minuta para que seja elaborado o plano restritivo de implementação da Camada 2.

A aprovação desta minuta não autoriza código, alteração de arquivos, alteração do banco, publicação ou merge.
