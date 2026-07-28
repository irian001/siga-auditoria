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

# CONSTITUIÇÃO DO SIGA

## Sistema Integrado para Gerenciamento de Auditoria

**Versão:** 0.9
**Situação:** Em revisão
**Data-base:** 24 de julho de 2026
**Atualizada em:** 27 de julho de 2026

---

# PREÂMBULO

O SIGA — Sistema Integrado para Gerenciamento de Auditoria — é concebido como uma plataforma integrada de gestão, execução, documentação, revisão e qualidade dos trabalhos de auditoria.

O projeto deverá atender inicialmente firmas e equipes de auditoria de pequeno e médio porte, com especial atenção às atividades realizadas em cooperativas, permissionárias de distribuição de energia elétrica, organizações do setor agropecuário e empresas convencionais.

O SIGA não deverá ser tratado apenas como um software de controle administrativo. Sua estrutura deverá refletir a metodologia de auditoria, o julgamento profissional, a rastreabilidade dos procedimentos, a suficiência das evidências, a supervisão dos trabalhos e o controle de qualidade.

A plataforma será desenvolvida de forma modular, progressiva e documentada, preservando a coerência entre regras de negócio, metodologia de auditoria, arquitetura tecnológica e experiência dos usuários.

Esta Constituição estabelece os princípios permanentes, limites, responsabilidades, regras de governança e diretrizes de desenvolvimento que deverão orientar todas as decisões relacionadas ao SIGA.

---

# TÍTULO I — IDENTIDADE E FINALIDADE DO SIGA

## Art. 1º — Denominação

O sistema será denominado **SIGA — Sistema Integrado para Gerenciamento de Auditoria**. A denominação SIGA deverá ser utilizada nos documentos técnicos, apresentações, repositórios, materiais de treinamento e comunicações oficiais do projeto.

## Art. 2º — Finalidade

O SIGA tem por finalidade apoiar o gerenciamento completo dos trabalhos de auditoria, desde a organização comercial e administrativa até o planejamento, execução, documentação, revisão, comunicação dos resultados e controle de qualidade.

## Art. 3º — Natureza do sistema

O SIGA será estruturado simultaneamente como:

1. sistema operacional de auditoria;
2. sistema de gestão de trabalhos;
3. repositório de metodologia;
4. base de conhecimento;
5. ambiente de rastreabilidade;
6. plataforma de treinamento;
7. fonte estruturada para geração de apresentações e materiais educacionais.

## Art. 4º — Objetivos gerais

São objetivos gerais do SIGA: organizar os trabalhos de forma padronizada; preservar o julgamento profissional; relacionar riscos, controles, procedimentos, evidências, achados e conclusões; permitir supervisão e revisão; reduzir controles paralelos; preservar o histórico; apoiar qualidade e auditoria dos pares; facilitar a capacitação; evoluir para segmentos e serviços; e manter o conhecimento metodológico reutilizável.

**Detalhamento:** [[Identidade e Finalidade do SIGA]]

---

# TÍTULO II — PRINCÍPIOS FUNDAMENTAIS

## Art. 5º — Princípio da metodologia antes da tecnologia

A tecnologia deverá servir à metodologia de auditoria. Nenhuma tela, tabela, fluxo ou funcionalidade deverá ser criada apenas por conveniência técnica quando contrariar, simplificar indevidamente ou descaracterizar o processo de auditoria.

## Art. 6º — Princípio da rastreabilidade

Toda informação relevante deverá, quando aplicável, permitir rastreamento entre planejamento, processo, risco, controle, procedimento, amostra, evidência, papel de trabalho, achado, recomendação, plano de ação, conclusão e relatório, de modo a esclarecer origem, tratamento e resultado.

## Art. 7º — Princípio do julgamento profissional

O SIGA deverá apoiar o julgamento do auditor, mas não substituí-lo. Regras automáticas, cálculos, alertas e classificações serão instrumentos auxiliares e deverão admitir fundamentações, exceções e conclusões profissionais.

## Art. 8º — Princípio da documentação suficiente

