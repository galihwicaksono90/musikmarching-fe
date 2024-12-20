import { z } from 'zod';

export const SIZE_LIMIT = 10485760;

export const pdfFileSchema = z
  .instanceof(File, { message: 'Please upload a file....' })
  .refine((f) => f.size < SIZE_LIMIT, 'Max 1 MB upload size.')

export const audioFileSchema = pdfFileSchema;
