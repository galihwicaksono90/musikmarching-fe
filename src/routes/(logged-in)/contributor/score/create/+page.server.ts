import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate, withFiles } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  createScore: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, withFiles({
        form,
      }));
    }

    const formData = new FormData();

    formData.append("title", form.data.title);
    formData.append("price", form.data.price.toString());
    formData.append("pdf_file", form.data.pdfFile);

    console.log({ formData })

    const result = await event.fetch("http://localhost:8080/api/v1/contributor/score", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (result?.meta?.code === 201){
      redirect(303, `/contributor/score/${result.data}`);
    }

    return withFiles({
      form,
    });
  },
};
