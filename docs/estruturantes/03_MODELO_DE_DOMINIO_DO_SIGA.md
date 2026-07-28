---
id: SIGA-DOM-001
title: Modelo de Domínio do SIGA
aliases:
  - Modelo de Domínio
  - Domínio do SIGA
type: documento-estruturante
domain: arquitetura-funcional
status: em-revisao
version: 0.9
created: 2026-07-28
updated: 2026-07-28
owner: responsavel-projeto
audience:
  - auditor
  - gestor
  - cliente
  - desenvolvedor
  - agente-ia
obsidian:
  note_type: domain-model
  graph_role: domain-hub
  backlinks_expected: true
  dataview_ready: true
related:
  - "[[Constituição do SIGA]]"
  - "[[Matriz Mestra da Constituição do SIGA]]"
  - "[[Visão do Produto do SIGA]]"
  - "[[Glossário do SIGA]]"
  - "[[Modelo de Dados do SIGA]]"
sources:
  - "[[Constituição do SIGA]] (v1.0)"
  - "[[Matriz Mestra da Constituição do SIGA]] (v1.2)"
  - "[[Visão do Produto do SIGA]] (v1.0)"
  - "[[Glossário do SIGA]] (v1.0)"
  - "[[Públicos e Perfis de Uso do SIGA]] (v1.0)"
  - "[[Estrutura Funcional do SIGA]] (v1.0)"
  - "[[Regras de Negócio e Metodologia de Auditoria]] (v1.0)"
  - "[[Dados, Segurança, Privacidade e Histórico do SIGA]] (v1.0)"
  - "[[Qualidade, Testes e Validação do SIGA]] (v1.0)"
  - "[[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]] (v1.0)"
  - "[[Roadmap, Evolução e Continuidade do SIGA]] (v1.0)"
tags:
  - siga
  - modelo-de-dominio
  - arquitetura-funcional
  - metodologia
  - rastreabilidade
  - em-revisao
---

# Modelo de Domínio do SIGA

## Navegação

- [[Constituição do SIGA]]
- [[Matriz Mestra da Constituição do SIGA]]
- [[Visão do Produto do SIGA]]
- [[Glossário do SIGA]]
- Futuro: [[Modelo de Dados do SIGA]]

## 1. Finalidade, escopo e limites

Este documento descreve os conceitos que existem no domínio do SIGA, por que existem, como se relacionam e quais pertencem ao núcleo operacional do MVP ou às extensões planejadas. Ele funciona como ponte entre as normas e a visão do produto e o futuro [[Modelo de Dados do SIGA]].

O [[Glossário do SIGA]] é o vocabulário controlado deste modelo. As definições aqui apresentadas desenvolvem relações e limites já aprovados, sem substituir o Glossário nem criar regras de negócio.

O escopo abrange:

- o núcleo organizacional e de acesso;
- o trabalho de auditoria e seu planejamento;
- contabilidade, riscos, controles e procedimentos;
- solicitações, instruções, documentos recebidos, evidências e papéis de trabalho;
- achados, revisão, conclusões e relatório;
- histórico, trilha de auditoria, permissões, versões, estados e anexos;
- extensões planejadas expressamente separadas do MVP;
- conteúdo educacional para leitura e treinamento.

Este modelo não define estrutura de persistência, nomes de campos, tipos de dados, consultas, contratos de integração, interfaces, formulários ou decisões de implementação. Também não determina que todo conceito futuro deva ser entregue no MVP. Em caso de conflito, prevalecem a [[Constituição do SIGA]] e a hierarquia documental vigente.

## 2. Como ler o modelo

Uma **entidade conceitual** representa algo que precisa manter identidade, contexto ou responsabilidade no domínio. Ela não equivale automaticamente a um registro físico isolado.

Cada conceito é descrito, conforme aplicável, por:

- **finalidade:** por que o conceito existe no SIGA;
- **identidade conceitual:** o que o distingue dos demais;
- **relações:** de quais conceitos depende ou quais conceitos conecta;
- **responsabilidades:** quem cria, avalia, executa, revisa, aprova ou administra o conceito;
- **estados:** como sua situação pode evoluir, sem impor enumerações técnicas;
- **limites:** o que o conceito não representa e quais decisões permanecem humanas ou futuras.

As expressões “um”, “vários”, “nenhum, um ou vários” e equivalentes explicam relações em linguagem simples. Elas não especificam chaves, restrições físicas ou desenho de banco.

## 3. Princípios de modelagem

### 3.1 Metodologia antes da tecnologia

O modelo representa o processo de auditoria. Conveniências de implementação não podem fundir conceitos que a metodologia mantém separados nem reduzir o suporte necessário às conclusões.

### 3.2 Rastreabilidade

As relações devem permitir compreender origem, tratamento, responsável e resultado de um assunto relevante, nos sentidos direto e reverso, do planejamento ao relatório.

### 3.3 Julgamento profissional

Sugestões, cálculos, modelos e automações apoiam o auditor. Seleção, adaptação, descarte, avaliação de suficiência, conclusão e comunicação permanecem decisões profissionais fundamentadas.

### 3.4 Documentação suficiente e revisão independente

A existência de um registro não prova, por si só, qualidade ou suficiência. O modelo preserva suporte documental, responsabilidade e segregação entre preparação, execução, supervisão, revisão e aprovação quando exigida.

### 3.5 Evolução controlada

O núcleo do MVP deve permitir um trabalho completo, seguro, rastreável e revisável. Extensões seguem priorização, dependências, documentação, testes e aprovação; sua presença neste modelo não autoriza implantação imediata.

## 4. Mapa resumido do domínio

A cadeia metodológica central é:

```text
Organização Usuária
→ Cliente
→ Trabalho de Auditoria
→ Planejamento
→ Balancete e Mapeamento de Contas
→ Risco e Controle
→ Procedimento e Amostra
→ Solicitação e Instrução
→ Documento Recebido
→ Evidência
→ Papel de Trabalho
→ Achado
→ Revisão
→ Conclusão
→ Relatório
```

O mapa é uma leitura resumida, não uma sequência rígida que elimina retornos, complementações ou revisões. Aceitação, independência, período, escopo, equipe e segmento contextualizam o trabalho conforme as fontes constitucionais. Processos e ciclos ajudam a organizar riscos e controles.

