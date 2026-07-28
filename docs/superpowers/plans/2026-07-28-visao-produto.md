# Visão do Produto do SIGA — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar, revisar e aprovar a Visão do Produto do SIGA como primeiro documento estruturante previsto no Art. 82 da Constituição.

**Architecture:** Um único documento Markdown combinará uma camada executiva para auditores e futuros clientes com uma camada estratégica para desenvolvimento e agentes. O conteúdo será derivado exclusivamente da Constituição e de seus documentos constitucionais, permanecendo desacoplado de arquitetura, modelo de domínio, glossário e código.

**Tech Stack:** Markdown UTF-8, YAML front matter, wikilinks compatíveis com Obsidian, Git e GitHub.

## Global Constraints

- Criar somente `docs/estruturantes/01_VISAO_DO_PRODUTO.md` antes da aprovação humana.
- Não alterar a Constituição nem os quinze documentos constitucionais.
- Não criar o Glossário, a Arquitetura, o Modelo de Domínio, o Modelo de Dados, SDDs ou código.
- Não criar uma seção autônoma denominada “Proposta de valor”.
- Distinguir expressamente produto inicial/MVP e visão futura.
- Não transformar visão futura em escopo aprovado do MVP.
- Não inventar regras metodológicas, compromissos comerciais, funcionalidades ou metas numéricas.
- Utilizar linguagem compreensível para auditores e futuros clientes, com precisão suficiente para desenvolvimento e agentes.
- Manter Markdown compreensível no GitHub sem depender de plugins do Obsidian.
- A versão `0.9` deverá permanecer `em-revisao` até aprovação humana expressa.
- A promoção para `1.0` e a integração à `main` somente ocorrerão após aprovação humana.

---

### Task 1: Criar a Visão do Produto versão 0.9

**Files:**
- Create: `docs/estruturantes/01_VISAO_DO_PRODUTO.md`

**Interfaces:**
- Consumes: Constituição 1.0 e documentos constitucionais aprovados.
- Produces: `SIGA-PRD-001`, fonte estratégica para Glossário, Arquitetura, Modelo de Domínio e Roadmap.

- [ ] **Step 1: Ler as fontes obrigatórias**

Ler integralmente:

```text
docs/constituicao/00_CONSTITUICAO_DO_SIGA.md
docs/constituicao/01_IDENTIDADE_E_FINALIDADE.md
docs/constituicao/04_ESTRUTURA_FUNCIONAL.md
docs/constituicao/09_REGRAS_DE_NEGOCIO_E_METODOLOGIA.md
docs/constituicao/13_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md
docs/constituicao/15_DISPOSICOES_FINAIS.md
docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md
docs/superpowers/specs/2026-07-28-visao-produto-design.md
```

Registrar no relatório de execução as fontes efetivamente consultadas.

- [ ] **Step 2: Criar o diretório e o YAML**

Criar o arquivo com este front matter:

```yaml
---
id: SIGA-PRD-001
title: Visão do Produto do SIGA
aliases:
  - Visão do Produto
  - Visão Estratégica do SIGA
type: documento-estruturante
domain: produto
status: em-revisao
version: 0.9
created: 2026-07-28
updated: 2026-07-28
owner: responsavel-projeto
audience:
  - auditor
  - gestor
  - futuro-cliente
  - desenvolvedor
  - agente-ia
obsidian:
  note_type: product-vision
  graph_role: strategic
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Identidade e Finalidade do SIGA]]"
  - "[[Estrutura Funcional do SIGA]]"
  - "[[Roadmap, Evolução e Continuidade do SIGA]]"
  - "[[Glossário do SIGA]]"
tags:
  - siga
  - produto
  - visao
  - estrategia
---
```

- [ ] **Step 3: Escrever o resumo executivo**

O resumo deverá explicar, em linguagem não técnica:

- o que é o SIGA;
- que problema de fragmentação ele enfrenta;
- que o sistema representa o fluxo metodológico da auditoria;
- que rastreabilidade, julgamento profissional, revisão e conhecimento são centrais;
- que o produto será desenvolvido progressivamente.

Limite recomendado: seis parágrafos curtos.

- [ ] **Step 4: Escrever propósito, problema e públicos**

Criar:

