---
id: SIGA-TRB-001-C4
title: TRB-001 — Camada 4 — Edição e Ciclo de Vida
aliases:
  - Edição de Trabalhos
  - Ciclo de Vida dos Trabalhos
  - Camada 4 da TRB-001
type: camada-implementacao
domain: trabalhos
status: minuta
version: 0.1
created: 2026-08-05
updated: 2026-08-05
owner: responsavel-projeto
constitution:
  - Art. 20
  - Art. 21
  - Art. 32
  - Art. 34
  - Art. 35
  - Art. 38
  - Art. 59
  - Art. 60
  - Art. 62
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[SDD-TRB-001]]"
  - "[[TRB-001 — Camada 3 — Criação Controlada do Trabalho]]"
  - "[[Plano de Implantação — SDD-TRB-001 Criação e Gestão do Trabalho]]"
  - "[[Modelo de Domínio do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
tags:
  - siga
  - sdd
  - grupo-02
  - trb-001
  - camada-04
  - edicao
  - ciclo-de-vida
  - historico
---

# TRB-001 — Camada 4 — Edição e Ciclo de Vida

## 1. Finalidade desta minuta

Esta minuta define a próxima camada de implementação da [[SDD-TRB-001]], após a conclusão e publicação da Camada 3 — criação controlada.

Seu objetivo é preparar a edição limitada dos dados permitidos e o controle das transições de estado do trabalho, preservando a identidade, a organização, a avaliação ACE utilizada e o histórico do registro.

Esta minuta não autoriza ainda a implementação, a gravação de dados de homologação ou a publicação de código. Um plano restritivo deverá ser elaborado e aprovado antes da execução.

---

## 2. Estado de origem

A Camada 3 está publicada na `main` por meio do PR #41 e permite criar trabalhos em estado `draft` quando:

- o usuário possui `engagements.manage`;
- o cliente pertence à organização ativa;
- o cliente está ativo;
- existe avaliação ACE aprovada e aplicável;
- os dados passam pela validação do domínio;
- a criação é realizada pelo contrato oficial existente.

A página já consulta trabalhos, permite visualizar o resumo e possui o formulário de criação controlada.

---

## 3. Objetivo da Camada 4

Permitir que usuários autorizados:

1. editem somente os campos autorizados do trabalho;
2. mantenham intactas a organização e a identidade do cliente;
3. ativem um trabalho em elaboração quando possuírem autorização;
4. cancelem um trabalho em elaboração ou ativo com justificativa;
5. encerrem um trabalho ativo com justificativa e permissão específica;
6. consultem a situação e o histórico após cada operação;
7. não excluam fisicamente o trabalho;
8. não reabram trabalhos encerrados ou cancelados nesta camada.

---

## 4. Contratos existentes que deverão ser reutilizados

A implementação deverá utilizar os contratos já existentes, sem criar novos caminhos paralelos:

- `AuditEngagementRepository.update` para edição;
- `AuditEngagementRepository.changeStatus` para transições;
- `updateAuditEngagementSchema` para os campos editáveis;
- `changeAuditEngagementStatusSchema` para estado e justificativa;
- as permissões existentes de trabalhos;
- os RPCs oficiais já protegidos no Supabase.

Não deverá haver `.update`, `.insert` ou `.delete` direto na interface.

---

## 5. Campos editáveis

Os campos permitidos pela operação de edição são:

| Campo | Permitido | Regra |
|---|---|---|
| `title` | Sim | Obrigatório, não vazio, até 200 caracteres |
| `scope` | Sim | Obrigatório, não vazio, até 4.000 caracteres |
| `classification` | Sim, conforme contrato | Nesta SDD permanece `audit` |
| `code` | Não | Identidade permanente do trabalho |
| `clientId` | Não | Cliente não pode ser trocado nesta camada |
| `organizationId` | Não | Isolamento organizacional obrigatório |
| `acceptanceAssessmentId` | Não | Avaliação usada na criação deve ser preservada |
| `status` | Não pelo formulário de edição | Alterado somente por transição autorizada |
| autoria e datas | Não | Controladas pelo contrato oficial |

A interface não deverá oferecer alteração para campos que não constam como editáveis.

---

## 6. Regras de edição por estado

