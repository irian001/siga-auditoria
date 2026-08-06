---
id: SIGA-SDD-PNL-001
title: SDD-PNL-001 — Painel Básico do Trabalho
aliases:
  - Painel do Trabalho
  - Resumo Operacional do Trabalho
  - SDD-PNL-001
type: sdd
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: minuta
implementation_status: nao-iniciada
version: 0.1
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
responsible:
  planning: work
  visual_implementation: codex-ou-lovable-sob-autorizacao
  technical_implementation: codex
  approval: responsavel-projeto
depends_on:
  - SIGA-SDD-CLI-001
  - SIGA-SDD-ACE-001
  - SIGA-SDD-TRB-001
  - SIGA-SDD-EQP-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[SDD-TRB-001]]"
  - "[[SDD-EQP-001]]"
  - "[[SDD-SEG-001]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - sdd
  - grupo-02
  - painel
  - trabalho
  - resumo
---

# SDD-PNL-001 — Painel Básico do Trabalho

## 1. Finalidade

Esta SDD define o painel básico de um [[Trabalho de Auditoria]]. O painel deverá reunir, em uma única visão, as informações já existentes e autorizadas sobre o trabalho, o cliente, a aceitação, o estado, a equipe e os períodos.

O painel será uma visão operacional de entrada no trabalho. Ele não será um painel gerencial completo, não calculará indicadores metodológicos ainda inexistentes e não antecipará planejamento, riscos, procedimentos, evidências, papéis de trabalho ou relatórios.

Esta minuta não autoriza código, migration, alteração de dados, publicação ou uso do Lovable.

## 2. Situação de origem

Os Grupos 00 e 01 estão concluídos. No Grupo 02, as seguintes SDDs foram implementadas e homologadas:

- [[SDD-CLI-001]] — cadastro de clientes;
- [[SDD-ACE-001]] — aceitação e continuidade simplificada;
- [[SDD-TRB-001]] — criação e gestão do trabalho;
- [[SDD-EQP-001]] — equipe, funções e períodos.

A EQP-001 disponibiliza consulta da equipe e dos períodos e associação controlada de usuário elegível a uma função válida. O cadastro administrativo completo de usuários, funções e períodos não faz parte desta SDD nem da PNL-001.

A PNL-001 é a última SDD prevista para o Grupo 02. Sua conclusão deverá permitir o avanço controlado para o Grupo 03 — Contabilidade e planejamento.

## 3. Problema a resolver

Atualmente, as informações do trabalho podem ser consultadas na listagem e em diálogos específicos, mas ainda não existe uma visão central que represente o trabalho selecionado como contexto operacional.

O usuário precisa identificar rapidamente:

- qual trabalho está consultando;
- para qual cliente;
- qual é o estado atual;
- qual aceitação autorizou sua criação;
- quem compõe a equipe;
- quais períodos estão registrados;
- quais áreas futuras ainda não foram implantadas;
- quais ações estão disponíveis conforme sua permissão.

Sem essa visão, o usuário depende de consultas fragmentadas e o início dos grupos seguintes tende a produzir acessos dispersos.

## 4. Objetivos

A PNL-001 deverá:

1. estabelecer o trabalho selecionado como contexto visível;
2. consolidar informações já persistidas, sem duplicá-las;
3. apresentar cliente, aceitação, estado, classificação e escopo;
4. apresentar equipe, funções e períodos disponíveis;
5. respeitar permissões e isolamento organizacional;
6. distinguir dados existentes de módulos futuros;
7. oferecer navegação clara para ações já autorizadas;
8. preservar responsividade, rolagem e tema visual do SIGA;
9. fornecer ponto de entrada estável para as SDDs do Grupo 03 em diante.

## 5. Público e permissões

### 5.1 Usuário com `engagements.view`

Poderá consultar o painel somente quando:

- possuir vínculo ativo com a organização;
- possuir a permissão `engagements.view`;
- o trabalho pertencer à mesma organização;
- o registro estiver acessível pelas políticas vigentes.

### 5.2 Usuário com permissões de gestão

Ações existentes poderão ser exibidas somente quando o usuário possuir a permissão correspondente, como:

- `engagements.manage`;
- `engagements.close`;
- `engagements.cancel`.

A PNL-001 não criará novas permissões sem decisão específica no plano de implementação.

### 5.3 Acesso negado

O sistema deverá apresentar estado de acesso não autorizado sem revelar dados do trabalho ou de outra organização.

## 6. Escopo funcional

O painel básico poderá apresentar somente informações que já possuem fonte oficial.

### 6.1 Identificação do trabalho

- código;
- título;
- classificação;
- estado;
- escopo preliminar;
- data de criação;
- data da última atualização;
- cliente relacionado.

### 6.2 Aceitação relacionada

