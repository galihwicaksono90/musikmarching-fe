import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const score = await fetch(`http://localhost:8080/api/v1/score/${params.id}`).then((r) => r.json());

  if (score?.meta?.code !== 200) {
    throw error(404, 'Thing not found');
  }

  return {
    score: score.data,
  };
};

export const actions: Actions = {
  purchase: async ({ fetch, params }) => {
    console.log({ params })
    const url = `http://localhost:8080/api/v1/purchase/${params.id}`
    const res = await fetch(url, {
      method: 'POST',
    }).then((r) => r.json());

    console.log({ res })

    throw redirect(303, `/purchase/${res.data}`);
  }
}
