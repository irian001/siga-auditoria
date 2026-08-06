---
id: SIGA-SDD-ACL-001
title: SDD-ACL-001 — Papéis e Permissões
aliases:
  - Papéis e Permissões do SIGA
  - Controle de Acesso do SIGA
  - SDD-ACL-001
type: sdd
domain: organizacao-e-acesso
group: grupo-01-organizacao-e-acesso
status: aprovado
version: 1.0
created: 2026-08-03
updated: 2026-08-03
owner: responsavel-projeto
responsible:
  planning: work
  implementation: codex
  visual_support: lovable
  approval: responsavel-projeto
depends_on:
  - SIGA-SDD-ORG-001
  - SIGA-SDD-AUT-001
  - SIGA-SDD-USR-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-ORG-001]]"
  - "[[SDD-AUT-001]]"
  - "[[SDD-USR-001]]"
  - "[[SDD-CLI-001]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, sdd, grupo-01, acl, papeis, permissoes, autorizacao, rls]
---

# SDD-ACL-001 — Papéis e Permissões

## 1. Finalidade

Implantar a primeira camada de autorização funcional do SIGA, baseada em papéis e permissões vinculados ao membership organizacional.

Esta SDD completa a cadeia iniciada nas SDDs anteriores:

```text
auth.users
→ user_profiles
→ organization_memberships
→ membership_roles
→ roles
→ role_permissions
→ permissions
→ decisão de autorização
```

Autenticação confirma a identidade. Membership confirma o vínculo com a organização. Papel agrupa responsabilidades gerais. Permissão autoriza uma ação delimitada. Nenhum desses elementos, isoladamente, autoriza acesso fora do contexto aplicável.

## 2. Situação de origem

Na abertura desta SDD:

- a organização Audiconsult está cadastrada e ativa;
- a autenticação por e-mail e senha está funcionando;
- o perfil funcional `Irian` está ativo;
- existe membership ativo entre o perfil e a Audiconsult;
- o contexto organizacional é resolvido após o login;
- as rotas internas reconhecem membership ativo;
- ainda não existem tabelas de papéis, permissões ou concessões;
- funções administrativas permanecem sem um modelo ACL próprio;
- o usuário inicial foi liberado por procedimento administrativo controlado.

## 3. Objetivos

- separar papel, permissão, membership e função no trabalho;
- criar papéis organizacionais configuráveis;
- criar permissões atômicas, estáveis e reutilizáveis;
- associar permissões a papéis;
- associar papéis a memberships com vigência;
- implantar autorização por menor privilégio;
- impedir concessão entre organizações diferentes;
- proteger funções administrativas no banco e na aplicação;
- criar o papel administrativo inicial da Audiconsult;
- atribuir esse papel ao membership do usuário `Irian`;
- preparar o Grupo 02 sem antecipar funções específicas dos trabalhos de auditoria.

## 4. Escopo

- entidade `roles`;
- entidade `permissions`;
- associação `role_permissions`;
- associação `membership_roles`;
- estados e vigências;
- catálogo mínimo de permissões administrativas;
- papel inicial de administrador da organização;
- resolução das permissões efetivas do usuário autenticado;
- função central de verificação de autorização;
- RLS e privilégios mínimos;
- proteção das rotas e operações administrativas existentes;
- apresentação do papel e das permissões no contexto do usuário;
- procedimento controlado para concessão e revogação;
- bootstrap idempotente do primeiro administrador.

## 5. Fora do escopo

- funções exercidas dentro de um trabalho de auditoria;
- responsabilidade por risco, procedimento, papel de trabalho ou achado;
- segregação completa por item de auditoria;
- perfil de cliente externo e portal do cliente;
- autorização por cliente específico;
- permissões detalhadas de módulos ainda não implementados;
- acessos temporários a arquivos;
- impersonação;
- delegação automática de poderes;
- exceções permanentes fora dos papéis;
- aprovação automática de regras metodológicas;
- uso de `user_metadata` como fonte de autorização;
- uso de `service_role` no navegador;
- administração irrestrita baseada apenas em interface escondida.

As funções de preparador, executor, supervisor, revisor e aprovador serão tratadas nas SDDs de trabalhos, equipes, revisão e qualidade. Esta SDD estabelece somente o perfil geral da pessoa na organização.

## 6. Separações obrigatórias

### 6.1 Identidade

`auth.users` confirma quem iniciou a sessão. Não armazena papéis funcionais do SIGA.

### 6.2 Perfil funcional

`user_profiles` representa a pessoa no SIGA. Não concede acesso organizacional nem permissão.

