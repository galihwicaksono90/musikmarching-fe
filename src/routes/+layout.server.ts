import type { LayoutServerLoad } from './$types';
import { userSchema } from "$lib/model"
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ fetch }) => {
  const user = await fetch("http://localhost:8080/api/v1/auth/me", {
    credentials: 'include',
  }).then((r) => r.json());

  const parsedUser = userSchema.safeParse(user.data);

  if (!parsedUser.success) {
    return {
      user: null
    };
  }

  return {
    user: parsedUser.data,
  };
};
