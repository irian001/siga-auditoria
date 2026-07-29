# Modelo de Dados do SIGA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produzir o documento estruturante único `04_MODELO_DE_DADOS_DO_SIGA.md`, com tabelas, campos, chaves, relacionamentos e regras de integridade suficientes para orientar futuras SDDs e a implantação posterior no Supabase.

**Architecture:** O documento traduzirá o Modelo de Domínio em um modelo relacional lógico organizado por domínios. O bloco contábil aceitará formatos setoriais distintos por meio de lotes importados, linhas preservadas, contas do cliente, planos referenciais versionados e mapeamentos, sem incorporar dados reais nem regras específicas do importador.

**Tech Stack:** Markdown, YAML front matter, wikilinks do Obsidian, Git e verificações textuais.

## Global Constraints

- Criar um único documento estruturante em `docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md`.
- Não criar SQL, migrations, tabelas reais, políticas RLS executáveis ou credenciais.
- Não alterar os documentos constitucionais, a Visão do Produto, o Glossário ou o Modelo de Domínio.
- Preservar a separação entre instrução, solicitação, documento recebido, evidência e papel de trabalho.
- Explicitar isolamento multiempresa, histórico, versionamento, exclusão lógica e rastreabilidade.
- Distinguir núcleo do MVP de extensões futuras.
- Tratar o balancete analisado apenas como referência estrutural do setor elétrico.
- Não copiar nomes, saldos, códigos empresariais ou outros dados reais do CSV para o repositório.

---

### Task 1: Consolidar fontes e vocabulário

**Files:**
- Read: `docs/constituicao/00_CONSTITUICAO_DO_SIGA.md`
- Read: `docs/constituicao/04_ESTRUTURA_FUNCIONAL.md`
- Read: `docs/constituicao/05_ARQUITETURA_TECNOLOGICA.md`
- Read: `docs/constituicao/09_REGRAS_DE_NEGOCIO_E_METODOLOGIA.md`
- Read: `docs/constituicao/10_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md`
- Read: `docs/estruturantes/02_GLOSSARIO_DO_SIGA.md`
- Read: `docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md`
- Read: `docs/superpowers/specs/2026-07-28-modelo-dados-siga-design.md`

**Interfaces:**
- Consumes: documentos oficiais aprovados e o desenho aprovado.
- Produces: relação controlada de entidades, termos, estados e relações que deverão aparecer no Modelo de Dados.

- [ ] **Step 1: Identificar os títulos e IDs das entidades**

Executar:

```powershell
rg -n "^#|^##|id:|\\[\\[" docs/estruturantes/02_GLOSSARIO_DO_SIGA.md docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md
```

Resultado esperado: lista dos conceitos e relações oficiais, sem alteração dos arquivos.

- [ ] **Step 2: Identificar regras transversais**

Executar:

```powershell
rg -n "multiempresa|organization_id|histórico|exclusão lógica|evidência|papel de trabalho|rastreabilidade|versão" docs/constituicao docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md
```

Resultado esperado: referências para segurança, histórico, documentação e cadeia metodológica.

- [ ] **Step 3: Confirmar que a referência setorial não está no repositório**

Executar:

```powershell
rg --files | rg "Balanço-Balancete|Balanco-Balancete|CEJAMA"
```

Resultado esperado: nenhuma ocorrência.

### Task 2: Redigir o Modelo de Dados

**Files:**
- Create: `docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md`

**Interfaces:**
- Consumes: entidades, relações e regras consolidadas na Task 1.
- Produces: documento lógico oficial para orientar SDDs, modelo físico e migrations futuras.

- [ ] **Step 1: Criar YAML e estrutura documental**

O cabeçalho deverá declarar:

```yaml
id: SIGA-DAT-001
title: Modelo de Dados do SIGA
aliases:
  - Modelo de Dados
  - Esquema de Dados do SIGA
type: documento-estruturante
domain: dados
status: em-revisao
version: 0.9
created: 2026-07-28
updated: 2026-07-28
owner: responsavel-projeto
```

Incluir `audience`, `sources`, `related`, `tags` e propriedades do Obsidian coerentes com os demais documentos estruturantes.

- [ ] **Step 2: Definir convenções e campos transversais**

Documentar UUIDs, tipos lógicos, nomes físicos em `snake_case`, campos de organização, criação, atualização, autoria, exclusão lógica, estado e versão.

- [ ] **Step 3: Definir o mapa relacional resumido**

Incluir um fluxo textual que conecte:

```text
organização → cliente → trabalho → planejamento → balancete → contas
→ riscos → procedimentos → solicitações → documentos → evidências
→ papéis de trabalho → achados → conclusões → relatório
```

