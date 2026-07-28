---
id: SIGA-SPEC-CON-001
title: Desenho da Consolidação da Constituição do SIGA
type: especificacao-documental
status: aprovado-para-planejamento
version: 1.0
created: 2026-07-27
updated: 2026-07-27
owner: responsavel-projeto
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
tags:
  - siga
  - constituicao
  - consolidacao
  - governanca-documental
---

# Desenho da Consolidação da Constituição do SIGA

## 1. Decisão

A Constituição antiga, composta por 15 títulos e 82 artigos, será a estrutura normativa superior do SIGA.

Os documentos constitucionais atuais não originarão uma nova Constituição. Eles serão tratados como detalhamentos posteriores e alinhados à estrutura original.

## 2. Objetivo

Criar uma única Constituição central, rastreável e compatível com GitHub e Obsidian, preservando a origem do projeto e eliminando a divergência entre:

- a Constituição antiga com 15 títulos e 82 artigos;
- os 12 documentos atuais com numeração reorganizada;
- a Matriz Mestra atual, que registra 12 títulos e 78 artigos.

O resultado deverá ser uma base estável para o desenvolvimento do SIGA, sem criar uma coleção documental paralela.

## 3. Fontes e prevalência

A consolidação utilizará esta ordem:

1. Constituição antiga fornecida pelo responsável, para estrutura, títulos, artigos e redação normativa original;
2. decisões expressamente aprovadas pelo responsável durante a elaboração dos documentos;
3. documentos constitucionais atuais, para refinamentos metodológicos, técnicos, educacionais e de governança;
4. Matriz Mestra e inventário, para navegação, histórico e controle.

Em caso de divergência:

- prevalece a estrutura de 15 títulos e 82 artigos;
- nenhuma regra aprovada será eliminada silenciosamente;
- refinamentos serão incorporados ao artigo tematicamente correspondente;
- dúvida material será registrada para decisão humana.

## 4. Constituição central

Será criado:

`docs/constituicao/00_CONSTITUICAO_DO_SIGA.md`

Metadados previstos:

- ID: `SIGA-CON-00`;
- tipo: `constituicao-central`;
- versão inicial: `0.9`;
- status inicial: `em-revisao`;
- função no Obsidian: `sun`;
- backlinks esperados: verdadeiros;
- links para a Matriz Mestra e os 15 documentos dos títulos.

A versão será promovida para `1.0` e status `aprovado` somente após revisão do responsável.

## 5. Conteúdo da Constituição

A Constituição central manterá:

- preâmbulo;
- 15 títulos;
- artigos 1º a 82;
- registro de aprovação;
- histórico de alterações;
- links para os documentos complementares.

São permitidas nesta consolidação:

- correção de codificação e caracteres;
- correção ortográfica e padronização de Markdown;
- inclusão de YAML e `[[wikilinks]]`;
- adaptação de nomes de documentos;
- incorporação de decisões já aprovadas;
- atualização de referências a GitHub, Obsidian, NotebookLM, Lovable, Codex, Work, Supabase, agentes e skills.

Não são permitidas:

- exclusão de artigo;
- renumeração dos artigos;
- criação de artigo 83 ou posterior;
- criação de regra de negócio não aprovada;
- redução da autoridade da Constituição;
- transformação da Constituição em manual técnico detalhado.

## 6. Incorporação dos refinamentos aprovados

Os refinamentos serão incorporados sem aumentar a quantidade de artigos:

- base de conhecimento, Markdown, YAML, Obsidian e identificadores: artigos 13, 39 a 53;
- multiempresa, menor privilégio, arquivos, histórico e trilha: artigos 59 a 64;
- separação entre solicitação, instrução, documento recebido e evidência: artigos 20 a 24 e 54 a 58;
- SDD, tarefas pequenas, branches, testes e definição de pronto: artigos 32 a 38 e 65 a 68;
- agentes, skills, autonomia e aprovação humana: artigos 69 a 73;
- MVP, fases, continuidade e dívida: artigos 74 a 76;
- governança de alterações e preservação do histórico: artigos 77 a 79.

O detalhamento operacional permanecerá nos documentos dos títulos.

## 7. Estrutura constitucional definitiva

