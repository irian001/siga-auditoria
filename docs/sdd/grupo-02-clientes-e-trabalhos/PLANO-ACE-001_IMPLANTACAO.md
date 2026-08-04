---
id: SIGA-PLN-ACE-001
title: Plano de Implantação — SDD-ACE-001 Aceitação e Continuidade Simplificada
aliases:
  - Plano ACE-001
  - Plano de Implantação da Aceitação e Continuidade
type: plano-implantacao
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
implementation_status: nao-iniciado
version: 1.0
created: 2026-08-04
updated: 2026-08-04
owner: responsavel-projeto
responsible:
  coordination: work
  visual_implementation: lovable
  technical_implementation: codex
  approval: responsavel-projeto
implements:
  - SIGA-SDD-ACE-001
depends_on:
  - SIGA-SDD-CLI-001
  - SIGA-SDD-ACL-001
related:
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[SDD-ACE-001]]"
  - "[[SDD-CLI-001]]"
  - "[[SDD-TRB-001]]"
  - "[[Modelo de Dados do SIGA]]"
obsidian:
  note_type: implementation-plan
  graph_role: execution-plan
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, plano, grupo-02, aceitacao, continuidade, lovable, codex, supabase]
---

# Plano de Implantação — SDD-ACE-001

## 1. Objetivo

Implantar a [[SDD-ACE-001]] em camadas pequenas, verificáveis e reversíveis, preservando o cadastro de clientes, a autenticação, o contexto organizacional, o ACL e o Supabase oficial já validados.

O resultado deverá permitir preparar, revisar e decidir uma avaliação simplificada de aceitação ou continuidade, com questionário versionado, histórico, aprovação humana e isolamento multiempresa.

Esta implantação não criará trabalhos de auditoria. Ela fornecerá somente o contrato que a futura `SDD-TRB-001` utilizará para verificar a existência de avaliação aprovada e aplicável.

## 2. Estado técnico de origem

Na elaboração deste plano:

- a `main` contém os Grupos 00 e 01 concluídos;
- a `SDD-CLI-001` está concluída e integrada;
- `public.clients` está implantada no Supabase oficial `umuassmgminmliuypoyp`;
- a aplicação utiliza repositório de clientes real;
- `ClientsPage`, `ClientsList`, `ClientForm` e `ClientStatusDialog` estão funcionais;
- as permissões `clients.view` e `clients.manage` estão implantadas;
- `src/domain/authorization.ts` mantém o catálogo de permissões da aplicação;
- a função `private.has_acl_permission` está disponível no banco;
- a rota `/clientes` é o ponto funcional adequado para iniciar a avaliação de um cliente;
- ainda não existem domínio, componentes, contratos ou tabelas de aceitação;
- a rota `/trabalhos` permanece fora desta implantação;
- Lovable Cloud não integra a arquitetura autorizada.

## 3. Decisão de integração visual

A aceitação será acessada a partir de cada cliente na listagem existente.

Fluxo visual previsto:

```text
/clientes
→ ação Avaliações no cliente
→ painel de histórico e situação aplicável
→ nova avaliação
→ questionário
→ resumo e envio
→ decisão
```

Não será criada rota de detalhe completa do cliente nesta SDD. Essa decisão reduz escopo e evita antecipar uma arquitetura de navegação ainda não aprovada.

Se a implementação demonstrar necessidade técnica de rota própria, a execução deverá parar e apresentar a proposta antes de alterar `src/routes/` ou `src/routeTree.gen.ts`.

## 4. Princípios de execução

- a SDD e este plano deverão estar aprovados e versionados antes do código;
- cada camada terá um objetivo único e uma lista fechada de arquivos;
- o Lovable atuará primeiro com dados simulados e contratos estáveis;
- nenhuma camada visual autoriza banco, migration ou Supabase;
- cada camada será validada pelo responsável antes da seguinte;
- alterações fora do escopo serão recusadas ou revertidas por novo commit;
- Codex e Lovable não alterarão simultaneamente os mesmos arquivos;
- migrations aplicadas não serão reescritas;
- nenhum merge, migration remota ou publicação ocorrerá sem autorização específica;
- Superpowers não será utilizada na geração de código.

