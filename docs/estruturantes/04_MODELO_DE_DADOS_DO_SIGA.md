---
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
audience:
  - auditor
  - gestor
  - desenvolvedor
  - agente-ia
obsidian:
  note_type: data-model
  graph_role: data-hub
  backlinks_expected: true
  dataview_ready: true
sources:
  - "[[Constituição do SIGA]] (v1.0)"
  - "[[Estrutura Funcional do SIGA]] (v1.0)"
  - "[[Arquitetura Tecnológica do SIGA]] (v1.0)"
  - "[[Regras de Negócio e Metodologia de Auditoria]] (v1.0)"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]] (v1.0)"
  - "[[Glossário do SIGA]] (v1.0)"
  - "[[Modelo de Domínio do SIGA]] (v1.0)"
  - "[[Desenho — Modelo de Dados do SIGA]] (2026-07-28)"
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Glossário do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Regras de Negócio e Metodologia de Auditoria]]"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]]"
tags:
  - siga
  - modelo-de-dados
  - dados
  - rastreabilidade
  - multiempresa
  - em-revisao
---

# Modelo de Dados do SIGA

## Navegação

- [[Constituição do SIGA]]
- [[Glossário do SIGA]]
- [[Modelo de Domínio do SIGA]]
- [[Regras de Negócio e Metodologia de Auditoria]]
- [[Dados, Segurança, Privacidade e Histórico do SIGA]]

## 1. Finalidade, escopo e limites

Este documento traduz o [[Modelo de Domínio do SIGA]] para um modelo relacional lógico único. Ele orienta SDDs, modelo físico e migrations futuras, preservando a metodologia, a rastreabilidade e o isolamento multiempresa. Nomes físicos são propostas estáveis para discussão técnica; não são DDL nem criam tabelas, políticas RLS, migrations, credenciais ou decisões executáveis.

O escopo cobre o fluxo central do SIGA: organização, cliente, trabalho, planejamento, balancete, riscos, controles, procedimentos, solicitações, instruções, documentos recebidos, evidências, papéis de trabalho, achados, revisão, conclusões, relatório e histórico. O modelo não substitui o Glossário, não cria regras de negócio, não encerra pendências de cardinalidade ou estados e não autoriza alterar fontes aprovadas.

Por decisão humana registrada em 2026-07-28, `action_plans` é **Extensão futura** e fica fora do núcleo MVP. A decisão resolve, para este modelo, a divergência anteriormente registrada entre as fontes sem alterar os documentos aprovados. A ficha permanece para orientar especificação futura, mas não autoriza antecipação no núcleo.

Nenhum CSV, nome de cliente, código empresarial, saldo, conta real ou outro dado real foi consultado ou incorporado. O balancete mencionado é apenas referência conceitual do setor elétrico.

## 2. Convenções de modelagem, tipos lógicos e campos transversais

### 2.1 Convenções

- Nomes físicos estão em `snake_case`, no plural, e usam UUID como chave primária lógica, salvo decisão futura documentada.
- `Obrigatório` significa obrigatório no registro lógico normal; condicionais dependem do contexto expresso pela fonte e serão fechados em SDD.
- Tabelas associativas representam relações N:N. Chaves estrangeiras entre objetos de contexto organizacional devem preservar a mesma `organization_id`.
- Os campos abaixo são parte de cada ficha. Para evitar repetição, são apresentados uma vez; a coluna “campos próprios” de cada tabela soma-se a eles quando aplicável.
- “Situação” usa `MVP` ou `Extensão futura` conforme a decisão de escopo vigente. Estados de negócio não são enumerados universalmente.
- Colunas alternativas de destino são FKs explícitas e anuláveis. Toda ficha que as utiliza exige **exatamente uma** preenchida; zero ou mais de uma são inválidos.

### 2.2 Tipos lógicos

| Tipo lógico | Uso |
|---|---|
| `uuid` | identificador técnico e referência estável |
| `texto curto` | código, nome, título, estado ou classificação controlada por SDD |
| `texto longo` | descrição, fundamentação, conteúdo ou observação |
| `booleano` | indicador verdadeiro/falso, sem substituir estado |
| `inteiro` | sequência, ordem ou quantidade |
| `decimal` | valor financeiro, quantitativo ou parâmetro mensurável |
| `data` | data de competência, prazo, vigência ou referência |
| `data_hora` | instante rastreável |
| `json estruturado` | conteúdo configurável que precisa de estrutura, sujeito a SDD |
| `hash` | identificador de integridade de conteúdo |

### 2.3 Campos transversais

| Campo | Tipo | Obrigatório | Aplicação e regra |
|---|---|---:|---|
| `id` | uuid | Sim | PK de toda tabela persistida. |
| `organization_id` | uuid | Sim, quando o dado pertence a uma firma | FK para `organizations`; integra o isolamento e as chaves compostas contextuais. Referências de plataforma somente podem omiti-lo após decisão documentada. |
| `created_at`, `updated_at` | data_hora | Sim | Registro técnico de criação e atualização. |
| `created_by_user_profile_id`, `updated_by_user_profile_id` | uuid | Sim, quando houver atuação identificável | FKs explícitas para `user_profiles`; preservam os atores técnicos sem substituir eventos. |
| `deleted_at`, `deleted_by_user_profile_id` | data_hora, uuid | Quando aplicável | Exclusão lógica e FK explícita do ator para `user_profiles`; não são usadas para apagar fato metodológico ou histórico. |
| `status` | texto curto | Quando aplicável | Estado próprio do conceito, definido por SDD; não existe catálogo universal aprovado. |
| `classification` | texto curto | Quando aplicável | Classificação pública, interna, restrita, confidencial ou cliente específico, conforme fonte constitucional. |

## 3. Isolamento multiempresa e segurança

`organizations` delimita a empresa de auditoria usuária. Clientes, trabalhos, registros metodológicos, arquivos, eventos e vínculos devem carregar `organization_id` quando pertencentes a uma firma. Uma FK ou associação entre registros de organizações distintas é inválida; o modelo físico deverá reforçar isso por chaves contextuais e testes diretos, além das políticas de autorização futuras. Filtro de interface não é controle suficiente.

Autenticação não é representada como repositório de credenciais neste modelo. `user_profiles`, memberships, papéis organizacionais e funções no trabalho compõem contexto de autorização com estado, confidencialidade, responsabilidade e segregação. Contas compartilhadas, credenciais no repositório e acesso administrativo irrestrito são proibidos pelas fontes.

Arquivos e links temporários são controlados por contexto, destinatário, finalidade, prazo, revogação e eventos. A posse do endereço não é autorização. Dados pessoais são minimizados; retenção e exclusão física dependem de avaliação de contrato, norma, litígio, investigação e finalidade.

## 4. Mapa relacional resumido

