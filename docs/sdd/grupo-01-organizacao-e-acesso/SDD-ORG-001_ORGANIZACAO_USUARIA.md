---
id: SIGA-SDD-ORG-001
title: SDD-ORG-001 — Organização Usuária
aliases:
  - Organização Usuária
  - Organização de Auditoria
  - SDD-ORG-001
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
depends_on:
  - SIGA-SDD-ENV-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-AUT-001]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, sdd, grupo-01, organizacao, multiempresa]
---

# SDD-ORG-001 — Organização Usuária

## 1. Finalidade

Criar a entidade raiz da estrutura multiempresa do SIGA. A [[Organização Usuária]] representa a firma ou organização de auditoria que utiliza o sistema e não deverá ser confundida com o [[Cliente]] auditado.

Esta SDD prepara domínio, persistência e apresentação estrutural. O acesso permanecerá bloqueado até a implantação da [[SDD-AUT-001]].

## 2. Escopo

- definir a entidade Organização Usuária;
- criar a tabela `organizations`;
- habilitar RLS com bloqueio padrão;
- definir contratos e validações de domínio;
- preparar uma apresentação somente leitura em Configurações;
- estabelecer `organization_id` como vínculo obrigatório das futuras entidades pertencentes a uma organização.

## 3. Fora do escopo

- autenticação;
- usuários, perfis, convites e permissões;
- associação entre usuários e organizações;
- cadastro público ou autoatendimento;
- CRUD funcional pela interface;
- políticas de acesso definitivas;
- credenciais reais ou conexão privilegiada no frontend;
- exclusão física de organizações.

## 4. Entidade

### 4.1 Campos

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente |
| `legal_name` | texto | Sim | Razão social, não vazia |
| `display_name` | texto | Sim | Nome de exibição, não vazio |
| `tax_id` | texto | Não | CNPJ normalizado com 14 dígitos e único quando informado |
| `status` | enum | Sim | `active` ou `inactive` |
| `locale` | texto | Sim | Padrão `pt-BR` |
| `timezone` | texto | Sim | Padrão `America/Sao_Paulo` |
| `created_at` | data/hora | Sim | Criação do registro |
| `updated_at` | data/hora | Sim | Última alteração |
| `inactivated_at` | data/hora | Não | Obrigatório quando inativa |

### 4.2 Regras de consistência

- `legal_name` e `display_name` não poderão conter somente espaços.
- O CNPJ será armazenado somente com dígitos.
- Quando presente, o CNPJ deverá possuir 14 dígitos e ser único.
- Organização ativa deverá possuir `inactivated_at` nulo.
- Organização inativa deverá possuir `inactivated_at` preenchido.
- Inativação preservará o registro e seu histórico.
- Reativação futura exigirá autorização e registro histórico.

## 5. Raiz multiempresa

`organizations` será a raiz de isolamento do SIGA e, por isso, não possuirá `organization_id`.

As futuras entidades pertencentes a uma organização deverão conter `organization_id`, inclusive clientes, trabalhos, usuários associados, evidências e papéis de trabalho, conforme seu documento específico.

## 6. Segurança e RLS

- A tabela será criada no schema `public` com RLS habilitado.
- Não serão criadas políticas permissivas para `anon` ou `authenticated` nesta SDD.
- Os privilégios de acesso pela API para `anon` e `authenticated` serão explicitamente revogados.
- Não haverá política provisória baseada apenas em papel genérico.
- Não haverá uso de `service_role` no frontend.
- A liberação ocorrerá somente após autenticação, associação usuário-organização e autorização contextual.

## 7. Criação inicial

Nenhuma organização real será incluída no repositório como dado inicial.

A criação da primeira organização ocorrerá futuramente por processo administrativo controlado, sem formulário público.

## 8. Domínio e validação

O domínio deverá fornecer:

- `OrganizationStatus`;
- `Organization`;
- entrada para criação e atualização;
- normalização do CNPJ;
- validação Zod;
- filtros de consulta;
- contrato especializado de repositório.

