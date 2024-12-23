import type { PageServerLoad } from './$types';
import { publicScoreSchema } from "$lib/model"
import { z } from "zod";

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch("http://localhost:8080/api/v1/score").then((r) => r.json());

  const scores = z.array(publicScoreSchema).safeParse(res.data);
  if (!scores.success) {
    return {
      scores: []
    };
  }

  return {
    scores: scores.data,
  };
};
