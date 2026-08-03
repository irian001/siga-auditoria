---
id: SIGA-STS-001
title: Situação do Projeto SIGA
aliases:
  - Situação do Projeto
  - Estado Atual do SIGA
type: status-projeto
domain: governanca-desenvolvimento
status: ativo
version: 1.2
created: 2026-08-03
updated: 2026-08-03
owner: responsavel-projeto
related:
  - "[[Constituição do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-ACL-001]]"
  - "[[SDD-CLI-001]]"
obsidian:
  note_type: project-status
  graph_role: operational-hub
  backlinks_expected: true
  dataview_ready: true
tags: [siga, status, continuidade, mvp, sdd]
---

# Situação do Projeto SIGA

## 1. Estado atual

O Grupo 01 — Organização e acesso está concluído e validado no ambiente publicado.

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

## 3. Etapa em andamento

### Grupo 02 — Clientes e trabalhos

Primeira especificação aprovada:

- `SDD-CLI-001` — Cadastro de clientes, versão 1.0.

Não foi iniciada implementação do Grupo 02.

## 4. Ambiente e referência técnica

- projeto Supabase oficial: `siga-auditoria`;
- referência do projeto: `umuassmgminmliuypoyp`;
- aplicação publicada: `https://siga-audiconsult.lovable.app`;
- branch de documentação atual: `docs/grupo-02-cli-001-minuta`;
- último merge relevante confirmado antes desta atualização: `27bec8c`;
- repositório e GitHub permanecem como fontes oficiais de código e documentação.

## 5. Pendências e bloqueios

- publicar a documentação aprovada da `SDD-CLI-001` e executar a inspeção técnica anterior à migration;
- não há bloqueio funcional conhecido para iniciar a especificação do Grupo 02;
- resíduos locais `src/routeTree.gen.ts` e `supabase/.temp/` não pertencem a esta atualização documental e não deverão ser incluídos em commit.

## 6. Próximo passo exato

Publicar a `SDD-CLI-001` e seu plano de implantação na `main`; depois atualizar e inspecionar a base técnica, apresentando o resultado antes de criar a migration.

## 7. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 1.0 | 2026-08-03 | Criação do registro operacional após a conclusão dos Grupos 00 e 01 e abertura do Grupo 02 | Ativo |
| 1.1 | 2026-08-03 | Registro da aprovação da SDD-CLI-001 e definição do plano de implantação como próximo passo | Ativo |
| 1.2 | 2026-08-03 | Registro da aprovação do plano CLI-001 e abertura da etapa de publicação e inspeção técnica | Ativo |
