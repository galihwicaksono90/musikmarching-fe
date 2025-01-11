import { z } from 'zod';

export const uploadPurchaseProofFormSchema = z.object({
  imageFile: z.instanceof(File),
});

