import type { PageServerLoad, Actions } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { paymentMethodSchema } from "$lib/model";
import { createMethodFormSchema } from "$lib/components/form";
import { superValidate, message } from "sveltekit-superforms";
import { paymentSchema, type Payment, paymentStatisticsSchema, type PaymentStatistics } from '$lib/model'

export const load: PageServerLoad = async ({ fetch }) => {
  let stat: PaymentStatistics = {
    total_paid: 0,
    latest_payment: null,
  }

  const statRes = await fetch('http://localhost:8080/api/v1/contributor/payments/statistics').then((r) => r.json());
  const parsedStat = paymentStatisticsSchema.safeParse(statRes.data);
  if (parsedStat.success) {
    stat = parsedStat.data;
  }

  const paymentRes = await fetch('http://localhost:8080/api/v1/contributor/payments').then((r) => r.json());
  let payment: Payment[] = [];
  const parsedPayment = paymentSchema.array().safeParse(paymentRes.data);
  if (parsedPayment.success) {
    payment = parsedPayment.data;
  }

  const res = await fetch('http://localhost:8080/api/v1/contributor/payment-method').then((r) => r.json());
  const parsedPaymentMethod = paymentMethodSchema.safeParse(res.data);

  let paymentMethod = null;
  if (parsedPaymentMethod.success) {
    paymentMethod = parsedPaymentMethod.data;
  }

  const form = paymentMethod
    ? await superValidate(paymentMethod,
      zod(createMethodFormSchema))
    : await superValidate(zod(createMethodFormSchema))

  return {
    stat,
    payment,
    paymentMethod,
    form,
  }
};

export const actions: Actions = {
  upsertPaymentMethod: async (event) => {
    const form = await superValidate(event, zod(createMethodFormSchema));
    if (!form.valid) {
      return message(form, {
        message: "Gagal membuat metode pembayaran",
        type: 'error'
      }, {
        status: 400
      })
    }

    const res = await event.fetch("http://localhost:8080/api/v1/contributor/payment-method", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.data),
      credentials: 'include',
    })

    if (res.status !== 200) {
      return message(form, {
        message: "Gagal membuat metode pembayaran",
        type: 'error'
      }, {
        status: 400
      })
    }

    return message(form, { type: 'success', message: "Metode pembayaran berhasil dibuat" }, { removeFiles: true })
  },
};
