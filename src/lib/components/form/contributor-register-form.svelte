<script lang="ts">
  import {
    FormField,
    FormControl,
    FormDescription,
    FormFieldErrors,
    FormLabel,
    FormButton,
    Input,
    Avatar,
    AvatarFallback,
  } from "$lib/components/ui";
  import { Control } from "formsnap";
  import { contributorRegisterSchema } from "$lib/model";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";
    import { toast } from "svelte-sonner";

  let {
    data,
  }: {
    data: SuperValidated<Infer<typeof contributorRegisterSchema>>;
  } = $props();

  const form = superForm(data, {
    validators: zodClient(contributorRegisterSchema),
  });

  const { form: formData, enhance, message , delayed} = form;

  $effect(() => {
    if(message){
      toast.success($message)
    }
  })

  const avatarName = $formData.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
</script>

<form action="?/register" method="POST" use:enhance class="flex flex-col gap-6">
  <Avatar>
    <AvatarFallback>{avatarName}</AvatarFallback>
  </Avatar>

  <FormField {form} name="full_name">
    <FormControl>
      {#snippet children({ props }: { props: Control })}
        <FormLabel required>Full Name</FormLabel>
        <Input
          {...props}
          bind:value={$formData.full_name}
          name="full_name"
          type="text"
        />
      {/snippet}
    </FormControl>
    <FormDescription>Enter your full name.</FormDescription>
    <FormFieldErrors />
  </FormField>
  <FormButton loading={$delayed}>Register</FormButton>
</form>
