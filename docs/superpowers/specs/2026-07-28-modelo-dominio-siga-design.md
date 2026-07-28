# Desenho — Modelo de Domínio do SIGA

**Data:** 2026-07-28
**Situação:** aprovado para especificação
**Documento resultante:** `docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md`

## 1. Objetivo

Criar o Modelo de Domínio do SIGA como referência conceitual única para explicar quais elementos existem no sistema, por que existem, como se relacionam e quais pertencem ao núcleo inicial ou às extensões futuras.

O documento será a ponte entre a Constituição, a Visão do Produto, o Glossário e o futuro [[Modelo de Dados do SIGA]]. Não definirá tabelas, SQL, tipos de coluna, APIs ou telas.

## 2. Abordagem aprovada

Será adotado um modelo narrativo com mapa resumido de relações. Cada conceito de domínio terá finalidade, identidade conceitual, relações, responsabilidades, estados quando aplicáveis e limites.

O documento dividirá explicitamente:

1. **Núcleo operacional do MVP:** organizações, usuários, clientes, trabalhos, planejamento, contas, riscos, controles, procedimentos, solicitações, documentos recebidos, evidências, papéis de trabalho, achados, revisão, conclusões e relatório.
2. **Extensões planejadas:** portal do cliente, planos de ação, qualidade, auditoria dos pares, gestão comercial, indicadores, integrações e agentes integrados ao produto.
3. **Fundamentos transversais:** multiempresa, permissões, responsabilidades, estados, histórico, versões, anexos, rastreabilidade e segurança.

## 3. Identificação e localização

```yaml
id: SIGA-DOM-001
title: Modelo de Domínio do SIGA
aliases:
  - Modelo de Domínio
  - Domínio do SIGA
type: documento-estruturante
domain: arquitetura-funcional
status: em-revisao
version: 0.9
created: 2026-07-28
updated: 2026-07-28
owner: responsavel-projeto
```

O YAML declarará públicos, fontes, relações, tags e propriedades Obsidian para funcionar como nota hub de domínio.

## 4. Estrutura do documento

1. finalidade, escopo e limites;
2. como ler o modelo;
3. princípios de modelagem;
4. mapa de domínio resumido;
5. fundamentos transversais;
6. núcleo organizacional e de acesso;
7. núcleo do trabalho de auditoria;
8. planejamento, contabilidade, riscos e procedimentos;
9. documentos, evidências e papéis de trabalho;
10. achados, revisão, conclusões e relatório;
11. extensões planejadas;
12. relações e cardinalidades em linguagem simples;
13. estados e ciclos de vida;
14. rastreabilidade;
15. separação MVP e futuro;
16. compatibilidade com Obsidian e próximos documentos;
17. material para treinamento;
18. histórico de alterações.

## 5. Relação central

O mapa inicial deverá preservar a cadeia metodológica aprovada:

```text
Organização Usuária
→ Cliente
→ Trabalho de Auditoria
→ Planejamento
→ Balancete e Mapeamento de Contas
→ Risco e Controle
→ Procedimento e Amostra
→ Solicitação e Instrução
→ Documento Recebido
→ Evidência
→ Papel de Trabalho
→ Achado
→ Revisão
→ Conclusão
→ Relatório
```

O modelo deverá deixar explícito que documento recebido não é evidência, que instrução não é evidência e que a existência formal de um papel de trabalho não prova, sozinha, a resposta suficiente a um risco.

## 6. Relações e estados

Relações serão descritas em linguagem simples, por exemplo:

- uma organização usuária reúne usuários, clientes e trabalhos isolados de outras organizações;
- um cliente pode possuir vários trabalhos;
- um trabalho possui equipe, planejamento, processos, riscos, procedimentos, evidências, papéis, achados, conclusões e relatório;
- um risco pode possuir vários procedimentos; um procedimento pode responder a mais de um risco quando documentado;
- um documento recebido poderá originar evidências após avaliação; uma evidência poderá sustentar vários papéis;
- um achado deverá possuir suporte rastreável em papéis, evidências e conclusões.

Estados serão conceituais, sem modelar enumerações técnicas. O documento explicará ciclos como rascunho, em execução, em revisão, aprovado, reaberto, encerrado, cancelado ou inativo quando aplicáveis.

## 7. Fontes e limites

O modelo derivará apenas de documentos aprovados:

- [[Constituição do SIGA]];
- [[Matriz Mestra da Constituição do SIGA]];
- [[Visão do Produto do SIGA]];
- [[Glossário do SIGA]];
- [[Estrutura Funcional do SIGA]];
- [[Públicos e Perfis de Uso do SIGA]];
- [[Regras de Negócio e Metodologia de Auditoria]];
- [[Dados, Segurança, Privacidade e Histórico do SIGA]];
- [[Qualidade, Testes e Validação do SIGA]];
- [[Roadmap, Evolução e Continuidade do SIGA]];
- [[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]].

Em caso de conflito, o documento deverá apontar a fonte superior e não resolver regras por conta própria.

## 8. Obsidian e treinamento

O Modelo de Domínio terá YAML, aliases, `[[wikilinks]]`, relações explícitas, fontes e histórico. O mapa textual deverá ser legível no GitHub e útil no Obsidian; um Canvas poderá ser criado depois, sem se tornar fonte oficial.

O bloco educacional terá público, nível, pré-requisitos, objetivos, conceitos-chave, explicação do mapa, exemplo, erros comuns, boas práticas, estudo de caso, perguntas, questões de avaliação, resumo, fontes e versão.

## 9. Critérios de aceite

O documento estará pronto para revisão quando:

- separar claramente núcleo do MVP, extensões e fundamentos transversais;
- cobrir a cadeia metodológica completa;
- definir entidades conceituais sem transformar o arquivo em modelo físico de banco;
- explicar relações e cardinalidades em linguagem simples;
- diferenciar documento, instrução, evidência e papel de trabalho;
- registrar estados e rastreabilidade;
- preservar o Glossário como fonte de terminologia;
- possuir YAML, fontes, wikilinks, material educacional e histórico;
- não criar regras novas nem alterar documentos existentes;
- não possuir placeholders ou whitespace final.
