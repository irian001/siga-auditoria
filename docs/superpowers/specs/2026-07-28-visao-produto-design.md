# Desenho — Visão do Produto do SIGA

**Data:** 2026-07-28  
**Situação:** aprovado para especificação  
**Documento resultante:** `docs/estruturantes/01_VISAO_DO_PRODUTO.md`

## 1. Objetivo

Criar a Visão do Produto prevista no Art. 82 da [[Constituição do SIGA]], com leitura útil para dois grupos:

- auditores, gestores e futuros clientes, por meio de um resumo executivo claro;
- equipe de desenvolvimento e agentes de inteligência artificial, por meio de diretrizes estratégicas estruturadas.

O documento deverá orientar decisões sobre o produto inicial sem limitar a evolução de longo prazo.

## 2. Abordagem aprovada

Será utilizada uma estrutura híbrida:

- camada executiva, compreensível sem conhecimento técnico;
- camada estratégica, suficientemente precisa para orientar documentação, arquitetura, roadmap e especificações futuras.

Não haverá seção autônoma denominada “Proposta de valor”. Os benefícios e diferenciais serão explicados nas seções de propósito, problema, princípios e diferenciais.

## 3. Identificação e localização

```yaml
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
```

O YAML também deverá conter:

- propriedades para Obsidian;
- públicos do documento;
- relação com a Constituição e a Matriz Mestra;
- tags controladas;
- links para documentos estruturantes futuros.

## 4. Estrutura do documento

1. Resumo executivo;
2. propósito do SIGA;
3. problema que o produto resolve;
4. públicos;
5. princípios e diferenciais;
6. experiência esperada dos usuários;
7. produto inicial e MVP;
8. visão futura;
9. limites e itens fora do escopo;
10. resultados e indicadores de sucesso;
11. riscos estratégicos;
12. relação com a Constituição;
13. próximos documentos;
14. material para apresentações e treinamento;
15. histórico de alterações.

## 5. Horizonte do produto

O documento distinguirá claramente:

### Produto inicial

Descreverá o núcleo necessário para executar um trabalho de auditoria de forma rastreável, segura e revisável, sem prometer todas as automações futuras.

### Visão futura

Descreverá a evolução possível para:

- novos segmentos;
- integrações;
- qualidade e auditoria dos pares;
- treinamento;
- agentes assistivos;
- consultoria e bases de regulamentações interligadas.

A visão futura não será tratada como escopo aprovado do MVP.

## 6. Fontes normativas

O conteúdo deverá derivar de:

- `docs/constituicao/00_CONSTITUICAO_DO_SIGA.md`;
- `docs/constituicao/01_IDENTIDADE_E_FINALIDADE.md`;
- `docs/constituicao/04_ESTRUTURA_FUNCIONAL.md`;
- `docs/constituicao/09_REGRAS_DE_NEGOCIO_E_METODOLOGIA.md`;
- `docs/constituicao/13_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md`;
- `docs/constituicao/15_DISPOSICOES_FINAIS.md`;
- `docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md`.

O documento não poderá criar regras metodológicas, compromissos comerciais ou funcionalidades não autorizadas.

## 7. Base de conhecimento

A Visão do Produto deverá:

- utilizar Markdown legível no GitHub;
- possuir YAML válido;
- utilizar wikilinks com nomes canônicos;
- funcionar como fonte para Obsidian e NotebookLM;
- distinguir conceitos atuais de notas futuras;
- apontar para o futuro [[Glossário do SIGA]].

Os termos ainda divergentes não serão corrigidos silenciosamente. O Glossário definirá posteriormente nomes canônicos e aliases.

## 8. Material educacional

O bloco educacional deverá conter:

- objetivos de aprendizagem;
- conceitos-chave;
- roteiro sugerido de apresentação;
- perguntas para discussão;
- questões de avaliação;
- um estudo de caso curto.

O conteúdo deverá permitir apresentações diferentes para auditores e futuros clientes, sem revelar informações metodológicas internas inadequadas ao público externo.

## 9. Indicadores

Os indicadores serão apresentados como critérios estratégicos, não como metas numéricas inventadas. Deverão abranger, conforme aplicável:

- adoção do fluxo completo;
- rastreabilidade;
- qualidade da documentação;
- redução de controles paralelos;
- capacidade de revisão;
- continuidade dos trabalhos;
- satisfação e compreensão dos usuários.

Metas quantitativas dependerão de dados reais e de documento posterior.

## 10. Publicação

O documento será criado inicialmente como versão `0.9`, com status `em-revisao`.

Após aprovação expressa:

- será promovido para versão `1.0`;
- o histórico registrará a aprovação;
- a branch será integrada à `main`;
- a Matriz Mestra receberá o link e a situação atualizados, quando necessário.

## 11. Fora do escopo

Esta etapa não criará:

- o Glossário do SIGA;
- a Arquitetura do Sistema;
- o Modelo de Domínio;
- o Modelo de Dados;
- o Roadmap detalhado;
- SDDs;
- código do sistema;
- telas ou banco de dados.

## 12. Critérios de aceite

A Visão do Produto estará pronta para revisão quando:

- seguir as quinze seções aprovadas;
- possuir camada executiva e estratégica;
- distinguir produto inicial e visão futura;
- não possuir seção autônoma de proposta de valor;
- preservar a Constituição como norma superior;
- não criar regras ou compromissos sem fonte;
- possuir YAML, aliases e wikilinks;
- ser compreensível no GitHub sem depender do Obsidian;
- conter material para apresentações e treinamento;
- permanecer em `0.9 — em revisão` até aprovação humana.