Toda conclusão relevante deverá estar apoiada em documentação suficiente, apropriada, compreensível e revisável. O sistema deverá favorecer papéis de trabalho claros e evitar registros genéricos, incompletos ou sem vínculo com a finalidade do procedimento.

## Art. 9º — Princípio da revisão independente

O sistema deverá permitir segregação entre preparação, execução, supervisão e revisão. Um usuário poderá acumular funções administrativas ou operacionais, mas não deverá revisar o próprio trabalho quando a revisão independente for exigida.

## Art. 10 — Princípio da simplicidade progressiva

As interfaces deverão apresentar inicialmente apenas as informações necessárias à atividade em execução. Campos, opções e detalhes adicionais deverão ser apresentados progressivamente, evitando formulários excessivamente extensos e telas visualmente sobrecarregadas.

## Art. 11 — Princípio da modularidade

Cada módulo deverá possuir finalidade definida, regras de negócio próprias e integração controlada com os demais módulos. A alteração de um módulo não deverá produzir efeitos imprevisíveis em áreas não relacionadas.

## Art. 12 — Princípio da documentação permanente

Toda decisão relevante deverá ser documentada. O projeto não poderá depender exclusivamente de conversas, memória dos participantes ou contexto temporário de agentes de inteligência artificial.

## Art. 13 — Princípio da reutilização do conhecimento

A documentação deverá servir ao desenvolvimento, uso operacional, treinamento, supervisão, revisão, atendimento ao cliente e produção de materiais para o NotebookLM ou ferramenta equivalente. Deverá ser mantida em Markdown legível, com YAML válido, identificadores permanentes e `[[wikilinks]]` quando aplicáveis, formando uma base interligada compatível com GitHub e Obsidian.

## Art. 14 — Princípio da evolução controlada

O SIGA deverá evoluir em etapas pequenas, verificáveis, documentadas e reversíveis. Nenhuma funcionalidade deverá ser considerada concluída apenas porque sua aparência visual está pronta.

## Art. 15 — Princípio da fonte oficial

O GitHub será a fonte oficial do código e da documentação versionada. O Supabase será, quando formalmente implantado, a fonte oficial dos dados persistidos. Conversas em ferramentas de inteligência artificial, projetos temporários e arquivos locais não serão considerados fontes oficiais.

**Detalhamento:** [[Princípios Fundamentais do SIGA]]

---

# TÍTULO III — PÚBLICOS E PERFIS DE USO

## Art. 16 — Públicos do SIGA

O SIGA poderá atender progressivamente sócios e responsáveis técnicos, gerentes e supervisores, auditores, assistentes, revisores internos e de qualidade, auditores dos pares, clientes auditados, administradores, consultores e especialistas autorizados.

## Art. 17 — Acúmulo de funções

O sistema deverá reconhecer que equipes pequenas podem exigir acúmulo de funções. O acúmulo será permitido quando não comprometer a independência, a revisão ou o controle de qualidade.

## Art. 18 — Segregação por item

A segregação de funções deverá ser analisada por trabalho, área, procedimento, papel de trabalho ou item revisado. O sistema não deverá pressupor segregação absoluta baseada apenas no cargo geral do usuário.

## Art. 19 — Clientes

O acesso de clientes será limitado ao necessário para responder solicitações, enviar documentos, acompanhar pendências, indicar responsáveis, responder achados, registrar planos de ação e acompanhar prazos. Clientes não deverão acessar informações internas, julgamentos profissionais, estratégias, materialidade, avaliações confidenciais ou procedimentos reservados.

**Detalhamento:** [[Públicos e Perfis de Uso do SIGA]]

---

# TÍTULO IV — ESTRUTURA FUNCIONAL DO SIGA

## Art. 20 — Organização funcional

O SIGA será organizado em módulos e ciclos de trabalho, compreendendo progressivamente gestão comercial, clientes, usuários, propostas, contratos, planejamento, processos, riscos, controles, programas, procedimentos, amostras, solicitações, instruções de evidência, documentos recebidos, evidências, papéis de trabalho, achados, recomendações, planos de ação, revisão, supervisão, qualidade, relatórios, portal do cliente e painéis.

