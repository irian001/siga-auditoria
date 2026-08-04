---
id: SIGA-SDD-ACE-001
title: SDD-ACE-001 — Aceitação e Continuidade Simplificada
aliases:
  - Aceitação e Continuidade do SIGA
  - SDD-ACE-001
type: sdd
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
implementation_status: nao-iniciado
version: 1.0
created: 2026-08-04
updated: 2026-08-04
owner: responsavel-projeto
responsible:
  planning: work
  visual_implementation: lovable
  technical_implementation: codex
  approval: responsavel-projeto
depends_on:
  - SIGA-SDD-CLI-001
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
  - "[[SDD-TRB-001]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, sdd, grupo-02, aceitacao, continuidade, cliente, aprovacao-humana]
---

# SDD-ACE-001 — Aceitação e Continuidade Simplificada

## 1. Finalidade

Implantar o registro simplificado da decisão de aceitar um novo cliente ou continuar o relacionamento com cliente já cadastrado antes da criação de um novo trabalho de auditoria.

Esta SDD ocupa a posição entre o cadastro do cliente e a futura criação do trabalho:

```text
Organização usuária
→ Cliente
→ Aceitação ou continuidade
→ Trabalho de auditoria
```

A avaliação deverá tornar identificáveis:

- o cliente avaliado;
- o tipo de avaliação;
- quem preparou e quem aprovou;
- as questões consideradas;
- pendências e impedimentos;
- a conclusão;
- a justificativa da decisão;
- a versão efetivamente aprovada.

O SIGA apoiará e documentará a decisão, mas não substituirá o julgamento profissional do responsável.

## 2. Situação de origem

Na abertura desta SDD:

- os Grupos 00 e 01 estão concluídos;
- a `SDD-CLI-001` está concluída e validada;
- clientes são persistidos no Supabase oficial com isolamento organizacional;
- existem permissões, memberships, papéis e contexto organizacional ativos;
- ainda não existe avaliação funcional de aceitação ou continuidade;
- ainda não existe tabela `acceptance_assessments` implantada;
- a `SDD-TRB-001` ainda não foi iniciada;
- nenhum trabalho deverá ser criado por esta SDD.

## 3. Objetivos

- registrar avaliação inicial de aceitação para cliente novo ou ainda não avaliado;
- registrar avaliação de continuidade antes de um novo trabalho para cliente existente;
- apresentar questionário simplificado e rastreável;
- permitir salvar rascunho e tratar pendências antes da decisão;
- registrar conclusão aprovada ou rejeitada com justificativa;
- impedir aprovação quando houver resposta impeditiva ou questão obrigatória pendente;
- preservar avaliações anteriores sem sobrescrita silenciosa;
- permitir consulta cronológica por cliente;
- impedir criação futura de trabalho sem avaliação aprovada e aplicável;
- preservar isolamento multiempresa, menor privilégio e aprovação humana.

## 4. Escopo

- entidade `acceptance_assessments`;
- respostas estruturadas da avaliação;
- avaliação do tipo aceitação ou continuidade;
- questionário simplificado do MVP;
- rascunho, envio para decisão, aprovação, rejeição e cancelamento;
- registro de pendências e impedimentos;
- conclusão e justificativa obrigatórias;
- preparação e aprovação por usuários identificados;
- listagem das avaliações do cliente;
- visualização de avaliação e de sua situação;
- permissões específicas;
- RLS e isolamento por organização;
- histórico técnico mínimo;
- contrato para futura validação pela `SDD-TRB-001`.

## 5. Fora do escopo

- criação ou gestão de trabalho de auditoria;
- definição de período, equipe, funções ou responsáveis do trabalho;
- planejamento, materialidade, riscos ou procedimentos;
- aceite eletrônico pelo cliente;
- proposta, contrato, honorários ou faturamento;
- consulta automática a cadastros externos;
- análise automatizada de reputação, sanções ou crédito;
- programa completo de independência;
- declaração anual de independência dos profissionais;
- aprovação automática por inteligência artificial;
- anexos e repositório documental da avaliação;
- modelos diferentes por segmento econômico;
- fluxo de aprovação com múltiplas alçadas;
- alteração de avaliação já aprovada;
- criação antecipada das tabelas de trabalhos.

Uma indicação de conflito ou ameaça à independência será registrada como impedimento ou pendência. O tratamento metodológico completo dependerá de especificação própria e não será inventado nesta SDD.

## 6. Conceitos

### 6.1 Aceitação

