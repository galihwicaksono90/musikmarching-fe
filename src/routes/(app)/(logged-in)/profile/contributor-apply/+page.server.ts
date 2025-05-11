import type { PageServerLoad, Actions } from "./$types.js";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { contributorApplyFormSchema, type ContributorUpdateFormSchema } from "$lib/components/form"
import { contributorApplySchema } from '$lib/model'
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent, fetch }) => {
  const data = await parent()
  const { user } = data

  if (user?.role_name !== "user" && user?.is_verified) {
    return redirect(303, '/')
  }

  if (user?.role_name === 'contributor') {
    return redirect(303, '/contributor')
  }

  let contributorApplyData
  const res = await fetch("http://localhost:8080/api/v1/account/contributor-apply").then(res => res.json())

  if (res.meta.code === 200) {
    const ress = contributorApplySchema.safeParse(res.data)

    console.log({ res: ress.error })
    if (ress.success) {
      contributorApplyData = ress.data
    }
  }

  let initialData: ContributorUpdateFormSchema | undefined = undefined
  if (contributorApplyData) {
    initialData = {
      full_name: contributorApplyData.full_name,
      musical_background: contributorApplyData.musical_background ?? '',
      education: contributorApplyData.education,
      experience: contributorApplyData.experience,
      phone_number: contributorApplyData.phone_number,
    }
  }

  return {
    form: await superValidate(initialData, zod(contributorApplyFormSchema)),
    contributorApplyData,
  };
};

export const actions: Actions = {
  apply: async (event) => {
    console.log("apply")
    const form = await superValidate(event, zod(contributorApplyFormSchema))
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    console.log(JSON.stringify(form.data, null, 4))

    try {
      const res = await event.fetch("http://localhost:8080/api/v1/account/contributor-apply", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.data),
        credentials: 'include',
      }).then(res => res.json())

      if (res.meta.code !== 201) {
        return message(form, {
          message: res.data ?? res.meta.message,
          type: 'error',
        });
      }
      return message(form, {
        type: 'success',
        message: 'Contributor Registered'
      });
    } catch {
      return fail(400, {
        form,
        message: "Failed to register contributor"
      });
    }
  },
  update: async (event) => {
    const form = await superValidate(event, zod(contributorApplyFormSchema))
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }


    try {
      const res = await event.fetch("http://localhost:8080/api/v1/account/contributor-apply", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.data),
        credentials: 'include',
      }).then(res => res.json())

      if (res.meta.code !== 200) {
        return message(form, {
          message: res.data ?? res.meta.message,
          type: 'error',
        });
      }
      return message(form, {
        type: 'success',
        message: 'Form Updated'
      });
    } catch {
      return fail(400, {
        form,
        message: "Failed to update application"
      });
    }
  }
}
