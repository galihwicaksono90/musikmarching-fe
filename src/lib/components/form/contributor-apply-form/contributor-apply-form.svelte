<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms/client";
  import { Checkbox, Input, Textarea } from "$lib/components/ui";
  import { zodClient } from "sveltekit-superforms/adapters";
  import {
    contributorApplyFormSchema,
    contributorUpdateFormSchema,
  } from "./contributor-apply-form.model";
  import { invalidateAll } from "$app/navigation";
  import { toast } from "$lib/util";
  import { type ContributorApply } from "$lib/model";

  let {
    data,
    contributorApplyData,
  }: {
    data: SuperValidated<
      Infer<
        typeof contributorApplyFormSchema | typeof contributorUpdateFormSchema
      >
    >;
    contributorApplyData: ContributorApply | undefined;
  } = $props();

  const form = superForm(data, {
    validators: zodClient(
      contributorApplyData
        ? contributorUpdateFormSchema
        : contributorApplyFormSchema,
    ),
    onUpdated: ({ form }) => {
      if (!form.message) return;
      if (form.message.type === "success") {
        invalidateAll();
      }
      toast(form.message);
    },
  });

  const { form: formData, enhance, delayed, tainted, isTainted } = form;
</script>

<form
  method="POST"
  use:enhance
  class="flex flex-col gap-6"
  action={contributorApplyData ? "?/update" : "?/apply"}
>
  <Form.Field {form} name="full_name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label required>Full Name</Form.Label>
        <Input
          {...props}
          bind:value={$formData.full_name}
          name="full_name"
          type="text"
        />
      {/snippet}
    </Form.Control>
  </Form.Field>

  <Form.Field {form} name="phone_number">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label required>Phone Number</Form.Label>
        <Input
          {...props}
          bind:value={$formData.phone_number}
          name="phone_number"
          type="text"
          placeholder="+62 888-888-8888"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="musical_background">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label required>Musical Background</Form.Label>
        <Textarea
          {...props}
          bind:value={$formData.musical_background}
          name="musical_background"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="education">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Education</Form.Label>
        <Textarea
          {...props}
          bind:value={$formData.education}
          name="education"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="experience">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Experience</Form.Label>
        <Textarea
          {...props}
          bind:value={$formData.experience}
          name="experience"
        />
      {/snippet}
    </Form.Control>
  </Form.Field>
  {#if !contributorApplyData}
    <Form.Field {form} name="terms_and_conditions_accepted">
      <Form.Control>
        {#snippet children({ props })}
          <div class="flex items-start gap-2">
            <Checkbox
              {...props}
              bind:checked={$formData.terms_and_conditions_accepted!}
              name="terms_and_conditions_accepted"
            />
            <div class="flex flex-col">
              <Form.Label required>I accept the terms and conditions</Form.Label
              >
              <Form.Description>
                By submitting this application, you agree to our contributor
                terms and copyright policies.
              </Form.Description>
            </div>
          </div>
        {/snippet}
      </Form.Control>
    </Form.Field>
  {/if}
  <Form.Button
    loading={$delayed}
    disabled={!isTainted($tainted) ||
      (!contributorApplyData && !$formData.terms_and_conditions_accepted!)}
  >
    {#if contributorApplyData}
      Update
    {:else}
      Register
    {/if}
  </Form.Button>
</form>
