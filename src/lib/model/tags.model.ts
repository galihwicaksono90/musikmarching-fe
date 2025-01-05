import {z} from 'zod';

export type TagType = 'instruments' | 'categories' | 'allocations';

const tagSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const instrumentSchema = tagSchema
export const categorySchema = tagSchema
export const allocationSchema = tagSchema

export type Tag = z.infer<typeof tagSchema>;
export type Instrument = z.infer<typeof instrumentSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Allocation = z.infer<typeof allocationSchema>;
