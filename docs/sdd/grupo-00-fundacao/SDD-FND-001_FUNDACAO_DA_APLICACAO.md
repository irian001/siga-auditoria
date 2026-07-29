---
id: SIGA-SDD-FND-001
title: SDD-FND-001 — Fundação da Aplicação
aliases:
  - Fundação da Aplicação
  - SDD-FND-001
type: sdd
domain: fundacao-aplicacao
group: grupo-00-fundacao
status: em-revisao
version: 0.1
created: 2026-07-29
updated: 2026-07-29
owner: responsavel-projeto
responsible:
  planning: work
  implementation: lovable
  technical_review: codex
  approval: responsavel-projeto
audience:
  - responsavel-projeto
  - analista-funcional
  - desenvolvedor
  - agente-ia
  - lovable
depends_on:
  - SIGA-PLN-G00-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Arquitetura Tecnológica do SIGA]]"
  - "[[Governança do Desenvolvimento do SIGA]]"
  - "[[Visão do Produto do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Plano do Grupo 00]]"
  - "[[Sistema Visual e Componentes Básicos]]"
  - "[[Ambientes, Contratos e Integrações Iniciais]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - mvp
  - sdd
  - fundacao
  - layout
  - navegacao
  - lovable
---

# SDD-FND-001 — Fundação da Aplicação

## 1. Finalidade

Esta SDD define a primeira implementação do MVP do SIGA.

Seu objetivo é transformar o projeto inicial do Lovable numa aplicação identificada como SIGA, com estrutura navegável, responsiva e preparada para receber os módulos futuros sem reconstrução do núcleo.

Esta SDD cria somente a fundação da aplicação.

Ela não implementa:

- autenticação;
- cadastros;
- persistência;
- Supabase;
- permissões;
- regras de auditoria;
- fluxos funcionais dos módulos.

## 2. Resultado esperado

Ao final da implementação, o usuário deverá abrir o projeto e reconhecer uma aplicação SIGA, ainda em construção, com:

- identidade básica do produto;
- layout principal;
- navegação estrutural;
- rotas iniciais;
- página inicial;
- páginas de módulos futuros;
- comportamento responsivo;
- estados de erro e página não encontrada;
- organização de código reutilizável.

O resultado deverá parecer uma fundação coerente, e não um conjunto de telas funcionais parcialmente construídas.

## 3. Fontes oficiais

Esta SDD deverá ser interpretada em conjunto com:

- `AGENTS.md`;
- [[Constituição do SIGA]];
- [[Arquitetura Tecnológica do SIGA]];
- [[Governança do Desenvolvimento do SIGA]];
- [[Visão do Produto do SIGA]];
- [[Glossário do SIGA]];
- [[Modelo de Domínio do SIGA]];
- [[Modelo de Dados do SIGA]];
- [[Plano Mestre das SDDs do MVP do SIGA]];
- [[Plano do Grupo 00]].

Em caso de conflito, prevalecerá a hierarquia documental definida em `AGENTS.md`.

## 4. Contexto atual

O repositório já contém uma aplicação inicial gerada pelo Lovable com:

- TanStack Start;
- React;
- TypeScript;
- TanStack Router;
- TanStack Query;
- Vite;
- Tailwind CSS;
- componentes Radix UI;
- componentes genéricos em `src/components/ui/`;
- rota raiz;
- página inicial placeholder;
- tratamento inicial de erro;
- tratamento inicial de página não encontrada.

O projeto ainda não possui:

- identidade do SIGA;
- layout institucional;
- navegação do produto;
- rotas estruturais do MVP;
- páginas-base dos módulos;
- conteúdo funcional.

## 5. Decisões herdadas

### 5.1 Stack

Esta SDD preservará:

- TanStack Start;
- React;
- TypeScript;
- TanStack Router;
- TanStack Query;
- Tailwind CSS;
- componentes existentes compatíveis.

Não haverá migração para Next.js.

### 5.2 Código gerenciado pelo Lovable

Deverão ser preservados:

- `.lovable/project.json`;
- bloco `LOVABLE:BEGIN` de `AGENTS.md`;
- recursos necessários à sincronização;
- tratamento de erro exigido pela plataforma;
- configuração de build existente, salvo correção estritamente necessária.

### 5.3 Dados e persistência

Esta SDD não utilizará banco de dados.

