# Plano do Lovable — SDD-FND-001 (Fundação da Aplicação)

Modo planejamento. Nenhum arquivo foi alterado.

## 1. Entendimento do objetivo

Transformar o projeto inicial gerado pelo Lovable numa aplicação identificada como **SIGA — Sistema Integrado para Gerenciamento de Auditoria**, com layout institucional, navegação estrutural em pt-BR, dez rotas estruturais, página inicial orientativa, página-base de módulo futuro, estados básicos e comportamento responsivo — sem banco, autenticação, dados fictícios ou funcionalidade de módulo.

Verificações feitas antes deste plano: `src/routes/` contém apenas `__root.tsx`, `index.tsx` e `README.md`; `index.tsx` ainda é o placeholder do Lovable (`data-lovable-blank-page-placeholder`); `__root.tsx` usa `lang="en"` e metadados `Lovable App` / `Lovable Generated Project`, com 404 e ErrorComponent em inglês; `src/components/` contém apenas `ui/` (45 componentes, incluindo `sidebar`, `sheet`, `breadcrumb`, `card`, `button`, `badge`, `separator`, `skeleton`, `tooltip`, `scroll-area`); existe `src/hooks/use-mobile.tsx`; não existem `src/components/layout/`, `navigation/`, `states/` nem `src/config/`.

## 2. Composição do layout

```text
Cabeçalho (header)
├── Identidade compacta: sigla SIGA + nome por extenso
├── Botão de menu (abre navegação em telas menores, com aria-expanded)
└── Selo discreto "Ambiente em construção"

Corpo
├── Navegação principal (aside): grupos Trabalho / Execução / Finalização / Administração
└── Área de conteúdo (main)
    ├── Cabeçalho da página: título + descrição (+ breadcrumb quando útil)
    └── Conteúdo da rota (<Outlet />)
```

- Desktop: navegação lateral fixa e visível, conteúdo ao lado, largura de leitura controlada.
- Tablet/mobile: navegação em painel lateral (Sheet), fechando após a troca de rota.
- Detecção de tamanho de tela: reutilizar `src/hooks/use-mobile.tsx` (sem criar solução concorrente).

## 3. Rotas e componentes envolvidos

Rotas (exatamente as da SDD, seção 11): `/`, `/clientes`, `/trabalhos`, `/planejamento`, `/riscos-procedimentos`, `/documentos-evidencias`, `/papeis-trabalho`, `/revisao`, `/relatorios`, `/configuracoes`.

Componentes novos:
- `AppLayout`, `AppHeader`, `PageHeader` (layout)
- `MainNav`, `MobileNav` (navegação, consumindo a configuração central)
- `ModuloFuturoPage`, `EmptyState`, `LoadingState` (estados)
- `navigation.ts` (config: id, título, descrição curta, rota, ícone, grupo, situação)

## 4. Componentes existentes reutilizados

De `src/components/ui/`: `sheet` (navegação mobile), `button`, `card`, `badge` (situação "Planejado" e selo de ambiente), `separator`, `breadcrumb`, `skeleton` (carregamento), `scroll-area`, `tooltip`. Ícones via `lucide-react` (já no projeto). Nenhum componente equivalente será duplicado.

## 5. Arquivos que pretendo criar ou alterar

Criar:
- `src/config/navigation.ts`
- `src/components/layout/AppLayout.tsx`
- `src/components/layout/AppHeader.tsx`
- `src/components/layout/PageHeader.tsx`
- `src/components/navigation/MainNav.tsx`
- `src/components/navigation/MobileNav.tsx`
- `src/components/states/ModuloFuturoPage.tsx`
- `src/components/states/EmptyState.tsx`
- `src/components/states/LoadingState.tsx`
- `src/routes/clientes.tsx`, `trabalhos.tsx`, `planejamento.tsx`, `riscos-procedimentos.tsx`, `documentos-evidencias.tsx`, `papeis-trabalho.tsx`, `revisao.tsx`, `relatorios.tsx`, `configuracoes.tsx`

