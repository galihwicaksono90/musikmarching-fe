<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { contributorRegisterSchema } from "$lib/components/form";

  let {
    data,
  }: {
    data: SuperValidated<Infer<typeof contributorRegisterSchema>>;
  } = $props();

  const form = superForm(data, {
    validators: zodClient(contributorRegisterSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form use:enhance method="POST">
  <Form.Field {form}>
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label required>Full Name</Form.Label>
        <Input name="full_name" bind:value={$formData.full_name} type="text" {...props} />
      {/snippet}
    </Form.Control>
  </Form.Field>
</form>
