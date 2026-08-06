---
id: SIGA-PLN-PNL-001
title: Plano Restritivo de Implantação — SDD-PNL-001 — Painel Básico do Trabalho
aliases:
  - Plano da PNL-001
  - Plano do Painel Básico do Trabalho
type: implementation-plan
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
version: 1.0
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
approval_required: true
obsidian:
  note_type: implementation-plan
  graph_role: satellite
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[SDD-PNL-001]]"
  - "[[SDD-TRB-001]]"
  - "[[SDD-EQP-001]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Situação do Projeto]]"
tags:
  - siga
  - plano
  - pnl-001
  - painel
  - trabalho
  - grupo-02
---

# PLANO RESTRITIVO DE IMPLANTAÇÃO — SDD-PNL-001

## Painel Básico do Trabalho

## 1. Finalidade

Este plano transforma a [[SDD-PNL-001]] aprovada em uma execução curta, controlada e verificável.

O objetivo é criar uma página própria para o painel básico do trabalho, composta exclusivamente por informações e operações já autorizadas nas SDDs do Grupo 02.

Este plano foi aprovado e autoriza somente as quatro etapas fechadas descritas neste documento, respeitados seus pontos de parada e critérios de interrupção.

Não serão criadas subcamadas, planos intermediários ou desdobramentos adicionais sem bloqueio técnico real e decisão do responsável pelo projeto.

## 2. Estado anterior

Estão concluídas e homologadas:

- [[SDD-CLI-001]] — cadastro e consulta de clientes;
- [[SDD-ACE-001]] — aceitação e continuidade simplificada;
- [[SDD-TRB-001]] — criação, consulta e ciclo de vida do trabalho;
- [[SDD-EQP-001]] — consulta da equipe e dos períodos e associação controlada de participante.

A listagem de trabalhos já oferece um resumo em diálogo. A PNL-001 deverá criar uma visão própria e estável do trabalho, sem remover prematuramente o resumo existente e sem reescrever os módulos anteriores.

## 3. Decisões fechadas de implementação

### 3.1 Página própria

O painel será implementado como página própria identificada pelo trabalho.

Rota proposta:

```text
/trabalhos/$engagementId
```

A ação **Abrir painel** será disponibilizada na listagem de trabalhos para usuários com `engagements.view`.

O resumo atual poderá permanecer durante a implantação para reduzir risco. Sua retirada ou transformação não faz parte deste plano.

### 3.2 Leitura composta, sem persistência nova

O painel coordenará consultas já existentes de:

- trabalho;
- cliente;
- aceitação relacionada;
- equipe;
- funções vinculadas;
- períodos.

Não será criada tabela, view, RPC, função SQL, migration ou armazenamento específico para o painel.

### 3.3 Implementação local pelo Codex

A execução será local e controlada pelo Codex.

O Lovable não será utilizado neste plano. Seu uso futuro exigirá autorização separada e prompt restritivo próprio.

As skills Superpowers não serão utilizadas. Permanecem reservadas ao Grupo 07.

### 3.4 Módulos futuros

As áreas dos grupos seguintes poderão aparecer somente como mapa visual de continuidade, com rótulo **Futuro** ou **Ainda não disponível**.

Não serão exibidos:

- números simulados;
- percentuais fictícios;
- links sem destino implementado;
- tarefas inventadas;
- indicadores de planejamento, risco, evidência ou revisão.

## 4. Objetivo fechado

Implementar o fluxo para:

1. partir da listagem de trabalhos;
2. abrir o painel do trabalho selecionado;
3. validar contexto organizacional e `engagements.view`;
4. carregar o trabalho pelo identificador;
5. carregar o cliente relacionado;
6. identificar a aceitação utilizada;
7. carregar equipe e períodos pelos contratos da EQP-001;
8. apresentar ações existentes conforme permissões e estado;
9. apresentar módulos futuros sem conteúdo fictício;
10. permitir retorno claro à listagem;
11. tratar carregamento, erro, ausência e acesso negado;
12. preservar tema, responsividade e rolagem.

## 5. Estrutura visual obrigatória

### 5.1 Cabeçalho

Deverá apresentar:

- código;
- título;
- cliente;
- estado;
- retorno à listagem de trabalhos.

### 5.2 Informações gerais

Deverá apresentar:

- classificação;
- escopo preliminar;
- criação;
- última atualização;
- identificação da aceitação utilizada.

### 5.3 Equipe e funções

Deverá reutilizar a consulta homologada da EQP-001.

Quando permitido, a ação de associação existente poderá ser disponibilizada dentro desse bloco, sem criar novo formulário ou nova regra.

### 5.4 Períodos

Deverá reutilizar a consulta homologada da EQP-001 e apresentar estado vazio verdadeiro quando não houver períodos.

Não haverá cadastro ou edição de períodos.

### 5.5 Próximas áreas

Poderão ser apresentados cartões ou lista simples para:

- Contabilidade e planejamento;
- Riscos e procedimentos;
- Documentos e evidências;
- Papéis de trabalho;
- Revisão;
- Relatórios.

