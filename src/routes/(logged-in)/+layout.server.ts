import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({  parent }) => {
  const { user } = await parent()

  console.log({user})
  if (!user) {
    console.log('unauthorized')
    throw redirect(303, '/');
  }

  return {
    user,
  };
};
