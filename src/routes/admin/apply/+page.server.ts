import type { PageServerLoad } from './$types';
import { contributorApplySchema, type ContributorApply } from '$lib/model'

export const load: PageServerLoad = async ({ fetch }) => {
  let applications: ContributorApply[] = []
  try {
    const res = await fetch('http://localhost:8080/api/v1/admin/application').then((r) => r.json());

    const parsedApplications = contributorApplySchema.array().safeParse(res.data);
    console.log({ parsedApplications })
    if (parsedApplications.success) {
      applications = parsedApplications.data
    }

    console.log({ applications })

  } catch (e) {
    console.error(e)
  }

  return {
    applications
  };
};
