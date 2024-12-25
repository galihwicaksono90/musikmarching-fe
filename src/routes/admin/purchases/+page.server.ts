import { purchaseSchema } from "$lib/model"
import { fail } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch("http://localhost:8080/api/v1/admin/purchases").then(res => res.json())
  const purchases = purchaseSchema.array().safeParse(res.data)
  if (!purchases.success) {
    return {
      purchases: []
    }
  }

  return {
    purchases: purchases.data
  }
}

export const actions: Actions = {
  verify: async ({ url, fetch }) => {
    const id = url.searchParams.get("id")
    if (!id) {
      throw fail(400, {
        message: 'id is required'
      })
    }

    const res = await fetch(`http://localhost:8080/api/v1/admin/purchase/verify/${id}`, {
      method: "POST"
    })

    return {
      message: res.statusText
    }
  }
}
