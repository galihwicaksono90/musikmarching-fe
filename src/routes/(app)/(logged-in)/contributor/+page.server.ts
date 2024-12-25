import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { contributorRegisterSchema } from "$lib/model";

export const load: PageServerLoad = async ({ fetch, parent }) => {
  const data = await parent();

  const scores = await fetch('http://localhost:8080/api/v1/contributor/scores').then((r) => r.json());

  return {
    scores: scores.data,
    form: await superValidate({
      full_name: data.user?.name,
    }, zod(contributorRegisterSchema))
  };
};
