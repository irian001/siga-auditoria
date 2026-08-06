---
id: SIGA-PLN-EQP-001-C2
title: Plano Restritivo — EQP-001 Camada 2 — Diretório de Usuários
aliases:
  - Plano da Camada 2 do EQP-001
  - Plano do Diretório de Usuários Elegíveis
  - Implantação EQP-001 C2
type: implementation-plan
domain: equipe-funcoes-periodos
group: grupo-02-clientes-e-trabalhos
status: minuta
implementation_status: nao-iniciada
version: 0.1
created: 2026-08-06
updated: 2026-08-06
owner: responsavel-projeto
responsible:
  planning: work
  implementation: codex
  approval: responsavel-projeto
depends_on:
  - SIGA-EQP-001-C2
  - SIGA-EQP-001-C1
  - SIGA-SDD-USR-001
  - SIGA-SDD-ACL-001
related:
  - "[[SDD-EQP-001 — Equipe, Funções e Períodos]]"
  - "[[EQP-001 — Camada 2 — Diretório de Usuários]]"
  - "[[EQP-001 — Camada 1 — Reconciliação de Contratos]]"
  - "[[SDD-USR-001 — Usuários e Perfis]]"
  - "[[SDD-ACL-001 — Autorização e Controle de Acesso]]"
  - "[[Plano de Implantação EQP-001]]"
  - "[[Situação do Projeto]]"
obsidian:
  note_type: implementation-plan
  graph_role: security-gated-execution
  backlinks_expected: true
  dataview_ready: true
tags:
  - siga
  - sdd
  - eqp-001
  - grupo-02
  - camada-2
  - diretorio-usuarios
  - rls
  - users-view
  - somente-leitura
---

# PLANO RESTRITIVO — EQP-001 CAMADA 2

## Diretório de usuários elegíveis — somente leitura

## 1. Finalidade

Este plano define a execução controlada da Camada 2 da [[SDD-EQP-001 — Equipe, Funções e Períodos]].

O objetivo é disponibilizar um contrato de consulta para listar usuários elegíveis da organização atual, exclusivamente em modo de leitura, para uso futuro na composição da equipe de um trabalho.

Esta etapa não implementa cadastro, convite, edição, inativação, reativação, associação ao trabalho ou administração completa de usuários.

## 2. Resultado autorizado

Somente os seguintes resultados estão autorizados nesta camada:

- consultar usuários vinculados à organização atual;
- retornar apenas usuários elegíveis conforme os critérios aprovados;
- respeitar a permissão users.view;
- respeitar o isolamento entre organizações;
- fornecer um contrato local reutilizável pela próxima camada;
- preservar a distinção entre usuário, perfil e vínculo organizacional;
- preparar testes que comprovem leitura, bloqueio e isolamento.

O resultado não autoriza ainda a criação da tela definitiva da equipe nem a associação de pessoas a trabalhos.

## 3. Limites obrigatórios

Não está autorizado neste plano:

- criar usuário;
- convidar usuário;
- editar perfil;
- alterar vínculo organizacional;
- inativar ou reativar usuário;
- administrar papéis;
- administrar permissões;
- criar equipe de trabalho;
- associar usuário a trabalho;
- criar engagement_roles;
- criar engagement_team_members;
- criar engagement_periods;
- acessar diretamente auth.users pelo navegador;
- usar service_role no cliente;
- criar acesso amplo para qualquer usuário autenticado;
- criar uma função privilegiada sem desenho e autorização específicos;
- ativar Lovable Cloud;
- pedir geração de código pelo Lovable;
- usar Superpowers nesta fase;
- alterar dependências, rotas ou módulos fora do escopo;
- alterar o Supabase antes da autorização específica do Gate C.

## 4. Situação técnica de entrada

A reconciliação da Camada 1 registrou que:

- o repositório local possui apenas resolução do usuário atual;
- o repositório Supabase existente consulta o perfil e os vínculos do usuário atual;
- as permissões users.view e users.manage existem no domínio, mas não existe diretório administrativo pronto;
- não existe repositório de equipe, funções ou períodos;
- o projeto oficial é siga-auditoria, referência umuassmgminmliuypoyp;
- existem as tabelas user_profiles e organization_memberships;
- as tabelas de equipe e períodos ainda não existem;
- as políticas atuais permitem consulta do próprio perfil e do próprio vínculo, mas não demonstram consulta administrativa de usuários da organização;
- o campo de e-mail não está disponível no perfil inicial e não será inventado nesta camada.

