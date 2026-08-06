import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { readFile } from "node:fs/promises";

describe("PNL-001 Etapa 2 visual scope", () => {
  test("adds controlled panel navigation and preserves the existing summary", async () => {
    const source = await readFile(
      new URL("../../src/features/engagements/EngagementsPage.tsx", import.meta.url),
      "utf8",
    );

    assert.match(source, /Abrir painel/);
    assert.match(source, /\/trabalhos\/\$engagementId/);
    assert.match(source, /Ver resumo/);
    assert.match(source, /engagement\.id/);
  });

  test("keeps the panel navigable back to the work list", async () => {
    const source = await readFile(
      new URL("../../src/features/engagements/EngagementDashboardPage.tsx", import.meta.url),
      "utf8",
    );

    assert.match(source, /Voltar para trabalhos/);
    assert.match(source, /to="\/trabalhos"/);
    assert.match(source, /overflow-hidden/);
    assert.match(source, /pb-10/);
  });
});
