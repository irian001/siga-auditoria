---
id: SIGA-PLN-USR-001
title: Plano de Implantação da SDD-USR-001
aliases:
  - Plano USR-001
  - Implantação de Usuários e Vínculos Organizacionais
type: implementation-plan
domain: organizacao-e-acesso
status: aprovado
version: 1.0
created: 2026-08-03
updated: 2026-08-03
owner: responsavel-projeto
depends_on:
  - SIGA-SDD-USR-001
related:
  - "[[SDD-USR-001]]"
  - "[[SDD-ORG-001]]"
  - "[[SDD-AUT-001]]"
  - "[[SDD-ACL-001]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]]"
obsidian:
  note_type: implementation-plan
  graph_role: implementation-plan
  backlinks_expected: true
  dataview_ready: true
tags: [siga, grupo-01, usuarios, memberships, supabase, implementacao]
---

# Plano de Implantação — SDD-USR-001

## 1. Objetivo

Implantar perfis funcionais, vínculos organizacionais e resolução segura do contexto do usuário autenticado, preservando a separação entre:

```text
autenticação
→ perfil funcional
→ membership organizacional
→ organização
→ papéis e permissões futuras
```

O primeiro resultado operacional será permitir que o usuário autorizado deixe o estado de acesso pendente e acesse somente o contexto básico da organização à qual foi vinculado.

## 2. Regra de execução

O Codex conduzirá domínio, migration, RLS, integração, bootstrap e verificações técnicas.

O Lovable poderá ser acionado somente para a interface mínima, depois que contratos, estados e arquivos permitidos estiverem definidos. Não poderá alterar banco, autenticação, RLS, vínculos ou dados reais.

Superpowers não será utilizado no planejamento nem na implementação comum. Permanecerá reservado à etapa formal de testes e validação do Grupo 07.

## 3. Branches e entregas

```text
Documentação: docs/usr-001-especificacao
Implementação: feat/usr-001-usuarios-vinculos
Base: main após merge da documentação
Entrega documental: PR #20
Entrega técnica: novo Pull Request
Merge: somente após validação humana
```

O PR técnico não deverá misturar correções independentes ou trabalhos da [[SDD-ACL-001]].

## 4. Sequência geral

```text
Aprovar documentação
→ inspecionar estado real
→ definir migration
→ implementar domínio e repositório
→ integrar contexto às rotas
→ implementar interface mínima
→ validar localmente
→ aplicar migration autorizada
→ executar bootstrap controlado
→ verificar isolamento e acesso
→ validar visualmente
→ abrir PR técnico
→ aprovar e integrar
```

## 5. Etapa 1 — Publicação documental

1. aprovar a SDD-USR-001;
2. aprovar este plano;
3. atualizar ambos para `status: aprovado` e `version: 1.0`;
4. preservar as versões `0.1` no histórico;
5. integrar o PR documental à `main`;
6. confirmar sincronização com o Lovable.

Nenhum código ou banco será alterado antes dessa integração.

## 6. Etapa 2 — Inspeção técnica inicial

Na abertura da branch técnica, verificar:

- branch e estado do Git;
- alterações locais não relacionadas;
- commit atual da `main`;
- migration de `organizations`;
- estrutura real do projeto Supabase oficial `umuassmgminmliuypoyp`;
- usuário de validação existente;
- implementação atual de autenticação e proteção de rotas;
- contratos preparados pela ENV-001 e AUT-001;
- tabelas, grants, RLS e políticas existentes;
- dependências e arquivos gerados.

Registrar qualquer divergência antes de escrever código.

## 7. Etapa 3 — Decisão técnica

Confirmar antes da migration:

- tipo físico de `auth_subject` e referência a `auth.users.id`;
- estratégia de unicidade do membership ativo;
- estados e regras de vigência;
- consulta utilizada para resolver o contexto;
- forma de impedir autoassociação;
- grants mínimos da Data API;
- necessidade de ADR-USR-001;
- estratégia de reversão sem perda de dados.

A decisão não poderá transformar membership em papel ou permissão.

## 8. Etapa 4 — Migration local

Criar a migration com o mecanismo oficial do projeto e nome descritivo.

A migration deverá incluir:

- `public.user_profiles`;
- `public.organization_memberships`;
- PKs e FKs explícitas;
- unicidade de `auth_subject`;
- constraints de estado, vigência e consistência;
- índice para identidade autenticada;
- índices para perfil, organização e status;
- impedimento de membership ativo duplicado;
- RLS nas novas tabelas;
- grants mínimos;
- políticas de leitura do próprio perfil e memberships;
- política organizacional baseada em vínculo próprio ativo;
- ausência de INSERT, UPDATE ou DELETE pelo usuário comum.

Não inserir dados reais na migration estrutural.

## 9. Etapa 5 — Revisão da migration

Antes de aplicá-la remotamente, revisar:

- SQL e escopo;
- comportamento das FKs;
- impossibilidade de exclusão destrutiva da identidade vinculada;
- recursão ou dependência circular em políticas RLS;
- exposição pela Data API;
- ausência de política `using (true)`;
- ausência de `SECURITY DEFINER` desnecessário;
- reversibilidade;
- compatibilidade com a migration de `organizations`.

A migration será mantida apenas no repositório até autorização específica para aplicação no Supabase oficial.

## 10. Etapa 6 — Domínio

Implementar tipos e validações para:

- `UserProfileStatus`;
- `OrganizationMembershipStatus`;
- `UserProfile`;
- `OrganizationMembership`;
- `OrganizationContext`;
- respostas de ausência, pendência, bloqueio e inconsistência;
- datas e vigência;
- validação dos identificadores e nomes de exibição.

O domínio não importará React, Supabase ou componentes visuais.

## 11. Etapa 7 — Contratos e adaptador

Criar contrato independente do provedor para:

- localizar perfil pela identidade autenticada;
- consultar memberships próprios;
- resolver contexto ativo;
- obter organização autorizada;
- distinguir estados seguros de acesso.

O adaptador Supabase deverá:

- usar a sessão do usuário;
- depender das políticas RLS;
- traduzir erros técnicos;
- não utilizar chave privilegiada no navegador;
- não aceitar `organization_id` do cliente como prova de autorização;
- não expor dados de perfis ou organizações não vinculados.

## 12. Etapa 8 — Integração com autenticação

Atualizar o fluxo existente para:

```text
sessão válida
→ resolver perfil
→ resolver membership
→ verificar organização
→ criar contexto básico
→ liberar rota compatível
```

Tratamentos obrigatórios:

- sem perfil;
- perfil inativo;
- sem membership;
- membership pendente;
- membership inativo ou revogado;
- vínculo fora da vigência;
- organização inativa;
- mais de um membership ativo;
- falha temporária de consulta;
- sessão expirada.

## 13. Etapa 9 — Proteção de rotas

As rotas internas deverão exigir sessão e contexto organizacional válido.

Até a implantação da [[SDD-ACL-001]]:

- o sistema poderá apresentar apenas a base navegável já aprovada e informações mínimas da própria organização;
- ações administrativas e dados sensíveis permanecerão bloqueados;
- nenhuma permissão será inferida do e-mail, metadata ou simples membership;
- inconsistências resultarão em bloqueio seguro, não em escolha automática.

## 14. Etapa 10 — Interface mínima

Implementar somente o necessário para:

- preservar a tela de acesso pendente;
- diferenciar pendência, inatividade e erro temporário;
- apresentar o nome do usuário e da organização quando autorizados;
- mostrar situação do vínculo na área de Configurações;
- permitir logout;
- manter responsividade, contraste e padrão visual noturno.

Não criar ainda gestão completa de usuários, convites ou permissões.

## 15. Etapa 11 — Verificações locais

Executar antes de qualquer alteração remota:

- revisão de tipos e validações;
- lint dos arquivos alterados;
- compilação completa;
- revisão do diff;
- busca por segredos;
- revisão da migration;
- casos de perfil e membership válidos e inválidos;
- estados de rota e contexto;
- ausência de alterações fora do escopo.

`src/routeTree.gen.ts` somente será incluído se sua alteração for necessária, estável e decorrente de rota autorizada.

## 16. Etapa 12 — Autorização para aplicação remota

Antes de aplicar a migration no Supabase oficial, apresentar:

- nome e conteúdo resumido da migration;
- tabelas e políticas que serão criadas;
- resultado das verificações locais;
- plano de reversão;
- confirmação do projeto `umuassmgminmliuypoyp`;
- confirmação de que nenhum dado será inserido nessa operação.

A aplicação dependerá de autorização humana específica.

## 17. Etapa 13 — Aplicação e validação estrutural

Após autorização:

1. aplicar a migration pelo mecanismo oficial;
2. confirmar tabelas, colunas, constraints e índices;
3. confirmar RLS e grants;
4. executar advisors de segurança e desempenho;
5. verificar que usuário autenticado sem perfil permanece bloqueado;
6. registrar resultado e eventual pendência.

Nenhum bootstrap será executado automaticamente junto com a migration.

## 18. Etapa 14 — Dados necessários ao bootstrap

Antes de inserir registros reais, obter aprovação para:

### Organização inicial

- razão social;
- nome de exibição;
- CNPJ, se utilizado;
- situação inicial;
- localidade e fuso horário.

### Primeiro usuário

- e-mail já existente no Supabase Auth;
- nome de exibição;
- identidade `auth.users.id` confirmada diretamente;
- data inicial do vínculo.

Não registrar senha, token ou chave em documento, prompt, commit ou relatório.

## 19. Etapa 15 — Bootstrap controlado

O bootstrap será executado em operação separada, transacional e idempotente.

Sequência:

