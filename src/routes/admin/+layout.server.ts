import type { Allocation, Category, Instrument } from '$lib/model';
import { instrumentSchema, categorySchema, allocationSchema } from "$lib/model"
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { z } from "zod";

export const load: LayoutServerLoad = async ({ parent }) => {
  const { user } = await parent()

  if (!user || user.role_name !== "admin") {
    throw redirect(303, '/');
  }

  const data: {
    instrumentOptions: Instrument[],
    categoryOptions: Category[],
    allocationOptions: Allocation[],
  } = {
    instrumentOptions: [],
    categoryOptions: [],
    allocationOptions: [],
  }

  const tagsData = await fetch("http://localhost:8080/api/v1/score/tags").then((r) => r.json());

  const tags = z.object({
    instruments: z.array(instrumentSchema),
    categories: z.array(categorySchema),
    allocations: z.array(allocationSchema),
  }).safeParse(tagsData.data);
  if (tags.success) {
    data.categoryOptions = tags.data.categories
    data.instrumentOptions = tags.data.instruments
    data.allocationOptions = tags.data.allocations
  }

  return {
    user,
    ...data,
  };
};