Esses fatos são restrições de entrada. O plano não presume que a consulta administrativa já esteja pronta.

## 5. Contrato funcional mínimo

O contrato de leitura deverá retornar, quando permitido:

- userProfileId;
- displayName;
- membershipId;
- organizationId, apenas como identificador interno necessário ao contrato;
- membershipStatus;
- activeFrom, quando disponível;
- activeTo, quando disponível.

O contrato não deverá retornar:

- senha;
- token;
- segredo;
- auth_subject para exibição;
- metadados brutos de autenticação;
- credenciais;
- dados de outra organização;
- e-mail, enquanto não houver campo aprovado e fonte autorizada para ele.

## 6. Gates de segurança e execução

A implementação deverá avançar por gates independentes. Se um gate falhar, a execução deverá parar naquele ponto.

### Gate A — Desenho de autorização e RLS

Antes de escrever código dependente do banco, deverá ficar definido:

- como a sessão autenticada será identificada;
- como users.view será verificada;
- como a organização atual será determinada;
- como os registros serão filtrados pela organização;
- como serão filtrados perfil ativo e vínculo vigente;
- como será evitada recursão nas políticas RLS;
- quais campos serão expostos;
- se será necessária migração, função ou view;
- como será evitado acesso privilegiado indevido.

Se a solução depender de função security definer, view que ignore RLS ou acesso administrativo amplo, a execução deverá parar e produzir uma decisão técnica específica antes de qualquer alteração.

### Gate B — Contrato local somente leitura

Com o desenho de segurança definido, deverá ser criado ou ajustado somente o contrato local necessário para:

- representar usuário elegível;
- consultar a fonte autorizada;
- manter a tela independente da implementação específica do Supabase;
- permitir mock controlado para testes.

Nenhum cadastro ou comando de escrita deverá ser introduzido.

### Gate C — Persistência oficial

Somente após aprovação explícita do desenho dos Gates A e B poderá ser proposta alteração no Supabase.

Se for necessária migration ou política RLS, ela deverá ser apresentada separadamente, com:

- tabelas e colunas atingidas;
- política anterior e nova;
- impacto multiempresa;
- estratégia de reversão;
- testes de autorização;
- confirmação de que não haverá service_role no navegador.

Sem autorização específica, este plano não executa SQL nem migration.

### Gate D — Validação

Depois da implementação autorizada, deverão ser validados:

- usuário com users.view consegue consultar;
- usuário sem users.view não consegue consultar;
- usuário anônimo não consegue consultar;
- possuir apenas engagements.manage não concede acesso;
- perfil ativo com vínculo ativo/vigente aparece;
- perfil inativo não aparece;
- vínculo pendente, revogado, inativo ou expirado não aparece;
- dados de outra organização não aparecem;
- nenhum comando de escrita é executado.

## 7. Sequência de execução

### Etapa 2.1 — Fechamento do desenho de segurança

Produzir um relatório curto contendo:

- fonte de cada campo;
- regra de elegibilidade;
- regra de autorização;
- organização de contexto;
- proposta de RLS ou camada equivalente;
- riscos e decisões pendentes;
- confirmação de que não haverá acesso direto a auth.users.

Saída: decisão técnica para consulta segura.

### Etapa 2.2 — Contrato local de consulta

Implementar somente o contrato e o adaptador necessários, preferencialmente com mock para permitir validação sem depender de dados reais.

Saída: consulta local tipada, somente leitura, com testes de autorização e elegibilidade.

### Etapa 2.3 — Persistência e políticas oficiais

Executar somente se o Gate C for autorizado.

Saída: fonte oficial consultável com isolamento e RLS comprovados.

### Etapa 2.4 — Validação autenticada

Validar em ambiente autenticado e, quando aplicável, com mais de um contexto organizacional.

Saída: evidências de consulta permitida, bloqueada e isolada.

### Etapa 2.5 — Encerramento

Atualizar SDD, plano, situação do projeto e histórico somente após os testes e a homologação.

Saída: Camada 2 concluída ou bloqueada com pendência documentada.

## 8. Áreas candidatas de alteração

A lista final de arquivos somente será fechada no Gate A. As áreas candidatas são:

- src/domain/user.ts;
- src/domain/organizationMembership.ts;
- src/domain/authorization.ts;
- novo contrato de diretório em src/data/;
- adaptador Supabase em src/data/supabase/, se necessário;
- composição de dependências, se indispensável;
- testes unitários e de integração;
- migration ou política, somente após Gate C;
- componente visual, apenas se indispensável para validar a consulta.

Nenhum arquivo dessa lista está automaticamente autorizado. A alteração deverá ser delimitada no plano da etapa 2.1.

## 9. Regras mínimas de RLS e autorização

A solução deverá combinar:

1. sessão autenticada;
2. permissão efetiva users.view;
3. organização atual;
4. perfil ativo;
5. vínculo organizacional ativo e vigente;
6. filtro de organização no resultado.

Não será suficiente aplicar apenas TO authenticated.

Não deverão ser usados para autorização:

- e-mail;
- texto de cargo;
- user_metadata;
- raw_user_meta_data;
- suposição de que todo usuário autenticado é administrador.

Se a verificação da permissão dentro da política gerar recursão, deverá ser adotada solução explicitamente revisada, com menor privilégio e testes de isolamento. A solução não deverá colocar uma função privilegiada em schema público sem justificativa, controle de search_path, privilégios e autorização.

## 10. Testes obrigatórios

Os testes deverão cobrir, no mínimo:

- consulta permitida com users.view;
- consulta negada sem users.view;
- consulta negada para usuário anônimo;
- consulta negada para usuário que tenha apenas engagements.manage;
- inclusão de perfil ativo e vínculo ativo/vigente;
- exclusão de perfil inativo;
- exclusão de vínculo pendente;
- exclusão de vínculo revogado;
- exclusão de vínculo expirado;
- isolamento entre organizações;
- troca de organização no contexto;
- ausência de campos sensíveis;
- ausência de operações de escrita;
- ausência de uso de service_role no navegador.

## 11. Critérios de saída

A Camada 2 poderá ser considerada concluída somente quando:

- o desenho de segurança estiver aprovado;
- o contrato local estiver definido;
- a consulta respeitar users.view;
- a organização estiver corretamente isolada;
- somente usuários elegíveis forem retornados;
- os testes de autorização e isolamento estiverem aprovados;
- não houver CRUD ou associação de equipe;
- a documentação estiver atualizada;
- as evidências estiverem registradas;
- a homologação humana tiver sido realizada.

## 12. Critérios de parada

A execução deverá ser interrompida se ocorrer qualquer uma das situações:

- necessidade de criar ou editar usuários;
- necessidade de acessar diretamente auth.users pelo cliente;
- ausência de regra clara para users.view;
- ausência de isolamento organizacional verificável;
- necessidade de usar service_role no navegador;
- migração proposta sem autorização específica;
- alteração fora dos arquivos aprovados;
- tentativa de implementar equipe, funções ou períodos nesta camada;
- Lovable alterar escopo, domínio, banco ou autenticação;
- teste de segurança não reproduzível;
- dados de outra organização aparecerem.

## 13. Ferramentas e responsabilidades

### ChatGPT Work

- conduzir a documentação;
- preparar decisões e critérios;
- controlar o escopo;
- registrar pendências.

### Codex

- realizar inspeção local;
- implementar contrato delimitado após aprovação;
- executar testes locais;
- apresentar diff e evidências.

### Supabase

- permanecer como fonte oficial apenas quando o Gate C for aprovado;
- receber alterações somente mediante autorização específica;
- manter RLS e isolamento como requisitos obrigatórios.

### Lovable

Não será utilizado para fabricar código nesta camada. Nenhum prompt de implementação será enviado ao Lovable.

### Superpowers

Não será utilizado nesta camada. Seu uso permanece reservado à etapa formal de auditoria/testes prevista no plano mestre.

## 14. Próxima ação após aprovação deste plano

A primeira ação será exclusivamente a Etapa 2.1 — fechamento do desenho de segurança.

Essa ação não autoriza:

- alteração de código;
- criação de migration;
- alteração de RLS;
- criação de tabela;
- publicação;
- uso do Lovable;
- uso de Superpowers.

O resultado da Etapa 2.1 será apresentado para nova decisão antes de qualquer implementação.

## 15. Decisão solicitada

Solicita-se a aprovação deste plano restritivo para iniciar apenas a Etapa 2.1.

## 16. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 06/08/2026 | Criação do plano restritivo da Camada 2, com gates de segurança, contrato e persistência | Em aprovação |
