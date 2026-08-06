<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# AGENTS.md — Diretrizes Operacionais do Projeto SIGA

**Situação:** Aprovado  
**Versão:** 1.2

**Atualizado:** 2026-08-06

**Aplicação:** Todo o repositório SIGA

## 1. Finalidade

Este arquivo orienta pessoas, agentes de inteligência artificial e ferramentas automatizadas que atuem no repositório do SIGA — Sistema Integrado para Gerenciamento de Auditoria.

Ele define como o trabalho deverá ser iniciado, executado, revisado e documentado.

Este arquivo não substitui a Constituição, as regras de negócio, os documentos estruturantes nem as SDDs.

## 2. Fonte oficial

O GitHub é a fonte oficial do código e da documentação versionada do SIGA.

O projeto Supabase oficial do SIGA é a fonte dos dados persistidos. Sua referência vigente deverá ser consultada na [Situação do Projeto](docs/status/SITUACAO_DO_PROJETO.md), sem depender da memória de conversas.

Conversas, anexos temporários, memórias de agentes, arquivos locais e cópias mantidas em serviços de sincronização não substituem o conteúdo aprovado no GitHub.

Nenhum documento deverá ser reconstruído a partir de conversas quando existir um arquivo correspondente no repositório.

## 3. Ordem obrigatória de leitura

Antes de planejar ou executar uma alteração relevante, deverão ser consultados:

1. [Constituição do SIGA](docs/constituicao/00_CONSTITUICAO_DO_SIGA.md);
2. [Plano Mestre das SDDs do MVP](docs/sdd/00_PLANO_MESTRE_DAS_SDDS_DO_MVP.md);
3. [Situação do Projeto](docs/status/SITUACAO_DO_PROJETO.md);
4. documento constitucional relacionado, utilizando a [Matriz Mestra da Constituição](docs/constituicao/MATRIZ_MESTRA_DA_CONSTITUICAO_DO_SIGA.md) como mapa de navegação;
5. [Visão do Produto](docs/estruturantes/01_VISAO_DO_PRODUTO.md);
6. [Glossário do SIGA](docs/estruturantes/02_GLOSSARIO_DO_SIGA.md);
7. [Modelo de Domínio](docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md);
8. [Modelo de Dados](docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md), quando aplicável;
9. [decisões arquiteturais relacionadas](docs/decisions/);
10. SDD atual indicada no Plano Mestre e na Situação do Projeto, localizada na [estrutura de SDDs](docs/sdd/);
11. plano de implantação aprovado para a SDD atual;
12. tarefa ou camada autorizada e arquivos do repositório afetados.

Conforme o escopo, deverão também ser consultados:

- [Governança do Desenvolvimento](docs/constituicao/06_GOVERNANCA_DO_DESENVOLVIMENTO.md);
- [Documentação Mestre](docs/constituicao/07_DOCUMENTACAO_MESTRE.md);
- [Agentes, Skills e Automação Assistida](docs/constituicao/12_AGENTES_SKILLS_E_AUTOMACAO.md);
- [Roadmap, Evolução e Continuidade](docs/constituicao/13_ROADMAP_EVOLUCAO_E_CONTINUIDADE.md).

Se algum documento obrigatório não existir ou apresentar conflito, a limitação deverá ser registrada antes da implementação.

### 3.1 Pacote mínimo obrigatório de retomada

Em toda nova sessão ou retomada, mesmo quando o histórico da conversa estiver disponível, o executor deverá ler pelo menos:

1. este `AGENTS.md`;
2. a Constituição;
3. o Plano Mestre das SDDs;
4. a Situação do Projeto;
5. a SDD e o plano de implantação atualmente ativos.

Depois da leitura, o executor deverá informar espontaneamente:

- grupo atual;
- última SDD concluída;
- SDD ativa ou próxima SDD autorizada;
- pendências e bloqueios conhecidos;
- próximo passo oficial estabelecido na documentação.

Não se deverá exigir que o responsável pelo projeto reconstrua verbalmente esse contexto a cada retomada.

### 3.2 Verificação contra o estado real

A documentação deverá ser comparada com o estado real do GitHub, da branch, dos pull requests, da aplicação publicada e, quando aplicável, do Supabase.

Quando o Plano Mestre ou a Situação do Projeto estiverem atrasados em relação a uma implementação já aprovada, os documentos deverão ser reconciliados antes de iniciar a SDD seguinte.

## 4. Hierarquia documental

Em caso de conflito, deverá prevalecer a seguinte ordem:

1. Constituição do SIGA;
2. decisões expressamente aprovadas pelo responsável do projeto;
3. documentos constitucionais;
4. regras de negócio e metodologia;
5. modelo de domínio;
6. arquitetura e modelo de dados aprovados;
7. decisões arquiteturais;
8. SDD aprovada;
9. plano de implementação;
10. tarefa;
11. prompt temporário;
12. código existente.

Um documento inferior não poderá modificar silenciosamente uma regra estabelecida em documento superior.

## 5. Regra de especificação

Nenhum módulo relevante deverá ser implementado sem uma SDD aprovada.

Cada SDD deverá indicar, conforme aplicável:

- objetivo;
- contexto;
- usuários;
- escopo;
- itens fora do escopo;
- fluxo funcional;
- entidades e relações;
- regras de negócio;
- estados;
- permissões;
- telas e componentes;
- critérios de aceite;
- testes esperados;
- documentação afetada;
- limitações;
- dependências.

Prompts enviados ao Lovable ou ao Codex deverão derivar da SDD. O prompt não substitui a especificação.

## 6. Divisão de responsabilidades

### ChatGPT Work

Responsável principalmente por:

- planejamento;
- documentação;
- organização das SDDs;
- definição funcional;
- critérios de aceite;
- preparação das tarefas;
- acompanhamento do roadmap;
- consolidação de decisões.

### Lovable

Responsável principalmente por:

- interfaces;
- navegação;
- componentes;
- formulários;
- fluxos visuais;
- protótipos;
- implementação inicial delimitada pela SDD.

O Lovable não deverá decidir isoladamente:

- metodologia de auditoria;
- regras críticas;
- arquitetura;
- estrutura definitiva do banco;
- políticas de acesso;
- segurança;
- migrações;
- segregação de funções.

### Codex

Responsável principalmente por:

- inspeção do repositório;
- integração técnica;
- regras complexas;
- banco de dados;
- segurança;
- migrações autorizadas;
- refatorações delimitadas;
- revisão de código;
- execução de verificações técnicas;
- correção de falhas.

### Responsável humano

A aprovação final permanece humana, especialmente para:

- regras de negócio;
- metodologia;
- arquitetura;
- estrutura de dados;
- segurança;
- permissões;
- relatórios;
- conclusões profissionais;
- liberação de versões.

## 7. Uso do Lovable

A conexão direta com o Lovable não altera a posição do GitHub como fonte oficial.

Cada SDD deverá ser enviada ao Lovable em duas etapas.

### Etapa de planejamento

O Lovable deverá:

- ler a SDD;
- apresentar o plano de implementação;
- informar telas e arquivos afetados;
- indicar dependências;
- apontar dúvidas ou limitações;
- não alterar o código.

### Etapa de implementação

Somente após a aprovação do plano, o Lovable poderá:

- implementar a SDD aprovada;
- atuar apenas no escopo autorizado;
- preservar componentes e funcionalidades existentes;
- registrar os arquivos alterados;
- trabalhar em branch própria;
- não publicar em produção sem autorização.

### Implementação em camadas controladas

Como regra operacional, o Lovable deverá receber implementações pequenas e verificáveis.

Cada camada deverá definir:

- um único objetivo funcional ou visual;
- arquivos que podem ser criados ou alterados;
- arquivos, módulos e serviços proibidos;
- dados simulados ou contratos autorizados;
- critérios de validação;
- ponto obrigatório de parada.

A camada seguinte somente poderá ser autorizada depois da revisão do resumo, do diff e da validação humana da camada anterior.

Qualquer alteração fora do escopo, antecipação de módulo, ativação do Lovable Cloud ou modificação não autorizada do Supabase deverá ser recusada, corrigida ou revertida por novo commit antes de continuar.

Não deverá ser enviado ao Lovable um comando amplo como “crie o SIGA completo”.

### Exceção operacional da sincronização direta

Quando a conexão direta do Lovable registrar alterações na branch conectada, normalmente a `main`, deverá ser aplicado o seguinte procedimento:

1. registrar o commit atual da `main`;
2. criar uma branch de checkpoint antes da implementação;
3. autorizar somente o escopo da SDD aprovada;
4. identificar imediatamente os commits produzidos pelo Lovable;
5. revisar o diff e executar as verificações proporcionais;
6. aceitar a alteração ou revertê-la por um novo commit;
7. nunca utilizar force push, rebase, amend ou squash sobre histórico já sincronizado.

Essa exceção aplica-se exclusivamente à sincronização direta do Lovable. Ela não autoriza outros agentes ou ferramentas a alterar a `main` sem o fluxo normal de branch, revisão e aprovação.