- identificação da avaliação de aceitação utilizada;
- situação ou decisão disponível no contrato existente;
- vínculo rastreável com o cliente e o trabalho.

O painel não permitirá editar ou decidir a aceitação.

### 6.3 Equipe

- participantes vinculados;
- função no trabalho;
- situação da participação;
- vigência inicial e final, quando existente;
- estado vazio quando não houver participantes.

A associação já autorizada pela EQP-001 poderá ser acessada a partir do painel quando o usuário possuir `engagements.manage`.

### 6.4 Períodos

- rótulo do período;
- data inicial;
- data final, quando existente;
- situação;
- estado vazio quando não houver períodos.

A PNL-001 não criará cadastro ou manutenção de períodos.

### 6.5 Áreas futuras

O painel poderá indicar, de forma discreta e não interativa, áreas previstas para:

- contabilidade e planejamento;
- riscos e procedimentos;
- documentos e evidências;
- papéis de trabalho;
- revisão;
- relatórios.

Essas áreas deverão aparecer como futuras ou indisponíveis, sem números simulados, links falsos ou funcionalidades antecipadas.

## 7. Proposta de organização visual

A estrutura recomendada para validação é:

1. cabeçalho com código, título, cliente e estado;
2. ações permitidas do trabalho;
3. bloco de informações gerais e escopo;
4. bloco da aceitação utilizada;
5. bloco da equipe e funções;
6. bloco dos períodos;
7. mapa das próximas áreas do trabalho, claramente marcado como futuro.

O painel deverá utilizar os componentes e padrões visuais já existentes. Não deverá criar um segundo sistema visual.

## 8. Navegação proposta

O acesso deverá partir da listagem de trabalhos por uma ação clara, como **Abrir painel**.

A implementação poderá usar uma página própria vinculada ao identificador do trabalho, desde que o plano técnico confirme:

- proteção da rota;
- carregamento direto por URL sem perda de contexto;
- tratamento de trabalho inexistente ou não autorizado;
- retorno claro à listagem de trabalhos;
- ausência de conflito com as rotas futuras.

A decisão final sobre rota e arquivos deverá constar no plano restritivo, não nesta minuta.

## 9. Fontes de dados

O painel deverá reutilizar contratos e repositórios existentes para:

- trabalho;
- cliente;
- aceitação;
- equipe;
- funções;
- períodos.

Não deverá:

- duplicar dados em nova tabela;
- criar tabela exclusiva de painel;
- persistir indicadores derivados sem necessidade;
- consultar diretamente dados de outra organização;
- inventar valores para preencher cartões vazios.

Caso falte uma operação de leitura mínima, ela deverá ser identificada no plano e implementada no contrato responsável, com escopo explícito e testes.

## 10. Estados da interface

O painel deverá tratar, no mínimo:

- carregando;
- pronto;
- trabalho inexistente;
- acesso não autorizado;
- erro de consulta;
- equipe vazia;
- períodos vazios;
- dados opcionais ausentes;
- ação em processamento;
- largura reduzida e tela desktop.

Falhas de um bloco complementar não deverão ocultar silenciosamente o erro nem transformar dados incompletos em informação aparentemente válida.

## 11. Regras de negócio

1. o trabalho é sempre filtrado pela organização ativa;
2. somente usuário autorizado poderá consultar o painel;
3. a fonte oficial permanece nos módulos de origem;
4. o painel não altera a aceitação;
5. o painel não cria usuário, função ou período;
6. ações de ciclo de vida respeitam o estado e as permissões já definidos na TRB-001;
7. associação de participante respeita as regras da EQP-001;
8. trabalho encerrado ou cancelado não poderá receber ações incompatíveis;
9. módulos futuros não poderão apresentar dados simulados como reais;
10. qualquer contagem exibida deverá derivar de registros oficiais e identificáveis.

## 12. Escopo técnico inicial

A implementação deverá preferir composição sobre reescrita.

Deverão ser reutilizados, quando adequados:

- modelos de domínio do trabalho;
- repositório de trabalhos;
- repositório de clientes;
- contrato de aceitação;
- contrato de equipe e períodos;
- regras de autorização;
- componentes de estado e apresentação;
- tema escuro e componentes básicos já homologados.

Uma eventual camada agregadora deverá apenas coordenar leituras autorizadas. Ela não poderá contornar RLS ou transformar o frontend em fonte de autorização.

## 13. Fora do escopo

Não fazem parte da PNL-001:

- CRUD administrativo de usuários;
- CRUD de funções do trabalho;
- cadastro ou manutenção de períodos;
- planejamento da auditoria;
- importação de balancete;
- materialidade;
- matriz de riscos;
- procedimentos;
- solicitações de documentos;
- evidências;
- papéis de trabalho;
- achados;
- revisão;
- relatórios;
- gráficos sem dados oficiais;
- indicadores gerenciais avançados;
- notificações;
- horas, orçamento, faturamento ou rentabilidade;
- ativação ou configuração do Lovable Cloud;
- criação de dados artificiais para tornar o painel visualmente preenchido.