```markdown
## Propósito do SIGA
## Problema que o produto resolve
## Públicos
```

Os públicos deverão incluir:

- firmas e equipes de auditoria de pequeno e médio porte;
- sócios e responsáveis técnicos;
- gestores, supervisores, auditores, assistentes e revisores;
- administradores;
- clientes auditados com acesso limitado;
- especialistas autorizados.

Não criar a seção “Proposta de valor”.

- [ ] **Step 5: Escrever princípios, diferenciais e experiência**

Criar:

```markdown
## Princípios e diferenciais
## Experiência esperada dos usuários
```

Cobrir:

- metodologia antes da tecnologia;
- rastreabilidade;
- julgamento profissional;
- documentação suficiente;
- revisão independente;
- simplicidade progressiva;
- modularidade;
- base de conhecimento;
- segurança e isolamento multiempresa;
- continuidade entre pessoas, agentes e ferramentas.

A experiência deverá ser descrita por público, sem especificar telas ainda inexistentes.

- [ ] **Step 6: Separar produto inicial e visão futura**

Criar:

```markdown
## Produto inicial e MVP
## Visão futura
```

O MVP deverá representar o ciclo principal:

```text
Organização usuária
→ Cliente
→ Trabalho de auditoria
→ Planejamento
→ Riscos
→ Procedimentos
→ Solicitações
→ Documentos recebidos
→ Evidências
→ Papéis de trabalho
→ Achados
→ Revisão
→ Relatório final
```

A visão futura poderá mencionar:

- novos segmentos;
- integrações;
- qualidade e auditoria dos pares;
- treinamento;
- agentes assistivos;
- consultoria;
- base de regulamentações interligada.

Declarar que esses itens não integram automaticamente o MVP.

- [ ] **Step 7: Definir limites, resultados e riscos**

Criar:

```markdown
## Limites e itens fora do escopo
## Resultados e indicadores de sucesso
## Riscos estratégicos
```

Fora do escopo:

- substituir julgamento profissional;
- emitir opinião automaticamente;
- funcionar como ERP contábil do cliente;
- implementar todas as integrações no MVP;
- prometer agentes autônomos para decisões críticas.

Indicadores qualitativos:

- adoção do fluxo completo;
- rastreabilidade;
- qualidade documental;
- redução de controles paralelos;
- capacidade de revisão;
- continuidade;
- compreensão e satisfação dos usuários.

Riscos estratégicos:

- crescimento como colcha de retalhos;
- automação antes da metodologia;
- expansão prematura do MVP;
- divergência entre documentação e sistema;
- dependência de ferramenta específica;
- acesso inadequado a dados;
- treinamento insuficiente.

- [ ] **Step 8: Relacionar a Constituição e os próximos documentos**

Criar:

```markdown
## Relação com a Constituição
## Próximos documentos
```

Relacionar a Visão aos Arts. 1–15, 20–24, 32–44, 45–53, 54–58, 66–82, sem reproduzir integralmente os artigos.

Listar como próximos documentos:

1. [[Glossário do SIGA]];
2. [[Arquitetura do Sistema]];
3. [[Modelo de Domínio do SIGA]];
4. [[Metodologia de Auditoria]];
5. [[Regras de Negócio]];
6. [[Estratégia de Conhecimento e Treinamento]];
7. [[Guia de Conteúdo]];
8. [[Padrões de Apresentação]];
9. [[Roadmap do MVP]];
10. [[Situação do Projeto]].

O Glossário será tratado como documento auxiliar de harmonização antes dos demais detalhamentos.

- [ ] **Step 9: Criar o material educacional**

Criar:

```markdown
## Material para apresentações e treinamento
### Objetivos de aprendizagem
### Conceitos-chave
### Roteiro sugerido para apresentação
### Estudo de caso
### Perguntas para discussão
### Questões de avaliação
```

O roteiro deverá permitir adaptação para auditores e futuros clientes.

- [ ] **Step 10: Registrar o histórico**

Adicionar:

```markdown
## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.9 | 2026-07-28 | Criação da versão inicial para revisão | Em revisão |
```

- [ ] **Step 11: Validar a versão 0.9**

Executar:

```powershell
$path = "docs/estruturantes/01_VISAO_DO_PRODUTO.md"
$text = Get-Content -LiteralPath $path -Raw -Encoding UTF8

@(
  "id: SIGA-PRD-001",
  "status: em-revisao",
  "version: 0.9",
  "## Resumo executivo",
  "## Propósito do SIGA",
  "## Problema que o produto resolve",
  "## Públicos",
  "## Princípios e diferenciais",
  "## Experiência esperada dos usuários",
  "## Produto inicial e MVP",
  "## Visão futura",
  "## Limites e itens fora do escopo",
  "## Resultados e indicadores de sucesso",
  "## Riscos estratégicos",
  "## Relação com a Constituição",
  "## Próximos documentos",
  "## Material para apresentações e treinamento",
  "## Histórico de alterações"
) | ForEach-Object {
  if ($text -notmatch [regex]::Escape($_)) {
    throw "Conteúdo obrigatório ausente: $_"
  }
}

if ($text -match "(?mi)^##\s+Proposta de valor\s*$") {
  throw "Seção autônoma não autorizada: Proposta de valor"
}
```

Executar também:

```powershell
git diff --check
rg -n "TBD|TODO|a definir|placeholder" docs/estruturantes/01_VISAO_DO_PRODUTO.md
rg -n "gho_[A-Za-z0-9]+|sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY" docs/estruturantes
```

Esperado:

- validação PowerShell sem exceção;
- `git diff --check` sem saída;
- buscas sem resultados.

- [ ] **Step 12: Commit da versão para revisão**

```powershell
git add docs/estruturantes/01_VISAO_DO_PRODUTO.md
git commit -m "docs: cria visão do produto do SIGA"
```

- [ ] **Step 13: Interromper para aprovação humana**

Apresentar:

- link local do arquivo;
- commit;
- resumo das fontes;
- validações executadas;
- eventuais decisões editoriais.

Não promover para `1.0`, não atualizar a Matriz e não enviar à `main` antes da aprovação.

---

### Task 2: Promover e publicar a Visão do Produto

**Files:**
- Modify: `docs/estruturantes/01_VISAO_DO_PRODUTO.md`
- Modify: `docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md`

**Interfaces:**
- Consumes: aprovação humana expressa da versão 0.9.
- Produces: Visão do Produto 1.0 integrada ao mapa documental.

- [ ] **Step 1: Registrar a aprovação**

No YAML da Visão:

```yaml
status: aprovado
version: 1.0
updated: <data real da aprovação>
```

No histórico, substituir a situação de `0.9` por `Substituída` e adicionar:

```markdown
| 1.0 | <data real da aprovação> | Primeira versão aprovada da Visão do Produto | Aprovada |
```

- [ ] **Step 2: Atualizar a Matriz Mestra**

Na seção “Navegação para a próxima camada”, assegurar que o primeiro link seja:

```markdown
- [[Visão do Produto do SIGA]]
```

Preservar todos os demais links e conteúdos.

- [ ] **Step 3: Validar a versão aprovada**

Executar:

```powershell
rg -n "^status: aprovado$|^version: 1\\.0$|\\[\\[Visão do Produto do SIGA\\]\\]" docs/estruturantes/01_VISAO_DO_PRODUTO.md docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md
git diff --check
```

Esperado:

- status e versão encontrados na Visão;
- link encontrado na Matriz;
- nenhuma falha de whitespace.

- [ ] **Step 4: Commit da aprovação**

```powershell
git add docs/estruturantes/01_VISAO_DO_PRODUTO.md docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md
git commit -m "docs: aprova visão do produto do SIGA"
```

- [ ] **Step 5: Publicar para integração**

```powershell
git push -u origin docs/visao-produto
```

Abrir pull request para `main` com:

```text
docs: adiciona visão do produto do SIGA
```

O corpo deverá registrar:

- versão 1.0 aprovada;
- fontes constitucionais;
- estrutura híbrida;
- validações;
- ausência de alterações em regras constitucionais.

- [ ] **Step 6: Integrar após confirmação**

Confirmar que:

- o PR está sem conflitos;
- a branch remota corresponde ao commit revisado;
- a aprovação humana está registrada;
- somente os arquivos previstos foram alterados.

Fazer merge preservando o histórico dos commits.
