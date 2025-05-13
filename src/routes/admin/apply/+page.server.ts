import type { PageServerLoad, Actions } from './$types';
import { contributorApplySchema, type ContributorApply } from '$lib/model'
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { verifyContributorSchema } from '$lib/components/table'

export const load: PageServerLoad = async ({ fetch }) => {
  let applications: ContributorApply[] = []
  try {
    const res = await fetch('http://localhost:8080/api/v1/admin/application').then((r) => r.json());

    const parsedApplications = contributorApplySchema.array().safeParse(res.data);
    if (parsedApplications.success) {
      applications = parsedApplications.data
    }
  } catch (e) {
    console.error(e)
  }

  return {
    applications,
    form: await superValidate(zod(verifyContributorSchema))
  };
};

export const actions: Actions = {
  verify: async (event) => {
    const form = await superValidate(event, zod(verifyContributorSchema));
    const res = await event.fetch(`http://localhost:8080/api/v1/admin/application/${form.id}`, {
      method: "POST",
    })

    // TODO: handle request
    console.log({ res })
  }
}
