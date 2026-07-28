---
id: SIGA-GLS-001
title: Glossário do SIGA
aliases:
  - Glossário SIGA
  - Vocabulário Controlado do SIGA
type: documento-estruturante
domain: conhecimento
status: aprovado
version: 1.0
created: 2026-07-28
updated: 2026-07-28
approved: 2026-07-28
owner: responsavel-projeto
audience:
  - auditor
  - gestor
  - cliente
  - desenvolvedor
  - agente-ia
obsidian:
  note_type: glossary
  graph_role: vocabulary-hub
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Visão do Produto do SIGA]]"
sources:
  - "[[Constituição do SIGA]] (v1.0)"
  - "[[Matriz Mestra da Constituição do SIGA]] (v1.2)"
  - "[[Visão do Produto do SIGA]] (v1.0)"
  - "[[Públicos e Perfis de Uso do SIGA]] (v1.0)"
  - "[[Estrutura Funcional do SIGA]] (v1.0)"
  - "[[Arquitetura Tecnológica do SIGA]] (v1.0)"
  - "[[Documentação Mestre do SIGA]] (v1.0)"
  - "[[Conhecimento, Treinamento e Produção Educacional do SIGA]] (v1.0)"
  - "[[Regras de Negócio e Metodologia de Auditoria]] (v1.0)"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]] (v1.0)"
  - "[[Qualidade, Testes e Validação do SIGA]] (v1.0)"
  - "[[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]] (v1.0)"
tags:
  - siga
  - glossario
  - vocabulario-controlado
  - conhecimento
  - aprovado
---

# Glossário do SIGA

## Finalidade e prevalência

Este Glossário reúne os nomes canônicos dos conceitos já usados no SIGA para reduzir ambiguidades na leitura, na documentação, no treinamento e na evolução do produto. Ele não substitui regras de negócio, metodologia, arquitetura nem documentos específicos.

Em caso de conflito, prevalecem a [[Constituição do SIGA]] e, na sequência, os documentos específicos segundo a hierarquia documental vigente. Este arquivo registra vocabulário; não cria ou altera regras.

## Como consultar e manter

Use o termo em **negrito** como forma oficial. Sinônimos são auxiliares de busca e não substituem o nome oficial. Termo ainda ausente deve ser proposto para inclusão, com fonte, contexto e relação pretendida; não deve receber definição improvisada. Relações entre conceitos usam `[[wikilinks]]` e podem apontar para notas futuras identificadas expressamente ao final deste documento.

## Auditoria e metodologia

### **Achado**

**Definição.** Registro de uma situação examinada, com condição, critério, causa, efeito, risco, evidência, recomendação, resposta e conclusão, quando aplicáveis.

**Uso no SIGA.** É produzido e acompanhado no trabalho de auditoria, com suporte documental e relação com a conclusão e o relatório.

**Relações.** [[Evidência]], [[Papel de Trabalho]], [[Risco]], [[Relatório]].

### **Amostra**

**Definição.** Seleção documentada de itens de uma população para atender ao objetivo do procedimento, registrando objetivo, população, fonte, método, tamanho, seleção, exceções e conclusão.

**Uso no SIGA.** Apoia procedimentos e não resulta de percentual único aplicado indistintamente; o auditor valida, altera e justifica a seleção.

**Relações.** [[Procedimento]], [[Risco]], [[Evidência]].

### **Conclusão**

**Definição.** Resultado profissional registrado pelo auditor sobre um assunto, sustentado por documentação suficiente, apropriada, compreensível e revisável.

**Uso no SIGA.** Consolida a avaliação do conjunto de riscos, procedimentos, evidências, papéis de trabalho, achados e revisões antes de apoiar o relatório.

**Relações.** [[Evidência]], [[Papel de Trabalho]], [[Achado]], [[Relatório]].

### **Controle**

**Definição.** Elemento existente no processo que é considerado na avaliação e no tratamento de riscos de auditoria.

**Uso no SIGA.** É relacionado a processos, riscos, procedimentos e evidências conforme o trabalho, sem substituir o julgamento profissional.

**Relações.** [[Risco]], [[Procedimento]], [[Evidência]].

### **Documento recebido**

**Definição.** Registro do material entregue em resposta a uma solicitação; não é, por si só, evidência validada.

