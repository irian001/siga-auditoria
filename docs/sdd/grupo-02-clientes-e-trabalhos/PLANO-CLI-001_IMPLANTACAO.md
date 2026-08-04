---
id: SIGA-PLN-CLI-001
title: Plano de Implantação — SDD-CLI-001 Cadastro de Clientes
aliases:
  - Plano CLI-001
  - Plano de Implantação do Cadastro de Clientes
type: plano-implantacao
domain: clientes-e-trabalhos
group: grupo-02-clientes-e-trabalhos
status: aprovado
implementation_status: concluido
version: 1.1
created: 2026-08-03
updated: 2026-08-04
owner: responsavel-projeto
responsible:
  coordination: work
  visual_implementation: lovable
  technical_implementation: codex
  approval: responsavel-projeto
implements:
  - SIGA-SDD-CLI-001
depends_on:
  - SIGA-SDD-ORG-001
  - SIGA-SDD-AUT-001
  - SIGA-SDD-USR-001
  - SIGA-SDD-ACL-001
related:
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[Situação do Projeto]]"
  - "[[SDD-CLI-001]]"
  - "[[SDD-ACL-001]]"
  - "[[Modelo de Dados do SIGA]]"
obsidian:
  note_type: implementation-plan
  graph_role: execution-plan
  backlinks_expected: true
  dataview_ready: true
tags: [siga, mvp, plano, grupo-02, clientes, lovable, codex, supabase]
---

# Plano de Implantação — SDD-CLI-001

## 1. Objetivo

Implantar o cadastro de clientes definido na [[SDD-CLI-001]] sem comprometer a fundação, a autenticação, o contexto organizacional ou o ACL concluídos no Grupo 01.

O resultado deverá permitir que usuários autorizados da Audiconsult consultem e administrem somente clientes da própria organização, com validação cadastral, preservação histórica e isolamento aplicado no banco.

## 2. Estado técnico de origem

Na elaboração deste plano:

- a branch `main` contém os Grupos 00 e 01 concluídos;
- a rota `src/routes/clientes.tsx` existe, mas apresenta apenas `ModuloFuturoPage`;
- o menu Clientes já aponta para `/clientes`;
- `src/domain/authorization.ts` contém somente permissões do Grupo 01;
- não existem domínio, repositório ou componentes funcionais de clientes;
- não existe tabela `public.clients` no conjunto local de migrations;
- o Supabase oficial é `umuassmgminmliuypoyp`;
- a aplicação publicada utiliza `https://siga-audiconsult.lovable.app`;
- Lovable Cloud não integra a arquitetura autorizada;
- resíduos locais não relacionados não poderão entrar nos commits.

## 3. Regra de execução

A implantação será dividida em entregas pequenas e revisáveis.

Nenhuma etapa autoriza automaticamente a seguinte quando envolver:

- aplicação de migration no Supabase remoto;
- concessão de novas permissões;
- substituição da página publicada;
- merge na `main`;
- publicação no Lovable.

Esses pontos exigirão checkpoint e autorização humana específica.

## 4. Divisão de responsabilidades

### 4.1 Work

- manter SDD, plano e situação do projeto;
- controlar escopo e decisões;
- preparar instruções delimitadas;
- registrar aprovações e próximos passos.

### 4.2 Lovable

- construir a experiência visual da lista e do formulário;
- reutilizar componentes e tema existentes;
- consumir contratos e dados simulados definidos no repositório;
- atuar somente na branch e nos arquivos autorizados;
- não criar ou alterar migration, RLS, ACL, segredos ou conexão de banco;
- não ativar Lovable Cloud.

### 4.3 Codex

- criar migration local e revisar segurança;
- implementar domínio, validações, repositório e adaptador Supabase;
- integrar a interface aos contratos reais;
- criar verificações automatizadas proporcionais ao risco;
- revisar o conjunto antes de cada checkpoint.

### 4.4 Superpowers

Não será utilizada na geração do código nem na condução desta implantação. Permanece reservada à auditoria formal e aos testes do Grupo 07.

