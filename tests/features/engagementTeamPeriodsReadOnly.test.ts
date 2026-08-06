import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { readFile } from "node:fs/promises";

describe("EngagementTeamPeriodsReadOnly scope", () => {
  test("exposes consultation sections without write controls", async () => {
    const source = await readFile(
      new URL("../../src/features/engagements/EngagementTeamPeriodsReadOnly.tsx", import.meta.url),
      "utf8",
    );

    assert.match(source, /Equipe/);
    assert.match(source, /Períodos/);
    assert.match(source, /Consulta somente leitura/);
    assert.doesNotMatch(source, /onClick/);
    assert.doesNotMatch(source, /\b(create|update|delete)\b/);
  });
});