**Uso no SIGA.** Preserva o material fornecido, sua origem e os vínculos aplicáveis antes da avaliação do auditor.

**Relações.** [[Solicitação]], [[Instrução]], [[Evidência]].

### **Evidência**

**Definição.** Informação avaliada e incorporada pelo auditor, considerando origem, período, integridade, completude, relevância, confiabilidade, suficiência e adequação.

**Uso no SIGA.** Dá suporte a papéis de trabalho, achados, conclusões e relatório; documento recebido só se torna evidência após essa avaliação.

**Relações.** [[Documento Recebido]], [[Papel de Trabalho]], [[Achado]], [[Relatório]].

### **Instrução**

**Definição.** Orientação que define como localizar, extrair, filtrar, preparar e enviar um material; não é documento recebido nem evidência.

**Uso no SIGA.** Uma solicitação pode possuir nenhuma, uma ou várias instruções. A instrução orienta a extração, e a versão efetivamente enviada deve ser preservada. O documento recebido só se torna evidência após avaliação do auditor.

**Relações.** [[Solicitação]], [[Documento Recebido]], [[Evidência]].

### **Papel de trabalho**

**Definição.** Registro que vincula, conforme aplicável, conta, grupo, processo, ciclo, risco, procedimento, afirmação e evidência.

**Uso no SIGA.** Documenta a resposta ao risco e pode ser integral, parcial, complementar ou insuficiente; sua existência formal não prova resposta suficiente.

**Relações.** [[Risco]], [[Procedimento]], [[Evidência]], [[Achado]].

### **Procedimento**

**Definição.** Ação planejada ou executada para tratar risco e obter suporte para a conclusão de auditoria.

**Uso no SIGA.** Pode gerar solicitações e relacionar-se a amostras, controles, documentos recebidos, evidências e papéis de trabalho.

**Relações.** [[Risco]], [[Amostra]], [[Solicitação]], [[Papel de Trabalho]].

### **Relatório**

**Definição.** Comunicação de resultado que utiliza somente conclusões, achados, papéis, evidências, revisões e aprovações com suporte.

**Uso no SIGA.** Deve permitir retorno aos elementos metodológicos que sustentam seu conteúdo.

**Relações.** [[Conclusão]], [[Achado]], [[Evidência]], [[Trilha de Auditoria]].

### **Risco**

**Definição.** Assunto identificado e avaliado que requer tratamento no trabalho de auditoria.

**Uso no SIGA.** O risco referencial é um modelo; o risco do trabalho é decisão efetiva do auditor, que pode selecionar, adaptar ou descartar sugestões com justificativa.

**Relações.** [[Controle]], [[Procedimento]], [[Amostra]], [[Papel de Trabalho]].

### **Solicitação**

**Definição.** Pedido formal que define o que deve ser fornecido e, quando aplicável, período, formato, prazo e responsáveis.

**Uso no SIGA.** Pode ter nenhuma, uma ou várias instruções e preserva a versão efetivamente enviada.

**Relações.** [[Instrução]], [[Documento Recebido]], [[Procedimento]].

## Dados, segurança e privacidade

### **Autenticação**

**Definição.** Confirmação da identidade de quem solicita acesso ao SIGA.

**Uso no SIGA.** É distinta de autorização e integra a proteção do acesso a dados e arquivos.

**Relações.** [[Autorização]], [[Isolamento Multiempresa]], [[Histórico]].

### **Autorização**

**Definição.** Verificação de acesso segundo organização, função, responsabilidade, estado e confidencialidade.

**Uso no SIGA.** Deve ser aplicada além da interface, inclusive a links e arquivos, sob o princípio do menor privilégio.

**Relações.** [[Autenticação]], [[Isolamento Multiempresa]], [[Trilha de Auditoria]].

### **Histórico**

**Definição.** Registro de eventos individuais relevantes, como criação, alteração, aprovação, envio, recebimento, compartilhamento, revogação ou exclusão lógica.

**Uso no SIGA.** Preserva informações para reconstruir alterações; seus registros não devem ser alterados por usuários comuns.

**Relações.** [[Trilha de Auditoria]], [[Autorização]], [[Documento Recebido]].

### **Isolamento multiempresa**

**Definição.** Separação que impede o acesso, sem autorização expressa, aos dados de uma organização por usuários de outra.