```text
organizations → organization_memberships ← user_profiles
organization_memberships → membership_roles → roles → role_permissions ← permissions

organizations → clients → audit_engagements → engagement_periods → engagement_plans
                                   ├→ engagement_team_members → engagement_roles
                                   ├→ trial_balance_imports → trial_balance_import_rows → client_accounts
                                   │                                      ├→ account_mappings → reference_accounts
                                   │                                      └→ account_group_client_accounts ← account_groups
                                   │                                                                    → account_group_reference_accounts
                                   ├→ engagement_processes → engagement_risks → risk_controls
                                   │                         └→ procedure_risks ← audit_procedures ← audit_programs
                                   │                                                        └→ audit_samples → sample_items
                                   ├→ document_requests → document_request_items → received_documents → received_document_files → file_versions
                                   │                                                └→ evidence_items
                                   │                         ↕ evidence_instruction_templates          ↕ evidence_links
                                   ├→ working_papers → working_paper_links ← evidence_items
                                   │                  └→ review_notes → review_actions
                                   └→ findings → recommendations; area_conclusions → audit_reports → report_items

stored_files → file_versions → received_document_files / evidence_links / working_paper_links
status_history, audit_events, entity_versions, comments e notifications registram contexto transversal.
```

O mapa mostra dependências lógicas, não suficiência automática de auditoria. O percurso direto e reverso deve permitir reconstruir origem, tratamento, responsável e resultado.

## 5. Tabelas organizacionais e de acesso

### `organizations`

**Finalidade e situação.** Organização usuária que delimita a firma de auditoria; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `legal_name`, `display_name` | texto curto | Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; não possui FK organizacional. `legal_name` não recebe regra de unicidade global sem decisão documental. **Índices:** `status`; busca por `display_name`. **Preservação:** inativação, nunca eliminação do histórico derivado. **Integridade:** é distinta de cliente; uma organização inativa não rompe vínculos históricos.

### `user_profiles`

**Finalidade e situação.** Pessoa identificada que atua no SIGA; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `auth_subject` | texto curto | Sim |
| `display_name` | texto curto | Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; `auth_subject` é identidade externa, não credencial. Único em `auth_subject`. **Índices:** `auth_subject`, `status`. **Preservação:** inativação mantém autoria e eventos. **Integridade:** não admite conta compartilhada e não implica acesso sem membership.

### `organization_memberships`

**Finalidade e situação.** Vínculo de usuário e organização, separado para cada firma; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `user_profile_id` | uuid | Sim |
| `active_from`, `active_to` | data | `active_from`: Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FKs para `organizations` e `user_profiles`; único por combinação de organização, usuário e intervalo de vigência definido em SDD. **Índices:** `organization_id, status`; `user_profile_id`. **Preservação:** encerramento/inativação, sem apagar atuação anterior. **Integridade:** um usuário pode ter memberships distintos; o vínculo ativo condiciona papéis e autorização.

### `roles`

**Finalidade e situação.** Perfil geral aplicável no contexto da organização; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id` | uuid | Sim |
| `code`, `name`, `description` | texto curto, texto curto, texto longo | `code`, `name`: Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK para `organizations`; único `organization_id, code`. **Índices:** `organization_id, status`. **Preservação:** inativação. **Integridade:** perfil geral não substitui função no trabalho nem responsabilidade por item.

### `permissions`

**Finalidade e situação.** Permissão atômica para compor autorizações; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `code`, `name`, `description` | texto curto, texto curto, texto longo | `code`, `name`: Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; sem FK organizacional até decisão sobre catálogo global ou por firma. Único por `code`. **Índices:** `status`. **Preservação:** inativação. **Integridade:** representa permissão, não decisão final de acesso.

### `role_permissions`

**Finalidade e situação.** Associação N:N entre perfil geral e permissão; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `role_id`, `permission_id` | uuid | Sim |

**PK, FKs e unicidade.** PK `id`; FKs para `organizations`, `roles`, `permissions`; único `organization_id, role_id, permission_id`. **Índices:** `organization_id, role_id`; `permission_id`. **Preservação:** exclusão lógica se a concessão precisar ser historicamente visível; alterações relevantes geram evento. **Integridade:** o papel pertence à organização informada; a concessão não autoriza acesso fora do membership e contexto autorizado.

### `membership_roles`

**Finalidade e situação.** Associação de perfil geral a um membership; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `membership_id`, `role_id` | uuid | Sim |
| `active_from`, `active_to` | data | `active_from`: Sim |

**PK, FKs e unicidade.** PK `id`; FKs para `organizations`, `organization_memberships`, `roles`; único por organização, vínculo, papel e vigência definida em SDD. **Índices:** `organization_id, membership_id`; `role_id`. **Preservação:** encerramento/inativação. **Integridade:** role e membership devem pertencer à mesma organização.

## 6. Clientes, segmentos, aceitação, trabalhos, equipes, períodos e planejamento

### `clients`

**Finalidade e situação.** Cliente auditado ou atendido no contexto de uma organização; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id` | uuid | Sim |
| `display_name` | texto curto | Sim |
| `status`, `classification` | texto curto, texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK para `organizations`; unicidade de identificador de cliente depende de SDD e minimização de dados. **Índices:** `organization_id, status`; `display_name`. **Preservação:** inativação/exclusão lógica sem apagar trabalhos. **Integridade:** cliente não é organização; não existe identidade compartilhada entre firmas sem decisão posterior.

### `economic_segments`

**Finalidade e situação.** Segmento econômico usado para especialização metodológica; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id` | uuid | Condicional |
| `code`, `name`, `description` | texto curto, texto curto, texto longo | `code`, `name`: Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK condicional para `organizations`; único no escopo de titularidade definido em SDD. **Índices:** `organization_id, status`; `code`. **Preservação:** inativação. **Integridade:** a titularidade plataforma/organização permanece pendente; não se presume compartilhamento entre firmas.

### `client_segments`

**Finalidade e situação.** Associação versionável entre cliente e segmento; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `client_id`, `economic_segment_id` | uuid | Sim |
| `valid_from`, `valid_to` | data | `valid_from`: Sim |

**PK, FKs e unicidade.** PK `id`; FKs para `clients`, `economic_segments`; único por cliente, segmento e vigência definida em SDD. **Índices:** `client_id`; `economic_segment_id`. **Preservação:** encerramento de vigência. **Integridade:** cliente e segmento organizacional devem compartilhar contexto.

### `acceptance_assessments`

**Finalidade e situação.** Registro de aceitação ou continuidade que antecede ou condiciona o trabalho; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `client_id` | uuid | Sim |
| `assessment_type`, `assessment_date` | texto curto, data | Sim |
| `status`, `rationale` | texto curto, texto longo | Sim |

**PK, FKs e unicidade.** PK `id`; FKs para `organizations`, `clients`; unicidade por cliente, tipo e contexto temporal a definir em SDD. **Índices:** `client_id, assessment_date`; `status`. **Preservação:** histórico/versionamento; não sobrescrever avaliação aplicada. **Integridade:** a avaliação não substitui independência, que requer especificação própria.

### `audit_engagements`

**Finalidade e situação.** Trabalho de auditoria individual; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `client_id` | uuid | Sim |
| `code`, `title`, `scope` | texto curto, texto curto, texto longo | `code`, `title`: Sim |
| `status`, `classification` | texto curto, texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FKs para `organizations`, `clients`; único `organization_id, code`. **Índices:** `organization_id, client_id, status`; `code`. **Preservação:** encerramento e arquivamento controlado. **Integridade:** cliente pertence à mesma organização; trabalho não confunde modelo referencial com decisão efetiva.

### `engagement_periods`

**Finalidade e situação.** Período aplicável ao trabalho e seus objetos contextualizados; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `start_date`, `end_date` | data | Sim |
| `label`, `status` | texto curto, texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK para `audit_engagements`; único por trabalho e intervalo de referência definido em SDD. **Índices:** `engagement_id, start_date, end_date`. **Preservação:** não reescrever período utilizado em importação ou emissão. **Integridade:** `start_date` não pode ser posterior a `end_date`.

### `engagement_roles`

**Finalidade e situação.** Catálogo de funções no trabalho; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id` | uuid | Sim |
| `code`, `name`, `description` | texto curto, texto curto, texto longo | `code`, `name`: Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK para `organizations`; único `organization_id, code`. **Índices:** `organization_id, status`. **Preservação:** inativação. **Integridade:** função contextualiza atuação e não autoriza autorrevisão.

