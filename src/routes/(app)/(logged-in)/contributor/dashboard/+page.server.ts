import {  superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { contributorRegisterSchema } from "$lib/components/form";
import { contributorScoreSchema, type ContributorScore } from "$lib/model";

export const load: PageServerLoad = async ({ fetch, parent }) => {
  let scores: ContributorScore[] = []
  const data = await parent();

  const scoresData = await fetch('http://localhost:8080/api/v1/contributor/scores').then((r) => r.json());
  const parsedScores = contributorScoreSchema.array().safeParse(scoresData.data);
  if (parsedScores.success) {
    scores = parsedScores.data
  }

  return {
    scores,
    form: await superValidate({
      full_name: data.user?.name,
    }, zod(contributorRegisterSchema))
  };
};
