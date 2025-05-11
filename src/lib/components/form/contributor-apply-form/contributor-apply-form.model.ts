import { z } from "zod";
export const contributorApplyFormSchema = z.object({
  full_name: z.string().min(5),
  phone_number: z.string().min(5),
  musical_background: z.string().min(5),
  education: z.string().nullish(),
  experience: z.string().nullish(),
  terms_and_conditions_accepted: z.boolean(),
});

export const contributorUpdateFormSchema = contributorApplyFormSchema.pick({
  full_name: true,
  phone_number: true,
  musical_background: true,
  education: true,
  experience: true,
});

export type ContributorApplyFormSchema = z.infer<typeof contributorApplyFormSchema>;
export type ContributorUpdateFormSchema = z.infer<typeof contributorUpdateFormSchema>;