### `engagement_team_members`

**Finalidade e situação.** Vínculo de membership e função em trabalho; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `membership_id`, `engagement_role_id` | uuid | Sim |
| `active_from`, `active_to` | data | `active_from`: Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FKs para trabalho, membership e função; único por trabalho, membership, função e vigência definida em SDD. **Índices:** `engagement_id, status`; `membership_id`. **Preservação:** encerramento preserva a equipe histórica. **Integridade:** todos os objetos devem compartilhar organização; a segregação é avaliada no item quando aplicável.

### `engagement_plans`

**Finalidade e situação.** Planejamento versionável do trabalho; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id`, `engagement_period_id` | uuid | Sim |
| `strategy`, `scope`, `status` | texto longo, texto longo, texto curto | Sim |
| `version_number` | inteiro | Sim |

**PK, FKs e unicidade.** PK `id`; FKs para trabalho e período; único `engagement_id, version_number`. **Índices:** `engagement_id, status`; `engagement_period_id`. **Preservação:** versões utilizadas, revisadas ou aprovadas não são sobrescritas. **Integridade:** período pertence ao trabalho; materialidade, entendimento e decisões ainda exigem SDD para decomposição.

## 7. Balancetes, contas e planos referenciais versionados

### `trial_balance_imports`

**Finalidade e situação.** Lote de balancete com referência imutável ao arquivo original controlado; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `client_id`, `engagement_id`, `engagement_period_id` | uuid | Sim |
| `original_file_version_id` | uuid | Sim |
| `imported_at`, `status` | data_hora, texto curto | Sim |
| `source_description`, `validation_summary` | texto longo, json estruturado | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs para cliente, trabalho, período e `file_versions`; unicidade do lote depende de origem e período definidos em SDD. **Índices:** `engagement_id, engagement_period_id`; `client_id`; `status`. **Preservação:** não apagar nem substituir origem; nova carga cria novo lote. **Integridade:** todos os contextos compartilham organização; formato, colunas e validações específicas pertencem ao SDD de importação.

### `trial_balance_import_rows`

**Finalidade e situação.** Linhas brutas e normalizadas de uma importação, mantidas distinguíveis; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `trial_balance_import_id` | uuid | Sim |
| `source_row_number`, `raw_values` | inteiro, json estruturado | Sim |
| `normalized_account_code`, `normalized_description` | texto curto, texto longo | Condicional |
| `normalized_debit`, `normalized_credit`, `normalized_balance` | decimal | Condicional |
| `validation_status`, `validation_notes` | texto curto, texto longo | Sim |

**PK, FKs e unicidade.** PK `id`; FK para `trial_balance_imports`; único `trial_balance_import_id, source_row_number`. **Índices:** `trial_balance_import_id`; `normalized_account_code`. **Preservação:** append-only para a carga recebida; correção gera novo lote ou evento. **Integridade:** valores brutos não são confundidos com normalizados; não contém dados reais neste documento.

### `client_accounts`

**Finalidade e situação.** Conta do cliente preservando código, natureza e hierarquia recebidos; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `client_id` | uuid | Sim |
| `parent_account_id` | uuid | Condicional |
| `account_code`, `account_name`, `account_level` | texto curto, texto curto, inteiro | Sim |
| `account_kind`, `status` | texto curto, texto curto | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs para cliente e para a própria tabela; único `client_id, account_code`. **Índices:** `client_id, parent_account_id`; `account_code`. **Preservação:** inativação e histórico de vigência; sem reescrever estrutura de carga usada. **Integridade:** pai pertence ao mesmo cliente e organização; hierarquia preserva contas sintéticas e analíticas.

### `reference_chart_versions`

**Finalidade e situação.** Versão de plano de contas referencial por segmento; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `economic_segment_id` | uuid | Condicional |
| `code`, `version_label`, `effective_from`, `effective_to` | texto curto, texto curto, data, data | `code`, `version_label`, `effective_from`: Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK para segmento; único por plano, versão e titularidade definida em SDD. **Índices:** `economic_segment_id, status`; `effective_from, effective_to`. **Preservação:** versões aprovadas ou aplicadas não são alteradas silenciosamente. **Integridade:** ANEEL, COSIF e outros referenciais são parametrizações, nunca regras embutidas.

### `reference_accounts`

**Finalidade e situação.** Conta de plano referencial versionado; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `reference_chart_version_id`, `parent_reference_account_id` | uuid | `reference_chart_version_id`: Sim |
| `account_code`, `account_name`, `account_level` | texto curto, texto curto, inteiro | Sim |
| `account_kind`, `status` | texto curto, texto curto | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs para versão e própria tabela; único `reference_chart_version_id, account_code`. **Índices:** `reference_chart_version_id, parent_reference_account_id`; `account_code`. **Preservação:** a versão do plano é preservada. **Integridade:** pai pertence à mesma versão; a conta não é conta do cliente.

### `account_mappings`

**Finalidade e situação.** Mapeamento revisável entre conta do cliente e conta referencial; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `client_account_id`, `reference_account_id` | uuid | Sim |
| `engagement_id`, `engagement_period_id` | uuid | Condicional |
| `mapping_basis`, `status`, `rationale` | texto curto, texto curto, texto longo | `mapping_basis`, `status`: Sim |
| `valid_from`, `valid_to` | data | `valid_from`: Sim |

**PK, FKs e unicidade.** PK `id`; FKs para contas, trabalho e período; unicidade por conta do cliente, contexto e vigência a definir em SDD. **Índices:** `client_account_id, status`; `reference_account_id`; `engagement_id`. **Preservação:** substituição cria novo registro e evento. **Integridade:** sugestão não substitui validação profissional; versão referencial deve ser reconstruível pelo vínculo com a conta referencial.

### `account_groups`

**Finalidade e situação.** Agrupador metodológico de contas para planejamento e rastreabilidade; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id` | uuid | Sim |
| `engagement_id` | uuid | Condicional |
| `reference_chart_version_id` | uuid | Condicional |
| `code`, `name`, `description`, `status` | texto curto, texto curto, texto longo, texto curto | `code`, `name`, `status`: Sim |

**PK, FKs e unicidade.** PK `id`; FK obrigatória para `organizations` e FKs condicionais para trabalho e plano referencial; único no escopo da organização, trabalho ou versão definido em SDD. **Índices:** `organization_id, status`; `engagement_id`; `reference_chart_version_id`. **Preservação:** versionamento/inativação conforme contexto. **Integridade:** a composição é sempre explícita por `account_group_client_accounts` e/ou `account_group_reference_accounts`; o grupo e seus membros devem compartilhar `organization_id`, e referências aplicadas a trabalho devem respeitar o plano referencial versionado desse contexto.

### `account_group_client_accounts`