Quatro distinções protegem a leitura do mapa:

1. **Solicitação** define o que deve ser fornecido.
2. **Instrução** orienta como localizar, extrair, filtrar, preparar e enviar o material.
3. **Documento recebido** registra o material entregue.
4. **Evidência** é informação avaliada e incorporada pelo auditor.

Do mesmo modo, a existência formal de um **Papel de Trabalho** não demonstra, sozinha, resposta suficiente ao risco. A suficiência decorre da avaliação do conjunto de riscos, procedimentos, evidências, papéis, achados, revisões e conclusões aplicáveis.

## 5. Fundamentos transversais

Os fundamentos desta seção atravessam todos os domínios. Eles não são módulos opcionais nem podem ser removidos para simplificar o MVP.

### 5.1 Isolamento multiempresa

- **Finalidade:** impedir acesso não autorizado entre empresas de auditoria que utilizam o SIGA.
- **Identidade conceitual:** o [[Isolamento Multiempresa]] separa organizações usuárias e alcança clientes, trabalhos, arquivos, links e automações.
- **Relações:** organização usuária, cliente, trabalho de auditoria, usuário, autorização, anexo, histórico e agentes.
- **Responsabilidades:** administradores mantêm vínculos autorizados; usuários e agentes atuam apenas no contexto necessário; responsáveis humanos aprovam acessos excepcionais.
- **Estados:** vínculos podem estar ativos ou inativos, com preservação do histórico produzido.
- **Limites:** a separação não pode depender apenas da interface. Um usuário que atue em organizações diferentes precisa de vínculos separados, permissões específicas e rastreabilidade.

### 5.2 Permissão, autenticação e autorização

- **Finalidade:** permitir somente o acesso necessário à atuação autorizada.
- **Identidade conceitual:** a permissão expressa um acesso concedido no contexto aplicável; a [[Autenticação]] confirma a identidade; a [[Autorização]] verifica se o acesso pode ocorrer.
- **Relações:** organização usuária, perfil geral, função no trabalho, responsabilidade por item, estado, confidencialidade, segregação e menor privilégio.
- **Responsabilidades:** administradores concedem ou revogam acessos dentro de sua competência; cada operação protegida verifica autorização; acessos excepcionais exigem registro e aprovação aplicável.
- **Estados:** concessão, alteração, expiração, revogação ou inativação devem permanecer compreensíveis no histórico.
- **Limites:** cargo ou perfil geral isolado não determina todo o acesso. A posse de um link também não basta para autorizar o acesso.

### 5.3 Responsabilidade e segregação

- **Finalidade:** identificar quem responde por uma atuação ou item e impedir aprovações incompatíveis.
- **Identidade conceitual:** responsabilidade combina o contexto da organização, a [[Função no Trabalho]] e a [[Responsabilidade por Item]] sem confundi-las com o [[Perfil Geral]].
- **Relações:** usuário, trabalho, risco, procedimento, papel de trabalho, solicitação, achado, relatório, revisão e autorização.
- **Responsabilidades:** preparadores, executores, supervisores, revisores e aprovadores atuam conforme o vínculo registrado.
- **Estados:** atribuições podem mudar durante o trabalho, preservando responsáveis anteriores, motivo, autorização e consequência.
- **Limites:** o acúmulo de funções em equipe pequena não autoriza autorrevisão quando houver exigência de independência. Exceções preservam justificativa, risco, medida compensatória, autorizador e revisão alternativa.

### 5.4 Histórico e trilha de auditoria

#### Histórico

- **Finalidade:** registrar eventos individuais relevantes.
- **Identidade conceitual:** [[Histórico]] é a matéria-prima formada por eventos como criação, consulta relevante, alteração, mudança de estado, aprovação, envio, recebimento, compartilhamento, revogação, substituição, exclusão lógica e acesso excepcional.
- **Relações:** usuário ou agente, item afetado, estado anterior, estado posterior, autorização, versão e contexto.
- **Responsabilidades:** a atuação que produz o evento deve ser identificável; usuários comuns não alteram registros históricos.
- **Estados:** o histórico registra mudanças de estado dos demais conceitos e não substitui esses estados.
- **Limites:** um evento isolado não é a reconstrução contextual completa.

#### Trilha de auditoria

- **Finalidade:** reconstruir cronológica e contextualmente o que ocorreu.
- **Identidade conceitual:** a [[Trilha de Auditoria]] organiza eventos do histórico para responder quem fez o quê, quando, onde, por quê, com qual estado, aprovação e consequência.
- **Relações:** histórico, autorização, versões, trabalho de auditoria e todos os objetos metodológicos rastreáveis.
- **Responsabilidades:** revisores, gestores e responsáveis autorizados usam a trilha para compreender decisões e alterações.
- **Estados:** não possui um ciclo metodológico próprio; reflete eventos e contextos preservados.
- **Limites:** trilha de auditoria não se confunde com evidência de auditoria nem substitui documentação suficiente.

### 5.5 Versão

- **Finalidade:** preservar qual conteúdo ou modelo era aplicável em determinado contexto e momento.
- **Identidade conceitual:** versão identifica uma configuração ou conteúdo reconhecível sem substituir silenciosamente o que já foi utilizado ou enviado.
- **Relações:** base metodológica, modelo, instrução, solicitação, documento recebido, evidência, papel de trabalho, anexo e histórico.
- **Responsabilidades:** autores e responsáveis registram alterações; revisores e aprovadores verificam a versão aplicável.
- **Estados:** uma versão pode estar em elaboração, revisão, aprovação ou substituição conforme o ciclo conceitual aplicável, sem apagar versões anteriores.
- **Limites:** atualização de modelo não altera silenciosamente trabalhos já iniciados; a versão efetivamente enviada de solicitação ou instrução deve ser preservada.

### 5.6 Estado

- **Finalidade:** expressar a situação conceitual de um item ao longo de seu ciclo de vida.
- **Identidade conceitual:** estado é contexto para execução, autorização, revisão, aprovação, reabertura, encerramento, cancelamento ou inativação quando aplicável.
- **Relações:** item, responsável, permissão, histórico, versão, revisão e aprovação.
- **Responsabilidades:** mudanças relevantes identificam atuação, momento, motivo e aprovação quando exigida.
- **Estados:** cada entidade utiliza apenas os estados adequados ao seu ciclo; este modelo não impõe uma lista técnica comum.
- **Limites:** mudança de estado não prova suficiência metodológica nem pode apagar conteúdo, decisões ou histórico anteriores.