## 5. Estratégia de branches e entregas

Serão utilizadas branches curtas derivadas da `main` atualizada:

| Entrega | Branch sugerida | Responsável principal |
|---|---|---|
| Documentação aprovada | `docs/cli-001` | Work + Codex |
| Base técnica e contratos | `feat/cli-001-base-clientes` | Codex |
| Interface visual | `feat/cli-001-interface-clientes` | Lovable |
| Integração e segurança | `feat/cli-001-integracao-clientes` | Codex |

Uma branch somente será iniciada após a entrega anterior estar publicada ou reconciliada. Não haverá trabalho simultâneo do Lovable e do Codex nos mesmos arquivos.

## 6. Sequência geral

```text
Publicar SDD e plano
→ atualizar e inspecionar a main
→ criar migration local
→ criar permissões e RLS
→ criar domínio, validações e contratos
→ verificar base técnica
→ checkpoint antes do Supabase remoto
→ aplicar estrutura remota autorizada
→ fornecer contrato estável ao Lovable
→ Lovable construir interface
→ revisar visual e arquivos alterados
→ Codex integrar ao Supabase
→ verificar função, segurança e regressão
→ PR técnico
→ merge autorizado
→ sincronização e validação no Lovable
```

## 7. Etapa 1 — Publicação documental

### Ações

- promover este plano para versão 1.0 após aprovação;
- registrar a SDD e o plano na branch documental;
- conferir que somente os três documentos previstos estejam incluídos:
  - Plano Mestre atualizado;
  - Situação do Projeto;
  - SDD e plano CLI-001;
- abrir PR documental;
- revisar e integrar após autorização.

### Saída

Documentação oficial disponível na `main` antes da implementação.

## 8. Etapa 2 — Inspeção técnica atualizada

### Ações

- atualizar a branch técnica com a `main`;
- conferir estado do Git e resíduos locais;
- revisar `AGENTS.md`, se existente;
- revisar a rota `/clientes` e o sistema visual;
- revisar o contexto de organização e autorização;
- revisar migrations aplicadas e estado do Supabase;
- confirmar que não existe implementação paralela de clientes;
- registrar qualquer divergência antes de editar.

### Saída

Lista definitiva dos arquivos permitidos e confirmação do ponto de partida.

## 9. Etapa 3 — Migration local de clientes

### Ações

Criar migration nova, sem editar migrations já aplicadas, contendo:

- tabela `public.clients`;
- campos aprovados na SDD;
- chaves estrangeiras para organização e perfis responsáveis;
- estados `active` e `inactive`;
- validações de campos não vazios;
- consistência entre estado e metadados de inativação;
- unicidade fiscal por organização;
- índices para organização, estado, nome e identificador;
- comentários técnicos;
- RLS habilitado;
- privilégios mínimos.

### Regras

- `organization_id` será obrigatório;
- exclusão física não será concedida ao cliente da aplicação;
- migrations anteriores não serão reescritas;
- nenhum dado real será inserido nesta etapa.

## 10. Etapa 4 — Ampliação controlada do ACL

### Ações

- acrescentar `clients.view` e `clients.manage` ao catálogo por migration idempotente;
- conceder ambas ao papel `organization_admin` da Audiconsult;
- preservar todas as permissões anteriores;
- atualizar o tipo `PermissionCode` da aplicação;
- garantir que código desconhecido continue sendo negado.

### Verificação

- administrador recebe as duas permissões;
- papel sem concessão não recebe acesso implícito;
- nenhuma permissão curinga é criada.

## 11. Etapa 5 — Políticas RLS

### Leitura

Permitida somente quando:

- usuário estiver autenticado;
- possuir membership ativo na organização do registro;
- possuir `clients.view` ou `clients.manage` conforme decisão consolidada;
- registro pertencer à organização ativa.

### Inserção e alteração

Permitidas somente quando:

- usuário possuir `clients.manage`;
- organização do registro for a organização autorizada;
- responsável registrado corresponder ao perfil autenticado aplicável;
- validações de integridade forem satisfeitas.

### Exclusão

Não será concedida no MVP.

## 12. Etapa 6 — Domínio e validações

### Ações

- criar tipos `Client`, `ClientStatus`, `ClientClassification` e `TaxIdentifierType`;
- criar entradas específicas para criação e atualização;
- normalizar CNPJ e CPF para dígitos;
- implementar validação dos dígitos verificadores;
- implementar máscara de apresentação;
- validar obrigatoriedade e comprimentos;
- manter regras independentes da interface e do Supabase.

### Casos mínimos

- CNPJ válido e inválido;
- CPF válido e inválido;
- identificador com máscara;
- identificador estrangeiro básico;
- nomes vazios;
- estados válidos e inválidos.

## 13. Etapa 7 — Contrato de repositório

Criar contrato independente do banco para:

```text
listClients(filters)
getClientById(clientId)
createClient(input)
updateClient(clientId, input)
changeClientStatus(clientId, status)
```

O contrato deverá:

- retornar modelos do domínio;
- receber contexto autorizado sem aceitar organização arbitrária da tela;
- distinguir falha de validação, duplicidade, autorização e indisponibilidade;
- permitir implementação simulada durante a fabricação visual;
- não expor tipos internos do Supabase à interface.

## 14. Etapa 8 — Repositório simulado

### Finalidade

Fornecer ao Lovable um contrato estável sem conceder autonomia sobre o banco.

### Ações

- criar conjunto pequeno de clientes fictícios;
- incluir estados ativo e inativo;
- incluir pessoa jurídica e pessoa física;
- simular busca, filtros, criação, edição e mudança de estado;
- impedir que dados simulados sejam confundidos com dados oficiais;
- permitir remoção do adaptador visual sem reconstrução da interface.

## 15. Etapa 9 — Verificação da base técnica

Antes de qualquer aplicação remota:

- revisar diff completo;
- executar lint e compilação;
- executar verificações unitárias disponíveis;
- revisar migration e políticas;
- confirmar ausência de segredo;
- confirmar que somente arquivos autorizados foram alterados;
- confirmar que resíduos locais não foram incluídos.

Falha nessa etapa interrompe a implantação.

## 16. Etapa 10 — Checkpoint antes do Supabase remoto

Apresentar ao responsável:

- migration proposta;
- tabelas, índices e políticas;
- permissões acrescentadas;
- papel que receberá as permissões;
- impacto e reversão;
- resultado das verificações locais.

Somente após autorização específica a estrutura poderá ser aplicada ao projeto `umuassmgminmliuypoyp`.

## 17. Etapa 11 — Aplicação estrutural remota

### Ações

- confirmar autenticação no projeto correto;
- confirmar novamente a referência `umuassmgminmliuypoyp`;
- aplicar exclusivamente a migration aprovada;
- não criar cliente real;
- não alterar autenticação, URLs, provedores ou templates de e-mail;
- verificar tabela, índices, permissões e RLS após a aplicação.

### Checkpoint

Parar e apresentar o resultado antes de acionar o Lovable.

## 18. Etapa 12 — Instrução delimitada ao Lovable

O Lovable receberá:

- SDD aprovada;
- plano aprovado;
- lista exata de arquivos permitidos;
- contrato do repositório;
- dados simulados;
- critérios visuais e de aceite;
- proibição expressa de alterar Supabase, migrations, ACL e configuração de nuvem.

### Entrega esperada

- página responsiva de clientes;
- pesquisa e filtros;
- formulário de criação e edição;
- confirmação de inativação e reativação;
- estados de carregamento, vazio, erro e sucesso;
- uso dos componentes e tema já existentes.

O primeiro pedido deverá ser feito em modo planejamento. O plano do Lovable será revisado antes de autorizar a fabricação.

## 19. Etapa 13 — Revisão da proposta do Lovable

Antes de autorizar a implementação, verificar:

- arquivos que serão alterados;
- inexistência de alteração em banco e autenticação;
- reutilização do sistema visual;
- aderência aos campos aprovados;
- tratamento de estados e permissões;
- ausência de módulos adicionais;
- ausência de ativação do Lovable Cloud.

Qualquer ampliação de escopo será recusada ou separada para outra SDD.

## 20. Etapa 14 — Fabricação visual

Após aprovação do plano visual, o Lovable poderá:

- substituir `ModuloFuturoPage` na rota de clientes;
- criar componentes dentro de `src/features/clients/`;
- utilizar o repositório simulado;
- incluir somente dependências já existentes no projeto;
- manter demais rotas e módulos intactos.

Ao concluir, deverá apresentar resumo e arquivos alterados.

## 21. Etapa 15 — Revisão visual e estrutural

### Validação humana

- clareza da listagem;
- facilidade de cadastrar e editar;
- tema escuro aprovado;
- comportamento em tela menor;
- mensagens compreensíveis;
- confirmação de ações sensíveis;
- ausência de obstruções ou regressões visuais.

### Revisão técnica

- diff dos arquivos;
- componentes reutilizados;
- acessibilidade básica;
- ausência de regra de segurança apenas visual;
- ausência de arquivos ou integrações não autorizadas.

Correções visuais deverão ocorrer antes da integração real.

## 22. Etapa 16 — Adaptador Supabase e integração

O Codex deverá:

- implementar `supabaseClientRepository` conforme o contrato aprovado;
- mapear linhas do banco para o domínio;
- integrar contexto organizacional e autorização;
- trocar o adaptador simulado pelo real sem reconstruir a tela;
- tratar mensagens funcionais sem expor detalhes internos;
- manter proteção tanto na aplicação quanto no banco.

## 23. Etapa 17 — Verificações funcionais e de segurança

Executar, no mínimo:

- criação com CNPJ e CPF válidos;
- rejeição de identificadores inválidos;
- bloqueio de duplicidade na própria organização;
- listagem, busca e filtros;
- edição;
- inativação e reativação;
- negação sem `clients.view`;
- negação de mutação sem `clients.manage`;
- negação anônima;
- negação com membership inativo;
- tentativa de ler e alterar cliente de outra organização;
- tentativa de forjar `organization_id`;
- regressão de login, contexto organizacional e ACL;
- lint e compilação local.

Os testes especializados e a auditoria ampla com Superpowers continuam reservados ao Grupo 07.

## 24. Etapa 18 — PR técnico

O PR deverá conter:

- resumo funcional;
- SDD e plano relacionados;
- migration criada;
- arquivos alterados;
- permissões acrescentadas;
- verificações executadas e resultados;
- limitações conhecidas;
- confirmação de que não houve Lovable Cloud;
- passos de validação visual;
- plano de reversão.

O PR não será integrado sem aprovação humana.

## 25. Etapa 19 — Merge, sincronização e publicação

Após aprovação:

1. integrar o PR na `main`;
2. registrar o hash do merge;
3. confirmar sincronização do Lovable com o mesmo commit;
4. publicar a aplicação;
5. acessar `/clientes` autenticado;
6. executar validação visual e funcional básica;
7. atualizar a Situação do Projeto.

## 26. Estratégia de reversão

### Antes da aplicação remota

- descartar ou corrigir a branch sem afetar produção;
- nenhuma reversão de dados será necessária.

### Após migration, antes do uso real

- preferir migration corretiva versionada;
- revogar concessões novas se necessário;
- não editar migration já aplicada;
- preservar diagnóstico do incidente.

### Após criação de clientes

- não remover tabela ou registros sem avaliação;
- interromper mutações;
- corrigir por migration ou aplicação;
- preservar clientes e histórico;
- reverter a interface ao commit anterior se necessário.

### Após publicação

- retornar a aplicação ao commit publicado anterior;
- manter banco compatível e sem exclusão destrutiva;
- registrar a falha e o tratamento.

## 27. Riscos e controles