**Finalidade e situação.** Associação N:N entre grupo de contas e conta do cliente; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `account_group_id`, `client_account_id` | uuid | Sim |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para `organizations`, `account_groups` e `client_accounts`; único `organization_id, account_group_id, client_account_id`. **Índices:** `organization_id, account_group_id`; `organization_id, client_account_id`. **Preservação:** exclusão lógica ou encerramento do vínculo, com evento. **Integridade:** grupo e conta pertencem à mesma organização; quando o grupo estiver ligado a trabalho, a conta deve pertencer ao cliente desse trabalho.

### `account_group_reference_accounts`

**Finalidade e situação.** Associação N:N entre grupo de contas e conta referencial; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `account_group_id`, `reference_account_id` | uuid | Sim |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para `organizations`, `account_groups` e `reference_accounts`; único `organization_id, account_group_id, reference_account_id`. **Índices:** `organization_id, account_group_id`; `reference_account_id`. **Preservação:** exclusão lógica ou encerramento do vínculo, com evento. **Integridade:** se a conta referencial for organizacional, sua organização deve coincidir; sua `reference_chart_version_id` deve coincidir com a versão indicada pelo grupo, quando informada. Referencial de plataforma não autoriza vínculo entre dados de firmas diferentes.

## 8. Processos, riscos, controles, programas, procedimentos e amostras

### `business_processes`

**Finalidade e situação.** Processo reutilizável da base metodológica; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `economic_segment_id` | uuid | Condicional |
| `code`, `name`, `description`, `status` | texto curto, texto curto, texto longo, texto curto | `code`, `name`, `status`: Sim |
| `version_label` | texto curto | Condicional |

**PK, FKs e unicidade.** PK `id`; FK condicional para segmento; único no escopo de titularidade, versão e código definido em SDD. **Índices:** `economic_segment_id, status`; `code`. **Preservação:** versão/inativação. **Integridade:** processo referencial não se confunde com seleção no trabalho.

### `engagement_processes`

**Finalidade e situação.** Processo efetivamente aplicado ou avaliado no trabalho; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `business_process_id` | uuid | Condicional |
| `name`, `rationale`, `status` | texto curto, texto longo, texto curto | `name`, `status`: Sim |

**PK, FKs e unicidade.** PK `id`; FKs para trabalho e processo referencial; unicidade por trabalho e processo/identidade efetiva definida em SDD. **Índices:** `engagement_id, status`; `business_process_id`. **Preservação:** registro de seleção, adaptação ou descarte com justificativa. **Integridade:** não atualiza retrospectivamente o modelo referencial.

### `risks`

**Finalidade e situação.** Risco referencial reutilizável; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `business_process_id` | uuid | Condicional |
| `code`, `title`, `description`, `status` | texto curto, texto curto, texto longo, texto curto | `code`, `title`, `status`: Sim |
| `version_label` | texto curto | Condicional |

**PK, FKs e unicidade.** PK `id`; FK condicional para processo; único por escopo, versão e código definido em SDD. **Índices:** `business_process_id, status`; `code`. **Preservação:** versão/inativação. **Integridade:** risco referencial é modelo e não avaliação efetiva.

### `engagement_risks`

**Finalidade e situação.** Risco identificado e avaliado no trabalho; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `engagement_process_id`, `risk_id` | uuid | Condicional |
| `title`, `assessment`, `rationale`, `status` | texto curto, texto longo, texto longo, texto curto | `title`, `status`: Sim |

**PK, FKs e unicidade.** PK `id`; FKs para trabalho, processo efetivo e risco referencial; unicidade por identidade do risco no trabalho definida em SDD. **Índices:** `engagement_id, status`; `engagement_process_id`; `risk_id`. **Preservação:** mudanças de avaliação geram versão/evento. **Integridade:** seleção, adaptação ou descarte de referência exige fundamentação quando aplicável; risco relevante possui tratamento, sem inferir a forma única desse tratamento.

### `controls`

**Finalidade e situação.** Controle referencial reutilizável; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `business_process_id` | uuid | Condicional |
| `code`, `name`, `description`, `status` | texto curto, texto curto, texto longo, texto curto | `code`, `name`, `status`: Sim |

**PK, FKs e unicidade.** PK `id`; FK condicional para processo; único por escopo e código definidos em SDD. **Índices:** `business_process_id, status`; `code`. **Preservação:** versão/inativação. **Integridade:** controle não é evidência de operação efetiva.

### `risk_controls`

**Finalidade e situação.** Associação N:N entre risco do trabalho e controle aplicável; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_risk_id`, `control_id` | uuid | Sim |
| `rationale`, `status` | texto longo, texto curto | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs para risco do trabalho e controle; único `engagement_risk_id, control_id`. **Índices:** ambas as FKs. **Preservação:** histórico de vinculação. **Integridade:** contextos organizacionais devem coincidir; vínculo não prova resposta suficiente.

### `audit_programs`

**Finalidade e situação.** Programa de auditoria reutilizável; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `economic_segment_id` | uuid | Condicional |
| `code`, `name`, `description`, `version_label`, `status` | texto curto, texto curto, texto longo, texto curto, texto curto | `code`, `name`, `status`: Sim |

**PK, FKs e unicidade.** PK `id`; FK condicional para segmento; único por escopo, versão e código definido em SDD. **Índices:** `economic_segment_id, status`; `code`. **Preservação:** versão/inativação. **Integridade:** não altera programa aplicado em trabalho iniciado.

### `audit_procedures`

**Finalidade e situação.** Procedimento planejado ou executado no trabalho, com vínculo opcional ao modelo; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `audit_program_id` | uuid | Condicional |
| `code`, `title`, `description`, `status` | texto curto, texto curto, texto longo, texto curto | `title`, `status`: Sim |
| `planned_at`, `executed_at` | data_hora | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs para trabalho e programa; unicidade por trabalho e código se o código for adotado no SDD. **Índices:** `engagement_id, status`; `audit_program_id`; `executed_at`. **Preservação:** planejamento e execução permanecem distinguíveis, com eventos e versões. **Integridade:** procedimento planejado não equivale a executado; não se presume resposta suficiente.

### `procedure_risks`

**Finalidade e situação.** Associação N:N que documenta o procedimento como resposta a risco; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `audit_procedure_id`, `engagement_risk_id` | uuid | Sim |
| `coverage_note` | texto longo | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs para procedimento e risco; único `audit_procedure_id, engagement_risk_id`. **Índices:** ambas as FKs. **Preservação:** exclusão lógica/histórico. **Integridade:** procedimento e risco pertencem ao mesmo trabalho e organização.

### `audit_samples`

**Finalidade e situação.** Amostra documentada vinculada ao procedimento; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id`, `audit_procedure_id` | uuid | Sim |
| `objective`, `population_description`, `population_source` | texto longo, texto longo, texto longo | Sim |
| `method`, `size`, `selection_basis`, `conclusion`, `status` | texto curto, inteiro, texto longo, texto longo, texto curto | `method`, `status`: Sim |

**PK, FKs e unicidade.** PK `id`; FKs para trabalho e procedimento. **Índices:** `audit_procedure_id, status`; `engagement_id`. **Preservação:** alterações de seleção, exceção ou conclusão preservam versão/evento. **Integridade:** tamanho, quando informado, não é negativo; método, seleção e justificativa permanecem rastreáveis; não há percentual universal.

### `sample_items`