Todos deverão estar desabilitados e claramente identificados como futuros.

## 6. Permissões e segurança

### 6.1 Consulta

O painel exigirá:

- sessão autenticada;
- vínculo organizacional ativo;
- autorização ativa;
- `engagements.view`;
- trabalho pertencente à organização atual.

### 6.2 Ações

As ações existentes deverão respeitar as permissões atuais:

- `engagements.manage`;
- `engagements.close`;
- `engagements.cancel`.

Não será criada nova permissão.

### 6.3 Banco

As políticas RLS existentes continuarão sendo a barreira definitiva de acesso.

O painel não utilizará chave privilegiada, `service_role`, bypass de RLS ou consulta fora do contexto organizacional.

## 7. Contratos e fontes oficiais

Deverão ser reutilizados:

- `AuditEngagementRepository.getById`;
- `ClientRepository.getById`;
- `AcceptanceRepository.getById`;
- `EngagementTeamPeriodsRepository.getByEngagement` ou operação equivalente já existente;
- modelos de domínio correspondentes;
- contexto de autenticação e autorização existente.

Antes de criar qualquer contrato novo, a implementação deverá comprovar que a leitura não existe.

Se houver lacuna mínima, ela poderá ser adicionada somente ao contrato responsável e deverá possuir teste direcionado. Não será criado um repositório duplicado apenas para o painel.

## 8. Arquivos autorizados

### 8.1 Arquivos novos permitidos

- `src/routes/trabalhos.$engagementId.tsx`;
- `src/features/engagements/EngagementDashboardPage.tsx`;
- `src/features/engagements/EngagementDashboardSections.tsx`, somente se a página ficar excessivamente concentrada;
- `src/features/engagements/engagementDashboardPresentation.ts`, somente para textos e formatação;
- `tests/features/engagementDashboardPage.test.ts`;
- `tests/features/engagementDashboardScope.test.ts`, somente se necessário separar contrato e apresentação.

### 8.2 Arquivos existentes permitidos

- `src/features/engagements/EngagementsPage.tsx`, somente para adicionar a ação **Abrir painel**;
- `src/features/engagements/EngagementTeamPeriodsReadOnly.tsx`, somente para permitir reutilização segura na página própria;
- `src/features/engagements/engagementsPresentation.ts`, somente para rótulos e formatação já compartilhados;
- `src/data/engagementRepository.ts`, somente se uma lacuna de leitura for comprovada;
- `src/data/clientRepository.ts`, somente se uma lacuna de leitura for comprovada;
- `src/data/acceptanceRepository.ts`, somente se uma lacuna de leitura for comprovada;
- repositórios Supabase correspondentes, somente para implementar contrato de leitura comprovadamente ausente;
- testes diretamente relacionados aos contratos alterados;
- `src/routeTree.gen.ts`, exclusivamente como resultado automático do gerador de rotas, nunca por edição manual;
- documentos da PNL-001, Plano Mestre e Situação do Projeto.

### 8.3 Arquivos proibidos

Não poderão ser alterados:

- autenticação;
- ACL geral;
- `src/domain/authorization.ts`;
- `src/config/navigation.ts`;
- módulos de clientes, aceitação ou equipe fora das integrações de leitura explicitamente autorizadas;
- `package.json`;
- lockfiles;
- migrations existentes;
- pasta `supabase/migrations/`;
- `supabase/.temp/`;
- variáveis de ambiente;
- Lovable Cloud;
- módulos dos Grupos 03 a 07;
- arquivos fora das listas permitidas.

## 9. Etapas fechadas de execução

### Etapa 1 — Rota e composição de leitura

Objetivo:

- criar a rota protegida do painel;
- carregar trabalho, cliente e aceitação;
- tratar trabalho inexistente, acesso negado, carregamento e erro;
- criar testes do escopo e da leitura composta.

Ponto de parada:

- apresentar diff, arquivos e testes;
- não avançar para composição visual completa sem revisão técnica.

### Etapa 2 — Estrutura visual básica

Objetivo:

- criar cabeçalho;
- criar informações gerais;
- adicionar ação **Abrir painel** na listagem;
- preservar o resumo atual;
- validar navegação, retorno, tema, desktop e largura reduzida.

Ponto de parada:

- publicar somente se autorizado;
- solicitar homologação visual do responsável.

### Etapa 3 — Equipe, períodos e continuidade

Objetivo:

- reutilizar o bloco homologado da EQP-001;
- apresentar equipe, funções e períodos;
- manter associação existente conforme permissão;
- apresentar módulos futuros desabilitados e sem dados fictícios.

Ponto de parada:

- executar testes direcionados, lint e build;
- solicitar homologação visual e funcional.

### Etapa 4 — Consolidação e fechamento

Objetivo:

- corrigir somente achados da homologação;
- executar verificação final proporcional;
- atualizar SDD, plano, Plano Mestre e Situação do Projeto;
- publicar branch e abrir PR;
- aguardar aprovação antes do merge;
- registrar conclusão do Grupo 02 somente após homologação.

