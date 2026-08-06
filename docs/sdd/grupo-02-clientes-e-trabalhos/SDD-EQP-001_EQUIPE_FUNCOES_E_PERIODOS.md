---
id: SIGA-SDD-EQP-001
title: SDD-EQP-001 — Equipe, Funções e Períodos do Trabalho
aliases:
  - Equipe do Trabalho de Auditoria
  - Funções no Trabalho
  - Períodos do Trabalho
  - SDD-EQP-001
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
  - SIGA-SDD-ORG-001
  - SIGA-SDD-AUT-001
  - SIGA-SDD-USR-001
  - SIGA-SDD-ACL-001
  - SIGA-SDD-CLI-001
  - SIGA-SDD-ACE-001
  - SIGA-SDD-TRB-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[SDD-TRB-001]]"
  - "[[PLANO-EQP-001_IMPLANTACAO]]"
  - "[[SDD-PNL-001]]"
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
  - equipe
  - funcoes
  - periodos
  - trabalho
---

# SDD-EQP-001 — Equipe, Funções e Períodos do Trabalho

## 1. Finalidade

Esta SDD define a capacidade de organizar a equipe, as funções e os períodos de um [[Trabalho de Auditoria]], preservando a organização usuária, os usuários autorizados e o ciclo de vida já implementado pela [[SDD-TRB-001]].

A presente versão é uma minuta de especificação. Ela não autoriza código, migration, alteração de dados, publicação ou ativação do Lovable Cloud.

## 2. Situação de origem

Os Grupos 00 — Fundação e 01 — Organização e acesso estão concluídos. No Grupo 02, `SDD-CLI-001`, `SDD-ACE-001` e `SDD-TRB-001` foram implementadas e homologadas dentro dos escopos aprovados.

A `SDD-TRB-001` foi concluída com a criação, consulta, edição limitada e ciclo de vida do trabalho. A equipe, as funções e os períodos foram mantidos fora desse escopo e são tratados nesta SDD.

O [[Plano Mestre das SDDs do MVP do SIGA]] reserva o painel básico para a `SDD-PNL-001`. Portanto, esta SDD não deverá criar um painel abrangente nem adiantar funcionalidades de planejamento.

## 3. Objetivos

A EQP-001 deverá permitir:

1. consultar a equipe vinculada a um trabalho;
2. associar usuários autorizados ao trabalho;
3. atribuir funções específicas no trabalho;
4. registrar períodos relevantes do trabalho;
5. validar datas, vínculos e organização;
6. preservar histórico das alterações;
7. preparar a base para revisão, supervisão e painel posterior.

## 4. Escopo funcional

### 4.1 Equipe

A equipe deverá ser formada por usuários vinculados à mesma organização do trabalho e autorizados a participar daquele contexto.

A associação deverá permitir identificar, no mínimo:

- trabalho;
- usuário;
- função no trabalho;
- situação da participação;
- data de início;
- data de término, quando aplicável;
- responsável pela alteração;
- histórico.

### 4.2 Funções

A função no trabalho representa a responsabilidade operacional atribuída naquele trabalho. Ela não substitui o papel organizacional nem a permissão de acesso.

A função deverá ser separada de:

- papel organizacional;
- permissão técnica;
- cargo profissional;
- especialista externo;
- responsável pelo cliente.

### 4.3 Períodos

O trabalho poderá possuir períodos documentados para organizar o exercício, a competência ou a etapa do trabalho. O período deverá manter vínculo com o trabalho e não deverá alterar silenciosamente o período original sem histórico.

## 5. Fora do escopo

Esta SDD não implementará:

- painel completo do trabalho;
- planejamento da auditoria;
- materialidade;
- riscos e procedimentos;
- balancete ou mapeamento de contas;
- agenda e apontamento de horas;
- propostas, contratos ou faturamento;
- portal do cliente;
- convites externos;
- cadastro de novos usuários;
- alteração de permissões organizacionais;
- revisão de qualidade;
- troca automática de responsável;
- inteligência artificial operacional;
- qualquer migration sem plano próprio aprovado.

