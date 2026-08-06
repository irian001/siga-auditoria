import assert from "node:assert/strict";
import { describe, test } from "node:test";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { AuthorizationContext } from "../../src/domain/authorization";
import { createSupabaseUserDirectoryRepository } from "../../src/data/supabase/supabaseUserDirectoryRepository";

const organizationId = "org-a";

function authorization(
  permissionCodes: AuthorizationContext["permissionCodes"] = ["users.view"],
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

type FakeBuilder = {
  calls: Array<{ method: string; args: unknown[] }>;
  select: (columns: string) => FakeBuilder;
  eq: (column: string, value: unknown) => FakeBuilder;
  lte: (column: string, value: unknown) => FakeBuilder;
  or: (expression: string) => FakeBuilder;
  then: <TResult1 = unknown, TResult2 = never>(
    onfulfilled?: ((value: unknown) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ) => Promise<TResult1 | TResult2>;
};

function createFakeSupabase(data: unknown, error: unknown = null) {
  const calls: Array<{ method: string; args: unknown[] }> = [];
  const builder: FakeBuilder = {
    calls,
    select(columns) {
      calls.push({ method: "select", args: [columns] });
      return builder;
    },
    eq(column, value) {
      calls.push({ method: "eq", args: [column, value] });
      return builder;
    },
    lte(column, value) {
      calls.push({ method: "lte", args: [column, value] });
      return builder;
    },
    or(expression) {
      calls.push({ method: "or", args: [expression] });
      return builder;
    },
    then(onfulfilled, onrejected) {
      return Promise.resolve({ data, error }).then(onfulfilled, onrejected);
    },
  };

  return {
    calls,
    client: {
      from(table: string) {
        calls.push({ method: "from", args: [table] });
        return builder;
      },
    } as unknown as SupabaseClient,
  };
}

describe("SupabaseUserDirectoryRepository", () => {
  test("consulta apenas o contexto autorizado e mapeia o contrato mínimo", async () => {
    const fake = createFakeSupabase([
      {
        id: "membership-user-1",
        organization_id: organizationId,
        user_profile_id: "profile-1",
        status: "active",
        active_from: "2026-08-01T00:00:00.000Z",
        active_to: null,
        user_profiles: { id: "profile-1", display_name: "Ana Ativa", status: "active" },
      },
    ]);

    const result = await createSupabaseUserDirectoryRepository(fake.client).listEligibleUsers({
      organizationId,
      authorization: authorization(),
      asOf: "2026-08-06T12:00:00.000Z",
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
    assert.deepEqual(fake.calls[0], { method: "from", args: ["organization_memberships"] });
    assert.ok(
      fake.calls.some((call) => call.method === "eq" && call.args[0] === "organization_id"),
    );
    assert.ok(fake.calls.some((call) => call.method === "eq" && call.args[0] === "status"));
  });

  test("não consulta sem users.view ou com outra organização", async () => {
    const fake = createFakeSupabase([]);
    const repository = createSupabaseUserDirectoryRepository(fake.client);

    const withoutPermission = await repository.listEligibleUsers({
      organizationId,
      authorization: authorization(["engagements.manage"]),
    });
    const otherOrganization = await repository.listEligibleUsers({
      organizationId,
      authorization: authorization(["users.view"], "org-b"),
    });

    assert.equal(withoutPermission.ok, false);
    assert.equal(otherOrganization.ok, false);
    assert.equal(fake.calls.length, 0);
  });

  test("mapeia negação de RLS como acesso proibido", async () => {
    const fake = createFakeSupabase(null, { code: "42501", status: 403 });
    const result = await createSupabaseUserDirectoryRepository(fake.client).listEligibleUsers({
      organizationId,
      authorization: authorization(),
    });

    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.error.code, "FORBIDDEN");
  });

  test("rejeita data de referência inválida", async () => {
    const fake = createFakeSupabase([]);
    const result = await createSupabaseUserDirectoryRepository(fake.client).listEligibleUsers({
      organizationId,
      authorization: authorization(),
      asOf: "invalid-date",
    });

    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.error.code, "VALIDATION_ERROR");
    assert.equal(fake.calls.length, 0);
  });
});
