---
id: SIGA-SDD-CLI-001
title: SDD-CLI-001 — Cadastro de Clientes
aliases:
  - Cadastro de Clientes do SIGA
  - Clientes do SIGA
  - SDD-CLI-001
type: sdd
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
implementation_status: concluido
version: 1.1
created: 2026-08-03
updated: 2026-08-04
owner: responsavel-projeto
responsible:
  planning: work
  visual_implementation: lovable
  technical_implementation: codex
  approval: responsavel-projeto
depends_on:
  - SIGA-SDD-ORG-001
  - SIGA-SDD-AUT-001
  - SIGA-SDD-USR-001
  - SIGA-SDD-ACL-001
related:
  - "[[Constituição do SIGA]]"
  - "[[Visão do Produto do SIGA]]"
  - "[[Glossário do SIGA]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[SDD-ACE-001]]"
  - "[[SDD-TRB-001]]"
obsidian:
  note_type: sdd
  graph_role: implementation-specification
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, sdd, grupo-02, clientes, cadastro, multiempresa, rls]
---

# SDD-CLI-001 — Cadastro de Clientes

## 1. Finalidade

Implantar o cadastro básico dos clientes auditados ou atendidos pela organização usuária do SIGA.

Esta SDD inicia o Grupo 02 e cria a identidade do cliente necessária para as etapas posteriores de aceitação, criação do trabalho de auditoria, planejamento, solicitações, evidências e relatórios.

```text
Organização usuária
→ Cliente
→ Aceitação e continuidade
→ Trabalho de auditoria
```

Cliente e organização usuária são entidades distintas. A Audiconsult utiliza o SIGA; seus clientes são as entidades para as quais os trabalhos serão realizados.

## 2. Situação de origem

Na abertura desta SDD:

- os Grupos 00 e 01 estão concluídos;
- autenticação, perfis, memberships, papéis e permissões estão implantados;
- o usuário `Irian` possui acesso ativo à organização Audiconsult;
- a rota visual de clientes existe apenas como módulo futuro;
- ainda não existe cadastro funcional de clientes;
- ainda não existe tabela `clients` implantada no banco oficial;
- nenhuma aceitação, continuidade ou trabalho será criado nesta SDD.

## 3. Objetivos

- cadastrar clientes dentro da organização ativa;
- consultar e localizar clientes da própria organização;
- editar dados cadastrais autorizados;
- inativar e reativar clientes sem apagar histórico;
- distinguir nome jurídico, nome de exibição e identificador fiscal;
- impedir duplicidade indevida dentro da mesma organização;
- garantir isolamento multiempresa no banco e na aplicação;
- acrescentar permissões específicas de clientes ao ACL existente;
- preparar as SDDs de aceitação e trabalhos sem antecipá-las.

## 4. Escopo

- entidade `clients`;
- listagem de clientes;
- busca e filtros básicos;
- criação de cliente;
- edição de cliente;
- visualização resumida;
- inativação e reativação;
- validações cadastrais;
- permissões `clients.view` e `clients.manage`;
- políticas RLS e privilégios mínimos;
- histórico técnico mínimo de criação e atualização;
- integração com o contexto organizacional e o padrão visual já aprovado.

## 5. Fora do escopo

- aceitação e continuidade;
- criação de trabalhos de auditoria;
- equipes, funções e períodos;
- contatos e usuários externos do cliente;
- portal do cliente;
- solicitações de documentos;
- documentos, evidências e papéis de trabalho;
- endereços múltiplos;
- filiais, unidades ou grupos econômicos;
- contratos, propostas e faturamento;
- consulta automática a Receita Federal ou terceiros;
- importação em lote de clientes;
- exclusão física;
- classificação automática por inteligência artificial;
- cadastro completo de segmentos econômicos.

O segmento econômico será tratado em `SDD-SEG-001`. Esta SDD poderá registrar uma classificação cadastral simples, mas não criará o catálogo metodológico de segmentos.

## 6. Conceito de cliente

Cliente é a entidade auditada ou atendida por uma organização usuária.

Regras conceituais:

- cada cliente pertence a uma única organização no contexto deste registro;
- a mesma entidade poderá existir como cliente de organizações usuárias diferentes, sem identidade compartilhada entre elas;
- um cliente poderá possuir vários trabalhos ao longo do tempo;
- inativar o cliente não apaga trabalhos, decisões ou histórico;
- o cliente não recebe automaticamente acesso ao SIGA;
- pessoas do cliente e suas permissões serão tratadas posteriormente;
- o cadastro não autoriza a execução de trabalho sem a etapa de aceitação aplicável.