### 6.3 Membership

`organization_memberships` vincula o perfil à organização. Membership ativo é condição necessária, mas não suficiente, para executar operações protegidas.

### 6.4 Papel organizacional

`roles` agrupa permissões gerais no contexto de uma organização. Papel não equivale a cargo formal, função em trabalho ou responsabilidade por item.

### 6.5 Permissão

`permissions` representa uma ação atômica, como consultar usuários ou administrar papéis.

### 6.6 Função no trabalho

Será atribuída posteriormente em cada trabalho de auditoria. Não deverá ser armazenada em `roles` ou `membership_roles`.

### 6.7 Responsabilidade por item

Será registrada nos objetos específicos. Não será inferida apenas pelo papel geral.

## 7. Modelo de autorização

Uma operação protegida somente será autorizada quando todas as condições aplicáveis forem verdadeiras:

```text
sessão válida
AND perfil ativo
AND organização ativa
AND membership ativo e vigente
AND papel ativo e vigente
AND permissão ativa vinculada ao papel
AND contexto do recurso pertence à organização
AND regras de estado, confidencialidade e segregação atendidas
```

A ausência de qualquer condição produzirá negação segura.

## 8. Entidade `roles`

### 8.1 Campos

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente |
| `organization_id` | UUID | Sim | Organização proprietária |
| `code` | texto | Sim | Código estável dentro da organização |
| `name` | texto | Sim | Nome de exibição |
| `description` | texto | Não | Finalidade do papel |
| `status` | enum | Sim | `active` ou `inactive` |
| `is_system` | booleano | Sim | Indica papel protegido criado pelo SIGA |
| `created_at` | data/hora | Sim | Criação |
| `updated_at` | data/hora | Sim | Última alteração |
| `inactivated_at` | data/hora | Não | Inativação |

### 8.2 Regras

- `organization_id` e `code` serão únicos em conjunto;
- códigos usarão letras minúsculas, números, ponto, hífen ou sublinhado;
- nome e código não poderão conter somente espaços;
- papel inativo não concederá permissões;
- papel de sistema não poderá ser excluído ou ter código alterado;
- inativação preservará concessões e histórico;
- cada papel pertencerá a exatamente uma organização;
- papel não conterá diretamente usuários, funções de trabalho ou responsabilidade por item.

## 9. Entidade `permissions`

### 9.1 Campos

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente |
| `ownership_scope` | enum | Sim | `platform` ou `organization` |
| `organization_id` | UUID | Condicional | Obrigatório no escopo organizacional |
| `code` | texto | Sim | Código estável da ação |
| `name` | texto | Sim | Nome compreensível |
| `description` | texto | Não | Explicação da ação autorizada |
| `status` | enum | Sim | `active` ou `inactive` |
| `created_at` | data/hora | Sim | Criação |
| `updated_at` | data/hora | Sim | Última alteração |
| `inactivated_at` | data/hora | Não | Inativação |

### 9.2 Regras

- o código da permissão será permanente e não dependerá do texto visual;
- permissões de plataforma serão criadas somente por migration aprovada;
- permissões organizacionais pertencerão a uma organização específica;
- permissão inativa não autorizará ação;
- novas SDDs poderão acrescentar permissões por migration;
- remover ou renomear código exigirá avaliação de impacto e compatibilidade;
- permissão não será inferida de URL, botão, e-mail ou metadado editável pelo usuário.

## 10. Associação `role_permissions`

### 10.1 Campos

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente |
| `organization_id` | UUID | Sim | Contexto organizacional |
| `role_id` | UUID | Sim | Papel beneficiado |
| `permission_id` | UUID | Sim | Permissão concedida |
| `created_at` | data/hora | Sim | Data da concessão |
| `revoked_at` | data/hora | Não | Data da revogação |

### 10.2 Regras

- papel e organização deverão coincidir;
- permissão organizacional deverá pertencer à mesma organização;
- permissão de plataforma poderá ser associada sem transferir propriedade de dados;
- a mesma concessão ativa não poderá ser duplicada;
- revogação preservará o registro;
- associação revogada não autorizará ação;
- alterações relevantes deverão produzir evento de auditoria quando a infraestrutura correspondente existir.

## 11. Associação `membership_roles`

### 11.1 Campos

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente |
| `organization_id` | UUID | Sim | Contexto organizacional |
| `membership_id` | UUID | Sim | Membership beneficiado |
| `role_id` | UUID | Sim | Papel concedido |
| `active_from` | data/hora | Sim | Início da vigência |
| `active_to` | data/hora | Não | Fim da vigência |
| `status` | enum | Sim | `active`, `inactive` ou `revoked` |
| `created_at` | data/hora | Sim | Criação |
| `updated_at` | data/hora | Sim | Última alteração |

