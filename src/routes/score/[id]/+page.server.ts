import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const score = await fetch(`http://localhost:8080/api/v1/score/${params.id}`).then((r) => r.json());

  return {
    score,
  };
};

export const actions: Actions = {
  post: async ({ fetch, params }) => {
    const res = await fetch(`http://localhost:8080/api/v1/score/purchase/${params.id}`, {
      method: 'POST'
    }).then((r) => r.json()).catch(e => console.error(e));

    console.log({ res })
  }
}
