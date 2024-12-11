import { z } from 'zod'
import type { LayoutServerLoad } from './$types';

const roleName = ['user', 'contributor', 'admin'] as const

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role_name: z.enum(roleName),
})

export const load: LayoutServerLoad = async ({ fetch }) => {
  const user = await fetch("http://localhost:8080/auth/me").then((r) => r.json());
  const parsedUser = await userSchema.safeParseAsync(user);
  if (!parsedUser.success) {
    return {
      user: null
    };
  }

  return {
    user: parsedUser.data
  };
};
