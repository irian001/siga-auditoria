---
id: SIGA-PLN-G00-001
title: Plano do Grupo 00 — Fundação do SIGA
aliases:
  - Plano do Grupo 00
  - Plano da Fundação do SIGA
type: plano-de-grupo-sdd
domain: fundacao-aplicacao
status: aprovado
version: 1.0
created: 2026-07-29
updated: 2026-07-29
owner: responsavel-projeto
audience:
  - responsavel-projeto
  - analista-funcional
  - desenvolvedor
  - agente-ia
  - lovable
related:
  - "[[Constituição do SIGA]]"
  - "[[Arquitetura Tecnológica do SIGA]]"
  - "[[Governança do Desenvolvimento do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Fundação da Aplicação]]"
  - "[[Sistema Visual e Componentes Básicos]]"
  - "[[Ambientes, Contratos e Integrações Iniciais]]"
obsidian:
  note_type: group-plan
  graph_role: operational-hub
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - mvp
  - grupo-00
  - fundacao
  - sdd
  - lovable
  - arquitetura
---

# Plano do Grupo 00 — Fundação do SIGA

## 1. Finalidade

Este documento organiza a execução do Grupo 00 do [[Plano Mestre das SDDs do MVP do SIGA]].

O Grupo 00 deverá criar uma fundação visual e técnica estável para os módulos do MVP, sem antecipar regras de auditoria, autenticação, tabelas, políticas de acesso ou integrações definitivas.

O resultado esperado não é um conjunto de telas finais. É uma estrutura navegável, consistente, responsiva e preparada para receber os módulos seguintes sem reconstrução do núcleo.

Este plano não substitui as SDDs individuais. Ele define:

- a situação inicial;
- as decisões de fundação;
- a separação entre as três SDDs;
- a sequência de execução;
- as responsabilidades;
- os limites;
- os critérios de avanço;
- o protocolo de acionamento do Lovable;
- os riscos e controles do grupo.

## 2. Fontes oficiais

Este plano deriva de:

- `AGENTS.md`;
- [[Constituição do SIGA]];
- [[Arquitetura Tecnológica do SIGA]];
- [[Governança do Desenvolvimento do SIGA]];
- [[Visão do Produto do SIGA]];
- [[Glossário do SIGA]];
- [[Modelo de Domínio do SIGA]];
- [[Modelo de Dados do SIGA]];
- [[Plano Mestre das SDDs do MVP do SIGA]].

Em caso de conflito, prevalecerá a hierarquia definida em `AGENTS.md`.

## 3. Situação operacional encontrada

O repositório operacional conectado ao Lovable já contém uma aplicação inicial gerada pela plataforma.

### 3.1 Tecnologias existentes

- TanStack Start;
- React 19;
- TypeScript;
- TanStack Router;
- TanStack Query;
- Vite;
- Tailwind CSS;
- componentes Radix UI;
- React Hook Form;
- Zod;
- biblioteca de ícones Lucide;
- componentes básicos em `src/components/ui/`.

### 3.2 Estrutura existente

Já existem:

- configuração básica de build;
- rota raiz;
- tratamento inicial de página não encontrada;
- tratamento inicial de erro;
- provedor do TanStack Query;
- componentes visuais genéricos;
- estilos iniciais;
- integração técnica necessária ao ambiente Lovable.

### 3.3 Limitações existentes

Atualmente:

- a página inicial ainda é um placeholder;
- os metadados identificam o produto como aplicação genérica do Lovable;
- o idioma raiz está configurado como inglês;
- não existe layout institucional do SIGA;
- não existe navegação funcional do SIGA;
- não existem contratos de dados próprios do SIGA;
- não existe integração autorizada com o Supabase;
- não existem módulos funcionais do MVP;
- `.lovable/plan.md` registra orientações anteriores à consolidação do repositório e não deverá ser tratado como fonte oficial.

## 4. Decisões aprovadas

