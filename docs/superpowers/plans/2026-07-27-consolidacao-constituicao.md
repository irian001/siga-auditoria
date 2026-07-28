# SIGA Constitution Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidar a Constituição central do SIGA com 15 títulos e 82 artigos e alinhar os documentos derivados, a Matriz Mestra e o inventário sem criar regras novas.

**Architecture:** A Constituição antiga é a fonte da estrutura normativa e dos artigos. Os documentos atuais fornecem refinamentos já aprovados e permanecem como detalhamentos dos títulos. A consolidação será entregue primeiro como versão 0.9 em revisão; somente após aprovação humana será promovida para 1.0.

**Tech Stack:** Markdown UTF-8, YAML front matter, wikilinks do Obsidian, Git e GitHub.

## Global Constraints

- Preservar exatamente 15 títulos e 82 artigos.
- Não excluir nem renumerar artigos.
- Não criar artigo 83 ou posterior.
- Não criar regras de negócio ou metodologia que não tenham sido aprovadas.
- Utilizar a Constituição antiga como fonte da estrutura, títulos e redação normativa.
- Utilizar os documentos atuais somente para refinamentos já aprovados.
- Trabalhar em branch própria; não alterar diretamente a `main`.
- Utilizar `apply_patch` para editar ou criar arquivos.
- Utilizar `git mv` para renomear arquivos e preservar histórico.
- Manter UTF-8 e eliminar caracteres corrompidos.
- Manter o conteúdo compreensível no GitHub sem depender do Obsidian.
- Não criar Glossário, Modelo de Domínio, Modelo de Dados, SDD ou código do sistema.
- Não modificar `docs/status/RELATORIO_NORMALIZACAO_OBSIDIAN.md`; ele é registro histórico.

---

## File Map

### Criar

- `docs/constituicao/00_CONSTITUICAO_DO_SIGA.md`: norma superior com preâmbulo, 15 títulos e 82 artigos.
- `docs/constituicao/07_DOCUMENTACAO_MESTRE.md`: detalhamento dos artigos 39 a 44.
- `docs/constituicao/14_GESTAO_DA_CONSTITUICAO.md`: detalhamento dos artigos 77 a 79.
- `docs/constituicao/15_DISPOSICOES_FINAIS.md`: detalhamento dos artigos 80 a 82.

### Renomear com `git mv`

- `docs/constituicao/07_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md` → `docs/constituicao/10_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md`.
- `docs/constituicao/10_QUALIDADE_TESTES_E_VALIDACAO.md` → `docs/constituicao/11_QUALIDADE_TESTES_E_VALIDACAO.md`.
- `docs/constituicao/11_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md` → `docs/constituicao/13_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md`.

### Modificar

- `docs/constituicao/01_IDENTIDADE_E_FINALIDADE.md` a `06_GOVERNANCA_DO_DESENVOLVIMENTO.md`: navegação e referências, sem mudança de faixa de artigos.
- `docs/constituicao/08_CONHECIMENTO_E_TREINAMENTO.md`: navegação entre Títulos VII e IX.
- `docs/constituicao/09_REGRAS_DE_NEGOCIO_E_METODOLOGIA.md`: navegação entre Títulos VIII e X.
- `docs/constituicao/10_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md`: ID, título constitucional, artigos 59–64, aliases e navegação.
- `docs/constituicao/11_QUALIDADE_TESTES_E_VALIDACAO.md`: ID, título constitucional, artigos 65–68, aliases e navegação.
- `docs/constituicao/12_AGENTES_SKILLS_E_AUTOMACAO.md`: artigos 69–73 e navegação entre Títulos XI e XIII.
- `docs/constituicao/13_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md`: ID, título constitucional, artigos 74–76, aliases e navegação.
- `docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md`: 15 títulos, 82 artigos e caminhos finais.
- `docs/constituicao/INVENTARIO_CONSTITUICAO.md`: novo conjunto, origem, tamanhos, hashes e estado.

### Fonte de leitura

- `C:/Users/irian/.codex/attachments/1cfe6586-39d1-44a0-8bee-3591f1208d41/pasted-text.txt`: Constituição antiga em UTF-8.
- `docs/superpowers/specs/2026-07-27-consolidacao-constituicao-design.md`: desenho aprovado.