Solicitação, instrução, documento recebido e evidência são objetos distintos: a solicitação define o que deve ser fornecido; a instrução orienta como localizar, extrair, preparar ou enviar; o documento recebido registra o material entregue; e a evidência resulta da avaliação do auditor.

## Art. 21 — Desenvolvimento gradual

A existência de um módulo na arquitetura não implica sua implantação imediata. Cada módulo deverá ser desenvolvido conforme o roadmap aprovado e somente após a conclusão satisfatória das etapas anteriores necessárias.

## Art. 22 — Núcleo mínimo

O núcleo operacional deverá permitir progressivamente cadastrar clientes, criar trabalhos, definir responsáveis, planejar a auditoria, identificar processos e riscos, relacionar procedimentos, registrar solicitações, instruções, documentos recebidos e evidências, elaborar papéis de trabalho, registrar achados, revisar itens, acompanhar pendências e emitir conclusões.

## Art. 23 — Segmentos

O SIGA deverá permitir estruturas gerais e especializadas por segmento, incluindo, conforme aplicável, permissionárias de distribuição de energia elétrica, cooperativas agropecuárias, cooperativas de infraestrutura e de crédito, empresas comerciais, industriais, prestadores de serviços e entidades personalizadas.

## Art. 24 — Modelos e personalizações

Os modelos deverão funcionar como ponto de partida, sem impedir personalizações autorizadas. A personalização não deverá romper a rastreabilidade, a metodologia, os padrões mínimos de documentação nem a distinção entre os objetos documentais previstos neste Título.

**Detalhamento:** [[Estrutura Funcional do SIGA]]

---

# TÍTULO V — ARQUITETURA TECNOLÓGICA

## Art. 25 — Tecnologias principais

A arquitetura inicial do SIGA será baseada, preferencialmente, em Next.js, React, TypeScript, GitHub, Lovable, Codex, Supabase e ferramentas de testes compatíveis. Qualquer alteração relevante dessa arquitetura deverá ser formalmente registrada.

## Art. 26 — Papel do Lovable

O Lovable será utilizado principalmente para criação e evolução de interfaces, estruturação visual, fluxos, formulários, componentes, navegação, integração inicial com serviços e protótipos. Não deverá decidir isoladamente regras críticas de auditoria, segurança, banco de dados ou arquitetura.

## Art. 27 — Papel do Codex

O Codex será utilizado principalmente para diagnóstico do repositório, revisão técnica, refatoração, implementação de regras complexas, testes, análise de segurança, correção de falhas, integração com Git e revisão da arquitetura. Seu uso deverá concentrar-se em atividades de maior complexidade e valor técnico.

## Art. 28 — Papel do ChatGPT Work

O ChatGPT Work será utilizado principalmente para especificação funcional, planejamento, regras de negócio, documentação, desenho de processos, critérios de aceite, treinamentos e organização do roadmap.

## Art. 29 — Papel do GitHub

O GitHub será utilizado para armazenamento oficial do código, controle de versões, branches, commits, pull requests, revisão, histórico, recuperação e documentação mestre.

## Art. 30 — Papel do Supabase

O Supabase será utilizado, conforme o avanço do projeto, para banco de dados, autenticação, autorização, controle de acesso, armazenamento, políticas de segurança, registros persistentes e integração entre usuários e empresas. A existência de um projeto Supabase não autoriza a criação indiscriminada de tabelas ou políticas.

## Art. 31 — Independência entre interface e persistência

Os componentes visuais não deverão depender diretamente da implementação do banco de dados. A comunicação deverá ocorrer por contratos, serviços, repositórios ou camadas equivalentes, permitindo a substituição de dados simulados por persistência real sem reconstrução integral das telas.

**Detalhamento:** [[Arquitetura Tecnológica do SIGA]]

---

# TÍTULO VI — GOVERNANÇA DO DESENVOLVIMENTO

## Art. 32 — Ciclo de desenvolvimento

