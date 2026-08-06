---
id: SIGA-PLN-TRB-001
title: Plano de Implantação — SDD-TRB-001 Criação e Gestão do Trabalho
aliases:
  - Plano TRB-001
  - Plano de Implantação de Trabalhos
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
  visual_implementation: lovable
  technical_implementation: codex
  approval: responsavel-projeto
implements:
  - SIGA-SDD-TRB-001
depends_on:
  - SIGA-SDD-CLI-001
  - SIGA-SDD-ACE-001
  - SIGA-SDD-ACL-001
related:
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[SDD-TRB-001]]"
  - "[[SDD-ACE-001]]"
  - "[[SDD-EQP-001]]"
  - "[[SDD-PNL-001]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
obsidian:
  note_type: implementation-plan
  graph_role: execution-plan
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, plano, grupo-02, trabalho, auditoria, lovable, codex, supabase, camadas]
---

# Plano de Implantação — SDD-TRB-001

## 1. Objetivo

Implantar a [[SDD-TRB-001]] em camadas pequenas, controladas, verificáveis e reversíveis.

O resultado deverá permitir criar e administrar o registro de um trabalho de auditoria a partir de um cliente ativo, somente quando existir avaliação de aceitação ou continuidade aprovada e aplicável.

Esta implantação não criará equipe, funções, períodos, planejamento, balancete, riscos, procedimentos, evidências ou relatórios.

## 2. Estado técnico de origem

Na elaboração deste plano:

- os Grupos 00 e 01 estão concluídos e integrados;
- a [[SDD-CLI-001]] está implantada com clientes no Supabase oficial;
- a [[SDD-ACE-001]] foi homologada no fluxo autenticado;
- o ambiente oficial já demonstrou uma avaliação persistida no estado “aguardando decisão”;
- o PR da integração real da ACE-001 foi incorporado à `main`;
- a tabela lógica `audit_engagements` ainda não foi implantada;
- o painel funcional de trabalhos ainda não foi implementado;
- equipe, funções e períodos continuam reservados à [[SDD-EQP-001]];
- o painel do trabalho continua reservado à [[SDD-PNL-001]];
- Lovable Cloud não integra a arquitetura autorizada.

## 3. Princípios de execução

- a SDD e este plano deverão estar aprovados antes do código;
- a lista de arquivos autorizados será fechada antes de cada camada;
- cada camada terá um objetivo único;
- nenhuma ferramenta poderá adiantar a camada seguinte;
- o Work coordenará requisitos, escopo e decisões;
- o Lovable atuará principalmente na interface e nos fluxos visuais delimitados;
- o Codex atuará na integração, banco, segurança, testes técnicos e revisão;
- o Supabase oficial será a persistência autorizada;
- Lovable Cloud não será ativado nem usado como banco alternativo;
- não haverá gravação definitiva em mock depois da integração oficial;
- Superpowers não será utilizada na geração de código desta SDD;
- a utilização formal de Superpowers permanecerá reservada ao Grupo 07, na etapa de testes e liberação;
- cada camada será apresentada para validação antes da seguinte;
- nenhum merge ocorrerá sem autorização específica.

## 4. Decisões obrigatórias antes da implementação

O início da Camada 1 dependerá do registro das seguintes decisões.

### 4.1 Vínculo com a avaliação ACE

O trabalho deverá preservar a avaliação aprovada usada para sua criação.

O plano deverá escolher uma forma física única:

- `acceptance_assessment_id` em `audit_engagements`; ou
- tabela de vínculo explícito com integridade organizacional; ou
- outra solução formalmente aprovada.

Uma consulta momentânea sem persistência não será aceita.

### 4.2 Catálogo de estados

Deverá ser confirmado o catálogo mínimo:

- `draft` — elaboração;
- `active` — liberado para etapas posteriores;
- `closed` — encerrado;
- `cancelled` — cancelado.

Qualquer estado adicional deverá ser justificado e documentado.

### 4.3 Catálogo de classificações

`classification` é obrigatório, mas seus valores deverão ser controlados por catálogo aprovado. Não será permitido criar uma lista arbitrária durante a implementação visual.

### 4.4 Permissões

Deverão ser confirmadas no ACL:

- `engagements.view`;
- `engagements.manage`;
- `engagements.close`;
- `engagements.cancel`.

O catálogo efetivo deverá ser compatível com o padrão já utilizado no SIGA.

## 5. Limite técnico da implantação

### Dentro do escopo

- domínio e contratos do trabalho;
- persistência de `audit_engagements`;
- vínculo persistido com a avaliação aprovada;
- RLS e autorização multiempresa;
- lista e consulta resumida;
- criação controlada;
- edição limitada;
- estados, cancelamento e encerramento;
- eventos e histórico essenciais;
- integração autenticada com o Supabase oficial.

### Fora do escopo