O contrato oficial permite edição enquanto o trabalho estiver em:

- `draft` — em elaboração;
- `active` — ativo.

Trabalhos em `closed` ou `cancelled` não poderão ser editados.

O bloqueio deverá existir tanto na interface quanto no RPC. A interface não deverá tratar sua própria validação como única proteção.

---

## 7. Transições de ciclo de vida

| Estado atual | Estado destino | Permissão | Justificativa | Resultado |
|---|---|---|---|---|
| `draft` | `active` | `engagements.manage` | Não obrigatória pelo contrato atual | Trabalho ativado |
| `draft` | `cancelled` | `engagements.cancel` | Obrigatória | Trabalho cancelado |
| `active` | `closed` | `engagements.close` | Obrigatória | Trabalho encerrado |
| `active` | `cancelled` | `engagements.cancel` | Obrigatória | Trabalho cancelado |
| `closed` | qualquer estado | Nenhuma | Não aplicável | Bloqueado |
| `cancelled` | qualquer estado | Nenhuma | Não aplicável | Bloqueado |

Não será implementada reabertura nesta camada.

---

## 8. Histórico e eventos

Cada mudança de estado deverá preservar:

- estado anterior;
- estado novo;
- justificativa, quando informada;
- usuário responsável;
- data e hora;
- vínculo com o trabalho.

A edição deverá atualizar os metadados de alteração sem apagar o histórico de transições.

O histórico deverá permanecer consultável no resumo ou em uma seção controlada da interface, conforme a lista final de arquivos autorizada no plano.

---

## 9. Permissões

Deverão ser reutilizadas somente as permissões já previstas:

- `engagements.view` — consultar trabalhos;
- `engagements.manage` — criar, editar e ativar;
- `engagements.close` — encerrar trabalhos;
- `engagements.cancel` — cancelar trabalhos.

A ausência de uma permissão deverá ocultar ou desabilitar a ação correspondente e continuar sendo rejeitada pelo RPC.

Não deverão ser criadas permissões novas nesta camada.

---

## 10. Escopo visual previsto

A interface poderá incluir:

- ação `Editar` quando o estado permitir;
- formulário de edição com título, escopo e classificação;
- ação `Ativar` para trabalho em `draft`, quando autorizada;
- ação `Cancelar` para trabalho em `draft` ou `active`, quando autorizada;
- ação `Encerrar` para trabalho `active`, quando autorizada;
- campo de justificativa para cancelamento e encerramento;
- confirmação antes de mudança de estado;
- atualização da lista após sucesso;
- mensagem clara de bloqueio quando a ação não estiver disponível;
- consulta do histórico preservado.

Nenhuma ação deverá aparecer como disponível quando a permissão ou o estado não permitirem sua execução.

---

## 11. Escopo técnico preliminar

A lista exata de arquivos será fechada no plano restritivo. A proposta inicial é limitar a alteração a:

- `src/features/engagements/EngagementForm.tsx` — extensão controlada para modo de edição, se tecnicamente adequado;
- `src/features/engagements/EngagementsPage.tsx` — ações, mutações e atualização da consulta;
- `src/features/engagements/engagementsPresentation.ts` — rótulos, mensagens e estados visuais;
- um componente novo de confirmação de transição, somente se necessário e previamente autorizado.

Não deverão ser alterados:

- `src/domain/`;
- `src/data/`;
- `src/integrations/`;
- `supabase/migrations/`;
- RPCs;
- RLS;
- ACL;
- autenticação;
- rotas;
- navegação;
- dependências;
- variáveis de ambiente;
- outros módulos.

Se a implementação revelar qualquer lacuna nos contratos existentes, deverá parar e registrar a pendência antes de modificar outra camada.

---

## 12. Exclusões expressas

Esta camada não incluirá:

- edição do cliente;
- alteração da organização;
- substituição da avaliação ACE;
- alteração do código do trabalho;
- reabertura de trabalho encerrado ou cancelado;
- exclusão física ou lógica do trabalho;
- criação de equipe;
- criação de período;
- planejamento;
- procedimentos;
- riscos;
- papéis de trabalho;
- portal do cliente;
- revisão metodológica;
- relatório final;
- testes formais do Grupo 07;
- criação de dados reais sem autorização específica.

