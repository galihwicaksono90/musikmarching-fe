import { purchaseSchema, type Purchase } from "$lib/model";
import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch('http://localhost:8080/api/v1/purchase').then((r) => r.json());

  if (res?.meta?.code !== 200) {
    return {
      purchases: [],
    }
  }

  const parsedPurchases = z.array(purchaseSchema).safeParse(res.data);
  if (!parsedPurchases.success) {
    return {
      purchases: [],
    }
  }

  return {
    purchases: parsedPurchases.data,
  };
};

export const actions: Actions = {
  default: async (event) => {
    const res = await event.fetch("/http://localhost:8080/api/v1/account/contributor-request", {
      method: "POST",
    }).then((r) => r.json());

    if (res.meta.code !== 201) {
      throw fail(400, {
        message: res.meta.message,
      })
    }

    return {
      message: "Contributor request sent successfully",
    }
  }
}