### 5.7 Anexo

- **Finalidade:** associar arquivo ou material a um conceito do domínio.
- **Identidade conceitual:** anexo é o vínculo controlado com um arquivo ou versão de arquivo, preservando origem, integridade, permissões, classificação e retenção quando aplicáveis.
- **Relações:** solicitação, instrução, documento recebido, evidência, papel de trabalho, achado, relatório, versão, autorização e histórico.
- **Responsabilidades:** quem inclui, substitui, compartilha, revoga ou consulta de forma relevante deve ser identificável conforme o contexto.
- **Estados:** disponibilidade, substituição, revogação, inativação ou retenção seguem o ciclo do material e o histórico aplicável.
- **Limites:** anexar um arquivo não o transforma automaticamente em documento recebido, evidência ou papel de trabalho. Links temporários precisam continuar específicos, autorizados, revogáveis e limitados por finalidade e prazo.

### 5.8 Segurança e privacidade

Segurança, integridade, confidencialidade, menor privilégio, minimização de dados pessoais, retenção e continuidade condicionam todos os conceitos. Dados, arquivos e automações devem respeitar organização, cliente, trabalho, usuário, finalidade e classificação aplicáveis. Exclusão física exige avaliação; inativação, cancelamento ou exclusão lógica preservam histórico quando adequado.

## 6. Núcleo organizacional e de acesso

### 6.1 Organização usuária

- **Finalidade:** representar a empresa de auditoria que usa o SIGA para conduzir seus trabalhos.
- **Identidade conceitual:** a [[Organização Usuária]] é distinta do cliente auditado e delimita o contexto multiempresa.
- **Relações:** reúne usuários, clientes e trabalhos de auditoria; relaciona-se a isolamento multiempresa, autorização e histórico.
- **Responsabilidades:** administra seus vínculos, usuários e acessos conforme as permissões; preserva responsáveis e segregações aplicáveis.
- **Estados:** pode estar ativa ou inativa, sem eliminar o histórico dos trabalhos e vínculos produzidos.
- **Limites:** não representa o cliente nem autoriza acesso aos dados de outra organização.

### 6.2 Usuário

- **Finalidade:** representar a pessoa identificada que atua no SIGA.
- **Identidade conceitual:** o usuário mantém identidade própria e pode receber vínculos distintos com organizações e trabalhos.
- **Relações:** organização usuária, perfil geral, função no trabalho, responsabilidade por item, autenticação, autorização, histórico e trilha de auditoria.
- **Responsabilidades:** atua de acordo com seus vínculos e responde pelas ações registradas em seu contexto.
- **Estados:** ativo ou inativo conforme aplicável; a inativação preserva sua ligação com o histórico produzido.
- **Limites:** usuário não se confunde com perfil, função ou responsabilidade. Contas compartilhadas não são admitidas pelas fontes.

### 6.3 Perfil geral

- **Finalidade:** representar a posição do usuário na organização usuária.
- **Identidade conceitual:** o [[Perfil Geral]] é a dimensão organizacional do acesso.
- **Relações:** usuário, organização usuária, função no trabalho, responsabilidade por item e autorização.
- **Responsabilidades:** compõe a avaliação de acesso e não substitui os vínculos específicos de cada trabalho ou item.
- **Estados:** a atribuição pode estar vigente ou inativa, com histórico quando alterada.
- **Limites:** perfil geral não basta, isoladamente, para autorizar atuação, revisão ou aprovação.

### 6.4 Função no trabalho

- **Finalidade:** representar o papel exercido por uma pessoa em um trabalho específico.
- **Identidade conceitual:** a [[Função no Trabalho]] contextualiza a atuação no trabalho e é distinta do perfil geral.
- **Relações:** usuário, trabalho de auditoria, perfil geral, responsabilidade por item, revisão, segregação e autorização.
- **Responsabilidades:** delimita atuações como preparação, execução, supervisão ou revisão conforme o contexto aprovado.
- **Estados:** o vínculo pode vigorar, ser alterado ou encerrado durante o trabalho, preservando histórico.
- **Limites:** uma função não autoriza autorrevisão nem elimina controles de independência.

### 6.5 Responsabilidade por item

- **Finalidade:** atribuir responsabilidade sobre um item específico do trabalho.
- **Identidade conceitual:** a [[Responsabilidade por Item]] é mais granular que perfil geral e função no trabalho.
- **Relações:** risco, procedimento, papel de trabalho, solicitação, achado, relatório, usuário e autorização.
- **Responsabilidades:** identifica quem prepara, executa, acompanha, revisa ou aprova o item conforme aplicável.
- **Estados:** pode ser atribuída, transferida ou encerrada, preservando responsáveis anteriores e a justificativa aplicável.
- **Limites:** responsabilidade não equivale automaticamente a permissão irrestrita nem a aprovação independente.

### 6.6 Cliente

- **Finalidade:** representar a entidade auditada ou atendida no contexto de um trabalho.
- **Identidade conceitual:** o [[Cliente]] é distinto da organização usuária.
- **Relações:** pertence ao contexto de uma organização usuária e pode possuir vários trabalhos de auditoria; relaciona-se a solicitações, documentos recebidos, pendências e comunicações autorizadas.
- **Responsabilidades:** pessoas autorizadas do cliente podem responder solicitações, enviar documentos, indicar responsáveis e acompanhar os itens permitidos.
- **Estados:** pode estar ativo ou inativo no relacionamento, preservando trabalhos e histórico.
- **Limites:** o cliente não acessa automaticamente estratégia, materialidade, riscos internos, amostras não comunicadas, notas de revisão, julgamentos profissionais ou dados de outros clientes.

## 7. Trabalho e planejamento

### 7.1 Trabalho de auditoria

