import type { PageServerLoad, Actions } from './$types';
import { contributorAccountScoreSchema } from "$lib/model";
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch('http://localhost:8080/api/v1/admin/contributors').then((r) => r.json());
  const contributor = contributorAccountScoreSchema.array().default([]).safeParse(res.data);

  if (!contributor.success) {
    return {
      contributors: []
    }
  }

  return {
    contributors: contributor.data,
  }
}

export const actions: Actions = {
  verify: async ({ fetch, url }) => {
    const id = url.searchParams.get('id');
    if (!id) {
      throw fail(400, {
        message: 'id is required'
      })
    }

    const res = await fetch(`http://localhost:8080/api/v1/admin/contributor/verify/${id}`, {
      method: 'POST',
    });

    return {
      message: res.statusText
    }
  }
} 