**Finalidade e situação.** Item selecionado, resultado e exceção de amostra; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `audit_sample_id` | uuid | Sim |
| `item_reference`, `selection_reason` | texto curto, texto longo | Sim |
| `result`, `exception_note`, `status` | texto longo, texto longo, texto curto | Condicional |

**PK, FKs e unicidade.** PK `id`; FK para `audit_samples`; único por amostra e referência de item definida em SDD. **Índices:** `audit_sample_id, status`. **Preservação:** não apagar item examinado; corrigir por evento/versão. **Integridade:** item mantém ligação com amostra, sem impor formato da população.

## 9. Solicitações, instruções, documentos recebidos, arquivos e evidências

### `evidence_instruction_templates`

**Finalidade e situação.** Modelo versionável de instrução sobre como localizar, extrair, filtrar, preparar ou enviar material; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `economic_segment_id` | uuid | Condicional |
| `code`, `title`, `content`, `version_label`, `status` | texto curto, texto curto, texto longo, texto curto, texto curto | `code`, `title`, `content`, `status`: Sim |

**PK, FKs e unicidade.** PK `id`; FK condicional para segmento; único por escopo, código e versão definidos em SDD. **Índices:** `economic_segment_id, status`; `code`. **Preservação:** versão enviada não é alterada. **Integridade:** instrução não é solicitação, documento recebido ou evidência.

### `document_request_templates`

**Finalidade e situação.** Modelo versionável de solicitação de documento; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `economic_segment_id` | uuid | Condicional |
| `code`, `title`, `content`, `version_label`, `status` | texto curto, texto curto, texto longo, texto curto, texto curto | `code`, `title`, `content`, `status`: Sim |

**PK, FKs e unicidade.** PK `id`; FK condicional para segmento; único por escopo, código e versão definidos em SDD. **Índices:** `economic_segment_id, status`; `code`. **Preservação:** versão aplicada é reconstruível. **Integridade:** modelo é ponto de partida e não decisão efetiva de solicitação.

### `document_requests`

**Finalidade e situação.** Pedido formal ao cliente, incluindo o que, período, formato, prazo e responsáveis quando aplicáveis; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id`, `engagement_period_id` | uuid | Sim |
| `document_request_template_id`, `audit_procedure_id` | uuid | Condicional |
| `title`, `requested_format`, `due_date`, `status` | texto curto, texto curto, data, texto curto | `title`, `status`: Sim |
| `sent_version`, `sent_at` | texto longo, data_hora | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs para trabalho, período, modelo e procedimento; unicidade de referência de solicitação é definida em SDD. **Índices:** `engagement_id, status, due_date`; `audit_procedure_id`. **Preservação:** conteúdo e instruções efetivamente enviados permanecem imutáveis como fato; nova comunicação cria nova versão/evento. **Integridade:** não confundir solicitação com instrução ou documento recebido.

### `document_request_items`

**Finalidade e situação.** Item detalhado de uma solicitação; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `document_request_id` | uuid | Sim |
| `sequence`, `description`, `requested_period`, `requested_format` | inteiro, texto longo, texto curto, texto curto | `sequence`, `description`: Sim |
| `responsible_note`, `status` | texto longo, texto curto | Condicional |

**PK, FKs e unicidade.** PK `id`; FK para `document_requests`; único `document_request_id, sequence`. **Índices:** `document_request_id, status`. **Preservação:** histórico de versão da solicitação. **Integridade:** o item detalha pedido; não representa instrução nem material recebido.

### `received_documents`

**Finalidade e situação.** Material entregue em resposta a uma solicitação, com origem e versão rastreáveis; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id`, `document_request_id` | uuid | Sim |
| `received_at`, `source_description`, `status` | data_hora, texto longo, texto curto | Sim |
| `received_from_user_profile_id` | uuid | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para trabalho, solicitação e `user_profiles` quando a pessoa de origem for identificável. **Índices:** `document_request_id, received_at`; `engagement_id, status`; `received_from_user_profile_id`. **Preservação:** recebimento, substituição ou revogação geram eventos; material não se torna evidência por si. **Integridade:** a pessoa de origem deve possuir vínculo autorizado no contexto; uma solicitação pode receber vários documentos; cada documento recebido deve possuir ao menos um vínculo em `received_document_files`, sem que esse vínculo promova o documento ou arquivo a evidência.

### `received_document_files`

**Finalidade e situação.** Associação N:N explícita entre documento recebido e versão de arquivo controlado; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `received_document_id`, `file_version_id` | uuid | Sim |
| `sequence`, `link_purpose` | inteiro, texto curto | `sequence`: Sim |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para `organizations`, `received_documents` e `file_versions`; único `organization_id, received_document_id, file_version_id` e `received_document_id, sequence`. **Índices:** `organization_id, received_document_id`; `file_version_id`. **Preservação:** substituição cria nova versão/vínculo e preserva o anterior; revogação é eventada. **Integridade:** documento, arquivo e versão compartilham organização; o vínculo representa material recebido e não cria `evidence_items`.

### `stored_files`

