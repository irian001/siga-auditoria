---
id: SIGA-EQP-001-C3
title: EQP-001 — Camada 3 — Consulta da Equipe e dos Períodos
aliases:
  - Camada 3 da EQP-001
  - Consulta da Equipe e dos Períodos
type: sdd-layer
domain: equipe-funcoes-periodos
status: aprovado
version: 1.0
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
obsidian:
  note_type: implementation-layer
  graph_role: satellite
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[SDD-EQP-001]]"
  - "[[EQP-001_GATE_C_CONCLUSAO]]"
  - "[[PLANO-EQP-001_IMPLANTACAO]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[SDD-TRB-001]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
tags:
  - siga
  - sdd
  - eqp-001
  - camada-3
  - equipe
  - periodos
  - somente-leitura
---

# EQP-001 — CAMADA 3 — CONSULTA DA EQUIPE E DOS PERÍODOS

## 1. Situação desta minuta

Esta minuta inicia a definição da Camada 3 da [[SDD-EQP-001]]. Ela ainda não autoriza alteração de código, criação de migration, alteração de dados ou implementação no Lovable.

A Camada 2 — diretório de usuários elegíveis — foi concluída e preservada no PR #43. A consulta de usuários da organização possui contrato local, adaptador oficial e políticas RLS validadas.

Durante a reconciliação da Camada 1, foi confirmado que o ambiente oficial ainda não possui as entidades físicas:

- `engagement_roles`;
- `engagement_team_members`;
- `engagement_periods`.

Portanto, a Camada 3 não pode ser apresentada como consulta funcional de dados persistidos enquanto essas entidades não existirem. A minuta torna essa dependência explícita para evitar uma tela fictícia ou uma implementação incompleta.

## 2. Objetivo

Disponibilizar uma consulta somente leitura, contextualizada por trabalho, capaz de apresentar:

- participantes vinculados ao trabalho;
- função atribuída no trabalho;
- situação da participação;
- vigência da participação, quando existir;
- períodos registrados para o trabalho;
- situação de cada período;
- estados vazios claros quando ainda não houver vínculos ou períodos.

Esta camada deverá preparar o contrato consumível posteriormente pela associação de usuários da Camada 4, sem executar a associação.

## 3. Decisão de escopo recomendada

Recomenda-se que a Camada 3 tenha um escopo único e fechado:

1. criar, se aprovado no plano, somente a estrutura mínima persistente necessária para consulta;
2. não inserir participantes, funções ou períodos automaticamente;
3. consultar apenas registros existentes no trabalho e na organização atuais;
4. apresentar resultados e estados vazios em modo somente leitura;
5. deixar a criação de vínculos para a Camada 4;
6. deixar criação, alteração, encerramento, conflitos e histórico de períodos para as camadas posteriores previstas na [[SDD-EQP-001]].

A criação da estrutura mínima não significa que a Camada 3 terá CRUD. Significa apenas que o sistema terá um contrato físico seguro para consultar dados quando eles passarem a existir.

## 4. Alternativas consideradas e diretriz para o plano

### Alternativa A — Estrutura mínima e consulta somente leitura — recomendada

Criar as entidades mínimas com RLS e implementar apenas a leitura. A consulta poderá retornar listas vazias até que a Camada 4 registre vínculos ou que um catálogo autorizado de funções e períodos seja disponibilizado.

Vantagens:

- elimina o bloqueio estrutural atual;
- permite validar o contrato real;
- evita dados fictícios tratados como oficiais;
- prepara a Camada 4 sem antecipar seus comandos de escrita;
- mantém a divisão entre consulta e associação.

### Alternativa B — Permanecer bloqueado até existir schema

Não criar entidades nem contratos de consulta e registrar a Camada 3 como bloqueada.

Essa alternativa preserva o banco sem qualquer evolução, mas mantém o projeto sem caminho executável para a consulta e empurra o mesmo bloqueio para a Camada 4.

