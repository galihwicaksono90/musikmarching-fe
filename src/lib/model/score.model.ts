import { z } from 'zod';
import { pdfFileSchema, audioFileSchema } from './file.model';
import { timeSchema } from './time.model';

export const difficulties =  [ 'beginner', 'intermediate', 'advanced' ] as const;

export const difficultySchema = z.enum(difficulties);

export type Difficulty = z.infer<typeof difficultySchema>;

export const difficultyLabels: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
} as const;

export const contentType =  [ 'exclusive', 'non-exclusive' ] as const;

export const contentTypeSchema = z.enum(contentType);

export type ContentType = z.infer<typeof contentTypeSchema>;

export const contentTypeLabels: Record<ContentType, string> = {
  exclusive: 'Exclusive',
  "non-exclusive": 'Non-Exclusive',
} as const;

export const scoreSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  difficulty: difficultySchema,
  pdf_url: z.string().nullable(),
  pdf_image_urls: z.string().array(),
  audio_url: z.string().nullable(),
  is_verified: z.boolean(),
  verified_at: timeSchema.nullish(),
  created_at: timeSchema,
  updated_at: timeSchema.nullish(),
  deleted_at: timeSchema.nullish(),
})

export const publicScoreSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  difficulty: difficultySchema,
  content_type: contentTypeSchema,
  pdf_image_urls: z.string().array(),
  audio_url: z.string(),
  created_at: timeSchema,
  email: z.string(),
  full_name: z.string(),
  is_verified: z.boolean(),
  verified_at: timeSchema.nullish(),
  instruments: z.string().array(),
  allocations: z.string().array(),
  categories: z.string().array(),
})

export type PublicScore = z.infer<typeof publicScoreSchema>;

export type Score = z.infer<typeof scoreSchema>;

export const contributorScoreSchema = scoreSchema.pick({
  id: true,
  title: true,
  is_verified: true,
  price: true,
  audio_url: true,
  pdf_url: true,
  pdf_image_urls: true,
}).extend({
  email: z.string(),
  name: z.string(),
})

export type ContributorScore = z.infer<typeof contributorScoreSchema>;

export const createScoreFormSchema = z.object({
  title: z.string().min(5).max(50),
  price: z.number({ message: "Not a valid number" }).lte(100000000, { message: "Kemahalan. Ngga ada yang beli nanti" }),
  pdfFile: pdfFileSchema,
  audioFile: audioFileSchema,
});

export const updateScoreFormSchema = createScoreFormSchema
  .pick({
    title: true,
    price: true,
  })
  .extend({
    pdfFile: pdfFileSchema.optional(),
    audioFile: audioFileSchema.optional(),
  })

export type CreateScoreFormSchema = typeof createScoreFormSchema;
