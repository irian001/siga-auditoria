---
id: SIGA-SDD-ENV-001
title: SDD-ENV-001 — Ambientes, Contratos e Integrações Iniciais
aliases:
  - Ambientes, Contratos e Integrações Iniciais
  - Ambiente Técnico do SIGA
  - SDD-ENV-001
type: sdd
domain: arquitetura-tecnica
group: grupo-00-fundacao
status: aprovado
version: 1.0
created: 2026-07-31
updated: 2026-07-31
owner: responsavel-projeto
responsible:
  planning: work
  implementation: codex
  technical_review: codex
  approval: responsavel-projeto
depends_on:
  - SIGA-SDD-FND-001
  - SIGA-SDD-DSG-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Arquitetura Tecnológica do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Plano do Grupo 00]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, sdd, grupo-00, ambientes, contratos, integracoes]
---

# SDD-ENV-001 — Ambientes, Contratos e Integrações Iniciais

## 1. Finalidade

Preparar a base técnica para ambientes, dados e integrações futuras, mantendo a interface desacoplada de Supabase, banco de dados e regras de negócio.

Esta SDD não cria conexão real. Ela estabelece configuração sem segredos, contratos genéricos, adaptadores simulados e erros padronizados.

## 2. Contexto

A [[Fundação da Aplicação]] e o [[Sistema Visual e Componentes Básicos]] estão concluídos. O projeto possui TanStack Start, React, TypeScript, Zod e TanStack Query, mas ainda não possui autenticação, schema, migrations, RLS ou integração funcional com Supabase.

## 3. Objetivos

- identificar e validar o ambiente de execução;
- manter segredos fora do GitHub;
- centralizar a leitura de variáveis públicas;
- definir contratos mínimos de resultado, paginação, filtros e contexto;
- criar adaptador simulado substituível;
- padronizar erros e logs seguros;
- preparar, sem implementar, o futuro adaptador Supabase.

## 4. Limites obrigatórios

- Nenhuma tabela, migration, RLS ou arquivo em `supabase/` será criado.
- Nenhuma credencial real será usada ou versionada.
- Nenhum `service role` será exposto ao frontend.
- Nenhum componente acessará Supabase diretamente.
- Não haverá autenticação, permissões, CRUD funcional ou dados reais.
- Não haverá alteração de dependências, arquivos de lock, build, `AGENTS.md`, `.lovable/plan.md` ou rotas funcionais.

## 5. Ambientes

| Ambiente | Valor | Finalidade |
|---|---|---|
| Desenvolvimento | `development` | Execução local e validação técnica |
| Homologação | `staging` | Validação controlada antes da produção |
| Produção | `production` | Uso oficial futuro |

### 5.1 Variáveis públicas previstas

```text
VITE_SIGA_ENV
VITE_SIGA_APP_NAME
VITE_SIGA_API_URL
VITE_SIGA_SUPABASE_URL
VITE_SIGA_SUPABASE_ANON_KEY
```

As variáveis de Supabase são somente pontos futuros de configuração. Não serão utilizadas para conexão nesta SDD.

### 5.2 Exemplo seguro

```dotenv
VITE_SIGA_ENV=development
VITE_SIGA_APP_NAME=SIGA
VITE_SIGA_API_URL=
VITE_SIGA_SUPABASE_URL=
VITE_SIGA_SUPABASE_ANON_KEY=
```

Arquivos `.env` locais deverão permanecer ignorados pelo Git.

## 6. Configuração tipada

`src/config/env.ts` será a única porta de leitura de `import.meta.env`.

```ts
type SigaEnvironment = "development" | "staging" | "production";

type AppEnvironment = {
  environment: SigaEnvironment;
  appName: string;
  apiUrl?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
};
```

Valores inválidos deverão ser rejeitados explicitamente. Componentes de interface não poderão ler variáveis de ambiente diretamente.

## 7. Contratos genéricos

`src/domain/contracts.ts` deverá conter contratos mínimos, sem antecipar entidades finais.

