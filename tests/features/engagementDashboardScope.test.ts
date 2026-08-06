import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { readFile } from "node:fs/promises";

describe("PNL-001 Etapa 1 scope", () => {
  test("keeps the route limited to the first implementation stage", async () => {
    const routeSource = await readFile(
      new URL("../../src/routes/trabalhos.$engagementId.tsx", import.meta.url),
      "utf8",
    );
    const pageSource = await readFile(
      new URL("../../src/features/engagements/EngagementDashboardPage.tsx", import.meta.url),
      "utf8",
    );

    assert.match(routeSource, /\/trabalhos\/\$engagementId/);
    assert.match(routeSource, /EngagementDashboardPage/);
    assert.match(pageSource, /Carregando trabalho, cliente e aceitação/);
    assert.match(pageSource, /Escopo preliminar/);
    assert.doesNotMatch(
      pageSource,
      /Adicionar participante|Abrir painel|Editar trabalho|Encerrar trabalho/,
    );
  });
});
