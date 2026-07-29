# AGENTS.md — Diretrizes Operacionais do Projeto SIGA

**Situação:** Aprovado  
**Aplicação:** Todo o repositório SIGA

## 1. Finalidade

Este arquivo orienta pessoas, agentes de inteligência artificial e ferramentas automatizadas que atuem no repositório do SIGA — Sistema Integrado para Gerenciamento de Auditoria.

Ele define como o trabalho deverá ser iniciado, executado, revisado e documentado.

Este arquivo não substitui a Constituição, as regras de negócio, os documentos estruturantes nem as SDDs.

## 2. Fonte oficial

O GitHub é a fonte oficial do código e da documentação versionada do SIGA.

O Supabase será a fonte oficial dos dados persistidos quando sua implantação for formalmente autorizada.

Conversas, anexos temporários, memórias de agentes, arquivos locais e cópias mantidas em serviços de sincronização não substituem o conteúdo aprovado no GitHub.

Nenhum documento deverá ser reconstruído a partir de conversas quando existir um arquivo correspondente no repositório.

## 3. Ordem obrigatória de leitura

Antes de planejar ou executar uma alteração relevante, deverão ser consultados, conforme o escopo:

1. [Constituição do SIGA](docs/constituicao/00_CONSTITUICAO_DO_SIGA.md);
2. documento constitucional relacionado;
3. [Visão do Produto](docs/estruturantes/01_VISAO_DO_PRODUTO.md);
4. [Glossário do SIGA](docs/estruturantes/02_GLOSSARIO_DO_SIGA.md);
5. [Modelo de Domínio](docs/estruturantes/03_MODELO_DE_DOMINIO_DO_SIGA.md);
6. Modelo de Dados, quando aplicável;
7. decisões arquiteturais relacionadas;
8. Plano Mestre das SDDs do MVP;
9. SDD aprovada para a funcionalidade;
10. plano e tarefa em execução;
11. situação atual do projeto.

Se algum documento obrigatório não existir ou apresentar conflito, a limitação deverá ser registrada antes da implementação.

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

Não deverá ser enviado ao Lovable um comando amplo como “crie o SIGA completo”.

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