1. localizar o usuário de autenticação autorizado;
2. localizar ou criar a organização, sem duplicidade;
3. localizar ou criar o perfil pelo `auth_subject`;
4. localizar ou criar o membership;
5. ativar somente o vínculo autorizado;
6. consultar a cadeia completa;
7. confirmar ausência de registros duplicados;
8. registrar responsável, data e resultado.

Se qualquer etapa falhar, a operação deverá ser revertida integralmente.

## 20. Etapa 16 — Verificação funcional

Após o bootstrap:

1. encerrar a sessão existente;
2. realizar novo login;
3. confirmar resolução do perfil;
4. confirmar resolução do membership;
5. confirmar organização ativa;
6. verificar saída de `/acesso-pendente`;
7. confirmar o contexto básico na interface;
8. tentar acessar organização não vinculada;
9. verificar logout e limpeza do contexto.

## 21. Etapa 17 — Verificação de segurança

Confirmar:

- usuário não consulta perfil alheio;
- usuário não consulta membership alheio;
- usuário não consulta organização não vinculada;
- usuário não cria nem ativa o próprio membership;
- membership inativo não libera acesso;
- organização inativa não libera acesso;
- `user_metadata` não participa da autorização;
- nenhuma chave privilegiada está no frontend;
- RLS permanece habilitada;
- logs não contêm senha ou token.

## 22. Etapa 18 — Validação visual

Validar no Lovable ou publicação controlada:

- acesso pendente;
- acesso ativo;
- bloqueio por inatividade;
- erro temporário;
- identificação do usuário e da organização;
- logout;
- desktop e tela menor;
- contraste e mensagens em português.

O Lovable não receberá autorização para alterar banco ou regras durante essa validação.

## 23. Arquivos autorizados

```text
src/domain/user.ts
src/domain/organizationMembership.ts
src/domain/auth.ts (somente se necessário)
src/data/userContextRepository.ts
src/data/supabase/supabaseUserContextRepository.ts
src/features/users/
src/features/auth/AccessPending.tsx
src/lib/auth/
src/routes/__root.tsx
src/routes/configuracoes.tsx
src/components/layout/AppHeader.tsx
src/routeTree.gen.ts (somente se decorrente de rota autorizada)
supabase/migrations/<gerado-pela-cli>_user_profiles_and_memberships.sql
docs/decisions/ADR-USR-001.md (se necessário)
```

Alterações adicionais exigirão justificativa e autorização.

## 24. Arquivos e áreas protegidas

Sem nova autorização, não alterar:

- Constituição;
- documentos estruturantes aprovados;
- `AGENTS.md`;
- `.lovable/plan.md`;
- migrations anteriores;
- configuração de e-mail e provedores do Supabase;
- credenciais e variáveis aprovadas;
- módulos de clientes, trabalhos e auditoria;
- estrutura da futura [[SDD-ACL-001]];
- dependências e lockfile, salvo necessidade técnica previamente apresentada.

## 25. Interrupções obrigatórias

Interromper se houver necessidade de:

- alterar projeto Supabase diferente do confirmado;
- usar chave privilegiada no frontend;
- habilitar cadastro público;
- criar papel ou permissão antes da ACL-001;
- liberar `authenticated` sem filtro por identidade e membership;
- utilizar `user_metadata` para autorização;
- inserir organização ou usuário não aprovados;
- modificar migration anterior;
- excluir perfil, membership ou organização;
- acessar dados de outra organização;
- ampliar o escopo visual ou funcional;
- executar bootstrap sem os dados confirmados;
- aplicar alteração remota antes da validação local.

## 26. Pull Request técnico

O PR técnico deverá informar:

- SDD e plano aplicáveis;
- migration criada;
- arquivos alterados;
- políticas RLS;
- verificações locais;
- alterações remotas autorizadas;
- bootstrap realizado, sem expor dados sensíveis;
- resultado funcional e de isolamento;
- limitações e pendências;
- plano de reversão.

O merge dependerá de compilação, RLS, isolamento, validação funcional, validação visual e aprovação humana.

## 27. Critério de conclusão

A implantação estará concluída quando:

- documentação estiver na `main`;
- estrutura estiver versionada e aplicada;
- perfil e membership resolverem o contexto com segurança;
- usuário sem vínculo continuar bloqueado;
- primeiro vínculo autorizado funcionar sem duplicidade;
- nenhuma organização não vinculada estiver acessível;
- interface mínima estiver validada;
- PR técnico estiver aprovado e integrado;
- a [[SDD-ACL-001]] puder ser iniciada.

## 28. Próximo passo após este plano

Após aprovação e merge do PR documental:

1. atualizar a `main`;
2. criar `feat/usr-001-usuarios-vinculos`;
3. executar somente as etapas 2 a 11 localmente;
4. apresentar migration, diff e verificações;
5. solicitar autorização antes de alterar o Supabase oficial.

## 29. Histórico

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-03 | Criação da minuta do plano de implantação | Substituída |
| 1.0 | 2026-08-03 | Plano aprovado para implantação | Aprovada |
