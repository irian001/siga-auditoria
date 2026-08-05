---
id: SIGA-SDD-TRB-001
title: SDD-TRB-001 — Criação e Gestão do Trabalho de Auditoria
aliases:
  - Trabalho de Auditoria do SIGA
  - Criação de Trabalho
  - SDD-TRB-001
type: sdd
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
implementation_status: nao-iniciada
version: 1.0
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
responsible:
  planning: work
  visual_implementation: lovable
  technical_implementation: codex
  approval: responsavel-projeto
depends_on:
  - SIGA-SDD-CLI-001
  - SIGA-SDD-ACE-001
  - SIGA-SDD-ORG-001
  - SIGA-SDD-AUT-001
  - SIGA-SDD-USR-001
  - SIGA-SDD-ACL-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Visão do Produto do SIGA]]"
  - "[[Glossário do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[SDD-CLI-001]]"
  - "[[SDD-ACE-001]]"
  - "[[SDD-EQP-001]]"
  - "[[SDD-PNL-001]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, sdd, grupo-02, trabalho, auditoria, cliente, rastreabilidade, multiempresa]
---

# SDD-TRB-001 — Criação e Gestão do Trabalho de Auditoria

## 1. Finalidade

Definir o contrato funcional e metodológico para criar, consultar e administrar o registro de um trabalho de auditoria no SIGA.

Esta SDD ocupa a posição seguinte à [[SDD-ACE-001]] no fluxo principal:

```text
Organização usuária
→ Cliente
→ Aceitação ou continuidade aprovada
→ Trabalho de auditoria
→ Equipe, funções e períodos
→ Planejamento
```

O trabalho será o contêiner controlado para as etapas posteriores de equipe, período, planejamento, balancete, riscos, procedimentos, evidências, papéis de trabalho, revisão e relatório.

Esta SDD não executa o trabalho de auditoria nem substitui o julgamento profissional. Ela cria a identidade, o contexto mínimo e o ciclo de vida do trabalho.

## 2. Situação de origem

Na abertura desta SDD:

- os Grupos 00 e 01 estão concluídos e validados;
- a [[SDD-CLI-001]] está concluída, com clientes persistidos no Supabase oficial;
- a [[SDD-ACE-001]] foi homologada no fluxo autenticado;
- existe avaliação em estado de decisão pendente no ambiente de validação;
- a criação do trabalho ainda não foi implantada;
- a tabela lógica `audit_engagements` está prevista no [[Modelo de Dados do SIGA]], mas não foi criada por esta minuta;
- equipe, funções e períodos serão tratados na [[SDD-EQP-001]];
- painel do trabalho será tratado na [[SDD-PNL-001]].

Nenhum código, migration, tabela, política, rota ou alteração visual é autorizado por esta minuta.

## 3. Objetivos

- criar um trabalho vinculado a um cliente ativo da organização autenticada;
- exigir uma avaliação de aceitação ou continuidade aprovada e aplicável antes da criação;
- preservar a decisão de aceitação utilizada como fundamento da criação;
- atribuir ao trabalho um identificador, código e título próprios;
- registrar escopo e classificação sem antecipar o planejamento;
- controlar estados do trabalho de forma explícita;
- permitir consulta e alteração somente conforme a permissão do usuário;
- garantir isolamento entre organizações;
- preservar histórico de criação, alterações, mudanças de estado e encerramento;
- preparar um contrato estável para equipe, períodos e planejamento;
- impedir que o trabalho seja uma coleção solta de telas sem contexto metodológico.

## 4. Escopo

Esta SDD abrange:

- entidade lógica `audit_engagements`;
- criação de trabalho a partir de cliente existente;
- validação da avaliação aplicável;
- código interno do trabalho;
- título do trabalho;
- escopo preliminar;
- classificação controlada do trabalho;
- consulta de trabalhos da organização;
- busca e filtros básicos;
- visualização resumida do trabalho;
- edição dos dados cadastrais permitidos;
- ciclo de vida inicial do trabalho;
- cancelamento e encerramento controlados;
- permissões próprias do trabalho;
- histórico e eventos essenciais;
- integração com o contexto organizacional autenticado;
- contrato de entrada para [[SDD-EQP-001]] e [[SDD-PNL-001]].

