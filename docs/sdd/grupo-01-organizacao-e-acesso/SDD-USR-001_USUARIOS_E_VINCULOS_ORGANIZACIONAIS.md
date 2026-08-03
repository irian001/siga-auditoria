---
id: SIGA-SDD-USR-001
title: SDD-USR-001 — Usuários e Vínculos Organizacionais
aliases:
  - Usuários e Vínculos Organizacionais
  - Perfis e Memberships
  - SDD-USR-001
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
related:
  - "[[Constituição do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-ORG-001]]"
  - "[[SDD-AUT-001]]"
  - "[[SDD-ACL-001]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, sdd, grupo-01, usuarios, perfis, memberships, multiempresa]
---

# SDD-USR-001 — Usuários e Vínculos Organizacionais

## 1. Finalidade

Implantar a identidade funcional dos usuários do SIGA e o vínculo controlado entre cada usuário autenticado e uma [[Organização Usuária]].

Esta SDD transforma uma identidade confirmada pelo Supabase Auth em um contexto organizacional verificável, sem confundir autenticação, vínculo e permissão.

```text
auth.users
→ user_profiles
→ organization_memberships
→ organizations
→ papéis e permissões na SDD-ACL-001
```

Um login válido continuará sem autorizar dados quando não existir perfil ativo, vínculo ativo ou organização ativa.

## 2. Situação de origem

Na abertura desta SDD:

- a autenticação por e-mail e senha está implantada;
- a recuperação e redefinição de senha estão funcionando;
- o cadastro público permanece desabilitado;
- existe um usuário de validação autenticado;
- `public.organizations` existe, possui RLS e está vazia;
- `user_profiles` e `organization_memberships` ainda não existem;
- usuário autenticado sem vínculo é encaminhado para `/acesso-pendente`.

## 3. Objetivos

- criar perfis funcionais separados das credenciais;
- criar vínculos explícitos entre perfis e organizações;
- liberar somente organizações e vínculos ativos;
- preservar histórico por inativação e vigência;
- implantar o primeiro vínculo por procedimento administrativo controlado;
- permitir que o aplicativo determine o contexto organizacional após o login;
- preparar a base para papéis e permissões da [[SDD-ACL-001]].

## 4. Escopo

- entidade `user_profiles`;
- entidade `organization_memberships`;
- relacionamento com `auth.users` e `organizations`;
- estados e períodos de vigência;
- contratos de domínio e repositório;
- consulta segura do contexto do usuário autenticado;
- políticas RLS mínimas para leitura do próprio perfil, dos próprios vínculos e das organizações vinculadas;
- tela administrativa mínima de usuários e vínculos;
- estado de acesso pendente, ativo, inativo ou bloqueado;
- procedimento de bootstrap da primeira organização, perfil e membership;
- atualização da proteção das rotas para exigir vínculo ativo.

## 5. Fora do escopo

- cadastro público;
- convite por e-mail e automação completa de onboarding;
- papéis, permissões e matriz ACL;
- funções em trabalhos de auditoria;
- acesso de clientes auditados;
- escolha ou troca entre várias organizações na interface;
- impersonação;
- exclusão física de perfis ou memberships;
- alteração de senha, MFA ou login social;
- gestão de usuários diretamente pelo Lovable;
- uso de `service_role` no navegador;
- liberação ampla baseada somente no papel `authenticated`.

Papéis e permissões serão tratados na [[SDD-ACL-001]]. Nesta SDD, o vínculo ativo libera apenas o contexto organizacional básico.

## 6. Conceitos e separações obrigatórias

### 6.1 Identidade autenticada

`auth.users` confirma quem é a pessoa e mantém credenciais, sessões e dados próprios do provedor.

### 6.2 Perfil funcional

`user_profiles` representa a pessoa dentro do SIGA. Não armazena senha, token ou autorização organizacional.

### 6.3 Vínculo organizacional

`organization_memberships` registra que determinado perfil pertence ou pertenceu a uma organização durante uma vigência e em determinado estado.

### 6.4 Autorização

Membership não equivale a papel ou permissão. A autorização funcional será acrescentada pela [[SDD-ACL-001]].

## 7. Entidade `user_profiles`

### 7.1 Campos

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente gerado pelo SIGA |
| `auth_subject` | UUID | Sim | Referência única a `auth.users.id` |
| `display_name` | texto | Sim | Nome de exibição não vazio |
| `status` | enum | Sim | `active` ou `inactive` |
| `created_at` | data/hora | Sim | Criação do perfil |
| `updated_at` | data/hora | Sim | Última alteração |
| `inactivated_at` | data/hora | Não | Preenchido quando inativo |

