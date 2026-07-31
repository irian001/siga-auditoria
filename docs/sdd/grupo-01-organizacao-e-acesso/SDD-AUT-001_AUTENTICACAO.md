---
id: SIGA-SDD-AUT-001
title: SDD-AUT-001 — Autenticação
aliases: [Autenticação do SIGA, Login do SIGA, SDD-AUT-001]
type: sdd
domain: organizacao-e-acesso
group: grupo-01-organizacao-e-acesso
status: aprovado
version: 1.0
created: 2026-07-31
updated: 2026-07-31
owner: responsavel-projeto
responsible:
  planning: work
  implementation: codex
  visual_support: lovable
  approval: responsavel-projeto
depends_on: [SIGA-SDD-ORG-001]
related:
  - "[[Constituição do SIGA]]"
  - "[[Organização Usuária]]"
  - "[[Usuário]]"
  - "[[Autenticação]]"
  - "[[Autorização]]"
  - "[[Isolamento Multiempresa]]"
  - "[[SDD-ORG-001]]"
  - "[[SDD-USR-001]]"
  - "[[SDD-ACL-001]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, sdd, grupo-01, autenticacao, seguranca, supabase]
---

# SDD-AUT-001 — Autenticação

## 1. Finalidade

Implantar autenticação por credenciais individuais no SIGA. A autenticação confirma a identidade, mas não concede automaticamente acesso a organizações, clientes, trabalhos ou funcionalidades.

```text
Autenticação → vínculo organizacional → autorização
```

Um usuário autenticado sem vínculo organizacional ativo não terá acesso aos dados do SIGA.

## 2. Escopo

- login por e-mail e senha;
- logout e manutenção segura da sessão;
- recuperação e redefinição de senha;
- verificação do estado de autenticação;
- proteção das rotas internas;
- tratamento de sessão expirada;
- estado de usuário autenticado sem autorização;
- integração inicial com Supabase Auth;
- contratos independentes da interface e do provedor;
- mensagens seguras e compreensíveis.

## 3. Fora do escopo

- cadastro público ou criação livre de contas;
- perfis, memberships, convites, papéis e permissões;
- funções em trabalhos e responsabilidades por item;
- login social, telefone, link mágico ou MFA;
- acesso de clientes auditados;
- impersonação e painel administrativo de usuários;
- alteração remota do Supabase sem autorização específica.

Vínculos serão tratados na [[SDD-USR-001]] e permissões na [[SDD-ACL-001]].

## 4. Provedor e método

O Supabase Auth será o provedor inicial. O método do MVP será e-mail e senha, com identidade individual e sessão própria.

Nunca poderão ser utilizados no frontend `service_role`, chave secreta, senha de banco ou credencial administrativa.

## 5. Cadastro público

O cadastro público permanecerá desabilitado. A página de login não apresentará criação de conta. Contas futuras serão criadas por processo administrativo ou convite controlado.

Orientação prevista:

> O acesso ao SIGA é concedido pela organização responsável. Caso ainda não possua acesso, entre em contato com o administrador.

## 6. Separação entre identidade e autorização

```text
auth.users
Identidade e autenticação
        ↓
user_profiles
Identidade funcional no SIGA
        ↓
organization_memberships
Vínculos com organizações
        ↓
papéis e permissões
Autorizações
```

`auth.users` não receberá regras metodológicas, funções ou permissões. `user_metadata` não será usado para decisões de autorização.

## 7. Credenciais

O e-mail será obrigatório, válido, normalizado, único no provedor e verificado conforme configuração aprovada.

A senha seguirá a política efetiva do Supabase e nunca será armazenada pelo aplicativo, registrada em log, incluída em mensagem de erro ou enviada a serviço não autorizado.

## 8. Fluxo de login

```text
Verificar sessão
→ sem sessão: login
→ credenciais válidas: identidade confirmada
→ verificar vínculo organizacional
→ com vínculo: contexto autorizado
→ sem vínculo: acesso aguardando liberação
```