- equipe, funções e períodos;
- planejamento e materialidade;
- segmentos econômicos;
- balancete e contas;
- processos, riscos e procedimentos;
- documentos e evidências;
- papéis de trabalho;
- revisão, achados e relatórios;
- portal do cliente;
- integrações externas;
- automações por IA.

## 6. Camadas de implantação

### Camada 0 — Reconciliação do contrato

**Objetivo:** fechar as decisões pendentes antes de tocar no código.

**Entregas:**

- confirmação do vínculo com a ACE;
- catálogo de estados;
- catálogo de classificações;
- permissões compatibilizadas;
- definição dos campos físicos;
- lista fechada de arquivos permitidos;
- confirmação de que não haverá alteração em equipe, períodos ou planejamento.

**Não altera:** código, banco, migration ou interface.

**Critério de saída:** decisão registrada e autorização da Camada 1.

### Camada 1 — Domínio, contratos e segurança

**Objetivo:** preparar a base técnica do trabalho sem criar uma experiência visual completa.

**Possíveis arquivos, sujeitos à lista final:**

- domínio de trabalhos;
- contrato do repositório de trabalhos;
- adaptador Supabase;
- migration de `audit_engagements`;
- migration ou vínculo da avaliação ACE;
- RPCs ou operações protegidas;
- políticas RLS;
- permissões do trabalho;
- testes de isolamento e autorização.

**Regras:**

- `organization_id` derivado do contexto;
- cliente e avaliação pertencentes à mesma organização;
- avaliação aprovada e aplicável obrigatória;
- cliente ativo obrigatório;
- código único por organização;
- nenhuma escrita em Lovable Cloud;
- nenhuma criação de equipe ou período.

**Critério de saída:** build local, verificação da migration, RLS e operações negativas sem vazamento.

### Camada 2 — Consulta visual somente leitura

**Objetivo:** permitir consultar trabalhos existentes sem abrir criação ou edição ampla.

**Possíveis entregas:**

- lista de trabalhos;
- busca por código e título;
- filtro por cliente e estado;
- visão resumida;
- indicação da avaliação utilizada;
- estados vazios e mensagens de bloqueio;
- preservação do tema visual.

**Proibições:**

- criar trabalho;
- criar equipe;
- criar período;
- iniciar planejamento;
- alterar banco fora do contrato da Camada 1.

**Critério de saída:** validação visual autenticada e confirmação de que a tela não apresenta funções futuras.

### Camada 3 — Criação controlada

**Objetivo:** criar trabalho real no Supabase a partir de cliente elegível.

**Campos:**

- cliente;
- código;
- título;
- escopo preliminar;
- classificação.

**Fluxo obrigatório:**

```text
Cliente ativo
→ Avaliação aprovada aplicável
→ Formulário autorizado
→ Validação de código
→ Criação em draft
→ Vínculo da avaliação utilizada
→ Evento de criação
```

**Bloqueios obrigatórios:**

- avaliação ausente;
- avaliação aguardando decisão;
- avaliação rejeitada ou cancelada;
- cliente inativo;
- cliente de outra organização;
- permissão ausente;
- código duplicado.

**Critério de saída:** registro persiste após recarregar e aparece somente para a organização autorizada.

### Camada 4 — Edição e ciclo de vida

**Objetivo:** controlar alterações permitidas, cancelamento e encerramento.

**Entregas:**

- edição de título e escopo conforme estado;
- manutenção da identidade do cliente e da organização;
- mudança controlada de estado;
- cancelamento com justificativa;
- encerramento com permissão;
- histórico e eventos;
- bloqueio de exclusão física.

**Fora desta camada:** reabertura complexa, revisão metodológica, equipe, período e planejamento.

**Critério de saída:** cada transição possui regra, permissão, histórico e teste correspondente.

### Camada 5 — Integração e homologação

**Objetivo:** verificar o fluxo completo no ambiente publicado.

**Verificações:**

- acesso autenticado;
- organização correta;
- cliente ativo elegível;
- avaliação aprovada ou bloqueio correto;
- criação real;
- consulta após recarregar;
- edição permitida;
- cancelamento ou encerramento;
- isolamento entre organizações;
- ausência de texto de simulação;
- ausência de uso do Lovable Cloud;
- publicação correspondente à `main`.

O registro de dados de homologação deverá ser autorizado antes da execução e identificado de forma clara.

## 7. Responsabilidades

| Atividade | Work | Lovable | Codex | Responsável humano |
|---|---|---|---|---|
| Regras e decisões | Principal | Consulta | Consulta técnica | Aprova |
| Contratos e escopo | Principal | Consulta | Revisa | Aprova |
| Interface | Orienta | Principal | Revisa impacto | Homologa visual |
| Banco, RPC e RLS | Consulta | Não executar | Principal | Autoriza |
| Testes técnicos | Define critérios | Apoia visual | Executa | Avalia |
| Testes formais do Grupo 07 | Não aplicar aqui | Não aplicar aqui | Não aplicar aqui | Autoriza etapa futura |
| Publicação e PR | Coordena | Sincroniza | Prepara | Aprova merge |