Avaliação realizada antes de iniciar relacionamento ou primeiro trabalho com determinado cliente no contexto da organização usuária.

### 6.2 Continuidade

Nova avaliação realizada para decidir se a organização poderá prosseguir com cliente anteriormente aceito.

Continuidade não significa reutilizar silenciosamente a avaliação anterior. Cada decisão deverá possuir registro próprio, data, respostas e conclusão.

### 6.3 Avaliação aplicável

É a avaliação aprovada mais recente do cliente que ainda não tenha sido substituída por decisão posterior rejeitada, cancelada ou que exija reavaliação.

A duração, o reaproveitamento e a vinculação exata com o trabalho serão delimitados nesta SDD e confirmados na `SDD-TRB-001`. A interface não deverá presumir validade ilimitada.

### 6.4 Independência

A avaliação simplificada poderá perguntar se existe conflito, ameaça ou impedimento conhecido. Essa resposta não substitui confirmações individuais, salvaguardas, consultas especializadas ou programa completo de independência.

## 7. Tipos de avaliação

| Código | Nome | Uso |
|---|---|---|
| `acceptance` | Aceitação | Primeira decisão documentada para o cliente |
| `continuance` | Continuidade | Nova decisão para prosseguir com cliente já avaliado |

Regras:

- cliente sem avaliação aprovada deverá iniciar por aceitação;
- continuidade dependerá de avaliação anterior existente;
- rejeição anterior não poderá ser ignorada; nova avaliação deverá mencionar a decisão anterior e justificar a reanálise;
- o tipo não poderá ser alterado após o envio para decisão.

## 8. Entidade `acceptance_assessments`

### 8.1 Campos propostos

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente |
| `organization_id` | UUID | Sim | Obtido do contexto autenticado |
| `client_id` | UUID | Sim | Cliente ativo da mesma organização |
| `assessment_type` | Texto curto | Sim | `acceptance` ou `continuance` |
| `assessment_date` | Data | Sim | Data declarada da avaliação |
| `reference_period` | Texto curto | Não | Período ou exercício pretendido, sem criar trabalho |
| `status` | Texto curto | Sim | Estado do ciclo definido nesta SDD |
| `conclusion` | Texto curto | Condicional | `approved` ou `rejected` na decisão final |
| `rationale` | Texto longo | Condicional | Fundamentação da conclusão final |
| `pending_summary` | Texto longo | Não | Síntese das pendências antes da decisão |
| `previous_assessment_id` | UUID | Condicional | Avaliação anterior relacionada |
| `prepared_by` | UUID | Sim | Perfil que iniciou ou preparou |
| `submitted_at` | Data e hora | Condicional | Momento do envio para decisão |
| `submitted_by` | UUID | Condicional | Perfil que enviou |
| `decided_at` | Data e hora | Condicional | Momento da decisão final |
| `decided_by` | UUID | Condicional | Perfil que aprovou ou rejeitou |
| `created_at` | Data e hora | Sim | Gerado pelo banco |
| `updated_at` | Data e hora | Sim | Atualizado pelo banco |

### 8.2 Regras de integridade

- organização e cliente deverão coincidir com o contexto autenticado;
- cliente inativo não poderá receber nova avaliação;
- `continuance` exigirá `previous_assessment_id` do mesmo cliente e organização;
- decisão final exigirá conclusão, justificativa, responsável e momento;
- `decided_by` não será enviado livremente pelo navegador;
- avaliação decidida não poderá ser editada;
- correção posterior exigirá nova avaliação relacionada;
- exclusão física será proibida após o envio para decisão.

## 9. Respostas da avaliação

Para evitar texto único sem rastreabilidade, cada questão deverá possuir resposta própria. A implementação física poderá utilizar uma tabela filha `acceptance_assessment_answers`, desde que o plano confirme a compatibilidade com o Modelo de Dados.

### 9.1 Campos lógicos da resposta

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente |
| `organization_id` | UUID | Sim | Mesmo contexto da avaliação |
| `assessment_id` | UUID | Sim | Avaliação proprietária |
| `question_code` | Texto curto | Sim | Código estável da questão |
| `question_version` | Inteiro | Sim | Versão do texto aplicado |
| `question_text_snapshot` | Texto longo | Sim | Texto preservado da questão respondida |
| `answer` | Texto curto | Sim | `yes`, `no`, `not_applicable` ou `unknown` |
| `comment` | Texto longo | Condicional | Obrigatório conforme a resposta |
| `is_blocking` | Booleano | Sim | Resultado conforme regra da questão |
| `answered_by` | UUID | Sim | Perfil responsável |
| `answered_at` | Data e hora | Sim | Momento da resposta |

