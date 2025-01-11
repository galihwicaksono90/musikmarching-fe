import { z } from 'zod';
import { timeSchema } from './time.model';

export const difficulties = ['beginner', 'intermediate', 'advanced'] as const;

export const difficultySchema = z.enum(difficulties);

export type Difficulty = z.infer<typeof difficultySchema>;

export const difficultyLabels: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const;

export const contentType = ['non-exclusive', 'exclusive'] as const;

export const contentTypeSchema = z.enum(contentType);

export type ContentType = z.infer<typeof contentTypeSchema>;

export const contentTypeLabels: Record<ContentType, string> = {
  exclusive: 'Exclusive',
  "non-exclusive": 'Non-Exclusive',
} as const;

export const scoreSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  difficulty: difficultySchema,
  content_type: contentTypeSchema,
  pdf_image_urls: z.string().array(),
  audio_url: z.string(),
  pdf_url: z.string(),
  is_verified: z.boolean(),
  verified_at: timeSchema.nullish(),
  instruments: z.string().array(),
  allocations: z.string().array(),
  categories: z.string().array(),
  created_at: timeSchema,
  updated_at: timeSchema.nullish(),
  deleted_at: timeSchema.nullish(),
})

export const publicScoreSchema = scoreSchema.pick({
  id: true,
  title: true,
  description: true,
  price: true,
  difficulty: true,
  content_type: true,
  pdf_image_urls: true,
  audio_url: true,
  created_at: true,
  is_verified: true,
  verified_at: true,
  instruments: true,
  allocations: true,
  categories: true,
}).extend({
  full_name: z.string(),
  email: z.string(),
})

export const purchasedScoreSchema = scoreSchema.pick({
  id: true,
  title: true,
  description: true,
  difficulty: true,
  content_type: true,
  pdf_url: true,
  pdf_image_urls: true,
  price: true,
  audio_url: true,
  is_verified: true,
}).extend({
  full_name: z.string(),
  email: z.string(),
})



export type PublicScore = z.infer<typeof publicScoreSchema>;

export type Score = z.infer<typeof scoreSchema>;

export type PurchasedScore = z.infer<typeof purchasedScoreSchema>;

export const contributorScoreSchema = scoreSchema.pick({
  id: true,
  title: true,
  is_verified: true,
  description: true,
  price: true,
  audio_url: true,
  pdf_url: true,
  pdf_image_urls: true,
  difficulty: true,
  content_type: true,
  verified_at: true,
}).extend({
  contributor_id: z.string().uuid(),
  categories: z.number().array(),
  instruments: z.number().array(),
  allocations: z.number().array(),
})

export type ContributorScore = z.infer<typeof contributorScoreSchema>;
