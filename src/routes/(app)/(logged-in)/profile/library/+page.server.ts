import { libraryScoreSchema } from "$lib/model";
import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, url }) => {
  const res = await fetch('http://localhost:8080/api/v1/purchase/scores/library').then((r) => r.json());

  if (res?.meta?.code !== 200) {
    return {
      scores: [],
      count: 0
    }
  }

  const parsedScores = z.object({ scores: libraryScoreSchema.array(), count: z.number() }).safeParse(res.data);
  if (!parsedScores.success) {
    return {
      scores: [],
      count: 0
    }
  }

  return {
    scores: parsedScores.data.scores,
    count: parsedScores.data.count
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