- **Finalidade:** organizar uma execução individual de auditoria do início ao fim.
- **Identidade conceitual:** o [[Trabalho de Auditoria]] possui contexto, período, escopo, equipe, responsabilidades e vínculos metodológicos próprios.
- **Relações:** organização usuária, cliente, planejamento, balancete, contas, riscos, controles, procedimentos, amostras, solicitações, instruções, documentos recebidos, evidências, papéis de trabalho, achados, revisão, conclusões e relatório.
- **Responsabilidades:** a equipe prepara, executa, supervisiona, revisa e aprova itens conforme funções e responsabilidades; o auditor mantém o julgamento profissional.
- **Estados:** pode passar por elaboração, execução, revisão, aprovação, reabertura, encerramento ou cancelamento quando aplicável, sempre com histórico.
- **Limites:** não se confunde com a base metodológica reutilizável. Sugestões e modelos só se tornam decisões efetivas quando selecionados, adaptados ou descartados pelo auditor com a fundamentação aplicável.

### 7.2 Planejamento

- **Finalidade:** definir a estratégia e organizar como o trabalho tratará contas, processos, riscos, materialidade e extensão.
- **Identidade conceitual:** planejamento é o contexto documentado que liga entendimento, escopo e decisões às respostas de auditoria.
- **Relações:** trabalho de auditoria, balancete, contas, processos, riscos, controles, procedimentos, amostras, equipe e conclusões.
- **Responsabilidades:** o auditor elabora e fundamenta; supervisores e revisores avaliam conforme sua função; sugestões não substituem decisão profissional.
- **Estados:** pode estar em elaboração, execução, revisão, aprovação ou reabertura conforme o ciclo do trabalho.
- **Limites:** planejamento não é uma lista administrativa isolada nem elimina aceitação, independência, período, escopo, equipe e segmento quando aplicáveis.

### 7.3 Balancete

- **Finalidade:** trazer ao trabalho a informação contábil usada no planejamento e no mapeamento de contas.
- **Identidade conceitual:** balancete é o conjunto recebido ou importado para determinado contexto e período, com origem preservada.
- **Relações:** cliente, trabalho de auditoria, período, conta, mapeamento, plano referencial, planejamento, risco e procedimento.
- **Responsabilidades:** a origem é registrada; formato, período, duplicidades e consistência são validados; o auditor revisa o uso das informações.
- **Estados:** recepção, validação, necessidade de correção ou aceitação para uso podem ser registradas sem apagar versões anteriores.
- **Limites:** importação ou validação formal não transforma automaticamente a informação em evidência suficiente nem substitui a revisão do auditor.

### 7.4 Conta e mapeamento de contas

- **Finalidade:** relacionar contas do cliente ao contexto contábil e metodológico utilizado no trabalho.
- **Identidade conceitual:** conta representa um elemento do balancete; o mapeamento registra sua relação com o plano referencial aplicável.
- **Relações:** balancete, plano referencial, grupo de contas, planejamento, risco, procedimento, amostra, papel de trabalho e conclusão.
- **Responsabilidades:** o auditor valida, altera ou justifica mapeamentos manuais, sugeridos ou derivados de modelo anterior.
- **Estados:** o mapeamento pode estar proposto, validado, alterado ou substituído conforme revisão e histórico aplicáveis.
- **Limites:** sugestão de mapeamento não constitui decisão definitiva e não pode alterar silenciosamente trabalhos ou versões anteriores.

## 8. Contabilidade, riscos e procedimentos

### 8.1 Risco

- **Finalidade:** registrar um assunto identificado e avaliado que requer tratamento no trabalho.
- **Identidade conceitual:** o [[Risco]] referencial é modelo; o risco do trabalho é decisão efetiva do auditor.
- **Relações:** planejamento, processo, conta, controle, procedimento, amostra, evidência, papel de trabalho, achado e conclusão.
- **Responsabilidades:** o auditor seleciona, adapta ou descarta sugestões com justificativa e avalia a suficiência da resposta; revisão e supervisão verificam essa avaliação.
- **Estados:** não avaliado, planejado, parcialmente respondido, respondido, não respondido, insuficiente ou requer trabalho adicional, conforme as fontes.
- **Limites:** risco não é resolvido pela mera existência de um procedimento ou papel; sua resposta considera o conjunto relacionado.

### 8.2 Controle

- **Finalidade:** representar elemento existente no processo considerado na avaliação e no tratamento de riscos.
- **Identidade conceitual:** o [[Controle]] pertence ao contexto do processo examinado e não é uma conclusão automática sobre o risco.
- **Relações:** processo, risco, procedimento e evidência.
- **Responsabilidades:** o auditor compreende, avalia e documenta o controle conforme o trabalho.
- **Estados:** sua avaliação pode evoluir durante planejamento, execução, revisão ou trabalho adicional, preservando alterações relevantes.
- **Limites:** registrar um controle não prova seu desenho, operação ou suficiência e não substitui julgamento profissional.

### 8.3 Procedimento

- **Finalidade:** tratar risco e obter suporte para a conclusão de auditoria.
- **Identidade conceitual:** o [[Procedimento]] é uma ação planejada ou executada.
- **Relações:** um risco pode ter vários procedimentos; um procedimento pode responder a mais de um risco quando a relação estiver documentada. Também se relaciona a controle, amostra, solicitação, documento recebido, evidência e papel de trabalho.
- **Responsabilidades:** o auditor planeja, executa, documenta resultado e avalia cobertura; supervisores e revisores verificam a resposta.
- **Estados:** planejado e executado são distinções necessárias; resultados podem indicar resposta parcial, insuficiência ou necessidade de trabalho adicional.
- **Limites:** procedimento planejado não equivale a procedimento executado, e execução formal não prova resposta suficiente.

### 8.4 Amostra

- **Finalidade:** selecionar itens de uma população para atender ao objetivo de um procedimento.
- **Identidade conceitual:** a [[Amostra]] registra objetivo, população, fonte, método, tamanho, seleção, exceções e conclusão.
- **Relações:** procedimento, risco, população, conta e evidência.
- **Responsabilidades:** o auditor valida, altera e justifica a seleção e sua adequação ao objetivo.
- **Estados:** planejamento, seleção, execução, avaliação e conclusão podem ser distinguidos conforme o procedimento.
- **Limites:** o SIGA não aplica percentual único indistintamente. Sugestões de seleção não substituem decisão nem justificativa do auditor.

### 8.5 Solicitação