---

### Task 1: Criar a Constituição central versão 0.9

**Files:**
- Create: `docs/constituicao/00_CONSTITUICAO_DO_SIGA.md`
- Read: `C:/Users/irian/.codex/attachments/1cfe6586-39d1-44a0-8bee-3591f1208d41/pasted-text.txt`
- Read: `docs/superpowers/specs/2026-07-27-consolidacao-constituicao-design.md`
- Read: `docs/constituicao/01_IDENTIDADE_E_FINALIDADE.md`
- Read: `docs/constituicao/02_PRINCIPIOS_FUNDAMENTAIS.md`
- Read: `docs/constituicao/04_ESTRUTURA_FUNCIONAL.md`
- Read: `docs/constituicao/07_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md`
- Read: `docs/constituicao/10_QUALIDADE_TESTES_E_VALIDACAO.md`
- Read: `docs/constituicao/11_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md`
- Read: `docs/constituicao/12_AGENTES_SKILLS_E_AUTOMACAO.md`

**Interfaces:**
- Consumes: Constituição antiga e refinamentos aprovados nos documentos atuais.
- Produces: `SIGA-CON-00`, referência normativa para todos os documentos seguintes.

- [ ] **Step 1: Confirmar a fonte antiga**

Run:

```powershell
rg -c "^# TÍTULO " "C:/Users/irian/.codex/attachments/1cfe6586-39d1-44a0-8bee-3591f1208d41/pasted-text.txt"
rg -c "^## Art\. " "C:/Users/irian/.codex/attachments/1cfe6586-39d1-44a0-8bee-3591f1208d41/pasted-text.txt"
```

Expected:

```text
15
82
```

- [ ] **Step 2: Criar o YAML da Constituição**

Usar exatamente esta estrutura inicial:

```yaml
---
id: SIGA-CON-00
title: Constituição do SIGA
aliases:
  - Constituição do Projeto SIGA
  - Constituição do Sistema Integrado para Gerenciamento de Auditoria
type: constituicao-central
domain: governanca
status: em-revisao
version: 0.9
created: 2026-07-24
updated: 2026-07-27
owner: responsavel-projeto
obsidian:
  note_type: sun
  graph_role: root
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[Matriz Mestra da Constituição do SIGA]]"
tags:
  - siga
  - constituicao
  - governanca
  - norma-superior
---
```

- [ ] **Step 3: Transferir a estrutura normativa**

Copiar do arquivo antigo, mantendo:

- preâmbulo;
- Títulos I a XV;
- artigos 1º a 82;
- registro de aprovação.

Corrigir somente codificação, ortografia evidente, formatação dos números dos artigos e Markdown.

- [ ] **Step 4: Incorporar refinamentos aprovados**

Incorporar sem criar novos artigos:

- artigos 13 e 39–53: Markdown, YAML, identificadores, Obsidian, NotebookLM e base interligada;
- artigos 20–24 e 54–58: solicitação, instrução, documento recebido e evidência como objetos distintos;
- artigos 32–38: SDD, escopo, tarefas pequenas, branch, revisão e definição de conclusão;
- artigos 59–64: multiempresa, menor privilégio, arquivos, histórico, trilha e segredos;
- artigos 65–68: testes metodológicos, segurança, evidências e definição de pronto;
- artigos 69–73: agentes, skills, autonomia, fontes, limites e aprovação humana;
- artigos 74–76: MVP, fases, continuidade, bloqueios e dívida;
- artigos 77–79: alteração formal, justificativa, versão e preservação histórica.

Manter a Constituição normativa e remeter detalhes aos documentos complementares.

- [ ] **Step 5: Adicionar navegação por título**

Ao final de cada título, incluir um link para o documento complementar correspondente, por exemplo:

```markdown
**Detalhamento:** [[Identidade e Finalidade do SIGA]]
```

Usar os 15 títulos e nomes definidos na especificação.

- [ ] **Step 6: Validar a Constituição**

Run:

```powershell
rg -c "^# TÍTULO " docs/constituicao/00_CONSTITUICAO_DO_SIGA.md
rg -c "^## Art\. " docs/constituicao/00_CONSTITUICAO_DO_SIGA.md
rg -n "Art\. (8[3-9]|[9-9][0-9])" docs/constituicao/00_CONSTITUICAO_DO_SIGA.md
rg -n "Ã|Â|â€”|�" docs/constituicao/00_CONSTITUICAO_DO_SIGA.md
```

