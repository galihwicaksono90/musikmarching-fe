import {z} from 'zod';

export const contributorRegisterSchema = z.object({
  full_name: z.string().min(5).max(250)
})