### 9.2 Preservação

- o texto e a versão das questões deverão ser preservados na avaliação;
- mudança futura do questionário não alterará avaliações anteriores;
- respostas de avaliação decidida serão imutáveis para usuários comuns;
- uma resposta não poderá pertencer a avaliação de outra organização.

## 10. Questionário simplificado do MVP

O questionário inicial deverá abranger somente decisões essenciais. O texto definitivo será aprovado antes da implementação.

| Código | Tema | Pergunta proposta | Resposta impeditiva ou pendente |
|---|---|---|---|
| `ACE-CLI-001` | Identificação | As informações cadastrais essenciais do cliente foram verificadas e são suficientes para esta decisão? | `no` ou `unknown` |
| `ACE-INT-001` | Integridade | Não foram identificadas informações conhecidas que impeçam o relacionamento com a administração ou os responsáveis pelo cliente? | `no` ou `unknown` |
| `ACE-IND-001` | Independência | Não existe conflito, ameaça ou impedimento conhecido que inviabilize a aceitação ou continuidade? | `no` ou `unknown` |
| `ACE-CAP-001` | Competência | A organização possui ou poderá obter competência técnica compatível com o serviço pretendido? | `no` ou `unknown` |
| `ACE-REC-001` | Recursos | Existem condições preliminares de tempo e recursos para realizar o trabalho com qualidade? | `no` ou `unknown` |
| `ACE-ESC-001` | Escopo | O objetivo e o escopo preliminar pretendidos são compreensíveis e compatíveis com a atuação da organização? | `no` ou `unknown` |
| `ACE-INF-001` | Informações | Não existe limitação conhecida ao acesso às informações necessárias para avaliar ou realizar o trabalho? | `no` ou `unknown` |
| `ACE-ANT-001` | Relacionamento anterior | Quando aplicável, assuntos relevantes de trabalhos ou avaliações anteriores foram considerados? | `no` ou `unknown`; admite `not_applicable` |

Regras:

- todas as questões deverão ser respondidas antes do envio para decisão;
- resposta `no` ou `unknown` exigirá comentário;
- resposta impeditiva bloqueará aprovação enquanto permanecer sem tratamento documentado;
- `not_applicable` exigirá justificativa quando a questão não for evidentemente condicional;
- o sistema não transformará respostas em conclusão automática;
- o aprovador continuará responsável por avaliar o conjunto.

## 11. Estados e ciclo de vida

### 11.1 Estados

| Estado | Significado |
|---|---|
| `draft` | Em elaboração e ainda editável |
| `pending_review` | Enviada para decisão; conteúdo congelado para o preparador |
| `approved` | Decisão humana favorável e registrada |
| `rejected` | Decisão humana desfavorável e registrada |
| `cancelled` | Avaliação interrompida antes da decisão |

### 11.2 Transições

```text
criação → draft
draft → pending_review
draft → cancelled
pending_review → draft
pending_review → approved
pending_review → rejected
```

### 11.3 Regras

- nova avaliação nasce como `draft`;
- somente rascunho poderá ter respostas alteradas;
- retorno de `pending_review` para `draft` exigirá justificativa;
- aprovação e rejeição serão decisões finais e imutáveis;
- cancelamento exigirá motivo;
- avaliação aprovada não poderá ser convertida em rejeitada; deverá existir nova avaliação;
- o histórico deverá preservar responsáveis e momentos das transições.

## 12. Regra de decisão

### 12.1 Envio para decisão

O envio será permitido quando:

- cliente estiver ativo;
- todas as questões obrigatórias possuírem resposta;
- comentários obrigatórios estiverem preenchidos;
- pendências e respostas impeditivas estiverem claramente apresentadas;
- o usuário possuir autorização.

### 12.2 Aprovação

A aprovação exigirá:

- permissão específica;
- ausência de resposta impeditiva não tratada;
- conclusão `approved`;
- justificativa expressa;
- identificação do decisor e momento;
- confirmação humana da responsabilidade pela decisão.

### 12.3 Rejeição

A rejeição exigirá:

- permissão específica;
- conclusão `rejected`;
- justificativa expressa;
- identificação do decisor e momento.

### 12.4 Segregação inicial

No MVP, o preparador poderá também decidir a avaliação somente quando possuir a permissão de decisão. A interface deverá deixar essa acumulação explícita.