### Diretriz adotada para o plano restritivo

O plano restritivo da Camada 3 deverá partir da **Alternativa A** como opção recomendada:

- criar somente a estrutura mínima persistente necessária;
- aplicar RLS e isolamento multiempresa;
- implementar apenas contratos e consultas de leitura;
- manter as tabelas inicialmente sem dados artificiais;
- deixar associação de usuários, funções e períodos para as camadas próprias;
- não criar CRUD nem ampliar permissões.

Essa diretriz orientará a elaboração do plano, mas não autoriza ainda a criação da migration ou qualquer alteração no código, no Supabase ou no Lovable.

## 5. Contrato conceitual de leitura

O contrato deverá receber, no mínimo:

- `organizationId` do contexto autenticado;
- `engagementId` do trabalho consultado;
- usuário autenticado;
- autorização de consulta.

O contrato deverá devolver duas coleções independentes:

### 5.1 Participantes da equipe

Campos mínimos previstos:

- identificador do vínculo;
- identificador do perfil ou membership;
- nome de exibição do participante;
- identificador e nome da função;
- situação da participação;
- início da vigência;
- fim da vigência, quando houver;
- identificador do trabalho.

Não deverá retornar credenciais, tokens, dados de `auth.users` ou informações de outra organização.

### 5.2 Períodos do trabalho

Campos mínimos previstos:

- identificador do período;
- identificador do trabalho;
- rótulo ou descrição curta;
- data inicial;
- data final, quando houver;
- situação;
- organização do contexto.

As datas serão exibidas nesta camada, mas validação de criação, alteração, sobreposição e encerramento permanecerá fora do escopo.

## 6. Estrutura física candidata

Os nomes abaixo seguem o [[Modelo de Dados do SIGA]] e deverão ser confirmados no plano restritivo.

### `engagement_roles`

Catálogo de funções no trabalho, com:

- `id`;
- `organization_id`;
- `code`;
- `name`;
- `description`;
- `status`;
- campos de criação e atualização, se o padrão vigente exigir.

Esta camada somente consulta as funções existentes. Não define ainda o catálogo inicial nem cria funções pela interface.

### `engagement_team_members`

Vínculo entre trabalho, membership e função, com:

- `id`;
- `organization_id`;
- `engagement_id`;
- `membership_id`;
- `engagement_role_id`;
- `active_from`;
- `active_to`, quando houver;
- `status`;
- campos de criação e atualização, se o padrão vigente exigir.

Esta camada não cria nem altera esses vínculos.

### `engagement_periods`

Período contextual do trabalho, com:

- `id`;
- `organization_id`;
- `engagement_id`;
- `label`;
- `start_date`;
- `end_date`, quando houver;
- `status`;
- campos de criação e atualização, se o padrão vigente exigir.

Esta camada não cria nem altera períodos.

## 7. Regras de consulta

A consulta deverá:

- exigir sessão autenticada e contexto organizacional válido;
- exigir a permissão de consulta de trabalhos já existente, recomendando-se `engagements.view`;
- restringir o trabalho à organização atual;
- aplicar RLS no Supabase;
- relacionar participante, membership, função e trabalho sem atravessar organizações;
- preservar a possibilidade de exibir registros históricos identificados por sua situação;
- separar participantes de períodos na resposta e na interface;
- retornar estado vazio quando não houver registros;
- não usar e-mail livre para representar membro de equipe;
- não consultar `auth.users` diretamente pelo navegador;
- não usar chave privilegiada no cliente.

## 8. Limites da camada

### Incluído

- contrato de leitura da equipe;
- contrato de leitura dos períodos;
- adapter local ou simulado para testes;
- adapter oficial somente leitura;
- migration mínima, se autorizada;
- RLS e isolamento correspondentes;
- consulta no contexto de um trabalho;
- estados vazio, erro e sem autorização;
- testes técnicos de consulta e isolamento;
- documentação do diff e do PR.