## 7. Entidade `clients`

### 7.1 Campos

| Campo | Tipo | Obrigatório | Regra |
|---|---|---:|---|
| `id` | UUID | Sim | Identificador permanente gerado pelo sistema |
| `organization_id` | UUID | Sim | Organização proprietária; obtida do contexto autenticado |
| `display_name` | Texto curto | Sim | Nome usado nas listas e navegação |
| `legal_name` | Texto curto | Sim | Razão social ou nome jurídico |
| `tax_identifier_type` | Texto curto | Sim | Inicialmente `cnpj`, `cpf`, `foreign` ou `other` |
| `tax_identifier` | Texto curto | Condicional | Obrigatório para `cnpj` e `cpf`; normalizado sem pontuação |
| `classification` | Texto curto | Sim | Inicialmente `legal_entity`, `individual` ou `other` |
| `status` | Texto curto | Sim | `active` ou `inactive` |
| `created_at` | Data e hora | Sim | Gerado pelo banco |
| `created_by` | UUID | Sim | Perfil responsável pela criação |
| `updated_at` | Data e hora | Sim | Atualizado pelo banco |
| `updated_by` | UUID | Sim | Perfil responsável pela última alteração |
| `inactivated_at` | Data e hora | Condicional | Preenchido quando inativado |
| `inactivated_by` | UUID | Condicional | Responsável pela inativação |

### 7.2 Decisão sobre dados mínimos

O modelo de dados aprovado exige `organization_id`, `display_name`, `status` e `classification`. Esta SDD acrescenta `legal_name` e identificador fiscal para permitir identificação cadastral segura no uso brasileiro.

Endereço, telefone, e-mail geral, responsáveis e outros dados pessoais não serão coletados nesta primeira versão. Essa minimização reduz complexidade e exposição desnecessária.

### 7.3 Identificador fiscal

- CNPJ e CPF serão armazenados somente com dígitos;
- a interface poderá apresentar máscara;
- CNPJ deverá possuir 14 dígitos e CPF 11 dígitos;
- a implementação deverá validar os dígitos verificadores;
- identificadores estrangeiros ou de outro tipo poderão conter letras e números conforme regra posterior, sem validação brasileira;
- identificador não deverá ser usado como chave primária;
- identificador completo não deverá aparecer em logs técnicos comuns.

### 7.4 Unicidade

- para CNPJ e CPF, deverá existir unicidade por `organization_id`, `tax_identifier_type` e `tax_identifier` entre registros preservados;
- a mesma entidade poderá existir em outra organização usuária;
- `display_name` e `legal_name` não serão únicos;
- tentativa de duplicidade deverá apresentar mensagem compreensível e não expor dados de outra organização.

## 8. Estados e ciclo de vida

### 8.1 Estados

- `active`: disponível para novas etapas autorizadas;
- `inactive`: preservado para consulta e histórico, mas indisponível para iniciar novo trabalho.

### 8.2 Transições

```text
criação → active
active → inactive
inactive → active
```

### 8.3 Regras

- novo cliente será criado como ativo;
- inativação exigirá confirmação;
- reativação será permitida a usuário autorizado;
- cliente com trabalho existente não poderá ser excluído fisicamente;
- alterações de estado deverão registrar usuário e momento;
- a interface deverá diferenciar visualmente registros inativos sem ocultar seu histórico.

## 9. Permissões

Esta SDD acrescentará ao catálogo de permissões:

| Código | Finalidade |
|---|---|
| `clients.view` | Consultar clientes da própria organização |
| `clients.manage` | Criar, editar, inativar e reativar clientes da própria organização |

Regras:

- `organization_admin` receberá as duas permissões por migration idempotente;
- `clients.manage` não substitui `clients.view`; o papel administrativo receberá ambas;
- papéis futuros poderão receber somente consulta;
- ausência de permissão produzirá negação segura;
- esconder botão não substitui autorização no banco;
- permissões não autorizam acesso a clientes de outra organização.

## 10. Segurança e isolamento multiempresa

Toda operação deverá satisfazer:

```text
sessão válida
AND perfil ativo
AND organização ativa
AND membership ativo
AND permissão aplicável
AND clients.organization_id = organização ativa
```

Requisitos:

