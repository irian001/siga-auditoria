export const roleStatuses = ["active", "inactive"] as const;
export type RoleStatus = (typeof roleStatuses)[number];

export type Role = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  description: string | null;
  status: RoleStatus;
  isSystem: boolean;
};