```ts
type EntityId = string;

type EntityMetadata = {
  id: EntityId;
  createdAt: string;
  updatedAt: string;
};

type RequestContext = {
  organizationId?: string;
  userId?: string;
  environment: SigaEnvironment;
};

type PageRequest = { page?: number; pageSize?: number };
type PageResult<T> = { items: T[]; page: number; pageSize: number; total: number };
type ListFilters = Record<string, string | number | boolean | undefined>;
```

## 8. Resultados e erros

```ts
type OperationSuccess<T> = { ok: true; data: T };
type OperationFailure = { ok: false; error: AppError };
type OperationResult<T> = OperationSuccess<T> | OperationFailure;
```

`src/lib/app-error.ts` deverá definir códigos: `CONFIGURATION_ERROR`, `NETWORK_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `VALIDATION_ERROR`, `CONFLICT` e `UNEXPECTED_ERROR`.

Mensagens técnicas não poderão expor tokens, chaves, documentos ou dados pessoais. A interface usará os padrões visuais já aprovados para estados de erro.

## 9. Contrato de repositório

`src/data/repository.ts` deverá definir interface genérica para `list`, `getById`, `create`, `update` e, quando aplicável, `archive`.

O contrato deverá receber `RequestContext`, retornar `OperationResult` e não importar Supabase, React ou componentes visuais.

## 10. Adaptador simulado

`src/data/mockRepository.ts` deverá operar somente em memória, respeitando paginação e erros padronizados.

O adaptador:

- não persiste dados;
- não usa dados reais;
- não simula regras de auditoria;
- poderá introduzir atraso controlado apenas para estados assíncronos futuros;
- será substituído por adaptador Supabase nas SDDs de banco e segurança.

## 11. Integração futura

A futura integração poderá usar estrutura independente:

```text
src/data/supabase/
├── supabaseClient.ts
├── supabaseRepository.ts
└── mappers/
```

Essa estrutura não será criada agora. Uma SDD posterior deverá definir schema, migrations, RLS, isolamento multiempresa, credenciais protegidas e testes de segurança antes de conectar Supabase.

## 12. Arquivos autorizados

| Arquivo | Ação |
|---|---|
| `.env.example` | Criar |
| `.gitignore` | Alterar somente se necessário |
| `src/config/env.ts` | Criar |
| `src/domain/contracts.ts` | Criar |
| `src/data/repository.ts` | Criar |
| `src/data/mockRepository.ts` | Criar |
| `src/lib/app-error.ts` | Criar |
| `docs/decisions/ADR-ENV-001.md` | Criar somente se necessário |

## 13. Critérios de aceite

| ID | Critério |
|---|---|
| CA-ENV-001 | Existe `.env.example` sem segredos |
| CA-ENV-002 | Configuração central validada por Zod |
| CA-ENV-003 | Ambientes inválidos são tratados explicitamente |
| CA-ENV-004 | Interface não lê `import.meta.env` diretamente |
| CA-ENV-005 | Existem contratos para contexto, resultado, paginação e filtros |
| CA-ENV-006 | Existe contrato de repositório desacoplado de Supabase |
| CA-ENV-007 | Existe adaptador simulado não persistente |
| CA-ENV-008 | Erros são padronizados e seguros |
| CA-ENV-009 | Não há schema, migration, RLS, conexão ou segredo |
| CA-ENV-010 | Compilação local aprovada |
| CA-ENV-011 | Diff limitado aos arquivos autorizados |

## 14. Verificações proporcionais

1. conferir `.env.example`;
2. validar os três ambientes e valor inválido;
3. validar resultados de sucesso e falha;
4. validar paginação simulada;
5. executar compilação local;
6. conferir diff, segredos e arquivos fora do escopo.

Superpowers não será usado nesta SDD. Testes formais integrados pertencem ao Grupo 07.

## 15. Definition of Done

A ENV-001 será concluída quando os contratos, configuração e adaptador simulado estiverem implementados, a compilação e revisão de escopo aprovadas, nenhuma integração real existir e o resultado estiver integrado ao GitHub.

## 16. Pendências encaminhadas

Conexão Supabase, autenticação, usuários, organizações, RLS, migrations, dados reais, arquivos, CI/CD e testes formais seguem para SDDs posteriores.

## 17. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-31 | Criação da minuta | Substituída |
| 1.0 | 2026-07-31 | Primeira versão aprovada | Aprovada |