**Uso no SIGA.** Alcança organizações, clientes, trabalhos, arquivos, links e automações; registros usam `organization_id` quando aplicável.

**Relações.** [[Organização Usuária]], [[Cliente]], [[Trabalho de Auditoria]], [[Autorização]].

### **Menor privilégio**

**Definição.** Princípio de conceder a cada usuário, vínculo ou agente somente o acesso necessário à sua organização, função, responsabilidade, finalidade e período de atuação.

**Uso no SIGA.** Orienta autorizações, links temporários, acessos excepcionais e automações, sem permitir acesso administrativo irrestrito ou proteção apenas pela interface.

**Relações.** [[Autorização]], [[Função no Trabalho]], [[Responsabilidade por Item]], [[Isolamento Multiempresa]].

### **Trilha de auditoria**

**Definição.** Reconstrução cronológica e contextual dos eventos para responder quem fez o quê, quando, onde, por quê, com qual estado, aprovação e consequência.

**Uso no SIGA.** Organiza o histórico como matéria-prima; não se confunde com cada evento individual registrado.

**Relações.** [[Histórico]], [[Autorização]], [[Relatório]].

## Desenvolvimento, arquitetura e qualidade

### **Ambiente**

**Definição.** Contexto separado de operação do SIGA, como desenvolvimento, homologação ou produção, com credenciais e dados próprios.

**Uso no SIGA.** Separa a construção e a validação da operação efetiva; em desenvolvimento, dados pessoais devem ser fictícios, anonimizados ou mascarados.

**Relações.** [[Homologação]], [[Migração]], [[Teste]], [[Autorização]].

### **Branch**

**Definição.** Linha de trabalho versionada que delimita o escopo aprovado de uma alteração e preserva revisão e reversão.

**Uso no SIGA.** Alterações relevantes são realizadas em branch própria; a principal contém somente versões revisadas e aprovadas.

**Relações.** [[Commit]], [[Pull Request]], [[Aprovação Humana]].

### **Commit**

**Definição.** Registro versionado de alteração com objetivo identificável e histórico compreensível.

**Uso no SIGA.** Não deve misturar assuntos independentes e precisa apoiar a revisão do escopo, da conformidade, dos impactos, da documentação e das evidências de teste.

**Relações.** [[Branch]], [[Pull Request]], [[Teste]].

### **Homologação**

**Definição.** Validação pelo usuário das entregas conforme a especificação e os critérios aplicáveis, antes de sua liberação como versão revisada e aprovada.

**Uso no SIGA.** Integra o ciclo de desenvolvimento e não é substituída pela aparência visual, por testes isolados ou pelo versionamento.

**Relações.** [[Teste]], [[Aprovação Humana]], [[Commit]].

### **Migração**

**Definição.** Alteração versionada da estrutura ou dos dados persistidos, planejada para preservar integridade, rastreabilidade e continuidade.

**Uso no SIGA.** Migrações de banco são versionadas, exigem aprovação humana quando aplicável e devem ser testadas; uma migração destrutiva bloqueia a liberação.

**Relações.** [[Ambiente]], [[Teste]], [[Reversão]], [[Aprovação Humana]].

### **Pull request**

**Definição.** Proposta de integração no GitHub sujeita a revisão, com histórico e escopo verificáveis.

**Uso no SIGA.** Apoia a revisão de alterações antes de a branch principal receber versões revisadas e aprovadas.

**Relações.** [[GitHub]], [[Branch]], [[Commit]].

### **Reversão**

**Definição.** Retorno controlado de uma alteração a estado anterior ou seguro por meio de branch, commit, versão, backup ou migração.

**Uso no SIGA.** É prevista para mudanças pequenas, verificáveis e reversíveis, especialmente antes de liberações que envolvam dados, segurança ou produção.

**Relações.** [[Branch]], [[Commit]], [[Migração]], [[Teste]].

### **Teste**

**Definição.** Verificação executada para demonstrar, conforme a necessidade, o comportamento de componentes, integrações, regras, permissões, dados, fluxos, regressões, aceitação ou aspectos metodológicos e de segurança.

**Uso no SIGA.** Regras críticas exigem testes específicos e a conclusão de tarefa técnica informa testes e resultados verificáveis.

