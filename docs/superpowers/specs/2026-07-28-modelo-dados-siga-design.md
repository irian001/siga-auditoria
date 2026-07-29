# Desenho — Modelo de Dados do SIGA

**Data:** 2026-07-28
**Situação:** aprovado para especificação
**Documento resultante:** `docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md`

## 1. Objetivo

Criar um único Modelo de Dados do SIGA para traduzir o [[Modelo de Domínio do SIGA]] em uma estrutura relacional pronta para orientar a implantação futura no Supabase.

O documento definirá tabelas, campos, tipos lógicos, chaves primárias, chaves estrangeiras, obrigatoriedade, unicidade, índices, exclusão lógica, histórico e regras de integridade. Não criará SQL, migrations ou tabelas reais nesta etapa.

## 2. Abordagem aprovada

Será adotado um modelo relacional completo, organizado por domínios dentro de um único arquivo.

Cada tabela terá:

- finalidade;
- nome físico proposto;
- campos e tipos lógicos;
- chave primária;
- chaves estrangeiras;
- obrigatoriedade;
- unicidade e índices;
- histórico, exclusão lógica e auditoria;
- relações e regras de integridade;
- situação: MVP ou extensão futura.

## 3. Identificação e localização

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

O YAML declarará fontes, relações, público, tags e propriedades Obsidian.

## 4. Princípios obrigatórios

1. Identificadores primários utilizarão UUID, salvo decisão posterior documentada.
2. Tabelas pertencentes a uma firma deverão possuir `organization_id` e obedecer isolamento multiempresa.
3. Identificadores técnicos, datas de criação/atualização, responsável por criação/atualização e exclusão lógica deverão ser tratados de forma consistente quando aplicáveis.
4. Registros metodológicos e históricos não serão apagados fisicamente quando a preservação for necessária.
5. Documento recebido, instrução, evidência e papel de trabalho serão estruturas distintas.
6. Relações N:N serão representadas por tabelas associativas explícitas.
7. O modelo físico deverá preservar a rastreabilidade entre risco, procedimento, documento, evidência, papel, achado, conclusão e relatório.
8. Dados de organizações diferentes não poderão ser relacionados por chaves estrangeiras ou políticas de acesso.

## 5. Estrutura do documento

1. finalidade, escopo e limites;
2. convenções de modelagem;
3. tipos lógicos e campos transversais;
4. isolamento multiempresa e segurança;
5. mapa relacional resumido;
6. tabelas do núcleo organizacional e acesso;
7. tabelas de clientes, segmentos e aceitação;
8. tabelas de trabalhos, equipe e planejamento;
9. tabelas contábeis, processos, riscos, controles e procedimentos;
10. tabelas de solicitações, instruções, documentos, evidências e papéis;
11. tabelas de achados, revisão, conclusões e relatórios;
12. tabelas transversais de arquivos, versões, histórico e trilha;
13. tabelas de extensões futuras;
14. chaves, índices, integridade e exclusão lógica;
15. ordem de implantação no Supabase;
16. relações com o Modelo de Domínio e Glossário;
17. material para treinamento;
18. histórico de alterações.

## 6. Núcleo do MVP

O modelo detalhará, no mínimo, tabelas conceituais para:

- organizações, usuários, memberships, perfis, funções e permissões;
- clientes, segmentos, aceitação e continuidade;
- trabalhos, equipes, períodos, estados e planejamento;
- balancetes, contas do cliente, plano referencial e mapeamentos;
- processos, riscos, controles, procedimentos, amostras e vínculos;
- solicitações, instruções, documentos recebidos, arquivos e evidências;
- papéis de trabalho, vínculos metodológicos, revisão e pendências;
- achados, recomendações, conclusões, relatórios e planos de ação iniciais;
- histórico, versões, eventos e trilha de auditoria.

## 7. Extensões futuras

Portal do cliente avançado, qualidade, auditoria dos pares, comercial, faturamento, indicadores, integrações e agentes integrados deverão constar separadamente como extensões, sem impor sua criação física no primeiro ciclo de banco.

## 8. Fontes e limites

O documento derivará somente de:

- [[Constituição do SIGA]];
- [[Matriz Mestra da Constituição do SIGA]];
- [[Glossário do SIGA]];
- [[Modelo de Domínio do SIGA]];
- documentos constitucionais de públicos, estrutura funcional, arquitetura, dados, metodologia, qualidade e agentes.

O Modelo de Dados não resolverá conflitos de regra; identificará a fonte superior ou pendência. Não conterá DDL, RLS executável, migrations ou configuração de credenciais.

## 9. Critérios de aceite

O documento estará pronto quando:

- cada tabela do MVP possuir campos, tipos lógicos, PK, FKs e regras de integridade;
- o isolamento por organização estiver explícito;
- relações N:N, histórico, arquivos e exclusão lógica estiverem modelados;
- a cadeia metodológica estiver preservada;
- MVP e extensões estiverem separados;
- não houver SQL, alteração em Supabase ou regras novas;
- houver YAML, fontes, wikilinks, material educacional e histórico;
- não houver placeholders ou whitespace final.
