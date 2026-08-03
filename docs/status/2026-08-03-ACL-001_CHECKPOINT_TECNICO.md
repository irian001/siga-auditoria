---
id: SIGA-STS-ACL-001-20260803
title: Checkpoint técnico da implantação ACL-001
type: project-status
domain: organizacao-e-acesso
status: concluido
version: 1.0
created: 2026-08-03
updated: 2026-08-03
owner: responsavel-projeto
related:
  - "[[SDD-ACL-001]]"
  - "[[Plano de Implantação da SDD-ACL-001]]"
tags: [siga, acl, supabase, checkpoint, seguranca]
---

# Checkpoint técnico da implantação ACL-001

## Escopo executado

- criação das estruturas `roles`, `permissions`, `role_permissions` e `membership_roles`;
- habilitação de RLS e privilégios mínimos nas quatro estruturas;
- criação de funções auxiliares de RLS no schema privado;
- cadastro das seis permissões iniciais do Grupo 01;
- criação do papel `organization_admin` para a Audiconsult;
- associação das seis permissões ao papel;
- atribuição do papel ao membership ativo de Irian;
- integração local do contexto de autorização ao aplicativo.

## Verificações

| Verificação | Resultado |
|---|---|
| Compilação de produção | Aprovada |
| Lint dos arquivos ACL | Aprovado |
| Políticas RLS | 4 ativas |
| Funções auxiliares privadas | 3 presentes |
| Permissões iniciais | 6 ativas |
| Papéis administrativos | 1 ativo |
| Concessões ao membership | 1 ativa |
| Associação entre organizações diferentes | Nenhuma |
| Concessão a outro usuário | Nenhuma |
| Consulta sob RLS como usuário autenticado | 1 papel e 6 permissões visíveis |
| Permissão `app.access` | Visível e ativa |

## Migrations remotas

- `roles_and_permissions`;
- `acl_membership_role_fk_index`.

## Advisors

O advisor da ACL não apresentou falha de RLS nem chave estrangeira sem índice após a correção.

Permanecem pendências gerais, não criadas pela ACL:

- proteção contra senhas vazadas desativada no Auth;
- estratégia fixa de conexões do Auth;
- índices novos ainda classificados como não utilizados antes do uso operacional.

## Limites

- não foi criado painel completo de manutenção de papéis;
- não foram criadas permissões dos Grupos 02 a 07;
- não foram criadas funções específicas de trabalhos de auditoria;
- o código ainda depende de revisão, merge e publicação para ativar a ACL na aplicação.

## Próximo passo

Revisar o PR técnico, integrar à `main`, confirmar sincronização no Lovable e validar login, contexto organizacional, papel e acesso publicado.
