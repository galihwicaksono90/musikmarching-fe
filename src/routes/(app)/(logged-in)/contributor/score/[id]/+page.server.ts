import { message, superValidate, withFiles } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { contributorScoreSchema, } from '$lib/model'
import { updateScoreFormSchema } from '$lib/components/form'
import { error, fail, type Actions } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ fetch, params, parent }) => {
  const { tags } = await parent();

  const res = await fetch(`http://localhost:8080/api/v1/contributor/score/${params.id}`).then((r) => r.json());

  if (res?.meta?.code !== 200) {
    throw error(404, 'Score not found');
  }

  const score = contributorScoreSchema.safeParse(res.data)
  if (!score.success) {
    throw error(404, 'Score not found');
  }

  const data = {
    price: score.data.price,
    title: score.data.title,
    description: score.data.description ?? undefined,
    difficulty: score.data.difficulty,
    contentType: score.data.content_type,
    categories: score.data.categories,
    instruments: score.data.instruments,
    allocations: score.data.allocations,
  }

  const form = await superValidate(data, zod(updateScoreFormSchema))

  return {
    score: res.data,
    form,
    tags,
  }
}


export const actions: Actions = {
  updateScore: async (event) => {
    const form = await superValidate(event, zod(updateScoreFormSchema))
    if (!form.valid) {
      return fail(400, withFiles({
        form,
      }));
    }

    const formData = new FormData();
    formData.append("title", form.data.title)
    formData.append("price", form.data.price.toString())
    formData.append("description", form.data.description)
    formData.append("difficulty", form.data.difficulty);
    formData.append("content_type", form.data.contentType);
    formData.append("instruments", form.data.instruments.join(","));
    formData.append("categories", form.data.categories.join(","));
    formData.append("allocations", form.data.allocations.join(","));

    if (form.data.pdfFile) {
      formData.append("pdf_file", form.data.pdfFile)
    }
    if (form.data.audioFile) {
      formData.append("audio_file", form.data.audioFile)
    }

    try {

      const res = await event
        .fetch(`http://localhost:8080/api/v1/contributor/score/${event.params.id}`, {
          method: 'PUT',
          body: formData,
        }).then((r) => r.json())

      if (res?.meta?.code !== 200) {
        return message(withFiles(form), {
          type: 'error',
          message: 'Something went wrong',
        })
      }

      return message(withFiles(form), {
        type: 'success',
        message: "Score updated successfully!"
      })
    } catch (e) {
      return fail(500, withFiles(form))
    }
  }
}
