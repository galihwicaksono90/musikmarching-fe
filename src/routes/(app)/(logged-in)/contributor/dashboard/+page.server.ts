import type { PageServerLoad } from "./$types";
import { contributorStatisticsSchema, contributorBestSellingScoreSchema, type ContributorBestSellingScore } from "$lib/model";

export const load: PageServerLoad = async ({ fetch }) => {
  const statisticsData = await fetch('http://localhost:8080/api/v1/contributor/scores/statistics').then((r) => r.json());
  const bestSellingData = await fetch('http://localhost:8080/api/v1/contributor/scores/best-selling').then((r) => r.json());

  let scores: ContributorBestSellingScore[] = []
  const parsedStatistics = contributorStatisticsSchema.safeParse(statisticsData.data);
  const parsedScores = contributorBestSellingScoreSchema.array().safeParse(bestSellingData.data);
  if (parsedScores.success) {
    scores = parsedScores.data;
  }

  if (!parsedStatistics.success) {
    return {
      scores,
      statisics: {
        revenue: 0,
        score_count: 0,
        purchase_count: 0,
      }
    }
  }

  return {
    scores,
    statistics: parsedStatistics.data,
  };
};
