import type { UserAccessState } from "@/domain/organizationMembership";

export interface UserContextRepository {
  resolveCurrentUserAccess(authSubject: string): Promise<UserAccessState>;
}