## 8. Regras para o Lovable

O prompt de cada camada deverá repetir:

- implementar somente a camada indicada;
- alterar somente os arquivos autorizados;
- não criar equipe, funções, períodos ou planejamento;
- não criar tabelas fora da camada;
- não usar Lovable Cloud;
- não alterar ACL, autenticação ou variáveis sem autorização;
- não substituir a avaliação ACE por decisão local;
- parar e informar quando faltar contrato;
- não iniciar a camada seguinte automaticamente.

### 8.1 Política de prompt restritivo

Todo prompt enviado ao Lovable deverá conter obrigatoriamente:

1. identificação da SDD e da camada;
2. objetivo único da execução;
3. lista exata de arquivos que podem ser criados ou alterados;
4. lista explícita de arquivos e áreas proibidos;
5. indicação se a tarefa é visual, de integração ou somente leitura;
6. critérios de aceite objetivos;
7. instrução para parar ao encontrar dependência não prevista;
8. instrução para não iniciar a camada seguinte;
9. confirmação de que não deve ativar Lovable Cloud;
10. formato obrigatório do relatório final.

O prompt não deverá utilizar expressões abertas como:

- “melhore o módulo”;
- “complete o sistema”;
- “corrija tudo”;
- “implemente o que faltar”;
- “prepare a próxima etapa”.

O Lovable deverá informar, antes da execução, quais arquivos pretende alterar. Se essa lista não coincidir com a lista autorizada, a execução será cancelada.

Ao terminar, deverá parar imediatamente e informar:

- arquivos alterados;
- arquivos não alterados;
- funções implementadas;
- funções não implementadas;
- verificações realizadas;
- limitações;
- confirmação de que não avançou de camada.

## 9. Regras para o Codex

O Codex deverá:

- verificar o estado da branch antes de alterar;
- preservar alterações já aprovadas;
- conferir a migration remota antes de reaplicar;
- testar isolamento por organização;
- verificar que a avaliação usada foi preservada;
- separar implementação local, publicação e homologação;
- registrar arquivos alterados;
- não executar refatoração fora da SDD;
- não usar Superpowers nesta implantação.

## 10. Estratégia de branches e PRs

Recomenda-se uma branch própria:

```text
feat/trb-001-trabalho
```

Cada grupo de camadas deverá produzir um PR pequeno ou uma sequência de commits claramente separada.

Fluxo:

```text
Plano aprovado
→ branch
→ Camada autorizada
→ revisão do diff
→ build e verificações
→ PR
→ homologação
→ aprovação humana
→ merge na main
→ sincronização/publicação
```

Nenhum PR deverá misturar TRB-001 com EQP-001 ou PNL-001.

## 11. Verificações técnicas mínimas

Antes de cada PR:

- `git diff --check`;
- build local;
- verificação de tipos;
- testes da camada;
- conferência dos arquivos autorizados;
- conferência das migrations aplicadas;
- verificação de RLS;
- verificação de permissões;
- confirmação de que não houve alteração em Lovable Cloud.

Os testes formais com Superpowers permanecem reservados ao Grupo 07.

## 12. Critérios de aceitação do plano

O plano será considerado pronto para execução quando:

- a SDD-TRB-001 estiver aprovada;
- o vínculo com ACE estiver resolvido;
- estados e classificações estiverem definidos;
- permissões estiverem compatibilizadas;
- lista de arquivos da Camada 1 estiver fechada;
- o usuário autorizar a execução da primeira camada.

## 13. Definition of Done da TRB-001

A TRB-001 somente será considerada concluída quando:

- trabalho puder ser criado somente nas condições aprovadas;
- avaliação utilizada estiver preservada;
- cliente e trabalho estiverem isolados por organização;
- código, título, escopo e classificação estiverem persistidos;
- consulta e filtros funcionarem;
- estados e transições estiverem protegidos;
- cancelamento e encerramento preservarem histórico;
- exclusão física estiver bloqueada;
- equipe, funções, períodos e planejamento permanecerem nas SDDs corretas;
- build e verificações estiverem aprovados;
- fluxo autenticado for homologado no ambiente publicado;
- documentação e migrations estiverem no GitHub;
- PR final estiver aprovado e integrado à `main`.

## 14. Próxima ação

Após a aprovação deste plano:

1. decisões da Camada 0 aprovadas;
2. criar a branch `feat/trb-001-trabalho`;
3. fechar a lista de arquivos da Camada 1;
4. executar somente a Camada 1;
5. revisar o diff e apresentar o resultado antes de qualquer camada visual.

## 15. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação do plano restritivo e em camadas da TRB-001 | Substituída |
| 1.0 | 2026-08-05 | Aprovação do plano com política de prompts restritivos para o Lovable | Aprovada |
| 1.1 | 2026-08-05 | Implementação concluída, testes homologados e PR #42 integrado | Aprovada |