As informações necessárias à navegação serão configurações estáticas do frontend.

Não deverão ser criadas entidades simuladas de auditoria apenas para preencher telas.

### 5.4 Sistema visual

Esta SDD utilizará os estilos e componentes existentes de forma conservadora.

Ela não definirá o sistema visual definitivo, que será tratado em [[Sistema Visual e Componentes Básicos]].

São permitidos apenas ajustes visuais suficientes para:

- identificar o produto;
- organizar o layout;
- garantir legibilidade;
- diferenciar estados básicos;
- validar responsividade.

## 6. Públicos considerados

A fundação deverá ser adequada, inicialmente, para:

- sócios e responsáveis técnicos;
- gerentes e supervisores;
- auditores;
- assistentes;
- revisores;
- administradores.

Esta SDD não diferencia permissões ou experiências por perfil.

O portal e a navegação específica de clientes permanecerão fora do escopo.

## 7. Escopo funcional

Integram esta SDD:

1. identidade básica do SIGA;
2. metadados da aplicação;
3. idioma-base;
4. layout raiz;
5. cabeçalho;
6. navegação principal;
7. área de conteúdo;
8. rotas estruturais;
9. página inicial;
10. página-base de módulo futuro;
11. estado vazio;
12. estado de carregamento;
13. mensagem de erro;
14. página não encontrada;
15. comportamento responsivo;
16. organização estrutural dos componentes.

## 8. Itens fora do escopo

Não integram esta SDD:

- login;
- logout;
- recuperação de senha;
- sessão;
- organização ativa;
- usuários;
- papéis;
- permissões;
- RLS;
- Supabase;
- migrations;
- tabelas;
- buckets;
- uploads;
- cadastros;
- filtros funcionais;
- pesquisas reais;
- dashboards com indicadores;
- gráficos;
- notificações reais;
- trilha de auditoria;
- histórico funcional;
- exportação;
- relatórios;
- portal do cliente;
- dados de demonstração de clientes ou trabalhos;
- regras de auditoria;
- publicação em produção.

Se o Lovable sugerir qualquer desses itens, eles deverão ser recusados ou registrados como pendência futura.

## 9. Identidade básica

### 9.1 Nome do produto

O produto deverá ser apresentado como:

**SIGA**

Com subtítulo ou descrição curta:

**Sistema Integrado para Gerenciamento de Auditoria**

### 9.2 Idioma

O idioma-base do documento HTML deverá ser:

```text
pt-BR
```

Textos visíveis ao usuário deverão estar em português do Brasil.

### 9.3 Metadados

Os metadados mínimos deverão utilizar:

- título: `SIGA — Sistema Integrado para Gerenciamento de Auditoria`;
- descrição: texto objetivo que identifique a plataforma;
- autor: `Projeto SIGA`;
- idioma: `pt-BR`.

Metadados genéricos como `Lovable App` ou `Lovable Generated Project` deverão ser removidos.

### 9.4 Identidade gráfica

Não será exigida logomarca definitiva.

Poderá ser usada uma identificação tipográfica simples com:

- sigla `SIGA`;
- nome por extenso;
- símbolo genérico discreto, se necessário.

Não deverá ser criada uma identidade de marketing completa nesta SDD.

## 10. Arquitetura de navegação

### 10.1 Princípio

A navegação deverá representar a estrutura futura do MVP sem simular funcionalidades ainda inexistentes.

Cada módulo deverá possuir:

- título;
- descrição curta;
- rota;
- ícone;
- grupo de navegação;
- situação de disponibilidade.

### 10.2 Grupos de navegação

A navegação deverá ser organizada em três grupos.

#### Trabalho

- Início;
- Clientes;
- Trabalhos;
- Planejamento.

#### Execução

- Riscos e procedimentos;
- Documentos e evidências;
- Papéis de trabalho.

#### Finalização

- Revisão;
- Relatórios.

#### Administração

- Configurações.

### 10.3 Ordem

A ordem deverá acompanhar o fluxo geral do trabalho de auditoria:

```text
Início
→ Clientes
→ Trabalhos
→ Planejamento
→ Riscos e procedimentos
→ Documentos e evidências
→ Papéis de trabalho
→ Revisão
→ Relatórios
```

Configurações deverá permanecer separada do fluxo metodológico.

## 11. Rotas estruturais

As rotas mínimas serão:

| Rota | Título | Situação nesta SDD |
|---|---|---|
| `/` | Início | Página inicial estrutural |
| `/clientes` | Clientes | Módulo futuro |
| `/trabalhos` | Trabalhos | Módulo futuro |
| `/planejamento` | Planejamento | Módulo futuro |
| `/riscos-procedimentos` | Riscos e procedimentos | Módulo futuro |
| `/documentos-evidencias` | Documentos e evidências | Módulo futuro |
| `/papeis-trabalho` | Papéis de trabalho | Módulo futuro |
| `/revisao` | Revisão | Módulo futuro |
| `/relatorios` | Relatórios | Módulo futuro |
| `/configuracoes` | Configurações | Módulo futuro |

As URLs deverão:

- utilizar letras minúsculas;
- não utilizar acentos;
- utilizar hífen quando necessário;
- permanecer estáveis durante o MVP, salvo decisão documentada.

## 12. Layout principal

### 12.1 Estrutura

O layout deverá ser composto por:

```text
Cabeçalho
├── Identidade do SIGA
├── Controle de navegação responsiva
└── Identificação de ambiente demonstrativo

Corpo
├── Navegação principal
└── Área de conteúdo
```

### 12.2 Cabeçalho

O cabeçalho deverá conter:

- identificação compacta do SIGA;
- botão para abrir ou recolher a navegação quando necessário;
- título contextual da página, se a composição permitir;
- indicação discreta de que o ambiente ainda está em construção ou demonstração.

Não deverá conter:

- usuário fictício;
- avatar fictício;
- notificações simuladas;
- seleção de organização;
- botão de logout.

### 12.3 Navegação lateral

Em telas maiores, a navegação poderá permanecer visível.

Ela deverá:

- indicar a página ativa;
- permitir navegação por teclado;
- apresentar rótulos legíveis;
- organizar os grupos definidos;
- utilizar ícones apenas como apoio;
- não depender exclusivamente de cor.

### 12.4 Área de conteúdo

A área de conteúdo deverá:

- possuir largura e espaçamento consistentes;
- apresentar título da página;
- aceitar subtítulo ou descrição;
- permitir breadcrumb quando útil;
- comportar estados vazios e mensagens;
- não fixar estruturas de módulos ainda não definidos.

## 13. Comportamento responsivo

### 13.1 Desktop

Em telas maiores:

- navegação lateral visível;
- área de conteúdo ao lado da navegação;
- cabeçalho estável;
- largura de leitura controlada.

### 13.2 Tablet

Em telas intermediárias:

- navegação poderá ser recolhida;
- conteúdo deverá ocupar a área disponível;
- controles deverão permanecer acessíveis;
- nenhum conteúdo deverá exigir rolagem horizontal geral.

### 13.3 Dispositivos menores

Em telas pequenas:

- navegação deverá abrir em painel ou menu;
- o conteúdo deverá permanecer numa única coluna;
- alvos de interação deverão ter tamanho adequado;
- títulos e textos não deverão ser truncados de forma prejudicial;
- a navegação deverá fechar após mudança de rota, quando aplicável.

### 13.4 Regra

O comportamento responsivo deverá utilizar os mecanismos já existentes no projeto.

Não deverá ser criada uma segunda solução concorrente para detecção de tamanho de tela.

## 14. Página inicial

### 14.1 Objetivo

A página inicial deverá apresentar o SIGA e funcionar como ponto de orientação.

### 14.2 Conteúdo

Deverá conter:

- nome do produto;
- descrição curta;
- indicação de que o MVP está em construção;
- visão resumida do fluxo do sistema;
- acesso estrutural aos principais módulos;
- informação de que módulos serão disponibilizados progressivamente.

### 14.3 Restrições

A página inicial não deverá apresentar:

- quantidade fictícia de clientes;
- quantidade fictícia de auditorias;
- prazos fictícios;
- percentuais fictícios;
- gráficos simulados;
- indicadores inventados;
- atividades recentes fictícias.

## 15. Página de módulo futuro

### 15.1 Objetivo

As rotas dos módulos ainda não implementados utilizarão uma estrutura comum.

### 15.2 Conteúdo mínimo

Cada página deverá apresentar:

- título do módulo;
- descrição curta;
- grupo do MVP;
- situação `Planejado`;
- mensagem de que a funcionalidade será implementada por SDD própria;
- ação para retornar ao início.