## 5. Divisão de responsabilidades

### 5.1 Work

- manter SDD, plano e situação do projeto;
- controlar decisões, escopo e checkpoints;
- preparar prompts pequenos para cada camada do Lovable;
- consolidar a validação funcional.

### 5.2 Lovable

- fabricar somente a experiência visual autorizada;
- reutilizar tema, padrões, componentes e contratos existentes;
- utilizar inicialmente o repositório simulado;
- alterar apenas arquivos expressamente permitidos em cada camada;
- parar ao final da camada e informar o diff;
- não tocar Supabase, migrations, autenticação, ACL ou Lovable Cloud.

### 5.3 Codex

- criar domínio, questionário, contratos e repositório simulado;
- inspecionar e revisar cada diff do Lovable;
- criar migration, funções protegidas, permissões e RLS após autorização;
- implementar o adaptador Supabase;
- integrar a interface ao banco sem reconstruí-la;
- executar verificações técnicas proporcionais e preparar PRs.

### 5.4 Responsável humano

- aprovar a SDD, o plano e cada camada visual;
- autorizar migration remota, merge e publicação;
- validar a adequação do questionário e do fluxo decisório;
- homologar o comportamento no ambiente publicado.

### 5.5 Superpowers

Não será utilizada na elaboração nem na implementação comum desta SDD. Permanece reservada à auditoria formal e aos testes previstos no Grupo 07, conforme `AGENTS.md`.

## 6. Estratégia de branch e PRs

| Entrega | Branch sugerida | Conteúdo |
|---|---|---|
| Documentação | `sdd/ace-001-minuta` | SDD e plano aprovados |
| Base e interface simulada | `feat/ace-001-interface-simulada` | Domínio, contrato, mock e camadas visuais |
| Banco e integração | `feat/ace-001-integracao-supabase` | Migration, RLS, funções e adaptador real |
| Fechamento documental | `docs/ace-001-encerramento` | SDD, plano, Plano Mestre e Situação |

Regras:

- cada branch partirá da `main` atualizada;
- a branch seguinte somente começará após integração ou reconciliação da anterior;
- commits serão pequenos e coerentes;
- a branch conectada ao Lovable não terá histórico reescrito;
- PRs não serão integrados sem aprovação humana.

## 7. Sequência geral

```text
Publicar SDD e plano
→ atualizar e inspecionar a main
→ criar domínio, questionário e contrato
→ criar repositório simulado
→ validar base técnica
→ Lovable Camada 1: acesso e histórico
→ validar
→ Lovable Camada 2: criação e questionário
→ validar
→ Lovable Camada 3: envio e decisão
→ validar
→ Lovable Camada 4: continuidade e cancelamento
→ validar conjunto simulado
→ projetar migration e funções protegidas
→ checkpoint antes do Supabase
→ aplicar migration autorizada
→ implementar adaptador Supabase
→ integrar sem reconstruir a tela
→ verificar função, segurança e regressão
→ PR técnico
→ merge e publicação autorizados
→ homologação humana
→ fechamento documental
```

## 8. Etapa 1 — Publicação documental

### Ações

- integrar a SDD aprovada e este plano após sua aprovação;
- confirmar que o PR documental não contém código;
- registrar os hashes e a situação dos documentos;
- não atualizar o Plano Mestre para implantação iniciada antes do merge documental.

### Saída

SDD e plano disponíveis na `main` como fontes oficiais.

## 9. Etapa 2 — Inspeção técnica atualizada

Antes da primeira edição de código, o Codex deverá:

