import { z } from 'zod';
import { timeSchema } from "$lib/model/time.model.js";

export const contributorApplySchema = z.object({
  id: z.string().uuid(),
  full_name: z.string(),
  is_verified: z.boolean(),
  phone_number: z.string(),
  musical_background: z.string().nullish(),
  education: z.string().nullish(),
  experience: z.string().nullish(),
  created_at: timeSchema,
});

export type ContributorApply = z.infer<typeof contributorApplySchema>;