Cada funcionalidade deverá seguir, preferencialmente, identificação da necessidade, análise do processo, definição da regra, especificação, aprovação funcional, implementação, testes, revisão técnica, validação pelo usuário, versionamento, atualização documental e liberação. Especificações, decisões e tarefas deverão ser organizadas por SDD ou registro equivalente rastreável.

## Art. 33 — Proibição de desenvolvimento sem especificação

Nenhum módulo relevante deverá ser iniciado sem uma especificação mínima aprovada, com objetivo, usuários, fluxo, dados, regras, permissões, estados, exceções, critérios de aceite e necessidades de treinamento, conforme aplicável.

## Art. 34 — Limitação do escopo

Cada tarefa deverá informar claramente quais arquivos, módulos, telas ou regras podem ser alterados. As tarefas deverão ser pequenas o suficiente para revisão e validação objetivas. Ferramentas de inteligência artificial não deverão modificar itens não relacionados sem justificativa expressa.

## Art. 35 — Proteção do código existente

Nenhum arquivo válido deverá ser excluído ou substituído sem análise do conteúdo existente, comparação com a nova proposta, justificativa e possibilidade de recuperação pelo Git.

## Art. 36 — Branches

Alterações relevantes deverão ser realizadas em branch própria. A branch principal deverá permanecer estável e conter somente versões revisadas e aprovadas.

## Art. 37 — Commits e revisão

Os commits deverão possuir objetivo identificável, evitar misturar assuntos independentes, registrar alterações relevantes e permitir compreensão do histórico. A revisão deverá verificar escopo, conformidade com a especificação, impactos, documentação e evidências de teste.

## Art. 38 — Critério de conclusão

Uma funcionalidade somente será considerada concluída quando atender à especificação, funcionar tecnicamente, possuir testes adequados, ter sido revisada e validada, possuir documentação atualizada, estar versionada e não introduzir falhas conhecidas não registradas. A definição de conclusão deverá indicar escopo atendido e evidências verificáveis.

**Detalhamento:** [[Governança do Desenvolvimento do SIGA]]

---

# TÍTULO VII — DOCUMENTAÇÃO MESTRE

## Art. 39 — Sistema documental

A documentação do SIGA deverá ser organizada de forma hierárquica, versionada e de leitura progressiva, em Markdown com YAML válido, identificadores únicos e ligações explícitas entre documentos. Recursos do Obsidian serão complementares e não poderão impedir a leitura no GitHub.

## Art. 40 — Documentos fundamentais

A estrutura mínima deverá incluir Constituição, visão do produto, arquitetura, modelo de domínio, metodologia, regras de negócio, modelo de banco de dados, padrões de interface, regras de desenvolvimento, roadmap, situação do projeto, histórico, decisões arquiteturais, especificações de módulos, planos de sprint, SDDs, tarefas e materiais de treinamento.

## Art. 41 — Constituição como norma superior

Esta Constituição será a norma superior do projeto. Os demais documentos deverão ser interpretados de forma compatível com seus princípios.

## Art. 42 — Hierarquia documental

Em caso de conflito, observar-se-á a seguinte ordem: Constituição do SIGA; decisões expressamente aprovadas pelo responsável; especificação funcional vigente; regras de negócio; arquitetura aprovada; especificação do módulo; plano da sprint; e instruções temporárias de execução.

## Art. 43 — Documentação de situação

O arquivo de situação do projeto deverá informar última etapa concluída, atividades em andamento, pendências, bloqueios, riscos, branch atual, último commit relevante e próximo passo exato.

## Art. 44 — Decisões arquiteturais

Decisões relevantes deverão ser registradas em documentos próprios, contendo contexto, problema, opções consideradas, decisão, justificativa, consequências, data e responsável.

**Detalhamento:** [[Documentação Mestre do SIGA]]

---

# TÍTULO VIII — CONHECIMENTO, TREINAMENTO E NOTEBOOKLM

## Art. 45 — Base de conhecimento

A documentação do SIGA deverá ser produzida como base de conhecimento estruturada, apta à utilização por pessoas e ferramentas de inteligência artificial, preservando contexto, fontes, identificadores e vínculos entre normas, especificações, tarefas e entregas.

## Art. 46 — Finalidades educacionais