- atualizar a branch a partir da `main`;
- verificar o estado do Git;
- ler `AGENTS.md`, SDD, plano, Plano Mestre e Situação;
- revisar `ClientsPage`, `ClientsList` e contratos de clientes;
- revisar componentes reutilizáveis e padrões de estado;
- revisar contexto autenticado, ACL e migrations aplicadas;
- confirmar que não surgiu implementação paralela de aceitação;
- listar arquivos definitivos permitidos e protegidos;
- registrar divergências antes de continuar.

## 10. Etapa 3 — Domínio da aceitação

### Arquivo novo previsto

```text
src/domain/acceptance.ts
```

### Conteúdo

- tipos de avaliação;
- estados e conclusões;
- respostas permitidas;
- estrutura da avaliação e das respostas;
- entradas de criação, salvamento, envio, devolução, decisão e cancelamento;
- questionário aprovado com códigos e versão;
- regras puras de completude;
- identificação de comentários obrigatórios;
- identificação de respostas impeditivas;
- transições permitidas;
- schemas de validação.

### Limites

- não depender de React ou Supabase;
- não emitir decisão automática;
- não alterar `src/domain/client.ts` sem necessidade comprovada;
- não implementar criação de trabalho.

## 11. Etapa 4 — Contrato de repositório

### Arquivo novo previsto

```text
src/data/acceptanceRepository.ts
```

### Contrato mínimo

```text
listByClient(context, clientId)
getById(context, assessmentId)
create(context, input)
saveAnswers(context, assessmentId, answers)
submit(context, assessmentId)
returnToDraft(context, assessmentId, reason)
decide(context, assessmentId, conclusion, rationale)
cancel(context, assessmentId, reason)
getApplicable(context, clientId, referencePeriod)
```

O contrato deverá:

- utilizar `RequestContext` existente;
- não aceitar `organization_id`, preparador ou decisor da interface;
- distinguir validação, estado incompatível, autorização, registro inexistente e indisponibilidade;
- retornar modelos do domínio;
- permitir implementação simulada e real;
- não expor linhas brutas do Supabase aos componentes.

## 12. Etapa 5 — Repositório simulado

### Arquivo novo previsto

```text
src/data/mockAcceptanceRepository.ts
```

### Dados e comportamentos

- avaliações fictícias vinculadas apenas aos clientes simulados ou selecionados;
- exemplos de aceitação aprovada, continuidade em rascunho, avaliação rejeitada e ausência de avaliação;
- questionário completo e incompleto;
- bloqueio por questão impeditiva;
- transições conforme a SDD;
- persistência apenas em memória;
- atraso curto opcional para estados de processamento;
- retorno por meio de `OperationResult` existente.

### Aviso obrigatório

Enquanto o mock estiver ativo, a interface deverá informar:

> Avaliação em ambiente de validação. Os dados não serão gravados no banco oficial.

## 13. Etapa 6 — Verificação da base técnica

Antes de acionar o Lovable:

- revisar domínio e contratos;
- verificar transições positivas e negativas;
- validar as oito questões e sua versão;
- confirmar que bloqueio não equivale a decisão automática;
- executar lint, typecheck e compilação disponíveis;
- confirmar que nenhum arquivo visual ou Supabase foi alterado;
- apresentar resumo e diff ao responsável.

Falha nessa etapa interrompe a sequência.

## 14. Camada visual 1 — Acesso e histórico somente leitura

### Objetivo único

Permitir abrir, a partir de um cliente, o painel de avaliações e visualizar seu histórico simulado.

### Arquivos novos inicialmente permitidos

```text
src/features/acceptance/AcceptancePanel.tsx
src/features/acceptance/AcceptanceHistory.tsx
src/features/acceptance/acceptancePresentation.ts
```

### Arquivos existentes inicialmente permitidos

```text
src/features/clients/ClientsPage.tsx
src/features/clients/ClientsList.tsx
```

### Entrega esperada