**Finalidade e situação.** Registro lógico do arquivo físico separado do objeto metodológico; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id` | uuid | Sim |
| `storage_key`, `original_name`, `media_type` | texto curto, texto curto, texto curto | Sim |
| `classification`, `retention_status` | texto curto, texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; único `organization_id, storage_key`; não registra conteúdo nem credencial. **Índices:** `organization_id, classification`; `storage_key`. **Preservação:** retenção e arquivamento controlado. **Integridade:** arquivo não é documento recebido, evidência ou papel; acesso depende de autorização adicional.

### `file_versions`

**Finalidade e situação.** Versão imutável e verificável de arquivo controlado; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `stored_file_id` | uuid | Sim |
| `version_number`, `content_hash`, `size_bytes` | inteiro, hash, inteiro | Sim |
| `created_at`, `status` | data_hora, texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK para `stored_files`; único `stored_file_id, version_number` e `organization_id, content_hash` segundo estratégia definida em SDD. **Índices:** `stored_file_id, version_number`; `content_hash`. **Preservação:** não alterar conteúdo de versão; substituição cria outra. **Integridade:** tamanho não é negativo; versão compartilha organização do arquivo.

### `evidence_items`

**Finalidade e situação.** Informação avaliada e incorporada pelo auditor como evidência; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `received_document_id` | uuid | Condicional |
| `title`, `assessment`, `rationale`, `status`, `classification` | texto curto, texto longo, texto longo, texto curto, texto curto | `title`, `status`, `classification`: Sim |

**PK, FKs e unicidade.** PK `id`; FKs para trabalho e documento recebido quando houver origem documental. **Índices:** `engagement_id, status`; `received_document_id`. **Preservação:** avaliação, incorporação, complemento ou substituição são versionados/eventados. **Integridade:** origem, período, integridade, completude, relevância, confiabilidade, suficiência e adequação são avaliados pelo auditor; documento recebido pode não originar evidência e evidência pode ter outra origem autorizada.

### `evidence_links`

**Finalidade e situação.** Vínculo controlado entre uma evidência e arquivo, versão de arquivo ou objeto de suporte; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `evidence_item_id` | uuid | Sim |
| `file_version_id`, `engagement_risk_id`, `audit_procedure_id`, `audit_sample_id` | uuid | Exatamente um destino |
| `working_paper_id`, `finding_id`, `area_conclusion_id`, `report_item_id` | uuid | Exatamente um destino |
| `link_purpose` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para `evidence_items` e para cada coluna alternativa: `file_versions`, `engagement_risks`, `audit_procedures`, `audit_samples`, `working_papers`, `findings`, `area_conclusions` e `report_items`. Único por evidência, destino não nulo e finalidade. **Índices:** `organization_id, evidence_item_id`; índice parcial lógico para cada FK de destino. **Preservação:** revogação/inativação sem apagar vínculo histórico. **Integridade:** exatamente uma FK de destino deve estar preenchida; evidência e destino compartilham organização e trabalho quando aplicável; vínculo com arquivo não converte o arquivo em evidência.

## 10. Papéis de trabalho, vínculos, revisão e pendências

### `working_papers`

**Finalidade e situação.** Registro que documenta resposta metodológica e pode ligar conta, grupo, processo, risco, procedimento, afirmação e evidência; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `title`, `content`, `status`, `classification` | texto curto, texto longo, texto curto, texto curto | Sim |
| `version_number` | inteiro | Sim |

**PK, FKs e unicidade.** PK `id`; FK para trabalho; único `engagement_id, title, version_number` apenas se o SDD adotar título como identificador. **Índices:** `engagement_id, status`; `classification`. **Preservação:** versões aprovadas ou revisadas não são sobrescritas; reabertura é rastreável. **Integridade:** existência formal não demonstra resposta suficiente.

### `working_paper_links`

**Finalidade e situação.** Vínculo N:N de papel de trabalho com objetos metodológicos e evidências; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `working_paper_id` | uuid | Sim |
| `client_account_id`, `account_group_id`, `engagement_process_id`, `engagement_risk_id` | uuid | Exatamente um destino |
| `control_id`, `audit_procedure_id`, `audit_sample_id`, `evidence_item_id` | uuid | Exatamente um destino |
| `finding_id`, `area_conclusion_id` | uuid | Exatamente um destino |
| `link_purpose`, `coverage_note` | texto curto, texto longo | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para `working_papers`, `client_accounts`, `account_groups`, `engagement_processes`, `engagement_risks`, `controls`, `audit_procedures`, `audit_samples`, `evidence_items`, `findings` e `area_conclusions`. Único por papel, destino não nulo e finalidade. **Índices:** `organization_id, working_paper_id`; índice parcial lógico para cada FK de destino. **Preservação:** exclusão lógica/eventos. **Integridade:** exatamente uma FK de destino deve estar preenchida; papel e destino pertencem à mesma organização e, quando aplicável, ao mesmo trabalho; o vínculo sustenta rastreabilidade, não suficiência automática.

### `review_notes`

**Finalidade e situação.** Pendência ou observação de revisão sobre item, área ou trabalho; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `engagement_plan_id`, `engagement_risk_id`, `audit_procedure_id`, `evidence_item_id` | uuid | Exatamente um alvo |
| `working_paper_id`, `finding_id`, `area_conclusion_id`, `audit_report_id` | uuid | Exatamente um alvo |
| `note`, `status`, `reviewed_by_user_profile_id` | texto longo, texto curto, uuid | Sim |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para trabalho, `user_profiles` e cada coluna alternativa de alvo. **Índices:** `engagement_id, status`; `reviewed_by_user_profile_id`; índice parcial lógico para cada FK de alvo. **Preservação:** pendência e sua revisão permanecem registradas. **Integridade:** exatamente uma FK de alvo deve estar preenchida; revisor, alvo e trabalho compartilham organização; vedar autorrevisão quando a independência for exigida.

### `review_actions`

**Finalidade e situação.** Tratamento ou resposta a uma pendência de revisão; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `review_note_id` | uuid | Sim |
| `action_description`, `actioned_by_user_profile_id`, `actioned_at` | texto longo, uuid, data_hora | Sim |
| `status` | texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para nota e `user_profiles`. **Índices:** `review_note_id, status`; `actioned_by_user_profile_id`. **Preservação:** ações adicionais não substituem a anterior. **Integridade:** ator deve possuir membership autorizado na organização da nota; tratamento não encerra automaticamente a pendência sem nova revisão ou decisão aplicável.

## 11. Achados, recomendações, conclusões, relatórios e planos de ação

### `findings`

**Finalidade e situação.** Achado com condição, critério, causa, efeito, risco, evidência, recomendação, resposta e conclusão quando aplicáveis; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `title`, `condition`, `criterion`, `cause`, `effect` | texto curto, texto longo, texto longo, texto longo, texto longo | `title`: Sim |
| `status`, `classification` | texto curto, texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK para trabalho; unicidade de código de achado dependerá de SDD. **Índices:** `engagement_id, status`; `classification`. **Preservação:** revisão, comunicação, resposta, conclusão e reabertura permanecem rastreáveis. **Integridade:** vínculos com riscos, evidências e papéis usam as FKs alternativas explícitas de `evidence_links` e `working_paper_links`, sem fundir conceitos.

### `recommendations`

**Finalidade e situação.** Recomendação relacionada a um achado; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `finding_id` | uuid | Sim |
| `description`, `status` | texto longo, texto curto | Sim |
| `priority_note` | texto longo | Condicional |

**PK, FKs e unicidade.** PK `id`; FK para `findings`; unicidade por achado e sequência, se definida em SDD. **Índices:** `finding_id, status`. **Preservação:** revisão e comunicação são eventadas. **Integridade:** recomendação não equivale a plano de ação nem presume aceite do cliente.

### `area_conclusions`

**Finalidade e situação.** Conclusão profissional por área, assunto ou recorte aplicável; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `area_reference`, `conclusion`, `rationale`, `status` | texto curto, texto longo, texto longo, texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK para trabalho; unicidade de área e versão a definir em SDD. **Índices:** `engagement_id, status`; `area_reference`. **Preservação:** conclusão aprovada não é silenciosamente alterada. **Integridade:** deve poder ser suportada por papéis, evidências, achados e revisões por vínculos controlados; a presença desses registros não prova suficiência.

### `audit_reports`

**Finalidade e situação.** Relatório versionado que comunica resultados suportados; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id`, `engagement_period_id` | uuid | Sim |
| `title`, `content`, `version_number`, `status` | texto curto, texto longo, inteiro, texto curto | Sim |
| `issued_at` | data_hora | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs para trabalho e período; único `engagement_id, version_number`. **Índices:** `engagement_id, status`; `issued_at`. **Preservação:** emissão, reabertura e substituição mantêm as versões efetivamente comunicadas. **Integridade:** somente itens suportados podem ser comunicados; aprovação e emissão seguem SDD e responsabilidade humana.

### `report_items`

**Finalidade e situação.** Item de relatório que referencia achado, conclusão ou outro objeto permitido; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `audit_report_id` | uuid | Sim |
| `sequence`, `content` | inteiro, texto longo | Sim |
| `finding_id`, `area_conclusion_id` | uuid | Exatamente uma origem |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para relatório, `findings` e `area_conclusions`; único `audit_report_id, sequence`. **Índices:** `audit_report_id`; `finding_id`; `area_conclusion_id`. **Preservação:** alteração após emissão requer nova versão do relatório. **Integridade:** exatamente uma FK de origem deve estar preenchida; relatório e origem pertencem à mesma organização e trabalho; o item não substitui o objeto de origem.

### `action_plans`