Essa simplificação não elimina exigências profissionais de independência ou revisão que possam requerer outro responsável. Uma futura regra de segregação poderá tornar decisor diferente obrigatório sem alterar avaliações anteriores.

## 13. Aplicabilidade à criação do trabalho

A `SDD-TRB-001` deverá consultar a avaliação aplicável antes de permitir a criação do trabalho.

Contrato conceitual:

```text
canCreateEngagement(clientId, referencePeriod)
→ avaliação aplicável localizada
→ situação approved
→ nenhuma decisão posterior incompatível
→ autorização válida
```

Esta SDD não criará o trabalho nem definirá todos os dados desse vínculo. Ela deverá apenas expor informação suficiente para a SDD seguinte aplicar a regra.

## 14. Permissões

Permissões propostas:

| Código | Finalidade |
|---|---|
| `acceptance.view` | Consultar avaliações da própria organização |
| `acceptance.prepare` | Criar e editar rascunhos, responder e enviar para decisão |
| `acceptance.decide` | Aprovar, rejeitar ou devolver avaliação para rascunho |

Regras:

- `organization_admin` receberá as três permissões por migration idempotente;
- consulta não autoriza preparação ou decisão;
- preparação não autoriza decisão;
- a interface não substitui a autorização no banco;
- nenhuma permissão permitirá acesso a outra organização;
- ausência de permissão produzirá negação segura.

## 15. Segurança e isolamento multiempresa

Toda operação deverá satisfazer:

```text
sessão válida
AND perfil ativo
AND organização ativa
AND membership ativo
AND permissão aplicável
AND avaliação.organization_id = organização ativa
AND cliente.organization_id = organização ativa
```

Requisitos:

- RLS habilitado nas tabelas implantadas;
- `organization_id` não será escolhido no formulário;
- usuário anônimo não terá acesso;
- cliente externo não será inferido por mensagem de erro;
- IDs de preparador e decisor serão derivados da identidade autenticada;
- `service_role` não será exposta ao navegador;
- respostas e decisões de outra organização não poderão ser listadas, abertas ou alteradas;
- alteração direta de estado sem a regra de transição deverá ser bloqueada.

## 16. Fluxos funcionais

### 16.1 Listar avaliações do cliente

1. usuário abre um cliente autorizado;
2. sistema verifica `acceptance.view`;
3. apresenta avaliações da organização e do cliente;
4. ordena da mais recente para a mais antiga;
5. exibe tipo, data, período de referência, situação, conclusão e responsáveis.

### 16.2 Criar avaliação

1. usuário aciona `Nova avaliação`;
2. sistema verifica `acceptance.prepare`;
3. usuário escolhe aceitação ou continuidade;
4. sistema valida cliente e avaliação anterior aplicável;
5. cria rascunho com questionário vigente preservado;
6. usuário responde e salva sem perder o progresso.

### 16.3 Enviar para decisão

1. usuário revisa o resumo;
2. sistema valida completude e comentários;
3. apresenta impedimentos e pendências;
4. usuário confirma o envio;
5. avaliação passa para `pending_review` e deixa de ser editável pelo preparador.

### 16.4 Decidir

1. usuário com `acceptance.decide` abre a avaliação;
2. sistema apresenta cliente, respostas, pendências e avaliação anterior;
3. decisor pode devolver para ajuste, aprovar ou rejeitar;
4. aprovação é bloqueada diante de impedimento não tratado;
5. decisão exige justificativa e confirmação;
6. sistema registra decisor, momento e conclusão.

### 16.5 Cancelar rascunho

1. preparador solicita cancelamento;
2. sistema explica que o registro será preservado;
3. usuário informa motivo e confirma;
4. estado passa para `cancelled`.

## 17. Interface esperada

### 17.1 Seção no cliente

Deverá conter:

- título `Aceitação e continuidade`;
- ação `Nova avaliação` conforme permissão;
- resumo da avaliação aplicável;
- alerta quando não houver avaliação aprovada;
- histórico cronológico;
- tipo, situação, conclusão, data e responsáveis;
- ação para abrir detalhes.

### 17.2 Formulário da avaliação

Deverá conter:

- identificação do cliente somente para leitura;
- tipo de avaliação;
- data e período de referência opcional;
- questões agrupadas por tema;
- resposta, comentário e indicação de impedimento;
- salvamento de rascunho;
- resumo de pendências;
- ação de cancelar ou enviar para decisão;
- proteção contra envio repetido.

