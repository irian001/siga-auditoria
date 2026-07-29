---
id: SIGA-SDD-MVP-000
title: Plano Mestre das SDDs do MVP do SIGA
aliases:
  - Plano Mestre das SDDs
  - SDDs do MVP
type: plano-mestre-sdd
domain: governanca-desenvolvimento
status: minuta
version: 0.1
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
  - "[[Visão do Produto do SIGA]]"
  - "[[Glossário do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Governança do Desenvolvimento do SIGA]]"
  - "[[Roadmap, Evolução e Continuidade do SIGA]]"
  - "[[Qualidade, Testes e Validação do SIGA]]"
tags:
  - siga
  - mvp
  - sdd
  - roadmap
  - lovable
  - desenvolvimento
---

# Plano Mestre das SDDs do MVP do SIGA

## 1. Finalidade

Este documento organiza as especificações orientadas ao desenvolvimento — SDDs — necessárias para construir o MVP do SIGA de forma progressiva, rastreável e coerente.

Ele estabelece:

- os grupos de desenvolvimento;
- as SDDs previstas em cada grupo;
- as dependências;
- a ordem recomendada;
- os limites do MVP;
- os responsáveis principais;
- o procedimento para acionar o Lovable;
- os critérios para avançar;
- a etapa formal de testes e liberação.

Este plano não substitui as SDDs individuais. Cada SDD detalhará uma parte delimitada do sistema.

## 2. Fontes e hierarquia

Este plano deriva de:

- [[Constituição do SIGA]];
- [[Visão do Produto do SIGA]];
- [[Glossário do SIGA]];
- [[Modelo de Domínio do SIGA]];
- [[Modelo de Dados do SIGA]];
- [[Governança do Desenvolvimento do SIGA]];
- [[Roadmap, Evolução e Continuidade do SIGA]];
- `AGENTS.md`.

Em caso de conflito, prevalecem a Constituição, as decisões expressamente aprovadas e os documentos superiores definidos em `AGENTS.md`.

Conversas e prompts complementam a execução, mas não substituem os arquivos oficiais do GitHub.

## 3. Situação inicial

Na data desta minuta:

- a Constituição está aprovada e publicada;
- a Visão do Produto está aprovada e publicada;
- o Glossário está aprovado e publicado;
- o Modelo de Domínio está aprovado e publicado;
- o Modelo de Dados está aprovado funcionalmente e deverá ser integrado à `main` antes das SDDs que dependam de sua estrutura;
- o `AGENTS.md` está publicado na `main`;
- nenhuma SDD do MVP foi iniciada;
- nenhuma implementação deverá ser enviada ao Lovable antes da aprovação deste plano e da SDD correspondente.

## 4. Conceitos de organização

### 4.1 Grupo

Conjunto de SDDs que produz uma capacidade reconhecível do MVP.

### 4.2 SDD

Documento que define uma funcionalidade ou conjunto coeso de funcionalidades, incluindo objetivo, fluxo, regras, dados, permissões, telas, critérios de aceite e limites.

### 4.3 Plano de implementação

Sequência técnica proposta para implementar uma SDD aprovada.

### 4.4 Tarefa

Unidade pequena de execução, com objetivo único e escopo verificável.

### 4.5 Prompt

Instrução operacional derivada da SDD e da tarefa. O prompt não cria nem modifica regras por conta própria.

## 5. Princípios de execução

O desenvolvimento do MVP deverá observar:

1. uma SDD aprovada antes de qualquer implementação relevante;
2. uma branch própria para cada SDD ou incremento autorizado;
3. planejamento do Lovable antes da implementação;
4. escopo pequeno e reversível;
5. GitHub como fonte oficial;
6. Supabase alterado somente mediante SDD e revisão técnica;
7. separação entre interface, regras e persistência;
8. validação humana das decisões funcionais;
9. rastreabilidade entre SDD, código, testes e documentação;
10. uso das skills Superpowers somente na etapa formal de testes e validação.

Inicialmente, deverá existir apenas uma SDD principal em implementação. Execuções paralelas poderão ser autorizadas posteriormente quando não houver sobreposição de arquivos, dados ou regras.

## 6. Limites do MVP

O MVP deverá validar um trabalho de auditoria do início ao fim, com simplificações controladas.

Integram o núcleo:

- organização usuária e acessos;
- clientes;
- trabalhos de auditoria;
- planejamento;
- balancete e contas;
- riscos, controles e procedimentos;
- solicitações e documentos;
- evidências;
- papéis de trabalho;
- revisão;
- achados;
- conclusões;
- relatório básico;
- histórico e rastreabilidade essenciais.

Ficam fora do núcleo inicial:

- planos de ação;
- portal avançado do cliente;
- gestão comercial completa;
- propostas, contratos e faturamento;
- indicadores e painéis avançados;
- auditoria dos pares;
- automações avançadas;
- agentes integrados ao produto;
- integrações externas amplas;
- múltiplos pacotes setoriais completos.

Esses itens poderão receber SDDs futuras após a validação do MVP.

## 7. Estrutura documental

As SDDs deverão ser organizadas da seguinte forma:

```text
docs/sdd/
├── 00_PLANO_MESTRE_DAS_SDDS_DO_MVP.md
├── grupo-00-fundacao/
├── grupo-01-organizacao-e-acesso/
├── grupo-02-clientes-e-trabalhos/
├── grupo-03-contabilidade-e-planejamento/
├── grupo-04-riscos-e-procedimentos/
├── grupo-05-documentos-e-evidencias/
├── grupo-06-revisao-e-conclusao/
└── grupo-07-testes-e-liberacao/
```

Cada arquivo utilizará o padrão:

```text
SDD-<DOMINIO>-<NUMERO>_<NOME_CURTO>.md
```

Exemplo:

```text
SDD-FND-001_FUNDACAO_DA_APLICACAO.md
```

## 8. Grupo 00 — Fundação

### Objetivo

Criar a base visual e técnica sobre a qual os demais módulos serão construídos.

| Ordem | ID | SDD | Responsável principal | Dependências |
|---:|---|---|---|---|
| 1 | SDD-FND-001 | Fundação da aplicação | Lovable | AGENTS e Plano Mestre |
| 2 | SDD-DSG-001 | Sistema visual e componentes básicos | Lovable | SDD-FND-001 |
| 3 | SDD-ENV-001 | Ambientes, contratos e integrações iniciais | Codex | SDD-FND-001 |

### Escopo esperado

- estrutura da aplicação;
- layout principal;
- navegação;
- rotas iniciais;
- componentes básicos;
- responsividade;
- estados visuais;
- contratos entre interface e dados;
- configuração controlada de ambientes.

### Limites

O Grupo 00 não deverá criar indiscriminadamente tabelas no Supabase nem antecipar regras dos módulos.

### Critério de avanço

A aplicação deverá possuir estrutura navegável, consistente e preparada para receber módulos sem reconstrução do núcleo visual.

## 9. Grupo 01 — Organização e acesso

### Objetivo

Estabelecer identidade organizacional, autenticação, usuários, vínculos, papéis e permissões.

| Ordem | ID | SDD | Responsável principal | Dependências |
|---:|---|---|---|---|
| 1 | SDD-ORG-001 | Organização usuária | Lovable + Codex | Grupo 00 |
| 2 | SDD-AUT-001 | Autenticação | Codex | SDD-ORG-001 |
| 3 | SDD-USR-001 | Usuários e vínculos organizacionais | Lovable + Codex | SDD-AUT-001 |
| 4 | SDD-ACL-001 | Papéis e permissões | Codex | SDD-USR-001 |

### Critério de avanço

Usuários autorizados deverão acessar somente a organização e as funções permitidas, com isolamento verificável.

## 10. Grupo 02 — Clientes e trabalhos

### Objetivo

Permitir o cadastro de clientes e a criação controlada dos trabalhos de auditoria.

| Ordem | ID | SDD | Responsável principal | Dependências |
|---:|---|---|---|---|
| 1 | SDD-CLI-001 | Cadastro de clientes | Lovable + Codex | Grupo 01 |
| 2 | SDD-ACE-001 | Aceitação e continuidade simplificada | Work + Lovable + Codex | SDD-CLI-001 |
| 3 | SDD-TRB-001 | Criação e gestão do trabalho | Lovable + Codex | SDD-ACE-001 |
| 4 | SDD-EQP-001 | Equipe, funções e períodos | Lovable + Codex | SDD-TRB-001 |
| 5 | SDD-PNL-001 | Painel básico do trabalho | Lovable | SDD-EQP-001 |

### Critério de avanço

Um trabalho deverá possuir cliente, período, equipe, responsáveis, funções e estado controlado.