- ação `Avaliações` em cada cliente;
- painel com identificação do cliente;
- avaliação aplicável em destaque;
- histórico com tipo, data, período, estado, conclusão e responsáveis;
- estados carregando, vazio e erro;
- consulta condicionada a `acceptance.view`;
- aviso de dados simulados.

### Proibido nesta camada

- criar ou editar avaliação;
- alterar domínio, contrato ou mock fornecidos;
- adicionar rota;
- alterar banco, ACL, Supabase ou dependências;
- ativar Lovable Cloud;
- antecipar Camadas 2, 3 ou 4.

### Checkpoint

Revisar resumo, diff e preview. A Camada 2 somente será enviada após validação humana.

## 15. Camada visual 2 — Criação, rascunho e questionário

### Objetivo único

Permitir criar avaliação simulada, responder o questionário e salvar rascunho.

### Arquivos novos inicialmente permitidos

```text
src/features/acceptance/AcceptanceForm.tsx
src/features/acceptance/AcceptanceQuestionnaire.tsx
```

### Arquivos existentes inicialmente permitidos

```text
src/features/acceptance/AcceptancePanel.tsx
src/features/acceptance/acceptancePresentation.ts
```

### Entrega esperada

- ação `Nova avaliação` para `acceptance.prepare`;
- tipo aceitação ou continuidade conforme regras do domínio;
- data e período de referência;
- oito questões agrupadas por tema;
- respostas e comentários;
- mensagens próximas ao campo;
- destaque de comentário obrigatório;
- salvar e cancelar sem envio duplicado;
- atualização do histórico sem recarregar a página.

### Proibido nesta camada

- enviar para decisão;
- aprovar, rejeitar ou devolver;
- alterar regras do questionário;
- criar banco, migration ou integração real;
- alterar outros módulos.

### Checkpoint

Validar criação, rascunho, questionário, responsividade e clareza antes da Camada 3.

## 16. Camada visual 3 — Resumo, envio e decisão

### Objetivo único

Permitir revisar, enviar para decisão, devolver, aprovar ou rejeitar avaliação simulada.

### Arquivos novos inicialmente permitidos

```text
src/features/acceptance/AcceptanceReview.tsx
src/features/acceptance/AcceptanceDecisionDialog.tsx
```

### Arquivos existentes inicialmente permitidos

```text
src/features/acceptance/AcceptancePanel.tsx
src/features/acceptance/AcceptanceForm.tsx
src/features/acceptance/acceptancePresentation.ts
```

### Entrega esperada

- resumo antes do envio;
- indicação de questões pendentes ou impeditivas;
- envio apenas por `acceptance.prepare`;
- decisão apenas por `acceptance.decide`;
- devolução para rascunho com motivo;
- aprovação e rejeição com justificativa;
- confirmação explícita de responsabilidade humana;
- estado decidido em modo somente leitura;
- mensagens de sucesso e erro.

### Proibido nesta camada

- flexibilizar bloqueios definidos no domínio;
- transformar o questionário em decisão automática;
- editar avaliação decidida;
- implementar continuidade ou cancelamento;
- integrar Supabase.

### Checkpoint

O responsável deverá validar o fluxo decisório completo antes da Camada 4.

## 17. Camada visual 4 — Continuidade e cancelamento

### Objetivo único

Completar o fluxo simulado com avaliação de continuidade relacionada e cancelamento de rascunho.

### Arquivos novos inicialmente permitidos

```text
src/features/acceptance/AcceptanceCancelDialog.tsx
```

### Arquivos existentes inicialmente permitidos

```text
src/features/acceptance/AcceptancePanel.tsx
src/features/acceptance/AcceptanceForm.tsx
src/features/acceptance/AcceptanceHistory.tsx
src/features/acceptance/acceptancePresentation.ts
```

### Entrega esperada

- continuidade somente quando houver avaliação anterior;
- referência visível à avaliação anterior;
- alerta sobre rejeição anterior;
- cancelamento de rascunho com motivo e confirmação;
- preservação do registro cancelado no histórico;
- bloqueio de nova avaliação para cliente inativo;
- comportamento completo dos estados simulados.

