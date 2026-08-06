---
id: SIGA-STS-001
title: Situação do Projeto SIGA
aliases:
  - Situação do Projeto
  - Estado Atual do SIGA
type: status-projeto
domain: governanca-desenvolvimento
status: ativo
version: 2.8
created: 2026-08-03
updated: 2026-08-06
owner: responsavel-projeto
related:
  - "[[Constituição do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-ACL-001]]"
  - "[[SDD-CLI-001]]"
  - "[[SDD-ACE-001]]"
  - "[[SDD-EQP-001]]"
obsidian:
  note_type: project-status
  graph_role: operational-hub
  backlinks_expected: true
  dataview_ready: true
tags: [siga, status, continuidade, mvp, sdd]
---

# Situação do Projeto SIGA

## 1. Estado atual

Os Grupos 00 — Fundação e 01 — Organização e acesso estão concluídos. O Grupo 02 — Clientes e trabalhos está em andamento, com `SDD-CLI-001`, `SDD-ACE-001` e `SDD-TRB-001` concluídas e homologadas.

Situação confirmada pelo responsável pelo projeto:

- acesso autenticado e ativo;
- organização usuária `Audiconsult Auditores S/S`;
- nome de exibição `Audiconsult`;
- usuário funcional `Irian`;
- papel organizacional `organization_admin`;
- vínculo organizacional ativo;
- autorização funcional baseada em papéis e permissões.

## 2. Etapas concluídas

### Grupo 00 — Fundação

Fundação da aplicação, sistema visual básico e contratos iniciais de ambiente concluídos.

### Grupo 01 — Organização e acesso

Concluídas e validadas:

- `SDD-ORG-001` — Organização usuária;
- `SDD-AUT-001` — Autenticação;
- `SDD-USR-001` — Usuários e vínculos organizacionais;
- `SDD-ACL-001` — Papéis e permissões.

O critério de avanço foi atendido: o usuário autorizado acessa somente a organização e as funções permitidas, com contexto organizacional e ACL verificáveis.

### Grupo 02 — Clientes e trabalhos

Concluídas e validadas:

- `SDD-CLI-001` — Cadastro de clientes.

Foram confirmados cadastro, consulta, pesquisa, filtros, edição, inativação, reativação, validação de CPF e CNPJ, permissões, RLS, isolamento organizacional e integração com o Supabase oficial.

## 3. Etapa em andamento

### Grupo 02 — Clientes e trabalhos

Concluída e homologada:

- Camada 3 da `SDD-EQP-001` — consulta da equipe e dos períodos;
- Camadas 1, 2 e 3 concluídas dentro do escopo aprovado;
- Camada 3 implementada localmente pelo Codex, sem Lovable, e integrada pelo PR #44;
- consulta somente leitura de equipe e períodos integrada ao diálogo do trabalho;
- migration oficial das três tabelas aplicada ao Supabase;
- RLS habilitada e validada nas três tabelas;
- política `SELECT` restrita a `authenticated` com `engagements.view`;
- nenhum grant de escrita para `anon` ou `authenticated`;
- nove testes direcionados, lint dos arquivos novos e build local aprovados;
- tabelas sem registros artificiais, preservando os estados vazios;
- homologação da Camada 3 registrada pelo responsável;
- pendência documental não bloqueante: reconciliação do identificador temporal da migration local e remota.
- Camada 4 implementada localmente na branch `feat/eqp-001-camada-4-associacao`;
- migration da Camada 4 aplicada no Supabase oficial sob o identificador remoto `20260806162439_eqp_engagement_team_assignment`;
- índice de unicidade, função privada, grant de inserção e política RLS de `INSERT` verificados no banco oficial;
- `authenticated` não recebeu permissões de atualização ou exclusão, `anon` não recebeu execução da função privada e nenhum registro artificial foi criado;
- treze testes direcionados, lint dos arquivos da camada e build local aprovados;
- PR #46 integrado à `main` no merge `2ae6dfb3740576d6fa929651811b83f75cb65e65`;
- homologação visual da Camada 4 aprovada pelo responsável do projeto;
- associação a usuários elegíveis, função e período disponível;
- cadastro administrativo de usuários, funções e períodos não foi incluído e permanece reservado a evolução própria;
- Lovable e Superpowers não utilizados.

As SDDs de painel e planejamento permanecem posteriores e dependem da sequência definida no Plano Mestre.

## 4. Ambiente e referência técnica