### 4.1 Stack do MVP

Para evitar reconstrução desnecessária, o Grupo 00 adotará o stack existente do projeto Lovable:

- TanStack Start;
- React;
- TypeScript;
- TanStack Router;
- TanStack Query;
- Tailwind CSS.

A referência constitucional ao Next.js é preferencial, não obrigatória.

Não será realizada migração para Next.js durante o Grupo 00.

Uma mudança futura de framework somente poderá ocorrer mediante análise de impacto e decisão arquitetural formal.

### 4.2 Preservação do código Lovable

Arquivos técnicos exigidos pelo Lovable não deverão ser removidos ou reestruturados sem necessidade demonstrada.

Em especial, deverão ser preservados:

- `.lovable/project.json`;
- o bloco `LOVABLE:BEGIN` de `AGENTS.md`;
- os mecanismos de tratamento de erro utilizados pela plataforma;
- as configurações necessárias à visualização e sincronização.

### 4.3 Supabase

O Grupo 00 não criará:

- tabelas;
- migrations;
- políticas RLS;
- usuários;
- autenticação real;
- buckets;
- funções;
- dados de produção;
- credenciais no repositório.

A SDD-ENV-001 poderá preparar contratos, configurações tipadas e pontos de integração, mas a conexão funcional e as regras de acesso serão tratadas nas SDDs próprias do Grupo 01.

### 4.4 Dados simulados

Quando necessários para validar navegação ou estados visuais, serão utilizados dados simulados claramente identificados.

Os dados simulados:

- não representarão regras definitivas;
- não serão persistidos como dados oficiais;
- não determinarão a estrutura final do banco;
- deverão poder ser substituídos por adaptadores reais.

### 4.5 Sincronização Lovable e GitHub

O GitHub continuará sendo a fonte oficial.

Como a conexão direta do Lovable poderá registrar alterações na branch conectada, antes de cada implementação será criado um checkpoint recuperável.

Não serão utilizados:

- force push;
- rebase de commits publicados;
- squash de histórico já sincronizado;
- alteração destrutiva do histórico.

Se o Lovable não permitir trabalhar numa branch própria, será aplicado o seguinte controle:

1. registrar o commit atual da `main`;
2. criar branch de checkpoint;
3. autorizar apenas o escopo aprovado;
4. identificar imediatamente os commits gerados;
5. revisar o diff;
6. aceitar ou reverter por novo commit;
7. nunca apagar ou reescrever o histórico.

Antes da primeira implementação, essa exceção operacional deverá ser registrada em `AGENTS.md`.

## 5. Composição do Grupo 00

| Ordem | ID | SDD | Responsável principal | Resultado |
|---:|---|---|---|---|
| 1 | SDD-FND-001 | Fundação da Aplicação | Lovable | Estrutura navegável do SIGA |
| 2 | SDD-DSG-001 | Sistema Visual e Componentes Básicos | Lovable | Linguagem visual reutilizável |
| 3 | SDD-ENV-001 | Ambientes, Contratos e Integrações Iniciais | Codex | Base técnica para dados e ambientes |

As três SDDs deverão ser executadas nessa ordem.

Somente uma SDD do grupo deverá estar em implementação por vez.

## 6. SDD-FND-001 — Fundação da Aplicação

### 6.1 Objetivo

Transformar o projeto vazio do Lovable numa aplicação identificada como SIGA, com estrutura de navegação e composição preparada para os módulos futuros.

### 6.2 Escopo preliminar

A SDD deverá detalhar:

- identidade básica da aplicação;
- idioma `pt-BR`;
- metadados institucionais;
- layout raiz;
- cabeçalho;
- navegação lateral ou equivalente;
- área principal de conteúdo;
- navegação responsiva;
- rotas iniciais;
- página inicial institucional;
- páginas de módulo ainda não implementado;
- tratamento de carregamento;
- estado vazio;
- estado de erro;
- página não encontrada;
- estrutura de pastas;
- limites entre layout, páginas e componentes.