## 5. Fora do escopo

Não fazem parte desta SDD:

- cadastro ou edição de clientes;
- criação ou alteração de avaliação de aceitação ou continuidade;
- equipe do trabalho;
- funções no trabalho;
- responsáveis individuais;
- períodos, exercícios ou datas de auditoria;
- painel operacional detalhado;
- planejamento, materialidade ou estratégia;
- balancete e importação contábil;
- contas, mapeamentos e planos referenciais;
- processos, riscos, controles e procedimentos;
- amostragem;
- solicitações, documentos e evidências;
- papéis de trabalho;
- revisão, achados, conclusões ou relatório;
- contratos, propostas, honorários ou faturamento;
- portal do cliente;
- integrações externas;
- aprovação automática por inteligência artificial;
- criação de tabelas antecipadas para equipe, períodos ou planejamento;
- exclusão física do trabalho.

O registro de escopo nesta SDD é preliminar. O planejamento detalhado será definido em SDDs posteriores.

## 6. Conceitos

### 6.1 Trabalho de auditoria

É o registro de uma execução individual de auditoria, pertencente a uma organização usuária e relacionado a um cliente específico.

O trabalho possui identidade, contexto, estado e histórico próprios. Ele não é sinônimo de cliente, proposta, contrato, período, equipe ou relatório.

### 6.2 Cliente do trabalho

É o cliente ativo da mesma organização usuária ao qual o trabalho está vinculado.

Um cliente poderá possuir vários trabalhos ao longo do tempo. A criação de um trabalho não altera o cadastro do cliente.

### 6.3 Avaliação aplicável

É a avaliação aprovada mais recente que pode fundamentar a criação do trabalho, conforme as regras da [[SDD-ACE-001]].

Uma avaliação em rascunho, aguardando decisão, rejeitada, cancelada ou marcada para reavaliação não autoriza a criação.

### 6.4 Contexto de criação

É o conjunto de informações que explica por que o trabalho foi criado:

- organização autenticada;
- usuário responsável pela criação;
- cliente;
- avaliação aprovada utilizada;
- data e hora;
- código e título;
- escopo preliminar;
- classificação;
- estado inicial.

### 6.5 Estado do trabalho

É a situação controlada do trabalho em determinado momento. A mudança de estado deverá ser explícita, autorizada e registrada.

## 7. Regras de negócio

### 7.1 Organização e isolamento

- todo trabalho pertence a exatamente uma organização usuária;
- `organization_id` deverá ser obtido do contexto autenticado, nunca livremente informado pelo navegador;
- o cliente e o trabalho deverão pertencer à mesma organização;
- usuários de uma organização não poderão consultar, criar ou alterar trabalhos de outra;
- filtros de interface não substituem RLS, autorização ou validação no servidor;
- identificadores de outra organização não deverão ser usados para descobrir sua existência.

### 7.2 Cliente elegível

Somente cliente ativo da organização autenticada poderá receber novo trabalho.

Cliente inativo não poderá ser selecionado para uma nova criação. A existência de trabalhos anteriores não será apagada pela inativação do cliente.

### 7.3 Aceitação obrigatória

Antes de criar o trabalho, o sistema deverá consultar a avaliação aplicável do cliente.

A criação somente poderá prosseguir quando houver:

1. avaliação do mesmo cliente;
2. mesma organização;
3. tipo compatível com aceitação ou continuidade;
4. estado final aprovado;
5. decisão registrada;
6. justificativa preservada;
7. nenhuma decisão posterior incompatível;
8. autorização válida do usuário para criar o trabalho.

