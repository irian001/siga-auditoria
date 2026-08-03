export const userProfileStatuses = ["active", "inactive"] as const;
export type UserProfileStatus = (typeof userProfileStatuses)[number];

export type UserProfile = {
  id: string;
  authSubject: string;
  displayName: string;
  status: UserProfileStatus;
};