Os conteúdos deverão possibilitar a criação de apresentações, apostilas, manuais, roteiros de aula, vídeos, resumos, perguntas frequentes, estudos de caso, avaliações, materiais de integração e treinamentos no NotebookLM.

## Art. 47 — Camadas documentais

Cada tema relevante deverá distinguir as camadas conceitual, metodológica, operacional, técnica e educacional.

## Art. 48 — Públicos de treinamento

Os materiais deverão considerar, no mínimo, auditores, assistentes, revisores, gerentes, responsáveis técnicos, administradores, clientes e responsáveis por planos de ação.

## Art. 49 — Treinamento de auditores

O treinamento dos auditores deverá priorizar metodologia, planejamento, risco, controles, procedimentos, amostragem, evidências, documentação, julgamento profissional, revisão, qualidade e comunicação dos resultados.

## Art. 50 — Treinamento de clientes

O treinamento dos clientes deverá priorizar uso do portal, envio de documentos, atendimento de solicitações, prazos, responsáveis, respostas, pendências, achados, recomendações e planos de ação. Informações internas ou confidenciais não deverão compor materiais destinados a clientes.

## Art. 51 — Estrutura educacional mínima

Os documentos de treinamento deverão conter, conforme aplicável, objetivos de aprendizagem, conceitos, contexto, fluxo, responsabilidades, passo a passo, exemplos, erros comuns, boas práticas, perguntas frequentes, estudo de caso, questões de avaliação, glossário e resumo para apresentação.

## Art. 52 — Estrutura apta a apresentações

Os textos deverão utilizar títulos descritivos, seções curtas, conceitos explícitos, vocabulário consistente, exemplos separados das regras, listas objetivas, referências cruzadas e conclusões claras. Deverá ser evitada a concentração de informações exclusivamente em tabelas sem explicação narrativa.

## Art. 53 — Reutilização

Sempre que possível, o mesmo núcleo de conhecimento deverá ser reutilizado para documentação do sistema, manual operacional, treinamento, apresentação e comunicação com o cliente. Linguagem e profundidade deverão ser adaptadas ao público sem alterar a essência da regra.

**Detalhamento:** [[Conhecimento, Treinamento e Produção Educacional do SIGA]]

---

# TÍTULO IX — REGRAS DE NEGÓCIO E METODOLOGIA DE AUDITORIA

## Art. 54 — Centralidade das regras de negócio

As regras de negócio constituem o principal patrimônio intelectual do SIGA e deverão ser documentadas independentemente do código, banco ou interface. Deverão também preservar, quando aplicável, a separação entre solicitação, instrução, documento recebido e evidência.

## Art. 55 — Registro das regras

Cada regra relevante deverá conter identificação, descrição, objetivo, origem, condição de aplicação, exceções, resultado esperado, impacto no sistema, exemplo e forma de teste.

## Art. 56 — Metodologia

A metodologia de auditoria deverá orientar aceitação e continuidade, independência, planejamento, materialidade, entendimento da entidade, avaliação e resposta aos riscos, testes, evidências, documentação, conclusões, comunicação, revisão e controle de qualidade.

## Art. 57 — Relações metodológicas

O sistema deverá preservar as relações entre objetivo da auditoria, risco identificado, controle existente, procedimento planejado e executado, solicitação, instrução aplicável, documento recebido, evidência obtida, resultado, conclusão e impacto no relatório.

## Art. 58 — Exceções e justificativas

Sempre que uma regra permitir exceção, o sistema deverá solicitar justificativa adequada, vinculada ao usuário, data, item e contexto da decisão, preservando a rastreabilidade do objeto afetado.

**Detalhamento:** [[Regras de Negócio e Metodologia de Auditoria]]

---

# TÍTULO X — DADOS, SEGURANÇA E HISTÓRICO

## Art. 59 — Integridade dos dados

Os dados deverão ser preservados contra alteração indevida, duplicação, perda ou exclusão não autorizada. Dados e arquivos deverão manter, conforme aplicável, origem, versão, integridade, vínculo, permissões, classificação e retenção.

