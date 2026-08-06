---
id: SIGA-PLN-TRB-001-C2
title: Plano Restritivo — TRB-001 Camada 2 — Consulta Visual
aliases:
  - Plano da Camada 2 da TRB-001
  - Plano de Consulta Visual de Trabalhos
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
  - SIGA-TRB-001-C2
depends_on:
  - SIGA-SDD-TRB-001
  - SIGA-PLN-TRB-001
  - SIGA-TRB-001-C0
  - SIGA-TRB-001-C1
related:
  - "[[SDD-TRB-001]]"
  - "[[TRB-001 — Camada 2 — Consulta Visual dos Trabalhos]]"
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
  - camada-02
  - plano
  - somente-leitura
  - consulta
---

# Plano Restritivo — TRB-001 Camada 2 — Consulta Visual

## 1. Finalidade

Definir a execução controlada da Camada 2 da [[TRB-001 — Camada 2 — Consulta Visual dos Trabalhos]].

Esta camada somente apresentará trabalhos existentes. Não haverá criação, edição, mudança de estado, gravação, migration, RPC de escrita ou alteração de segurança.

Este plano deverá ser aprovado antes de qualquer alteração de código.

## 2. Resultado esperado

Após a execução, um usuário autenticado com `engagements.view` deverá conseguir:

- abrir `/trabalhos`;
- consultar trabalhos da própria organização;
- pesquisar por código ou título;
- filtrar por estado;
- filtrar por cliente, se o contrato visual utilizar esse campo;
- abrir uma visão resumida somente leitura;
- visualizar a avaliação ACE utilizada como referência;
- compreender que equipe, período e planejamento ainda pertencem a etapas futuras.

Usuários sem `engagements.view` não deverão visualizar dados.

## 3. Origem técnica

- PR #39 já foi mesclado na `main`;
- Camada 1 está disponível no repositório e no Supabase oficial;
- `AuditEngagementRepository.list` e `getById` já existem;
- `src/routes/trabalhos.tsx` ainda apresenta o módulo futuro;
- não existe página visual de trabalhos;
- a Camada 3 de criação continua proibida nesta execução.

## 4. Escopo fechado

### 4.1 Dentro do escopo

- página visual de consulta;
- consulta ao repositório oficial já existente;
- lista de trabalhos;
- busca por código e título;
- filtro por estado;
- filtro por cliente, se implementado sem criar novo contrato;
- visão resumida;
- estados de carregamento, vazio, erro e não autorizado;
- disponibilização do item Trabalhos na navegação;
- preservação do tema visual.

### 4.2 Fora do escopo

- criação de trabalho;
- formulário de trabalho;
- edição;
- cancelamento;
- encerramento;
- alteração de status;
- qualquer escrita no Supabase;
- mudança no domínio;
- mudança no repositório;
- mudança em RPCs ou migrations;
- mudança em RLS ou permissões;
- equipe, funções e períodos;
- planejamento;
- painel operacional;
- integração com clientes ou ACE além da leitura;
- Lovable Cloud;
- novas dependências;
- refatoração geral.

## 5. Arquivos autorizados

### 5.1 Arquivos novos

1. `src/features/engagements/EngagementsPage.tsx`
2. `src/features/engagements/engagementsPresentation.ts`

### 5.2 Arquivos existentes

1. `src/routes/trabalhos.tsx` — substituir somente o placeholder;
2. `src/config/navigation.ts` — alterar somente o item `trabalhos` para disponibilidade e descrição.

### 5.3 Arquivos proibidos

Nenhum outro arquivo poderá ser criado, alterado, removido ou renomeado.

São especialmente proibidos:

- `src/domain/`;
- `src/data/`;
- `src/data/supabase/`;
- `supabase/`;
- migrations;
- autenticação;
- ACL;
- permissões;
- `package.json`;
- `bun.lock`;
- variáveis de ambiente;
- rotas diferentes de `src/routes/trabalhos.tsx`;
- módulos Clientes e Aceitação.

## 6. Implementação autorizada

### 6.1 Página

A página deverá:

- obter o contexto autenticado pela estrutura existente;
- verificar `engagements.view`;
- montar filtros locais;
- consultar o repositório oficial em modo de leitura;
- apresentar a lista;
- permitir atualização da consulta;
- abrir visão resumida sem mutação.

### 6.2 Apresentação

Os textos e rótulos deverão ser centralizados em `engagementsPresentation.ts` quando isso seguir o padrão existente.

Não será criado catálogo de estados novo. Os valores existentes deverão apenas receber rótulos de apresentação.

### 6.3 Navegação

O item Trabalhos poderá deixar de aparecer como planejado e passar a indicar consulta disponível.

Nenhum outro item da navegação poderá ser alterado.

## 7. Regras de consulta