## 6. Conceitos

### 6.1 Equipe do trabalho

Conjunto de usuários autorizados e vinculados a um trabalho específico.

### 6.2 Função no trabalho

Responsabilidade exercida por um usuário naquele trabalho. Exemplos de categorias poderão ser responsável, executor, revisor ou especialista, mas o catálogo final deverá ser aprovado no plano de implementação.

### 6.3 Período do trabalho

Intervalo ou referência temporal usada para contextualizar o trabalho. O período não é sinônimo de data de criação nem de prazo operacional.

### 6.4 Participação ativa

Vínculo de usuário que está vigente e pode ser considerado na equipe atual do trabalho.

### 6.5 Histórico

Registro das inclusões, alterações, encerramentos e demais eventos relevantes, sem apagar a sequência anterior.

## 7. Relação central

```text
Organização
    ↓
Usuário autorizado
    ↓
Equipe do trabalho
    ↓
Função no trabalho
    ↓
Período do trabalho
    ↓
Execução, revisão e supervisão futuras
```

A equipe não deverá existir de forma independente do trabalho, e um usuário não deverá ser associado a trabalho de outra organização.

## 8. Regras de negócio

### 8.1 Isolamento organizacional

O trabalho, o usuário e a associação de equipe deverão pertencer à mesma organização usuária. A consulta e a alteração deverão respeitar o isolamento multiempresa e as políticas de acesso vigentes.

### 8.2 Usuário elegível

Somente usuário existente, ativo e vinculado à organização poderá ser associado à equipe. A associação não deverá criar usuário nem substituir o fluxo de convite e vínculo organizacional.

### 8.3 Permissão

A implementação inicial deverá reutilizar a permissão de gestão de trabalhos já existente, sem criar novas permissões nesta SDD. A decisão final deverá confirmar o uso de `engagements.manage` para manutenção da equipe e dos períodos.

### 8.4 Função e permissão são conceitos diferentes

A função atribuída no trabalho não concede, por si só, acesso ao sistema. O acesso deverá continuar dependendo da ACL e do contexto organizacional.

### 8.5 Independência e segregação

A associação de uma função não deverá permitir que o sistema ignore regras de independência ou revisão. Quando uma combinação for incompatível, o sistema deverá bloquear ou exigir justificativa conforme a regra aprovada, sem a SDD inventar exceção automática.

### 8.6 Uma participação por combinação

Não deverá existir duplicidade ativa para a mesma combinação de trabalho, usuário e função. Alterações deverão atualizar o vínculo permitido ou registrar nova versão conforme o contrato de dados aprovado.

### 8.7 Vigência da participação

Uma participação encerrada não deverá continuar aparecendo como ativa. O encerramento deverá preservar a data, o responsável e o histórico.

### 8.8 Períodos válidos

O período deverá possuir referência ao trabalho, data inicial e, quando aplicável, data final. A data final não poderá ser anterior à inicial. Sobreposição entre períodos deverá ser bloqueada ou tratada por regra explícita aprovada no plano.

### 8.9 Trabalho encerrado ou cancelado

Trabalhos em estado terminal não deverão aceitar alterações ordinárias de equipe ou período. Qualquer exceção exigirá decisão própria e histórico.

### 8.10 Histórico

Inclusão, alteração, encerramento, troca de função e alteração de período deverão permanecer rastreáveis. Nenhuma operação deverá apagar a informação anterior.

## 9. Entidades lógicas

A SDD utilizará, conforme o modelo de dados aprovado, as seguintes entidades lógicas:

### 9.1 `engagement_roles`

Catálogo ou registro de funções aplicáveis ao trabalho, com identificador, nome, descrição, situação e metadados de organização quando aplicável.

### 9.2 `engagement_team_members`

Vínculo entre trabalho e usuário, com função, situação, vigência, responsável pela alteração e histórico.

### 9.3 `engagement_periods`

Períodos vinculados ao trabalho, com referência temporal, situação, responsável e histórico.