## 14. Restrições para Lovable e Codex

### 14.1 Lovable

Se for autorizado em uma camada visual, deverá receber prompt restritivo com:

- arquivos permitidos;
- arquivos proibidos;
- proibição de alterar Supabase, autenticação, ACL, domínio e dependências;
- proibição de criar módulos futuros;
- ponto obrigatório de parada;
- exigência de informar todos os arquivos alterados.

O Lovable não será utilizado automaticamente apenas por constar como possibilidade nesta SDD.

### 14.2 Codex

Deverá:

- inspecionar os contratos existentes;
- preservar escopo e alterações válidas;
- implementar lacunas técnicas mínimas;
- executar verificações proporcionais;
- documentar limitações;
- não utilizar Superpowers nesta fase.

## 15. Critérios de aceite

A PNL-001 poderá ser considerada implementada quando:

1. usuário autorizado abrir o painel de um trabalho da própria organização;
2. código, título, cliente, estado, classificação e escopo forem exibidos corretamente;
3. a aceitação relacionada for identificável;
4. equipe e períodos forem consultados sem duplicação de fonte;
5. estados vazios forem apresentados sem dados artificiais;
6. ações respeitarem permissões e estado do trabalho;
7. acesso a outra organização for bloqueado;
8. módulos futuros estiverem claramente diferenciados;
9. a tela possuir rolagem funcional em desktop e dispositivos menores;
10. o tema visual homologado for preservado;
11. testes, lint e build aplicáveis forem aprovados;
12. a documentação do Grupo 02 for atualizada;
13. houver homologação visual e funcional do responsável pelo projeto.

## 16. Riscos e controles

| Risco | Controle esperado |
|---|---|
| Painel virar uma colcha de retalhos | Composição por blocos e reutilização dos contratos existentes |
| Antecipação do Grupo 03 | Itens futuros sem conteúdo funcional ou dados simulados |
| Vazamento entre organizações | Contexto organizacional, ACL e RLS preservados |
| Indicadores enganosos | Exibir somente valores derivados de registros oficiais |
| Duplicação de regras | Ações delegadas aos contratos e regras das SDDs de origem |
| Tela sem rolagem | Validação obrigatória em desktop e largura reduzida |
| Lovable ampliar o escopo | Camadas pequenas, arquivos autorizados e parada obrigatória |

## 17. Estratégia preliminar de implantação

A implantação deverá ser dividida em poucas camadas com resultado verificável. A proposta inicial é:

1. contrato e composição de leitura do painel;
2. estrutura visual básica e navegação;
3. integração dos blocos de equipe, períodos e ações autorizadas;
4. validação, ajustes e fechamento documental.

O plano restritivo poderá consolidar camadas quando isso reduzir retrabalho, mas não deverá desdobrar indefinidamente a implementação.

## 18. Material para treinamento

### 18.1 Objetivos de aprendizagem

Ao final, o usuário deverá ser capaz de:

- identificar o trabalho selecionado;
- compreender seu estado e cliente;
- localizar a aceitação utilizada;
- consultar equipe, funções e períodos;
- distinguir informações disponíveis de módulos futuros;
- reconhecer ações condicionadas a permissão.

### 18.2 Estrutura sugerida para apresentação

1. O painel como porta de entrada do trabalho;
2. identificação e estado;
3. vínculo com cliente e aceitação;
4. equipe e funções;
5. períodos;
6. permissões;
7. módulos futuros;
8. próximos passos do ciclo de auditoria.

### 18.3 Estudo de caso

Um gerente abre o painel de um trabalho ativo. Ele confirma o cliente, a aceitação que autorizou o trabalho e a equipe já vinculada. O painel indica que os módulos de planejamento e riscos ainda não foram implantados. O gerente não recebe números simulados e somente vê ações compatíveis com suas permissões.

## 19. Decisões necessárias para aprovação

Antes do plano de implementação, deverão ser confirmadas:

1. adoção de uma página própria para o painel ou manutenção dentro do fluxo atual;
2. blocos obrigatórios da primeira versão;
3. forma de apresentar módulos futuros;
4. uso ou não do Lovable em alguma camada estritamente visual;
5. tratamento do cadastro administrativo ainda indisponível para funções e períodos.

## 20. Navegação

- [[Constituição do SIGA]]
- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Situação do Projeto]]
- [[SDD-TRB-001]]
- [[SDD-EQP-001]]
- [[SDD-SEG-001]]
- [[Modelo de Domínio do SIGA]]
- [[Modelo de Dados do SIGA]]

## 21. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação da minuta inicial da SDD-PNL-001 — Painel Básico do Trabalho | Em revisão |
