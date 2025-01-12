import { z } from 'zod';
import { timeSchema } from './time.model'

export const purchaseSchema = z.object({
  id: z.string().uuid(),
  invoice_serial: z.number(),
  account_id: z.string().uuid(),
  score_id: z.string().uuid(),
  price: z.number(),
  title: z.string(),
  is_verified: z.boolean(),
  // verified_at: z.string().datetime().nullish(),
  created_at: timeSchema,
  payment_proof_url: z.string().nullish(),
  paid_at: timeSchema.nullish(),
  full_name: z.string().nullish(),
  // updated_at: z.string().datetime().nullish(),
  // deleted_at: z.string().datetime().nullish(),
})

export type Purchase = z.infer<typeof purchaseSchema>;