| Risco | Controle |
|---|---|
| Lovable alterar banco ou ativar Cloud | Contrato visual, arquivos permitidos e revisão prévia do plano |
| Cliente de outra organização ficar visível | RLS, contexto organizacional e testes negativos |
| `organization_id` ser forjado | Valor derivado do contexto e validação no banco |
| Permissão existir apenas na interface | ACL na aplicação e RLS no banco |
| Duplicidade fiscal | Índice único por organização e validação amigável |
| Perda de histórico | Inativação sem exclusão física |
| Interface virar nova colcha de retalhos | Reuso obrigatório do design system e escopo restrito |
| Mudanças simultâneas conflitarem | Branches sequenciais e proprietários de arquivos por etapa |
| Migration afetar produção indevidamente | Checkpoint, revisão e aplicação somente no projeto confirmado |
| Resíduos locais entrarem no commit | Conferência explícita do Git antes de cada commit |

## 28. Arquivos previstos

### Novos

```text
src/domain/client.ts
src/domain/clientValidation.ts
src/data/clientRepository.ts
src/data/mockClientRepository.ts
src/data/supabase/supabaseClientRepository.ts
src/features/clients/ClientsPage.tsx
src/features/clients/ClientsList.tsx
src/features/clients/ClientForm.tsx
src/features/clients/ClientStatusDialog.tsx
supabase/migrations/<timestamp>_clients.sql
```

### Existentes possivelmente alterados

```text
src/domain/authorization.ts
src/routes/clientes.tsx
src/config/navigation.ts
src/routeTree.gen.ts
```

`src/routeTree.gen.ts` é gerado automaticamente e não será editado manualmente. A lista final dependerá da inspeção técnica atualizada.

### Protegidos nesta implantação

```text
configurações de autenticação
URLs e provedores do Supabase
migrations já aplicadas
estrutura de organização e memberships
recuperação de senha
rotas de módulos não relacionados
segredos e arquivos de ambiente
```

## 29. Critérios de conclusão

A implantação estará concluída quando:

- a SDD e o plano estiverem versionados;
- migration aprovada estiver aplicada no projeto correto;
- permissões de clientes estiverem concedidas de forma controlada;
- RLS e isolamento estiverem verificados;
- interface estiver visualmente aprovada;
- integração real funcionar sem Lovable Cloud;
- critérios de aceite da SDD estiverem atendidos;
- verificações locais estiverem aprovadas;
- PR estiver revisado e integrado;
- Lovable estiver sincronizado com o commit aprovado;
- aplicação publicada estiver validada;
- Situação do Projeto estiver atualizada.

## 30. Resultado da implantação

O plano foi executado e concluído em 2026-08-04.

Resultado confirmado:

1. documentação, domínio, contrato e migration versionados;
2. tabela `public.clients` aplicada no Supabase oficial;
3. permissões, RLS e isolamento organizacional configurados;
4. interface fabricada em camadas e validada pelo responsável;
5. adaptador Supabase integrado sem reconstrução da interface;
6. testes funcionais executados sem pendências relatadas;
7. integração técnica incorporada à `main` pelo PR #26;
8. identificador da migration reconciliado pelo PR #27;
9. nenhuma utilização do Lovable Cloud como banco alternativo.

O próximo passo do Plano Mestre é elaborar e aprovar a `SDD-ACE-001`, sem antecipar sua implementação.

## 31. Navegação

- [[SDD-CLI-001]]
- [[Plano Mestre das SDDs do MVP do SIGA]]
- [[Situação do Projeto]]
- [[SDD-ACL-001]]
- [[Modelo de Dados do SIGA]]
- [[SDD-ACE-001]]

## 32. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-03 | Criação da minuta do plano de implantação da SDD-CLI-001 | Substituída |
| 1.0 | 2026-08-03 | Aprovação humana do plano de implantação da SDD-CLI-001 | Aprovada |
| 1.1 | 2026-08-04 | Registro da conclusão da implantação e liberação da sequência para a SDD-ACE-001 | Concluída |
