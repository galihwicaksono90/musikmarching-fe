import { z } from 'zod';
import { timeSchema } from './time.model';

export const paymentSchema = z.object({
  id: z.string().uuid(),
  purchase_id: z.string().uuid(),
  price: z.number(),
  revenue: z.number(),
  is_verified: z.boolean(),
  payment_method: z.string(),
  account_number: z.string(),
  bank_name: z.string(),
  invoice_serial: z.number(),
  contributor_id: z.string().uuid(),
  title: z.string(),
  created_at: timeSchema,
})

export const paymentStatisticsSchema = z.object({
  total_paid: z.number().default(0),
  latest_payment: timeSchema.nullish(),
})


export type Payment = z.infer<typeof paymentSchema>;
export type PaymentStatistics = z.infer<typeof paymentStatisticsSchema>;

