import type { PageServerLoad, Actions } from "./$types.js";
import { superValidate, withFiles } from "sveltekit-superforms";
import { createScoreFormSchema } from "$lib/components/form";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
  const { tags } = await parent();

  return {
    tags,
    form: await superValidate(zod(createScoreFormSchema)),
  };
};

export const actions: Actions = {
  createScore: async (event) => {
    const form = await superValidate(event, zod(createScoreFormSchema));
    if (!form.valid) {
      return fail(400, withFiles({
        form,
      }));
    }


    const formData = new FormData();

    formData.append("title", form.data.title);
    formData.append("price", form.data.price.toString());
    formData.append("pdf_file", form.data.pdfFile);
    formData.append("audio_file", form.data.audioFile);
    formData.append("difficulty", form.data.difficulty);
    formData.append("content_type", form.data.contentType);
    formData.append("description", form.data.description);
    formData.append("instruments", form.data.instruments.join(","));
    formData.append("categories", form.data.categories.join(","));
    formData.append("allocations", form.data.allocations.join(","));

    const result = await event.fetch("http://localhost:8080/api/v1/contributor/score", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (result?.meta?.code === 201) {
      redirect(303, `/contributor/score/${result.data}`);
    }

    return {
      form: withFiles(form)
    }
  },
};
