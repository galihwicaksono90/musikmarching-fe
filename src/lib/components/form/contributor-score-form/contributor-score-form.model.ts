import { pdfFileSchema, audioFileSchema, difficultySchema, contentTypeSchema } from '$lib/model';
import { z } from 'zod';

export const createScoreFormSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(5).max(255).default(''),
  price: z
    .number({ message: "Not a valid number" })
    .gte(0, { message: "Harga tidak boleh negatif" })
    .lte(100000000),
  difficulty: difficultySchema,
  contentType: contentTypeSchema,
  pdfFile: pdfFileSchema,
  audioFile: audioFileSchema,
  categories: z.number().array(),
  instruments: z.number().array(),
  allocations: z.number().array(),
});


export const updateScoreFormSchema = createScoreFormSchema
  .pick({
    title: true,
    description: true,
    price: true,
    difficulty: true,
    contentType: true,
    categories: true,
    instruments: true,
    allocations: true,
  })
  .extend({
    pdfFile: pdfFileSchema.optional(),
    audioFile: audioFileSchema.optional(),
  })