- **Finalidade:** formalizar o que deve ser fornecido.
- **Identidade conceitual:** a [[Solicitação]] define, quando aplicável, período, formato, prazo e responsáveis.
- **Relações:** procedimento, cliente, responsável, instrução, documento recebido, versão, anexo e histórico.
- **Responsabilidades:** a equipe de auditoria prepara e envia; o destinatário autorizado responde; responsáveis acompanham prazo e pendência.
- **Estados:** elaboração, envio, atendimento, pendência, cancelamento ou encerramento podem ser expressos conforme o ciclo aprovado do item.
- **Limites:** solicitação não explica necessariamente como obter o material, não é o material entregue e não é evidência.

### 8.6 Instrução

- **Finalidade:** orientar como localizar, extrair, filtrar, preparar e enviar um material.
- **Identidade conceitual:** a [[Instrução]] é orientação vinculável à solicitação; uma solicitação pode possuir nenhuma, uma ou várias instruções.
- **Relações:** solicitação, versão, anexo, documento recebido e evidência.
- **Responsabilidades:** a equipe de auditoria seleciona ou prepara a orientação aplicável e preserva a versão efetivamente enviada; o destinatário a utiliza para preparar o material.
- **Estados:** elaboração, revisão, envio, substituição ou inativação podem ocorrer sem alterar retroativamente a versão enviada.
- **Limites:** instrução não é solicitação, documento recebido ou evidência.

## 9. Documentos, evidências e papéis de trabalho

### 9.1 Documento recebido

- **Finalidade:** registrar o material entregue pelo cliente em resposta a uma solicitação.
- **Identidade conceitual:** o [[Documento Recebido]] preserva o material fornecido, sua origem, versão e vínculos aplicáveis antes da avaliação do auditor.
- **Relações:** cliente, solicitação, instrução, anexo, versão, histórico e evidência.
- **Responsabilidades:** o remetente e o recebimento devem ser identificáveis; o auditor avalia o material antes de incorporá-lo como evidência.
- **Estados:** recebimento, substituição, avaliação, revogação ou retenção podem ser registrados conforme o contexto, preservando versões e histórico.
- **Limites:** documento recebido não é, por si só, evidência validada. Substituição silenciosa é proibida pelas fontes.

### 9.2 Evidência

- **Finalidade:** dar suporte a papéis de trabalho, achados, conclusões e relatório.
- **Identidade conceitual:** a [[Evidência]] é informação avaliada e incorporada pelo auditor quanto a origem, período, integridade, completude, relevância, confiabilidade, suficiência e adequação.
- **Relações:** pode resultar da avaliação de documento recebido ou da execução aplicável; relaciona-se a risco, controle, procedimento, amostra, papel de trabalho, achado, conclusão e relatório.
- **Responsabilidades:** o auditor realiza e documenta a avaliação; supervisão e revisão verificam o suporte no contexto das conclusões.
- **Estados:** avaliação, incorporação, complementação, revisão ou substituição controlada podem ocorrer, sempre com contexto e histórico.
- **Limites:** instrução e documento recebido não são evidência. A classificação como evidência não prova, isoladamente, suficiência para toda conclusão.

### 9.3 Papel de trabalho

- **Finalidade:** documentar a resposta aos riscos e tornar o trabalho compreensível e revisável.
- **Identidade conceitual:** o [[Papel de Trabalho]] vincula, conforme aplicável, conta, grupo, processo, ciclo, risco, procedimento, afirmação e evidência.
- **Relações:** risco, procedimento, amostra, evidência, achado, revisão e conclusão.
- **Responsabilidades:** o preparador documenta; o executor registra resultados; supervisores e revisores avaliam conforme segregação; aprovações permanecem identificáveis.
- **Estados:** elaboração, execução, revisão, aprovação, reabertura ou encerramento podem ser aplicados ao ciclo do papel.
- **Limites:** um papel pode responder integralmente, parcialmente, de forma complementar ou insuficiente. Sua existência formal não prova resposta suficiente ao risco.

## 10. Achados, revisão, conclusões e relatório

### 10.1 Achado

- **Finalidade:** registrar e acompanhar uma situação examinada relevante para o trabalho.
- **Identidade conceitual:** o [[Achado]] reúne condição, critério, causa, efeito, risco, evidência, recomendação, resposta e conclusão quando aplicáveis.
- **Relações:** risco, evidência, papel de trabalho, cliente quando comunicado, revisão, conclusão e relatório.
- **Responsabilidades:** o auditor prepara e fundamenta; revisores avaliam; o cliente responde apenas quando autorizado; responsáveis aprovam a comunicação aplicável.
- **Estados:** elaboração, revisão, comunicação, resposta, conclusão, reabertura ou encerramento podem ocorrer conforme o caso.
- **Limites:** nem todos os componentes são obrigatórios em toda situação; o achado não pode existir no relatório sem suporte rastreável.

### 10.2 Revisão

- **Finalidade:** avaliar execução, documentação, suporte, responsabilidade e condições para aprovação.
- **Identidade conceitual:** revisão é a atuação contextual sobre um item, área ou trabalho, preservando independência quando exigida.
- **Relações:** usuário, função no trabalho, responsabilidade por item, procedimento, evidência, papel de trabalho, achado, conclusão, relatório, histórico e autorização.
- **Responsabilidades:** o revisor registra avaliação e pendências; o preparador ou responsável trata os pontos; aprovações respeitam segregação.
- **Estados:** pendência, tratamento, nova revisão, aprovação ou reabertura podem integrar o ciclo do item revisado.
- **Limites:** autorrevisão e aprovação pelo próprio preparador não atendem à revisão independente quando ela for exigida. Revisão não substitui a responsabilidade técnica final.

### 10.3 Conclusão

- **Finalidade:** registrar o resultado profissional do auditor sobre um assunto.
- **Identidade conceitual:** a [[Conclusão]] é sustentada por documentação suficiente, apropriada, compreensível e revisável.
- **Relações:** planejamento, riscos, procedimentos, evidências, papéis de trabalho, achados, revisões e relatório.
- **Responsabilidades:** o auditor formula e fundamenta; supervisão e revisão avaliam; a aprovação segue responsabilidades e segregação aplicáveis.
- **Estados:** elaboração, revisão, aprovação, reabertura ou encerramento podem ocorrer com histórico.
- **Limites:** o sistema não emite conclusão ou opinião automaticamente. Ausência de suporte suficiente impede tratar a conclusão como base adequada para o relatório.

