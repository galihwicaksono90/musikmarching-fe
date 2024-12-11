import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const scores = await fetch("http://localhost:8080/api/v1/score").then((r) => r.json());
  const me = await fetch("http://localhost:8080/auth/me").then((r) => r.json());

  return {
    me,
    scores,
  };
};
