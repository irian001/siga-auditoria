import assert from "node:assert/strict";
import { describe, test } from "node:test";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { AuthorizationContext } from "../../src/domain/authorization.ts";
import { createSupabaseEngagementTeamPeriodsRepository } from "../../src/data/supabase/supabaseEngagementTeamRepository.ts";

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

type FakeBuilder = {
  calls: Array<{ method: string; args: unknown[] }>;
  table: string;
  select: (columns: string) => FakeBuilder;
  insert: (values: unknown) => FakeBuilder;
  eq: (column: string, value: unknown) => FakeBuilder;
  single: () => Promise<unknown>;
  then: <TResult1 = unknown, TResult2 = never>(
    onfulfilled?: ((value: unknown) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ) => Promise<TResult1 | TResult2>;
};

function createFakeSupabase(
  teamData: unknown,
  periodsData: unknown,
  error: unknown = null,
  insertedData: unknown = null,
) {
  const calls: Array<{ method: string; args: unknown[] }> = [];
  let table = "";
  let inserting = false;
  const builder: FakeBuilder = {
    calls,
    table,
    select(columns) {
      calls.push({ method: "select", args: [columns] });
      return builder;
    },
    insert(values) {
      inserting = true;
      calls.push({ method: "insert", args: [values] });
      return builder;
    },
    eq(column, value) {
      calls.push({ method: "eq", args: [column, value] });
      return builder;
    },
    single() {
      return Promise.resolve({ data: insertedData, error });
    },
    then(onfulfilled, onrejected) {
      const data = inserting
        ? insertedData
        : table === "engagement_team_members"
          ? teamData
          : periodsData;
      return Promise.resolve({ data, error }).then(onfulfilled, onrejected);
    },
  };

  return {
    calls,
    client: {
      from(nextTable: string) {
        table = nextTable;
        builder.table = nextTable;
        calls.push({ method: "from", args: [nextTable] });
        return builder;
      },
    } as unknown as SupabaseClient,
  };
}

describe("SupabaseEngagementTeamPeriodsRepository", () => {
  test("consulta os dois contratos somente no trabalho e organização autorizados", async () => {
    const fake = createFakeSupabase(
      [
        {
          id: "team-1",
          organization_id: organizationId,
          engagement_id: engagementId,
          membership_id: "membership-1",
          engagement_role_id: "role-1",
          active_from: "2026-08-01",
          active_to: null,
          status: "active",
          organization_memberships: {
            id: "membership-1",
            organization_id: organizationId,
            user_profile_id: "profile-1",
            user_profiles: { id: "profile-1", display_name: "Ana Auditora", status: "active" },
          },
          engagement_roles: {
            id: "role-1",
            organization_id: organizationId,
            code: "auditor",
            name: "Auditor",
            status: "active",
          },
        },
      ],
      [
        {
          id: "period-1",
          organization_id: organizationId,
          engagement_id: engagementId,
          label: "Exercício 2026",
          start_date: "2026-01-01",
          end_date: "2026-12-31",
          status: "active",
        },
      ],
    );

    const result = await createSupabaseEngagementTeamPeriodsRepository(fake.client).getByEngagement(
      {
        organizationId,
        engagementId,
        authorization: authorization(),
      },
    );

    assert.deepEqual(result, {
      ok: true,
      data: {
        teamMembers: [
          {
            id: "team-1",
            organizationId,
            engagementId,
            membershipId: "membership-1",
            userProfileId: "profile-1",
            displayName: "Ana Auditora",
            roleId: "role-1",
            roleCode: "auditor",
            roleName: "Auditor",
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
      },
    });
    assert.deepEqual(
      fake.calls.filter((call) => call.method === "from").map((call) => call.args[0]),
      ["engagement_team_members", "engagement_periods"],
    );
    assert.ok(
      fake.calls.some(
        (call) =>
          call.method === "eq" &&
          call.args[0] === "organization_id" &&
          call.args[1] === organizationId,
      ),
    );
    assert.ok(
      fake.calls.some(
        (call) =>
          call.method === "eq" && call.args[0] === "engagement_id" && call.args[1] === engagementId,
      ),
    );
  });

  test("não consulta sem permissão ou com outra organização", async () => {
    const fake = createFakeSupabase([], []);
    const repository = createSupabaseEngagementTeamPeriodsRepository(fake.client);

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
    assert.equal(fake.calls.length, 0);
  });

  test("mapeia negação de RLS como acesso proibido", async () => {
    const fake = createFakeSupabase(null, null, { code: "42501", status: 403 });
    const result = await createSupabaseEngagementTeamPeriodsRepository(fake.client).getByEngagement(
      {
        organizationId,
        engagementId,
        authorization: authorization(),
      },
    );

    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.error.code, "FORBIDDEN");
  });

  test("associa participante somente com engagements.manage", async () => {
    const fake = createFakeSupabase([], [], null, {
      id: "team-2",
      organization_id: organizationId,
      engagement_id: engagementId,
      membership_id: "membership-2",
      engagement_role_id: "role-reviewer",
      active_from: "2026-08-06",
      active_to: null,
      status: "active",
      organization_memberships: {
        id: "membership-2",
        organization_id: organizationId,
        user_profile_id: "profile-2",
        user_profiles: { id: "profile-2", display_name: "Bruno Revisor", status: "active" },
      },
      engagement_roles: {
        id: "role-reviewer",
        organization_id: organizationId,
        code: "reviewer",
        name: "Revisor",
        status: "active",
      },
    });
    const repository = createSupabaseEngagementTeamPeriodsRepository(fake.client);
    const result = await repository.assignMember(
      {
        organizationId,
        engagementId,
        authorization: authorization(["engagements.view", "engagements.manage"]),
      },
      {
        organizationId,
        engagementId,
        membershipId: "membership-2",
        roleId: "role-reviewer",
        activeFrom: "2026-08-06",
      },
    );

    assert.equal(result.ok, true);
    assert.ok(fake.calls.some((call) => call.method === "insert"));
    assert.ok(fake.calls.some((call) => call.method === "select"));
  });
});