### 15.3 Regra

A página não deverá simular:

- tabelas;
- formulários;
- dados;
- filtros;
- botões de criação;
- fluxo funcional.

## 16. Estados básicos

### 16.1 Estado vazio

Deverá existir componente reutilizável para ausência de conteúdo.

Nesta SDD, ele será utilizado apenas onde houver ausência estrutural legítima.

### 16.2 Carregamento

Deverá existir tratamento visual simples para carregamento de rota ou conteúdo.

Não será necessário simular operações assíncronas inexistentes.

### 16.3 Erro

O tratamento de erro existente deverá:

- ser preservado;
- utilizar texto em português;
- oferecer tentativa de recarregamento;
- oferecer retorno ao início;
- manter o reporte técnico necessário ao Lovable.

### 16.4 Página não encontrada

A página `404` deverá:

- estar em português;
- explicar que a página não foi encontrada;
- permitir retorno ao início;
- manter consistência com o layout.

## 17. Acessibilidade inicial

A implementação deverá observar:

- idioma correto no HTML;
- estrutura semântica;
- títulos em ordem lógica;
- navegação por teclado;
- foco visível;
- rótulos textuais;
- ícones com nome acessível quando interativos;
- contraste básico;
- botão de menu com estado acessível;
- ausência de dependência exclusiva de cor;
- respeito à preferência de redução de movimento, quando houver animação.

Esta SDD não substitui uma auditoria formal de acessibilidade.

## 18. Organização técnica sugerida

A implementação poderá utilizar:

```text
src/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── states/
│   └── ui/
├── config/
│   └── navigation.ts
├── routes/
└── styles.css
```

### 18.1 Layout

Componentes responsáveis pela composição geral.

### 18.2 Navegação

Componentes e configuração da navegação.

### 18.3 Estados

Componentes de módulo futuro, estado vazio e mensagens estruturais.

### 18.4 UI

Componentes genéricos existentes.

Não deverão ser duplicados componentes já disponíveis em `src/components/ui/`.

## 19. Áreas permitidas para alteração

O plano do Lovable poderá propor alterações em:

- `src/routes/`;
- `src/components/layout/`;
- `src/components/navigation/`;
- `src/components/states/`;
- `src/config/`;
- `src/styles.css`, apenas no necessário;
- `README.md`, apenas para identificar corretamente o projeto;
- arquivos gerados de rota quando atualizados automaticamente pelo framework.

A lista final deverá ser apresentada pelo Lovable antes da implementação.

## 20. Áreas protegidas

Não deverão ser alterados sem autorização adicional:

- documentos aprovados;
- `AGENTS.md`;
- `.lovable/project.json`;
- `.lovable/plan.md`;
- `package.json`, salvo dependência estritamente necessária e aprovada;
- `bun.lock`, salvo consequência de dependência aprovada;
- configuração de build;
- diretórios de Supabase;
- variáveis de ambiente;
- credenciais;
- integrações externas;
- arquivos fora do escopo informado.

## 21. Dependências

### 21.1 Obrigatórias

- Plano do Grupo 00 aprovado;
- documentação oficial disponível na `main`;
- conexão GitHub–Lovable funcionando;
- projeto compilável antes da implementação.

### 21.2 Posteriores

Esta SDD será dependência de:

- `SDD-DSG-001`;
- `SDD-ENV-001`;
- todas as SDDs funcionais do MVP.

## 22. Regras funcionais

### RF-FND-001

A aplicação deverá identificar-se como SIGA.

### RF-FND-002

A aplicação deverá utilizar português do Brasil como idioma-base.

### RF-FND-003

A navegação deverá permitir acessar todas as rotas estruturais definidas.

### RF-FND-004

A página ativa deverá ser identificável na navegação.

### RF-FND-005

Rotas de módulos futuros deverão apresentar página estrutural comum, sem funcionalidade simulada.

### RF-FND-006

A página inicial deverá orientar o usuário sem apresentar dados fictícios.

### RF-FND-007

A navegação deverá adaptar-se a telas menores.

### RF-FND-008

Erros e páginas não encontradas deverão permitir retorno ou nova tentativa.

### RF-FND-009

O layout deverá ser reutilizado pelas rotas estruturais.

### RF-FND-010

A implementação não deverá depender de banco de dados.

## 23. Critérios de aceite

