<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Control } from "formsnap";
  import { formSchema, type FormSchema } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  let { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;
  // const pdfFile = fileProxy(form, "pdfFile");
</script>

<div class="p-8 max-w-md">
  <form
    method="POST"
    use:enhance
    class="w-full border p-8 rounded-md"
    enctype="multipart/form-data"
    action="?/createScore"
  >
    <h3 class="mb-8 text-2xl font-bold">Create Score</h3>
    <Form.Field {form} name="title">
      <Form.Control>
        {#snippet children({ props }: { props: Control })}
          <Form.Label required={true}>Title</Form.Label>
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
          <Form.Label required>Price</Form.Label>
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
    <Form.Button>Submit</Form.Button>
  </form>
</div>