Alterar:
- `src/routes/__root.tsx` — `lang="pt-BR"`, metadados do SIGA, 404 e erro em português (preservando `reportLovableError`), layout aplicado ao redor do `<Outlet />`
- `src/routes/index.tsx` — remoção do placeholder e página inicial institucional, com `head()` próprio
- `src/styles.css` — apenas o mínimo necessário (tokens de superfície/borda do layout), sem definir o sistema visual da SDD-DSG-001
- `README.md` — identificação correta do projeto
- `src/routeTree.gen.ts` — regenerado automaticamente pelo framework

Não serão tocados: `AGENTS.md`, `.lovable/*`, `package.json`, `bun.lock`, configuração de build, documentos aprovados.

## 6. Sequência de implementação

1. Configuração de navegação (`src/config/navigation.ts`) como fonte única dos módulos.
2. Componentes de estado (`ModuloFuturoPage`, `EmptyState`, `LoadingState`).
3. Navegação (`MainNav`, `MobileNav`) com indicação de rota ativa (`aria-current`).
4. Layout (`AppHeader`, `PageHeader`, `AppLayout`).
5. `__root.tsx`: idioma, metadados, layout, 404 e erro em português.
6. Página inicial institucional substituindo o placeholder.
7. As nove rotas de módulo futuro, cada uma apenas declarando `head()` e delegando à página-base.
8. Verificação: build/typecheck, navegação por todas as rotas, checagem responsiva em desktop e largura reduzida, rota inexistente, foco por teclado.
9. Relatório final: arquivos alterados, verificações executadas, limitações e pendências.

## 7. Critérios de aceite atendidos

CA-FND-001 a CA-FND-020 são endereçados por este plano: identidade e metadados (1–3), remoção do placeholder (4), navegação e página ativa (5–6), página inicial sem dados fictícios (7), páginas de módulo futuro consistentes (8), responsividade (9–10), teclado e foco (11–12), 404 e erro (13–14), reutilização de layout e de componentes existentes (15–16), nenhuma alteração de banco ou segredo (17–18), build sem erro impeditivo (19) e diff restrito aos arquivos listados na seção 5 (20).

## 8. Riscos, dúvidas e limitações

- **Risco de sobreposição com a SDD-DSG-001:** manterei os ajustes em `src/styles.css` no mínimo indispensável; se um ajuste parecer decisão de sistema visual, ele será registrado como pendência em vez de implementado.
- **Risco de arquivo gerado:** `src/routeTree.gen.ts` aparecerá no diff — é regeneração automática, não edição manual.
- **Dúvida (não bloqueante):** a SDD lista "Administração" como quarto grupo no texto após anunciar três grupos (seção 10.2). Vou implementar os quatro grupos apresentados, com Configurações separada do fluxo metodológico, conforme a seção 10.3. Confirme se prefere outra leitura.
- **Dúvida (não bloqueante):** o texto do selo de ambiente ficará "Ambiente em construção"; posso trocar por outro rótulo aprovado.
- **Limitação:** o componente `ui/sidebar.tsx` existente traz comportamento próprio (cookie de estado, atalho de teclado) além do necessário; pretendo montar a navegação lateral com `nav` semântico + `sheet` no mobile, e não adotá-lo integralmente. Se preferir o `ui/sidebar`, ajusto antes de implementar.
- **Limitação:** verificação de acessibilidade será básica (idioma, semântica, foco, teclado, contraste aparente), sem auditoria formal.

## 9. Fora do escopo (permanece não implementado)

Autenticação, sessão, usuários, papéis, permissões, RLS, Supabase, migrations, tabelas, buckets, uploads, cadastros, filtros e pesquisas reais, dashboards, gráficos, indicadores, notificações, trilha de auditoria, histórico funcional, exportação, relatórios, portal do cliente, dados de demonstração de clientes ou trabalhos, regras de auditoria, sistema visual definitivo, contratos/ambientes da SDD-ENV-001 e publicação em produção.

Aguardo aprovação deste plano (e resposta às duas dúvidas da seção 8) antes de qualquer alteração de código.
