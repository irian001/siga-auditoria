# Plano visual — SDD-CLI-001 (Cadastro de Clientes)

## 1. Resumo da solução visual

Substituir a tela provisória de `/clientes` (hoje `ModuloFuturoPage`) por uma interface funcional em português, no mesmo tema escuro aprovado (grafite, azul profundo, cinza frio), composta por:

- cabeçalho do módulo com `PageHeader` e ação `Novo cliente`;
- barra de pesquisa e dois filtros (estado e classificação);
- listagem responsiva dentro de `DataTableShell`, com estados de carregamento, vazio e erro;
- formulário de criação/edição em `Dialog`, com validação por campo;
- confirmação de inativação/reativação em `AlertDialog`;
- mensagens funcionais exatamente como previstas na seção 13 da SDD, via `sonner` para sucesso e `Alert`/texto de campo para erro.

Nenhum novo sistema visual, token ou componente global será criado. A camada de dados continua sendo a já existente (`ClientRepository` + `MockClientRepository`); a interface fala apenas com o contrato.

## 2. Fluxo da listagem

1. A rota `/clientes` já é protegida pela guarda de sessão existente no `__root`.
2. `ClientsPage` lê o contexto de acesso do root (`auth.access.context`) e monta o `RequestContext` (`organizationId`, `userId`) e o `AuthorizationContext`.
3. Sem `clients.view`: a página não renderiza listagem nem filtros; exibe `EmptyState`/`ErrorState` com "Você não possui permissão para consultar clientes." e ação de voltar ao início.
4. Com `clients.view`: `useQuery` chama `repository.list(context, filters, page)`; estado inicial dos filtros = `status: "active"` (padrão da SDD), classificação `todos`, busca vazia.
5. Pesquisa por nome de exibição, razão social ou identificador fiscal com debounce curto, mapeada para `ClientFilters.search`.
6. Filtros por estado (ativo, inativo, todos) e classificação (pessoa jurídica, pessoa física, outro) usando `Select`, mapeados para `ClientFilters.status` / `ClientFilters.classification`.
7. Colunas: nome de exibição, razão social/nome jurídico, identificador mascarado (`maskTaxIdentifier`), classificação, estado (`StatusBadge` + rótulo textual) e ações.
8. Cliente inativo é diferenciado por rótulo textual "Inativo", ícone no badge e nome com aparência atenuada — nunca só por cor.
9. Resultado paginado do contrato é exibido com contagem textual ("N clientes"); paginação simples só será exposta quando o total ultrapassar a página.

## 3. Fluxo de criação e edição

1. `Novo cliente` (visível apenas com `clients.manage`) abre `ClientForm` em `Dialog` no modo criação.
2. Ação `Editar` na linha abre o mesmo `ClientForm` preenchido com o cliente selecionado.
3. Campos: nome de exibição, razão social ou nome jurídico, tipo de identificador (`Select`: CNPJ, CPF, estrangeiro, outro), identificador fiscal (máscara conforme o tipo) e classificação (`Select`).
4. Validação client-side reutilizando `createClientSchema`/`updateClientSchema` de `src/domain/client.ts`; mensagens aparecem sob cada campo via `FormField` com `aria-invalid` e `aria-describedby`.
5. Envio chama `repository.create` / `repository.update`. Enquanto pendente, botão `Salvar` fica desabilitado com indicação de processamento — bloqueio de envio repetido.
6. Sucesso: fecha o diálogo, invalida a consulta da lista e exibe "Cliente cadastrado com sucesso." ou "Cliente atualizado com sucesso.".
7. Erro do contrato: `CONFLICT` → mensagem de duplicidade da SDD junto ao campo identificador; `VALIDATION_ERROR` → mensagem no campo correspondente; demais → `Alert` no diálogo com "Não foi possível concluir a operação. Tente novamente.".
8. `Cancelar` (e `Esc`) descarta as alterações e devolve o foco ao gatilho.

## 4. Fluxo de inativação e reativação

1. Ação na linha: `Inativar` para clientes ativos, `Reativar` para inativos — apenas com `clients.manage`.
2. `ClientStatusDialog` (`AlertDialog`) apresenta o nome do cliente e a consequência: inativar preserva o histórico e retira o cliente das seleções futuras; reativar volta a permitir uso.
3. Confirmação chama `repository.changeStatus(context, id, status)`; botão de confirmação desabilitado durante o processamento.
4. Sucesso: "Cliente inativado. O histórico foi preservado." ou "Cliente reativado com sucesso."; lista revalidada.
5. Falha: mensagem genérica da SDD, sem detalhes internos; o diálogo permanece aberto para nova tentativa.
6. Nenhuma ação de exclusão é oferecida em qualquer ponto da interface.

## 5. Componentes reutilizados

