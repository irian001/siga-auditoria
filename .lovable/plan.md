O repositório GitHub https://github.com/irian001/siga-auditoria está vazio, então vamos usar este projeto Lovable para construir o SIGA Auditoria e sincronizar futuramente com aquele repositório. O backend já existe em um Supabase próprio, então o ambiente será configurado para apontar para ele.

````text
Passo 1 — Receber as especificações
- O usuário carrega os arquivos .MD que descrevem o SIGA Auditoria (regras de negócio, telas, fluxos, entidades).
- Esses arquivos serão mantidos no projeto como referência (ex.: `/docs` ou `README.md`) e usados para guiar a implementação.

Passo 2 — Conectar o Supabase existente
- Receber do usuário: Supabase URL, anon/publishable key e, se necessário, service role key para funções administrativas.
- Armazenar esses valores como secrets no projeto Lovable.
- Gerar/atualizar a integração Supabase no código (`src/integrations/supabase/`), se ainda não existir.

Passo 3 — Conectar o GitHub para sync futuro
- No Lovable, habilitar Git sync para o repositório `irian001/siga-auditoria`.
- Isso permitirá que o código gerado no Lovable seja pushado automaticamente para o GitHub.

Passo 4 — Criar a estrutura base do app
- Definir design system e tokens no `src/styles.css`.
- Criar layout raiz, rotas principais (auth, dashboard, auditorias, etc.) e a área autenticada em `src/routes/_authenticated/`.
- Implementar login/logout usando Supabase Auth (email/senha e Google como padrão, a menos que especificado de outra forma).

Passo 5 — Implementar funcionalidades conforme os .MDs
- Modelar telas, formulários, listagens, relatórios e regras de negócio descritas nos arquivos de especificação.
- Usar `createServerFn` para operações no Supabase, respeitando RLS.
- Implementar rotas protegidas e permissões conforme papéis de usuário, se previstos.

Passo 6 — Validar e publicar
- Rodar build local, verificar erros de tipo e de importação.
- Publicar uma versão inicial e confirmar que o GitHub sync está funcionando.
````

## Próximos passos imediatos

Preciso que você me envie agora:

1. **Arquivos .MD** com as especificações do SIGA Auditoria (pode colar o conteúdo ou fazer upload dos arquivos).
2. **Credenciais do Supabase** existente:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY` (ou publishable key)
   - `SUPABASE_SERVICE_ROLE_KEY` (se houver funções admin)
3. **Confirmação se deseja Git sync** para `irian001/siga-auditoria` agora, ou mais tarde.

Assim que tiver esses itens, começo a montar o ambiente e a implementação.