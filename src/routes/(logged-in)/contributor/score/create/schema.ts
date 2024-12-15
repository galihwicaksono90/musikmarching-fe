import { z } from "zod";

const SIZE_LIMIT = 1048576;

export const pdfFileSchema = typeof window === 'undefined' ? z.any() : z.instanceof(File, { message: 'Please select an PDF file.' })
  .refine((file) => {
    console.log({ file })
    return file?.size ? file?.size <= SIZE_LIMIT : true;
  }, 'Upload an image smaller than 1MB')
  .refine((file) => {
    return file?.type ? file.type === "application/pdf" : true;
  }, 'File must be a PDF file');

const imageSchema = z
  .instanceof(File, { message: 'Please upload a file....' })
  .refine((f) => f.size < 100_000, 'Max 100 kB upload size.')

export const formSchema = z.object({
  title: z.string().min(5).max(50),
  price: z.number({ message: "Not a valid number" }).lte(100000000, { message: "Kemahalan. Ngga ada yang beli nanti" }),
  pdfFile: imageSchema,
});

export type FormSchema = typeof formSchema;
