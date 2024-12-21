<script lang="ts">
  import {
    Input,
  } from "$lib/components/ui";
  import * as Form from "$lib/components/ui/form";
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
      <Form.Field {form} name="title">
        <Form.Control>
          {#snippet children({ props }: { props: Control })}
            <Form.Label required>Title</Form.Label>
            <Input
              {...props}
              bind:value={$formData.title}
              name="title"
              type="text"
            />
          {/snippet}
        </Form.Control>
        <Form.Description>This is thet</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="price">
        <Form.Control>
          {#snippet children({ props }: { props: Control })}
            <Form.Label required>Price</Form.Label>
            <Input
              {...props}
              bind:value={$formData.price}
              name="price"
              type="number"
            />
          {/snippet}
        </Form.Control>
        <Form.Description>Enter the price of your score</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="pdfFile">
        <Form.Control>
          {#snippet children({ props }: { props: Control })}
            <Form.Label required={!isEditing}>PDF File</Form.Label>
            <Input
              {...props}
              on:input={(e) =>
                ($formData.pdfFile = e.currentTarget.files?.item(0) as File)}
              name="pdfFile"
              type="file"
              accept="application/pdf"
            />
          {/snippet}
        </Form.Control>
        <Form.Description>Upload your score PDF file</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="audioFile">
        <Form.Control>
          {#snippet children({ props }: { props: Control })}
            <Form.Label required={!isEditing}>Audio File</Form.Label>
            <Input
              {...props}
              on:input={(e) =>
                ($formData.audioFile = e.currentTarget.files?.item(0) as File)}
              name="audioFile"
              type="file"
              accept="audio/mpeg"
            />
          {/snippet}
        </Form.Control>
        <Form.Description>Upload your audio MP3 file</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Button loading={$delayed}>Submit</Form.Button>
    </form>
  </div>
</div>