A definição física final, nomes de colunas, índices, constraints e migration deverá ser confirmada no plano de implementação e comparada com o modelo de dados antes de qualquer alteração no Supabase.

## 10. Fluxos funcionais

### 10.1 Consultar equipe

O usuário autorizado seleciona um trabalho e visualiza os participantes ativos, suas funções e a situação dos vínculos. Participações encerradas poderão ser consultadas somente quando o contrato de acesso permitir.

### 10.2 Associar membro

O usuário seleciona um usuário elegível, escolhe uma função válida, informa a vigência quando necessária e confirma. O sistema valida organização, duplicidade, estado do trabalho e permissão antes de registrar.

### 10.3 Encerrar participação

O usuário autorizado informa o encerramento. O sistema preserva a participação histórica e deixa de considerá-la ativa após a data ou ação definida.

### 10.4 Criar período

O usuário autorizado informa o período e o sistema valida a relação com o trabalho, a ordem das datas, conflitos e estado do trabalho.

### 10.5 Alterar período ou função

Alterações deverão ser limitadas aos campos permitidos no contrato. O sistema deverá preservar o valor anterior e registrar o evento correspondente.

## 11. Camadas previstas de implementação

A execução deverá ser dividida em sete camadas pequenas, com validação ao final de cada uma:

### Camada 1 — Reconciliação dos contratos

Confirmar o que já existe para usuários, perfis, memberships, ACL, trabalhos e contratos de dados. Nenhuma alteração persistente será feita nesta camada.

### Camada 2 — Diretório de usuários elegíveis, somente leitura

Criar ou expor apenas a consulta necessária para listar usuários ativos da organização. Esta camada não criará, editará, inativará ou excluirá usuários.

O resultado deverá filtrar por:

- perfil ativo;
- membership ativo e vigente;
- organização do contexto atual;
- permissão `users.view` ou regra equivalente aprovada;
- RLS e isolamento multiempresa.

Esta é a camada-gargalo. Sem ela, o sistema não poderá associar novos membros a um trabalho com segurança.

### Camada 3 — Consulta da equipe e dos períodos

Exibir os vínculos existentes do trabalho, seus participantes, funções, situações e períodos. Esta camada ainda poderá ser somente leitura.

### Camada 4 — Associação de usuário e função

Permitir que um usuário elegível seja associado ao trabalho com uma função válida, impedindo duplicidade, associação entre organizações e atribuição de função inexistente.

### Camada 5 — Manutenção e encerramento das participações

Permitir alteração limitada de função ou vigência e encerramento de participação, preservando o histórico e bloqueando alterações em trabalhos terminais.

### Camada 6 — Períodos, histórico e integração com o ciclo do trabalho

Implementar validações de datas, conflitos, histórico e integração com os estados da `SDD-TRB-001`, sem antecipar planejamento ou painel.

### Camada 7 — Revisão final e preparação para o painel

Executar revisão documental, testes de ACL e isolamento, homologação autenticada e preparação dos contratos que serão consumidos pela `SDD-PNL-001`.

Nenhuma camada será iniciada sem plano restritivo próprio e aprovação específica.

## 11.1 Dependência do diretório de usuários

O diretório de usuários da Camada 2 não é um CRUD de usuários. Ele é uma capacidade de consulta administrativa para selecionar usuários já existentes.

O fluxo necessário será:

```text
auth.users
    ↓
user_profiles
    ↓
organization_memberships
    ↓
Diretório de usuários elegíveis
    ↓
engagement_team_members
```

O sistema atual resolve principalmente o contexto do usuário autenticado. A consulta dos demais usuários da organização ainda deverá ser confirmada quanto a repositório, política RLS e permissão `users.view`.

Se a Camada 2 não puder ser implementada com segurança, as Camadas 3 e 4 poderão ser demonstradas apenas com dados já existentes ou permanecerão bloqueadas. Não será permitido contornar o bloqueio usando e-mail livre, `auth.users` diretamente ou dados de outra organização.

