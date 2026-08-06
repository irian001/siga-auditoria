---
id: SIGA-PLN-PNL-001-E01
title: Plano de Implementação — PNL-001 Etapa 1 — Rota e Composição de Leitura
aliases:
  - Plano PNL-001 Etapa 1
  - Plano da Rota e Composição de Leitura
type: plano-implementacao
domain: clientes-e-trabalhos
status: aprovado
version: 1.0
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
depends_on:
  - SIGA-PNL-001-E01
related:
  - "[[Constituição do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-PNL-001]]"
  - "[[PNL-001 Etapa 1]]"
  - "[[Plano da PNL-001]]"
  - "[[Situação do Projeto]]"
obsidian:
  note_type: implementation-plan
  graph_role: operational
  backlinks_expected: true
  dataview_ready: true
tags: [siga, pnl-001, etapa-1, plano, implementacao, codex]
---

# Plano de Implementação — PNL-001 Etapa 1

## 1. Finalidade

Este plano transforma a [[PNL-001 Etapa 1]] aprovada em uma execução técnica curta, controlada e verificável.

O plano autoriza somente a criação da rota protegida e da composição inicial de leitura do painel. Não autoriza a estrutura visual completa, a integração da equipe, períodos, ações, publicação ou avanço para a Etapa 2.

## 2. Responsável e ferramentas

- execução: Codex, localmente, em branch própria;
- revisão funcional: responsável pelo projeto;
- revisão técnica: Codex, por diff, testes e compilação;
- Lovable: não utilizado;
- Superpowers: não utilizado;
- GitHub: registro posterior da branch e do PR, após revisão e autorização.

## 3. Pré-condições

Antes de alterar qualquer arquivo:

1. confirmar que a branch parte da `main` atualizada;
2. registrar o estado do Git;
3. preservar as alterações locais não relacionadas existentes em `src/routeTree.gen.ts` e `supabase/.temp/`;
4. verificar os contratos de leitura já disponíveis;
5. confirmar que não há migration, tabela, política, permissão ou dependência necessária;
6. não iniciar a etapa se a implementação exigir ampliação de escopo.

## 4. Arquivos autorizados

### 4.1 Novos

- `src/routes/trabalhos.$engagementId.tsx`;
- `src/features/engagements/EngagementDashboardPage.tsx`;
- `tests/features/engagementDashboardPage.test.ts`;
- `tests/features/engagementDashboardScope.test.ts`, somente se necessária a separação dos testes.

### 4.2 Existentes

- `src/routeTree.gen.ts`, somente gerado automaticamente pela ferramenta de rotas;
- repositórios de trabalho, cliente e aceitação, somente se uma lacuna de leitura for comprovada;
- testes diretamente ligados a contratos alterados;
- documentos da PNL-001 e `docs/status/SITUACAO_DO_PROJETO.md`, somente para registrar o resultado.

### 4.3 Proibidos

Não alterar:

- `src/domain/authorization.ts`;
- autenticação ou ACL geral;
- `src/config/navigation.ts`;
- módulos de clientes, aceitação ou equipe fora da leitura necessária;
- `package.json` ou lockfiles;
- migrations, RLS, tabelas, Supabase ou variáveis de ambiente;
- `supabase/.temp/`;
- Lovable Cloud;
- módulos dos Grupos 03 a 07.

## 5. Sequência fechada de execução

### Passo 1 — Inspeção dos contratos

Confirmar as assinaturas e o comportamento de:

- `AuditEngagementRepository.getById`;
- `ClientRepository.getById`;
- `AcceptanceRepository.getById`;
- contexto de sessão, organização e autorização.

Se algum contrato estiver ausente ou exigir alteração estrutural, parar e apresentar o bloqueio.

### Passo 2 — Rota protegida

Criar `/trabalhos/$engagementId` usando o padrão de rotas existente.

A rota deverá respeitar o fluxo atual de autenticação e impedir a leitura quando não houver sessão, vínculo organizacional ativo ou `engagements.view`.

### Passo 3 — Composição de leitura

Criar a página técnica que:

- obtenha o trabalho pelo identificador;
- obtenha o cliente vinculado;
- obtenha a aceitação vinculada;
- mantenha o contexto organizacional;
- não crie dados simulados nem altere dados persistidos.

Nesta etapa, a apresentação poderá ser mínima. Cabeçalho, cartões, equipe, períodos, ações e navegação completa ficam para etapas posteriores.

### Passo 4 — Estados de resultado

Tratar explicitamente:

- carregamento;
- sucesso;
- trabalho inexistente;
- acesso negado;
- erro de leitura;
- vínculo ausente ou inconsistente de cliente/aceitação.

Mensagens deverão ser claras e não revelar dados de outro contexto organizacional.

### Passo 5 — Testes direcionados

Implementar ou ajustar testes para verificar:

1. acesso autorizado ao trabalho da própria organização;
2. bloqueio sem `engagements.view`;
3. bloqueio para trabalho de outra organização;
4. tratamento de trabalho inexistente;
5. composição de trabalho, cliente e aceitação;
6. tratamento de erro sem dados fictícios;
7. preservação da proteção da rota.

## 6. Verificações locais

Ao final do Passo 5, executar:

- testes direcionados da etapa;
- lint aplicável aos arquivos alterados;
- compilação local;
- conferência do diff;
- conferência da lista completa de arquivos alterados.

Falha de compilação, alteração fora do escopo ou necessidade de banco interrompe a execução.

## 7. Gate de revisão

A execução deverá parar antes de qualquer publicação e apresentar:

- resumo da implementação;
- contratos reutilizados;
- arquivos criados e alterados;
- testes executados e resultados;
- limitações;
- confirmação de que Etapa 2 não foi iniciada;
- confirmação de que Lovable, Superpowers, Supabase e migrations não foram utilizados.

Somente após revisão e autorização específica será permitido publicar a branch e abrir PR.

## 8. Critérios de conclusão da Etapa 1

A etapa estará concluída quando:

- a rota protegida existir;
- a composição de leitura funcionar dentro da organização autorizada;
- os estados de erro e acesso estiverem tratados;
- os testes, lint e compilação forem aprovados;
- o diff estiver limitado aos arquivos autorizados;
- não houver mudança em banco, autenticação, ACL, permissões ou dependências;
- o responsável pelo projeto revisar e aprovar o resultado.

## 9. Proibições de avanço

Não iniciar nesta execução:

- Etapa 2;
- composição visual completa;
- botão **Abrir painel** na listagem;
- equipe, funções ou períodos;
- ações de edição, encerramento ou cancelamento;
- módulos futuros;
- publicação automática;
- merge na `main`.

## 10. Próximo passo após a aprovação deste plano

Iniciar o Passo 1 — inspeção dos contratos — e somente depois executar a Etapa 1 conforme a sequência fechada. Ao primeiro bloqueio real, interromper e solicitar decisão.

## 11. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação do plano restritivo da Etapa 1 da PNL-001 | Substituída |
| 1.0 | 2026-08-06 | Aprovação do plano restritivo da Etapa 1 | Aprovado |
