<script lang="ts">
  import { Avatar, AvatarFallback, Input } from "$lib/components/ui";
  import * as Form from "$lib/components/ui/form";
  import { Control } from "formsnap";
  import { contributorRegisterSchema } from "./contributor-register-form.model";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { toast } from "$lib/util";
  import { invalidateAll } from "$app/navigation";

  let {
    data,
  }: {
    data: SuperValidated<Infer<typeof contributorRegisterSchema>>;
  } = $props();

  const form = superForm(data, {
    validators: zodClient(contributorRegisterSchema),
    onUpdated: ({ form }) => {
      if (!form.message) return;
      if (form.message.type === "success") {
        invalidateAll();
      }
      toast({ type: form.message.type, message: form.message.message });
    },
  });

  const { form: formData, enhance, delayed } = form;

  const avatarName = $formData.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
</script>

<form method="POST" use:enhance class="flex flex-col gap-6">
  <Avatar>
    <AvatarFallback>{avatarName}</AvatarFallback>
  </Avatar>

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
    <Form.Description>Enter your full name.</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button loading={$delayed}>Register</Form.Button>
</form>
