import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const score = await fetch(`http://localhost:8080/api/v1/contributor/score/${params.id}`).then((r) => r.json());

  return {
    score: score.data,
  }
}
