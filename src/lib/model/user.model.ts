import { z } from 'zod';
import { timeSchema } from './time.model';

const roleNames = ['contributor', 'admin', 'user'] as const;
export const roleNameSchema = z.enum(roleNames)
export type RoleNameEnum = z.infer<typeof roleNameSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  name: z.string(),
  role_name: roleNameSchema,
  is_verified: z.boolean().nullish(),
  verified_at: timeSchema.nullish(),
})
