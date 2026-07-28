# Glossário do SIGA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar e aprovar o Glossário do SIGA como vocabulário controlado único, completo e navegável.

**Architecture:** Um documento estruturante reunirá termos por categoria e em ordem alfabética, com definições curtas, contexto, sinônimos ou termos a evitar e relações explícitas. Ele derivará apenas de documentos aprovados e funcionará como nota hub no Obsidian, sem modificar regras ou criar notas paralelas.

**Tech Stack:** Markdown, YAML front matter, GitHub, Obsidian wikilinks e Git.

## Global Constraints

- Criar exclusivamente `docs/estruturantes/02_GLOSSARIO_DO_SIGA.md` e arquivos de planejamento desta tarefa.
- Usar `SIGA-GLS-001`, versão `0.9` e status `em-revisao` até aprovação humana expressa.
- Não alterar Constituição, Matriz Mestra, Visão do Produto ou documentos constitucionais na primeira entrega.
- Não criar regras novas; em divergência, apontar a fonte superior ou a pendência.
- Manter o arquivo legível no GitHub e navegável no Obsidian, com YAML, aliases, wikilinks e histórico.
- Tratar wikilinks para notas futuras como relações planejadas, sem criar uma coleção paralela.

---

## Arquivos e responsabilidades

| Arquivo | Responsabilidade |
|---|---|
| `docs/estruturantes/02_GLOSSARIO_DO_SIGA.md` | Glossário central, completo e em revisão. |
| `docs/superpowers/specs/2026-07-28-glossario-siga-design.md` | Desenho aprovado e fonte de escopo. |
| `docs/superpowers/plans/2026-07-28-glossario-siga.md` | Plano de criação, validação, aprovação e publicação. |

### Task 1: Criar o Glossário v0.9 para revisão humana

**Files:**

- Create: `docs/estruturantes/02_GLOSSARIO_DO_SIGA.md`
- Read: `docs/superpowers/specs/2026-07-28-glossario-siga-design.md`
- Read: `docs/constituicao/00_CONSTITUICAO_DO_SIGA.md`
- Read: `docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md`
- Read: `docs/estruturantes/01_VISAO_DO_PRODUTO.md`
- Read: documentos constitucionais 04, 07, 08, 09, 10 e 12.

**Consumes:** Conceitos e regras já aprovados nas fontes listadas.

**Produces:** Glossário em revisão, com YAML e categorias de auditoria; produto; dados e segurança; desenvolvimento; IA; documentação e treinamento.

- [ ] **Step 1: Extrair os termos canônicos das fontes**

Montar lista de termos efetivamente usados, com fonte principal. Incluir: risco, controle, procedimento, amostra, documento recebido, evidência, papel de trabalho, achado e relatório; organização usuária, cliente e trabalho; autenticação, autorização, isolamento multiempresa e histórico; branch, commit, pull request, teste e homologação; agente, skill, autonomia e aprovação humana; GitHub, Obsidian, wikilink, backlink e NotebookLM.

- [ ] **Step 2: Criar YAML e navegação estrutural**

Usar `SIGA-GLS-001`, título `Glossário do SIGA`, aliases `Glossário SIGA` e `Vocabulário Controlado do SIGA`, tipo `documento-estruturante`, domínio `conhecimento`, status `em-revisao`, versão `0.9`, datas `2026-07-28`, owner `responsavel-projeto`, e propriedades Obsidian `note_type: glossary`, `graph_role: vocabulary-hub`, `backlinks_expected: true`, `dataview_ready: true`. Relacionar [[Constituição do SIGA]], [[Matriz Mestra da Constituição do SIGA]] e [[Visão do Produto do SIGA]].

- [ ] **Step 3: Escrever convenções e critérios de uso**

Definir o termo em negrito como oficial; sinônimos como auxiliares; termos ausentes como propostas de inclusão; e Constituição/documentos específicos como prevalentes em conflitos.

- [ ] **Step 4: Escrever as seis categorias em ordem alfabética**

Cada entrada terá termo, definição, uso no SIGA e relações. Incluir sinônimos ou expressão a evitar apenas quando reduzirem ambiguidade.

- [ ] **Step 5: Incluir termos futuros, bloco educacional e histórico**

Declarar wikilinks ainda inexistentes como notas futuras. Adicionar objetivos de aprendizagem, conceitos-chave, roteiro de apresentação, estudo de caso, perguntas e questões de avaliação. Registrar `0.9` como minuta em revisão no histórico.

- [ ] **Step 6: Validar o conteúdo**

Executar `git diff --check` e procurar `TODO`, `TBD`, `preencher` e `definir depois` no Glossário. Conferir manualmente os pares documento recebido/evidência, histórico/trilha de auditoria e agente/skill; confirmar ausência de regras novas.

- [ ] **Step 7: Commit para revisão humana**

Criar o commit `docs: cria glossário do SIGA`, contendo somente o Glossário em revisão.

- [ ] **Step 8: Interromper para aprovação humana**

Apresentar o arquivo v0.9. Não promover, publicar ou alterar a Matriz até receber aprovação expressa.

### Task 2: Promover e publicar o Glossário aprovado

**Files:**

- Modify: `docs/estruturantes/02_GLOSSARIO_DO_SIGA.md`
- Modify: `docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md`

**Consumes:** Aprovação humana expressa do Glossário v0.9.

**Produces:** Glossário v1.0 aprovado, com backlink da Matriz Mestra e publicação em `main` por pull request.

- [ ] **Step 1: Registrar aprovação**

Atualizar apenas o Glossário para `status: aprovado`, `version: 1.0`, data de aprovação e histórico preservando a linha 0.9 como substituída.

- [ ] **Step 2: Atualizar a Matriz Mestra**

Adicionar [[Glossário do SIGA]] na navegação para documentos estruturantes, sem alterar regras constitucionais.

- [ ] **Step 3: Validar e revisar**

Executar `git diff --check origin/main..HEAD` e revisar YAML, wikilinks, termos canônicos e ausência de mudanças fora do escopo.

- [ ] **Step 4: Commit e publicar para integração**

Criar o commit `docs: aprova glossário do SIGA`, enviar `docs/glossario` ao remoto e abrir pull request para `main` após confirmar a branch remota.

- [ ] **Step 5: Integrar após confirmação**

Confirmar pull request sem conflitos, revisão limpa e aprovação humana registrada; fazer merge preservando os commits.

## Revisão do plano

- Cobertura: estrutura, seis categorias, vocabulário controlado, termos técnicos, Obsidian, treinamento, validação, aprovação e publicação.
- Escopo: não cria notas individuais, regras novas, SDDs ou alterações constitucionais.
- Ambiguidade: termos futuros são relações planejadas; divergências são registradas, não resolvidas pelo Glossário.
- Placeholders: não há campos pendentes de preenchimento.