1. A organização será obtida do contexto autenticado.
2. A página não poderá aceitar `organizationId` digitado pelo usuário.
3. O repositório deverá receber somente filtros compatíveis com seu contrato.
4. A consulta deverá usar `list` e, se necessário, `getById`.
5. Não poderá chamar `create`, `update` ou `changeStatus`.
6. A referência ACE será somente exibida.
7. A ausência de trabalhos não poderá gerar registro automático.
8. Recarregar a página deverá apenas consultar novamente.
9. O usuário não poderá editar os valores exibidos.

## 8. Critérios visuais

- preservar tema escuro;
- utilizar componentes já existentes;
- manter o padrão de cabeçalho e estados da aplicação;
- não criar dashboard avançado;
- não apresentar ações futuras como disponíveis;
- indicar claramente que a consulta é somente leitura;
- evitar mostrar IDs técnicos quando houver rótulo funcional disponível;
- caso somente o ID do cliente esteja disponível, apresentá-lo de forma explícita e não inventar nome.

## 9. Sequência de execução

### Etapa 1 — Preparação

- confirmar branch baseada na `main` após o merge do PR #39;
- confirmar worktree limpo;
- confirmar lista de arquivos autorizados;
- verificar que nenhum arquivo fora da lista será alterado.

### Etapa 2 — Implementação local

- criar `EngagementsPage.tsx`;
- criar `engagementsPresentation.ts`;
- substituir o placeholder em `trabalhos.tsx`;
- ajustar somente o item Trabalhos em `navigation.ts`;
- não alterar domínio, dados ou Supabase.

### Etapa 3 — Verificação técnica

- conferir `git diff --check`;
- executar build local;
- executar verificações disponíveis do projeto;
- conferir lista completa de arquivos alterados;
- procurar chamadas proibidas de escrita;
- confirmar ausência de migration nova.

### Etapa 4 — Revisão humana

- apresentar resumo;
- apresentar diff;
- confirmar estados da tela;
- aguardar validação visual do responsável;
- não publicar nem abrir PR antes da autorização correspondente.

## 10. Verificações negativas obrigatórias

Antes de considerar a camada pronta, confirmar que:

- não existe botão `Novo trabalho`;
- não existe formulário de criação;
- não existe chamada a `create_audit_engagement`;
- não existe chamada a `update_audit_engagement`;
- não existe chamada a `change_audit_engagement_status`;
- não existe `insert`, `update`, `delete` ou `upsert` para trabalhos;
- não existe alteração em migrations;
- não existe alteração em ACL;
- não existe alteração em autenticação;
- não existe ativação do Lovable Cloud;
- não existe referência a equipe, período ou planejamento como função disponível;
- não existe alteração fora dos quatro arquivos autorizados.

## 11. Critérios de aceite

O plano será considerado executado quando:

1. `/trabalhos` apresentar a consulta visual;
2. usuário autorizado visualizar apenas os trabalhos da própria organização;
3. busca e filtros funcionarem;
4. visão resumida funcionar em modo somente leitura;
5. referência ACE aparecer sem possibilidade de alteração;
6. estados de carregamento, vazio, erro e não autorizado funcionarem;
7. nenhum dado for gravado;
8. a tela não avançar para criação ou edição;
9. build local passar;
10. o diff conter somente os arquivos autorizados;
11. a validação visual do responsável for registrada;
12. a camada seguinte não for iniciada automaticamente.

## 12. Política de ferramentas

- Work: coordenação, escopo e documentação;
- Codex: implementação local controlada e verificações técnicas;
- Lovable: não autorizado nesta camada;
- Supabase: somente leitura decorrente da consulta da tela;
- Superpowers: não utilizar; permanece reservada ao Grupo 07.

## 13. Condições de interrupção

A execução deverá parar imediatamente se ocorrer qualquer situação abaixo:

- necessidade de alterar arquivo não autorizado;
- necessidade de criar novo contrato ou migration;
- ausência de permissão ou contexto autenticado não previsto;
- necessidade de modificar RLS, ACL ou autenticação;
- exigência de nome de cliente que não exista no contrato sem decisão prévia;
- erro no repositório que demande alteração fora da camada;
- tentativa da ferramenta de iniciar criação, edição ou mudança de estado;
- qualquer tentativa de ativar Lovable Cloud.

## 14. Entrega obrigatória ao final

O relatório da execução deverá conter:

- resumo do que foi implementado;
- lista completa de arquivos alterados;
- arquivos não alterados;
- funções disponíveis;
- funções explicitamente não implementadas;
- verificações executadas;
- resultado do build;
- confirmação de nenhuma escrita no Supabase;
- confirmação de nenhuma alteração em ACL, autenticação ou migrations;
- confirmação de que a Camada 3 não foi iniciada.

## 15. Aprovação solicitada

Este plano está em minuta e aguarda aprovação do responsável pelo projeto.

A aprovação autorizará somente a execução local controlada da Camada 2, dentro da lista fechada de arquivos e restrições acima.

Publicação, abertura de PR, merge ou homologação em ambiente publicado dependerão de autorização posterior específica.

## 16. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação do plano restritivo da Camada 2 | Em revisão |