### Fora do escopo

- associar usuário ao trabalho;
- atribuir ou trocar função;
- criar, editar ou encerrar participação;
- criar, editar ou excluir período;
- definir conflitos ou sobreposição de períodos;
- criar catálogo de funções pela interface;
- CRUD de usuários;
- convite ou administração de usuários;
- alteração de autenticação;
- novos códigos de permissão;
- painel geral ou [[SDD-PNL-001]];
- planejamento, balancete ou riscos;
- dados fictícios tratados como dados oficiais;
- ativação do Lovable Cloud;
- uso de Superpowers.

## 9. Experiência visual prevista

Se uma camada visual for autorizada posteriormente, ela deverá permanecer restrita ao contexto de consulta de um trabalho e conter:

- seção "Equipe" em modo somente leitura;
- seção "Períodos" em modo somente leitura;
- nome do participante, função e situação;
- rótulo e intervalo do período;
- estados vazios explícitos;
- mensagem informando que associação e manutenção serão disponibilizadas em camada posterior.

Não deverá existir nesta camada:

- botão "Adicionar membro";
- botão "Criar período";
- formulário de função;
- edição inline;
- exclusão;
- alteração de status;
- ação que pareça concluir a Camada 4.

O Lovable somente poderá ser utilizado se houver uma autorização posterior com lista fechada de arquivos e prompt restritivo. A recomendação atual é implementar primeiro localmente, pelo Codex, e só depois avaliar a publicação visual.

## 10. Critérios de aceite da minuta

Antes de elaborar o plano restritivo, deverão estar confirmados:

1. a Alternativa A ou B;
2. a permissão reutilizada para consulta;
3. a lista final de tabelas autorizadas;
4. a decisão sobre catálogo inicial de funções;
5. a regra de exibição de registros históricos;
6. a lista fechada de arquivos;
7. a necessidade e o conteúdo da migration;
8. a separação entre consulta e escrita;
9. a não inclusão de Lovable, salvo autorização específica;
10. a ausência de CRUD de usuários nesta camada.

## 11. Critérios de conclusão da futura implementação

A Camada 3 poderá ser considerada concluída quando, dentro do escopo aprovado:

- o trabalho consultado pertencer à organização atual;
- a consulta exibir equipe, função e situação quando houver registros;
- a consulta exibir períodos quando houver registros;
- o estado vazio for claro quando não houver registros;
- consultas entre organizações forem bloqueadas;
- usuário sem autorização não visualizar os dados;
- nenhum comando de escrita estiver disponível;
- nenhum vínculo ou período for criado automaticamente;
- testes de isolamento, autorização e mapeamento forem aprovados;
- a migration e a documentação estiverem coerentes, se houver alteração persistente;
- a homologação autenticada for registrada.

## 12. Próximo passo controlado

Após a aprovação desta minuta, será preparado um único plano restritivo da Camada 3, sem novas subdivisões. Esse plano fechará:

- a alternativa escolhida;
- o schema mínimo, se autorizado;
- os contratos;
- os arquivos permitidos;
- os testes;
- os critérios de parada;
- a forma de publicação e homologação.

Nenhum código, migration ou alteração no Lovable será iniciado antes da aprovação desse plano.

## 13. Navegação

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- [[SDD-EQP-001]]
- [[EQP-001_CAMADA_1_RECONCILIACAO]]
- [[EQP-001_CAMADA_2_DIRETORIO_USUARIOS]]
- [[EQP-001_GATE_C_CONCLUSAO]]
- [[SDD-TRB-001]]
- [[Modelo de Dados do SIGA]]
- [[Plano Mestre das SDDs do MVP do SIGA]]

## 14. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-06 | Criação da minuta da Camada 3, com dependência física explicitada e escopo somente leitura | Substituída |
| 1.0 | 2026-08-06 | Minuta aprovada como escopo da execução | Aprovada |