## 8. Controle de escopo

Antes de alterar qualquer arquivo, o executor deverá verificar:

- branch atual;
- estado do Git;
- alterações ainda não integradas;
- documentação aplicável;
- arquivos autorizados;
- dependências;
- impacto em outros módulos.

Não é permitido:

- alterar módulos não relacionados;
- excluir ou substituir conteúdo válido sem justificativa;
- ampliar a tarefa por iniciativa própria;
- refatorar áreas não solicitadas;
- modificar regras aprovadas silenciosamente;
- considerar uma conversa como autorização permanente.

Quando surgir necessidade fora do escopo, ela deverá ser registrada como pendência ou proposta separada.

## 9. Git e branches

Alterações relevantes deverão ser realizadas em branch própria.

A branch principal deverá permanecer estável e conter apenas conteúdo revisado e aprovado.

Para implementação de SDDs, recomenda-se a convenção:

```text
sdd/<identificador>-<descricao-curta>
```

Exemplo:

```text
sdd/fnd-001-fundacao-aplicacao
```

Cada commit deverá:

- possuir objetivo identificável;
- tratar um assunto coerente;
- evitar misturar mudanças independentes;
- permitir revisão e reversão;
- informar documentação ou SDD relacionada.

Nenhum agente deverá fazer merge na branch principal sem autorização expressa.

## 10. Documentação

Documentos existentes deverão ser preservados.

Não alterar sem autorização específica:

- conteúdo aprovado;
- identificadores;
- versões;
- status;
- YAML;
- wikilinks;
- histórico;
- nomes de arquivos.

Novos documentos deverão utilizar:

- Markdown legível no GitHub;
- metadados estruturados quando aplicáveis;
- identificadores permanentes;
- links internos consistentes;
- linguagem compatível com Obsidian;
- referências às fontes oficiais;
- histórico de alterações.

Recursos do Obsidian são complementares e não poderão impedir a leitura do arquivo diretamente no GitHub.

### 10.1 Fechamento documental obrigatório de uma SDD

Antes de iniciar a SDD seguinte, deverão ser atualizados, conforme aplicável:

1. a própria SDD, preservando o status documental e registrando a situação da implementação;
2. o plano de implantação, com o resultado efetivamente executado;
3. o painel e o histórico do Plano Mestre das SDDs;
4. a Situação do Projeto;
5. merges, migrations, testes, limitações e pendências relevantes.

A SDD seguinte poderá ser elaborada somente depois desse fechamento. Sua implementação continuará condicionada à aprovação da nova SDD e do novo plano.

## 11. Modelo de dados e Supabase

O Modelo de Dados aprovado orienta as futuras SDDs e migrations.

Ele não autoriza automaticamente:

- criação de todas as tabelas;
- alteração do banco;
- criação indiscriminada de políticas;
- uso de dados reais;
- execução em produção.

Mudanças no Supabase deverão possuir:

- SDD aprovada;
- escopo definido;
- análise de impacto;
- regras de isolamento multiempresa;
- políticas de acesso;
- migration versionada;
- possibilidade de reversão;
- validação humana.

O Lovable não deverá alterar a estrutura definitiva do Supabase sem autorização específica e revisão técnica.

## 12. Segurança e multiempresa

Toda implementação deverá preservar:

- isolamento entre organizações;
- menor privilégio;
- autorização contextual;
- segregação de funções;
- histórico;
- rastreabilidade;
- proteção de arquivos;
- confidencialidade;
- versionamento das informações relevantes.

A posse de um endereço ou link não representa autorização de acesso.

Credenciais, tokens, senhas e chaves não deverão ser incluídos no código, na documentação, nos prompts ou nos commits.

## 13. Solicitações, documentos e evidências

Deverá ser preservada a distinção entre:

- solicitação de documento;
- instrução de evidência;
- documento recebido;
- arquivo armazenado;
- evidência avaliada;
- papel de trabalho.

Um documento enviado pelo cliente não se torna automaticamente evidência de auditoria.

A incorporação como evidência depende de avaliação e responsabilidade profissional.

## 14. Uso de agentes e skills

Agentes poderão apoiar planejamento, documentação, implementação, revisão e acompanhamento dentro do escopo autorizado.

Nenhum agente poderá:

- inventar regras;
- inventar arquivos ou testes;
- declarar aprovação inexistente;
- ampliar seu próprio acesso;
- alterar produção sem autorização;
- substituir julgamento profissional;
- aprovar o próprio resultado quando revisão independente for necessária.