## 11. Grupo 03 — Contabilidade e planejamento

### Objetivo

Relacionar o trabalho à estrutura contábil e transformar informações do cliente em decisões de planejamento.

| Ordem | ID | SDD | Responsável principal | Dependências |
|---:|---|---|---|---|
| 1 | SDD-SEG-001 | Segmentos econômicos | Work + Codex | Grupo 02 |
| 2 | SDD-PCR-001 | Planos e contas referenciais | Work + Codex | SDD-SEG-001 |
| 3 | SDD-BAL-001 | Importação de balancete | Lovable + Codex | SDD-PCR-001 |
| 4 | SDD-MAP-001 | Mapeamento de contas | Lovable + Codex | SDD-BAL-001 |
| 5 | SDD-PLA-001 | Planejamento da auditoria | Work + Lovable + Codex | SDD-MAP-001 |
| 6 | SDD-MAT-001 | Materialidade | Work + Codex | SDD-PLA-001 |

### Observação setorial

O primeiro formato de balancete analisado pertence ao setor elétrico. Detalhes de leiaute, validações e planos referenciais serão fechados nas SDDs correspondentes, sem transformar um único arquivo em padrão universal.

### Critério de avanço

As contas do cliente deverão ser importadas, validadas e relacionadas ao contexto do trabalho, permitindo o planejamento documentado.

## 12. Grupo 04 — Riscos e procedimentos

### Objetivo

Transformar o planejamento em respostas de auditoria executáveis e rastreáveis.

| Ordem | ID | SDD | Responsável principal | Dependências |
|---:|---|---|---|---|
| 1 | SDD-PRC-001 | Processos e ciclos | Work + Lovable | Grupo 03 |
| 2 | SDD-RSK-001 | Riscos do trabalho | Work + Lovable + Codex | SDD-PRC-001 |
| 3 | SDD-CTL-001 | Controles internos | Work + Lovable + Codex | SDD-RSK-001 |
| 4 | SDD-PRO-001 | Programas e procedimentos | Work + Lovable + Codex | SDD-RSK-001 |
| 5 | SDD-AMS-001 | Amostragem inicial | Work + Codex | SDD-PRO-001 |

### Critério de avanço

Cada risco relevante deverá possuir tratamento documentado, sem presumir que a existência de um procedimento representa resposta suficiente.

## 13. Grupo 05 — Documentos, evidências e papéis

### Objetivo

Controlar a solicitação, recepção, avaliação e utilização de documentos no trabalho de auditoria.

| Ordem | ID | SDD | Responsável principal | Dependências |
|---:|---|---|---|---|
| 1 | SDD-INS-001 | Instruções de evidência | Work + Lovable | Grupo 04 |
| 2 | SDD-SOL-001 | Solicitações de documentos | Lovable + Codex | SDD-INS-001 |
| 3 | SDD-ARQ-001 | Arquivos, versões e acessos | Codex | SDD-SOL-001 |
| 4 | SDD-DOC-001 | Documentos recebidos | Lovable + Codex | SDD-ARQ-001 |
| 5 | SDD-EVD-001 | Avaliação e incorporação de evidências | Work + Lovable + Codex | SDD-DOC-001 |
| 6 | SDD-PT-001 | Papéis de trabalho | Work + Lovable + Codex | SDD-EVD-001 |

### Regra obrigatória

Solicitação, instrução, documento recebido, arquivo armazenado, evidência avaliada e papel de trabalho permanecerão como conceitos distintos.

### Critério de avanço

O sistema deverá permitir reconstruir a origem, a versão, a avaliação e a utilização de cada evidência relevante.

## 14. Grupo 06 — Revisão e conclusão

### Objetivo

Revisar o trabalho, consolidar resultados e produzir o relatório básico do MVP.

| Ordem | ID | SDD | Responsável principal | Dependências |
|---:|---|---|---|---|
| 1 | SDD-REV-001 | Revisão e pendências | Work + Lovable + Codex | Grupo 05 |
| 2 | SDD-ACH-001 | Achados e recomendações | Work + Lovable + Codex | SDD-REV-001 |
| 3 | SDD-CON-001 | Conclusões por área | Work + Lovable + Codex | SDD-ACH-001 |
| 4 | SDD-REL-001 | Relatório básico | Work + Lovable + Codex | SDD-CON-001 |
| 5 | SDD-ENC-001 | Encerramento e arquivamento | Work + Codex | SDD-REL-001 |

