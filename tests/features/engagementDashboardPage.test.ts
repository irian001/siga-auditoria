import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { readFile } from "node:fs/promises";

describe("EngagementDashboardPage", () => {
  test("composes only the approved protected read contracts", async () => {
    const source = await readFile(
      new URL("../../src/features/engagements/EngagementDashboardPage.tsx", import.meta.url),
      "utf8",
    );

    assert.match(source, /getEngagementRepository\(\)\.getById/);
    assert.match(source, /getClientRepository\(\)\.getById/);
    assert.match(source, /getAcceptanceRepository\(\)\.getById/);
    assert.match(source, /engagements\.view/);
    assert.match(source, /Consulta não autorizada/);
    assert.match(source, /Trabalho não encontrado/);
    assert.doesNotMatch(source, /\b(insert|delete|migration|service_role)\b|\.update\(/);
  });
});
