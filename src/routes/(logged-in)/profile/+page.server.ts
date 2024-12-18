import { purchaseSchema, type Purchase } from "$lib/model";
import type { PageServerLoad } from "./$types";
import { z } from "zod";

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch('http://localhost:8080/api/v1/purchase').then((r) => r.json());

  let purchases: Purchase[] = []

  if (res?.meta?.code !== 200) {
    purchases = [];
  }

  const parsedPurchases = z.array(purchaseSchema).safeParse(res.data);
  if (parsedPurchases.success) {
    purchases = parsedPurchases.data;
  }

  return {
    purchases,
  };
};