**Relações.** [[Commit]], [[Homologação]], [[Autorização]].

## Documentação, Obsidian e treinamento

### **Backlink**

**Definição.** Referência de retorno que permite identificar notas que apontam para uma nota vinculada.

**Uso no SIGA.** Ajuda a navegar entre hubs, títulos constitucionais, documentos estruturantes e SDDs no Obsidian.

**Relações.** [[Wikilink]], [[Obsidian]], [[Matriz Mestra da Constituição do SIGA]].

### **Canvas**

**Definição.** Recurso auxiliar para representar visualmente relações entre notas e conceitos da base de conhecimento.

**Uso no SIGA.** Pode apoiar a navegação e a compreensão do grafo documental, mas não substitui Markdown, YAML, wikilinks ou a versão oficial no GitHub.

**Relações.** [[Obsidian]], [[Wikilink]], [[Backlink]], [[Fonte Oficial]].

### **Fonte oficial**

**Definição.** Repositório ou sistema reconhecido como referência autoritativa para uma classe de informação do SIGA.

**Uso no SIGA.** O GitHub é a fonte oficial de código e documentação versionada; quando formalmente implantado, o Supabase é a fonte oficial dos dados persistidos. Apoios, cópias e conversas não substituem a versão oficial.

**Relações.** [[GitHub]], [[Obsidian]], [[NotebookLM]], [[Tarefa]].

### **GitHub**

**Definição.** Fonte oficial do código e da documentação versionada do SIGA.

**Uso no SIGA.** Armazena branches, commits, pull requests, revisão, histórico, recuperação e documentação mestre; ferramentas de apoio não substituem essa fonte oficial.

**Relações.** [[Branch]], [[Commit]], [[Pull Request]], [[Obsidian]].

### **NotebookLM**

**Definição.** Ferramenta que consome fontes selecionadas e aprovadas para apoiar materiais de treinamento e conhecimento.

**Uso no SIGA.** Usa documentação estruturada e não substitui a fonte oficial nem a necessidade de preservar fontes, versões e público.

**Relações.** [[GitHub]], [[Obsidian]], [[Wikilink]].

### **Obsidian**

**Definição.** Ferramenta complementar para navegar e visualizar o grafo da base de conhecimento em Markdown.

**Uso no SIGA.** Apoia wikilinks, backlinks, hubs, Dataview e Canvas sem impedir a leitura independente no GitHub.

**Relações.** [[Wikilink]], [[Backlink]], [[NotebookLM]].

### **Wikilink**

**Definição.** Ligação explícita em Markdown, no formato `[[nome da nota]]`, que representa relação entre documentos ou conceitos.

**Uso no SIGA.** Conecta fontes, regras, módulos e conteúdos de treinamento; pode apontar intencionalmente para nota futura.

**Relações.** [[Backlink]], [[Obsidian]], [[GitHub]].

## Inteligência artificial, agentes e automação

### **Agente**

**Definição.** Executor orientado por objetivo, contexto, ferramentas, permissões, limites e saída.

**Uso no SIGA.** Atua como apoio em escopo autorizado, registrando fontes, ações, resultado, limitações e aprovação quando exigida.

**Relações.** [[Skill]], [[Autonomia]], [[Aprovação Humana]].

### **Aprovação humana**

**Definição.** Decisão do responsável humano exigida para matérias que não podem ser aprovadas isoladamente por agentes.

**Uso no SIGA.** É obrigatória, entre outros casos, para regras, metodologia, banco, migrações, permissões, produção, exclusões, relatórios, papéis e conteúdo confidencial.

**Relações.** [[Agente]], [[Autonomia]], [[Homologação]].

### **Autonomia**

**Definição.** Limite de atuação concedido a um agente: consulta, proposta, execução controlada em escopo e branch, ou automação operacional limitada de baixo risco.

**Uso no SIGA.** Depende de aprovação humana e não autoriza ampliar escopo, inventar regras ou ignorar fontes oficiais.

**Relações.** [[Agente]], [[Skill]], [[Aprovação Humana]].

### **Skill**

**Definição.** Procedimento reutilizável com entradas, passos, critérios, limitações e versão.

**Uso no SIGA.** Uma skill pode servir a vários agentes; um agente pode usar várias skills dentro das permissões e limites aprovados.

