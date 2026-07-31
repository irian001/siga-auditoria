# Plano — SDD-DSG-001 (Sistema Visual e Componentes Básicos)

Modo planejamento. Nenhum arquivo foi alterado.

Leituras feitas antes deste plano: `AGENTS.md`, `docs/sdd/00_PLANO_MESTRE_DAS_SDDS_DO_MVP.md`, `docs/sdd/grupo-00-fundacao/00_PLANO_DO_GRUPO_00_FUNDACAO.md`, `SDD-FND-001`, `SDD-DSG-001`, além de `src/styles.css`, `src/config/navigation.ts`, `src/routes/index.tsx`, `src/components/ui/` (45 componentes), `src/components/states/*`, `src/components/layout/*`, `src/components/navigation/*`, `src/components/ui/button.tsx` e `badge.tsx`.

## 1. Entendimento do objetivo

Consolidar a linguagem visual reutilizável do SIGA sobre a fundação já aprovada, sem criar módulos de negócio. O tema noturno (grafite, azul profundo, cinza frio, verde restrito a sucesso) já aplicado permanece como primeira camada e será apenas completado: faltam tokens semânticos de **aviso** e **estado neutro/planejado**, variantes de badge e alerta que expressem esses estados, hierarquia tipográfica declarada, escala de espaçamento/borda documentada e padrões reutilizáveis para formulário, tabela, mensagem, paginação, carregamento, vazio e erro.

O entregável é uma base de interface, não uma identidade de marketing e não uma coleção de componentes novos.

## 2. Componentes existentes que serão reutilizados

