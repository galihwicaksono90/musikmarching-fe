import type { Actions, PageServerLoad } from './$types';
import { publicScoreSchema, instrumentSchema, categorySchema, allocationSchema } from "$lib/model"
import type { PublicScore, Category, Instrument, Allocation } from "$lib/model"
import { z } from "zod";
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { mainSearchFormSchema } from '$lib/components/form/main-search-form';
import { redirect } from '@sveltejs/kit';
import { ParamsUtil } from '$lib/util';

export const load: PageServerLoad = async ({ fetch, url }) => {
  const params = new ParamsUtil({ url: new URL(url) })
  const data: {
    scores: PublicScore[];
    instrumentOptions: Instrument[],
    categoryOptions: Category[],
    allocationOptions: Allocation[],
    count: number,
  } = {
    scores: [],
    instrumentOptions: [],
    categoryOptions: [],
    allocationOptions: [],
    count: 0,
  }

  const categoriesParams = params.getParams('categories');
  const instrumentsParams = params.getParams('instruments');
  const allocationsParams = params.getParams('allocations');

  const urlParamsString = params.getUrlParamsString()

  const scoresData = await fetch("http://localhost:8080/api/v1/score" + urlParamsString).then((r) => r.json());

  const scores = z.object({ scores: publicScoreSchema.array(), count: z.number() }).safeParse(scoresData.data);

  if (scores.success) {
    data.scores = scores.data.scores;
    data.count = scores.data.count;
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
    difficulty: url.searchParams.get('difficulty') ?? undefined,
    contentType: url.searchParams.get('content_type') ?? undefined,
  }, zod(mainSearchFormSchema));


  const page = params.getPageFromParams();
  const limit = params.limit;
  return { ...data, form, page, limit };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(mainSearchFormSchema));
    const params = new ParamsUtil({ url: new URL(event.url.origin) })

    if (form.data.title && form.data.title.length > 0) {
      params.set('title', form.data.title);
    }

    if (form.data.difficulty) {
      params.set('difficulty', form.data.difficulty);
    }

    if (form.data.contentType) {
      params.set('content_type', form.data.contentType);
    }

    form.data.instrument.forEach((i) => {
      params.append('instruments', i);
    });

    form.data.category.forEach((i) => {
      params.append('categories', i);
    });

    form.data.allocation.forEach((i) => {
      params.append('allocations', i);
    });

    redirect(303, params.url.href)
  },
}