### 6.3 Rotas preliminares

As rotas deverão representar apenas a arquitetura de navegação, sem antecipar funcionalidades.

Poderão incluir:

- início;
- clientes;
- trabalhos;
- planejamento;
- riscos e procedimentos;
- documentos e evidências;
- papéis de trabalho;
- revisão;
- relatórios;
- configurações.

As rotas ainda não implementadas deverão apresentar estado explícito de módulo futuro.

### 6.4 Fora do escopo

- autenticação;
- usuários reais;
- permissões;
- cadastro funcional;
- banco de dados;
- Supabase;
- upload;
- relatórios reais;
- regras metodológicas;
- dashboard com indicadores reais;
- publicação em produção.

### 6.5 Entregáveis

- aplicação identificada como SIGA;
- layout raiz;
- navegação principal;
- rotas estruturais;
- estados básicos;
- responsividade inicial;
- documentação dos arquivos alterados;
- registro das limitações.

### 6.6 Critério de saída

A SDD-FND-001 estará apta a avançar quando:

- o SIGA abrir sem placeholder;
- a aplicação estiver identificada corretamente;
- a navegação estrutural funcionar;
- o layout responder a desktop e dispositivos menores;
- rotas inexistentes apresentarem tratamento adequado;
- nenhum módulo funcional tiver sido antecipado;
- nenhum banco ou credencial tiver sido criado;
- o diff tiver sido revisado;
- a validação humana tiver sido registrada.

## 7. SDD-DSG-001 — Sistema Visual e Componentes Básicos

### 7.1 Objetivo

Definir uma linguagem visual reutilizável e coerente para impedir que os módulos futuros se transformem numa colcha de retalhos.

### 7.2 Escopo preliminar

A SDD deverá detalhar:

- paleta institucional;
- tipografia;
- escala de espaçamento;
- bordas;
- sombras;
- ícones;
- densidade de informação;
- hierarquia visual;
- tokens semânticos;
- estados de interação;
- componentes básicos;
- padrões para formulários;
- padrões para listagens;
- padrões para mensagens;
- responsividade;
- requisitos iniciais de acessibilidade.

### 7.3 Componentes prioritários

- botão;
- campo de texto;
- campo numérico;
- seleção;
- caixa de seleção;
- área de texto;
- cartão;
- tabela;
- abas;
- etiqueta de situação;
- alerta;
- diálogo;
- painel lateral;
- breadcrumb;
- paginação;
- esqueleto de carregamento;
- estado vazio;
- mensagem de erro.

Componentes existentes deverão ser reutilizados antes da criação de novos equivalentes.

### 7.4 Estados mínimos

Cada componente aplicável deverá considerar:

- padrão;
- foco;
- hover;
- selecionado;
- desabilitado;
- carregando;
- sucesso;
- aviso;
- erro;
- vazio.

### 7.5 Fora do escopo

- identidade visual completa de marketing;
- portal do cliente;
- gráficos avançados;
- dashboards definitivos;
- relatórios para impressão;
- customizações por organização;
- regras específicas de módulos.

### 7.6 Entregáveis

- tokens visuais consolidados;
- componentes básicos padronizados;
- exemplos de uso;
- padrões de estados;
- comportamento responsivo;
- orientação para reutilização.

### 7.7 Critério de saída

A SDD-DSG-001 estará apta a avançar quando:

- componentes básicos utilizarem tokens comuns;
- variações equivalentes não estiverem duplicadas;
- estados essenciais estiverem representados;
- o layout permanecer consistente;
- houver contraste e navegação por teclado básicos;
- módulos futuros puderem reutilizar os componentes.

## 8. SDD-ENV-001 — Ambientes, Contratos e Integrações Iniciais

### 8.1 Objetivo