**Finalidade e situação.** Plano de ação associado a recomendação ou achado, retirado do núcleo por decisão humana de 2026-07-28; **Extensão futura**.

| Campos próprios para especificação futura | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `engagement_id` | uuid | Sim |
| `recommendation_id`, `finding_id` | uuid | Condicional |
| `description`, `responsible_reference`, `due_date`, `status` | texto longo, texto curto, data, texto curto | Condicional |

**PK, FKs e unicidade.** PK proposta `id`; FKs propostas para trabalho, recomendação e achado; unicidade, índices e ciclo serão definidos no SDD da extensão. **Preservação:** quando priorizada, deverá preservar respostas, prazos, mudanças e histórico. **Integridade:** exatamente uma entre `recommendation_id` e `finding_id` deverá ser preenchida; a classificação como extensão futura não autoriza antecipar portal, responsável do cliente, fluxo ou regras de acompanhamento.

## 12. Histórico, versões, eventos e trilha

### `status_history`

**Finalidade e situação.** Histórico de mudança de estado de um objeto rastreável; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id` | uuid | Sim |
| `organization_membership_id`, `client_id`, `acceptance_assessment_id`, `audit_engagement_id` | uuid | Exatamente um alvo |
| `engagement_plan_id`, `trial_balance_import_id`, `account_mapping_id`, `engagement_process_id` | uuid | Exatamente um alvo |
| `engagement_risk_id`, `audit_procedure_id`, `audit_sample_id`, `document_request_id` | uuid | Exatamente um alvo |
| `received_document_id`, `evidence_item_id`, `working_paper_id`, `review_note_id` | uuid | Exatamente um alvo |
| `finding_id`, `area_conclusion_id`, `audit_report_id` | uuid | Exatamente um alvo |
| `previous_status`, `new_status`, `changed_at` | texto curto, texto curto, data_hora | `new_status`, `changed_at`: Sim |
| `reason`, `changed_by_user_profile_id` | texto longo, uuid | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para `user_profiles` e cada coluna alternativa de alvo. **Índices:** `organization_id, changed_at`; `changed_by_user_profile_id`; índice parcial lógico para cada FK de alvo. **Preservação:** append-only para usuários comuns. **Integridade:** exatamente uma FK de alvo deve estar preenchida; ator e alvo pertencem ao contexto autorizado; não cria catálogo ou transições universais e só registra transição válida no ciclo da entidade.

### `audit_events`

**Finalidade e situação.** Evento histórico individual que alimenta a trilha de auditoria; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `event_type` | uuid, texto curto | Sim |
| `occurred_at`, `actor_user_profile_id` | data_hora, uuid | `occurred_at`: Sim |
| `organization_target_id`, `user_profile_target_id`, `organization_membership_target_id`, `client_target_id` | uuid | Exatamente um alvo |
| `audit_engagement_target_id`, `trial_balance_import_target_id`, `account_mapping_target_id`, `engagement_risk_target_id` | uuid | Exatamente um alvo |
| `audit_procedure_target_id`, `audit_sample_target_id`, `document_request_target_id`, `received_document_target_id` | uuid | Exatamente um alvo |
| `file_version_target_id`, `evidence_item_target_id`, `working_paper_target_id`, `review_note_target_id` | uuid | Exatamente um alvo |
| `finding_target_id`, `area_conclusion_target_id`, `audit_report_target_id` | uuid | Exatamente um alvo |
| `engagement_id`, `reason`, `context` | uuid, texto longo, json estruturado | Condicional |

**PK, FKs e unicidade.** PK `id`; FKs explícitas para ator, trabalho contextual e cada tabela nomeada nas colunas `*_target_id`. **Índices:** `organization_id, occurred_at`; `actor_user_profile_id, occurred_at`; `engagement_id, occurred_at`; índice parcial lógico para cada alvo. **Preservação:** append-only para usuários comuns. **Integridade:** exatamente uma FK de alvo deve estar preenchida; ator, alvo e trabalho contextual pertencem à organização autorizada; registra os eventos relevantes conforme aplicável e não é a trilha por si só.

### `entity_versions`

**Finalidade e situação.** Versão preservada de conteúdo ou modelo para reconstrução autorizada; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id` | uuid | Sim |
| `engagement_plan_id`, `reference_chart_version_id`, `risk_id`, `audit_program_id` | uuid | Exatamente um alvo |
| `evidence_instruction_template_id`, `document_request_template_id`, `document_request_id` | uuid | Exatamente um alvo |
| `evidence_item_id`, `working_paper_id`, `finding_id`, `area_conclusion_id`, `audit_report_id` | uuid | Exatamente um alvo |
| `version_number`, `snapshot`, `created_at` | inteiro, json estruturado, data_hora | Sim |
| `supersedes_version_id`, `status` | uuid, texto curto | Condicional |

**PK, FKs e unicidade.** PK `id`; FK autorreferente para versão anterior e FKs explícitas para cada coluna alternativa de alvo. Único por alvo não nulo e `version_number`. **Índices:** `organization_id, created_at`; `status`; índice composto lógico de cada FK de alvo com `version_number`. **Preservação:** versões anteriores permanecem disponíveis; conteúdo enviado/aprovado não é alterado silenciosamente. **Integridade:** exatamente uma FK de alvo deve estar preenchida; alvo e versão anterior compartilham organização e tipo de destino; versão não duplica o evento de alteração.

### `comments`