Expected:

- títulos: `15`;
- artigos: `82`;
- artigos superiores a 82: nenhuma ocorrência;
- caracteres corrompidos: nenhuma ocorrência.

- [ ] **Step 7: Commit**

```powershell
git add docs/constituicao/00_CONSTITUICAO_DO_SIGA.md
git commit -m "docs: adiciona constituição central em revisão"
```

---

### Task 2: Realinhar os documentos constitucionais existentes

**Files:**
- Rename: `docs/constituicao/07_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md`
- Rename: `docs/constituicao/10_QUALIDADE_TESTES_E_VALIDACAO.md`
- Rename: `docs/constituicao/11_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md`
- Modify: `docs/constituicao/10_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md`
- Modify: `docs/constituicao/11_QUALIDADE_TESTES_E_VALIDACAO.md`
- Modify: `docs/constituicao/12_AGENTES_SKILLS_E_AUTOMACAO.md`
- Modify: `docs/constituicao/13_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md`

**Interfaces:**
- Consumes: faixas de artigos definidas por `SIGA-CON-00`.
- Produces: documentos realinhados para os Títulos X a XIII.

- [ ] **Step 1: Renomear preservando histórico**

```powershell
git mv docs/constituicao/07_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md docs/constituicao/10_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md
git mv docs/constituicao/10_QUALIDADE_TESTES_E_VALIDACAO.md docs/constituicao/11_QUALIDADE_TESTES_E_VALIDACAO.md
git mv docs/constituicao/11_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md docs/constituicao/13_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md
```

- [ ] **Step 2: Ajustar Dados, Segurança e Histórico**

Definir:

```yaml
id: SIGA-CON-10
title: Dados, Segurança, Privacidade e Histórico do SIGA
aliases:
  - Título X
  - Dados, Segurança e Histórico do SIGA
constitution: [Art. 59, Art. 60, Art. 61, Art. 62, Art. 63, Art. 64]
```

Alterar o heading para `# TÍTULO X — DADOS, SEGURANÇA, PRIVACIDADE E HISTÓRICO DO SIGA`.

Navegação:

- anterior: `[[Regras de Negócio e Metodologia de Auditoria]]`;
- próximo: `[[Qualidade, Testes e Validação do SIGA]]`.

- [ ] **Step 3: Ajustar Qualidade e Testes**

Definir:

```yaml
id: SIGA-CON-11
title: Qualidade, Testes e Validação do SIGA
aliases:
  - Título XI
  - Qualidade e Testes do SIGA
constitution: [Art. 65, Art. 66, Art. 67, Art. 68]
```

Alterar o heading para `# TÍTULO XI — QUALIDADE, TESTES E VALIDAÇÃO DO SIGA`.

Navegação:

- anterior: `[[Dados, Segurança, Privacidade e Histórico do SIGA]]`;
- próximo: `[[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]]`.

- [ ] **Step 4: Ajustar Agentes e Skills**

Manter arquivo e ID `SIGA-CON-12`.

Definir:

```yaml
constitution: [Art. 69, Art. 70, Art. 71, Art. 72, Art. 73]
```

Navegação:

- anterior: `[[Qualidade, Testes e Validação do SIGA]]`;
- próximo: `[[Roadmap, Evolução e Continuidade do SIGA]]`.

- [ ] **Step 5: Ajustar Roadmap**

Definir:

```yaml
id: SIGA-CON-13
title: Roadmap, Evolução e Continuidade do SIGA
aliases:
  - Título XIII
  - Roadmap do SIGA
constitution: [Art. 74, Art. 75, Art. 76]
```

Alterar o heading para `# TÍTULO XIII — ROADMAP, EVOLUÇÃO E CONTINUIDADE DO SIGA`.

Navegação:

- anterior: `[[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]]`;
- próximo: `[[Gestão da Constituição do SIGA]]`.

- [ ] **Step 6: Confirmar renomeações**

Run:

