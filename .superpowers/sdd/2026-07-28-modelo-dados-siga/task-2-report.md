# Relatório da Task 2 — Correção final do Modelo de Dados do SIGA

**Data:** 2026-07-28
**Escopo alterado:** somente `docs/estruturantes/04_MODELO_DE_DADOS_DO_SIGA.md` e este relatório.

## Correções aplicadas

1. Incluída `document_request_instructions` para a cardinalidade 0:N de instruções efetivamente aplicadas a `document_requests`, com template de origem opcional, snapshot, versão enviada e data de envio imutáveis.
2. Incluída `file_access_grants` para acesso temporário a arquivo ou versão, com organização, cliente e trabalho condicionais, destinatário, finalidade, permissões, expiração, revogação e referência à trilha por `audit_events`.
3. Incluída a FK condicional de `trial_balance_import_rows` para `client_accounts`; contas do cliente agora carregam vigência e a linha conserva bruto, normalizado e a conta histórica aplicada.
4. Incluída `finding_area_conclusions` como associação N:N explícita entre achados e conclusões de área.
5. Formalizado `ownership_scope` (`platform` ou `organization`) e `organization_id` condicional, com unicidade contextual, para permissões e referenciais semelhantes, sem presumir globalidade.
6. Corrigido o wikilink da fonte do desenho para o arquivo existente em `docs/superpowers/specs/2026-07-28-modelo-dados-siga-design.md`, sem alterar o desenho.
7. Mantida `action_plans` como extensão futura, fora do núcleo MVP.

## Atualizações de coerência

- Mapa relacional, contagem de fichas, ordem futura de implantação, integridade transversal, material de treinamento e histórico de alterações foram atualizados.
- A contagem final é de 64 fichas lógicas: 63 do MVP e `action_plans` como extensão futura.

## Verificações

- Verificação textual das três novas estruturas, das relações, da ligação de linhas de balancete a contas, do escopo contextual e da manutenção de `action_plans` como extensão futura.
- Verificação da resolução textual do destino do desenho.
- `git diff --check` executado sem apontamentos.

## Preocupações remanescentes

- A decisão de quais catálogos serão efetivamente publicados no escopo da plataforma ou no escopo de cada organização permanece para SDD, como o documento registra.
- Não foram criadas regras operacionais, SQL, migrations ou políticas de acesso; esses detalhes permanecem fora do escopo desta correção documental.
