<script lang="ts">
  import { createMethodFormSchema } from "./payment-method-form.model";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { Input } from "$lib/components/ui";
  import * as Form from "$lib/components/ui/form";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms/client";
  import type { PaymentMethod } from "$lib/model";
  import { toast } from "$lib/util";
  import { invalidateAll } from "$app/navigation";

  type Props = {
    data: SuperValidated<Infer<typeof createMethodFormSchema>>;
    paymentMethod: PaymentMethod | null;
  };

  let { data }: Props = $props();

  const form = superForm(data, {
    validators: zodClient(createMethodFormSchema),
    invalidateAll: false,
    onUpdated: ({ form }) => {
      if (form.message) {
        toast(form.message);
      }
      invalidateAll();
    },
  });

  const { form: formData, enhance, isTainted, tainted, delayed } = form;
</script>

<form
  method="POST"
  use:enhance
  id="payment-method-form"
  action="?/upsertPaymentMethod"
  class="flex flex-col gap-4"
>
  <Form.Field {form} name="method">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Metode</Form.Label>
        <Input {...props} bind:value={$formData.method} type="text" disabled />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="bank_name">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label required>Nama Bank</Form.Label>
        <Input {...props} bind:value={$formData.bank_name} type="text" />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="account_number">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label required>Nomor rekening</Form.Label>
        <Input
          {...props}
          bind:value={$formData.account_number}
          type="text"
          placeholder="123456789"
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button disabled={!isTainted($tainted)} loading={$delayed}>Submit</Form.Button>
</form>