### Proibido nesta camada

- criar trabalho de auditoria;
- definir validade ilimitada da avaliação;
- adicionar anexos, contratos ou consulta externa;
- alterar banco, Supabase ou ACL.

### Checkpoint

Validar todo o ciclo visual simulado antes de qualquer migration.

## 18. Revisão consolidada da interface simulada

### Validação humana

- ação `Avaliações` facilmente localizada;
- distinção clara entre cliente, avaliação e futuro trabalho;
- compreensão dos estados;
- clareza do questionário;
- destaque de impedimentos sem decisão automática;
- justificativa e confirmação da decisão;
- continuidade relacionada à anterior;
- comportamento em telas menores;
- tema escuro aprovado;
- ausência de antecipação de outros módulos.

### Revisão técnica

- diff completo das quatro camadas;
- arquivos autorizados e não autorizados;
- reuso de componentes;
- acessibilidade básica;
- permissões visuais coerentes;
- mock isolado atrás do contrato;
- ausência de Supabase ou Lovable Cloud;
- lint, typecheck e compilação.

Correções ocorrerão por commits pequenos antes da integração real.

## 19. Etapa 7 — Projeto físico do banco

Após aprovação da interface simulada, o Codex preparará uma migration nova contendo:

- tabela `public.acceptance_assessments`;
- tabela `public.acceptance_assessment_answers`;
- campos, chaves e checks da SDD;
- FKs contextuais para organização, cliente e perfis;
- vínculo opcional com avaliação anterior;
- índices por organização, cliente, estado e data;
- uma única avaliação aberta por cliente, quando confirmado na revisão da migration;
- proibição de exclusão física para a aplicação;
- RLS habilitado;
- privilégios mínimos;
- permissões e concessões idempotentes;
- funções protegidas para transições sensíveis.

### Decisão sobre catálogo de perguntas

As oito questões aprovadas permanecerão versionadas no domínio. A criação da avaliação deverá inserir snapshots canônicos por função protegida, impedindo que o navegador altere código, versão ou texto da questão.

Não será criada tabela administrativa de catálogo de questionários nesta SDD.

## 20. Etapa 8 — Regras físicas de integridade

### Avaliações

- `organization_id` e `client_id` obrigatórios e coerentes;
- cliente ativo e da mesma organização;
- tipo e estado limitados aos códigos aprovados;
- continuidade exige avaliação anterior do mesmo cliente;
- decisão final exige conclusão, justificativa, decisor e momento;
- avaliação decidida não recebe update comum;
- avaliação aberta não pode ser excluída silenciosamente.

### Respostas

- exatamente uma resposta por questão e versão na avaliação;
- código, versão e texto inseridos por função protegida;
- resposta limitada aos quatro valores aprovados;
- `no` e `unknown` exigem comentário;
- `not_applicable` somente conforme regra da questão;
- resposta de avaliação fora de `draft` não pode ser alterada;
- resposta e avaliação pertencem à mesma organização.

### Avaliação aberta

Propõe-se impedir mais de uma avaliação em `draft` ou `pending_review` para o mesmo cliente. Essa regra evita decisões concorrentes e será confirmada no checkpoint da migration.

## 21. Etapa 9 — Ampliação do ACL

Acrescentar por migration idempotente:

```text
acceptance.view
acceptance.prepare
acceptance.decide
```

Regras:

- `organization_admin` receberá as três permissões;
- permissões anteriores serão preservadas;
- nenhum curinga será criado;
- o catálogo TypeScript será atualizado;
- código desconhecido continuará negado;
- `acceptance.prepare` não implicará `acceptance.decide`.

## 22. Etapa 10 — Funções protegidas e transições

As operações sensíveis deverão ocorrer por funções de banco ou mecanismo equivalente revisado:

```text
create_acceptance_assessment(...)
submit_acceptance_assessment(...)
return_acceptance_assessment_to_draft(...)
decide_acceptance_assessment(...)
cancel_acceptance_assessment(...)
```

Cada função deverá:

- resolver usuário, perfil e organização a partir da sessão;
- verificar membership e permissão;
- validar estado anterior e transição;
- registrar ator e momento no banco;
- impedir organização arbitrária;
- usar `search_path` seguro;
- não confiar em bloqueio calculado somente pelo navegador;
- retornar somente os dados necessários.

A função de criação deverá gerar as oito respostas com snapshots canônicos. A função de decisão deverá recalcular completude e impedimentos antes de aprovar.

## 23. Etapa 11 — Políticas RLS

### Leitura

Permitida somente quando:

- sessão e membership estiverem ativos;
- registro pertencer à organização ativa;
- usuário possuir `acceptance.view`, `acceptance.prepare` ou `acceptance.decide`, conforme política final revisada.

### Escrita

- criação e edição de rascunho exigem `acceptance.prepare`;
- decisão exige `acceptance.decide`;
- transições sensíveis serão executadas somente por funções protegidas;
- alteração direta de ator, estado ou conclusão será negada;
- exclusão não será concedida no MVP.

### Respostas

O acesso dependerá simultaneamente da avaliação proprietária, organização e permissão aplicável.

## 24. Etapa 12 — Verificação local da migration

Antes do Supabase remoto:

- revisar SQL completo;
- conferir que migrations anteriores não foram editadas;
- validar FKs, checks, índices e unicidade;
- revisar `security definer`, `search_path`, grants e revokes;
- revisar RLS como usuário autenticado e anônimo;
- verificar transições positivas e negativas;
- confirmar reversão não destrutiva;
- executar lint, typecheck e compilação;
- apresentar diff e resultados.

## 25. Checkpoint obrigatório antes do Supabase remoto

Apresentar ao responsável:

- nome e conteúdo da migration;
- duas tabelas propostas;
- funções protegidas;
- permissões e papel beneficiado;
- RLS e privilégios;
- regra de uma avaliação aberta;
- regra de avaliação aplicável;
- impacto esperado;
- riscos e estratégia de reversão;
- verificações locais realizadas.

Somente autorização humana específica permitirá aplicação em `umuassmgminmliuypoyp`.

## 26. Etapa 13 — Aplicação estrutural remota

Após autorização:

1. confirmar autenticação no projeto correto;
2. confirmar referência `umuassmgminmliuypoyp`;
3. comparar migrations locais e remotas;
4. aplicar somente a migration aprovada;
5. não criar avaliação real;
6. não alterar autenticação, URLs ou provedores;
7. verificar tabelas, funções, permissões, RLS e histórico da migration;
8. parar e apresentar o resultado.

## 27. Etapa 14 — Adaptador Supabase

### Arquivo novo previsto

```text
src/data/supabase/supabaseAcceptanceRepository.ts
```

### Responsabilidades

- implementar o contrato aprovado;
- mapear linhas para o domínio;
- chamar funções protegidas nas transições;
- utilizar contexto autenticado;
- tratar ausência, estado incompatível, bloqueio e autorização;
- não expor mensagens técnicas;
- não duplicar regras de segurança apenas na interface.

O mock permanecerá disponível somente para verificações controladas, sem ser selecionado silenciosamente em produção.

## 28. Etapa 15 — Integração real da interface

### Arquivos existentes previstos

```text
src/features/acceptance/AcceptancePanel.tsx
src/features/clients/ClientsPage.tsx
src/domain/authorization.ts
```

### Ações

- trocar a instanciação simulada pela real em ponto único;
- carregar permissões novas no contexto existente;
- invalidar queries após mutações;
- preservar estados e mensagens já validados;
- retirar o aviso de dados simulados somente após confirmação da integração;
- não reconstruir componentes aprovados;
- não alterar rotas sem autorização adicional.