- `PageHeader`, `SectionHeader`, `DataTableShell`, `FormField`;
- `EmptyState`, `ErrorState`, `LoadingState` (variante `tabela`);
- `StatusBadge`, `Badge`, `Button`, `Input`, `Select`, `Label`, `Table`, `Card`, `Alert`, `Dialog`, `AlertDialog`, `Tooltip`, `DropdownMenu` (ações da linha), `sonner`.

## 6. Arquivos a criar

- `src/features/clients/ClientsPage.tsx` — composição da página, contexto, permissões, filtros e orquestração dos diálogos;
- `src/features/clients/ClientsList.tsx` — tabela responsiva e ações de linha;
- `src/features/clients/ClientForm.tsx` — formulário de criação e edição;
- `src/features/clients/ClientStatusDialog.tsx` — confirmação de inativação/reativação;
- `src/features/clients/clientsPresentation.ts` — rótulos em pt-BR para classificação, tipo de identificador e estado (apenas apresentação, sem regra de negócio).

## 7. Arquivos a alterar

- `src/routes/clientes.tsx` — trocar `ModuloFuturoPage` por `ClientsPage`, mantendo o `head()` atual;
- `src/config/navigation.ts` — mudar apenas o `status` do item `clientes` de `planejado` para `disponivel` (nenhuma outra entrada é tocada);
- `src/routeTree.gen.ts` — apenas se a ferramenta regenerar automaticamente; não será editado à mão.

Nada em `src/domain/client.ts`, `src/data/clientRepository.ts`, `src/data/mockClientRepository.ts`, `src/domain/authorization.ts`, migrations, Supabase, autenticação, ACL ou docs.

## 8. Respeito a `clients.view` e `clients.manage`

- A verificação usa `can(authorization, "clients.view" | "clients.manage")` de `src/domain/authorization.ts`, com o `AuthorizationContext` já resolvido no contexto do root.
- Sem `clients.view`: nenhuma listagem, filtro ou dado é renderizado.
- Sem `clients.manage`: `Novo cliente`, `Editar`, `Inativar` e `Reativar` não são renderizados (não apenas desabilitados).
- A checagem visual é conveniência de interface; a autoridade permanece no banco (RLS) e no repositório. Se uma mutação retornar `UNAUTHORIZED`, a interface exibe "Você não possui permissão para administrar clientes.".

## 9. Estados de carregamento, vazio, erro e sucesso

- Carregando: `DataTableShell state="carregando"` com `LoadingState variant="tabela"`; ações desabilitadas durante mutações.
- Vazio: distinguir "nenhum cliente cadastrado" (com ação `Novo cliente` quando permitido) de "nenhum resultado para os filtros" (com ação de limpar filtros).
- Erro: `ErrorState` com mensagem genérica e ação `Tentar novamente` que revalida a consulta.
- Sucesso: `sonner` com as mensagens exatas da SDD; nenhuma mensagem revela SQL, IDs externos ou existência de registros de outra organização.

## 10. Responsividade e acessibilidade

- Desktop: tabela completa com rolagem horizontal do `DataTableShell`; em telas estreitas, cartões empilhados com os mesmos campos e ações.
- Filtros empilham em coluna no mobile e ficam em linha a partir de `sm`.
- Um único `h1` por página (via `PageHeader`); tabela com `caption` acessível ou `aria-label`.
- Campos com rótulo associado, `aria-describedby` para ajuda/erro e `aria-invalid` em erro; foco visível herdado dos tokens `ring`.
- Diálogos com foco inicial no primeiro campo, `Esc` para fechar, retorno de foco ao gatilho; ações de linha alcançáveis por teclado.
- Estado do cliente comunicado por texto + ícone além da cor.

## 11. Dependências e dúvidas

- A interface consumirá `MockClientRepository` como implementação do contrato nesta entrega visual, com a instância isolada em um único ponto de `ClientsPage` para que o Codex a substitua pelo adaptador Supabase sem tocar nos componentes. Confirmar se prefere que o ponto de troca fique em um arquivo separado a ser criado pelo Codex.
- Assumo que `auth.access.context` já expõe `authorization.permissionCodes` com `clients.view`/`clients.manage` na sessão administrativa; caso não exponha, a lista aparecerá sem permissão e será necessário ajuste técnico do Codex.
- Assumo que a alteração de `status` do item de navegação está autorizada; se não estiver, mantenho `planejado` sem outros impactos.
- Paginação e ordenação avançadas não constam da SDD; será entregue o mínimo (ordem por nome de exibição, paginação simples).

## 12. Confirmação

Nenhum arquivo de código foi criado ou alterado nesta chamada; apenas este plano foi escrito. O Supabase não foi modificado, nenhuma migration foi executada, o Lovable Cloud não foi ativado, a conexão de banco não foi trocada e nenhuma publicação foi realizada. Aguardo aprovação humana antes de implementar.