### 10.4 Relatório

- **Finalidade:** comunicar os resultados do trabalho.
- **Identidade conceitual:** o [[Relatório]] utiliza somente conclusões, achados, papéis, evidências, revisões e aprovações com suporte.
- **Relações:** trabalho de auditoria, conclusão, achado, evidência, revisão, aprovação, versão, anexo, histórico e trilha de auditoria.
- **Responsabilidades:** responsáveis técnicos e demais aprovadores autorizados respondem pela comunicação; agentes e automações não aprovam nem emitem opinião isoladamente.
- **Estados:** elaboração, revisão, aprovação, emissão, reabertura, substituição ou encerramento podem ser registrados conforme o ciclo aplicável.
- **Limites:** apresentação ou geração automática não substitui suporte, revisão e aprovação humana. Deve ser possível retornar do relatório aos elementos metodológicos que sustentam seu conteúdo.

## 11. Extensões planejadas

As extensões abaixo permanecem registradas porque integram a evolução aprovada do SIGA. Nenhuma relação futura descrita nesta seção transforma automaticamente a extensão em escopo do MVP.

### 11.1 Portal do cliente

Amplia a colaboração autorizada para solicitações, envio de documentos, prazos, mensagens, achados comunicados, recomendações e planos de ação. Permanece limitado pelo menor privilégio e não expõe conteúdo interno ou reservado da auditoria. O MVP pode simplificar o portal sem simplificar a separação entre solicitação, instrução, documento recebido e evidência.

### 11.2 Planos de ação

Relacionam respostas e ações autorizadas a achados e recomendações comunicados, com responsáveis e prazos conforme futura especificação. Sua presença na cadeia funcional constitucional não antecipa regras detalhadas nem implantação no núcleo inicial.

### 11.3 Qualidade

Programas de qualidade podem acompanhar trabalhos, revisões e critérios aplicáveis. A extensão funcional é futura, mas qualidade, segregação, revisão, testes e suporte suficiente já são fundamentos obrigatórios do MVP.

### 11.4 Auditoria dos pares

Permite atuação futura de auditores dos pares em escopo autorizado, com independência, confidencialidade, menor privilégio, histórico e trilha de auditoria. Não concede acesso geral aos dados da organização ou dos clientes.

### 11.5 Gestão comercial

Pode abranger organização comercial, propostas e contratos antes do trabalho. Não altera a distinção entre organização usuária e cliente nem antecipa regras comerciais ainda não especificadas.

### 11.6 Indicadores e painéis

Podem apresentar informações derivadas de trabalhos e qualidade conforme futuras definições. Não substituem registros de origem, julgamento profissional, revisão nem rastreabilidade.

### 11.7 Integrações

Podem trocar informações com fontes e serviços selecionados após definição de finalidade, autorização, segurança, versões, histórico e testes. A existência de um vínculo conceitual não define contrato técnico nem autoriza integração indiscriminada.

### 11.8 Agentes integrados ao produto

Podem apoiar consulta, proposta, execução controlada ou automação operacional limitada de baixo risco. Devem respeitar organização, cliente, trabalho, usuário, finalidade, fontes, permissões e aprovação humana. Agentes não inventam regras, ampliam escopo, acessam conteúdo indiscriminadamente nem aprovam isoladamente metodologia, papéis, relatórios ou conteúdo confidencial.

## 12. Relações e cardinalidades em linguagem simples

- Uma organização usuária pode reunir vários usuários, clientes e trabalhos, sempre isolados de outras organizações.
- Um usuário pode possuir vínculos separados com organizações diferentes; cada vínculo mantém permissões e rastreabilidade próprias.
- Um perfil geral pode contextualizar vários vínculos do usuário, mas a função no trabalho e a responsabilidade por item completam a autorização.
- Um cliente pode possuir vários trabalhos de auditoria.
- Um trabalho possui equipe, planejamento e os elementos metodológicos aplicáveis ao seu escopo.
- Um balancete reúne contas do contexto recebido; contas podem ser relacionadas ao plano referencial por mapeamentos revisáveis.
- Um risco pode possuir vários procedimentos. Um procedimento pode responder a mais de um risco quando a relação estiver documentada.
- Um procedimento pode possuir nenhuma, uma ou várias amostras, conforme seu objetivo.
- Um procedimento pode gerar várias solicitações.
- Uma solicitação pode possuir nenhuma, uma ou várias instruções.
- Uma solicitação pode receber um ou vários documentos ao longo de seu atendimento, com versões e histórico preservados.
- Um documento recebido pode originar uma ou mais evidências após avaliação; nem todo documento recebido precisa ser incorporado como evidência.
- Uma evidência pode sustentar vários papéis de trabalho; um papel pode reunir várias evidências conforme sua finalidade.
- Um risco pode ser respondido por um ou vários procedimentos, papéis, evidências e controles combinados.
- Um achado pode reunir suporte de vários papéis e evidências e relacionar-se às conclusões e comunicações aplicáveis.
- Uma conclusão pode consolidar vários elementos do trabalho; o relatório pode comunicar várias conclusões e achados com suporte.
- Cada conceito pode produzir vários eventos de histórico; a trilha de auditoria organiza esses eventos no contexto reconstruído.

Essas relações expressam possibilidades metodológicas aprovadas. O futuro [[Modelo de Dados do SIGA]] deverá detalhar a representação física sem alterar silenciosamente estes significados.

## 13. Estados e ciclos de vida

Estados são conceituais e dependem da entidade. Termos como rascunho, em execução, em revisão, aprovado, reaberto, encerrado, cancelado ou inativo podem ser usados quando forem adequados ao ciclo, sem impor uma enumeração única a todos os conceitos.

Os ciclos preservam:

- responsável pela ação;
- estado anterior e posterior;
- momento e contexto;
- justificativa quando aplicável;
- aprovação e segregação exigidas;
- versão afetada;
- consequências e pendências;
- histórico e possibilidade de reconstrução.

Para riscos, as fontes reconhecem situações de não avaliado, planejado, parcialmente respondido, respondido, não respondido, insuficiente ou requer trabalho adicional. Para procedimentos, a distinção entre planejado e executado deve permanecer explícita. Para conteúdo aprovado, alterações posteriores não podem ocorrer silenciosamente; reabertura, nova revisão ou nova versão preservam o que existia.