Uma avaliação com estado `aguardando decisão` deverá bloquear a criação e apresentar orientação compreensível ao usuário.

### 7.4 Preservação da avaliação utilizada

O trabalho deverá conservar referência à avaliação aprovada que fundamentou sua criação.

Essa referência não poderá ser substituída silenciosamente por uma avaliação posterior. Caso o modelo físico ainda não possua o campo ou vínculo necessário, a implantação deverá resolver essa lacuna antes do código, registrando a decisão no modelo de dados ou em ADR.

Uma avaliação posterior não deverá alterar retroativamente a origem da decisão de criação do trabalho.

### 7.5 Código do trabalho

- o código será obrigatório;
- deverá ser único dentro da organização usuária;
- poderá seguir convenção configurável posteriormente;
- não deverá ser usado como chave primária;
- a duplicidade deverá ser informada sem expor dados de outra organização;
- o código de um trabalho criado não deverá ser alterado livremente depois que houver registros metodológicos dependentes.

### 7.6 Título e escopo

- título será obrigatório e deverá identificar o trabalho de forma compreensível;
- escopo preliminar será obrigatório na criação ou terá justificativa explícita quando a regra aprovada permitir ausência temporária;
- o escopo não substitui planejamento, materialidade ou estratégia;
- alterações de escopo deverão ser registradas com usuário, data e justificativa;
- o sistema não deverá gerar conclusão metodológica a partir do texto do escopo.

### 7.7 Classificação

O trabalho possuirá uma classificação controlada.

O catálogo inicial deverá ser aprovado antes da implementação. A interface não deverá aceitar valores arbitrários que não estejam no catálogo vigente.

A classificação não substituirá o segmento econômico, o tipo de auditoria, o período ou o planejamento. Esses contextos poderão ser complementados por SDDs posteriores.

### 7.8 Estado inicial

Todo trabalho criado deverá iniciar em estado de elaboração, ou estado equivalente definido no catálogo aprovado.

A criação não deverá significar que:

- a equipe foi definida;
- o período foi aprovado;
- o planejamento foi concluído;
- a auditoria foi iniciada;
- o trabalho está pronto para emissão de relatório.

### 7.9 Alteração e preservação

- não haverá exclusão física;
- alterações relevantes deverão gerar histórico;
- trabalho com registros posteriores não deverá ser apagado para corrigir erro;
- correção de erro deverá preservar o valor anterior quando exigido pela trilha;
- mudança de cliente ou organização não será permitida após a criação;
- alteração de campos críticos deverá exigir permissão e, quando aplicável, justificativa.

## 8. Entidade `audit_engagements`

### 8.1 Campos mínimos

| Campo | Tipo lógico | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente gerado pelo sistema |
| `organization_id` | UUID | Sim | Obtido do contexto autenticado |
| `client_id` | UUID | Sim | Cliente ativo da mesma organização |
| `acceptance_assessment_id` | UUID | Sim para criação | Avaliação aprovada utilizada; vínculo físico a confirmar antes da implementação |
| `code` | Texto curto | Sim | Único dentro da organização |
| `title` | Texto curto | Sim | Nome compreensível do trabalho |
| `scope` | Texto longo | Sim | Escopo preliminar, sem substituir planejamento |
| `classification` | Texto curto | Sim | Valor do catálogo controlado |
| `status` | Texto curto | Sim | Estado do ciclo do trabalho |
| `created_at` | Data e hora | Sim | Gerado pelo banco |
| `created_by` | UUID | Sim | Perfil autenticado responsável |
| `updated_at` | Data e hora | Sim | Atualizado pelo banco |
| `updated_by` | UUID | Sim | Perfil autenticado da alteração |
| `closed_at` | Data e hora | Condicional | Preenchido no encerramento |
| `closed_by` | UUID | Condicional | Perfil que encerrou |
| `cancelled_at` | Data e hora | Condicional | Preenchido no cancelamento |
| `cancelled_by` | UUID | Condicional | Perfil que cancelou |