### CA-FND-001 — Identidade

**Dado** que o usuário abre a aplicação,
**quando** a página é carregada,
**então** o nome SIGA e sua descrição deverão estar visíveis.

### CA-FND-002 — Metadados

Os metadados não deverão conter identificação genérica do Lovable.

### CA-FND-003 — Idioma

O documento HTML deverá utilizar `pt-BR`, e os textos da fundação deverão estar em português.

### CA-FND-004 — Placeholder

O placeholder inicial do Lovable deverá ser removido.

### CA-FND-005 — Navegação

Todas as rotas estruturais deverão poder ser acessadas pela navegação.

### CA-FND-006 — Página ativa

A opção correspondente à rota atual deverá possuir indicação visual e semântica de seleção.

### CA-FND-007 — Página inicial

A página inicial deverá apresentar a visão estrutural do SIGA sem métricas ou atividades fictícias.

### CA-FND-008 — Módulos futuros

As rotas futuras deverão utilizar uma página-base consistente e indicar que o módulo será implementado posteriormente.

### CA-FND-009 — Desktop

Em tela desktop, navegação e conteúdo deverão permanecer utilizáveis sem sobreposição.

### CA-FND-010 — Dispositivo menor

Em largura reduzida, a navegação deverá continuar acessível sem provocar rolagem horizontal geral.

### CA-FND-011 — Navegação por teclado

Itens interativos do layout deverão ser alcançáveis e acionáveis por teclado.

### CA-FND-012 — Foco

Controles interativos deverão possuir foco visível.

### CA-FND-013 — Página não encontrada

Uma rota inexistente deverá apresentar mensagem em português e ação para retornar ao início.

### CA-FND-014 — Erro

O tratamento de erro deverá preservar o reporte técnico existente e apresentar opções compreensíveis ao usuário.

### CA-FND-015 — Reutilização

O layout e a página-base de módulo futuro não deverão ser copiados integralmente em cada rota.

### CA-FND-016 — Componentes

Componentes existentes deverão ser reutilizados quando atenderem à necessidade.

### CA-FND-017 — Banco

Nenhuma tabela, migration, política, bucket ou integração Supabase deverá ser criada.

### CA-FND-018 — Segredos

Nenhuma credencial ou segredo deverá ser adicionado ao repositório.

### CA-FND-019 — Build

O projeto deverá concluir o build disponível sem erro impeditivo.

### CA-FND-020 — Escopo

O diff deverá permanecer restrito aos arquivos aprovados no plano de implementação.

## 24. Verificações esperadas

As verificações comuns desta SDD deverão incluir:

- inspeção dos arquivos alterados;
- execução do lint disponível;
- execução do build disponível;
- abertura da página inicial;
- navegação por todas as rotas estruturais;
- acesso a uma rota inexistente;
- inspeção em largura desktop;
- inspeção em largura reduzida;
- navegação básica por teclado;
- busca por credenciais ou segredos adicionados;
- confirmação de ausência de alterações no Supabase;
- confirmação de ausência de dados fictícios.

As skills Superpowers não serão utilizadas nesta SDD.

Os testes formais e integrados permanecem reservados ao Grupo 07.

## 25. Evidências esperadas

Ao concluir, deverão ser apresentados:

- relação dos arquivos criados;
- relação dos arquivos alterados;
- commit ou commits produzidos;
- resumo do diff;
- resultado do lint;
- resultado do build;
- capturas ou prévia das principais larguras;
- critérios de aceite atendidos;
- critérios não atendidos;
- limitações;
- pendências.

## 26. Fluxo de execução

```text
SDD em revisão
        ↓
Aprovação humana
        ↓
Publicação na main
        ↓
Lovable em modo planejamento
        ↓
Revisão do plano
        ↓
Checkpoint Git
        ↓
Autorização de implementação
        ↓
Implementação pelo Lovable
        ↓
Revisão do diff pelo Codex
        ↓
Verificações comuns
        ↓
Validação funcional humana
        ↓
Conclusão ou correção
```

## 27. Checkpoint anterior à implementação

Antes de autorizar o Lovable, deverá ser registrado:

- repositório;
- branch conectada;
- commit atual da `main`;
- branch de checkpoint;
- data;
- SDD autorizadora.

Convenção sugerida:

```text
checkpoint/fnd-001-pre-lovable
```

