import { z } from 'zod';

export const verifyContributorSchema = z.object({
  id: z.string().uuid(),
})