## 12. Critérios de aceitação da SDD

A EQP-001 poderá ser considerada implementada quando, dentro do escopo aprovado:

- usuários elegíveis puderem ser associados a um trabalho;
- o diretório listar somente usuários ativos e elegíveis da organização;
- a consulta exibir equipe, função e situação corretas;
- usuário de outra organização for bloqueado;
- usuário inexistente ou inativo for bloqueado;
- duplicidade ativa for impedida;
- períodos inválidos forem rejeitados;
- alterações em trabalho terminal forem bloqueadas;
- função não conceder permissão indevida;
- histórico for preservado;
- equipe e períodos permanecerem separados do painel;
- testes de regras, ACL e isolamento forem executados;
- documentação, migrations e PR forem atualizados quando houver alteração persistente;
- homologação autenticada for registrada.

## 13. Restrições de implementação

Durante a preparação desta SDD:

- não alterar código;
- não criar migration;
- não criar ou alterar dados no Supabase;
- não alterar ACL ou permissões;
- não ativar Lovable Cloud;
- não usar Superpowers;
- não iniciar implementação no Lovable;
- não criar painel;
- não antecipar planejamento;
- não adicionar dependências;
- não misturar esta SDD com `SDD-PNL-001` ou Grupo 03.

O Work coordena a especificação. Qualquer implementação futura deverá ocorrer conforme plano aprovado, com lista fechada de arquivos e etapas.

## 14. Decisões pendentes para o plano

Antes da implementação, o plano deverá fechar:

1. catálogo inicial de funções;
2. se funções serão globais ou configuráveis por organização;
3. estados físicos da participação;
4. regra para múltiplos períodos;
5. regra para períodos sobrepostos;
6. obrigatoriedade de justificativa para encerramentos;
7. permissão exata reutilizada;
8. lista fechada de arquivos;
9. necessidade de migration;
10. forma do histórico;
11. testes de isolamento, ACL e segregação;
12. limite da camada visual e eventual participação do Lovable.

Essas decisões são pendências de planejamento, não lacunas para serem resolvidas por código durante a execução.

## 15. Material para treinamento

### 15.1 Objetivos de aprendizagem

Ao final, o participante deverá compreender:

- diferença entre organização, usuário, função e equipe;
- por que estar cadastrado não significa estar associado ao trabalho;
- por que função não equivale a permissão;
- como períodos contextualizam o trabalho;
- por que o histórico deve ser preservado;
- por que equipe e painel são SDDs diferentes.

### 15.2 Estrutura sugerida para apresentação

1. O trabalho como unidade de contexto;
2. quem pode participar;
3. função no trabalho;
4. período e vigência;
5. regras de independência;
6. histórico;
7. exemplos de bloqueio;
8. relação com o painel e o planejamento.

### 15.3 Estudo de caso

Um usuário está ativo na Audiconsult, mas não possui vínculo com o trabalho selecionado. O sistema deverá permitir sua associação somente se ele for elegível e o responsável atribuir uma função válida. Um usuário de outra organização deverá ser bloqueado, mesmo que seu e-mail seja conhecido.

### 15.4 Perguntas para discussão

- Por que o papel organizacional não substitui a função no trabalho?
- Um usuário ativo pode participar de qualquer trabalho?
- O que deve acontecer quando a participação termina?
- Por que períodos sobrepostos exigem regra explícita?
- Como a equipe será usada posteriormente na revisão?

## 16. Navegação

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Situação do Projeto]]
- [[SDD-TRB-001]]
- [[PLANO-EQP-001_IMPLANTACAO]]
- [[SDD-PNL-001]]
- [[Modelo de Domínio do SIGA]]
- [[Modelo de Dados do SIGA]]
- [[Regras de Negócio e Metodologia de Auditoria]]

## 17. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação da minuta da SDD-EQP-001 — equipe, funções e períodos | Em revisão |
| 1.0 | 2026-08-05 | Aprovação da SDD com sete camadas e diretório administrativo somente leitura como pré-requisito | Aprovada |