| Título | Artigos | Documento complementar |
|---|---:|---|
| I — Identidade e Finalidade | 1–4 | `01_IDENTIDADE_E_FINALIDADE.md` |
| II — Princípios Fundamentais | 5–15 | `02_PRINCIPIOS_FUNDAMENTAIS.md` |
| III — Públicos e Perfis | 16–19 | `03_PUBLICOS_E_PERFIS.md` |
| IV — Estrutura Funcional | 20–24 | `04_ESTRUTURA_FUNCIONAL.md` |
| V — Arquitetura Tecnológica | 25–31 | `05_ARQUITETURA_TECNOLOGICA.md` |
| VI — Governança do Desenvolvimento | 32–38 | `06_GOVERNANCA_DO_DESENVOLVIMENTO.md` |
| VII — Documentação Mestre | 39–44 | `07_DOCUMENTACAO_MESTRE.md` |
| VIII — Conhecimento, Treinamento e NotebookLM | 45–53 | `08_CONHECIMENTO_E_TREINAMENTO.md` |
| IX — Regras de Negócio e Metodologia | 54–58 | `09_REGRAS_DE_NEGOCIO_E_METODOLOGIA.md` |
| X — Dados, Segurança e Histórico | 59–64 | `10_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md` |
| XI — Qualidade e Testes | 65–68 | `11_QUALIDADE_TESTES_E_VALIDACAO.md` |
| XII — Agentes de Inteligência Artificial | 69–73 | `12_AGENTES_SKILLS_E_AUTOMACAO.md` |
| XIII — Roadmap e Priorização | 74–76 | `13_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md` |
| XIV — Alterações da Constituição | 77–79 | `14_GESTAO_DA_CONSTITUICAO.md` |
| XV — Disposições Finais | 80–82 | `15_DISPOSICOES_FINAIS.md` |

## 8. Reconciliação dos arquivos atuais

Serão preservados sem renomeação:

- Títulos I a VI;
- Título VIII;
- Título IX;
- Título XII.

Serão movimentados com histórico Git:

- `07_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md` para `10_DADOS_SEGURANCA_PRIVACIDADE_E_HISTORICO.md`;
- `10_QUALIDADE_TESTES_E_VALIDACAO.md` para `11_QUALIDADE_TESTES_E_VALIDACAO.md`;
- `11_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md` para `13_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md`.

Serão criados:

- `07_DOCUMENTACAO_MESTRE.md`;
- `14_GESTAO_DA_CONSTITUICAO.md`;
- `15_DISPOSICOES_FINAIS.md`.

Metadados, aliases, navegação, faixas de artigos e IDs serão ajustados para permanecer únicos. O histórico Git será a referência para os nomes e IDs anteriores.

## 9. Matriz, inventário e links

A Matriz Mestra será atualizada para:

- 15 títulos;
- 82 artigos;
- Constituição central como nota superior;
- arquivos renomeados e novos;
- links futuros explicitamente identificados.

O inventário será atualizado com:

- Constituição central;
- nomes antigos e novos;
- hashes;
- origem da Constituição antiga;
- situação de reconciliação;
- ausência de conflitos não resolvidos.

Os links entre títulos seguirão a sequência I a XV.

## 10. Compatibilidade com Obsidian e GitHub

A Constituição será o “sol” do grafo:

`Constituição → Matriz Mestra → Títulos → Documentos estruturantes → SDDs → Tarefas → Código`

O conteúdo continuará legível como Markdown comum no GitHub. Recursos do Obsidian serão complementares, não obrigatórios para compreensão.

## 11. Validações

Antes da entrega deverão ser verificados:

- existência de 15 documentos complementares;
- cobertura contínua dos artigos 1 a 82;
- ausência de sobreposição de artigos;
- IDs atuais únicos;
- YAML válido;
- links para Constituição e Matriz;
- navegação anterior e seguinte;
- inexistência de referências aos nomes substituídos, exceto no histórico;
- ausência de caracteres corrompidos;
- ausência de segredos;
- `git diff --check` sem erros.

## 12. Entrega e aprovação

O trabalho ocorrerá em branch própria.

A primeira entrega conterá a Constituição em versão `0.9`, os arquivos reconciliados, a Matriz e o inventário. Nenhum merge será realizado antes da revisão do responsável.

Após aprovação:

- Constituição passa para versão `1.0`;
- status passa para `aprovado`;
- históricos são atualizados;
- a branch poderá ser integrada à `main`.

## 13. Fora do escopo

Esta consolidação não criará:

- Glossário;
- Modelo de Domínio;
- Modelo de Dados;
- Roadmap detalhado do MVP;
- SDDs;
- código do sistema;
- novas regras metodológicas.

Esses itens somente serão tratados após estabilização da Constituição.