Preparar a base técnica para desenvolvimento, homologação e futuras integrações, mantendo interface, domínio e persistência desacoplados.

### 8.2 Escopo preliminar

A SDD deverá detalhar:

- configuração de ambiente;
- validação tipada de variáveis;
- arquivo de exemplo sem segredos;
- separação entre desenvolvimento, homologação e produção;
- contratos de repositório;
- interfaces para serviços;
- adaptadores simulados;
- tratamento padronizado de erros;
- estratégia de consultas;
- convenção de estados assíncronos;
- pontos futuros de integração com Supabase;
- organização de testes comuns;
- orientação de logs sem dados sensíveis.

### 8.3 Contratos iniciais

Os contratos deverão ser mínimos e genéricos.

Poderão prever:

- resultado de operação;
- paginação;
- filtros;
- identificação;
- datas de criação e alteração;
- organização ativa futura;
- usuário ativo futuro;
- tratamento de erro.

Não deverão reproduzir antecipadamente todas as entidades do [[Modelo de Dados do SIGA]].

### 8.4 Ambientes

Deverão ser previstos:

- desenvolvimento;
- homologação;
- produção.

Cada ambiente deverá possuir:

- configuração separada;
- credenciais próprias no futuro;
- dados próprios;
- identificação visual ou técnica suficiente para evitar confusão;
- proibição de segredos versionados.

### 8.5 Fora do escopo

- conexão real com produção;
- service role no frontend;
- criação de schema;
- migrations;
- políticas RLS;
- autenticação;
- autorização;
- armazenamento de arquivos;
- dados reais;
- CI/CD completo.

### 8.6 Entregáveis

- convenção de ambientes;
- configuração tipada;
- exemplo de variáveis sem valores secretos;
- contratos mínimos;
- adaptadores simulados;
- orientação para integração futura;
- registro de decisões arquiteturais, quando necessário.

### 8.7 Critério de saída

A SDD-ENV-001 estará apta a concluir quando:

- o projeto puder ser configurado sem segredos no código;
- ambientes estiverem conceitualmente separados;
- componentes não dependerem diretamente do Supabase;
- adaptadores simulados puderem ser substituídos;
- erros forem tratados de forma consistente;
- nenhuma estrutura definitiva de banco tiver sido criada.

## 9. Sequência de execução

```text
Plano do Grupo 00 aprovado
        ↓
SDD-FND-001 elaborada
        ↓
SDD-FND-001 aprovada e publicada
        ↓
Lovable em modo planejamento
        ↓
Plano do Lovable revisado
        ↓
Checkpoint Git criado
        ↓
Lovable autorizado a implementar
        ↓
Diff e funcionamento revisados
        ↓
Validação humana
        ↓
SDD-DSG-001
        ↓
SDD-ENV-001
        ↓
Revisão integrada do Grupo 00
        ↓
Autorização para o Grupo 01
```

## 10. Protocolo de acionamento do Lovable

### 10.1 Planejamento

Cada SDD sob responsabilidade do Lovable deverá ser enviada inicialmente com ordem expressa para não alterar código.

O Lovable deverá informar:

1. entendimento do objetivo;
2. arquivos que pretende criar ou alterar;
3. componentes que pretende reutilizar;
4. sequência de implementação;
5. riscos;
6. dúvidas;
7. critérios de aceite cobertos;
8. itens que permanecerão fora do escopo.

### 10.2 Implementação

A implementação somente será autorizada após:

- SDD aprovada no GitHub;
- plano do Lovable revisado;
- arquivos afetados conhecidos;
- checkpoint criado;
- limites reafirmados;
- confirmação de que banco e produção não serão alterados.

### 10.3 Revisão

Depois da implementação:

- o Codex inspecionará o diff;
- serão executadas verificações técnicas comuns;
- o responsável validará o resultado visual e funcional;
- falhas serão corrigidas em novo commit;
- não haverá reescrita de histórico.

## 11. Responsabilidades

