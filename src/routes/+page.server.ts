import type { PageServerLoad } from './$types';
import { scoreSchema } from "$lib/model"
import { z } from "zod";

export const load: PageServerLoad = async ({ fetch }) => {
  const scores = await fetch("http://localhost:8080/api/v1/score").then((r) => r.json());
  const parsedScores = z.array(scoreSchema).safeParse(scores.data);
  if (!parsedScores.success) {
    return {
      scores: []
    };
  }

  return {
    scores: parsedScores.data
  };
};
