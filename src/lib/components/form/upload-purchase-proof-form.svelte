<script lang="ts">
  import { Input } from "$lib/components/ui";
  import * as Form from "$lib/components/ui/form";
  import { Control } from "formsnap";
  import { uploadPurchaseProofFormSchema } from "$lib/model";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { invalidateAll } from "$app/navigation";
  import { toast } from "$lib/util";

  let {
    data,
  }: {
    data: SuperValidated<Infer<typeof uploadPurchaseProofFormSchema>>;
  } = $props();

  const form = superForm(data, {
    validators: zodClient(uploadPurchaseProofFormSchema),
    onUpdated: ({ form }) => {
      if (!form.message) return;

      toast(form.message);

      if (form.message.type === "success") {
        invalidateAll();
      }
    },
  });

  const { form: formData, enhance, delayed } = form;
  let url = $derived(
    $formData.imageFile ? URL.createObjectURL($formData.imageFile) : "",
  );
</script>

<form method="POST" action="?/upload" use:enhance enctype="multipart/form-data">
  <Form.Field {form} name="imageFile">
    <Form.Control>
      {#snippet children({ props }: { props: Control })}
        <Form.Label required>Payment Proof</Form.Label>
        <Input
          {...props}
          on:input={(e) =>
            ($formData.imageFile = e.currentTarget.files?.item(0) as File)}
          name="imageFile"
          type="file"
          accept="image/png"
        />
        {#if url}
          <div class="w-32 aspect-square">
            <img src={url} alt="Purchase Proof" />
          </div>
        {/if}
      {/snippet}
    </Form.Control>
    <Form.Description>Upload your purchase proof</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button loading={$delayed}>Submit</Form.Button>
</form>