Até a [[SDD-USR-001]], um login válido terminará no estado seguro de acesso pendente.

## 9. Tela de login

Deverá conter identificação do SIGA, e-mail, senha, mostrar/ocultar senha, botão `Entrar`, link `Esqueci minha senha`, processamento, erro seguro e orientação sobre concessão de acesso.

Não deverá conter cadastro público, login social, escolha de organização, dados de demonstração ou credenciais de exemplo.

## 10. Mensagens seguras

Falhas não revelarão se determinada conta existe.

Login:

> Não foi possível entrar. Verifique as informações e tente novamente.

Recuperação:

> Se o endereço informado estiver associado a uma conta válida, você receberá as orientações para redefinir sua senha.

Mensagens técnicas do provedor não serão exibidas diretamente.

## 11. Recuperação e redefinição

O usuário informará o e-mail, receberá resposta neutra e, quando aplicável, link temporário para definir nova senha. O link terá validade limitada, retorno permitido e não concederá autorização organizacional.

A redefinição exigirá nova senha, confirmação, requisitos aplicáveis e link válido. Links inválidos ou expirados receberão tratamento próprio.

## 12. Sessão

A sessão será criada pelo provedor, renovada de forma compatível com a arquitetura, rejeitada quando inválida e encerrada no logout. Sessão não será tratada como prova de autorização.

Código executado no servidor não confiará apenas em dados enviados pelo navegador. A identidade será validada pelo mecanismo oficial aplicável.

## 13. Persistência da sessão

A solução deverá ser compatível com TanStack Start, renderização no servidor e rotas protegidas, evitando exposição desnecessária de tokens e permitindo renovação, encerramento e cookies seguros quando utilizados.

A decisão técnica será registrada em `ADR-AUT-001` antes da implementação.

## 14. Logout

O logout encerrará a sessão no provedor, removerá o estado local e o contexto organizacional em memória, redirecionará ao login e impedirá reapresentação de dados privados. Não excluirá nem inativará o usuário.

## 15. Rotas

Rotas públicas previstas:

```text
/login
/recuperar-senha
/redefinir-senha
/auth/callback (somente se necessário)
```

Todas as rotas operacionais existentes serão privadas. A proteção não poderá existir apenas nos componentes visuais.

## 16. Estados

O sistema distinguirá: verificando sessão, não autenticado, autenticando, autenticado, autenticado sem vínculo, sessão expirada, recuperação solicitada, redefinição permitida, link inválido, erro temporário e encerrando sessão.

## 17. Acesso pendente

Usuário autenticado sem vínculo verá:

> Sua identidade foi confirmada, mas o acesso a uma organização ainda não foi liberado.

Poderá apenas compreender a situação, procurar o administrador e encerrar a sessão. Não poderá escolher organização, criar vínculo, consultar organizações ou acessar dados.

## 18. Contas e organizações inativas

Uma sessão tecnicamente válida não autoriza acesso a organização inativa. Conta ou perfil sem condição de acesso será bloqueado com mensagem segura. As regras completas dependerão da [[SDD-USR-001]].

## 19. Contratos

O contrato independente do Supabase e da interface deverá prever:

```ts
type AuthRepository = {
  getCurrentSession(): Promise<AuthResult<AuthSession | null>>;
  getCurrentIdentity(): Promise<AuthResult<AuthIdentity | null>>;
  signIn(input: SignInInput): Promise<AuthResult<AuthSession>>;
  signOut(): Promise<AuthResult<void>>;
  requestPasswordReset(email: string): Promise<AuthResult<void>>;
  updatePassword(input: UpdatePasswordInput): Promise<AuthResult<void>>;
  onAuthStateChange(listener: AuthStateListener): AuthSubscription;
};
```

Tipos previstos: `AuthIdentity`, `AuthSession`, `AuthStatus`, `SignInInput`, `PasswordResetInput`, `UpdatePasswordInput`, `AuthResult` e `AuthError`.

## 20. Adaptador Supabase