### 7.2 Regras

- cada identidade autenticada terá no máximo um perfil funcional;
- `auth_subject` será único e não poderá ser alterado pela interface comum;
- `display_name` não poderá conter somente espaços;
- perfil ativo terá `inactivated_at` nulo;
- perfil inativo terá `inactivated_at` preenchido;
- inativação preservará autoria, histórico e vínculos anteriores;
- e-mail continuará pertencendo ao provedor de autenticação e não será duplicado como fonte de verdade no perfil;
- `user_metadata` não determinará acesso, vínculo, papel ou permissão.

## 8. Entidade `organization_memberships`

### 8.1 Campos

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente |
| `organization_id` | UUID | Sim | FK para `organizations.id` |
| `user_profile_id` | UUID | Sim | FK para `user_profiles.id` |
| `status` | enum | Sim | `pending`, `active`, `inactive` ou `revoked` |
| `active_from` | data/hora | Condicional | Obrigatório no vínculo ativo |
| `active_to` | data/hora | Não | Encerramento da vigência |
| `created_at` | data/hora | Sim | Criação do vínculo |
| `updated_at` | data/hora | Sim | Última alteração |

### 8.2 Regras

- organização e perfil deverão existir antes do vínculo;
- um perfil poderá possuir vínculos históricos e, futuramente, vínculos em mais de uma organização;
- o MVP terá somente um contexto organizacional ativo por sessão;
- não poderá existir mais de um vínculo ativo simultâneo para a mesma combinação de organização e perfil;
- vínculo `active` exige perfil ativo, organização ativa, `active_from` preenchido e `active_to` nulo ou futuro;
- vínculo `inactive` ou `revoked` não autoriza acesso;
- `active_to` não poderá ser anterior a `active_from`;
- encerramento ou revogação preservará o registro;
- reativação deverá ser explícita, registrada e validada;
- membership não concederá automaticamente papel administrativo.

## 9. Estados de acesso

O aplicativo deverá distinguir:

| Situação | Resultado |
|---|---|
| Sem sessão | Redirecionar para `/login` |
| Sessão válida sem perfil | `/acesso-pendente` |
| Perfil inativo | Acesso bloqueado e logout disponível |
| Perfil ativo sem membership ativo | `/acesso-pendente` |
| Membership pendente | `/acesso-pendente` |
| Membership inativo ou revogado | Acesso bloqueado |
| Organização inativa | Acesso bloqueado |
| Perfil, membership e organização ativos | Criar contexto organizacional básico |
| Mais de um membership ativo | Interromper e registrar inconsistência até existir seleção controlada |

## 10. Contexto organizacional

Após autenticação, o SIGA deverá resolver:

```text
auth.uid()
→ user_profiles.auth_subject
→ organization_memberships.user_profile_id
→ organizations.id
```

O contexto mínimo conterá:

- `userProfileId`;
- `organizationMembershipId`;
- `organizationId`;
- nome de exibição do usuário;
- nome de exibição da organização;
- estados do perfil, vínculo e organização.

Esse contexto não conterá senha, token, chave privilegiada ou permissão inventada.

## 11. Persistência e migration

A migration deverá:

- criar `public.user_profiles`;
- criar `public.organization_memberships`;
- estabelecer PKs e FKs explícitas;
- referenciar `auth.users(id)` por `auth_subject` com proteção contra exclusão destrutiva;
- criar unicidade de `auth_subject`;
- criar unicidade aplicável ao vínculo ativo por organização e perfil;
- criar constraints de conteúdo, estado e vigência;
- criar índices para resolução por identidade, perfil, organização e estado;
- habilitar RLS nas duas tabelas;
- conceder somente os privilégios mínimos necessários;
- não inserir senha, token ou credencial;
- não inserir dados de outra organização;
- possuir reversão documentada compatível com o estado inicial.

## 12. Segurança e RLS

### 12.1 `user_profiles`

Usuário autenticado poderá consultar somente o próprio perfil, identificado por `auth.uid() = auth_subject`.

Criação, atualização administrativa e inativação não serão liberadas diretamente ao cliente comum nesta SDD.

### 12.2 `organization_memberships`

Usuário autenticado poderá consultar somente memberships ligados ao próprio perfil.

Criação, ativação, revogação e alteração de vigência ocorrerão por processo administrativo autorizado, nunca por autoassociação.

### 12.3 `organizations`

Usuário autenticado poderá consultar somente organizações relacionadas a membership próprio, vigente e ativo, desde que perfil e organização também estejam ativos.