### 11.2 Regras

- membership, papel e organização deverão coincidir;
- membership e papel deverão estar ativos para a concessão produzir efeito;
- `active_to` deverá ser posterior a `active_from`;
- concessão inativa, revogada, futura ou expirada não autorizará ação;
- a mesma concessão ativa e vigente não poderá ser duplicada;
- um membership poderá possuir mais de um papel;
- a permissão efetiva será a união das permissões ativas dos papéis ativos;
- o MVP não implantará negação individual sobreposta à concessão;
- revogação será explícita e preservará histórico.

## 12. Catálogo mínimo de permissões

Esta SDD criará somente permissões necessárias para concluir o Grupo 01:

| Código | Finalidade |
|---|---|
| `app.access` | Acessar a área interna básica do SIGA |
| `organization.view` | Consultar a própria organização |
| `users.view` | Consultar usuários e vínculos da própria organização |
| `users.manage` | Criar, ativar, inativar ou revogar perfis e vínculos por processo autorizado |
| `roles.view` | Consultar papéis e permissões da própria organização |
| `roles.manage` | Criar e manter papéis e suas concessões dentro da própria organização |

Permissões de clientes, trabalhos, planejamento, riscos, evidências, revisão e relatórios serão criadas pelas respectivas SDDs. Não serão inventadas antecipadamente nesta migration.

## 13. Papéis iniciais

### 13.1 `organization_admin`

Papel de sistema da organização com as permissões mínimas do Grupo 01:

- `app.access`;
- `organization.view`;
- `users.view`;
- `users.manage`;
- `roles.view`;
- `roles.manage`.

O administrador da organização:

- administra somente sua própria organização;
- não recebe acesso automático a dados de outra organização;
- não recebe automaticamente função em trabalho de auditoria;
- não pode burlar segregação metodológica futura;
- não pode acessar segredos ou utilizar `service_role` no navegador.

### 13.2 Papéis futuros

Papéis como responsável técnico, gerente, auditor, assistente, revisor de qualidade e cliente poderão ser criados quando as permissões dos respectivos módulos estiverem definidas.

Não serão criados papéis vazios apenas para antecipar nomes.

## 14. Resolução de permissões efetivas

Após autenticação e resolução do contexto organizacional, o SIGA deverá obter:

- papéis ativos e vigentes do membership;
- permissões ativas e não revogadas de cada papel;
- conjunto único de códigos efetivos;
- organização à qual cada concessão pertence.

O contexto de autorização conterá, no mínimo:

```ts
type AuthorizationContext = {
  organizationId: string;
  membershipId: string;
  roleCodes: string[];
  permissionCodes: string[];
};
```

O contexto não conterá senha, chave privilegiada ou permissão presumida.

## 15. Decisão de autorização

Deverá existir uma função central, equivalente a:

```ts
can(permissionCode, resourceContext?) => boolean
```

Regras:

- negar quando o código não estiver presente;
- negar quando o contexto estiver incompleto ou inconsistente;
- negar quando o recurso pertencer a outra organização;
- não confiar somente no estado visual do botão;
- reutilizar a mesma semântica no servidor, nos repositórios e na interface;
- permitir que SDDs futuras acrescentem verificações de cliente, trabalho, item, estado e segregação.

## 16. Segurança e RLS

### 16.1 Leitura do próprio contexto

O usuário autenticado poderá consultar somente:

- papéis atribuídos ao próprio membership;
- permissões concedidas a esses papéis;
- dados mínimos dos papéis e permissões necessários à decisão de acesso.

### 16.2 Administração

Operações de criação, concessão, alteração, inativação ou revogação exigirão:

- membership ativo;
- permissão administrativa específica;
- organização coincidente;
- validação no banco ou em operação de servidor segura;
- registro do responsável e da alteração.

### 16.3 Proibições

Ficam proibidos:

- RLS equivalente a `to authenticated using (true)`;
- confiar apenas em componente oculto;
- aceitar `organization_id` enviado pelo navegador sem validação;
- usuário conceder papel a si próprio sem autorização administrativa válida;
- administrador conceder acesso em outra organização;
- papel ou permissão em `user_metadata`;
- chave privilegiada no frontend;
- políticas recursivas sem validação técnica;
- permissão curinga geral como `*` no MVP;
- exclusão física de concessões com histórico relevante.

## 17. Bootstrap do primeiro administrador

O bootstrap inicial deverá:

1. localizar a organização Audiconsult ativa;
2. localizar o membership ativo do perfil `Irian`;
3. criar as permissões mínimas de plataforma por migration;
4. criar o papel de sistema `organization_admin` para a Audiconsult;
5. associar as permissões mínimas ao papel;
6. associar o papel ao membership de `Irian` com vigência imediata;
7. verificar a cadeia completa;
8. autenticar novamente e confirmar o contexto de autorização;
9. confirmar que nenhuma outra organização ou membership foi afetado.

O procedimento será idempotente e não duplicará papel, permissão ou concessão.

## 18. Interface mínima

### 18.1 Contexto do usuário

A área de configurações deverá apresentar:

- nome do usuário;
- organização ativa;
- papéis ativos;
- situação da autorização;
- permissões em formato técnico somente em área de diagnóstico autorizada.

### 18.2 Administração de papéis

Nesta SDD, a interface administrativa poderá ser limitada a consulta segura. Criação e alteração poderão permanecer em procedimento administrativo controlado até existir fluxo visual aprovado.

### 18.3 Comportamento visual

- ações sem permissão não deverão ser oferecidas como disponíveis;
- tentativa direta por URL ou requisição continuará bloqueada;
- mensagens não revelarão papéis ou recursos de outra organização;
- negação deverá indicar falta de autorização sem expor detalhes sensíveis.

## 19. Proteção das rotas

Após esta SDD:

- `/login`, recuperação e callback continuarão públicas;
- `/acesso-pendente` continuará atendendo perfil ou membership sem acesso;
- área interna exigirá `app.access`;
- configurações organizacionais exigirão `organization.view`;
- consulta de usuários exigirá `users.view`;
- gestão de usuários exigirá `users.manage`;
- consulta de papéis exigirá `roles.view`;
- alteração de papéis exigirá `roles.manage`.

Rotas de módulos futuros continuarão sem operações reais até suas SDDs específicas.

## 20. Contratos de domínio

Tipos previstos:

```ts
type RoleStatus = "active" | "inactive";
type PermissionStatus = "active" | "inactive";
type MembershipRoleStatus = "active" | "inactive" | "revoked";
type PermissionOwnershipScope = "platform" | "organization";

type Role = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  status: RoleStatus;
  isSystem: boolean;
};

type Permission = {
  id: string;
  ownershipScope: PermissionOwnershipScope;
  organizationId?: string;
  code: string;
  name: string;
  status: PermissionStatus;
};
```

Os contratos não importarão React ou Supabase.

## 21. Repositórios e serviços

Contratos previstos:

- listar os papéis efetivos do membership atual;
- listar permissões efetivas sem duplicidade;
- verificar um código de permissão;
- listar papéis da organização quando autorizado;
- conceder ou revogar papel por operação administrativa segura;
- conceder ou revogar permissão de papel por operação administrativa segura;
- distinguir ausência, inatividade, expiração, revogação e inconsistência.

Consultas comuns e operações administrativas permanecerão separadas.

## 22. Persistência e migration

A migration deverá:

- criar `roles`;
- criar `permissions`;
- criar `role_permissions`;
- criar `membership_roles`;
- estabelecer PKs, FKs e constraints explícitas;
- garantir coerência de organização entre as associações;
- criar unicidades para códigos e concessões ativas;
- criar índices para resolução por organização, membership, papel, permissão e estado;
- habilitar RLS em todas as tabelas expostas;
- conceder apenas privilégios mínimos;
- criar o catálogo mínimo de permissões de forma versionada e idempotente;
- não inserir credenciais;
- não criar permissões de módulos futuros;
- não atribuir papel a usuário diferente do bootstrap autorizado.

O bootstrap da Audiconsult poderá ser operação administrativa separada da migration estrutural, após apresentação e autorização humana.

## 23. Responsabilidades das ferramentas

### Work

- especificação;
- matriz funcional inicial;
- critérios de aceite;
- plano e acompanhamento.

### Codex

- domínio;
- migration;
- RLS;
- resolução de permissões;
- proteção de rotas e operações;
- bootstrap autorizado;
- verificações técnicas.

### Lovable

- poderá apoiar somente a apresentação visual delimitada;
- não criará migrations, papéis, permissões ou concessões;
- não alterará Supabase, autenticação ou RLS;
- não publicará sem autorização.

### Superpowers

Não será usado na redação ou implementação comum desta SDD. Permanece reservado à etapa formal de auditoria e testes do Grupo 07.

## 24. Arquivos previstos