Os campos de equipe, funções e período não pertencem a esta primeira entidade funcional. Serão definidos pela [[SDD-EQP-001]].

### 8.2 Vínculo com a aceitação

O vínculo com `acceptance_assessments` é uma exigência de rastreabilidade desta SDD, mesmo que o modelo físico precise ser ajustado antes da implementação.

A implantação deverá escolher e documentar uma única forma de preservá-lo, entre:

- FK direta `acceptance_assessment_id` em `audit_engagements`;
- tabela de vínculo explícito com integridade organizacional;
- outra solução formalmente aprovada que permita reconstruir a decisão usada.

Não será aceita uma consulta momentânea sem persistência da avaliação utilizada.

### 8.3 Unicidade e índices

Deverão ser avaliados, no plano de implantação:

- unicidade de `organization_id` e `code`;
- índice por `organization_id`, `client_id` e `status`;
- índice por `organization_id` e `updated_at`;
- índice do vínculo com a avaliação aprovada;
- busca textual compatível com o volume do MVP.

Nenhum índice substitui RLS, autorização ou integridade de chave.

## 9. Estados e ciclo de vida

O catálogo definitivo deverá ser fechado no plano de implantação. Para esta minuta, o ciclo mínimo é:

| Estado conceitual | Significado |
|---|---|
| `draft` | Trabalho criado e em elaboração cadastral |
| `active` | Trabalho liberado para as etapas posteriores autorizadas |
| `closed` | Trabalho encerrado com preservação do histórico |
| `cancelled` | Trabalho cancelado com justificativa e histórico |

O uso de `active` não significa que planejamento, equipe ou período estejam completos. A liberação de cada etapa dependerá das SDDs correspondentes.

### 9.1 Regras de transição

- criação inicia em `draft`;
- `draft` somente poderá tornar-se `active` após os requisitos mínimos definidos no plano;
- `closed` e `cancelled` são estados finais para esta etapa;
- estado final não poderá ser apagado nem alterado diretamente;
- reabertura, se necessária, exigirá decisão documentada e regra própria;
- toda transição registrará origem, destino, usuário, momento e justificativa quando aplicável.

## 10. Permissões

As permissões iniciais propostas são:

| Permissão | Finalidade |
|---|---|
| `engagements.view` | Consultar trabalhos da organização autorizada |
| `engagements.manage` | Criar e alterar trabalhos permitidos |
| `engagements.close` | Encerrar trabalhos conforme regra aprovada |
| `engagements.cancel` | Cancelar trabalhos conforme regra aprovada |

O catálogo deverá ser compatibilizado com o ACL existente antes da implementação. Nenhuma permissão será criada apenas pelo front-end.

O papel geral do usuário não substituirá a permissão contextual nem a eventual função no trabalho.

## 11. Fluxos funcionais

### 11.1 Criar trabalho

```text
Usuário autenticado
→ Seleciona cliente ativo
→ Sistema consulta avaliação aplicável
→ Avaliação aprovada é exibida
→ Usuário informa código, título, escopo e classificação
→ Sistema valida organização e unicidade
→ Sistema grava trabalho em elaboração
→ Sistema preserva a avaliação utilizada
→ Sistema registra evento de criação
```

### 11.2 Bloquear criação

```text
Cliente inexistente, inativo ou de outra organização
→ Criação bloqueada

Avaliação inexistente, pendente, rejeitada ou cancelada
→ Criação bloqueada

Código duplicado
→ Criação bloqueada

Permissão ausente
→ Criação bloqueada
```

As mensagens deverão orientar o usuário sem revelar dados de outra organização.

### 11.3 Consultar trabalhos

O usuário autorizado poderá:

- listar trabalhos da organização;
- filtrar por cliente;
- filtrar por estado;
- pesquisar por código ou título;
- abrir a visão resumida;
- consultar a avaliação que fundamentou a criação;
- visualizar o histórico permitido.