### 12.4 Proibições

Não serão aceitas políticas equivalentes a:

```sql
to authenticated
using (true)
```

Também ficam proibidos:

- autorização por `user_metadata`;
- `service_role` no frontend;
- seleção de organização apenas por parâmetro enviado pelo navegador;
- criação de vínculo pelo próprio usuário;
- acesso a memberships de outros usuários;
- política baseada somente em esconder componentes visuais.

## 13. Operação administrativa

Até existir painel administrativo plenamente autorizado, criação e manutenção de perfis e vínculos serão executadas por procedimento administrativo controlado.

Cada operação deverá identificar:

- identidade autenticada;
- organização;
- perfil criado ou localizado;
- membership criado ou alterado;
- estado e vigência;
- responsável humano;
- data;
- justificativa;
- resultado da verificação.

Nenhuma senha será solicitada ou registrada nessa operação.

## 14. Bootstrap inicial

O primeiro acesso será implantado nesta ordem:

1. confirmar o projeto Supabase oficial;
2. confirmar a identidade `auth.users` pelo e-mail autorizado;
3. obter e validar os dados da organização inicial;
4. criar a organização ativa por operação administrativa;
5. criar o perfil funcional ligado ao `auth.users.id`;
6. criar o membership ativo;
7. verificar diretamente a cadeia de vínculo;
8. encerrar a sessão anterior e autenticar novamente;
9. confirmar que o contexto organizacional foi resolvido;
10. manter as funções administrativas restritas até a [[SDD-ACL-001]].

O bootstrap será idempotente: nova execução não poderá duplicar organização, perfil ou membership.

## 15. Interface mínima

### 15.1 Acesso pendente

A tela atual será preservada e passará a refletir o resultado real da consulta de perfil e membership.

### 15.2 Usuários e vínculos

Será criada uma área mínima, inicialmente restrita, para apresentar:

- nome do usuário;
- e-mail proveniente da identidade autenticada, quando autorizado;
- organização vinculada;
- estado do perfil;
- estado e vigência do membership;
- mensagens de ausência ou bloqueio.

Essa tela não permitirá autoativação, autoassociação, alteração de papel ou visualização de outra organização.

### 15.3 Cabeçalho

Quando houver contexto válido, o cabeçalho poderá apresentar o nome da organização e do usuário sem expor identificadores técnicos.

## 16. Contratos de domínio

Tipos previstos:

```ts
type UserProfileStatus = "active" | "inactive";
type OrganizationMembershipStatus = "pending" | "active" | "inactive" | "revoked";

type UserProfile = {
  id: string;
  authSubject: string;
  displayName: string;
  status: UserProfileStatus;
};

type OrganizationMembership = {
  id: string;
  organizationId: string;
  userProfileId: string;
  status: OrganizationMembershipStatus;
  activeFrom?: string;
  activeTo?: string;
};

type OrganizationContext = {
  userProfileId: string;
  organizationMembershipId: string;
  organizationId: string;
  userDisplayName: string;
  organizationDisplayName: string;
};
```

Os contratos não importarão React ou Supabase.

## 17. Repositórios

O contrato de acesso deverá prever:

- localizar o perfil pela identidade autenticada;
- listar memberships do próprio perfil;
- resolver o contexto organizacional ativo;
- distinguir ausência, pendência, inatividade, revogação e inconsistência;
- obter dados mínimos da organização autorizada.

Operações administrativas de criação e alteração deverão permanecer separadas das consultas comuns do usuário.

## 18. Integração com autenticação e rotas

A proteção das rotas deverá exigir, em sequência:

1. sessão válida;
2. identidade validada;
3. perfil ativo;
4. membership ativo e vigente;
5. organização ativa;
6. futuramente, papel e permissão aplicáveis.

Enquanto a [[SDD-ACL-001]] não estiver implantada, somente o contexto básico aprovado nesta SDD será liberado. Funcionalidades administrativas ou sensíveis continuarão bloqueadas.

## 19. Responsabilidades das ferramentas

### Work

- especificação;
- regras funcionais;
- critérios de aceite;
- plano e acompanhamento.

### Codex

- domínio;
- migration;
- RLS;
- contratos e adaptadores;
- resolução do contexto;
- proteção das rotas;
- verificações técnicas;
- bootstrap administrativo autorizado.

### Lovable

- poderá apoiar somente a interface mínima e os ajustes visuais delimitados;
- não poderá criar migrations, políticas, perfis, memberships ou dados reais;
- não poderá modificar autenticação, Supabase ou autorização.

### Superpowers