## Art. 60 — Histórico e trilha de auditoria

Alterações e eventos relevantes deverão registrar usuário ou agente, data, informação anterior e nova, motivo quando aplicável, contexto e resultado. A trilha de auditoria deverá permitir reconstruir quem fez o quê, quando, em qual contexto, com qual autorização e com quais consequências.

## Art. 61 — Multiempresa

O SIGA deverá ser estruturado para funcionamento multiempresa. Os dados de uma empresa não deverão ser acessados por usuários de outra empresa sem autorização expressa; o isolamento deverá ser aplicado também a clientes, trabalhos, arquivos, links e automações.

## Art. 62 — Menor privilégio

Cada usuário ou agente deverá possuir apenas os acessos necessários ao desempenho de suas funções, considerados organização, cliente, trabalho, responsabilidade, estado e confidencialidade. A autorização não poderá depender apenas da interface.

## Art. 63 — Exclusão lógica e arquivos

Sempre que adequado, registros relevantes não deverão ser fisicamente apagados. Deverá ser utilizada inativação, cancelamento ou exclusão lógica, preservando o histórico. Links temporários para arquivos deverão ser específicos, autorizados, revogáveis, limitados por finalidade e prazo, e registrados.

## Art. 64 — Segredos e credenciais

Senhas, chaves, tokens e credenciais não deverão ser registrados no repositório. Deverão ser utilizados mecanismos próprios de variáveis de ambiente e gerenciamento de segredos.

**Detalhamento:** [[Dados, Segurança, Privacidade e Histórico do SIGA]]

---

# TÍTULO XI — QUALIDADE E TESTES

## Art. 65 — Qualidade como requisito

Qualidade não será considerada etapa posterior. Ela deverá ser incorporada desde a especificação, arquitetura e implementação, abrangendo metodologia, dados, segurança, experiência e documentação.

## Art. 66 — Tipos de teste

O projeto deverá adotar, conforme a necessidade, testes unitários, de componentes, integração, regras de negócio, permissões, banco, fluxo, regressão, validação visual, aceitação e testes metodológicos.

## Art. 67 — Testes de regras críticas

Regras críticas de permissões, revisão, segregação, cálculos, rastreabilidade, mudanças de estado, integridade, exclusão, qualidade, isolamento multiempresa, arquivos e evidências deverão possuir testes específicos, positivos e negativos. Os testes metodológicos deverão verificar, quando aplicável, risco, controle, procedimento, solicitação, documento recebido, evidência, papel de trabalho, achado, amostragem e conclusão.

## Art. 68 — Evidência de conclusão

A conclusão de uma tarefa técnica deverá indicar os testes executados e seus resultados. A definição de pronto deverá exigir escopo atendido, critérios de aceite, revisão, validação, documentação, versionamento, evidências e tratamento das falhas críticas. Não será aceita afirmação genérica de funcionamento sem evidência verificável.

**Detalhamento:** [[Qualidade, Testes e Validação do SIGA]]

---

# TÍTULO XII — AGENTES DE INTELIGÊNCIA ARTIFICIAL

## Art. 69 — Função dos agentes

Agentes de inteligência artificial poderão atuar como analistas, especificadores, desenvolvedores, revisores, testadores, documentadores e especialistas temporários. Skill é procedimento reutilizável, versionado e limitado, que poderá ser empregado por um ou mais agentes.

## Art. 70 — Limites

Nenhum agente poderá alterar o escopo por iniciativa própria, ignorar a documentação oficial, excluir conteúdo válido sem justificativa, criar regras de negócio sem aprovação, considerar tarefa concluída sem testes, substituir o julgamento profissional do responsável ou acessar informações fora da necessidade autorizada.

## Art. 71 — Agentes temporários

Poderão ser criados agentes especializados com finalidade, escopo e duração determinados. Esses agentes deverão possuir missão, documentos de entrada, fontes autorizadas, entregáveis, permissões, limites, registro de execução e critérios de encerramento.

## Art. 72 — Especialidades e autonomia

