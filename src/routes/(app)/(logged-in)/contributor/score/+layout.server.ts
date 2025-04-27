import type { LayoutServerLoad } from './$types';
import type { Category, Instrument, Allocation } from "$lib/model"
import { instrumentSchema, categorySchema, allocationSchema } from "$lib/model"
import { z } from 'zod';

export const load: LayoutServerLoad = async () => {
  const tags: {
    instrumentOptions: Instrument[],
    categoryOptions: Category[],
    allocationOptions: Allocation[],
  } = {
    instrumentOptions: [],
    categoryOptions: [],
    allocationOptions: [],
  }

  const tagsData = await fetch("http://localhost:8080/api/v1/score/tags").then((r) => r.json());

  const parsedTags = z.object({
    instruments: z.array(instrumentSchema),
    categories: z.array(categorySchema),
    allocations: z.array(allocationSchema),
  }).safeParse(tagsData.data);
  if (parsedTags.success) {
    tags.categoryOptions = parsedTags.data.categories
    tags.instrumentOptions = parsedTags.data.instruments
    tags.allocationOptions = parsedTags.data.allocations
  }

  return {
    tags,
  };
};