Não haverá Etapa 5 nesta SDD.

## 10. Procedimento de execução

Após a aprovação deste plano:

1. confirmar `main` atual e estado do Git;
2. preservar alterações locais alheias;
3. criar branch própria a partir da `main`;
4. inspecionar os contratos de leitura;
5. executar a Etapa 1;
6. revisar diff e testes;
7. executar a Etapa 2;
8. realizar homologação visual;
9. executar a Etapa 3;
10. realizar homologação visual e funcional;
11. executar a Etapa 4;
12. publicar um único PR da PNL-001;
13. aguardar autorização para merge;
14. confirmar sincronização da aplicação;
15. encerrar documentalmente o Grupo 02.

## 11. Testes mínimos

Deverão ser verificados:

- usuário com `engagements.view` abre trabalho da própria organização;
- usuário sem permissão recebe acesso negado;
- trabalho de outra organização não é revelado;
- identificador inexistente produz estado apropriado;
- trabalho, cliente e aceitação exibidos correspondem entre si;
- equipe e períodos pertencem ao trabalho consultado;
- estado vazio não cria dados artificiais;
- ações aparecem somente com permissão e estado compatíveis;
- módulos futuros não possuem links funcionais ou números simulados;
- navegação de ida e volta funciona;
- carregamento e erro são apresentados;
- rolagem funciona em desktop e largura reduzida;
- listagem de trabalhos continua funcionando;
- associação da EQP-001 continua funcionando;
- lint dos arquivos afetados é aprovado;
- build de produção é aprovado.

## 12. Validação visual obrigatória

O responsável deverá verificar:

- hierarquia das informações;
- legibilidade no tema escuro;
- identificação inequívoca do trabalho;
- clareza do estado;
- ausência de cartões ou números fictícios;
- equipe e períodos compreensíveis;
- módulos futuros claramente desabilitados;
- rolagem em computador desktop;
- responsividade em largura reduzida;
- retorno para a listagem.

## 13. Situações proibidas

Não deverão ocorrer:

- criação de dashboard gerencial;
- criação de gráficos apenas para preencher espaço;
- criação de migration;
- criação de nova tabela ou view;
- alteração de RLS;
- criação de dados iniciais;
- cadastro de usuários, funções ou períodos;
- implementação de planejamento ou riscos;
- alteração do menu principal;
- remoção do resumo atual antes da homologação;
- refatoração ampla da página de trabalhos;
- instalação de dependências;
- edição manual do arquivo de rotas gerado;
- uso do Lovable sem autorização separada;
- uso de Superpowers;
- publicação direta na `main`;
- desdobramento em novas camadas sem necessidade aprovada.

## 14. Critérios de interrupção

A execução deverá parar quando ocorrer:

- necessidade de nova tabela, migration ou política RLS;
- necessidade de nova permissão;
- ausência de contrato de leitura que exija mudança ampla;
- conflito com autenticação ou contexto organizacional;
- necessidade de criar funções ou períodos para preencher o painel;
- necessidade de antecipar módulo futuro;
- alteração exigida fora da lista permitida;
- conflito com mudança local de outro responsável;
- falha de isolamento entre organizações;
- ampliação automática pelo Lovable;
- impossibilidade de preservar a listagem atual.

O bloqueio deverá ser relatado sem criar nova etapa automaticamente.

## 15. Definição de pronto

A PNL-001 estará pronta somente quando:

- a página própria estiver acessível por trabalho;
- dados reais do Grupo 02 forem apresentados corretamente;
- permissões e isolamento forem preservados;
- trabalho inexistente ou proibido for tratado;
- equipe e períodos forem reutilizados sem duplicação;
- módulos futuros não apresentarem dados fictícios;
- tema, rolagem e responsividade forem homologados;
- testes direcionados forem aprovados;
- lint e build forem aprovados;
- nenhuma migration ou dependência tiver sido criada;
- o PR estiver revisado e aprovado;
- houver homologação visual e funcional;
- a documentação estiver atualizada;
- o Grupo 02 estiver formalmente encerrado.

## 16. Resultado esperado

Ao final, o SIGA possuirá uma porta de entrada estável para cada trabalho, sem transformar o painel em substituto dos módulos metodológicos futuros.

O usuário poderá compreender o contexto atual do trabalho e sua equipe. O Grupo 03 poderá acrescentar posteriormente informações contábeis e de planejamento sem reconstruir a navegação central.

## 17. Próximo passo

O próximo passo autorizado é iniciar somente a Etapa 1 — rota e composição de leitura. Publicação e avanço para a Etapa 2 permanecem condicionados aos pontos de parada deste plano.

## 18. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação do plano restritivo único de implantação da SDD-PNL-001 | Em revisão |
| 1.0 | 2026-08-06 | Aprovação do plano restritivo em quatro etapas fechadas; Etapa 1 autorizada como próximo passo | Aprovado |