### Limite

Planos de ação não integram este grupo do MVP. Serão tratados como extensão futura por SDD própria.

### Critério de avanço

Nenhuma conclusão ou item relevante do relatório poderá existir sem suporte rastreável e revisão aplicável.

## 15. Grupo 07 — Testes e liberação

### Objetivo

Executar a validação formal integrada do MVP e preparar sua liberação controlada.

| Ordem | ID | Documento | Responsável principal | Dependências |
|---:|---|---|---|---|
| 1 | TST-MVP-001 | Plano integrado de testes do MVP | Codex + Superpowers | Grupos 00–06 |
| 2 | TST-SEC-001 | Segurança, permissões e isolamento | Codex + Superpowers | TST-MVP-001 |
| 3 | TST-E2E-001 | Fluxo completo de auditoria | Codex + Superpowers | TST-SEC-001 |
| 4 | REL-MVP-001 | Homologação e liberação | Responsável humano | Testes aprovados |

### Regra de uso das skills

As skills Superpowers serão utilizadas exclusivamente neste grupo, para testes, regressão, verificação e validação formal.

Elas não serão acionadas durante a elaboração das SDDs, planejamento normal, produção documental ou implementação comum.

### Critério de conclusão

O MVP somente poderá ser liberado após:

- testes críticos aprovados;
- isolamento multiempresa verificado;
- permissões verificadas;
- fluxo completo executado;
- falhas impeditivas tratadas;
- documentação atualizada;
- homologação humana.

## 16. Fluxo obrigatório de cada SDD

Cada SDD seguirá:

```text
Necessidade priorizada
        ↓
Minuta da SDD pelo Work
        ↓
Revisão e aprovação humana
        ↓
Branch própria no GitHub
        ↓
Lovable em modo planejamento
        ↓
Revisão humana do plano
        ↓
Lovable em modo implementação
        ↓
Revisão técnica pelo Codex
        ↓
Verificações proporcionais
        ↓
Validação funcional humana
        ↓
Commit, pull request e integração
        ↓
Atualização deste Plano Mestre
```

## 17. Protocolo de acionamento direto do Lovable

### 17.1 Pré-condições

Antes do acionamento:

- a SDD deverá estar aprovada e publicada no GitHub;
- a branch deverá estar identificada;
- o projeto Lovable deverá estar conectado ao repositório oficial;
- o escopo e os itens proibidos deverão estar claros;
- arquivos ou módulos sensíveis deverão ser informados;
- o Lovable deverá receber o caminho oficial da SDD.

### 17.2 Primeira mensagem — planejamento

O Work enviará ao Lovable uma mensagem com esta estrutura:

```text
Projeto: SIGA
Modo: planejamento, sem alterar código
SDD oficial: <caminho no GitHub>
Branch prevista: <branch>

Leia o AGENTS.md e os documentos obrigatórios indicados pela SDD.

Apresente:
1. entendimento do objetivo;
2. telas, componentes e fluxos envolvidos;
3. arquivos que pretende criar ou alterar;
4. dependências;
5. riscos e dúvidas;
6. sequência de implementação;
7. critérios de aceite que serão atendidos.

Não implemente, não publique, não altere o banco e não amplie o escopo.
```

### 17.3 Aprovação do plano

O responsável humano e, quando necessário, o Codex avaliarão:

- aderência à SDD;
- impacto em outros módulos;
- arquivos afetados;
- dependências;
- segurança;
- banco de dados;
- risco de retrabalho.

### 17.4 Segunda mensagem — implementação

Após a aprovação:

```text
Plano aprovado para a SDD <ID>.

Implemente somente o escopo aprovado.
Trabalhe na branch <branch>.
Preserve os arquivos e módulos fora do escopo.
Não publique em produção.
Não crie ou altere tabelas, migrations, políticas ou credenciais sem autorização específica.

Ao concluir, informe:
1. arquivos criados ou alterados;
2. critérios atendidos;
3. verificações realizadas;
4. limitações;
5. pendências.
```

## 18. Distribuição de responsabilidades por tipo de trabalho

