import { z } from 'zod';

export const paymentMethodSchema = z.object({
  id: z.string().uuid(),
  method: z.string(),
  account_number: z.string(),
  bank_name: z.string(),
  created_at: z.string(),
})

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