```powershell
rg --files docs/constituicao | rg "^(.*[\\/])?(07_DADOS|10_QUALIDADE|11_ROADMAP)_"
rg --files docs/constituicao | rg "(10_DADOS|11_QUALIDADE|13_ROADMAP)_"
```

Expected:

- primeira consulta: nenhuma ocorrência;
- segunda consulta: três ocorrências.

- [ ] **Step 7: Commit**

```powershell
git add docs/constituicao
git commit -m "docs: realinha títulos constitucionais existentes"
```

---

### Task 3: Criar os três documentos constitucionais ausentes

**Files:**
- Create: `docs/constituicao/07_DOCUMENTACAO_MESTRE.md`
- Create: `docs/constituicao/14_GESTAO_DA_CONSTITUICAO.md`
- Create: `docs/constituicao/15_DISPOSICOES_FINAIS.md`

**Interfaces:**
- Consumes: artigos 39–44, 77–79 e 80–82 da Constituição central.
- Produces: cobertura documental completa dos 15 títulos.

- [ ] **Step 1: Criar Documentação Mestre**

YAML obrigatório:

```yaml
id: SIGA-CON-07
title: Documentação Mestre do SIGA
aliases:
  - Título VII
  - Sistema Documental do SIGA
type: documento-constitucional
domain: governanca-documental
status: em-revisao
version: 0.9
created: 2026-07-27
updated: 2026-07-27
owner: responsavel-projeto
constitution: [Art. 39, Art. 40, Art. 41, Art. 42, Art. 43, Art. 44]
```

Seções:

- Navegação constitucional;
- Sistema documental;
- Documentos fundamentais;
- Constituição e hierarquia;
- Situação do projeto;
- Decisões arquiteturais;
- Critérios de conformidade;
- Material para treinamento;
- Histórico.

Navegação:

- anterior: `[[Governança do Desenvolvimento do SIGA]]`;
- próximo: `[[Conhecimento, Treinamento e Produção Educacional do SIGA]]`.

- [ ] **Step 2: Criar Gestão da Constituição**

YAML obrigatório:

```yaml
id: SIGA-CON-14
title: Gestão da Constituição do SIGA
aliases:
  - Título XIV
  - Alterações da Constituição do SIGA
type: documento-constitucional
domain: governanca-documental
status: em-revisao
version: 0.9
created: 2026-07-27
updated: 2026-07-27
owner: responsavel-projeto
constitution: [Art. 77, Art. 78, Art. 79]
```

Seções:

- Navegação constitucional;
- Hipóteses de alteração;
- Registro obrigatório;
- Versionamento;
- Preservação do histórico;
- Fluxo de aprovação;
- Critérios de conformidade;
- Material para treinamento;
- Histórico.

Navegação:

- anterior: `[[Roadmap, Evolução e Continuidade do SIGA]]`;
- próximo: `[[Disposições Finais do SIGA]]`.

- [ ] **Step 3: Criar Disposições Finais**

YAML obrigatório:

```yaml
id: SIGA-CON-15
title: Disposições Finais do SIGA
aliases:
  - Título XV
  - Governança Final do SIGA
type: documento-constitucional
domain: governanca
status: em-revisao
version: 0.9
created: 2026-07-27
updated: 2026-07-27
owner: responsavel-projeto
constitution: [Art. 80, Art. 81, Art. 82]
```

Seções:

- Navegação constitucional;
- Responsabilidade final;
- Entrada em vigor;
- Próximos documentos;
- Critérios de encerramento da fase constitucional;
- Material para treinamento;
- Histórico.

Navegação:

- anterior: `[[Gestão da Constituição do SIGA]]`;
- retorno: `[[Constituição do SIGA]]`.

- [ ] **Step 4: Validar os três documentos**

Run:

```powershell
rg -n "^id: SIGA-CON-(07|14|15)$" docs/constituicao
rg -n "constitution: \[Art\. (39|77|80)" docs/constituicao
```

Expected: três IDs e três faixas iniciais encontradas.

- [ ] **Step 5: Commit**

```powershell
git add docs/constituicao/07_DOCUMENTACAO_MESTRE.md docs/constituicao/14_GESTAO_DA_CONSTITUICAO.md docs/constituicao/15_DISPOSICOES_FINAIS.md
git commit -m "docs: completa títulos constitucionais ausentes"
```