### 17.3 Tela de decisão

Deverá conter:

- identificação clara de que se trata de decisão profissional;
- respostas e comentários em modo de leitura;
- destaque de respostas impeditivas ou desconhecidas;
- avaliação anterior, quando aplicável;
- conclusão e justificativa;
- ações devolver, aprovar e rejeitar conforme permissão;
- confirmação antes da decisão final.

### 17.4 Identidade visual

- preservar o tema escuro aprovado em azul, preto e cinza;
- reutilizar componentes existentes;
- manter contraste, foco e navegação por teclado;
- não alterar telas ou módulos fora do escopo;
- implementar em camadas pequenas conforme `AGENTS.md`.

## 18. Mensagens funcionais

Exemplos esperados:

- `Avaliação salva como rascunho.`
- `Avaliação enviada para decisão.`
- `Avaliação aprovada. A decisão e as respostas foram preservadas.`
- `Avaliação rejeitada.`
- `Existem questões obrigatórias pendentes.`
- `A aprovação está bloqueada por resposta impeditiva não tratada.`
- `O cliente precisa estar ativo para iniciar uma avaliação.`
- `Você não possui permissão para decidir esta avaliação.`
- `Esta avaliação já foi decidida e não pode ser alterada.`

Mensagens não deverão expor SQL, políticas, IDs externos ou dados de outra organização.

## 19. Contratos de aplicação

Contratos conceituais mínimos:

```text
listAcceptanceAssessments(clientId)
getAcceptanceAssessmentById(assessmentId)
createAcceptanceAssessment(input)
saveAcceptanceAnswers(assessmentId, answers)
submitAcceptanceAssessment(assessmentId)
returnAcceptanceAssessmentToDraft(assessmentId, reason)
decideAcceptanceAssessment(assessmentId, conclusion, rationale)
cancelAcceptanceAssessment(assessmentId, reason)
getApplicableAcceptanceAssessment(clientId, referencePeriod)
```

A implementação deverá separar:

- componentes visuais;
- regras e tipos do domínio;
- questionário e snapshots;
- contrato de repositório;
- integração Supabase;
- autorização;
- validações e transições de estado.

## 20. Responsabilidade das ferramentas

### 20.1 Work

- manter esta SDD e o plano de implantação;
- consolidar as decisões funcionais;
- preparar o questionário aprovado;
- coordenar revisão e aceite humano.

### 20.2 Lovable

- fabricar as interfaces em camadas autorizadas;
- reutilizar o sistema visual existente;
- trabalhar somente nos arquivos expressamente permitidos;
- não criar regras, tabelas, migrations ou políticas por iniciativa própria;
- não ativar Lovable Cloud nem substituir o Supabase oficial;
- parar ao final de cada camada para validação.

### 20.3 Codex

- inspecionar o repositório e delimitar o plano técnico;
- implementar domínio, contratos, persistência, migrations e RLS autorizados;
- revisar transições, permissões e isolamento;
- executar verificações técnicas proporcionais;
- informar arquivos, resultados e limitações.

### 20.4 Superpowers

Não será utilizada na especificação nem na geração de código desta SDD. Seu uso permanece reservado à etapa formal de testes e validação do Grupo 07, conforme `AGENTS.md`.

## 21. Implementação física prevista

A definição final de arquivos ocorrerá somente no plano de implantação, após inspeção do código existente.

Previsão conceitual:

```text
src/domain/acceptance/
src/data/acceptanceRepository.ts
src/data/supabase/supabaseAcceptanceRepository.ts
src/features/acceptance/
supabase/migrations/<timestamp>_acceptance_assessments.sql
docs/sdd/grupo-02-clientes-e-trabalhos/PLANO-ACE-001_IMPLANTACAO.md
```

Esta lista não autoriza criação ou alteração de arquivos.

## 22. Critérios de aceite

A SDD estará implementada quando:

- usuário autorizado consultar somente avaliações da própria organização;
- cliente inativo não receber nova avaliação;
- primeira avaliação do cliente utilizar o tipo aceitação;
- continuidade exigir avaliação anterior relacionada;
- questionário e sua versão forem preservados;
- todas as questões obrigatórias forem respondidas antes do envio;
- comentários obrigatórios forem exigidos;
- resposta impeditiva não tratada bloquear aprovação;
- somente `acceptance.decide` permitir aprovação ou rejeição;
- decisão final exigir justificativa e confirmação humana;
- decisor e momento forem obtidos do contexto autenticado;
- avaliação aprovada, rejeitada ou cancelada não for apagada;
- avaliação decidida não puder ser alterada;
- nova avaliação preservar relação com a anterior;
- contrato de consulta da avaliação aplicável estiver disponível para a `SDD-TRB-001`;
- RLS impedir leitura e mutação entre organizações;
- interface respeitar o tema e o sistema visual existentes;
- nenhum trabalho de auditoria for criado nesta SDD;
- nenhuma integração utilizar Lovable Cloud como banco alternativo;
- documentação, migration e verificações estiverem versionadas no GitHub.