**Finalidade e situação.** Comentário contextual autorizado sobre objeto do trabalho; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id` | uuid | Sim |
| `document_request_id`, `received_document_id`, `evidence_item_id`, `working_paper_id` | uuid | Exatamente um alvo |
| `review_note_id`, `finding_id`, `area_conclusion_id`, `audit_report_id` | uuid | Exatamente um alvo |
| `content`, `author_user_profile_id`, `status` | texto longo, uuid, texto curto | Sim |

**PK, FKs e unicidade.** PK `id`; FK explícita para `user_profiles` e FKs explícitas para cada coluna alternativa de alvo. **Índices:** `organization_id, created_at`; `author_user_profile_id`; índice parcial lógico para cada alvo. **Preservação:** exclusão lógica e evento, sem apagar comentário necessário à trilha. **Integridade:** exatamente uma FK de alvo deve estar preenchida; autor deve possuir membership autorizado na organização do alvo; comentário não substitui revisão, aprovação ou evidência.

### `notifications`

**Finalidade e situação.** Notificação ao usuário sobre objeto autorizado; **MVP**.

| Campos próprios | Tipo lógico | Obrigatório |
|---|---|---:|
| `organization_id`, `recipient_membership_id` | uuid | Sim |
| `document_request_id`, `evidence_item_id`, `working_paper_id`, `review_note_id` | uuid | Exatamente um alvo |
| `finding_id`, `area_conclusion_id`, `audit_report_id` | uuid | Exatamente um alvo |
| `notification_type`, `content`, `read_at`, `status` | texto curto, texto longo, data_hora, texto curto | Sim, exceto `read_at` |

**PK, FKs e unicidade.** PK `id`; FK para membership destinatário e FKs explícitas para cada coluna alternativa de alvo. **Índices:** `recipient_membership_id, status, created_at`; índice parcial lógico para cada alvo. **Preservação:** eventos de entrega/leitura quando relevantes; expiração não apaga fatos do objeto. **Integridade:** exatamente uma FK de alvo deve estar preenchida; notificação não amplia autorização e o destinatário deve manter acesso ao alvo no momento da consulta.

## 13. Extensões futuras

As extensões abaixo ficam fora do núcleo MVP: planos de ação, portal avançado do cliente, funções ampliadas de qualidade, auditoria dos pares, gestão comercial, propostas, contratos, faturamento, indicadores, painéis, integrações e agentes integrados ao produto. Seus SDDs deverão reutilizar os limites organizacionais, de rastreabilidade, arquivo, versão e autorização definidos aqui, sem antecipar seu escopo.

`action_plans` possui ficha lógica na seção 11 porque constava da lista mínima documental, mas sua implementação depende de priorização e SDD próprios da extensão. Esta classificação decorre da decisão humana de 2026-07-28 e não modifica as fontes aprovadas.

## 14. Integridade, índices, exclusão lógica e ordem futura de implantação

### 14.1 Integridade transversal

- Toda FK organizacional deve impedir associação entre organizações distintas; o modelo físico deverá usar chaves contextuais ou controles equivalentes testáveis.
- `organization_id` é obrigatório para dados da firma. A possibilidade de referência global, da plataforma ou por segmento continua pendente e não pode causar compartilhamento implícito.
- Relações N:N são explícitas: `role_permissions`, `membership_roles`, `client_segments`, `account_group_client_accounts`, `account_group_reference_accounts`, `risk_controls`, `procedure_risks`, `received_document_files`, `evidence_links` e `working_paper_links`.
- Vínculos transversais usam somente colunas alternativas com FKs nomeadas. `evidence_links`, `working_paper_links`, `review_notes`, `report_items`, `status_history`, `audit_events`, `entity_versions`, `comments` e `notifications` exigem exatamente um destino preenchido; identificadores genéricos de tipo/entidade não são admitidos.
- Toda FK de ator termina em `*_user_profile_id` e aponta explicitamente para `user_profiles`. Memberships continuam sendo usados apenas quando o próprio vínculo organizacional é o objeto ou destinatário contextual, não como identidade do ator.
- Valores, listas de estados, ciclos, obrigatoriedades condicionais, classificações e regras de transição são fechados por entidade em SDD. Não existe enumeração universal autorizada.

### 14.2 Índices principais

Além dos índices indicados nas fichas, o modelo físico deve avaliar: chaves primárias; FKs; `organization_id` combinado com filtros usuais; trabalho/período; situação; vigência; ator/momento em eventos; origem e `content_hash` em arquivos. Índices compostos devem ser comprovados por padrões de consulta e testes; nenhum índice substitui política de acesso ou integridade.

### 14.3 Exclusão lógica, inativação, cancelamento e retenção

Catálogos e vínculos administrativos admitem inativação ou término de vigência conforme aplicável. Registros metodológicos, versões, arquivos referenciados, eventos e histórico preservam fatos: usam nova versão, substituição, revogação, cancelamento, arquivamento ou exclusão lógica contextual, sem apagamento silencioso. Exclusão física exige avaliação de retenção, contrato, norma, litígio, investigação e finalidade. Trabalhos encerrados entram em arquivamento controlado.

### 14.4 Ordem futura de implantação

1. Organizações, usuários, memberships, papéis, permissões, campos transversais e testes de isolamento.
2. Clientes, segmentos, aceitação, trabalhos, períodos, equipe e planejamento.
3. Arquivos/versionamento, balancetes, contas, planos referenciais e mapeamentos.
4. Processos, riscos, controles, programas, procedimentos e amostras.
5. Solicitações, instruções, documentos recebidos, evidências e vínculos.
6. Papéis de trabalho, revisão, achados, recomendações, conclusões e relatórios.
7. Eventos, histórico, versões, comentários e notificações transversais.
8. Extensões aprovadas e priorizadas, incluindo SDD específico de planos de ação.

Cada etapa exige SDD, critérios de aceite, testes positivos e negativos de permissões, isolamento, integridade, histórico, arquivos e rastreabilidade antes de migration.

## 15. Relações com os documentos oficiais

| Documento | Relação com este modelo |
|---|---|
| [[Constituição do SIGA]] | Norma superior: metodologia antes da tecnologia, rastreabilidade, revisão independente, evolução controlada e fonte oficial. |
| [[Estrutura Funcional do SIGA]] | Define o fluxo e a distinção entre solicitação, instrução, documento recebido e evidência. |
| [[Arquitetura Tecnológica do SIGA]] | Exige modelo de domínio antes do banco, camadas separadas, RLS e testes diretos futuros. |
| [[Regras de Negócio e Metodologia de Auditoria]] | Determina a cadeia metodológica, julgamento humano, amostragem e suporte de relatório. |
| [[Dados, Segurança, Privacidade e Histórico do SIGA]] | Define isolamento, classificação, arquivos, retenção, histórico e trilha. |
| [[Glossário do SIGA]] | Controla nomenclatura; termos sem entrada autônoma mantêm a nomenclatura da fonte, sem definição improvisada. |
| [[Modelo de Domínio do SIGA]] | Fornece entidades conceituais, relações, limites e separação de MVP e futuro. |

Em conflito, prevalece a Constituição e sua hierarquia documental. Pendências identificadas pela consolidação de fontes permanecem explícitas neste documento.

## 16. Material para treinamento

**Público e pré-requisitos.** Auditores, gestores, desenvolvedores e agentes de IA autorizados, após leitura da [[Constituição do SIGA]], do [[Glossário do SIGA]] e do [[Modelo de Domínio do SIGA]].

### Objetivos de aprendizagem

- Diferenciar organização usuária, cliente e trabalho de auditoria.
- Explicar por que perfil geral, função no trabalho e responsabilidade por item não são a mesma coisa.
- Seguir a cadeia de rastreabilidade de planejamento a relatório e no sentido reverso.
- Distinguir solicitação, instrução, documento recebido, arquivo, evidência e papel de trabalho.
- Reconhecer que versão, evento e trilha de auditoria têm finalidades diferentes.

### Roteiro e estudo de caso conceitual

1. Apresente o isolamento por organização e o membership de um usuário.
2. Crie conceitualmente um cliente, trabalho, período e planejamento, sem dados reais.
3. Mostre a referência controlada do balancete ao arquivo original, sua linha bruta e valores normalizados.
4. Relacione risco, procedimento, amostra, solicitação, instrução, documento recebido, evidência e papel de trabalho.
5. Demonstre a reconstrução de um achado até suas evidências e a emissão de relatório suportado.

**Erros comuns.** Usar arquivo como se fosse evidência; tratar documento recebido como evidência sem avaliação; conceder acesso apenas por papel geral; alterar versão enviada; misturar dados de organizações; incluir `action_plans` no núcleo MVP; usar destino genérico sem FK explícita; considerar a existência de vínculos como prova de suficiência.

**Resumo.** O modelo lógico mantém cada conceito metodológico no seu limite, registra a origem e a evolução dos fatos e prepara a implantação futura sem transferir julgamento profissional para o banco ou para automações.

## 17. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.9 | 2026-07-28 | Minuta inicial do modelo relacional lógico, com limites, rastreabilidade e escopo pendente de planos de ação | Em revisão |
| 0.9 | 2026-07-28 | Correção 1/5: planos de ação classificados como extensão futura; arquivos recebidos, grupos de contas, alvos transversais e atores explicitados | Em revisão |
