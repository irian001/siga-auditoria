import { can } from "@/domain/authorization";
import type { OperationResult } from "@/domain/contracts";
import type { OrganizationMembership } from "@/domain/organizationMembership";
import type { UserProfile } from "@/domain/user";
import type { EligibleOrganizationUser, UserDirectoryQueryContext } from "@/domain/userDirectory";
import type { UserDirectoryRepository } from "@/data/userDirectoryRepository";
import { createAppError } from "@/lib/app-error";

type DirectoryProfileSeed = Pick<UserProfile, "id" | "displayName" | "status">;

export type MockUserDirectorySeed = {
  profiles: DirectoryProfileSeed[];
  memberships: OrganizationMembership[];
};

function isCurrentlyEligibleMembership(
  membership: OrganizationMembership,
  asOf: number,
): membership is OrganizationMembership & { activeFrom: string } {
  if (membership.status !== "active" || membership.activeFrom === null) return false;

  const activeFrom = Date.parse(membership.activeFrom);
  const activeTo = membership.activeTo === null ? null : Date.parse(membership.activeTo);

  return (
    Number.isFinite(activeFrom) &&
    activeFrom <= asOf &&
    (activeTo === null || (Number.isFinite(activeTo) && activeTo > asOf))
  );
}

export class MockUserDirectoryRepository implements UserDirectoryRepository {
  private readonly profiles: DirectoryProfileSeed[];
  private readonly memberships: OrganizationMembership[];

  public constructor(seed: MockUserDirectorySeed) {
    this.profiles = seed.profiles.map((profile) => ({ ...profile }));
    this.memberships = seed.memberships.map((membership) => ({ ...membership }));
  }

  public async listEligibleUsers(
    context: UserDirectoryQueryContext,
  ): Promise<OperationResult<EligibleOrganizationUser[]>> {
    if (!context.organizationId || context.authorization.status !== "active") {
      return {
        ok: false,
        error: createAppError("UNAUTHORIZED", "O contexto organizacional não está disponível."),
      };
    }

    if (!can(context.authorization, "users.view", context.organizationId)) {
      return {
        ok: false,
        error: createAppError(
          "FORBIDDEN",
          "Você não possui permissão para consultar o diretório de usuários.",
          true,
        ),
      };
    }

    const asOf = context.asOf ? Date.parse(context.asOf) : Date.now();
    if (!Number.isFinite(asOf)) {
      return {
        ok: false,
        error: createAppError(
          "VALIDATION_ERROR",
          "A data de referência do diretório é inválida.",
          true,
        ),
      };
    }

    const profileById = new Map(this.profiles.map((profile) => [profile.id, profile]));
    const items = this.memberships
      .filter(
        (membership) =>
          membership.organizationId === context.organizationId &&
          isCurrentlyEligibleMembership(membership, asOf),
      )
      .map((membership) => {
        const profile = profileById.get(membership.userProfileId);
        if (!profile || profile.status !== "active") return null;

        return {
          userProfileId: profile.id,
          displayName: profile.displayName,
          membershipId: membership.id,
          organizationId: membership.organizationId,
          membershipStatus: "active" as const,
          activeFrom: membership.activeFrom,
          activeTo: membership.activeTo,
        };
      })
      .filter((item): item is EligibleOrganizationUser => item !== null)
      .sort((left, right) => left.displayName.localeCompare(right.displayName, "pt-BR"));

    return { ok: true, data: items };
  }
}
