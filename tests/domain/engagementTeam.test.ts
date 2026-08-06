import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { readFile } from "node:fs/promises";

describe("engagementTeam domain contract", () => {
  test("declares the read-only team and periods models", async () => {
    const source = await readFile(
      new URL("../../src/domain/engagementTeam.ts", import.meta.url),
      "utf8",
    );

    assert.match(source, /EngagementTeamPeriodsQueryContext/);
    assert.match(source, /EngagementTeamMemberReadModel/);
    assert.match(source, /EngagementRoleOption/);
    assert.match(source, /EngagementTeamMemberAssignmentInput/);
    assert.match(source, /EngagementPeriodReadModel/);
    assert.match(source, /EngagementTeamPeriodsReadModel/);
  });
});