---

### Task 4: Corrigir a navegação dos Títulos I a IX

**Files:**
- Modify: `docs/constituicao/01_IDENTIDADE_E_FINALIDADE.md`
- Modify: `docs/constituicao/02_PRINCIPIOS_FUNDAMENTAIS.md`
- Modify: `docs/constituicao/03_PUBLICOS_E_PERFIS.md`
- Modify: `docs/constituicao/04_ESTRUTURA_FUNCIONAL.md`
- Modify: `docs/constituicao/05_ARQUITETURA_TECNOLOGICA.md`
- Modify: `docs/constituicao/06_GOVERNANCA_DO_DESENVOLVIMENTO.md`
- Modify: `docs/constituicao/08_CONHECIMENTO_E_TREINAMENTO.md`
- Modify: `docs/constituicao/09_REGRAS_DE_NEGOCIO_E_METODOLOGIA.md`

**Interfaces:**
- Consumes: títulos definitivos I a XV.
- Produces: sequência navegável sem saltos.

- [ ] **Step 1: Confirmar faixas inalteradas**

Manter:

```text
SIGA-CON-01 → Art. 1–4
SIGA-CON-02 → Art. 5–15
SIGA-CON-03 → Art. 16–19
SIGA-CON-04 → Art. 20–24
SIGA-CON-05 → Art. 25–31
SIGA-CON-06 → Art. 32–38
SIGA-CON-08 → Art. 45–53
SIGA-CON-09 → Art. 54–58
```

- [ ] **Step 2: Corrigir transição VI → VII**

Em `06_GOVERNANCA_DO_DESENVOLVIMENTO.md`, definir:

```markdown
- Próximo: [[Documentação Mestre do SIGA]]
```

- [ ] **Step 3: Corrigir transição VIII → IX → X**

Em `08_CONHECIMENTO_E_TREINAMENTO.md`:

```markdown
- Anterior: [[Documentação Mestre do SIGA]]
- Próximo: [[Regras de Negócio e Metodologia de Auditoria]]
```

Em `09_REGRAS_DE_NEGOCIO_E_METODOLOGIA.md`:

```markdown
- Anterior: [[Conhecimento, Treinamento e Produção Educacional do SIGA]]
- Próximo: [[Dados, Segurança, Privacidade e Histórico do SIGA]]
```

- [ ] **Step 4: Confirmar links superiores**

Todos os oito arquivos devem conter:

```markdown
- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
```

- [ ] **Step 5: Commit**

```powershell
git add docs/constituicao/01_IDENTIDADE_E_FINALIDADE.md docs/constituicao/02_PRINCIPIOS_FUNDAMENTAIS.md docs/constituicao/03_PUBLICOS_E_PERFIS.md docs/constituicao/04_ESTRUTURA_FUNCIONAL.md docs/constituicao/05_ARQUITETURA_TECNOLOGICA.md docs/constituicao/06_GOVERNANCA_DO_DESENVOLVIMENTO.md docs/constituicao/08_CONHECIMENTO_E_TREINAMENTO.md docs/constituicao/09_REGRAS_DE_NEGOCIO_E_METODOLOGIA.md
git commit -m "docs: corrige navegação constitucional"
```

---

### Task 5: Atualizar a Matriz Mestra e o inventário

**Files:**
- Modify: `docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md`
- Modify: `docs/constituicao/INVENTARIO_CONSTITUICAO.md`

**Interfaces:**
- Consumes: conjunto final de 16 arquivos constitucionais, incluindo a Constituição central.
- Produces: mapa e registro de preservação consistentes.

- [ ] **Step 1: Atualizar a Matriz Mestra**

Alterar o resumo para:

```text
Constituição central: 1
Títulos constitucionais: 15
Artigos: 1–82
Lacunas: nenhuma
Sobreposições: nenhuma
```

Substituir a tabela de 12 títulos pela tabela de 15 títulos definida na especificação.

Atualizar o Canvas conceitual:

```text
Constituição → Matriz Mestra → Títulos I–XV → Documentos estruturantes → SDDs → Tarefas → Código
```

Atualizar a consulta Dataview para:

```dataview
TABLE id, version, status
FROM "docs/constituicao"
WHERE type = "documento-constitucional"
SORT id ASC
```

