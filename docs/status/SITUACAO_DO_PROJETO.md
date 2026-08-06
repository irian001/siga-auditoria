---
id: SIGA-STS-001
title: Situação do Projeto SIGA
aliases:
  - Situação do Projeto
  - Estado Atual do SIGA
type: status-projeto
domain: governanca-desenvolvimento
status: ativo
version: 1.9
created: 2026-08-03
updated: 2026-08-06
owner: responsavel-projeto
related:
  - "[[Constituição do SIGA]]"
  - "[[Plano Mestre das SDDs do MVP do SIGA]]"
  - "[[SDD-ACL-001]]"
  - "[[SDD-CLI-001]]"
  - "[[SDD-ACE-001]]"
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

Em execução controlada:

- `SDD-EQP-001` — Equipe, funções e períodos do trabalho;
- plano restritivo da EQP-001 aprovado;
- Camada 1 de reconciliação concluída;
- desenho de segurança da Camada 2 concluído;
- contrato local, repositório simulado e adaptador oficial implementados;
- dez testes locais de autorização, elegibilidade, isolamento e adaptador aprovados;
- RLS oficial aplicada e validada no Supabase;
- migrations remotas `20260806115405` e `20260806115823` aplicadas;
- recursão de RLS identificada e corrigida dentro do mesmo Gate C;
- preservação da separação entre equipe, períodos e painel;
- Gate C tecnicamente concluído, aguardando revisão e merge do PR.

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
- repositório e GitHub permanecem como fontes oficiais de código e documentação.

## 5. Pendências e bloqueios

- não há pendência funcional conhecida na `SDD-CLI-001`;
- não há bloqueio técnico conhecido para a integração real da `SDD-ACE-001`;
- `SDD-TRB-001` foi implementada, publicada e homologada no PR #42;
- não há pendência funcional conhecida na `SDD-TRB-001` dentro do escopo aprovado;
- equipe, funções e períodos ainda não foram implementados e permanecem fora da Camada 2;
- painel continua reservado à `SDD-PNL-001`.

## 6. Próximo passo exato

Revisar o diff do Gate C, abrir o PR e aguardar a aprovação do merge. Após o merge, registrar a conclusão da Camada 2; não há nova subetapa prevista dentro dela.

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
