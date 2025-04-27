import type { PageServerLoad } from "./$types.js";
import { contributorScoreSchema } from '$lib/model'

export const load: PageServerLoad = async ({ fetch }) => {
  const data = await fetch('http://localhost:8080/api/v1/contributor/scores').then((r) => r.json());
  console.log(JSON.stringify(data, null, 4))

  const parsedData = contributorScoreSchema.array().safeParse(data.data);

  if (!parsedData.success) {
    return {
      scores: []
    }
  }

  return { scores: parsedData.data }
}
