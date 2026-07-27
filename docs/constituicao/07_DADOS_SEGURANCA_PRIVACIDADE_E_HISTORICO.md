---
id: SIGA-CON-07
title: Dados, Segurança, Privacidade e Histórico do SIGA
aliases:
  - Título VII
  - Segurança e Histórico do SIGA
type: documento-constitucional
domain: dados-seguranca
status: aprovado
version: 1.0
created: 2026-07-26
updated: 2026-07-27
owner: responsavel-projeto
obsidian:
  note_type: constitutional-document
  graph_role: primary
  backlinks_expected: true
  dataview_ready: true
constitution: [Art. 39, Art. 40, Art. 41, Art. 42, Art. 43, Art. 44]
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Públicos e Perfis de Uso do SIGA]]"
  - "[[Arquitetura Tecnológica do SIGA]]"
  - "[[Qualidade, Testes e Validação do SIGA]]"
  - "[[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]]"
tags: [siga, constituicao, dados, seguranca, privacidade, historico, multiempresa]
---

# TÍTULO VII — DADOS, SEGURANÇA, PRIVACIDADE E HISTÓRICO DO SIGA

## Navegação constitucional

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- Anterior: [[Governança do Desenvolvimento do SIGA]]
- Próximo: [[Conhecimento, Treinamento e Produção Educacional do SIGA]]

## Multiempresa e menor privilégio

O SIGA pode ser usado por várias empresas de auditoria. Cada organização, cliente e trabalho devem estar isolados. Registros carregam `organization_id` quando aplicável. Autenticação confirma identidade; autorização verifica organização, função, responsabilidade, estado e confidencialidade. RLS e testes diretos protegem o banco.

## Dados e arquivos

Dados podem ser cadastrais, contábeis, metodológicos, pessoais, confidenciais ou probatórios. A classificação pode ser pública, interna, restrita, confidencial ou cliente específico. Arquivos devem preservar origem, versão, integridade, vínculo, permissões e retenção. Documento recebido é separado de evidência validada.

## Links e acessos temporários

Links temporários devem apontar para arquivo ou versão específica, organização, cliente, trabalho, destinatário, finalidade, permissões e prazo. Não são públicos, não revelam caminhos internos, podem ser revogados e registram criação, utilização, expiração, download quando possível e revogação. A posse do endereço não basta: autorização deve ser verificada.

## Histórico e trilha

O histórico registra eventos individuais: criação, consulta relevante, alteração, mudança de estado, aprovação, envio, recebimento, compartilhamento, download, revogação, substituição, exclusão lógica e acesso excepcional. Registros históricos não devem ser alterados por usuários comuns.

A [[Trilha de Auditoria]] organiza esses eventos cronológica e contextualmente para responder quem, o quê, quando, onde, por quê, estado anterior, estado posterior, aprovação e consequência. O histórico é matéria-prima; a trilha é a reconstrução.

## Privacidade, retenção e continuidade

Dados pessoais devem ser minimizados. Ambientes de desenvolvimento usam dados fictícios, anonimizados ou mascarados. Retenção considera contrato, norma, litígio, investigação e finalidade. Exclusão física exige avaliação; trabalhos encerrados entram em arquivamento controlado. Backups devem ser protegidos e restauração testada.

## Agentes

Agentes recebem somente dados necessários, respeitam organização, cliente e trabalho, não acessam indiscriminadamente, não compartilham conteúdo e não alteram registros críticos sem autorização. A execução registra agente, solicitante, finalidade, fontes, resultado e aprovação.

## Situações proibidas

Mistura de organizações, contas compartilhadas, acesso administrativo irrestrito, proteção apenas na interface, link público permanente, credencial no código, substituição silenciosa de evidência, dados reais sem controle, agente ilimitado e exclusão sem avaliação.

## Material para treinamento

Objetivos: distinguir plataforma, organização e cliente; aplicar menor privilégio; entender links, histórico, trilha, retenção e agentes.

Estudo de caso: suporte técnico recebe acesso temporário somente a um trabalho; o acesso é autorizado, registrado, revogado e não expõe outros clientes.

## Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-07-26 | Minuta inicial | Substituída |
| 0.2 | 2026-07-26 | Ampliação dos itens 19, 24 e 25 sobre links, histórico e trilha | Substituída |
| 1.0 | 2026-07-27 | Normalização e promoção da versão aprovada | Aprovada |
