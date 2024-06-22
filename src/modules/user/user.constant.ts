export const userRole = {
  admin: "admin",
  user: "user",
} as const;

export type TUserRole = keyof typeof userRole;