## 29. Etapa 16 — Verificações funcionais e de segurança

Executar os casos previstos na SDD, incluindo:

- rascunho e salvamento parcial;
- completude e comentários obrigatórios;
- bloqueio de aprovação;
- envio, devolução, aprovação e rejeição;
- imutabilidade de decisão;
- continuidade e avaliação anterior;
- cancelamento preservado;
- cliente inativo;
- cada permissão isoladamente;
- acesso anônimo e membership inativo;
- leitura e mutação entre organizações;
- tentativa de forjar organização, preparador ou decisor;
- tentativa de transição direta no banco;
- snapshots das questões;
- regressão de autenticação, ACL e clientes;
- lint, typecheck e compilação.

Os testes especializados e a auditoria ampla com Superpowers permanecem reservados ao Grupo 07.

## 30. Etapa 17 — PR técnico

O PR deverá informar:

- SDD e plano relacionados;
- arquivos criados e alterados;
- migration aplicada ou pendente;
- funções, permissões e RLS;
- verificações e resultados;
- limitações conhecidas;
- confirmação de ausência de Lovable Cloud;
- passos de homologação visual;
- estratégia de reversão.

Não haverá merge sem aprovação humana.

## 31. Etapa 18 — Merge, publicação e homologação

Após aprovação:

1. integrar o PR na `main`;
2. registrar o hash;
3. confirmar sincronização do Lovable;
4. publicar a aplicação;
5. acessar `/clientes` autenticado;
6. abrir avaliações do cliente Audiconsult de teste autorizado;
7. executar um fluxo controlado sem dados confidenciais;
8. validar permissões e mensagens;
9. registrar a homologação.

## 32. Etapa 19 — Fechamento documental

Após homologação:

- atualizar a `SDD-ACE-001` com o resultado;
- atualizar este plano com commits, PR, migration e limitações;
- atualizar o Plano Mestre;
- atualizar a Situação do Projeto;
- registrar pendências e dívida técnica;
- definir a `SDD-TRB-001` como próxima somente se os critérios estiverem atendidos.

## 33. Estratégia de reversão

### Interface simulada

- corrigir ou reverter o commit da camada;
- preservar as camadas aprovadas;
- não reescrever o histórico sincronizado.

### Antes da migration remota

- corrigir a branch sem efeito no banco;
- não há dado real a restaurar.

### Após migration, antes de uso real

- preferir migration corretiva;
- revogar permissões novas se necessário;
- interromper funções de mutação;
- não editar migration aplicada;
- preservar diagnóstico.

### Após avaliações reais

- não remover tabelas ou decisões;
- interromper mutações;
- corrigir por nova migration ou aplicação;
- preservar avaliações, respostas e atores;
- reverter a interface ao commit anterior mantendo banco compatível.

### Após publicação

- retornar a aplicação ao commit publicado anterior;
- manter banco compatível;
- registrar incidente, impacto e tratamento.

## 34. Riscos e controles

| Risco | Controle |
|---|---|
| Lovable antecipar banco ou outros módulos | Quatro prompts fechados, arquivos permitidos e checkpoints |
| Tela virar uma nova arquitetura paralela | Integração dentro de Clientes e reuso dos padrões existentes |
| Decisão ocorrer automaticamente | Confirmação humana e função de decisão protegida |
| Bloqueio existir apenas na interface | Revalidação na função de banco |
| Navegador forjar decisor ou organização | Identidade derivada da sessão e funções protegidas |
| Avaliação decidida ser alterada | Imutabilidade no banco e nova avaliação para correção |
| Questionário futuro alterar histórico | Snapshots canônicos com código e versão |
| Continuidade ignorar decisão anterior | FK e apresentação obrigatória da avaliação relacionada |
| Avaliações concorrentes criarem decisões conflitantes | Uma avaliação aberta por cliente, sujeita ao checkpoint |
| Cliente externo ficar visível | RLS, contexto organizacional e testes negativos |
| Permissão existir apenas visualmente | ACL, RLS, grants mínimos e funções protegidas |
| Migration afetar ambiente incorreto | Confirmação do projeto e checkpoint remoto |
| Lovable Cloud ser ativado | Proibição expressa e inspeção do diff/configuração |
| Regressão no cadastro de clientes | Arquivos protegidos, integração mínima e testes de regressão |

