---
id: SIGA-SDD-DSG-001
title: SDD-DSG-001 — Sistema Visual e Componentes Básicos
aliases:
  - Sistema Visual e Componentes Básicos
  - Sistema Visual do SIGA
  - SDD-DSG-001
type: sdd
domain: sistema-visual
group: grupo-00-fundacao
status: em-revisao
version: 1.1
created: 2026-07-31
updated: 2026-07-31
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
  - SIGA-SDD-FND-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Arquitetura Tecnológica do SIGA]]"
  - "[[Governança do Desenvolvimento do SIGA]]"
  - "[[Visão do Produto do SIGA]]"
  - "[[Glossário do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Plano do Grupo 00]]"
  - "[[Fundação da Aplicação]]"
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
  - sistema-visual
  - componentes
  - acessibilidade
  - lovable
---

# SDD-DSG-001 — Sistema Visual e Componentes Básicos

## 1. Finalidade

Esta SDD define a linguagem visual reutilizável do SIGA.

Seu objetivo é garantir que os módulos futuros mantenham aparência, leitura, comportamento e componentes coerentes, evitando que o sistema se transforme em uma colcha de retalhos à medida que novas telas forem construídas.

Esta SDD não cria módulos de negócio. Ela consolida a camada visual sobre a fundação já aprovada na [[Fundação da Aplicação]].

## 2. Contexto e ponto de partida

A SDD-FND-001 foi aprovada, implementada e validada.

A aplicação já possui:

- identidade SIGA;
- layout institucional;
- navegação estrutural;
- rotas-base;
- páginas de módulos futuros;
- responsividade inicial;
- tema noturno aplicado no commit \`49b125e\`.

O tema noturno existente é a primeira camada desta SDD e deverá ser preservado como ponto de partida. Esta SDD organizará e ampliará seus padrões, sem desfazer a decisão aprovada de utilizar uma aparência sóbria, escura e adequada a trabalhos de auditoria.

## 3. Resultado esperado

Ao final, o SIGA deverá possuir uma linguagem visual clara e reutilizável, composta por:

- tokens visuais centralizados;
- paleta institucional noturna;
- hierarquia tipográfica consistente;
- espaçamentos e bordas padronizados;
- componentes básicos reaproveitáveis;
- estados visuais compreensíveis;
- padrões para formulários, listagens e mensagens;
- acessibilidade visual inicial;
- orientação de uso para os módulos seguintes.

O resultado não deverá ser uma identidade de marketing nem uma coleção de componentes novos sem necessidade. Deverá ser uma base de interface adequada ao uso cotidiano de auditores, revisores, gestores e clientes autorizados.

## 4. Princípios visuais

### 4.1 Sobriedade profissional

A interface deverá transmitir organização, confiança, rastreabilidade e clareza.

Não deverá utilizar:

- aparência gamer;
- neon;
- gradientes chamativos;
- excesso de transparências;
- sombras pesadas;
- animações desnecessárias;
- ilustrações meramente decorativas.

### 4.2 Tema padrão noturno

O tema padrão será noturno, com:

- fundo quase preto ou grafite;
- navegação e identidade em azul profundo;
- textos, divisões e bordas em cinza frio;
- verde reservado a confirmação ou estados positivos;
- amarelo ou laranja reservado a aviso;
- vermelho reservado a erro, risco ou ação destrutiva.

O sistema poderá manter uma variante clara tecnicamente disponível, mas ela não será objeto de uma interface de troca de tema nesta SDD.

### 4.3 Simplicidade progressiva

A tela deverá apresentar primeiro o que é necessário à tarefa.

Informações complementares deverão usar recursos como:

- seções;
- abas;
- painéis;
- filtros;
- detalhes expansíveis;
- mensagens contextuais.

### 4.4 Consistência sem rigidez indevida

A consistência não impedirá que cada módulo tenha sua própria necessidade operacional. O padrão visual deverá apoiar o trabalho, não substituir a análise metodológica ou o julgamento profissional.

## 5. Tokens visuais

Os tokens deverão permanecer centralizados em \`src/styles.css\` ou estrutura equivalente já existente.

### 5.1 Superfícies

| Elemento | Diretriz |
|---|---|
| Fundo principal | Grafite quase preto |
| Navegação lateral | Grafite com distinção discreta do conteúdo |
| Cartões e painéis | Grafite levemente elevado |
| Popovers e diálogos | Contraste suficiente contra o fundo |
| Bordas e divisores | Cinza frio discreto, mas visível |

### 5.2 Cores semânticas

| Uso | Cor predominante | Regra |
|---|---|---|
| Ação principal e rota ativa | Azul profundo | Não usar como preenchimento indiscriminado |
| Informação secundária | Cinza frio | Deve manter legibilidade |
| Sucesso ou confirmação | Verde | Não representar situação pendente |
| Aviso ou atenção | Amarelo ou laranja | Não confundir com erro |
| Erro, exclusão ou falha | Vermelho | Exigir mensagem compreensível |
| Estado neutro ou planejado | Cinza | Não sugerir aprovação |

### 5.3 Tipografia

A tipografia existente será preservada, salvo necessidade estrita de ajuste.

Deverá existir hierarquia mínima entre:

- título da página;
- título de seção;
- título de cartão;
- texto de apoio;
- rótulo de campo;
- dado principal;
- mensagem de status;
- mensagem de erro.

Textos de apoio não deverão ter contraste insuficiente.

### 5.4 Espaçamento, bordas e sombras

A SDD deverá consolidar:

- escala previsível de espaçamento;
- raio de borda sóbrio e consistente;
- uso econômico de sombras;
- alinhamento consistente entre cabeçalhos, cartões, formulários e tabelas;
- densidade de informação adequada a atividades de auditoria.

## 6. Componentes prioritários

Os componentes existentes em \`src/components/ui/\` deverão ser reutilizados sempre que forem adequados.

A criação de um componente novo exigirá justificativa de reutilização ou composição insuficiente.

| Componente | Necessidade nesta SDD |
|---|---|
| Botão | Consolidar variantes, foco, desabilitado e ação destrutiva |
| Campo de texto e área de texto | Definir leitura, rótulo, ajuda, erro e desabilitado |
| Seleção e caixa de seleção | Definir estados visuais e foco |
| Cartão | Consolidar superfície, título, conteúdo e ações |
| Tabela | Definir leitura, cabeçalho, linha, vazio e área rolável |
| Badge ou etiqueta de situação | Consolidar estados neutro, planejado, sucesso, aviso e erro |
| Alerta e mensagem | Diferenciar orientação, sucesso, aviso e erro |
| Diálogo e painel lateral | Garantir hierarquia, foco e ação de fechamento |
| Abas e breadcrumb | Consolidar navegação contextual |
| Paginação | Preparar padrão, sem implementar dados reais |
| Esqueleto de carregamento | Definir aparência reutilizável |
| Estado vazio | Definir mensagem, contexto e ação opcional |
| Estado de erro | Definir mensagem, retorno e recuperação possível |

## 7. Estados mínimos

Todo componente aplicável deverá considerar, conforme sua natureza:

- padrão;
- hover;
- foco visível;
- selecionado;
- desabilitado;
- carregando;
- vazio;
- sucesso;
- aviso;
- erro.

Não será necessário criar exemplos artificiais em cada rota. Os padrões deverão estar disponíveis de forma reutilizável para implementação posterior dos módulos.

## 8. Padrões de uso

### 8.1 Formulários

Os formulários futuros deverão utilizar:

- título e contexto da atividade;
- rótulos explícitos;
- indicação de obrigatoriedade sem depender apenas de cor;
- texto de ajuda quando necessário;
- mensagens de erro próximas ao campo;
- ações principais e secundárias claramente diferenciadas;
- agrupamento lógico dos campos;
- comportamento responsivo.

Esta SDD não implementará formulários funcionais de negócio.

### 8.2 Listagens e tabelas

As listagens futuras deverão prever:

- título;
- explicação curta quando necessária;
- filtros ou ações em área previsível;
- cabeçalho legível;
- estado vazio;
- carregamento;
- erro;
- área rolável em telas pequenas sem rolagem horizontal geral da aplicação.

Esta SDD não criará listas com dados reais ou cadastros simulados de auditoria.

### 8.3 Mensagens e confirmações

Mensagens deverão informar:

- o que ocorreu;
- qual é o impacto;
- o que o usuário pode fazer a seguir.

Não deverão existir mensagens genéricas como “Erro” ou “Sucesso” sem contexto.

### 8.4 Situação e progresso

Etiquetas de situação deverão comunicar significado também por texto, e não apenas por cor.

Exemplos de termos permitidos:

- Planejado;
- Em construção;
- Em andamento;
- Concluído;
- Atenção;
- Erro;
- Indisponível.

### 8.5 Diálogos e conteúdo extenso

Todo diálogo que possa receber conteúdo variável, resumo detalhado, formulário ou seção adicional deverá possuir área de rolagem vertical própria.

O componente compartilhado `DialogContent` deverá garantir, no mínimo:

- altura máxima compatível com a janela visível;
- `overflow-y-auto` ou comportamento equivalente;
- preservação do botão de fechamento e do foco;
- ausência de rolagem horizontal geral;
- validação em desktop e em larguras menores.

Nenhuma tela poderá depender da rolagem da página principal para revelar conteúdo que esteja dentro de um diálogo.

Quando um diálogo crescer por causa de uma nova camada funcional, a implementação deverá verificar explicitamente o comportamento com conteúdo curto e longo.

## 9. Acessibilidade inicial

A implementação deverá assegurar, no mínimo:

- contraste confortável entre texto, fundo e bordas;
- foco visível para navegação por teclado;
- uso de \`aria-current\` na rota ativa, quando aplicável;
- rótulos acessíveis em controles interativos;
- distinção entre estados que não dependa apenas de cor;
- ordem de navegação por teclado coerente;
- manutenção da leitura em telas menores;
- ausência de rolagem horizontal geral provocada pelo layout.

Uma auditoria formal completa de acessibilidade não integra esta SDD. Problemas identificados durante a implementação deverão ser registrados.

## 10. Responsividade

A interface deverá manter legibilidade e operação em:

- desktop;
- largura intermediária;
- dispositivos menores.

A navegação poderá adaptar sua apresentação, desde que permaneça acessível.

Cartões, tabelas, formulários e diálogos não deverão provocar:

- sobreposição relevante;
- textos cortados;
- ações inacessíveis;
- rolagem horizontal geral;
- perda de contexto da rota atual.

## 11. Escopo de implementação

A implementação poderá alterar, quando necessário:

- \`src/styles.css\`;
- componentes existentes em \`src/components/ui/\`;
- componentes de layout, navegação e estados;
- componentes novos estritamente reutilizáveis em \`src/components/ui/\` ou pasta equivalente;
- exemplos visuais mínimos nas rotas estruturais;
- arquivos de teste visual ou de componente, caso já exista infraestrutura adequada.

O Lovable deverá informar previamente todos os arquivos que pretende alterar.

## 12. Fora do escopo

Esta SDD não poderá:

- criar banco de dados;
- criar migrations;
- configurar Supabase;
- criar autenticação ou permissões;
- criar dados reais;
- criar cadastros funcionais;
- criar regras de auditoria;
- implementar dashboard com indicadores reais;
- criar portal do cliente;
- alterar \`AGENTS.md\`;
- alterar documentos aprovados;
- alterar \`.lovable/plan.md\`;
- alterar \`package.json\`, \`bun.lock\` ou configuração de build sem aprovação expressa;
- publicar o projeto em produção.

## 13. Regras de implementação

1. Reutilizar componentes existentes antes de criar equivalentes.
2. Centralizar cores e estados em tokens.
3. Não usar valores de cor isolados em cada tela quando houver token equivalente.
4. Não alterar rotas, textos funcionais ou fluxo da fundação sem necessidade.
5. Não criar telas de negócio como demonstração visual.
6. Preservar o tema noturno validado.
7. Declarar qualquer limitação de contraste, comportamento responsivo ou componente ainda não padronizado.
8. Não modificar arquivos fora do escopo aprovado.
9. Não publicar em produção.
10. Não alterar qualquer elemento de banco ou integração.

## 14. Critérios de aceite

### CA-DSG-001 — Tema

**Dado** que o usuário abre o SIGA,

**quando** a aplicação é carregada,

**então** o tema padrão deverá ser noturno, sóbrio e coerente com a paleta institucional aprovada.

### CA-DSG-002 — Hierarquia

**Dado** que uma página estrutural é exibida,

**quando** o usuário percorre título, texto de apoio, cartões e ações,

**então** a hierarquia visual deverá ser compreensível sem depender de decoração.

### CA-DSG-003 — Navegação ativa

**Dado** que o usuário acessa uma rota estrutural,

**quando** a navegação é exibida,

**então** a rota ativa deverá possuir indicação visual e semântica clara.

### CA-DSG-004 — Componentes

**Dado** que um componente prioritário é utilizado,

**quando** seu estado muda,

**então** os tokens e estados visuais deverão permanecer coerentes com os demais componentes.

### CA-DSG-005 — Foco

**Dado** que o usuário navega por teclado,

**quando** um item interativo recebe foco,

**então** o foco deverá estar visível.

### CA-DSG-006 — Estados

**Dado** que um estado de sucesso, aviso, erro ou vazio é apresentado,

**quando** o usuário o lê,

**então** deverá compreender o significado sem depender exclusivamente da cor.

### CA-DSG-007 — Responsividade

**Dado** que a interface é aberta em largura reduzida,

**quando** o usuário navega e visualiza os componentes básicos,

**então** não deverá ocorrer rolagem horizontal geral, sobreposição relevante ou perda de acesso às ações.

### CA-DSG-008 — Reutilização

**Dado** que dois elementos possuem finalidade visual equivalente,

**quando** forem implementados,

**então** deverão reutilizar o mesmo componente ou tokens compatíveis.

### CA-DSG-009 — Escopo

**Dado** que a implementação foi concluída,

**quando** o diff for revisado,

**então** não deverá haver alteração em banco, Supabase, autenticação, regras de negócio, documentos aprovados, dependências ou publicação.

### CA-DSG-010 — Build

**Dado** que as alterações foram concluídas,

**quando** o build disponível for executado,

**então** ele deverá concluir sem erro impeditivo.

## 15. Verificações esperadas

Após a implementação, deverão ser realizadas:

- inspeção do diff;
- verificação dos arquivos alterados;
- compilação local disponível;
- revisão visual em desktop;
- revisão visual em largura reduzida;
- navegação estrutural;
- verificação da rota ativa;
- navegação básica por teclado;
- inspeção de foco;
- confirmação de ausência de alteração em banco, Supabase e credenciais;
- confirmação de ausência de publicação em produção.

As skills Superpowers não serão utilizadas nesta SDD. Os testes formais e integrados permanecem reservados ao Grupo 07.

## 16. Evidências esperadas

Ao concluir, deverão ser apresentados:

- arquivos criados e alterados;
- resumo do diff;
- resultado da compilação;
- capturas ou prévia em desktop e largura reduzida;
- critérios de aceite atendidos;
- critérios pendentes;
- limitações;
- confirmação de que não houve alteração em banco, Supabase, credenciais ou publicação;
- commit ou commits gerados.

## 17. Fluxo de execução

\`\`\`text
Minuta da SDD
        ↓
Aprovação humana
        ↓
Publicação no GitHub
        ↓
Lovable em modo planejamento
        ↓
Revisão do plano e dos arquivos propostos
        ↓
Checkpoint Git
        ↓
Autorização humana para implementar
        ↓
Implementação pelo Lovable
        ↓
Revisão do diff pelo Codex
        ↓
Verificações técnicas e visuais
        ↓
Validação humana
        ↓
Conclusão ou correção
\`\`\`

## 18. Mensagem de planejamento para o Lovable

\`\`\`text
Projeto: SIGA
Modo: planejamento, sem alterar código
SDD oficial: docs/sdd/grupo-00-fundacao/SDD-DSG-001_SISTEMA_VISUAL_E_COMPONENTES_BASICOS.md

Leia primeiro:
- AGENTS.md
- docs/sdd/00_PLANO_MESTRE_DAS_SDDS_DO_MVP.md
- docs/sdd/grupo-00-fundacao/00_PLANO_DO_GRUPO_00_FUNDACAO.md
- a SDD oficial indicada acima

Considere que o tema noturno grafite, azul profundo e cinza frio já foi validado como primeira camada visual. Ele deve ser preservado e consolidado.

Apresente:
1. entendimento do objetivo;
2. componentes existentes que serão reutilizados;
3. tokens e padrões que serão consolidados;
4. arquivos que pretende criar ou alterar;
5. exemplos visuais mínimos necessários;
6. sequência de implementação;
7. critérios de aceite atendidos;
8. riscos, dúvidas e limitações;
9. itens que permanecerão fora do escopo.

Não implemente.
Não publique.
Não altere banco, Supabase, autenticação ou credenciais.
Não altere AGENTS.md, documentos aprovados, package.json, bun.lock, build ou .lovable/plan.md.
Não amplie o escopo.
\`\`\`

## 19. Riscos e controles

| Risco | Controle |
|---|---|
| Tema excessivamente decorativo | Aplicar sobriedade profissional e evitar neon, gradientes e excesso de efeitos |
| Componentes duplicados | Reutilizar biblioteca existente antes de criar novo componente |
| Contraste insuficiente | Revisar texto, bordas, foco e estados críticos |
| Tema aplicado apenas a algumas telas | Centralizar tokens e verificar rotas estruturais |
| Cor usada como único indicador | Exigir texto, ícone ou contexto complementar |
| Alteração de fluxo da fundação | Restringir o escopo a estilos e componentes |
| Alteração fora do escopo | Planejamento prévio, checkpoint e revisão do diff |
| Criação prematura de banco | Proibição expressa e revisão final |
| Uso indevido de créditos do Lovable | Uma rodada de planejamento, uma implementação delimitada e uma correção somente se necessária |

## 20. Pendências encaminhadas

A presente SDD não resolverá:

- formulários funcionais de módulos;
- dados persistidos;
- validação de regras de negócio;
- permissões;
- autenticação;
- design do portal do cliente;
- relatórios para impressão;
- gráficos e painéis avançados;
- auditoria completa de acessibilidade;
- alternância de tema pelo usuário;
- personalização visual por organização.

Esses pontos deverão ser tratados pelas SDDs próprias dos grupos seguintes.

## 21. Critério de conclusão

A SDD-DSG-001 será considerada concluída quando:

- os tokens visuais estiverem consolidados;
- o tema noturno aprovado estiver preservado;
- os componentes prioritários possuírem padrão de uso coerente;
- estados essenciais estiverem disponíveis;
- foco e contraste básicos estiverem verificados;
- a interface responder adequadamente em larguras principais;
- o diff estiver revisado;
- o build estiver aprovado;
- nenhuma alteração proibida tiver ocorrido;
- as limitações estiverem registradas;
- a validação humana estiver registrada;
- o resultado estiver integrado ao GitHub.

## 22. Navegação

- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Plano do Grupo 00]]
- [[Fundação da Aplicação]]
- [[Ambientes, Contratos e Integrações Iniciais]]
- [[Arquitetura Tecnológica do SIGA]]
- [[Governança do Desenvolvimento do SIGA]]

## 23. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-31 | Criação da minuta inicial da SDD-DSG-001 | Em revisão |
| 1.0 | 2026-07-31 | Primeira versão aprovada da SDD-DSG-001 | Aprovada |
| 1.1 | 2026-08-06 | Inclusão da regra de rolagem vertical para diálogos extensos e aplicação no componente compartilhado | Em revisão |
