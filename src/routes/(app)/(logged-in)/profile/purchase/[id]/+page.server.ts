import type { PageServerLoad, Actions } from "./$types";
import { purchasedScoreSchema, purchaseSchema } from "$lib/model"
import { uploadPurchaseProofFormSchema } from "$lib/components/form"
import { error } from "@sveltejs/kit";
import { fail, message, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ fetch, params }) => {

  const purchase = await fetch(`http://localhost:8080/api/v1/purchase/${params.id}`, {
    method: 'GET',
  }).then((r) => r.json());

  if (purchase?.meta?.code !== 200) {
    throw error(404, 'Not found');
  }

  const parsedPurchase = purchaseSchema.safeParse(purchase.data);
  if (!parsedPurchase.success) {
    throw error(404, 'Not found');
  }

  if (parsedPurchase.data.is_verified) {
    const purchasedScore = await fetch(`http://localhost:8080/api/v1/purchase/score/${parsedPurchase.data.id}`, {
      method: 'GET',
    }).then((r) => r.json());
    console.log({ purchasedScore })

    const parsedScore = purchasedScoreSchema.safeParse(purchasedScore.data)
    if (parsedScore.success) {
      return {
        purchase: parsedPurchase.data,
        form: await superValidate(zod(uploadPurchaseProofFormSchema)),
        score: parsedScore.data
      };
    }
  }

  return {
    purchase: parsedPurchase.data,
    form: await superValidate(zod(uploadPurchaseProofFormSchema))
  };
};

export const actions: Actions = {
  upload: async (event) => {
    const purchaseId = event.params.id
    const form = await superValidate(event, zod(uploadPurchaseProofFormSchema));
    if (!form.valid) {
      return fail(400, withFiles({
        form,
      }));
    }

    const formData = new FormData();

    formData.append("image_file", form.data.imageFile);

    const result = await event.fetch(`http://localhost:8080/api/v1/purchase/upload-proof/${purchaseId}`, {
      method: "PUT",
      body: formData,
    }).then((res) => res.json());

    if (result?.meta?.code !== 200) {
      return message(withFiles(form), {
        type: 'error',
        message: 'Gagal upload',
      }, {
        status: result.meta.code,
      })
    }

    return message(withFiles(form), {
      type: 'success',
      message: 'Berhasil upload',
    })
  },
};

