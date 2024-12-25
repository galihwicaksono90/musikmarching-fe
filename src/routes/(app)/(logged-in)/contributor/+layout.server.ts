import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ parent }) => {
  const { user } = await parent()

  if (!user || user.role_name !== "contributor") {
    throw redirect(303, '/');
  }

  return {
    user,
  };
};