- projeto Supabase oficial: `siga-auditoria`;
- referência do projeto: `umuassmgminmliuypoyp`;
- aplicação publicada: `https://siga-audiconsult.lovable.app`;
- branch oficial de referência: `main`;
- merge da integração real de clientes: `e306f028`;
- merge da reconciliação da migration de clientes: `fe9f98e6`;
- migration ACE-001 remota de tabelas: `20260805142219`;
- migration ACE-001 remota de RPC: `20260805143933`;
- migration ACE-001 remota de ACL: `20260805144054`;
- migration EQP-001 Camada 4 remota: `20260806162439`;
- repositório e GitHub permanecem como fontes oficiais de código e documentação.

## 5. Pendências e bloqueios

- não há pendência funcional conhecida na `SDD-CLI-001`;
- não há bloqueio técnico conhecido para a integração real da `SDD-ACE-001`;
- `SDD-TRB-001` foi implementada, publicada e homologada no PR #42;
- não há pendência funcional conhecida na `SDD-TRB-001` dentro do escopo aprovado;
- a Camada 3 está homologada e o PR #44 está integrado na `main`;
- a migration local `20260806124615` possui identificador remoto `20260806130405`, pendência de reconciliação documental;
- não há pendência bloqueante conhecida na `SDD-EQP-001` dentro do escopo homologado;
- `SDD-PNL-001` é a última SDD do Grupo 02 e sua especificação foi aprovada;
- o plano restritivo da `SDD-PNL-001` foi revisado e aprovado;
- nenhuma implementação da PNL-001 foi iniciada.

## 6. Próximo passo exato

Iniciar somente a Etapa 1 da `SDD-PNL-001 — Painel básico do trabalho`: rota protegida e composição de leitura, sem publicação ou avanço para a Etapa 2 antes da revisão técnica.

## 7. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 1.0 | 2026-08-03 | Criação do registro operacional após a conclusão dos Grupos 00 e 01 e abertura do Grupo 02 | Ativo |
| 1.1 | 2026-08-03 | Registro da aprovação da SDD-CLI-001 e definição do plano de implantação como próximo passo | Ativo |
| 1.2 | 2026-08-03 | Registro da aprovação do plano CLI-001 e abertura da etapa de publicação e inspeção técnica | Ativo |
| 1.3 | 2026-08-04 | Encerramento da SDD-CLI-001 após integração real, testes funcionais e reconciliação da migration; definição da SDD-ACE-001 como próximo passo | Ativo |
| 1.4 | 2026-08-05 | Registro da aplicação remota da ACE-001, integração real local e abertura da etapa de homologação | Ativo |
| 1.5 | 2026-08-05 | Registro da conclusão homologada da TRB-001 e preparação da SDD-EQP-001 | Ativo |
| 1.6 | 2026-08-05 | Aprovação da EQP-001 e elaboração do plano restritivo com diretório de usuários somente leitura | Ativo |
| 1.7 | 2026-08-05 | Conclusão da Camada 1 da EQP-001 e registro do bloqueio atual de diretório e entidades físicas | Ativo |
| 1.8 | 2026-08-06 | Conclusão do desenho de segurança e do contrato local simulado da Camada 2; Gate C permanece pendente | Ativo |
| 1.9 | 2026-08-06 | Conclusão técnica do Gate C com RLS, persistência oficial, adaptador real, correção de recursão e validação autenticada; PR pendente | Ativo |
| 2.0 | 2026-08-06 | Implementação da Camada 3 da EQP-001, criação das tabelas de consulta somente leitura e abertura da etapa de homologação | Ativo |
| 2.1 | 2026-08-06 | Homologação da Camada 3 após integração do PR #44 e abertura da preparação da Camada 4 | Ativo |
| 2.2 | 2026-08-06 | Minuta da Camada 4 aprovada e plano restritivo preparado para aprovação | Ativo |
| 2.3 | 2026-08-06 | Plano da Camada 4 aprovado e implementação local controlada iniciada | Ativo |
| 2.4 | 2026-08-06 | Migration da Camada 4 aplicada e verificada no Supabase oficial; publicação e PR pendentes | Ativo |
| 2.5 | 2026-08-06 | Camada 4 homologada, EQP-001 concluída e abertura da especificação da SDD-PNL-001 | Ativo |
| 2.6 | 2026-08-06 | Aprovação da SDD-PNL-001 e definição do plano restritivo como próximo passo | Ativo |
| 2.7 | 2026-08-06 | Elaboração do plano restritivo da PNL-001 em quatro etapas fechadas; implementação ainda não iniciada | Ativo |
| 2.8 | 2026-08-06 | Aprovação do plano restritivo da PNL-001 e autorização da Etapa 1 como próximo passo | Ativo |
