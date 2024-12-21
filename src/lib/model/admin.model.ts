import { scoreSchema } from '$lib/model'
import {z} from 'zod'

export const adminScoreSchema = scoreSchema.pick({
  id: true,
  title: true,
  is_verified: true,
  verified_at: true,
  pdf_url: true,
  pdf_image_urls: true,
  audio_url: true,
  created_at: true,
  updated_at: true,
  deleted_at: true
})


export type AdminScore = z.infer<typeof adminScoreSchema>;
