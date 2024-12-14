import type { PageServerLoad } from './$types'
import { z } from 'zod'
import { superForm } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

// const SIZE_LIMIT = 1000000;

// const pdfFileSchema = typeof window === 'undefined' ? z.any() : z.instanceof(File, { message: 'Please select an image.' })
//   .nullish()
//   .refine((file) => {
//     return file?.size ? file?.size <= SIZE_LIMIT : true;
//   }, 'Upload document smaller than 1MB')
//   .refine((file) => {
//     return file?.type ? file.type === "application/pdf" : true;
//   }, 'File must be an PDF file (.pdf)');

// const musicFileSchema = typeof window === 'undefined' ? z.any() : z.instanceof(File, { message: 'Please select an image.' })
//   .nullish()
//   .refine((file) => {
//     return file?.size ? file?.size <= SIZE_LIMIT : true;
//   }, 'Upload music file smaller than 1MB')
//   .refine((file) => {
//     return file?.type ? file.type === "audio/mpeg" : true;
//   }, 'File must be an mp3 file (.mp3)');

const createScoreFormSchema = z.object({
  title: z.string(),
  price: z.number(),
  // pdf_file: pdfFileSchema,
  // music_file: musicFileSchema,
})


export const load: PageServerLoad = async () => {
  const form = superForm(zod(createScoreFormSchema))

  return {
    form,
  };
};