- [ ] **Step 4: Detalhar tabelas do núcleo organizacional**

Para cada tabela, informar finalidade, campos, tipo lógico, obrigatoriedade, PK, FKs, unicidade, índices, exclusão lógica e situação no MVP:

```text
organizations
user_profiles
organization_memberships
roles
permissions
role_permissions
membership_roles
```

- [ ] **Step 5: Detalhar clientes, segmentos e trabalhos**

Cobrir:

```text
clients
economic_segments
client_segments
acceptance_assessments
audit_engagements
engagement_periods
engagement_team_members
engagement_roles
engagement_plans
```

- [ ] **Step 6: Detalhar o domínio contábil e importações**

Cobrir separadamente:

```text
trial_balance_imports
trial_balance_import_rows
client_accounts
reference_chart_versions
reference_accounts
account_mappings
account_groups
```

Registrar que:

- o arquivo original é preservado por referência a um arquivo controlado;
- cada importação pertence a organização, cliente, trabalho e período;
- linhas brutas e valores normalizados permanecem distinguíveis;
- contas sintéticas e analíticas e sua hierarquia são preservadas;
- planos referenciais podem variar por segmento e versão;
- ANEEL, COSIF e outros referenciais serão parametrizados, não embutidos;
- formatos, colunas e validações específicas pertencem aos SDDs de importação.

- [ ] **Step 7: Detalhar metodologia e execução**

Cobrir:

```text
business_processes
engagement_processes
risks
engagement_risks
controls
risk_controls
audit_programs
audit_procedures
procedure_risks
audit_samples
sample_items
```

- [ ] **Step 8: Detalhar solicitações, documentos e evidências**

Cobrir:

```text
evidence_instruction_templates
document_request_templates
document_requests
document_request_items
received_documents
evidence_items
evidence_links
stored_files
file_versions
```

Preservar distinções conceituais e versões apresentadas ao cliente.

- [ ] **Step 9: Detalhar papéis, revisão e resultados**

Cobrir:

```text
working_papers
working_paper_links
review_notes
review_actions
findings
recommendations
area_conclusions
audit_reports
report_items
action_plans
```

- [ ] **Step 10: Detalhar histórico e extensões**

Cobrir tabelas transversais:

```text
status_history
audit_events
entity_versions
comments
notifications
```

Separar qualidade, comercial, integrações, indicadores e agentes como extensões futuras.

- [ ] **Step 11: Documentar integridade e ordem de implantação**

Incluir regras para isolamento por organização, integridade referencial, relações N:N, unicidade contextual, imutabilidade após aprovação, reabertura, exclusão lógica e sequência futura de implantação no Supabase.

- [ ] **Step 12: Adicionar navegação, material educacional e histórico**

Incluir wikilinks para Constituição, Matriz Mestra, Glossário e Modelo de Domínio, além de objetivos de aprendizagem, conceitos-chave, roteiro de apresentação e histórico da versão `0.9`.

### Task 3: Verificar consistência documental

**Files:**
- Verify: `docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md`

**Interfaces:**
- Consumes: documento produzido na Task 2.
- Produces: minuta pronta para revisão humana.

- [ ] **Step 1: Verificar placeholders e conteúdo proibido**

Executar:

```powershell
rg -n "TODO|TBD|preencher depois|CREATE TABLE|ALTER TABLE|CREATE POLICY|CEJAMA" docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md
```

Resultado esperado: nenhuma ocorrência.

- [ ] **Step 2: Verificar cobertura estrutural**

Executar:

```powershell
rg -n "organization_id|trial_balance_imports|reference_chart_versions|evidence_items|working_papers|audit_events|MVP|Extensões futuras" docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md
```

Resultado esperado: todos os conceitos encontrados.

- [ ] **Step 3: Verificar links e formatação**

Executar:

```powershell
rg -n "\\[\\[Constituição do SIGA\\]\\]|\\[\\[Matriz Mestra da Constituição do SIGA\\]\\]|\\[\\[Glossário do SIGA\\]\\]|\\[\\[Modelo de Domínio do SIGA\\]\\]" docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md
git diff --check
```

Resultado esperado: quatro relações oficiais presentes e nenhum erro de whitespace.

- [ ] **Step 4: Revisar o diff**

Executar:

```powershell
git diff -- docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md
```

Resultado esperado: somente o novo documento, sem dados reais e sem alterações em arquivos aprovados.

- [ ] **Step 5: Criar commit da minuta**

Executar:

```powershell
git add docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md
git commit -m "docs: adiciona modelo de dados do SIGA"
```

Resultado esperado: commit contendo apenas o documento estruturante.