## 23. Casos de teste previstos

### 23.1 Funcionais

- criar aceitação em rascunho para cliente ativo;
- salvar respostas parciais;
- impedir envio com questão obrigatória pendente;
- exigir comentário para `no` e `unknown`;
- enviar avaliação completa para decisão;
- devolver avaliação para ajuste com motivo;
- aprovar avaliação sem impedimento pendente;
- rejeitar avaliação com justificativa;
- impedir edição após decisão;
- criar continuidade relacionada à avaliação anterior;
- cancelar rascunho preservando o registro.

### 23.2 Autorização

- permitir consulta com `acceptance.view`;
- negar consulta sem `acceptance.view`;
- permitir preparação com `acceptance.prepare`;
- negar preparação sem a permissão;
- permitir decisão com `acceptance.decide`;
- negar decisão ao preparador sem `acceptance.decide`;
- negar acesso anônimo e membership inativo.

### 23.3 Multiempresa

- não listar avaliação de outra organização;
- não abrir avaliação externa por ID conhecido;
- não inserir resposta em avaliação externa;
- não decidir avaliação externa;
- não relacionar cliente ou avaliação anterior de outra organização;
- não revelar existência externa por mensagem de erro.

### 23.4 Transições e integridade

- impedir continuidade sem avaliação anterior;
- impedir aprovação a partir de `draft`;
- impedir alteração de tipo após envio;
- impedir decisão sem justificativa;
- impedir aprovação com resposta impeditiva não tratada;
- impedir alteração ou exclusão física de avaliação decidida;
- preservar snapshot e versão das perguntas.

### 23.5 Regressão

- login e recuperação de senha;
- contexto da organização ativa;
- ACL e acesso pendente;
- cadastro, pesquisa, edição e estado de clientes;
- isolamento da tabela `clients`;
- navegação existente;
- compilação local.

## 24. Decisões propostas para aprovação humana

A aprovação desta minuta confirmará:

1. os tipos iniciais serão `acceptance` e `continuance`;
2. os estados serão `draft`, `pending_review`, `approved`, `rejected` e `cancelled`;
3. a decisão final exigirá justificativa e será imutável;
4. o questionário inicial terá as oito questões da seção 10;
5. respostas serão `yes`, `no`, `not_applicable` ou `unknown`;
6. `no` e `unknown` exigirão comentário e poderão bloquear aprovação conforme a questão;
7. o preparador poderá decidir somente se possuir `acceptance.decide`, com acumulação explicitada;
8. não haverá aprovação automática nem decisão por IA;
9. o sistema preservará nova avaliação em vez de alterar decisão anterior;
10. a criação de trabalho dependerá de avaliação aplicável aprovada, cuja integração final será definida na `SDD-TRB-001`;
11. o programa completo de independência permanecerá fora desta SDD;
12. anexos, contratos, consultas externas e múltiplas alçadas permanecerão fora do MVP desta etapa.

## 25. Pontos que o plano de implantação deverá resolver

- arquivos existentes que poderão ser reutilizados;
- formato físico das respostas e snapshots;
- funções de banco necessárias às transições protegidas;
- convenção exata para avaliação aplicável e período de referência;
- regras de RLS e concessão de permissões;
- divisão da interface em camadas controladas para o Lovable;
- ordem entre domínio, dados simulados, interface e Supabase;
- migrations e possibilidade de reversão;
- verificações técnicas antes da homologação humana.

## 26. Navegação

- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Situação do Projeto]]
- [[SDD-CLI-001]]
- [[SDD-TRB-001]]
- [[Modelo de Domínio do SIGA]]
- [[Modelo de Dados do SIGA]]
- [[Regras de Negócio e Metodologia de Auditoria]]

## 27. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-04 | Criação da minuta inicial da aceitação e continuidade simplificada | Substituída |
| 1.0 | 2026-08-04 | Aprovação humana da SDD e das decisões funcionais propostas para o MVP | Aprovada |