O adaptador encapsulará o cliente, traduzirá erros, centralizará login/logout/recuperação e impedirá acesso direto do componente ao provedor. Utilizará somente chave pública adequada.

## 21. Configuração e redirecionamentos

Serão usadas as variáveis preparadas pela ENV-001. A escolha entre chave pública atual e chave legada será confirmada tecnicamente. Credenciais reais permanecerão fora do GitHub.

URLs de retorno serão explícitas para desenvolvimento, homologação e produção. Redirecionamentos genéricos não serão aceitos.

## 22. Segurança e RLS

- senha ou token não será registrado ou exibido;
- `service_role` não será usado no navegador;
- `user_metadata` não determinará autorização;
- rotas não dependerão apenas de ocultação visual;
- logs não conterão credenciais;
- `organizations` continuará bloqueada até existir vínculo verificável.

É proibida política ampla como:

```sql
to authenticated
using (true)
```

Políticas organizacionais dependerão da cadeia:

```text
auth.uid() → user_profiles → organization_memberships → organizations
```

## 23. Histórico futuro

A arquitetura permitirá registrar futuramente login, logout, recuperação, alteração de senha, revogação e bloqueio, sem armazenar senha, token ou informação sensível.

## 24. Interface

As telas seguirão o sistema visual noturno aprovado, com contraste, rótulos, mensagens contextuais, navegação por teclado, processamento visível e responsividade.

## 25. Responsabilidades das ferramentas

O Codex implementará arquitetura, contratos, integração, sessão, proteção de rotas, erros e verificações.

O Lovable poderá apoiar somente telas e ajustes visuais delimitados. Não poderá alterar sessão, ambiente, credenciais, RLS, cadastro público, dependências ou regras.

Superpowers não será usado nesta SDD; permanece reservado à auditoria formal do Grupo 07.

## 26. Dependências e arquivos previstos

Pacotes oficiais necessários serão previamente identificados, versionados e registrados no lockfile.

```text
src/domain/auth.ts
src/data/authRepository.ts
src/data/supabase/supabaseClient.ts
src/data/supabase/supabaseAuthRepository.ts
src/features/auth/
src/routes/login.tsx
src/routes/recuperar-senha.tsx
src/routes/redefinir-senha.tsx
src/routes/auth/callback.tsx (se necessário)
src/lib/auth/
docs/decisions/ADR-AUT-001.md
```

## 27. Critérios de aceite

- cadastro público desabilitado;
- login por e-mail e senha com mensagens neutras;
- credenciais inválidas não criam sessão;
- sessão válida avança apenas à verificação de autorização;
- usuário sem vínculo não acessa dados;
- logout encerra sessão;
- recuperação e redefinição tratam links válidos e inválidos;
- rotas internas exigem autenticação;
- nenhuma chave privilegiada no frontend;
- tokens e senhas ausentes dos logs;
- `user_metadata` não autoriza;
- `organizations` continua bloqueada;
- estados visuais e sessão expirada tratados;
- compilação e escopo aprovados;
- nenhuma configuração remota alterada sem autorização.

## 28. Verificações

Serão verificados login válido e inválido, entradas vazias, e-mail malformado, recuperação neutra, link inválido, senhas divergentes, sessão existente/ausente/expirada, logout, acesso direto a rota privada, usuário sem vínculo, ausência de segredo e ausência de liberação indevida da organização.

## 29. Definition of Done

A SDD estará concluída quando documentação, integração, login, logout, recuperação, proteção de rotas, bloqueio sem vínculo, segurança, compilação e validação visual estiverem aprovados, a alteração estiver na `main` e a [[SDD-USR-001]] puder ser iniciada.

## 30. Pendências adiadas

Ficam para etapas futuras: criação administrativa, convites, perfis, memberships, papéis, permissões, múltiplas organizações, troca de organização, MFA, login social, acesso do cliente e políticas finais de RLS.

## 31. Histórico

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-31 | Criação e revisão da minuta | Substituída |
| 1.0 | 2026-07-31 | Primeira versão aprovada | Aprovada |
