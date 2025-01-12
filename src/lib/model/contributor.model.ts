import {z} from 'zod';
import {timeSchema} from './time.model'
import { scoreSchema } from './score.model';

export const contributorSchema = z.object({
  id: z.string().uuid(),
  is_verified: z.boolean(),
  verified_at: timeSchema.nullish(),
  created_at: timeSchema,
  updated_at: timeSchema.nullish(),
  deleted_at: timeSchema.nullish(),
  full_name: z.string(),
  email: z.string(),
})

export type Contributor = z.infer<typeof contributorSchema>;

export const contributorAccountScoreSchema = contributorSchema.extend({
  scores: scoreSchema.omit({
    instruments: true,
    categories: true,
    allocations: true,
  })
  .extend({
    instruments: z.number().array(),
    categories: z.number().array(),
    allocations: z.number().array(),
  })
  .array()
})

export type ContributorAccountScore = z.infer<typeof contributorAccountScoreSchema>;