Cancelamento, inativação e exclusão lógica não apagam o histórico. Encerramento não elimina pendências ou insuficiências sem tratamento documentado.

## 14. Rastreabilidade do domínio

A rastreabilidade deve permitir percursos diretos e reversos.

Percurso direto de referência:

```text
Planejamento
→ Conta, Processo e Risco
→ Controle e Procedimento
→ Amostra, Solicitação e Instrução
→ Documento Recebido e Evidência
→ Papel de Trabalho
→ Achado e Revisão
→ Conclusão
→ Relatório
```

Percurso reverso esperado:

```text
Relatório
→ Conclusão e Achado
→ Papel de Trabalho e Evidência
→ Documento Recebido, Solicitação e Instrução aplicáveis
→ Amostra e Procedimento
→ Risco, Controle, Processo e Conta
→ Planejamento e Trabalho de Auditoria
```

Os vínculos precisam mostrar a origem e o contexto sem sugerir suficiência automática. Um relatório retorna ao suporte que fundamenta seu conteúdo; uma evidência retorna à sua origem e avaliação; um documento recebido retorna à solicitação e à instrução aplicáveis; uma decisão retorna ao responsável, estado, versão, justificativa e aprovação quando exigidos.

## 15. Separação entre MVP e futuro

### 15.1 Núcleo do MVP

O núcleo valida um trabalho de auditoria do início ao fim e inclui, de forma progressiva, organização usuária, usuários, cliente, segmento, aceitação e continuidade, trabalho, planejamento, base metodológica, processos, balancete, mapeamento de contas, riscos, controles, procedimentos, amostras, solicitações, instruções, documentos recebidos, evidências, papéis de trabalho, achados, revisão, conclusões e relatório. Segmento, aceitação e continuidade, base metodológica e processos são mantidos como contextos e referências conceituais alinhados à Estrutura Funcional constitucional, sem acrescentar regras novas.

Mesmo quando a apresentação ou automação for simplificada, o núcleo preserva:

- isolamento multiempresa;
- segurança e menor privilégio;
- responsáveis e segregação crítica;
- rastreabilidade e vínculos metodológicos;
- histórico, trilha de auditoria e versões;
- distinção entre solicitação, instrução, documento recebido e evidência;
- documentação e suporte às conclusões;
- revisão e aprovação aplicáveis.

### 15.2 Futuro planejado

Portal completo do cliente, planos de ação, funções ampliadas de qualidade, auditoria dos pares, gestão comercial, indicadores, integrações e agentes integrados evoluem conforme roadmap, dependências, riscos, testes, documentação e aprovação.

Registrar uma extensão, ligação ou nota futura mantém continuidade documental. Isso não equivale a especificação aprovada, compromisso de data ou autorização de implementação.

## 16. Obsidian e próximos documentos

Este arquivo funciona como hub conceitual. Os `[[wikilinks]]` conectam fontes existentes e conceitos que poderão receber notas próprias. Links futuros são intencionais e não substituem a definição canônica mantida neste documento e no [[Glossário do SIGA]].

Notas futuras de referência incluem:

- [[Modelo de Dados do SIGA]];
- [[Metodologia de Auditoria]];
- [[Regras de Negócio]];
- [[Matriz de Rastreabilidade do SIGA]];
- [[Roadmap do MVP]];
- notas próprias dos conceitos do domínio quando aprovadas.

Um Canvas poderá representar visualmente o mapa, mas será recurso auxiliar. Markdown, YAML, histórico no GitHub e fontes aprovadas permanecem legíveis e oficiais independentemente do Obsidian.

## 17. Material para treinamento

### 17.1 Público

Auditores, assistentes, revisores, gestores, responsáveis técnicos, administradores, clientes nos limites do conteúdo autorizado, desenvolvedores e agentes de IA.

### 17.2 Nível

Introdutório a intermediário, com foco na compreensão conceitual antes do detalhamento operacional ou técnico.

### 17.3 Pré-requisitos

- leitura da [[Constituição do SIGA]];
- leitura da [[Visão do Produto do SIGA]];
- consulta ao [[Glossário do SIGA]];
- familiaridade básica com o ciclo de um trabalho de auditoria;
- compreensão básica de `[[wikilinks]]` e documentação versionada.

### 17.4 Objetivos de aprendizagem

- Explicar o mapa do domínio do SIGA do contexto organizacional ao relatório.
- Distinguir organização usuária, cliente e trabalho de auditoria.
- Distinguir perfil geral, função no trabalho e responsabilidade por item.
- Diferenciar solicitação, instrução, documento recebido, evidência e papel de trabalho.
- Relacionar risco, controle, procedimento, amostra, evidência, papel, achado, conclusão e relatório.
- Reconhecer histórico, trilha de auditoria, versão, estado, anexo e segurança como fundamentos transversais.
- Separar núcleo do MVP de extensões planejadas.

### 17.5 Conceitos-chave

- A organização usuária é a empresa de auditoria; o cliente é a entidade auditada ou atendida.
- O trabalho de auditoria reúne decisões efetivas e não se confunde com modelos referenciais reutilizáveis.
- Risco referencial é modelo; risco do trabalho é decisão do auditor.
- Procedimentos, evidências e papéis respondem conjuntamente aos riscos conforme sua suficiência.
- Documento recebido somente se torna evidência após avaliação do auditor.
- Histórico registra eventos; trilha de auditoria os organiza em contexto.
- Agentes e automações apoiam o trabalho sem substituir julgamento, revisão ou aprovação humana.

### 17.6 Roteiro sugerido

1. Apresente a finalidade do modelo e seus limites conceituais.
2. Percorra o mapa da organização usuária ao relatório.
3. Explique as três dimensões de acesso e a segregação.
4. Aprofunde a relação entre planejamento, contas, riscos, controles e procedimentos.
5. Demonstre a separação entre solicitação, instrução, documento recebido e evidência.
6. Mostre por que um papel de trabalho formal pode ser insuficiente.
7. Faça o percurso reverso do relatório até o planejamento.
8. Separe o que pertence ao MVP das extensões planejadas.
9. Encerre com estados, versões, histórico, trilha, segurança e limites de automação.

### 17.7 Exemplo orientador