Poderão existir agentes especializados em normas de auditoria, riscos, controles, fluxo documental, papéis de trabalho, evidências, qualidade, revisão de código, testes sistêmicos, banco de dados, segurança e treinamento. Sua autonomia será limitada a consulta, proposta, execução controlada em escopo e branch, ou automação operacional de baixo risco, conforme aprovação humana.

## Art. 73 — Entregas permanentes e aprovação humana

O conhecimento gerado por agentes temporários deverá ser registrado em documentos permanentes. Nenhum conhecimento essencial deverá permanecer apenas no histórico da conversa. Aprovação humana será obrigatória para regras metodológicas, permissões, dados sensíveis, produção, exclusões, migrações, relatórios e demais decisões de impacto material.

**Detalhamento:** [[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]]

---

# TÍTULO XIII — ROADMAP E PRIORIZAÇÃO

## Art. 74 — Priorização

O roadmap deverá priorizar fundação documental e técnica, cadastros essenciais, trabalhos, planejamento, riscos e controles, procedimentos, solicitações, instruções, documentos, evidências e papéis de trabalho, revisão, achados, planos de ação, qualidade, portal do cliente, integrações e painéis avançados. As fases deverão registrar dependências, riscos, bloqueios, responsáveis, alternativas e critério de avanço.

## Art. 75 — MVP

O MVP deverá validar o fluxo central do trabalho de auditoria, sem tentar abranger todas as funcionalidades futuras do SIGA. Poderá simplificar automações e extensão funcional, mas não isolamento, segurança, rastreabilidade, histórico, responsáveis, segregação crítica nem suporte às conclusões.

## Art. 76 — Funcionalidades adiadas, continuidade e dívida

Funcionalidades futuras deverão permanecer registradas no roadmap, sem introdução prematura no núcleo. Situação do projeto, decisões, SDDs, planos, tarefas, histórico e dívidas técnica ou metodológica deverão permanecer versionados para assegurar continuidade. Falhas críticas de segurança, dados, histórico, segregação ou relatório não constituem dívida aceitável.

**Detalhamento:** [[Roadmap, Evolução e Continuidade do SIGA]]

---

# TÍTULO XIV — ALTERAÇÕES DESTA CONSTITUIÇÃO

## Art. 77 — Alteração

Esta Constituição poderá ser alterada quando houver mudança relevante no objetivo do projeto, inadequação demonstrada de regra, necessidade de revisão arquitetural, novas necessidades metodológicas ou aprovação do responsável pelo projeto. A alteração será formal, rastreável e limitada ao necessário.

## Art. 78 — Registro

Toda alteração deverá registrar artigo alterado, texto anterior, texto novo, justificativa, impacto, data, versão e responsável pela aprovação.

## Art. 79 — Preservação do histórico

Versões anteriores deverão permanecer acessíveis no histórico do GitHub. A alteração não poderá apagar silenciosamente decisões, justificativas ou registros de versões anteriores.

**Detalhamento:** [[Gestão da Constituição do SIGA]]

---

# TÍTULO XV — DISPOSIÇÕES FINAIS

## Art. 80 — Responsabilidade final

A responsabilidade pelas decisões funcionais, metodológicas e estratégicas do SIGA pertence ao responsável pelo projeto. Ferramentas tecnológicas e agentes atuam como meios de apoio.

## Art. 81 — Entrada em vigor

Esta Constituição entrará em vigor após sua aprovação e inclusão no repositório oficial.

## Art. 82 — Próximos documentos

Após a aprovação desta Constituição, deverão ser elaborados prioritariamente a Visão do Produto, Arquitetura do Sistema, Modelo de Domínio, Metodologia de Auditoria, Regras de Negócio, Estratégia de Conhecimento e Treinamento, Guia de Conteúdo, Padrões de Apresentação, Roadmap e Situação Atual do Projeto.

**Detalhamento:** [[Disposições Finais do SIGA]]

---

# REGISTRO DE APROVAÇÃO

**Responsável pelo projeto:** ______________________________________

**Data de aprovação:** ____ / ____ / ________

**Versão aprovada:** __________________

**Observações:**

__________________________________________________________________

__________________________________________________________________

__________________________________________________________________