**Relações.** [[Agente]], [[Autonomia]], [[Aprovação Humana]].

### **Tarefa**

**Definição.** Unidade de trabalho registrada que conecta objetivo, escopo, fontes, situação, arquivos autorizados, ações e resultado verificável.

**Uso no SIGA.** Orienta a atuação de pessoas e agentes dentro do escopo aprovado e integra a rastreabilidade entre SDDs, planos, decisões, código e evidências.

**Relações.** [[Agente]], [[Skill]], [[Aprovação Humana]], [[Fonte Oficial]].

## Produto, organizações e módulos

### **Cliente**

**Definição.** Entidade auditada ou atendida no contexto de um trabalho de auditoria.

**Uso no SIGA.** Pode responder solicitações, enviar documentos e acompanhar pendências no limite de acesso necessário, sem acesso a julgamentos profissionais ou informações internas reservadas.

**Relações.** [[Organização Usuária]], [[Trabalho de Auditoria]], [[Documento Recebido]].

### **Função no trabalho**

**Definição.** Papel exercido por uma pessoa em um trabalho de auditoria específico.

**Uso no SIGA.** É uma dimensão de acesso distinta do perfil geral e da responsabilidade por item; participa da autorização e da segregação no contexto daquele trabalho.

**Relações.** [[Perfil Geral]], [[Responsabilidade por Item]], [[Trabalho de Auditoria]], [[Autorização]].

### **Módulo**

**Definição.** Parte do SIGA com finalidade definida, regras de negócio próprias e integração controlada com os demais módulos.

**Uso no SIGA.** Sua existência na arquitetura não implica implantação imediata; a evolução segue o roadmap aprovado e etapas anteriores necessárias.

**Relações.** [[Trabalho de Auditoria]], [[Risco]], [[Relatório]].

### **Organização usuária**

**Definição.** Empresa de auditoria que usa o SIGA para conduzir seus trabalhos.

**Uso no SIGA.** É distinta do cliente auditado e pode coexistir com outras organizações sob isolamento multiempresa.

**Relações.** [[Cliente]], [[Trabalho de Auditoria]], [[Isolamento Multiempresa]].

### **Perfil geral**

**Definição.** Posição do usuário na organização usuária.

**Uso no SIGA.** Compõe, com a função no trabalho e a responsabilidade por item, a avaliação de permissões; não substitui os vínculos específicos do trabalho.

**Relações.** [[Função no Trabalho]], [[Responsabilidade por Item]], [[Organização Usuária]], [[Autorização]].

### **Responsabilidade por item**

**Definição.** Atribuição de responsabilidade sobre um risco, procedimento, papel de trabalho, solicitação, achado ou relatório específico.

**Uso no SIGA.** Delimita responsabilidade e acesso no nível do item, em conjunto com organização, perfil geral, função no trabalho, estado, confidencialidade e segregação.

**Relações.** [[Perfil Geral]], [[Função no Trabalho]], [[Trabalho de Auditoria]], [[Autorização]].

### **Trabalho de auditoria**

**Definição.** Execução individual de auditoria que organiza planejamento, riscos, procedimentos, documentos, evidências, papéis, achados, revisão, conclusões e relatório.

**Uso no SIGA.** É delimitado por responsabilidades, contexto e vínculos metodológicos próprios, sem confundir a base metodológica reutilizável com a decisão efetiva do auditor.

**Relações.** [[Organização Usuária]], [[Cliente]], [[Risco]], [[Relatório]].

## Notas futuras e termos ausentes

Os wikilinks de conceitos deste Glossário que ainda não possuem arquivo próprio são relações futuras intencionais, e não falhas documentais. Até a criação das notas correspondentes, a definição canônica permanece nesta nota hub. Novos termos devem ser propostos com fonte aprovada, contexto de uso, definição derivada e relações; se houver conflito, deve-se apontar a pendência, sem resolvê-la silenciosamente.

## Material para treinamento

**Público.** Auditores, gestores, clientes, desenvolvedores e agentes de IA, conforme as permissões e o conteúdo aplicável.

**Nível.** Introdutório, com aplicação orientada para leitores que já participam do contexto do SIGA.

