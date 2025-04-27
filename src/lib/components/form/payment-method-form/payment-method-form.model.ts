import { z } from 'zod';

export const createMethodFormSchema = z.object({
  method: z.string().default('Transfer'),
  bank_name: z.string().min(3),
  account_number: z.string().min(3),
})

export type CreateMethodForm = z.infer<typeof createMethodFormSchema>;
