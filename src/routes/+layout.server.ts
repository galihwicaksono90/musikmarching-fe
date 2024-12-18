import type { LayoutServerLoad } from './$types';
import { userSchema } from "$lib/model"

export const load: LayoutServerLoad = async ({ fetch }) => {
  const user = await fetch("http://localhost:8080/auth/me").then((r) => r.json());
  const parsedUser = userSchema.safeParse(user.data);

  if (!parsedUser.success) {
    return {
      user: null
    };
  }

  return {
    user: parsedUser.data
  };
};