Não será usado na redação ou implementação comum desta SDD. Permanece reservado à etapa formal de testes e validação do Grupo 07.

## 20. Arquivos previstos

```text
src/domain/user.ts
src/domain/organizationMembership.ts
src/data/userContextRepository.ts
src/data/supabase/supabaseUserContextRepository.ts
src/features/users/
src/features/auth/AccessPending.tsx
src/lib/auth/
src/routes/__root.tsx
src/routes/configuracoes.tsx
src/components/layout/AppHeader.tsx
supabase/migrations/<gerado-pela-cli>_user_profiles_and_memberships.sql
docs/decisions/ADR-USR-001.md (se necessário)
```

A lista final dependerá do plano de implementação aprovado.

## 21. Arquivos e áreas protegidas

Sem nova autorização, não alterar:

- Constituição e documentos estruturantes aprovados;
- `AGENTS.md`;
- `.lovable/plan.md`;
- migrations anteriores;
- configuração de provedores de autenticação;
- modelo de e-mail de recuperação;
- credenciais ou variáveis públicas já aprovadas;
- módulos de clientes, trabalhos ou auditoria;
- estrutura de papéis e permissões da futura [[SDD-ACL-001]].

## 22. Critérios de aceite

- `user_profiles` e `organization_memberships` criadas por migration versionada;
- RLS habilitada nas tabelas expostas;
- identidade e perfil mantidos separados;
- perfil único por `auth_subject`;
- membership não pode ligar registros inexistentes;
- usuário consulta somente o próprio perfil e memberships;
- organização somente é visível por vínculo próprio ativo e vigente;
- perfil, membership ou organização inativos bloqueiam acesso;
- usuário sem vínculo permanece em `/acesso-pendente`;
- vínculo ativo cria contexto organizacional básico;
- mais de um vínculo ativo é tratado como inconsistência, sem escolha silenciosa;
- nenhum usuário pode criar ou ativar o próprio membership;
- nenhuma autorização utiliza `user_metadata`;
- nenhuma chave privilegiada existe no frontend;
- bootstrap inicial não duplica registros;
- seu resultado é verificado diretamente no banco e pelo aplicativo;
- papéis e permissões não são antecipados;
- compilação e escopo do diff são aprovados;
- nenhuma organização diferente da autorizada é acessível.

## 23. Verificações previstas

### 23.1 Dados e integridade

- unicidade de `auth_subject`;
- FKs de perfil, organização e membership;
- estados válidos;
- coerência de datas;
- impedimento de membership ativo duplicado;
- idempotência do bootstrap.

### 23.2 Autorização

- usuário sem perfil;
- perfil inativo;
- usuário sem membership;
- membership pendente, inativo e revogado;
- organização inativa;
- membership ativo e vigente;
- tentativa de consultar perfil ou membership de outro usuário;
- tentativa de consultar organização não vinculada;
- tentativa de autoassociação.

### 23.3 Aplicação

- resolução do contexto após login;
- redirecionamento para acesso pendente;
- liberação do contexto ativo;
- logout e limpeza do contexto;
- comportamento em sessão expirada;
- apresentação em desktop e tela menor;
- ausência de segredo, senha ou token em logs.

## 24. Definition of Done

A SDD estará concluída quando:

- documento e plano de implementação estiverem aprovados;
- migration, domínio, repositório e resolução do contexto estiverem implantados;
- RLS e isolamento estiverem verificados;
- bootstrap inicial autorizado estiver concluído sem duplicidade;
- usuário de validação acessar somente a organização vinculada;
- estados pendente e bloqueado continuarem funcionando;
- interface mínima estiver validada;
- documentação e limitações estiverem atualizadas;
- alteração estiver integrada à `main` após aprovação humana;
- a [[SDD-ACL-001]] puder ser iniciada.

## 25. Pendências para decisão antes da implementação

- razão social, nome de exibição e CNPJ da primeira organização;
- nome de exibição do primeiro usuário;
- forma administrativa escolhida para o bootstrap inicial;
- necessidade de apresentar e-mail na tela administrativa mínima;
- definição do comportamento temporário das rotas internas até a [[SDD-ACL-001]].

## 26. Próxima etapa

Após aprovação desta SDD será elaborado o plano de implementação da `SDD-USR-001`. Depois da implantação e validação, seguirá a [[SDD-ACL-001 — Papéis e Permissões]].

## 27. Histórico

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-03 | Criação da minuta inicial | Substituída |
| 1.0 | 2026-08-03 | Primeira versão aprovada pelo responsável do projeto | Aprovada |
