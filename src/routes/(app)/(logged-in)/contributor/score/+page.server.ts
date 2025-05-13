import type { PageServerLoad, Actions } from "./$types.js";
import { contributorScoreSchema, type ContributorScore } from '$lib/model'
import { deleteScoreSchema } from "$lib/model";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ fetch }) => {
  const form = await superValidate(zod(deleteScoreSchema))

  let scores: ContributorScore[] = [];
  const data = await fetch('http://localhost:8080/api/v1/contributor/scores').then((r) => r.json());

  const parsedData = contributorScoreSchema.array().safeParse(data.data);

  if (parsedData.success) {
    scores = parsedData.data
  }

  return { scores, form }
}

export const actions: Actions = {
  delete: async ({ request, fetch }) => {
    const form = await superValidate(request, zod(deleteScoreSchema))
    if (!form.valid) {
      return message(form, { message: "Invalid ID", type: 'error' });
    }

    try {
      const res = await fetch(`http://localhost:8080/api/v1/contributor/score/${form.id}`, {
        method: 'DELETE'
      }).then((r) => r.json());
      console.log({ res })
      if (res.meta.code !== 200) {
        return message(form, { message: "Score not deleted", type: 'success' });
      }
      return message(form, { message: "Score deleted", type: 'success' });
    } catch (e) {
      console.log({ e })
      return message(form, { message: "Score not deleted", type: 'success' });
    }
  }
}
