import type { Instrument, Category, Allocation, Tag } from "$lib/model";
import type { Infer, SuperValidated } from "sveltekit-superforms";
import {z} from 'zod'

export const mainSearchFormSchema = z.object({
  title: z.string().optional(),
  instrument: z.string().array(),
  category: z.string().array(),
  allocation: z.string().array(),
  difficulty: z.string().nullish(),
  contentType: z.string().nullish(),
})

export type Props = {
  instrumentOptions: Instrument[];
  categoryOptions: Category[];
  allocationOptions: Instrument[];
  data: SuperValidated<
  Infer<typeof mainSearchFormSchema>
  >
};

export type SelectProps = {
  options: Tag[];
  name: string;
  placeholder?: string;
  label?: string;
};

