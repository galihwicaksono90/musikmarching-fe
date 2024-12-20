<script lang="ts">
  import {
    FormField,
    FormControl,
    FormDescription,
    FormFieldErrors,
    FormLabel,
    FormButton,
    Input,
  } from "$lib/components/ui";
  import { Control } from "formsnap";
  import { createScoreFormSchema, updateScoreFormSchema } from "$lib/model";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { toast } from "svelte-sonner";
  import { invalidateAll } from "$app/navigation";

  let {
    data,
    isEditing = false,
  }: {
    data: SuperValidated<
      Infer<typeof createScoreFormSchema | typeof updateScoreFormSchema>
    >;
    isEditing?: boolean;
  } = $props();

  const form = superForm(data, {
    validators: zodClient(
      isEditing ? updateScoreFormSchema : createScoreFormSchema,
    ),
    onUpdated: () => {
      if (isEditing) {
        invalidateAll();
      }
    },
  });

  const { form: formData, enhance, message, delayed } = form;

  $effect(() => {
    if ($message) {
      toast.success($message);
    }
  });
</script>

<div class="p-8 max-w-md">
  <div class="w-full border p-8 rounded-md">
    <h3 class="mb-8 text-2xl font-bold">Create Score</h3>
    <form
      method="POST"
      use:enhance
      id="score-form"
      class="flex flex-col gap-6"
      enctype="multipart/form-data"
      action={isEditing ? "?/updateScore" : "?/createScore"}
    >
      <FormField {form} name="title">
        <FormControl>
          {#snippet children({ props }: { props: Control })}
            <FormLabel required>Title</FormLabel>
            <Input
              {...props}
              bind:value={$formData.title}
              name="title"
              type="text"
            />
          {/snippet}
        </FormControl>
        <FormDescription>This is thet</FormDescription>
        <FormFieldErrors />
      </FormField>
      <FormField {form} name="price">
        <FormControl>
          {#snippet children({ props }: { props: Control })}
            <FormLabel required>Price</FormLabel>
            <Input
              {...props}
              bind:value={$formData.price}
              name="price"
              type="number"
            />
          {/snippet}
        </FormControl>
        <FormDescription>Enter the price of your score</FormDescription>
        <FormFieldErrors />
      </FormField>

      <FormField {form} name="pdfFile">
        <FormControl>
          {#snippet children({ props }: { props: Control })}
            <FormLabel required={!isEditing}>PDF File</FormLabel>
            <Input
              {...props}
              on:input={(e) =>
                ($formData.pdfFile = e.currentTarget.files?.item(0) as File)}
              name="pdfFile"
              type="file"
              accept="application/pdf"
            />
          {/snippet}
        </FormControl>
        <FormDescription>Upload your score PDF file</FormDescription>
        <FormFieldErrors />
      </FormField>

      <FormField {form} name="audioFile">
        <FormControl>
          {#snippet children({ props }: { props: Control })}
            <FormLabel required={!isEditing}>Audio File</FormLabel>
            <Input
              {...props}
              on:input={(e) =>
                ($formData.audioFile = e.currentTarget.files?.item(0) as File)}
              name="audioFile"
              type="file"
              accept="audio/mpeg"
            />
          {/snippet}
        </FormControl>
        <FormDescription>Upload your audio MP3 file</FormDescription>
        <FormFieldErrors />
      </FormField>
      <FormButton loading={$delayed}>Submit</FormButton>
    </form>
  </div>
</div>
