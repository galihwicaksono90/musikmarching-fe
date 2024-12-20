import type { PageServerLoad, Actions } from "./$types.js";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { contributorRegisterSchema } from "$lib/model"

export const load: PageServerLoad = async ({ parent }) => {
  const data = await parent()

  const initialData = {
    full_name: data.user?.name,
  }

  return {
    form: await superValidate(initialData, zod(contributorRegisterSchema)),
  };
};

export const actions: Actions = {
  register: async (event) => {
    const form = await superValidate(event, zod(contributorRegisterSchema))
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const res = await event.fetch("http://localhost:8080/api/v1/account/contributor-request", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.data),
    }).then((res) => res.json());
    console.log({res})

    if (res?.meta?.code !== 201) {
      return fail(400, {
        form,
      });
    }

    return message(form, "Contributor request sent successfully!");
  }
}
