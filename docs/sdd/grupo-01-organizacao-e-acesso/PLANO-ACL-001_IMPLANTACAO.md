---
id: SIGA-PLN-ACL-001
title: Plano de Implantação da SDD-ACL-001
aliases:
  - Plano ACL-001
  - Implantação de Papéis e Permissões
type: implementation-plan
domain: organizacao-e-acesso
status: aprovado
version: 1.0
created: 2026-08-03
updated: 2026-08-03
owner: responsavel-projeto
depends_on:
  - SIGA-SDD-ACL-001
related:
  - "[[SDD-ACL-001]]"
  - "[[SDD-USR-001]]"
  - "[[SDD-AUT-001]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]]"
  - "[[SDD-CLI-001]]"
obsidian:
  note_type: implementation-plan
  graph_role: implementation-plan
  backlinks_expected: true
  dataview_ready: true
tags: [siga, grupo-01, acl, papeis, permissoes, supabase, implementacao]
---

# Plano de Implantação — SDD-ACL-001

## 1. Objetivo

Implantar autorização funcional por papéis e permissões no contexto organizacional já estabelecido, completando a cadeia:

```text
identidade autenticada
→ perfil funcional
→ membership ativo
→ papel organizacional ativo
→ permissões efetivas
→ decisão de autorização
```

O primeiro resultado operacional será manter o acesso de `Irian` à organização Audiconsult por meio do papel `organization_admin`, substituindo a liberação baseada somente no membership por uma autorização explícita e verificável.

## 2. Regra de execução

O Codex conduzirá migration, RLS, domínio, repositório, autorização, bootstrap e verificações técnicas.

O Lovable poderá ser usado apenas para apresentação visual delimitada, depois que contratos e permissões estiverem implantados. Não poderá alterar banco, RLS, papéis, permissões, concessões ou dados reais.

Superpowers não será utilizado no planejamento ou na implementação comum. Permanecerá reservado à auditoria e aos testes formais do Grupo 07.

## 3. Entregas e branches

```text
Documentação: docs/acl-001-especificacao
Implementação: feat/acl-001-papeis-permissoes
Base técnica: main após merge da documentação
PR documental: SDD-ACL-001 + Plano ACL-001
PR técnico: migration, domínio, autorização e interface mínima
Merge: somente após validação humana
```

Nenhum PR deverá misturar cadastro de clientes, funções em trabalhos ou correções independentes.

## 4. Sequência geral

```text
aprovar documentação
→ publicar documentação
→ inspecionar estado real
→ preparar migration local
→ revisar RLS e integridade
→ implementar domínio e repositório
→ integrar autorização às rotas
→ validar localmente
→ apresentar checkpoint remoto
→ aplicar migration autorizada
→ executar bootstrap autorizado
→ verificar acesso e isolamento
→ validar visualmente
→ abrir PR técnico
→ aprovar e integrar
→ publicar no Lovable
→ concluir Grupo 01
```

## 5. Etapa 1 — Publicação documental

1. aprovar a SDD-ACL-001;
2. aprovar este plano;
3. atualizar o plano para `status: aprovado` e `version: 1.0`;
4. preservar a versão `0.1` no histórico;
5. criar branch documental baseada na `main`;
6. incluir somente a SDD e o plano;
7. abrir PR documental;
8. revisar e integrar à `main`;
9. confirmar sincronização com o Lovable.

Nenhum código ou banco será alterado nessa etapa.

## 6. Etapa 2 — Inspeção técnica inicial

Confirmar:

- branch e commit atual da `main`;
- alterações locais não relacionadas;
- migrations aplicadas no Supabase oficial;
- organização Audiconsult ativa;
- perfil `Irian` e membership ativo;
- políticas RLS atuais de organização, perfil e membership;
- fluxo de resolução do contexto organizacional;
- proteção atual das rotas;
- contratos e arquivos da USR-001;
- inexistência de `roles`, `permissions`, `role_permissions` e `membership_roles`;
- ausência de autorização por metadata ou chave privilegiada.

Divergências serão registradas antes da implementação.

## 7. Etapa 3 — Decisões técnicas

Confirmar antes da migration:

- códigos permanentes dos papéis e permissões;
- escopo `platform` e `organization`;
- estados e regras de vigência;
- estratégia de unicidade das concessões ativas;
- coerência obrigatória de `organization_id`;
- forma de resolver permissões efetivas;
- função central de autorização;
- estratégia para operações administrativas;
- necessidade de função SQL segura ou consulta comum sob RLS;
- reversão sem apagar registros existentes;
- necessidade de ADR-ACL-001.

