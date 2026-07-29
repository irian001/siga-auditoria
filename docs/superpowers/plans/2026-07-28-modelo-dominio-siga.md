# Modelo de Domínio do SIGA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar e aprovar o Modelo de Domínio do SIGA como mapa conceitual completo do produto, separando MVP, extensões e fundamentos transversais.

**Architecture:** Um documento estruturante narrativo explicará conceitos, relações, cardinalidades em linguagem simples, estados e rastreabilidade. Ele preservará a terminologia do Glossário e não tomará decisões físicas de banco, APIs ou telas.

**Tech Stack:** Markdown, YAML front matter, GitHub, Obsidian wikilinks e Git.

## Global Constraints

- Criar exclusivamente `docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md` e arquivos de planejamento desta tarefa.
- Usar `SIGA-DOM-001`, versão `0.9` e status `em-revisao` até aprovação humana expressa.
- Não alterar Constituição, Matriz Mestra, Visão do Produto, Glossário ou documentos constitucionais na primeira entrega.
- Derivar conceitos e relações apenas de fontes aprovadas; não criar regras de negócio, tabelas, campos, SQL, APIs ou telas.
- Separar claramente núcleo do MVP, extensões planejadas e fundamentos transversais.
- Manter legibilidade no GitHub e navegação no Obsidian por YAML, aliases, fontes, wikilinks, relações e histórico.

---

## Arquivos e responsabilidades

| Arquivo | Responsabilidade |
|---|---|
| `docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md` | Modelo de Domínio central, em revisão. |
| `docs/superpowers/specs/2026-07-28-modelo-dominio-siga-design.md` | Desenho aprovado e fonte de escopo. |
| `docs/superpowers/plans/2026-07-28-modelo-dominio-siga.md` | Plano de criação, aprovação e publicação. |

### Task 1: Criar o Modelo de Domínio v0.9 para revisão humana

**Files:**

- Create: `docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md`
- Read: `docs/superpowers/specs/2026-07-28-modelo-dominio-siga-design.md`
- Read: `docs/constituicao/00_CONSTITUICAO_DO_SIGA.md`
- Read: `docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md`
- Read: `docs/estruturantes/01_VISAO_DO_PRODUTO.md`
- Read: `docs/estruturantes/02_GLOSSARIO_DO_SIGA.md`
- Read: documentos constitucionais 03, 04, 09, 10, 11, 12 e 13.

**Consumes:** Conceitos, terminologia e limites aprovados nas fontes listadas.

**Produces:** Modelo de Domínio v0.9 com mapa, entidades conceituais, relações, estados, rastreabilidade, extensões e bloco educacional.

- [x] **Step 1: Consolidar conceitos e fontes**

Usar o Glossário como vocabulário controlado e consolidar, para cada domínio, a fonte constitucional ou estruturante correspondente. Incluir organização usuária, usuário, perfil, função, cliente, trabalho, planejamento, balancete, conta, risco, controle, procedimento, amostra, solicitação, instrução, documento recebido, evidência, papel de trabalho, achado, revisão, conclusão, relatório, histórico, trilha, permissão, versão e anexo.

- [x] **Step 2: Criar YAML, navegação e limites**

Usar `SIGA-DOM-001`, título `Modelo de Domínio do SIGA`, aliases `Modelo de Domínio` e `Domínio do SIGA`, tipo `documento-estruturante`, domínio `arquitetura-funcional`, status `em-revisao`, versão `0.9`, datas `2026-07-28`, owner `responsavel-projeto`; Obsidian `note_type: domain-model`, `graph_role: domain-hub`, `backlinks_expected: true`, `dataview_ready: true`. Relacionar Constituição, Matriz, Visão, Glossário e futuro Modelo de Dados.

- [x] **Step 3: Escrever mapa e fundamentos transversais**

Apresentar a cadeia metodológica aprovada como mapa textual. Explicar multiempresa, permissões, responsabilidades, histórico, trilha de auditoria, versões, estados, anexos e segurança como fundamentos que atravessam os domínios.

- [x] **Step 4: Escrever entidades do núcleo do MVP**

Organizar entidades por: organização e acesso; trabalho e planejamento; contabilidade, riscos e procedimentos; documentos, evidências e papéis; achados, revisão, conclusões e relatório. Para cada conceito, registrar finalidade, identidade conceitual, relações, responsabilidades, estados quando aplicáveis e limites.

- [x] **Step 5: Escrever extensões planejadas e relações simples**

Separar portal do cliente, planos de ação, qualidade, auditoria dos pares, comercial, indicadores, integrações e agentes integrados. Explicar cardinalidades em linguagem simples sem usar modelo físico; deixar claro que uma relação futura não integra o MVP automaticamente.

- [x] **Step 6: Incluir estados, rastreabilidade, Obsidian e treinamento**

Explicar ciclos de vida conceituais e relações rastreáveis. Declarar notas futuras. Incluir público, nível, pré-requisitos, objetivos, conceitos-chave, roteiro, exemplo, erros comuns, boas práticas, estudo de caso, perguntas, avaliação, resumo, fontes, versão e histórico.

- [x] **Step 7: Validar o documento**

Executar `git diff --check` e procurar `TODO`, `TBD`, `preencher` e `definir depois`. Conferir documento/evidência, instrução/evidência, papel/resposta ao risco, MVP/extensões e ausência de decisões físicas ou regras novas.

- [x] **Step 8: Commit e revisão humana**

Criar o commit `docs: cria modelo de domínio do SIGA` contendo somente o Modelo v0.9. Apresentar o arquivo e interromper até aprovação expressa.

### Task 2: Promover e publicar o Modelo de Domínio aprovado

**Files:**

- Modify: `docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md`
- Modify: `docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md`

**Consumes:** Aprovação humana expressa do Modelo v0.9.

**Produces:** Modelo v1.0 aprovado, conectado à Matriz e publicado em `main` por pull request.

- [x] **Step 1: Registrar aprovação**

Atualizar o Modelo para `status: aprovado`, `version: 1.0`, data de aprovação e histórico preservando 0.9 como substituída.

- [x] **Step 2: Atualizar a Matriz Mestra**

Adicionar [[Modelo de Domínio do SIGA]] na navegação de documentos estruturantes, sem alterar regras constitucionais.

- [ ] **Step 3: Validar, revisar e publicar**

Executar `git diff --check origin/main..HEAD`, revisar YAML, fontes, wikilinks, escopo e ausência de mudanças físicas. Criar o commit `docs: aprova modelo de domínio do SIGA`, enviar a branch e abrir pull request para `main` após confirmar o commit remoto.

- [ ] **Step 4: Integrar após confirmação**

Confirmar pull request sem conflitos, revisão limpa e aprovação humana registrada; fazer merge preservando os commits.

## Revisão do plano

- Cobertura: núcleo, extensões, fundamentos, relações, estados, rastreabilidade, Obsidian, treinamento, aprovação e publicação.
- Escopo: não cria Modelo de Dados, banco, SQL, APIs, telas ou regras novas.
- Ambiguidade: relações são conceituais; decisões físicas ficam para o Modelo de Dados.
- Placeholders: não há campos pendentes de preenchimento.
