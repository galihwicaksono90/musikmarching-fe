import type { PageServerLoad } from './$types';
import { z } from 'zod';

const scoreSchema = z.object({
  id: z.string(),
  contributor_id: z.string(),
  title: z.string(),
  price: z.number(),
  is_verified: z.boolean(),
  pdf_url: z.string().nullish(),
  music_url: z.string().nullish(),
})

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
