import { z } from 'zod';

export const timeSchema = z.string().datetime({offset: true})
