import { z } from 'zod';

const roleNames = ['contributor', 'admin', 'user'] as const;
export const roleNameSchema = z.enum(roleNames)
export type RoleNameEnum = z.infer<typeof roleNameSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  name: z.string(),
  role_name: roleNameSchema,
})
