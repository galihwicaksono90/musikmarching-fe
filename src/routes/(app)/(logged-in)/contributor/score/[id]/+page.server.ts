import { message, superValidate, withFiles } from "sveltekit-superforms";
import type { PageServerLoad } from "./$types";
import { contributorScoreSchema, updateScoreFormSchema } from '$lib/model'
import { error, fail, type Actions } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const res = await fetch(`http://localhost:8080/api/v1/contributor/score/${params.id}`).then((r) => r.json());
  if (res?.meta?.code !== 200) {
    throw error(404, 'Score not found');
  }

  const score = contributorScoreSchema.safeParse(res.data)
  if (!score.success) {
    throw error(404, 'Score not found');
  }

  const data = {
    price: score.data?.price,
    title: score.data?.title
  }

  const form = await superValidate(data, zod(updateScoreFormSchema))

  return {
    score: res.data,
    form,
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
    if (form.data.pdfFile) {
      formData.append("pdf_file", form.data.pdfFile)
    }
    if (form.data.audioFile) {
      formData.append("audio_file", form.data.audioFile)
    }

    const res = await event
      .fetch(`http://localhost:8080/api/v1/contributor/score/${event.params.id}`, {
        method: 'PUT',
        body: formData,
      }).then((r) => r.json())
    if (res?.meta?.code !== 200) {
      return message(form, "Something went wrong!")
    }

    return message(form, "Score updated successfully!")
  }
}