## 35. Arquivos previstos

### Novos

```text
src/domain/acceptance.ts
src/data/acceptanceRepository.ts
src/data/mockAcceptanceRepository.ts
src/data/supabase/supabaseAcceptanceRepository.ts
src/features/acceptance/AcceptancePanel.tsx
src/features/acceptance/AcceptanceHistory.tsx
src/features/acceptance/AcceptanceForm.tsx
src/features/acceptance/AcceptanceQuestionnaire.tsx
src/features/acceptance/AcceptanceReview.tsx
src/features/acceptance/AcceptanceDecisionDialog.tsx
src/features/acceptance/AcceptanceCancelDialog.tsx
src/features/acceptance/acceptancePresentation.ts
supabase/migrations/<timestamp>_acceptance_assessments.sql
```

### Existentes possivelmente alterados

```text
src/domain/authorization.ts
src/features/clients/ClientsPage.tsx
src/features/clients/ClientsList.tsx
```

### Protegidos nesta implantação

```text
src/routes/
src/routeTree.gen.ts
src/start.ts
src/config/env.ts
configurações de autenticação
URLs e provedores do Supabase
migrations já aplicadas
estrutura de organizations e memberships
recuperação de senha
rotas de módulos não relacionados
segredos e arquivos de ambiente
package.json e arquivos de lock, salvo autorização técnica específica
```

A lista final será confirmada após a inspeção da Etapa 2. Qualquer novo arquivo fora dela exigirá pausa e autorização.

## 36. Critérios de conclusão

A implantação estará concluída quando:

- SDD e plano estiverem versionados;
- as quatro camadas visuais estiverem validadas;
- migration aprovada estiver aplicada no projeto correto;
- permissões, funções e RLS estiverem verificadas;
- interface real funcionar sem Lovable Cloud;
- critérios de aceite da SDD estiverem atendidos;
- avaliação decidida estiver protegida contra alteração;
- isolamento multiempresa estiver verificado;
- regressões conhecidas estiverem ausentes ou registradas;
- PR técnico estiver revisado e integrado;
- aplicação publicada estiver homologada;
- documentação de fechamento estiver atualizada;
- o próximo passo oficial estiver registrado.

## 37. Pontos de parada obrigatórios

A execução deverá parar:

1. após publicação documental;
2. após base técnica e mock;
3. após cada uma das quatro camadas do Lovable;
4. antes da migration remota;
5. depois da migration remota;
6. antes da troca do mock pelo Supabase;
7. antes do PR técnico;
8. antes do merge;
9. após publicação para homologação;
10. antes de iniciar a `SDD-TRB-001`.

## 38. Próximo passo após aprovação deste plano

Após aprovação e integração documental:

1. atualizar a branch técnica com a `main`;
2. executar a inspeção da Etapa 2;
3. apresentar a lista definitiva de arquivos;
4. criar domínio, contrato e mock da base técnica;
5. validar antes do primeiro prompt ao Lovable.

## 39. Navegação

- [[SDD-ACE-001]]
- [[SDD-CLI-001]]
- [[SDD-TRB-001]]
- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Situação do Projeto]]
- [[Modelo de Dados do SIGA]]
- [[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]]

## 40. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-04 | Criação da minuta inicial do plano de implantação da SDD-ACE-001 | Substituída |
| 1.0 | 2026-08-04 | Aprovação humana do plano, das quatro camadas visuais e dos checkpoints de implantação | Aprovada |
