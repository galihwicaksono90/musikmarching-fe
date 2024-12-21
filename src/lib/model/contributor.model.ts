import {z} from 'zod';
import {timeSchema} from './time.model'
import { scoreSchema } from './score.model';

export const contributorRegisterSchema = z.object({
  full_name: z.string().min(5).max(250)
})

export const contributorSchema = z.object({
  id: z.string().uuid(),
  is_verified: z.boolean(),
  full_name: z.string(),
  verified_at: timeSchema.nullish(),
  created_at: timeSchema,
  updated_at: timeSchema.nullish(),
  deleted_at: timeSchema.nullish(),
  email: z.string(),
})

export type Contributor = z.infer<typeof contributorSchema>;

export const contributorAccountScoreSchema = contributorSchema.extend({
  scores: scoreSchema.array().nullish()
})

export type ContributorAccountScore = z.infer<typeof contributorAccountScoreSchema>;
