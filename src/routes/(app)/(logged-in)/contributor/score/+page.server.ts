import type { PageServerLoad, Actions } from "./$types.js";
import { contributorScoreSchema, type ContributorScore } from '$lib/model'
import { deleteScoreSchema } from "$lib/model";
import { message, superValidate } from "sveltekit-superforms/server";
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
  delete: async ({ request }) => {
    console.log("======")
    console.log("======")
    const form = await superValidate(request, zod(deleteScoreSchema))
    if (!form.valid) {
      return message(form, { message: "Invalid ID", type: 'error' });
    }
  }
}