Remover a pendência que declara ausente `[[Constituição do SIGA]]`.

- [ ] **Step 2: Atualizar o inventário**

Registrar:

- `00_CONSTITUICAO_DO_SIGA.md`;
- os três arquivos renomeados;
- os três arquivos novos;
- 15 documentos de títulos;
- uma Constituição central;
- uma Matriz Mestra;
- um inventário;
- um relatório histórico em `docs/status/`;
- origem da Constituição antiga no anexo fornecido;
- status `em-revisao` para a central e os três novos títulos.

- [ ] **Step 3: Calcular tamanhos e hashes**

Run:

```powershell
Get-ChildItem docs/constituicao -File -Filter *.md |
  Sort-Object Name |
  ForEach-Object {
    $hash = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLower()
    "{0}|{1}|{2}" -f $_.Name, $_.Length, $hash
  }
```

Copiar os resultados para o inventário. Para o próprio inventário, registrar `não aplicável (auto-referencial)`.

- [ ] **Step 4: Commit**

```powershell
git add docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md docs/constituicao/INVENTARIO_CONSTITUICAO.md
git commit -m "docs: atualiza matriz e inventário constitucional"
```

---

### Task 6: Executar a validação integral da versão 0.9

**Files:**
- Verify: `docs/constituicao/*.md`
- Verify: `docs/status/RELATORIO_NORMALIZACAO_OBSIDIAN.md`

**Interfaces:**
- Consumes: todos os arquivos consolidados.
- Produces: evidência de que a versão 0.9 está pronta para revisão humana.

- [ ] **Step 1: Verificar arquivos esperados**

Run:

```powershell
rg --files docs/constituicao | Sort-Object
```

Expected:

- `00_CONSTITUICAO_DO_SIGA.md`;
- arquivos numerados `01_` a `15_`;
- Matriz Mestra;
- inventário.

- [ ] **Step 2: Verificar artigos e títulos**

```powershell
rg -c "^# TÍTULO " docs/constituicao/00_CONSTITUICAO_DO_SIGA.md
rg -c "^## Art\. " docs/constituicao/00_CONSTITUICAO_DO_SIGA.md
```

Expected:

```text
15
82
```

- [ ] **Step 3: Verificar IDs únicos**

Run:

```powershell
$files = Get-ChildItem docs/constituicao -File -Filter *.md
$ids = foreach ($file in $files) {
  $text = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  ([regex]::Match($text, '(?m)^id:\s*(.+)$')).Groups[1].Value.Trim()
}
$ids | Group-Object | Where-Object Count -gt 1
```

Expected: nenhuma saída.

- [ ] **Step 4: Verificar cobertura sem sobreposição**

Run:

```powershell
$titleFiles = Get-ChildItem docs/constituicao -File -Filter *.md |
  Where-Object Name -Match '^(0[1-9]|1[0-5])_'
$articles = foreach ($file in $titleFiles) {
  $text = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  $frontmatter = $text -split '---', 3
  [regex]::Matches($frontmatter[1], 'Art\. (\d+)') |
    ForEach-Object { [int]$_.Groups[1].Value }
}
$missing = 1..82 | Where-Object { $_ -notin $articles }
$duplicates = $articles | Group-Object | Where-Object Count -gt 1
"MISSING=$($missing -join ',')"
"DUPLICATES=$($duplicates.Name -join ',')"
```

Expected:

```text
MISSING=
DUPLICATES=
```

- [ ] **Step 5: Verificar links e caracteres**

Run:

```powershell
$titleFiles = Get-ChildItem docs/constituicao -File -Filter *.md |
  Where-Object Name -Match '^(0[1-9]|1[0-5])_'
$titleFiles |
  Where-Object {
    (Get-Content -LiteralPath $_.FullName -Raw -Encoding UTF8) -notmatch
      '\[\[Constituição do SIGA\]\]'
  } |
  Select-Object -ExpandProperty Name
$titleFiles |
  Where-Object {
    (Get-Content -LiteralPath $_.FullName -Raw -Encoding UTF8) -notmatch
      '\[\[Matriz Mestra da Constituição do SIGA\]\]'
  } |
  Select-Object -ExpandProperty Name
rg -n "Ã|Â|â€”|�" docs/constituicao
rg -n "gho_[A-Za-z0-9]+|sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY" docs
```