### 11.4 Editar trabalho

A edição deverá respeitar o estado do trabalho e as permissões do usuário.

No mínimo:

- código, cliente e organização não poderão ser alterados livremente;
- título e escopo poderão ser alterados enquanto a regra permitir;
- alterações deverão ser registradas;
- trabalho encerrado ou cancelado não será editado diretamente;
- mudança que afete equipe, período ou planejamento será encaminhada às SDDs próprias.

### 11.5 Encerrar ou cancelar

Encerramento e cancelamento não são exclusão.

Cada operação deverá exigir:

- permissão específica;
- justificativa quando aplicável;
- usuário autenticado;
- data e hora;
- registro no histórico;
- preservação das relações existentes.

O significado metodológico do encerramento completo será aprofundado em SDDs posteriores. Nesta SDD, a operação controla o estado do contêiner de trabalho.

## 12. Interface prevista

A interface poderá compreender:

- ação “Novo trabalho” na área de clientes;
- página ou painel de trabalhos;
- formulário de criação;
- indicação clara do cliente selecionado;
- indicação da avaliação aprovada utilizada;
- campos de código, título, escopo e classificação;
- estado do trabalho;
- filtros e busca básicos;
- visão resumida;
- histórico acessível conforme a permissão.

A interface não deverá apresentar campos de equipe, funções, períodos, planejamento, riscos ou procedimentos como se já estivessem implementados.

O sistema deverá informar quando uma etapa ainda depender de outra SDD, evitando a aparência de um trabalho completo quando o MVP ainda está sendo construído.

## 13. Segurança e persistência

Na implantação futura:

- o repositório oficial será o Supabase já utilizado pelo SIGA;
- `organization_id` será derivado do contexto autenticado;
- RLS deverá impedir acesso entre organizações;
- políticas deverão ser acompanhadas por testes positivos e negativos;
- RPCs ou repositórios deverão validar o vínculo com cliente e avaliação;
- nenhuma credencial será incluída no código;
- Lovable Cloud não será usado como banco alternativo;
- dados não deverão permanecer somente em memória após a integração oficial;
- operações críticas deverão deixar eventos e histórico verificáveis.

## 14. Critérios de aceite

A SDD estará implementada quando:

- usuário autorizado conseguir criar trabalho para cliente ativo;
- criação exigir avaliação aprovada e aplicável;
- avaliação em estado “aguardando decisão” bloquear a criação;
- cliente de outra organização não puder ser usado;
- trabalho de outra organização não puder ser visualizado ou alterado;
- código duplicado dentro da organização for rejeitado;
- código, título, escopo e classificação forem preservados;
- avaliação usada na criação puder ser consultada posteriormente;
- trabalho nascer no estado correto;
- consulta, busca e filtros básicos funcionarem;
- edição respeitar estado e permissões;
- encerramento e cancelamento preservarem o histórico;
- não houver exclusão física;
- equipe, funções, períodos e planejamento permanecerem fora desta SDD;
- a interface não apresentar funcionalidades futuras como disponíveis;
- documentação, migration, testes e decisões estiverem versionados no GitHub.

## 15. Casos de teste previstos

1. criar trabalho com cliente ativo e avaliação aprovada;
2. bloquear trabalho sem avaliação;
3. bloquear trabalho com avaliação aguardando decisão;
4. bloquear trabalho com avaliação rejeitada ou cancelada;
5. bloquear cliente inativo;
6. bloquear cliente de outra organização;
7. rejeitar código duplicado na mesma organização;
8. permitir mesmo código em organizações diferentes, sem vazamento;
9. impedir criação sem `engagements.manage`;
10. consultar somente trabalhos da organização autenticada;
11. preservar a avaliação utilizada na criação;
12. registrar evento de criação;
13. editar somente campos permitidos;
14. impedir edição direta de trabalho encerrado ou cancelado;
15. cancelar com permissão e justificativa;
16. impedir exclusão física;
17. recarregar a aplicação e recuperar o trabalho persistido;
18. confirmar que a interface não cria equipe, período ou planejamento nesta etapa.