Não criar permissão curinga nem funções de trabalho nesta decisão.

## 8. Etapa 4 — Migration local

Criar migration pelo mecanismo oficial do projeto contendo:

- `public.roles`;
- `public.permissions`;
- `public.role_permissions`;
- `public.membership_roles`;
- PKs e FKs explícitas;
- constraints de código, estado, escopo e datas;
- coerência entre estado e inativação;
- unicidade de `organization_id, code` em papéis;
- unicidade de códigos de permissão por escopo;
- impedimento de concessões ativas duplicadas;
- índices por organização, membership, papel, permissão e status;
- RLS em todas as novas tabelas;
- grants mínimos;
- políticas de leitura do próprio contexto ACL;
- bloqueio de escrita direta pelo usuário comum;
- catálogo mínimo de permissões de plataforma.

A migration estrutural não atribuirá papel a usuários reais.

## 9. Etapa 5 — Catálogo mínimo

Criar de forma versionada e idempotente:

| Código | Uso inicial |
|---|---|
| `app.access` | Entrada na área interna |
| `organization.view` | Consulta da própria organização |
| `users.view` | Consulta de usuários e vínculos próprios da organização |
| `users.manage` | Administração autorizada de usuários e vínculos |
| `roles.view` | Consulta de papéis e permissões |
| `roles.manage` | Administração de papéis e concessões |

Não criar permissões dos Grupos 02 a 07.

## 10. Etapa 6 — Revisão da migration

Antes de qualquer aplicação remota, revisar:

- coerência das FKs organizacionais;
- impossibilidade de associar papel e membership de organizações distintas;
- políticas RLS e risco de recursão;
- privilégios da Data API;
- ausência de `using (true)`;
- ausência de `SECURITY DEFINER` desnecessário;
- ausência de credenciais e dados reais;
- índices usados pelas políticas;
- idempotência do catálogo;
- plano de reversão;
- compatibilidade com migrations anteriores.

A migration permanecerá apenas na branch até autorização específica.

## 11. Etapa 7 — Domínio

Implementar tipos e validações para:

- `RoleStatus`;
- `PermissionStatus`;
- `MembershipRoleStatus`;
- `PermissionOwnershipScope`;
- `Role`;
- `Permission`;
- `RolePermission`;
- `MembershipRole`;
- `AuthorizationContext`;
- códigos de permissão;
- vigência e revogação.

O domínio não importará React ou Supabase.

## 12. Etapa 8 — Contrato de autorização

Criar contrato independente do provedor para:

- listar papéis efetivos do membership atual;
- listar permissões efetivas sem duplicidade;
- verificar uma permissão por código;
- distinguir papel ausente, inativo, futuro, expirado ou revogado;
- distinguir permissão ausente ou inativa;
- obter dados mínimos de papéis para apresentação autorizada.

Operações administrativas permanecerão separadas das consultas do usuário comum.

## 13. Etapa 9 — Adaptador Supabase

O adaptador deverá:

- utilizar a sessão autenticada;
- depender de RLS;
- consultar somente o próprio membership;
- filtrar estados e vigências;
- eliminar códigos duplicados;
- validar coincidência da organização;
- traduzir falhas sem expor dados internos;
- não aceitar `organization_id` do navegador como autorização;
- não utilizar `service_role` no frontend.

## 14. Etapa 10 — Contexto de autorização

Estender o contexto atual para incluir:

```text
organizationId
membershipId
roleCodes
permissionCodes
authorizationStatus
```

Estados previstos:

- `active` — contexto e `app.access` válidos;
- `pending` — membership sem papel aplicável;
- `blocked` — papel ou concessão inativa, expirada ou revogada;
- `error` — inconsistência ou falha temporária.

Membership ativo sem `app.access` não liberará a área interna após a transição controlada.

## 15. Etapa 11 — Função central de autorização

Implementar função equivalente a:

```ts
can(permissionCode, resourceContext?) => boolean
```

Ela deverá:

- negar por padrão;
- validar código presente e ativo;
- validar organização do recurso;
- funcionar no servidor e apoiar a interface;
- não transformar botão oculto em proteção suficiente;
- permitir extensão futura por cliente, trabalho, item, estado e segregação.

## 16. Etapa 12 — Proteção das rotas

Aplicar inicialmente:

