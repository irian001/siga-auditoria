import assert from "node:assert/strict";
import { describe, test } from "node:test";

import type { AuthorizationContext } from "../../src/domain/authorization";
import type { OrganizationMembership } from "../../src/domain/organizationMembership";
import { MockUserDirectoryRepository } from "../../src/data/mockUserDirectoryRepository";

const asOf = "2026-08-06T12:00:00.000Z";
const organizationId = "org-a";
const otherOrganizationId = "org-b";

function authorization(
  permissionCodes: AuthorizationContext["permissionCodes"] = ["users.view"],
  status: AuthorizationContext["status"] = "active",
  authorizedOrganizationId = organizationId,
): AuthorizationContext {
  return {
    membershipId: "membership-requester",
    organizationId: authorizedOrganizationId,
    roleCodes: [],
    permissionCodes,
    status,
  };
}

function membership(overrides: Partial<OrganizationMembership> = {}): OrganizationMembership {
  return {
    id: "membership-user-1",
    organizationId,
    userProfileId: "profile-1",
    status: "active",
    activeFrom: "2026-08-01T00:00:00.000Z",
    activeTo: null,
    ...overrides,
  };
}

function createRepository(): MockUserDirectoryRepository {
  return new MockUserDirectoryRepository({
    profiles: [
      { id: "profile-1", displayName: "Ana Ativa", status: "active" },
      { id: "profile-2", displayName: "Bruno Inativo", status: "inactive" },
      { id: "profile-3", displayName: "Carla Pendente", status: "active" },
      { id: "profile-4", displayName: "Diego Outra Organização", status: "active" },
      { id: "profile-5", displayName: "Eva Expirada", status: "active" },
    ],
    memberships: [
      membership(),
      membership({
        id: "membership-user-2",
        userProfileId: "profile-2",
        status: "active",
      }),
      membership({
        id: "membership-user-3",
        userProfileId: "profile-3",
        status: "pending",
      }),
      membership({
        id: "membership-user-4",
        userProfileId: "profile-4",
        organizationId: otherOrganizationId,
      }),
      membership({
        id: "membership-user-5",
        userProfileId: "profile-5",
        activeTo: "2026-08-05T23:59:59.000Z",
      }),
    ],
  });
}

describe("MockUserDirectoryRepository", () => {
  test("retorna somente usuários ativos e vigentes da organização autorizada", async () => {
    const result = await createRepository().listEligibleUsers({
      organizationId,
      authorization: authorization(),
      asOf,
    });

    assert.deepEqual(result, {
      ok: true,
      data: [
        {
          userProfileId: "profile-1",
          displayName: "Ana Ativa",
          membershipId: "membership-user-1",
          organizationId,
          membershipStatus: "active",
          activeFrom: "2026-08-01T00:00:00.000Z",
          activeTo: null,
        },
      ],
    });
  });

  test("bloqueia usuário autenticado sem users.view", async () => {
    const result = await createRepository().listEligibleUsers({
      organizationId,
      authorization: authorization(["engagements.manage"]),
      asOf,
    });

    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.error.code, "FORBIDDEN");
  });

  test("bloqueia contexto não ativo ou incompleto", async () => {
    const result = await createRepository().listEligibleUsers({
      organizationId,
      authorization: authorization(["users.view"], "pending"),
      asOf,
    });

    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.error.code, "UNAUTHORIZED");
  });

  test("não permite que o authorization de outra organização amplie o escopo", async () => {
    const result = await createRepository().listEligibleUsers({
      organizationId,
      authorization: authorization(["users.view"], "active", otherOrganizationId),
      asOf,
    });

    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.error.code, "FORBIDDEN");
  });

  test("não expõe campos de autenticação nem oferece operações de escrita", async () => {
    const repository = createRepository();
    const result = await repository.listEligibleUsers({
      organizationId,
      authorization: authorization(),
      asOf,
    });

    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(Object.hasOwn(result.data[0], "authSubject"), false);
      assert.equal(Object.hasOwn(result.data[0], "email"), false);
      assert.equal("create" in repository, false);
      assert.equal("update" in repository, false);
      assert.equal("delete" in repository, false);
    }
  });

  test("retorna erro de validação para data de referência inválida", async () => {
    const result = await createRepository().listEligibleUsers({
      organizationId,
      authorization: authorization(),
      asOf: "invalid-date",
    });

    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.error.code, "VALIDATION_ERROR");
  });
});
