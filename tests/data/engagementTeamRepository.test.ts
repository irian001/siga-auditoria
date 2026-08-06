import assert from "node:assert/strict";
import { describe, test } from "node:test";

import type { AuthorizationContext } from "../../src/domain/authorization.ts";
import { MockEngagementTeamPeriodsRepository } from "../../src/data/mockEngagementTeamRepository.ts";

const organizationId = "org-a";
const engagementId = "engagement-1";

function authorization(
  permissionCodes: AuthorizationContext["permissionCodes"] = ["engagements.view"],
  authorizedOrganizationId = organizationId,
): AuthorizationContext {
  return {
    membershipId: "membership-requester",
    organizationId: authorizedOrganizationId,
    roleCodes: ["organization_admin"],
    permissionCodes,
    status: "active",
  };
}

function createRepository() {
  return new MockEngagementTeamPeriodsRepository({
    teamMembers: [
      {
        id: "team-2",
        organizationId,
        engagementId,
        membershipId: "membership-2",
        userProfileId: "profile-2",
        displayName: "Bruno Revisor",
        roleId: "role-reviewer",
        roleCode: "reviewer",
        roleName: "Revisor",
        roleStatus: "active",
        status: "active",
        activeFrom: "2026-08-02",
        activeTo: null,
      },
      {
        id: "team-other",
        organizationId: "org-b",
        engagementId,
        membershipId: "membership-other",
        userProfileId: "profile-other",
        displayName: "Outra Organização",
        roleId: "role-other",
        roleCode: "other",
        roleName: "Outra função",
        roleStatus: "active",
        status: "active",
        activeFrom: "2026-08-01",
        activeTo: null,
      },
    ],
    periods: [
      {
        id: "period-1",
        organizationId,
        engagementId,
        label: "Exercício 2026",
        startDate: "2026-01-01",
        endDate: "2026-12-31",
        status: "active",
      },
    ],
    roles: [
      {
        id: "role-reviewer",
        organizationId,
        code: "reviewer",
        name: "Revisor",
        status: "active",
      },
    ],
    eligibleUsers: [
      {
        userProfileId: "profile-3",
        displayName: "Carla Auditora",
        membershipId: "membership-3",
        organizationId,
        membershipStatus: "active",
        activeFrom: "2026-08-01T00:00:00.000Z",
        activeTo: null,
      },
    ],
  });
}

describe("MockEngagementTeamPeriodsRepository", () => {
  test("consulta equipe e períodos do trabalho autorizado", async () => {
    const result = await createRepository().getByEngagement({
      organizationId,
      engagementId,
      authorization: authorization(),
    });

    assert.deepEqual(result, {
      ok: true,
      data: {
        teamMembers: [
          {
            id: "team-2",
            organizationId,
            engagementId,
            membershipId: "membership-2",
            userProfileId: "profile-2",
            displayName: "Bruno Revisor",
            roleId: "role-reviewer",
            roleCode: "reviewer",
            roleName: "Revisor",
            roleStatus: "active",
            status: "active",
            activeFrom: "2026-08-02",
            activeTo: null,
          },
        ],
        periods: [
          {
            id: "period-1",
            organizationId,
            engagementId,
            label: "Exercício 2026",
            startDate: "2026-01-01",
            endDate: "2026-12-31",
            status: "active",
          },
        ],
      },
    });
  });

  test("retorna estado vazio sem inventar registros", async () => {
    const result = await new MockEngagementTeamPeriodsRepository().getByEngagement({
      organizationId,
      engagementId,
      authorization: authorization(),
    });

    assert.deepEqual(result, { ok: true, data: { teamMembers: [], periods: [] } });
  });

  test("bloqueia consulta sem engagements.view ou em outra organização", async () => {
    const repository = createRepository();
    const withoutPermission = await repository.getByEngagement({
      organizationId,
      engagementId,
      authorization: authorization(["users.view"]),
    });
    const otherOrganization = await repository.getByEngagement({
      organizationId,
      engagementId,
      authorization: authorization(["engagements.view"], "org-b"),
    });

    assert.equal(withoutPermission.ok, false);
    assert.equal(otherOrganization.ok, false);
  });

  test("expõe somente a escrita controlada de associação", () => {
    const repository = createRepository();
    assert.equal("assignMember" in repository, true);
    assert.equal("update" in repository, false);
    assert.equal("delete" in repository, false);
  });

  test("lista funções ativas e associa usuário elegível", async () => {
    const repository = createRepository();
    const context = {
      organizationId,
      engagementId,
      authorization: authorization(["engagements.view", "engagements.manage"]),
    };

    const roles = await repository.listActiveRoles(context);
    assert.deepEqual(roles, {
      ok: true,
      data: [
        {
          id: "role-reviewer",
          organizationId,
          code: "reviewer",
          name: "Revisor",
          status: "active",
        },
      ],
    });

    const result = await repository.assignMember(context, {
      organizationId,
      engagementId,
      membershipId: "membership-3",
      roleId: "role-reviewer",
      activeFrom: "2026-08-06",
    });

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(result.data.displayName, "Carla Auditora");
      assert.equal(result.data.status, "active");
      assert.equal(result.data.roleCode, "reviewer");
    }
  });

  test("bloqueia associação sem permissão ou em duplicidade ativa", async () => {
    const repository = createRepository();
    const input = {
      organizationId,
      engagementId,
      membershipId: "membership-3",
      roleId: "role-reviewer",
      activeFrom: "2026-08-06",
    };

    const withoutPermission = await repository.assignMember(
      {
        organizationId,
        engagementId,
        authorization: authorization(["engagements.view"]),
      },
      input,
    );
    assert.equal(withoutPermission.ok, false);

    const first = await repository.assignMember(
      {
        organizationId,
        engagementId,
        authorization: authorization(["engagements.view", "engagements.manage"]),
      },
      input,
    );
    assert.equal(first.ok, true);

    const duplicate = await repository.assignMember(
      {
        organizationId,
        engagementId,
        authorization: authorization(["engagements.view", "engagements.manage"]),
      },
      input,
    );
    assert.equal(duplicate.ok, false);
    if (!duplicate.ok) assert.equal(duplicate.error.code, "CONFLICT");
  });
});
