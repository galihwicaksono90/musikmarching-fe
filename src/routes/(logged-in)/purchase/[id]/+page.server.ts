import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const purchase = await fetch(`http://localhost:8080/api/v1/purchase/${params.id}`, {
    method: 'GET',
  }).then((r) => r.json());

  if (purchase?.meta?.code !== 200) {
    throw error(404, 'Thing not found');
  }

  return {
    purchase: purchase.data,
  };
};