Uma organização usuária inicia um trabalho para um cliente. O planejamento utiliza um balancete validado e o mapeamento de contas para identificar um risco. O auditor relaciona controle, procedimento e amostra ao risco. O procedimento gera uma solicitação acompanhada da instrução aplicável. O cliente envia um documento recebido. O auditor avalia origem, período, integridade, completude, relevância, confiabilidade, suficiência e adequação antes de incorporar informação como evidência. A evidência sustenta um papel de trabalho, que passa por revisão. Um achado apoiado pelo conjunto contribui para a conclusão e, após revisão e aprovação, para o relatório.

### 17.8 Erros comuns

- Tratar organização usuária e cliente como o mesmo conceito.
- Autorizar acesso apenas pelo perfil geral.
- Confundir solicitação com instrução.
- Tratar todo arquivo anexado ou documento recebido como evidência.
- Considerar a existência de um papel de trabalho como prova de resposta suficiente ao risco.
- Permitir que atualização de modelo altere silenciosamente um trabalho iniciado.
- Confundir histórico com trilha de auditoria.
- Interpretar uma extensão planejada como escopo automático do MVP.
- Permitir que automação conclua, revise ou aprove matéria reservada ao responsável humano.

### 17.9 Boas práticas

- Usar os nomes canônicos do Glossário.
- Registrar relações de origem, tratamento, responsável e resultado.
- Preservar a versão efetivamente utilizada ou enviada.
- Avaliar suficiência no conjunto, e não pela presença isolada de registros.
- Aplicar menor privilégio em dados, arquivos, links e automações.
- Testar percursos diretos e reversos de rastreabilidade.
- Preservar segregação, justificativas, aprovações e histórico.
- Registrar futuras extensões sem introduzi-las prematuramente no núcleo.

### 17.10 Estudo de caso

Em um trabalho sobre uma cooperativa, uma conta de estoques é mapeada ao grupo referencial aplicável. O planejamento identifica risco de existência e define procedimento com amostra. A solicitação pede a relação de itens e uma instrução orienta a extração no sistema do cliente. O arquivo enviado é registrado como documento recebido, mas a revisão de origem, período e completude identifica ausência de uma unidade. O auditor não o trata como evidência suficiente, solicita complemento e preserva as versões. Após nova avaliação, as informações adequadas sustentam o papel de trabalho. A revisão identifica uma exceção, que é documentada em achado e considerada na conclusão antes do relatório. O histórico registra os eventos; a trilha permite reconstruir a decisão.

### 17.11 Perguntas para discussão

1. Por que organização usuária, cliente e trabalho precisam de identidades distintas?
2. Como perfil geral, função no trabalho e responsabilidade por item se combinam na autorização?
3. Em que momento um documento recebido pode contribuir como evidência?
4. Por que um papel de trabalho pode ser insuficiente mesmo quando está formalmente preenchido?
5. Que relações precisam existir para voltar do relatório ao planejamento?
6. Quais fundamentos não podem ser simplificados no MVP?
7. Como registrar uma extensão futura sem transformá-la em entrega aprovada?

### 17.12 Questões de avaliação

1. Diferencie solicitação, instrução, documento recebido e evidência.
2. Explique a diferença entre histórico e trilha de auditoria.
3. Cite as três dimensões de acesso usadas no contexto de autorização.
4. Indique os elementos mínimos registrados por uma amostra segundo o Glossário.
5. Explique por que risco referencial e risco do trabalho não são equivalentes.
6. Cite quatro fundamentos transversais obrigatórios no MVP.
7. Explique o percurso reverso esperado entre relatório e planejamento.
8. Por que uma relação futura não integra automaticamente o MVP?

### 17.13 Resumo para apresentação

O Modelo de Domínio organiza o SIGA em uma cadeia rastreável que começa na organização usuária, passa pelo cliente e pelo trabalho de auditoria e conecta planejamento, contas, riscos, procedimentos, documentos, evidências, papéis, achados, revisão e conclusões ao relatório. Segurança, isolamento multiempresa, permissões, responsabilidades, estados, versões, anexos, histórico e trilha atravessam toda a cadeia. O MVP preserva esses fundamentos; extensões só avançam por especificação, dependências e aprovação.

### 17.14 Fontes e versão do treinamento

Este material deriva exclusivamente das fontes aprovadas declaradas no YAML. Utiliza o [[Glossário do SIGA]] v1.0 como vocabulário controlado e está vinculado ao Modelo de Domínio v0.9, de 2026-07-28, em revisão humana.

## 18. Fontes normativas e estruturantes

- [[Constituição do SIGA]] v1.0 — norma superior, princípios, estrutura documental e relações fundamentais.
- [[Matriz Mestra da Constituição do SIGA]] v1.2 — decisões consolidadas e navegação constitucional.
- [[Visão do Produto do SIGA]] v1.0 — propósito, MVP, públicos, experiência e limites estratégicos.
- [[Glossário do SIGA]] v1.0 — vocabulário controlado e definições canônicas.
- [[Públicos e Perfis de Uso do SIGA]] v1.0 — públicos, três dimensões de acesso, segregação, cliente e multiempresa.
- [[Estrutura Funcional do SIGA]] v1.0 — fluxo, camadas, base metodológica, balancete, contas e núcleo mínimo.
- [[Regras de Negócio e Metodologia de Auditoria]] v1.0 — ciclo, respostas aos riscos, amostragem, documentos, evidências, relatório e rastreabilidade.
- [[Dados, Segurança, Privacidade e Histórico do SIGA]] v1.0 — isolamento, autorização, arquivos, histórico, trilha, retenção e agentes.
- [[Qualidade, Testes e Validação do SIGA]] v1.0 — qualidade, revisão e verificações críticas.
- [[Agentes de Inteligência Artificial, Skills e Automação Assistida do SIGA]] v1.0 — limites, autonomia, fontes e aprovação humana.
- [[Roadmap, Evolução e Continuidade do SIGA]] v1.0 — MVP, fases, dependências, extensões e continuidade.

## 19. Histórico de alterações

- **Versão 0.9 — 2026-07-28 — Em revisão:** criação do Modelo de Domínio do SIGA para revisão humana, com mapa, entidades conceituais, relações, estados, rastreabilidade, extensões e material educacional.
