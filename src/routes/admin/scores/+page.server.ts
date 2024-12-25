import type { PageServerLoad, Actions } from './$types';

import { adminScoreSchema } from '$lib/model'
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
  const res = await event.fetch('http://localhost:8080/api/v1/admin/scores').then((r) => r.json());

  const scores = adminScoreSchema.array().safeParse(res.data);
  if (!scores.success) {
    console.log({ errors: scores.error })
    return {
      scores: []
    }

  }

  return {
    scores: scores.data
      .sort(function (a, b) {
        if (a.is_verified && !b.is_verified) {
          return 1;
        } else if (!a.is_verified && b.is_verified) {
          return -1;
        } else {
          return 0
        }
      }),
  };
};

export const actions: Actions = {
  verify: async (event) => {
    const id = event.url.searchParams.get("id")

    if (!id) {
      throw fail(400, { message: "Missing id", success: false })
    }

    const res = await event
      .fetch(`http://localhost:8080/api/v1/admin/score/verify/${id}`, {
        method: "POST",
      })
      .then((r) => r.json())
      .catch((e) => console.error(e));

    console.log({ res })

    if (res.meta.code !== 200) {
      throw fail(400, { message: "Failed to verify score" })
    }

    return {
      message: "Score verified successfully"
    }
  }
}
