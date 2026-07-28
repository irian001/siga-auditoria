# Desenho — Glossário do SIGA

**Data:** 2026-07-28  
**Situação:** aprovado para especificação  
**Documento resultante:** `docs/estruturantes/02_GLOSSARIO_DO_SIGA.md`

## 1. Objetivo

Criar o Glossário do SIGA como arquivo único, completo e oficial para os termos usados na Constituição, na Visão do Produto, nos documentos estruturantes, nas especificações futuras e nos materiais de treinamento.

O Glossário reduzirá ambiguidades de linguagem sem substituir regras de negócio, metodologia, arquitetura ou documentos específicos.

## 2. Abordagem aprovada

Será adotado um glossário único e completo. As categorias servem apenas para facilitar a consulta; dentro de cada categoria, as entradas serão apresentadas em ordem alfabética.

Cada entrada terá:

- termo oficial;
- definição direta;
- contexto de uso no SIGA;
- sinônimos aceitos ou expressão a evitar, quando aplicável;
- relações por `[[wikilinks]]` para conceitos e documentos correspondentes.

O Glossário não criará uma coleção paralela de notas nesta etapa. Wikilinks para notas ainda inexistentes serão mantidos como relações futuras explícitas.

## 3. Identificação e localização

```yaml
id: SIGA-GLS-001
title: Glossário do SIGA
aliases:
  - Glossário SIGA
  - Vocabulário Controlado do SIGA
type: documento-estruturante
domain: conhecimento
status: em-revisao
version: 0.9
created: 2026-07-28
updated: 2026-07-28
owner: responsavel-projeto
```

O YAML também declarará públicos, propriedades de navegação no Obsidian, relações e tags controladas.

## 4. Estrutura do documento

1. finalidade e regra de prevalência;
2. como consultar e manter o Glossário;
3. convenções do vocabulário controlado;
4. termos de auditoria e metodologia;
5. termos de produto, organizações e módulos;
6. termos de dados, segurança e privacidade;
7. termos de desenvolvimento, arquitetura e qualidade;
8. termos de inteligência artificial, agentes e automação;
9. termos de documentação, Obsidian e treinamento;
10. notas futuras e tratamento de termos ausentes;
11. material para treinamento;
12. relações principais e histórico de alterações.

## 5. Cobertura inicial

O arquivo deverá incluir os conceitos centrais já adotados nos documentos aprovados, com atenção a pares que poderiam ser confundidos:

- documento recebido e evidência;
- histórico e trilha de auditoria;
- perfil geral, função no trabalho e responsabilidade por item;
- organização usuária, cliente e trabalho de auditoria;
- risco, controle, procedimento, amostra, papel de trabalho, achado, conclusão e relatório;
- agente, skill, autonomia, tarefa e aprovação humana;
- GitHub, fonte oficial, Obsidian, wikilink, backlink, Canvas e NotebookLM.

O Glossário cobrirá também termos técnicos necessários para leitura dos documentos atuais, como autenticação, autorização, isolamento multiempresa, menor privilégio, branch, commit, pull request, ambiente, teste, homologação, migração e reversão.

## 6. Fontes e limites

As definições devem ser extraídas e conciliadas apenas a partir de documentos aprovados em `main`, especialmente:

- [[Constituição do SIGA]];
- [[Matriz Mestra da Constituição do SIGA]];
- [[Visão do Produto do SIGA]];
- documentos constitucionais sobre estrutura funcional, dados, conhecimento, metodologia, qualidade, roadmap e agentes.

Quando houver divergência, o Glossário deverá apontar o documento superior ou a pendência; não poderá resolver silenciosamente uma regra conflitante.

## 7. Compatibilidade com Obsidian

O documento será uma nota hub de vocabulário:

- YAML com `aliases` e propriedades `obsidian`;
- `[[wikilinks]]` para conceitos e fontes;
- links de retorno para [[Constituição do SIGA]], [[Matriz Mestra da Constituição do SIGA]] e [[Visão do Produto do SIGA]];
- backlinks esperados de documentos futuros que adotem termos controlados;
- legibilidade integral também no GitHub, sem depender de plugins.

## 8. Verificação antes da revisão

Antes de apresentar o arquivo, deverão ser verificados:

- presença dos termos principais usados na Constituição e na Visão;
- ausência de criação de regras novas;
- consistência entre cada termo e seu uso documental;
- wikilinks com nomes canônicos ou aliases existentes;
- termos futuros identificados como futuros, não como arquivos ausentes por erro;
- YAML, links e histórico presentes;
- ausência de whitespace final.

## 9. Publicação

O Glossário será criado inicialmente como versão `0.9`, em revisão. Após aprovação expressa, será promovido a `1.0`, terá seu histórico atualizado e seguirá para `main` em branch e pull request próprios.

## 10. Fora do escopo

Esta etapa não criará notas individuais para cada conceito, não alterará a Constituição, não normalizará documentos existentes, não implementará código e não criará SDDs.