Nenhum histórico sincronizado deverá ser reescrito.

## 28. Mensagem de planejamento para o Lovable

Após a aprovação e publicação desta SDD, a mensagem deverá seguir:

```text
Projeto: SIGA
Modo: planejamento, sem alterar código
SDD oficial: docs/sdd/grupo-00-fundacao/SDD-FND-001_FUNDACAO_DA_APLICACAO.md

Leia primeiro:
- AGENTS.md
- docs/sdd/00_PLANO_MESTRE_DAS_SDDS_DO_MVP.md
- docs/sdd/grupo-00-fundacao/00_PLANO_DO_GRUPO_00_FUNDACAO.md
- a SDD oficial indicada acima

Apresente:
1. entendimento do objetivo;
2. composição do layout;
3. rotas e componentes envolvidos;
4. componentes existentes que serão reutilizados;
5. arquivos que pretende criar ou alterar;
6. sequência de implementação;
7. critérios de aceite que serão atendidos;
8. riscos, dúvidas e limitações;
9. itens que permanecerão fora do escopo.

Não implemente.
Não publique.
Não altere o banco.
Não crie autenticação.
Não adicione credenciais.
Não modifique documentos aprovados.
Não amplie o escopo.
```

## 29. Riscos e controles

| Risco | Controle |
|---|---|
| Lovable criar telas funcionais antecipadamente | Reforçar páginas estruturais sem CRUD |
| Lovable inventar indicadores | Proibir métricas e atividades fictícias |
| Duplicação de componentes | Reutilizar `src/components/ui/` |
| Sistema visual prematuro | Limitar ajustes ao necessário para a fundação |
| Alteração de dependências | Exigir justificativa e aprovação |
| Remoção de recursos do Lovable | Proteger arquivos e tratamento de erro |
| Criação prematura de Supabase | Bloqueio explícito no escopo e aceite |
| Alteração direta da `main` | Checkpoint e revisão imediata |
| Expansão para autenticação | Encaminhar ao Grupo 01 |
| Rotas difíceis de manter | Configuração central de navegação |
| Layout não responsivo | Critérios específicos por largura |
| Acessibilidade ignorada | Critérios de teclado, foco, semântica e contraste |

## 30. Pendências encaminhadas

### Para SDD-DSG-001

- tokens definitivos;
- paleta institucional;
- tipografia definitiva;
- componentes visuais consolidados;
- estados detalhados;
- acessibilidade visual ampliada.

### Para SDD-ENV-001

- ambientes;
- configuração tipada;
- contratos;
- adaptadores;
- integração futura.

### Para o Grupo 01

- organização usuária;
- autenticação;
- usuários;
- vínculos;
- papéis;
- permissões.

## 31. Critério de conclusão da SDD

A SDD-FND-001 somente será considerada concluída quando:

- os critérios de aceite estiverem verificados;
- o placeholder tiver sido removido;
- as rotas estruturais estiverem navegáveis;
- o layout estiver responsivo;
- os estados básicos estiverem disponíveis;
- o diff tiver sido revisado;
- lint e build tiverem sido executados;
- nenhuma alteração proibida tiver ocorrido;
- a validação humana tiver sido registrada;
- as limitações estiverem documentadas;
- o resultado estiver integrado ao GitHub.

## 32. Material de orientação

### 32.1 Objetivos de aprendizagem

Ao estudar esta SDD, o participante deverá compreender:

- o que representa a fundação da aplicação;
- por que os módulos ainda não serão implementados;
- como a navegação acompanha o fluxo de auditoria;
- por que dados fictícios não serão utilizados;
- como o Lovable será controlado por escopo;
- como o GitHub preservará o histórico.

### 32.2 Resumo para apresentação

1. situação inicial do projeto;
2. objetivo da fundação;
3. estrutura de navegação;
4. layout responsivo;
5. módulos futuros;
6. limites da primeira entrega;
7. critérios de aceite;
8. fluxo Lovable, Codex e validação humana.

## 33. Navegação

- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Plano do Grupo 00]]
- [[Sistema Visual e Componentes Básicos]]
- [[Ambientes, Contratos e Integrações Iniciais]]
- [[Arquitetura Tecnológica do SIGA]]
- [[Governança do Desenvolvimento do SIGA]]

## 34. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-29 | Criação da minuta inicial da SDD-FND-001 | Em revisão |