```text
src/domain/authorization.ts
src/domain/role.ts
src/domain/permission.ts
src/data/authorizationRepository.ts
src/data/supabase/supabaseAuthorizationRepository.ts
src/lib/auth/authorization.server.ts
src/features/users/
src/routes/__root.tsx
src/routes/configuracoes.tsx
supabase/migrations/<gerado-pela-cli>_roles_and_permissions.sql
docs/decisions/ADR-ACL-001.md (se necessário)
```

A lista final dependerá do plano de implantação aprovado.

## 25. Áreas protegidas

Sem nova autorização, não alterar:

- Constituição e documentos estruturantes;
- `AGENTS.md`;
- `.lovable/plan.md`;
- migrations anteriores;
- credenciais e provedores de autenticação;
- registros históricos da organização, perfil e membership iniciais;
- módulos do Grupo 02 em diante;
- funções específicas de trabalhos de auditoria;
- dados reais diferentes do bootstrap expressamente aprovado.

## 26. Critérios de aceite

- quatro estruturas ACL criadas por migration versionada;
- RLS habilitada nas tabelas expostas;
- papel, permissão, membership e função no trabalho permanecem separados;
- códigos de papéis são únicos por organização;
- códigos de permissões são estáveis e únicos no escopo aplicável;
- papel e membership de uma concessão pertencem à mesma organização;
- concessão expirada, inativa ou revogada não produz acesso;
- usuário consulta somente seu próprio contexto ACL;
- `app.access` passa a controlar a área interna;
- ausência de permissão produz negação segura;
- administração exige permissão específica e validação de organização;
- nenhuma política depende apenas do papel `authenticated`;
- nenhuma autorização utiliza `user_metadata`;
- nenhuma chave privilegiada existe no frontend;
- o bootstrap cria `organization_admin` para a Audiconsult sem duplicidade;
- o membership de `Irian` recebe o papel autorizado;
- usuário sem `roles.manage` não altera papéis;
- usuário de outra organização não consulta nem altera ACL da Audiconsult;
- permissões de módulos futuros não são antecipadas;
- compilação, diff e validação visual são aprovados.

## 27. Verificações previstas

### 27.1 Integridade

- unicidade de códigos;
- FKs e coerência organizacional;
- concessão ativa duplicada;
- datas e estados;
- idempotência do catálogo e bootstrap;
- preservação após revogação.

### 27.2 Autorização

- membership sem papel;
- papel inativo;
- papel sem permissão;
- permissão inativa;
- concessão futura, expirada e revogada;
- permissão válida;
- tentativa de autoatribuição;
- tentativa de acesso cruzado entre organizações;
- tentativa de alterar papel de sistema;
- tentativa direta por URL e requisição.

### 27.3 Aplicação

- resolução após login;
- apresentação dos papéis ativos;
- área interna com `app.access`;
- negação sem `app.access`;
- proteção das configurações;
- logout e limpeza do contexto;
- sessão expirada;
- ausência de segredos e permissões indevidas em logs.

## 28. Definition of Done

A SDD estará concluída quando:

- documento e plano estiverem aprovados;
- migration, domínio, repositório e autorização estiverem implantados;
- RLS e isolamento estiverem verificados;
- papel administrativo inicial estiver atribuído de forma idempotente;
- o usuário `Irian` continuar acessando a Audiconsult com as permissões autorizadas;
- usuários sem papel ou permissão forem bloqueados adequadamente;
- nenhuma função de trabalho tiver sido antecipada;
- documentação e limitações estiverem atualizadas;
- alteração estiver integrada à `main` após aprovação humana;
- o Grupo 01 estiver formalmente concluído;
- a [[SDD-CLI-001 — Cadastro de Clientes]] puder ser iniciada.

## 29. Pendências para decisão antes do plano

- confirmar se a interface desta SDD será somente de consulta ou permitirá manutenção de papéis;
- confirmar se `organization_admin` será o único papel materializado no bootstrap;
- confirmar se a área interna inteira exigirá `app.access` desde a primeira versão;
- definir se eventos de concessão e revogação serão implantados agora ou na infraestrutura transversal de histórico;
- definir o procedimento administrativo para futuras concessões enquanto não existir painel completo.

## 30. Próxima etapa

Após aprovação desta minuta será elaborado o Plano de Implantação da `SDD-ACL-001`. Depois da implantação e validação, o Grupo 01 será concluído e seguirá a [[SDD-CLI-001 — Cadastro de Clientes]].

## 31. Histórico

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-03 | Criação da minuta inicial | Substituída |
| 1.0 | 2026-08-03 | Primeira versão aprovada pelo responsável do projeto | Aprovada |