De `src/components/ui/` (sem duplicar equivalentes): `button`, `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `label`, `form`, `card`, `table`, `badge`, `alert`, `alert-dialog`, `dialog`, `sheet`, `tabs`, `breadcrumb`, `pagination`, `skeleton`, `separator`, `scroll-area`, `tooltip`, `sonner`.

Da fundação: `AppLayout`, `AppHeader`, `PageHeader`, `MainNav`, `MobileNav`, `EmptyState`, `LoadingState`, `ModuloFuturoPage` e a fonte única `src/config/navigation.ts`.

`ui/sidebar.tsx` continuará não adotado (decisão registrada na SDD-FND-001).

## 3. Tokens e padrões que serão consolidados

Tokens (em `src/styles.css`, mantendo os valores noturnos atuais):

| Token | Situação | Ação |
|---|---|---|
| Superfícies (`background`, `card`, `popover`, `sidebar`) | Já definidos | Preservar |
| `primary` azul profundo | Já definido | Preservar |
| `success` / `success-foreground` | Já definido, sem consumo | Passar a ser consumido |
| `warning` / `warning-foreground` | Ausente | Criar em âmbar sóbrio |
| `neutral` / `neutral-foreground` (estado planejado) | Ausente | Criar em cinza frio |
| `destructive`, `border`, `input`, `ring` | Já definidos | Preservar, revisar contraste de borda |
| Raio `--radius: 0.5rem` | Já definido | Consolidar como padrão único |

Padrões documentados em código e aplicados:

- **Tipografia:** título de página (`text-2xl/3xl semibold`), título de seção (`text-lg semibold`), título de cartão (`text-base semibold`), apoio (`text-sm muted-foreground`), rótulo (`text-sm medium`), dado principal (`text-sm foreground`), status e erro (`text-xs`).
- **Espaçamento:** escala 2 / 3 / 4 / 6 / 8 / 10; cartões `p-6`; seções separadas por `mb-8`/`mb-10`; formulários com `space-y-4` interno e `space-y-6` entre grupos.
- **Sombra:** apenas em elementos flutuantes (diálogo, popover, painel); superfícies planas usam borda.
- **Estado nunca só por cor:** todo badge/alerta traz texto e, quando aplicável, ícone.
- **Foco:** `focus-visible:ring-2 ring-ring ring-offset-2 ring-offset-background` uniformizado nos componentes tocados.

## 4. Arquivos que pretendo criar ou alterar

**Alterar**
- `src/styles.css` — tokens `warning`/`neutral`, registro em `@theme inline`, reforço de contraste de borda se necessário, e mesma adição na variante `.light`.
- `src/components/ui/badge.tsx` — variantes `success`, `warning`, `neutral` (mantendo `default`, `secondary`, `destructive`, `outline`), foco padronizado.
- `src/components/ui/alert.tsx` — variantes `info`, `success`, `warning`, `destructive` com tokens.
- `src/components/ui/button.tsx` — apenas padronização de anel de foco e estado desabilitado, sem mexer nas variantes existentes.
- `src/components/ui/input.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx` — foco visível consistente e suporte a `aria-invalid` para erro.
- `src/components/ui/table.tsx` — cabeçalho legível, borda e densidade consistentes com os cartões.
- `src/components/ui/card.tsx` — consolidação de superfície e espaçamento (ajuste mínimo).
- `src/components/states/EmptyState.tsx` — alinhar ao padrão de tokens/tipografia consolidado.
- `src/components/states/LoadingState.tsx` — variantes de esqueleto (texto, cartão, linhas de tabela).
- `src/components/navigation/MainNav.tsx` — apenas se o contraste do item inativo/hover exigir ajuste.
- `src/routes/configuracoes.tsx` — hospedar a referência visual mínima (ver seção 5).

**Criar**
- `src/components/ui/status-badge.tsx` — etiqueta de situação com mapa `Planejado | Em construção | Em andamento | Concluído | Atenção | Erro | Indisponível` → variante + texto.
- `src/components/states/ErrorState.tsx` — estado de erro reutilizável (o que ocorreu, impacto, ação de recuperação).
- `src/components/patterns/FormField.tsx` — composição rótulo + ajuda + erro + obrigatoriedade textual, sobre `ui/label` e `ui/form`.
- `src/components/patterns/DataTableShell.tsx` — moldura de listagem (título, área de ações, cabeçalho, área rolável, vazio/carregando/erro) sem dados.
- `src/components/patterns/SectionHeader.tsx` — título de seção padronizado, se o uso repetido justificar.

**Não serão tocados:** `AGENTS.md`, `docs/`, `.lovable/plan.md`, `package.json`, `bun.lock`, configuração de build, rotas de módulo, `src/config/navigation.ts` (textos funcionais), qualquer arquivo de banco, Supabase ou credenciais. `src/routeTree.gen.ts` só aparecerá no diff se o framework regenerá-lo.

## 5. Exemplos visuais mínimos necessários

Uma única seção de referência, discreta, dentro de `/configuracoes` (rota já existente, hoje página de módulo futuro), intitulada **“Padrões visuais (referência interna)”**, contendo:

- amostra de superfícies e bordas;
- escala tipográfica;
- botões nas variantes e estados (padrão, hover, foco, desabilitado, destrutivo);
- etiquetas de situação com os sete termos aprovados;
- os quatro tipos de mensagem;
- moldura de listagem em estado vazio, carregando e erro;
- um campo de formulário com ajuda e com erro.

Nenhum dado de auditoria, nenhum cadastro simulado, nenhuma tela de negócio. O bloco “Módulo ainda não implementado” de `/configuracoes` é preservado; a referência entra abaixo dele.

## 6. Sequência de implementação

1. Tokens em `src/styles.css` (aviso, neutro, registro no tema, variante clara).
2. Etiquetas de situação: `status-badge.tsx` sobre `badge.tsx` ajustado.
3. Mensagens: variantes de `alert.tsx`.
4. Controles de formulário: foco, erro, desabilitado; `FormField`.
5. Superfícies e listagem: `card.tsx`, `table.tsx`, `DataTableShell`.
6. Estados: `LoadingState`, `EmptyState`, novo `ErrorState`.
7. Navegação: ajuste de contraste em `MainNav` somente se necessário.
8. Seção de referência em `/configuracoes`.
9. Verificações: typecheck/build, revisão visual em desktop e largura reduzida, percurso pelas dez rotas, rota ativa, navegação por teclado e foco, ausência de rolagem horizontal.
10. Relatório: arquivos alterados, resumo do diff, resultado da compilação, capturas, critérios atendidos e pendentes, limitações.

## 7. Critérios de aceite atendidos

- **CA-DSG-001** tema noturno preservado e consolidado nos tokens.
- **CA-DSG-002** hierarquia tipográfica declarada e aplicada.
- **CA-DSG-003** rota ativa mantém indicação visual e `aria-current`.
- **CA-DSG-004** componentes prioritários passam a compartilhar tokens e estados.
- **CA-DSG-005** anel de foco uniformizado nos componentes tocados.
- **CA-DSG-006** estados comunicados por texto e ícone, não só por cor.
- **CA-DSG-007** revisão em largura reduzida, sem rolagem horizontal geral.
- **CA-DSG-008** reutilização antes de criação; novos itens são composições justificadas.
- **CA-DSG-009** diff restrito à seção 4.
- **CA-DSG-010** build sem erro impeditivo.

## 8. Riscos, dúvidas e limitações

- **Dúvida (não bloqueante):** a seção de referência visual em `/configuracoes`. Alternativas: (a) `/configuracoes`, como proposto; (b) rota nova `/padroes-visuais` fora da navegação; (c) nenhuma amostra, apenas componentes reutilizáveis. Sigo com (a) se não houver orientação contrária.
- **Risco:** alterar componentes `ui/` afeta toda a aplicação futura; mitigação é ajuste mínimo e sem remoção de variantes existentes.
- **Risco:** criar `patterns/` introduz uma pasta nova; ela é composição sobre `ui/`, não biblioteca concorrente. Se preferir tudo em `src/components/ui/`, ajusto antes de implementar.
- **Limitação:** contraste avaliado visualmente; sem auditoria formal WCAG (reservada a SDD própria).
- **Limitação:** paginação será apenas padrão visual, sem lógica de dados.
- **Limitação:** não existe infraestrutura de teste visual configurada; nenhum arquivo de teste será criado nesta SDD.
- **Limitação:** as skills Superpowers não serão usadas, conforme a seção 15 da SDD.

## 9. Fora do escopo

Banco, migrations, Supabase, autenticação, permissões, RLS, dados reais ou simulados de auditoria, cadastros funcionais, regras de auditoria, dashboards com indicadores, portal do cliente, relatórios para impressão, gráficos avançados, alternância de tema pelo usuário, personalização visual por organização, auditoria completa de acessibilidade, alteração de `AGENTS.md`, `docs/`, `.lovable/plan.md`, `package.json`, `bun.lock`, configuração de build, e publicação em produção.

Aguardo aprovação e, se desejar, a resposta às dúvidas da seção 8 antes de qualquer alteração de código.