Expected: nenhuma saída.

- [ ] **Step 6: Verificar nomes antigos**

Run:

```powershell
rg --files docs/constituicao | rg "(07_DADOS|10_QUALIDADE|11_ROADMAP)_"
```

Expected: nenhuma saída.

- [ ] **Step 7: Verificar o diff**

```powershell
git status --short
git diff --check
git diff --stat main...HEAD
```

Expected:

- nenhuma mudança não commitada;
- nenhum erro de whitespace;
- somente documentação constitucional, Matriz, inventário, especificação e plano.

- [ ] **Step 8: Registrar correções, se necessárias**

Se qualquer validação falhar, corrigir apenas o arquivo identificado, repetir o comando que falhou e criar:

```powershell
git add docs
git commit -m "docs: corrige validação constitucional"
```

Se todas passarem sem correção, não criar commit vazio.

---

### Task 7: Publicar a versão 0.9 para revisão

**Files:**
- No content changes expected.

**Interfaces:**
- Consumes: versão 0.9 validada.
- Produces: branch remota e pull request de revisão sem merge.

- [ ] **Step 1: Enviar a branch**

```powershell
git push -u origin docs/constituicao-central
```

Se a execução ocorrer em branch com outro nome aprovado, enviar essa branch e registrar o nome no inventário.

- [ ] **Step 2: Abrir PR de revisão**

Título:

```text
docs: consolida constituição central do SIGA
```

Corpo obrigatório:

```markdown
## Objetivo

Consolidar a Constituição do SIGA com 15 títulos e 82 artigos.

## Conteúdo

- Constituição central versão 0.9;
- documentos dos Títulos I a XV;
- Matriz Mestra atualizada;
- inventário atualizado.

## Validações

- 15 títulos;
- 82 artigos;
- IDs únicos;
- cobertura contínua;
- links constitucionais;
- ausência de caracteres corrompidos e segredos;
- git diff sem erros.

## Aprovação

Este PR não deve ser integrado antes da aprovação do responsável pelo projeto.
```

- [ ] **Step 3: Interromper para revisão humana**

Apresentar:

- link da Constituição central;
- link da Matriz Mestra;
- link do PR;
- resumo das diferenças incorporadas.

Não promover para 1.0 e não fazer merge nesta etapa.

---

### Task 8: Promover a Constituição para versão 1.0 após aprovação

**Files:**
- Modify: `docs/constituicao/00_CONSTITUICAO_DO_SIGA.md`
- Modify: `docs/constituicao/07_DOCUMENTACAO_MESTRE.md`
- Modify: `docs/constituicao/14_GESTAO_DA_CONSTITUICAO.md`
- Modify: `docs/constituicao/15_DISPOSICOES_FINAIS.md`
- Modify: `docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md`
- Modify: `docs/constituicao/INVENTARIO_CONSTITUICAO.md`

**Interfaces:**
- Consumes: aprovação expressa do responsável.
- Produces: Constituição canônica versão 1.0 pronta para merge.

- [ ] **Step 1: Atualizar status e versão**

Nos quatro arquivos em revisão:

```yaml
status: aprovado
version: 1.0
updated: 2026-07-27
```

- [ ] **Step 2: Atualizar históricos**

Adicionar:

```markdown
| 0.9 | 2026-07-27 | Consolidação para revisão | Substituída |
| 1.0 | 2026-07-27 | Primeira versão constitucional consolidada e aprovada | Aprovada |
```

- [ ] **Step 3: Atualizar Matriz e inventário**

Registrar os quatro arquivos como `1.0` e `aprovado`. Recalcular tamanhos e hashes com o comando da Task 5.

- [ ] **Step 4: Repetir validação integral**

Executar todos os comandos da Task 6.

Expected: todas as validações passam.

- [ ] **Step 5: Commit**

```powershell
git add docs/constituicao
git commit -m "docs: aprova constituição consolidada do SIGA"
git push
```

- [ ] **Step 6: Integrar somente após confirmação**

Confirmar que o PR está sem conflitos e que a aprovação humana foi registrada. Fazer merge sem eliminar o histórico dos commits.
