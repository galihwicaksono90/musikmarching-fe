import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const scores = await fetch('http://localhost:8080/api/v1/contributor/scores').then((r) => r.json());

  return {
    scores: scores.data,
  };
};