- RLS habilitado em `clients`;
- `organization_id` não será escolhido livremente no formulário;
- inserção deverá usar a organização resolvida no contexto autenticado;
- leitura e alteração serão limitadas à organização ativa;
- tentativa de forçar outro `organization_id` será bloqueada;
- usuário anônimo não terá acesso;
- `service_role` não será exposta ao navegador;
- inexistência e falta de acesso não deverão revelar a presença de cliente externo.

## 11. Fluxos funcionais

### 11.1 Listar clientes

1. usuário acessa o módulo Clientes;
2. sistema verifica `clients.view`;
3. lista somente clientes da organização ativa;
4. estado ativo aparece por padrão;
5. usuário pode buscar por nome e identificador fiscal;
6. usuário pode filtrar por estado e classificação.

### 11.2 Criar cliente

1. usuário aciona `Novo cliente`;
2. sistema verifica `clients.manage`;
3. formulário solicita os campos mínimos;
4. sistema normaliza e valida os dados;
5. banco verifica organização, autorização e unicidade;
6. cliente é criado como ativo;
7. usuário recebe confirmação e visualiza o cadastro.

### 11.3 Editar cliente

1. usuário abre cliente da própria organização;
2. sistema verifica `clients.manage`;
3. campos atuais são apresentados;
4. alteração válida é salva;
5. responsável e momento são atualizados;
6. trabalhos anteriores não são reescritos por essa alteração.

### 11.4 Inativar ou reativar

1. usuário autorizado escolhe a ação;
2. sistema apresenta consequência e solicita confirmação;
3. banco valida organização e permissão;
4. estado e metadados são registrados;
5. histórico permanece disponível.

## 12. Interface esperada

### 12.1 Página de clientes

Deverá conter:

- título e descrição do módulo;
- ação `Novo cliente` para quem possuir `clients.manage`;
- pesquisa por nome ou identificador;
- filtro por estado;
- filtro por classificação;
- tabela ou lista responsiva;
- nome de exibição;
- razão social ou nome jurídico;
- identificador fiscal mascarado;
- classificação;
- estado;
- ações permitidas.

### 12.2 Formulário

Deverá apresentar:

- nome de exibição;
- razão social ou nome jurídico;
- tipo de identificador;
- identificador;
- classificação;
- mensagens de validação próximas ao campo;
- ações salvar e cancelar;
- indicação de processamento;
- proteção contra envio repetido.

### 12.3 Identidade visual

- preservar o tema escuro aprovado em tons de azul, preto e cinza;
- utilizar os componentes básicos existentes;
- manter contraste, foco visível e navegação por teclado;
- não criar um segundo sistema visual;
- não alterar a navegação de módulos não relacionados.

## 13. Mensagens funcionais

Exemplos esperados:

- `Cliente cadastrado com sucesso.`
- `Cliente atualizado com sucesso.`
- `Cliente inativado. O histórico foi preservado.`
- `Já existe um cliente com este identificador nesta organização.`
- `Você não possui permissão para administrar clientes.`
- `Não foi possível concluir a operação. Tente novamente.`

Mensagens não deverão expor SQL, detalhes internos, IDs de outra organização ou dados sensíveis.

## 14. Contratos de aplicação

A implementação deverá preservar separação entre:

- componentes visuais;
- regras e tipos do domínio;
- contrato de repositório;
- implementação Supabase;
- autorização;
- validações.

Contrato conceitual mínimo:

```text
listClients(filters)
getClientById(clientId)
createClient(input)
updateClient(clientId, input)
changeClientStatus(clientId, status)
```

Todos os métodos dependerão do contexto autenticado e não aceitarão autorização presumida pela interface.

## 15. Responsabilidade das ferramentas

### 15.1 Work

- manter esta SDD e o plano de implantação;
- registrar decisões e limites;
- coordenar a revisão funcional.

### 15.2 Lovable

- fabricar a interface de listagem e formulário;
- reutilizar o sistema visual existente;
- trabalhar apenas nos arquivos autorizados pelo plano;
- não criar tabela, migration, política RLS ou regra nova por conta própria;
- não ativar Lovable Cloud nem trocar a conexão Supabase oficial.

### 15.3 Codex

- implementar domínio, contratos, repositório e integração;
- criar migration, permissões e RLS;
- revisar segurança e isolamento;
- criar testes proporcionais ao risco;
- verificar compilação e alterações antes da publicação.

### 15.4 Superpowers

Não será utilizada para gerar código ou conduzir esta implementação. Seu uso permanece reservado à auditoria formal e aos testes previstos no Grupo 07, conforme decisão do projeto.

## 16. Implementação física prevista

A definição final de arquivos ocorrerá no plano de implantação. A previsão inclui:

```text
src/domain/client.ts
src/data/clientRepository.ts
src/data/supabase/supabaseClientRepository.ts
src/features/clients/
src/routes/clientes.tsx
supabase/migrations/<timestamp>_clients.sql
docs/sdd/grupo-02-clientes-e-trabalhos/PLANO-CLI-001_IMPLANTACAO.md
```

Arquivos existentes somente serão alterados após inspeção e delimitação no plano.

## 17. Critérios de aceite

A SDD estará implementada quando:

- usuário autorizado listar somente clientes da Audiconsult;
- usuário sem `clients.view` não consultar o módulo nem a tabela;
- usuário com `clients.manage` criar, editar, inativar e reativar clientes;
- usuário sem `clients.manage` não executar mutações;
- CNPJ e CPF forem normalizados e validados;
- duplicidade fiscal dentro da mesma organização for bloqueada;
- a mesma identificação em outra organização não for exposta nem bloqueada globalmente;
- `organization_id` não puder ser forjado pelo navegador;
- cliente inativo permanecer consultável e não for apagado;
- dados de criação, atualização e inativação forem preservados;
- interface respeitar o sistema visual existente;
- rotas e módulos já concluídos continuarem funcionando;
- documentação, migration e testes estiverem versionados no GitHub;
- nenhuma integração usar Lovable Cloud como banco alternativo.

## 18. Casos de teste previstos

### 18.1 Funcionais

- criar cliente com CNPJ válido;
- rejeitar CNPJ inválido;
- rejeitar campo obrigatório vazio;
- editar nomes sem alterar o identificador permanente;
- localizar cliente por nome;
- filtrar ativos e inativos;
- inativar e reativar;
- impedir duplicidade na organização.

### 18.2 Autorização

- permitir consulta com `clients.view`;
- negar consulta sem `clients.view`;
- permitir mutação com `clients.manage`;
- negar mutação sem `clients.manage`;
- negar acesso anônimo;
- negar acesso com membership inativo.

### 18.3 Multiempresa

- não listar cliente de outra organização;
- não abrir cliente externo por ID conhecido;
- não alterar cliente externo;
- não inferir existência por mensagem de erro;
- aceitar identificador igual em outra organização sem compartilhar registros.

### 18.4 Regressão

- login e recuperação de senha;
- resolução da organização ativa;
- tela de acesso pendente;
- exibição do usuário e do papel;
- navegação do Grupo 01;
- compilação local.

## 19. Decisões aprovadas

Com a aprovação desta SDD, ficam estabelecidas para o MVP:

1. pessoa física poderá ser cadastrada como cliente;
2. `legal_name` será obrigatório, podendo repetir `display_name` quando não houver denominação distinta;
3. identificadores `foreign` e `other` serão admitidos de forma básica, sem validação externa;
4. a classificação inicial será `legal_entity`, `individual` ou `other`;
5. a listagem apresentará CPF ou CNPJ parcialmente mascarado; a visualização completa dependerá de autorização e necessidade funcional.

## 20. Resultado da implementação

A `SDD-CLI-001` foi concluída e validada em 2026-08-04.

Foram confirmados:

- cadastro, consulta, pesquisa e filtros de clientes;
- edição, inativação e reativação;
- normalização e validação de CPF e CNPJ;
- permissões `clients.view` e `clients.manage`;
- RLS e isolamento por organização;
- integração real com o Supabase oficial `umuassmgminmliuypoyp`;
- ausência de utilização do Lovable Cloud como banco alternativo;
- testes funcionais realizados e aprovados pelo responsável pelo projeto;
- integração do código na `main` pelo PR #26, merge `e306f028`;
- reconciliação do identificador da migration pelo PR #27, merge `fe9f98e6`.

Não há pendência funcional conhecida nesta SDD. A sequência autorizada pelo Plano Mestre passa para a elaboração da `SDD-ACE-001`.

## 21. Navegação

- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Situação do Projeto]]
- [[SDD-ACL-001]]
- [[SDD-ACE-001]]
- [[Modelo de Domínio do SIGA]]
- [[Modelo de Dados do SIGA]]

## 22. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-03 | Criação da primeira minuta do cadastro de clientes para abertura do Grupo 02 | Substituída |
| 1.0 | 2026-08-03 | Aprovação humana da SDD e confirmação das decisões cadastrais iniciais do MVP | Aprovada |
| 1.1 | 2026-08-04 | Registro da conclusão da implementação, validação funcional e reconciliação da migration de clientes | Concluída |