| Área | Permissão |
|---|---|
| Área interna básica | `app.access` |
| Dados da organização | `organization.view` |
| Consulta de usuários | `users.view` |
| Administração de usuários | `users.manage` |
| Consulta de papéis | `roles.view` |
| Administração de papéis | `roles.manage` |

Durante a implantação local, preservar temporariamente o acesso atual até o bootstrap estar preparado. A exigência definitiva de `app.access` somente será publicada depois que o papel inicial estiver atribuído e verificado.

## 17. Etapa 13 — Interface mínima

Implementar somente:

- apresentação dos papéis ativos do usuário;
- indicação de autorização ativa;
- estado seguro quando não houver papel ou `app.access`;
- consulta mínima de papéis e permissões na área de configurações, se aprovada;
- mensagens para ausência, revogação e erro;
- ocultação orientativa de ações sem permissão.

Não criar painel completo de manutenção nesta primeira implantação, salvo decisão posterior expressa.

## 18. Etapa 14 — Verificações locais

Executar antes de mudança remota:

- lint dos arquivos alterados;
- compilação completa;
- `git diff --check`;
- revisão do escopo;
- revisão manual da migration;
- busca por segredos;
- validação dos códigos;
- casos de papel e permissão válidos e inválidos;
- rotas com e sem `app.access`;
- ausência de alterações em arquivos protegidos.

O lint geral poderá registrar separadamente problemas preexistentes de final de linha. Os arquivos desta entrega deverão passar individualmente.

`src/routeTree.gen.ts` somente será incluído se houver alteração funcional necessária e revisada.

## 19. Etapa 15 — Checkpoint antes do Supabase remoto

Apresentar ao responsável:

- nome da migration;
- tabelas, constraints e políticas;
- catálogo mínimo;
- resultado das verificações locais;
- diff resumido;
- plano de reversão;
- confirmação do projeto `umuassmgminmliuypoyp`;
- confirmação de ausência de atribuição real nessa operação.

A aplicação dependerá de autorização humana específica.

## 20. Etapa 16 — Aplicação estrutural remota

Após autorização:

1. aplicar somente a migration aprovada;
2. confirmar tabelas e colunas;
3. confirmar PKs, FKs, constraints e índices;
4. confirmar RLS, grants e políticas;
5. confirmar catálogo mínimo;
6. executar advisors de segurança e desempenho;
7. confirmar ausência de papéis atribuídos a memberships;
8. registrar resultado.

Nenhum bootstrap ocorrerá automaticamente.

## 21. Etapa 17 — Bootstrap do administrador

Após nova autorização específica, executar operação separada, transacional e idempotente:

1. localizar a Audiconsult ativa;
2. localizar o perfil `Irian` e seu membership ativo;
3. localizar ou criar o papel `organization_admin` da Audiconsult;
4. associar as seis permissões mínimas ao papel;
5. atribuir o papel ao membership de `Irian` com vigência imediata;
6. consultar a cadeia completa;
7. confirmar ausência de duplicidade;
8. confirmar que nenhuma outra organização foi afetada.

Se qualquer passo falhar, a operação deverá ser revertida integralmente.

## 22. Etapa 18 — Ativação da exigência ACL

Somente depois do bootstrap verificado:

1. ativar exigência de `app.access` nas rotas internas;
2. manter `/acesso-pendente` para membership sem papel;
3. diferenciar falta de vínculo e falta de autorização;
4. publicar a versão atualizada;
5. autenticar novamente;
6. confirmar acesso de `Irian`;
7. confirmar negação sem permissão.

Essa ordem evita bloquear o único usuário administrativo durante a implantação.

## 23. Etapa 19 — Verificação de segurança

Confirmar:

- usuário consulta somente seus papéis e permissões efetivos;
- membership sem papel não acessa a área interna;
- papel sem `app.access` não acessa a área interna;
- papel, permissão ou concessão inativos não autorizam;
- concessão futura, expirada ou revogada não autoriza;
- usuário comum não cria ou concede papel;
- usuário não se promove sozinho;
- administrador não atua em outra organização;
- tentativa por URL e requisição direta é negada;
- metadata não participa da decisão;
- RLS permanece habilitada;
- nenhuma chave privilegiada existe no frontend.

## 24. Etapa 20 — Validação visual

Validar:

- acesso normal do administrador;
- indicação clara de organização e papel;
- estado sem permissão;
- mensagens de bloqueio sem exposição indevida;
- configurações em desktop e tela menor;
- tema noturno preservado;
- ausência de regressão em login, recuperação e logout.

