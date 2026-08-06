import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { readFile } from "node:fs/promises";

describe("EngagementTeamMemberAssignment scope", () => {
  test("mantém a associação limitada ao usuário elegível e à função ativa", async () => {
    const source = await readFile(
      new URL("../../src/features/engagements/EngagementTeamMemberAssignment.tsx", import.meta.url),
      "utf8",
    );

    assert.match(source, /engagements\.manage/);
    assert.match(source, /users\.view/);
    assert.match(source, /Adicionar participante/);
    assert.match(source, /Nenhum registro será criado\s+automaticamente/);
    assert.doesNotMatch(source, /Criar função/);
    assert.doesNotMatch(source, /Editar participação/);
    assert.doesNotMatch(source, /Encerrar participação/);
  });
});