---

## 13. Critérios de bloqueio

A operação deverá ser bloqueada quando:

- o usuário não tiver a permissão correspondente;
- o trabalho não pertencer à organização atual;
- o estado atual não permitir a operação;
- a justificativa estiver ausente ou exceder o limite;
- os campos editáveis forem inválidos;
- a sessão não estiver autenticada;
- o RPC retornar erro de autorização, validação ou conflito;
- houver tentativa de alterar campos imutáveis;
- o trabalho estiver encerrado ou cancelado.

---

## 14. Critérios de aceitação preliminares

Antes da elaboração do plano, deverão ser confirmados:

1. edição de título funciona em `draft`;
2. edição de escopo funciona em `draft`;
3. edição de título e escopo funciona em `active`, conforme contrato;
4. classificação permanece controlada como `audit`;
5. cliente, organização, código e ACE permanecem imutáveis;
6. trabalho `draft` pode ser ativado com `engagements.manage`;
7. trabalho `draft` pode ser cancelado com `engagements.cancel` e justificativa;
8. trabalho `active` pode ser encerrado com `engagements.close` e justificativa;
9. trabalho `active` pode ser cancelado com `engagements.cancel` e justificativa;
10. trabalhos encerrados ou cancelados não podem ser editados;
11. transições inválidas são bloqueadas;
12. histórico e metadados permanecem preservados;
13. a lista é atualizada após sucesso;
14. o isolamento organizacional continua funcionando;
15. nenhuma exclusão física é oferecida;
16. nenhuma camada posterior é iniciada automaticamente.

---

## 15. Dados de homologação

Esta minuta não autoriza criação de novos dados no Supabase.

Qualquer homologação que altere um trabalho deverá ser autorizada separadamente, com identificação do registro utilizado, operação executada e possibilidade de rastreamento.

Os testes de validação deverão preferencialmente começar por análise local, dados controlados já existentes e testes de contrato, antes de qualquer operação no ambiente oficial.

---

## 16. Regras para ferramentas e agentes

Durante a preparação e implementação:

- o Work deverá orientar a especificação e o escopo;
- a implementação deverá ocorrer localmente e de forma controlada;
- o Lovable não está autorizado a iniciar a Camada 4 nesta minuta;
- nenhum agente poderá alterar arquivos fora da lista aprovada;
- Superpowers não será utilizado nesta etapa;
- a skill de testes formais permanecerá reservada ao Grupo 07;
- o código deverá ser revisado antes de qualquer publicação;
- nenhum merge deverá ocorrer sem aprovação do responsável.

---

## 17. Material para treinamento

### Objetivos de aprendizagem

Ao final, o participante deverá compreender:

- diferença entre edição e mudança de estado;
- por que cliente, organização, código e ACE são preservados;
- quando um trabalho pode ser ativado;
- quando cancelamento e encerramento exigem justificativa;
- por que trabalhos encerrados ou cancelados não são reabertos nesta camada;
- como permissões e histórico protegem o ciclo de vida.

### Estrutura sugerida para apresentação

1. Trabalho em elaboração;
2. edição limitada;
3. ativação;
4. cancelamento;
5. encerramento;
6. permissões;
7. histórico;
8. estados terminais;
9. exemplos de bloqueio;
10. relação com as próximas etapas de planejamento.

---

## 18. Decisão solicitada

Solicita-se a revisão desta minuta para confirmar:

- se a Camada 4 é realmente a próxima etapa desejada;
- se a edição deverá ser permitida em `draft` e `active`, conforme o contrato atual;
- se a classificação continuará fixa como `audit`;
- se a ativação deverá aparecer nesta camada;
- se cancelamento e encerramento deverão ser apresentados em ações separadas;
- se o histórico deverá aparecer já na interface ou apenas permanecer preservado para a camada posterior;
- se a execução será novamente local, sem Lovable e sem Superpowers.

Após a aprovação, será preparado o plano restritivo da Camada 4 com lista fechada de arquivos, sequência, critérios de teste e limites de publicação.

---

## 19. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 0.1 | 2026-08-05 | Criação da minuta da Camada 4 — edição e ciclo de vida | Em revisão |