O Lovable poderá ser acionado apenas se houver ajuste visual necessário, com prompt delimitado e sem banco.

## 25. Etapa 21 — PR técnico

O PR deverá conter:

- migration;
- domínio e contratos;
- adaptador Supabase;
- autorização central;
- proteção de rotas;
- interface mínima;
- relatório das verificações;
- limitações conhecidas;
- declaração de que funções de trabalho não foram antecipadas.

O PR será aberto inicialmente como rascunho e não será integrado sem revisão humana.

## 26. Etapa 22 — Merge e publicação

Depois da aprovação:

1. integrar o PR técnico à `main`;
2. confirmar sincronização no Lovable;
3. publicar a versão atual;
4. verificar o arquivo público atualizado;
5. realizar login funcional;
6. confirmar autorização e isolamento;
7. registrar conclusão do Grupo 01.

## 27. Reversão

### Antes da aplicação remota

- descartar ou corrigir a branch sem impacto no banco.

### Após migration, antes do bootstrap

- manter tabelas sem concessões e corrigir por nova migration;
- não apagar estruturas automaticamente se houver risco de divergência.

### Após bootstrap

- revogar `membership_roles` sem apagar histórico;
- revogar associações de papel quando necessário;
- restaurar temporariamente a regra anterior de rota somente por PR de correção aprovado;
- nunca excluir organização, perfil ou membership para reverter ACL.

### Após publicação

- reverter o commit aplicacional preservando dados ACL;
- publicar a versão corrigida;
- registrar incidente e causa.

## 28. Riscos e controles

| Risco | Controle |
|---|---|
| Bloquear o único administrador | Bootstrap antes de exigir `app.access` |
| Escalada de privilégio | Escrita administrativa protegida e negação por padrão |
| Mistura de organizações | FKs, constraints, RLS e testes cruzados |
| Papel confundido com função no trabalho | Domínios e tabelas separados |
| Política RLS recursiva | Revisão e teste antes da aplicação |
| Permissões futuras inventadas | Catálogo mínimo limitado ao Grupo 01 |
| Duplicação de concessões | Índices únicos e bootstrap idempotente |
| Proteção apenas visual | Verificação no servidor e banco |
| Lovable alterar segurança | Escopo visual sem Supabase ou migrations |
| Divergência entre GitHub e publicação | Conferência da `main` e do artefato publicado |

## 29. Arquivos previstos

```text
src/domain/authorization.ts
src/domain/role.ts
src/domain/permission.ts
src/data/authorizationRepository.ts
src/data/supabase/supabaseAuthorizationRepository.ts
src/lib/auth/authorization.server.ts
src/lib/auth/auth.server.ts
src/routes/__root.tsx
src/routes/configuracoes.tsx
src/features/users/
supabase/migrations/<timestamp>_roles_and_permissions.sql
```

Arquivos adicionais dependerão de necessidade comprovada no diff.

## 30. Áreas protegidas

Não alterar sem autorização adicional:

- Constituição e documentos estruturantes;
- `AGENTS.md`;
- `.lovable/plan.md`;
- migrations anteriores;
- provedores, URLs e credenciais de autenticação;
- organização, perfil e membership existentes, exceto a concessão ACL autorizada;
- módulos do Grupo 02 em diante;
- funções de equipe e revisão dos trabalhos;
- dados reais não relacionados ao bootstrap.

## 31. Critérios de conclusão

O plano estará concluído quando:

- documentação estiver na `main`;
- quatro estruturas ACL estiverem versionadas e aplicadas;
- RLS e isolamento estiverem verificados;
- catálogo mínimo estiver íntegro;
- `organization_admin` estiver atribuído a `Irian`;
- `app.access` controlar a área interna;
- operações administrativas exigirem permissão específica;
- ausência ou revogação de permissão produzir bloqueio seguro;
- login, recuperação e logout permanecerem funcionais;
- PR técnico estiver aprovado e integrado;
- versão publicada estiver validada;
- Grupo 01 estiver concluído;
- SDD-CLI-001 puder ser iniciada.

## 32. Próximo passo após aprovação

Depois da aprovação deste plano:

1. formalizar versão `1.0`;
2. publicar SDD e plano em branch documental;
3. revisar e integrar o PR documental;
4. criar a branch técnica;
5. executar somente até o checkpoint anterior ao Supabase remoto.

## 33. Histórico

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-03 | Criação da minuta inicial | Substituída |
| 1.0 | 2026-08-03 | Primeira versão aprovada pelo responsável do projeto | Aprovada |