**Pré-requisitos.** Leitura da [[Constituição do SIGA]] e familiaridade básica com Markdown, `[[wikilinks]]`, documentação versionada e o fluxo de um trabalho de auditoria.

### Objetivos de aprendizagem

- Usar o nome oficial dos conceitos centrais do SIGA.
- Distinguir documento recebido de evidência e histórico de trilha de auditoria.
- Relacionar risco, procedimento, amostra, papel de trabalho, achado e relatório.
- Reconhecer os limites de agentes, skills, autonomia e aprovação humana.

### Conceitos-chave

- A rastreabilidade conecta planejamento, risco, procedimento, amostra, evidência, papel de trabalho, achado, conclusão e relatório.
- Documento recebido registra o material entregue; evidência é avaliada pelo auditor.
- Histórico registra eventos; trilha de auditoria os organiza em contexto.
- GitHub é fonte oficial; Obsidian e NotebookLM são apoios complementares.

### Erros comuns

- Tratar documento recebido como evidência antes da avaliação do auditor.
- Confundir perfil geral, função no trabalho e responsabilidade por item ao definir acesso.
- Usar cópias, conversas ou ferramentas de apoio como se substituíssem a fonte oficial.
- Considerar uma interface pronta, um teste isolado ou um agente autônomo como aprovação suficiente.

### Boas práticas

- Usar o termo oficial e registrar a fonte, versão e contexto quando propor nova entrada.
- Relacionar cada decisão, procedimento e resultado aos seus elementos de suporte.
- Aplicar menor privilégio e verificar permissões também fora da interface.
- Versionar, testar e prever reversão para mudanças, especialmente em migrações e produção.

### Roteiro de apresentação

1. Apresente a finalidade do vocabulário controlado e a regra de prevalência.
2. Explique o ciclo metodológico e a diferença entre documento recebido e evidência.
3. Mostre como segurança, histórico e isolamento multiempresa sustentam o produto.
4. Delimite o papel de versionamento, testes, homologação e aprovação humana.
5. Explique como agentes, skills e ferramentas documentais apoiam o trabalho sem substituir a responsabilidade humana.

### Estudo de caso

Em um trabalho de auditoria, um risco gera procedimento e solicitação. O cliente envia um documento recebido conforme instrução. O auditor o avalia como evidência e o vincula a um papel de trabalho. A revisão identifica um achado antes de a conclusão sustentar o relatório. O histórico preserva os eventos e a trilha de auditoria permite reconstruir o contexto.

### Perguntas para discussão

1. Por que o documento recebido não é automaticamente evidência?
2. Como histórico e trilha de auditoria se complementam?
3. Que limites de autonomia exigem aprovação humana?
4. Por que o GitHub é a fonte oficial mesmo quando o Obsidian facilita a navegação?

### Questões de avaliação

1. Diferencie organização usuária, cliente e trabalho de auditoria.
2. Cite os elementos que uma amostra deve registrar.
3. Explique a diferença entre autenticação e autorização.
4. Quais são os quatro níveis de autonomia de agentes previstos para o SIGA?
5. Quando uma nota futura pode receber um wikilink neste Glossário?

### Resumo

O Glossário controla o vocabulário sem criar regras novas. O SIGA mantém rastreabilidade entre o trabalho de auditoria e seus resultados, protege acessos por contexto e registra a evolução em fontes oficiais e versionadas.

### Fontes e versionamento

Este material deriva exclusivamente das fontes aprovadas declaradas no YAML deste documento: Constituição e documentos constitucionais na versão indicada, Matriz Mestra v1.2 e Visão do Produto v1.0. A versão aprovada é 1.0, em 2026-07-28; alterações futuras devem informar fonte, versão, data, público e responsável.

## Relações principais

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- [[Visão do Produto do SIGA]]
- [[Estrutura Funcional do SIGA]]
- [[Regras de Negócio e Metodologia de Auditoria]]
- [[Dados, Segurança, Privacidade e Histórico do SIGA]]
- [[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]]

## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.9 | 2026-07-28 | Minuta inicial do Glossário do SIGA para revisão humana | Substituída |
| 0.9 | 2026-07-28 | Correção da rodada 1/5: entradas ausentes, fontes rastreáveis e bloco educacional | Substituída |
| 1.0 | 2026-07-28 | Aprovação humana do Glossário do SIGA | Aprovada |
