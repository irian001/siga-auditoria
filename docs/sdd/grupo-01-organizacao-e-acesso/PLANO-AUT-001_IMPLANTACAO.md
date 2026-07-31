---
id: SIGA-PLN-AUT-001
title: Plano de Implantação da SDD-AUT-001
aliases: [Plano AUT-001, Implantação da Autenticação]
type: implementation-plan
domain: organizacao-e-acesso
status: aprovado
version: 1.0
created: 2026-07-31
updated: 2026-07-31
owner: responsavel-projeto
depends_on: [SIGA-SDD-ORG-001]
related:
  - "[[SDD-AUT-001]]"
  - "[[SDD-ORG-001]]"
  - "[[SDD-USR-001]]"
  - "[[Arquitetura Tecnológica do SIGA]]"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]]"
tags: [siga, grupo-01, autenticacao, supabase, implementacao]
---

# Plano de Implantação — SDD-AUT-001

## 1. Objetivo e execução

Implantar autenticação por e-mail e senha com Supabase Auth, protegendo rotas sem liberar dados organizacionais antes de vínculos e permissões.

O Codex conduzirá a implementação em branch própria. Lovable poderá atuar somente na apresentação visual após delimitação. Superpowers permanecerá reservado ao Grupo 07.

## 2. Branches

```text
Documentação: docs/aut-001-especificacao
Implementação: feat/aut-001-autenticacao
Base: main atualizada
Entrega: PRs separados
Merge: somente após validação humana
```

## 3. Estratégia

```text
Preparação local
→ revisão e compilação
→ confirmação específica do projeto remoto
→ configuração autorizada
→ teste controlado
→ validação e merge
```

Nenhuma alteração remota será feita durante a preparação local.

## 4. Etapa documental

Publicar a SDD e este plano como `status: aprovado`, `version: 1.0`, preservando a minuta no histórico. O código só começará após integração documental.

## 5. Inspeção técnica

Verificar Git, dependências, TanStack Start, renderização no servidor, variáveis da ENV-001, rotas, cliente Supabase existente, configuração local e arquivos gerados.

Confirmar e registrar em `ADR-AUT-001`:

- pacote oficial necessário;
- clientes de navegador e servidor;
- validação da identidade no servidor;
- cookies e renovação;
- necessidade de callback;
- proteção das rotas;
- carregamento da sessão.

## 6. Dependências

Avaliar `@supabase/supabase-js` e `@supabase/ssr`, instalando somente o necessário com o gerenciador do repositório e atualizando `bun.lock` sem substituí-lo.

Interromper se a instalação alterar amplamente as dependências ou configurações.

## 7. Domínio e adaptadores

Criar tipos e validações em `src/domain/auth.ts`, contrato em `src/data/authRepository.ts` e adaptador oficial em `src/data/supabase/`.

O domínio não importará React ou Supabase. O adaptador encapsulará sessão, identidade, login, logout, recuperação, atualização de senha e tradução de erros.

## 8. Estado de autenticação

Criar provider e hook para distinguir verificando, não autenticado, autenticando, autenticado, sem vínculo, sessão expirada, erro e logout.

Senha não será armazenada; tokens não serão expostos; permissões não serão inventadas.

## 9. Rotas e telas

Criar login, recuperação, redefinição e callback somente se necessário. Proteger todas as rotas operacionais na arquitetura, não apenas visualmente.

Sem sessão haverá redirecionamento ao login. Com sessão e sem vínculo, o destino será `Acesso aguardando liberação`.

As telas seguirão o sistema visual aprovado e não conterão cadastro público, login social, dados de demonstração ou escolha livre de organização.

## 10. Logout

Encerrar a sessão, limpar o estado de autenticação e o contexto organizacional em memória, redirecionar ao login e impedir reapresentação de dados privados.

## 11. Configuração remota controlada

Somente após autorização específica:

1. identificar formalmente o projeto Supabase oficial;
2. registrar referência e ambiente;
3. conferir as configurações existentes;
4. listar as mudanças propostas;
5. obter autorização;
6. configurar e-mail/senha, cadastro bloqueado, URLs, modelos, sessão e política de senha.

Não alterar simultaneamente banco, RLS, Storage ou dados reais.

## 12. Usuário de validação

Após autorização, criar ou convidar um único usuário por processo administrativo. Nenhuma senha será registrada no código ou na conversa. Sem membership, o resultado esperado será acesso pendente.

## 13. Verificações

### Locais

- tipos, Zod, compilação e lint dos arquivos alterados;
- ausência de segredos;
- escopo do diff;
- estados visuais e acessibilidade básica.

### Funcionais

- login válido/inválido;
- campos vazios e e-mail malformado;
- sessão existente, ausente e expirada;
- logout, recuperação e redefinição;
- link inválido;
- acesso direto a rota privada;
- usuário sem vínculo.

### Segurança

- cadastro público bloqueado;
- ausência de `service_role`, senhas e tokens em logs;
- ausência de autorização em `user_metadata`;
- `organizations` ainda bloqueada;
- nenhum acesso baseado apenas em `authenticated`;
- redirecionamentos limitados.

## 14. Validação visual

Verificar login, recuperação, acesso pendente e logout em desktop e tela menor, com contraste, mensagens, processamento e estilo noturno. Lovable somente será consumido se houver necessidade real de ajuste.

## 15. Arquivos autorizados

```text
package.json
bun.lock
src/domain/auth.ts
src/data/authRepository.ts
src/data/supabase/
src/features/auth/
src/routes/login.tsx
src/routes/recuperar-senha.tsx
src/routes/redefinir-senha.tsx
src/routes/auth/callback.tsx
src/routes/__root.tsx
src/components/layout/AppHeader.tsx
src/lib/auth/
docs/decisions/ADR-AUT-001.md
```

Somente arquivos necessários serão alterados.

## 16. Arquivos protegidos

Sem nova autorização, não alterar migrations da ORG-001, Constituição, estruturantes, `AGENTS.md`, `.lovable/plan.md`, módulos de auditoria ou políticas de outros módulos.

## 17. Interrupções obrigatórias

Interromper se for necessário habilitar cadastro público, usar chave privilegiada, antecipar perfil/membership, liberar tabela apenas para `authenticated`, alterar banco fora do escopo, conectar projeto não confirmado, versionar credencial, substituir lockfile, alterar visual global, criar política ampla, implementar MFA/login social ou acessar dados reais.

## 18. Pull Request e merge

O PR registrará objetivo, SDD, arquivos, dependências, ADR, configurações autorizadas, verificações, limitações e ausência de segredos.

O merge dependerá de compilação, login, logout, recuperação, rotas protegidas, bloqueio sem vínculo, validação visual e aprovação humana.

## 19. Próxima etapa

Após a AUT-001 será iniciada a [[SDD-USR-001]], responsável por perfis, vínculos organizacionais, convites, ativação e liberação de acesso.

## 20. Histórico

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-31 | Criação e revisão da minuta | Substituída |
| 1.0 | 2026-07-31 | Plano aprovado para implantação | Aprovada |