| Atividade | Work | Lovable | Codex | Humano |
|---|---|---|---|---|
| Plano do Grupo 00 | Principal | Consulta | Inspeção técnica | Aprova |
| SDD-FND-001 | Principal | Consulta | Consulta técnica | Aprova |
| Implementação FND | Acompanha | Principal | Revisa | Valida |
| SDD-DSG-001 | Principal | Consulta | Consulta técnica | Aprova |
| Implementação DSG | Acompanha | Principal | Revisa | Valida |
| SDD-ENV-001 | Documenta necessidade | Consulta | Principal | Aprova |
| Banco e segurança | Registra limites | Não altera | Analisa futuramente | Autoriza |
| Testes formais | Fora deste grupo | Corrige | Grupo 07 | Homologa |

As skills Superpowers não serão usadas no Grupo 00.

## 12. Riscos e controles

| Risco | Controle |
|---|---|
| Reconstrução desnecessária do projeto | Preservar o stack TanStack existente |
| Lovable alterar arquivos fora do escopo | Planejamento prévio e lista de arquivos |
| Alteração direta da `main` | Checkpoint, diff imediato e reversão por novo commit |
| Reescrita do histórico sincronizado | Proibir force push, rebase e squash publicados |
| Criação prematura de banco | Bloqueio expresso em todas as SDDs |
| Uso de credencial sensível | Variáveis protegidas e proibição de segredos no Git |
| Acoplamento da interface ao Supabase | Contratos e adaptadores |
| Duplicação de componentes | Reutilizar biblioteca existente |
| Visual inconsistente | Sistema visual antes dos módulos |
| Antecipação de regras de negócio | Rotas e telas estruturais sem CRUD funcional |
| Plano anterior do Lovable induzir decisões antigas | Tratar `.lovable/plan.md` como desatualizado |
| Expansão indefinida do Grupo 00 | Aplicar os limites e critérios de saída deste plano |

## 13. Critérios de conclusão do Grupo 00

O Grupo 00 será considerado concluído quando:

- as três SDDs estiverem aprovadas e implementadas;
- a aplicação estiver identificada como SIGA;
- a navegação estrutural estiver funcional;
- o layout for responsivo;
- os componentes básicos estiverem padronizados;
- estados visuais essenciais estiverem disponíveis;
- contratos entre interface e dados estiverem definidos;
- ambientes estiverem separados conceitualmente;
- nenhum segredo estiver versionado;
- nenhum banco definitivo tiver sido criado;
- o código estiver revisado;
- limitações e pendências estiverem registradas;
- o resultado estiver integrado ao GitHub;
- o responsável autorizar o início do Grupo 01.

## 14. Pendências que não bloquearão o Grupo 00

Serão encaminhadas aos grupos seguintes:

- autenticação;
- organizações;
- usuários;
- papéis e permissões;
- RLS;
- cadastros reais;
- banco persistente;
- upload;
- regras metodológicas;
- relatórios;
- indicadores;
- integrações externas.

Essas pendências não deverão ser incorporadas às SDDs do Grupo 00.

## 15. Próxima ação

Com a SDD-FND-001 aprovada, a próxima ação será:

1. publicar a versão aprovada na `main`;
2. confirmar sua leitura pelo Lovable;
3. enviar a SDD ao Lovable exclusivamente em modo planejamento;
4. revisar o plano apresentado antes de autorizar qualquer implementação.

## 16. Navegação

- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Fundação da Aplicação]]
- [[Sistema Visual e Componentes Básicos]]
- [[Ambientes, Contratos e Integrações Iniciais]]
- [[Arquitetura Tecnológica do SIGA]]
- [[Governança do Desenvolvimento do SIGA]]

## 17. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-29 | Criação do plano operacional do Grupo 00 | Substituída |
| 1.0 | 2026-07-29 | Primeira versão aprovada do Plano do Grupo 00 | Aprovada |
