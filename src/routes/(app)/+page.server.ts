import type { Actions, PageServerLoad } from './$types';
import { publicScoreSchema, instrumentSchema, categorySchema, allocationSchema } from "$lib/model"
import type { PublicScore, Category, Instrument, Allocation } from "$lib/model"
import { z } from "zod";
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { mainSearchFormSchema } from '$lib/components/form/main-search-form';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const data: {
    scores: PublicScore[];
    instrumentOptions: Instrument[],
    categoryOptions: Category[],
    allocationOptions: Allocation[],
  } = {
    scores: [],
    instrumentOptions: [],
    categoryOptions: [],
    allocationOptions: [],
  }

  const categoriesParams = url.searchParams.getAll('categories');
  const instrumentsParams = url.searchParams.getAll('instruments');
  const allocationsParams = url.searchParams.getAll('allocations');

  const urlParams = url.searchParams.toString()
  const urlParamsString = urlParams.length > 0 ? `?${urlParams}` : ''

  const scoresData = await fetch("http://localhost:8080/api/v1/score" + urlParamsString).then((r) => r.json());

  const scores = z.array(publicScoreSchema).safeParse(scoresData.data);

  if (scores.success) {
    data.scores = scores.data;
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


  const form = await superValidate({
    title: url.searchParams.get('title') ?? '',
    instrument: instrumentsParams,
    category: categoriesParams,
    allocation: allocationsParams,
    difficulty: url.searchParams.get('difficulty') ?? null,
    contentType: url.searchParams.get('content_type') ?? null,
  }, zod(mainSearchFormSchema));

  return { ...data, form };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(mainSearchFormSchema));
    const url = new URL(event.url.origin);

    if (form.data.title && form.data.title.length > 0) {
      url.searchParams.append('title', form.data.title);
    }

    if (form.data.difficulty) {
      url.searchParams.append('difficulty', form.data.difficulty);
    }

    if (form.data.contentType) {
      url.searchParams.append('content_type', form.data.contentType);
    }


    form.data.instrument.forEach((i) => {
      url.searchParams.append('instruments', i);
    });

    form.data.category.forEach((i) => {
      url.searchParams.append('categories', i);
    });

    form.data.allocation.forEach((i) => {
      url.searchParams.append('allocations', i);
    });

    redirect(303, url.href)
  },
}