| Atividade | Work | Lovable | Codex | Superpowers | Humano |
|---|---|---|---|---|---|
| Requisitos e SDD | Principal | Consulta | Consulta técnica | Não usar | Aprova |
| Planejamento visual | Coordena | Principal | Revisa impacto | Não usar | Aprova |
| Interface e fluxo | Acompanha | Principal | Revisa | Não usar | Valida |
| Regras complexas | Documenta | Apoia | Principal | Não usar | Aprova |
| Banco e segurança | Documenta necessidade | Não decide | Principal | Não usar | Autoriza |
| Verificações comuns | Acompanha | Informa | Executa | Não usar | Avalia |
| Testes formais do MVP | Acompanha | Corrige falhas | Principal | Autorizado | Homologa |
| Merge e liberação | Registra | Não decide | Prepara | Verifica | Autoriza |

## 19. Estados das SDDs

Cada SDD poderá estar em:

- planejada;
- em elaboração;
- em revisão;
- aprovada;
- em planejamento no Lovable;
- em implementação;
- em revisão técnica;
- em validação funcional;
- em testes formais;
- concluída;
- bloqueada;
- suspensa.

O estado deverá ser registrado no YAML da SDD e neste Plano Mestre.

## 20. Critérios de entrada de uma SDD

Uma SDD poderá ser elaborada quando:

- sua necessidade estiver no MVP;
- os documentos superiores forem suficientes;
- dependências principais estiverem identificadas;
- não houver conflito documental impeditivo;
- o resultado esperado estiver claro.

## 21. Critérios de entrada em implementação

Uma SDD somente poderá ser implementada quando:

- estiver aprovada;
- possuir critérios de aceite;
- possuir branch definida;
- indicar arquivos ou áreas permitidas;
- indicar itens fora do escopo;
- dependências estiverem disponíveis;
- plano do Lovable ou plano técnico estiver aprovado;
- riscos críticos estiverem tratados.

## 22. Critérios de conclusão de uma SDD

Uma SDD será concluída quando:

- o escopo aprovado estiver implementado;
- os critérios de aceite estiverem verificados;
- a revisão técnica estiver concluída;
- a validação funcional estiver registrada;
- a documentação estiver atualizada;
- limitações e pendências estiverem registradas;
- o código estiver integrado ao GitHub;
- o Plano Mestre estiver atualizado.

## 23. Controle contra expansão sem fim

Para evitar que o planejamento se torne interminável:

- cada SDD deverá resolver uma capacidade concreta;
- detalhes que não bloqueiem o MVP serão registrados como pendência futura;
- novas ideias não entrarão automaticamente no escopo;
- o número de documentos não será aumentado sem necessidade;
- uma SDD poderá referenciar documentos superiores sem reproduzi-los;
- o grupo seguinte poderá ser preparado quando o grupo atual estiver estável, sem esperar perfeição absoluta;
- funcionalidades futuras permanecerão fora do MVP até decisão expressa.

## 24. Ordem inicial de execução

A sequência imediata será:

1. aprovar e publicar este Plano Mestre;
2. integrar o Modelo de Dados aprovado à `main`;
3. confirmar a conexão direta do projeto Lovable com o repositório;
4. elaborar `SDD-FND-001 — Fundação da Aplicação`;
5. enviar a SDD ao Lovable em modo planejamento;
6. revisar o plano apresentado;
7. autorizar a primeira implementação.

## 25. Painel inicial

| Grupo | Situação | Próxima ação |
|---|---|---|
| 00 — Fundação | Não iniciado | Elaborar SDD-FND-001 |
| 01 — Organização e acesso | Não iniciado | Aguardar Grupo 00 |
| 02 — Clientes e trabalhos | Não iniciado | Aguardar Grupo 01 |
| 03 — Contabilidade e planejamento | Não iniciado | Aguardar Grupo 02 |
| 04 — Riscos e procedimentos | Não iniciado | Aguardar Grupo 03 |
| 05 — Documentos e evidências | Não iniciado | Aguardar Grupo 04 |
| 06 — Revisão e conclusão | Não iniciado | Aguardar Grupo 05 |
| 07 — Testes e liberação | Não iniciado | Aguardar MVP integrado |

## 26. Navegação

- [[Constituição do SIGA]]
- [[Visão do Produto do SIGA]]
- [[Glossário do SIGA]]
- [[Modelo de Domínio do SIGA]]
- [[Modelo de Dados do SIGA]]
- [[Governança do Desenvolvimento do SIGA]]
- [[Roadmap, Evolução e Continuidade do SIGA]]
- [[Qualidade, Testes e Validação do SIGA]]

## 27. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-29 | Criação da minuta inicial do Plano Mestre das SDDs do MVP | Em revisão |
