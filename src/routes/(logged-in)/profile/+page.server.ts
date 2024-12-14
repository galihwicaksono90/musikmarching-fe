import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const purchases = await fetch('http://localhost:8080/api/v1/purchase').then((r) => r.json());

  return {
    purchases: purchases.data,
  };
};