As skills Superpowers ficam reservadas exclusivamente para a etapa formal de testes e validação.

Elas não deverão ser utilizadas rotineiramente durante:

- planejamento;
- redação das SDDs;
- criação de documentação;
- implementação visual;
- atividades comuns de desenvolvimento.

Codex e ferramentas normais poderão executar verificações técnicas proporcionais durante a implementação. O uso formal de Superpowers ocorrerá na fase específica de testes, regressão e validação da liberação.

Os arquivos existentes em [docs/superpowers](docs/superpowers/) são registros históricos de trabalhos anteriores. Eles não autorizam o uso atual das skills e não prevalecem sobre este arquivo, o Plano Mestre ou a Situação do Projeto.

## 15. Testes e validação

Cada SDD deverá possuir critérios de aceite verificáveis.

A implementação deverá considerar:

- fluxo normal;
- validações;
- erros;
- permissões;
- isolamento multiempresa;
- estados;
- histórico;
- segurança;
- rastreabilidade.

A etapa formal de testes deverá ser planejada separadamente e poderá utilizar as skills Superpowers conforme autorização do projeto.

Nenhum executor deverá afirmar que uma funcionalidade funciona sem informar as verificações realizadas.

## 16. Critério de conclusão

Uma tarefa somente poderá ser considerada concluída quando:

- o escopo aprovado tiver sido atendido;
- os critérios de aceite tiverem sido verificados;
- os arquivos alterados tiverem sido identificados;
- as verificações executadas tiverem sido informadas;
- não houver falha crítica conhecida;
- a documentação tiver sido atualizada quando necessário;
- as limitações e pendências tiverem sido registradas;
- a alteração estiver versionada;
- houver validação humana quando exigida.

## 17. Relatório obrigatório ao final da tarefa

Ao final, o executor deverá informar de forma objetiva:

- o que foi realizado;
- arquivos criados ou alterados;
- branch utilizada;
- verificações executadas;
- resultado das verificações;
- limitações;
- pendências;
- próximo passo recomendado.

O próximo passo deverá ser extraído do Plano Mestre e da Situação do Projeto e informado espontaneamente, sem depender de pergunta adicional do responsável pelo projeto.

### 17.1 Próximo passo obrigatório em toda resposta de encerramento

Toda resposta que encerre uma análise, planejamento, implementação, revisão, publicação, homologação ou retomada deverá terminar informando explicitamente o **próximo passo oficial do projeto**.

Antes de informar esse próximo passo, o executor deverá conferir:

1. o [Plano Mestre das SDDs do MVP](docs/sdd/00_PLANO_MESTRE_DAS_SDDS_DO_MVP.md);
2. a [Situação do Projeto](docs/status/SITUACAO_DO_PROJETO.md);
3. a SDD e o plano de implementação atualmente ativos;
4. o que foi efetivamente concluído, aprovado, publicado ou homologado;
5. pendências, bloqueios e aprovações ainda necessárias.

Essa obrigação permanece válida após troca de modelo de inteligência artificial, retomada de sessão, compactação do histórico ou mudança de ferramenta. A memória da conversa não deverá ser utilizada como única base para indicar a continuidade do projeto.

Quando não houver autorização para executar o próximo passo, ele deverá ser apenas informado, sem início automático. Quando o próximo passo depender de homologação ou decisão humana, essa dependência deverá ser declarada claramente.

## 18. Regra de interrupção

O executor deverá interromper alterações irreversíveis ou fora do escopo quando encontrar:

- documentos oficiais conflitantes;
- ausência de autorização necessária;
- risco de perda de dados;
- risco de sobrescrita;
- alteração não integrada de outro responsável;
- dúvida que modifique materialmente a regra de negócio;
- possível quebra do isolamento multiempresa;
- necessidade de acessar produção sem autorização.

A interrupção deverá explicar claramente o problema e a decisão necessária.

## 19. Histórico de alterações

| Versão | Data | Alteração | Situação |
|---|---|---|---|
| 1.0 | 2026-07-29 | Aprovação inicial das diretrizes operacionais do SIGA | Substituída |
| 1.1 | 2026-08-04 | Inclusão dos links oficiais, protocolo de retomada, implementação em camadas, fechamento documental das SDDs e classificação histórica dos arquivos Superpowers | Aprovada |
| 1.2 | 2026-08-06 | Obrigatoriedade de conferir a documentação vigente e informar o próximo passo oficial em toda resposta de encerramento, inclusive após troca de modelo ou retomada | Aprovada |
