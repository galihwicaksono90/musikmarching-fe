import { error } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server'
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { publicScoreSchema } from '$lib/model';
import { superValidate } from 'sveltekit-superforms';
import { purchaseScoreFormSchema } from '$lib/components/form';

export const load: PageServerLoad = async ({ fetch, params }) => {
  const score = await fetch(`http://localhost:8080/api/v1/score/${params.id}`).then((r) => r.json());
  if (score?.meta?.code !== 200) {
    throw error(404, 'Thing not found');
  }

  const parsedScore = publicScoreSchema.safeParse(score.data)
  if (!parsedScore.success) {
    throw error(404, 'Thing not found');
  }

  const form = await superValidate({
    id: params.id,
  }, zod(purchaseScoreFormSchema))
  return {
    form,
    score: parsedScore.data,
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(purchaseScoreFormSchema));

    const url = `http://localhost:8080/api/v1/purchase/${form.data.id}`
    const res = await event.fetch(url, {
      method: 'POST',
    }).then(res => res.json())

    redirect(`/profile/purchase/${res.data}`, { type: 'success', message: 'Score berhasil dibeli' }, event.cookies);
  }
}