A validação matemática do CNPJ poderá ser implementada nesta SDD. Caso seja adiada, a limitação deverá ser registrada antes do merge.

## 9. Persistência

A migration deverá:

- criar `public.organizations`;
- criar constraints de conteúdo e coerência de estado;
- criar índice único parcial para CNPJ informado;
- criar índice de status;
- habilitar RLS;
- revogar privilégios de `anon` e `authenticated`;
- não criar políticas permissivas;
- não inserir dados reais.

## 10. Contrato de repositório

O contrato especializado deverá prever, para implementação posterior autorizada:

- localizar por ID;
- localizar por CNPJ;
- listar com filtros;
- criar;
- atualizar;
- inativar;
- reativar.

Não deverá importar React ou componentes visuais.

## 11. Interface

A rota de Configurações poderá apresentar um painel estrutural de Organização Usuária com:

- finalidade;
- campos previstos;
- situação da integração;
- aviso `Aguardando autenticação`.

Não haverá formulário funcional, gravação, consulta real, botão de exclusão ou organização fictícia apresentada como dado real.

## 12. Responsabilidades das ferramentas

### 12.1 Codex

Implementará domínio, migration, contratos, integração estrutural da interface e validações técnicas.

### 12.2 Lovable

Poderá apoiar exclusivamente ajustes visuais após aprovação do plano, sem alterar migration, RLS, dependências, arquivos de lock ou regras de negócio.

### 12.3 Superpowers

Não será utilizado nesta SDD. Seu uso permanece reservado à auditoria formal do Grupo 07.

## 13. Arquivos previstos

```text
src/domain/organization.ts
src/data/organizationRepository.ts
src/features/organization/OrganizationSummary.tsx
src/routes/configuracoes.tsx
supabase/migrations/<gerado-pela-cli>_organizations.sql
docs/decisions/ADR-ORG-001.md
```

Adaptadores adicionais somente serão criados se necessários e compatíveis com os limites desta SDD.

## 14. Critérios de aceite

- `CA-ORG-001`: entidade e estados definidos no domínio.
- `CA-ORG-002`: nomes obrigatórios rejeitam valores vazios.
- `CA-ORG-003`: CNPJ é normalizado e validado.
- `CA-ORG-004`: tabela `public.organizations` é criada por migration versionada.
- `CA-ORG-005`: CNPJ informado possui unicidade.
- `CA-ORG-006`: estados e data de inativação permanecem coerentes.
- `CA-ORG-007`: não existe exclusão física no contrato especializado.
- `CA-ORG-008`: RLS está habilitado.
- `CA-ORG-009`: não existem políticas permissivas para `anon` ou `authenticated`.
- `CA-ORG-010`: privilégios de API desses papéis estão revogados.
- `CA-ORG-011`: não existe credencial privilegiada no frontend.
- `CA-ORG-012`: não existe formulário público funcional.
- `CA-ORG-013`: interface apresenta estado de autenticação pendente.
- `CA-ORG-014`: não existem dados reais ou organização fictícia gravada.
- `CA-ORG-015`: compilação local é concluída.
- `CA-ORG-016`: o diff permanece dentro do escopo aprovado.

## 15. Definição de pronto

A SDD estará concluída quando:

- especificação e plano estiverem aprovados e versionados;
- domínio, migration e contrato estiverem implementados;
- RLS e bloqueio padrão estiverem demonstrados;
- a interface estrutural estiver disponível sem gravação;
- a compilação e as verificações técnicas tiverem sido executadas;
- o responsável pelo projeto tiver validado a entrega;
- a alteração estiver integrada à `main`;
- a [[SDD-AUT-001]] estiver autorizada como etapa seguinte.

## 16. Histórico

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-31 | Criação e revisão da minuta | Substituída |
| 1.0 | 2026-07-31 | Primeira versão aprovada | Aprovada |
