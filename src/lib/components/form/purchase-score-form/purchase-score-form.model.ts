import { z } from "zod";
import { type PublicScore } from '$lib/model'
import {
  type SuperValidated,
  type Infer,
} from "sveltekit-superforms/client";

export const purchaseScoreFormSchema = z.object({
  id: z.string(),
});

export type PurchaseScoreFormProps = {
  data: SuperValidated<Infer<typeof purchaseScoreFormSchema>>;
  score: PublicScore;
};

