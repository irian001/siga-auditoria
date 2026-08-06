import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { readFile } from "node:fs/promises";

describe("EngagementTeamPeriodsReadOnly scope", () => {
  test("exposes consultation and the restricted association entry point", async () => {
    const source = await readFile(
      new URL("../../src/features/engagements/EngagementTeamPeriodsReadOnly.tsx", import.meta.url),
      "utf8",
    );

    assert.match(source, /Equipe/);
    assert.match(source, /Períodos/);
    assert.match(source, /Adicionar participante/);
    assert.match(source, /engagements\.manage/);
    assert.doesNotMatch(source, /Criar função/);
    assert.doesNotMatch(source, /Editar participação/);
  });
});