## 16. Riscos e decisões pendentes

Antes do plano de implantação deverão ser resolvidos:

- forma física do vínculo `acceptance_assessment_id`;
- catálogo definitivo de classificações;
- catálogo definitivo de estados;
- requisitos mínimos para passar de `draft` a `active`;
- permissões efetivamente incorporadas ao ACL;
- campos de encerramento e cancelamento no modelo físico;
- formato do histórico e dos eventos;
- regra de edição após a vinculação de equipe ou período;
- relação com a eventual vigência da avaliação aprovada;
- caminho de navegação principal: cliente → trabalho ou página própria de trabalhos.

Esses pontos não deverão ser decididos silenciosamente durante a implementação.

## 17. Limites para Work, Lovable e Codex

### Work

- detalhar regras e critérios;
- manter a separação entre trabalho, período, equipe e planejamento;
- registrar decisões pendentes;
- preparar o plano de implantação;
- não autorizar código antes da aprovação desta SDD.

### Lovable

- implementar somente telas e fluxos autorizados pelo plano;
- não criar equipe, períodos, planejamento ou tabelas futuras;
- não ativar Lovable Cloud;
- preservar o tema e os componentes existentes;
- não substituir o contrato da ACE-001.

### Codex

- revisar impacto no domínio, dados e ACL;
- implementar somente após aprovação do plano;
- validar migrations, RLS, RPCs, testes e integração;
- não ampliar escopo por iniciativa própria;
- preservar o vínculo histórico com a avaliação.

## 18. Material para treinamento

### 18.1 Objetivos de aprendizagem

Ao final, o participante deverá ser capaz de:

- diferenciar cliente e trabalho de auditoria;
- explicar por que a avaliação aprovada é pré-requisito;
- reconhecer o trabalho como contêiner do ciclo de auditoria;
- identificar o que pertence e o que não pertence a esta etapa;
- compreender estados, histórico e rastreabilidade;
- distinguir trabalho, equipe, período e planejamento.

### 18.2 Estrutura sugerida para apresentação

1. O que é um trabalho de auditoria;
2. relação entre organização, cliente, aceitação e trabalho;
3. requisitos para criação;
4. dados mínimos;
5. estados do trabalho;
6. histórico e rastreabilidade;
7. o que ainda não está sendo criado;
8. relação com equipe, períodos e planejamento;
9. exemplo de bloqueio por avaliação pendente;
10. próximos passos do MVP.

### 18.3 Estudo de caso

Um cliente possui uma avaliação em estado “aguardando decisão”. O usuário tenta criar um trabalho para o exercício futuro.

O SIGA bloqueia a operação, informa que a avaliação ainda não está aprovada e mantém o cliente disponível para consulta. Depois que a avaliação for aprovada, o usuário poderá iniciar novamente a criação, e o trabalho deverá registrar qual decisão fundamentou sua abertura.

### 18.4 Perguntas para discussão

- Por que cadastrar cliente não é o mesmo que criar trabalho?
- Por que uma avaliação pendente deve bloquear a criação?
- O que significa um trabalho estar em elaboração?
- Por que equipe e período ficam em outra SDD?
- Por que o trabalho precisa preservar a avaliação usada?

## 19. Navegação

- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Situação do Projeto]]
- [[SDD-CLI-001]]
- [[SDD-ACE-001]]
- [[SDD-EQP-001]]
- [[SDD-PNL-001]]
- [[Modelo de Domínio do SIGA]]
- [[Modelo de Dados do SIGA]]
- [[Regras de Negócio e Metodologia de Auditoria]]

## 20. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação da minuta inicial da SDD-TRB-001 | Substituída |
| 1.0 | 2026-08-05 | Aprovação da SDD-TRB-001 | Aprovada |
