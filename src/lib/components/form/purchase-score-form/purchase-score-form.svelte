<script lang="ts">
  import { buttonVariants } from "$lib/components/ui";
  import { superForm } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";
  import {
    type PurchaseScoreFormProps,
    purchaseScoreFormSchema,
  } from "./purchase-score-form.model";

  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { cn } from "$lib/utils";

  const { data, score }: PurchaseScoreFormProps = $props();

  const form = superForm(data, {
    validators: zodClient(purchaseScoreFormSchema),
  });

  const { enhance, form: formData, delayed } = form;
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger
    disabled={$delayed}
    class={cn(buttonVariants())}
    type="button"
  >
    Beli
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Pembelian Score</AlertDialog.Title>
      <AlertDialog.Description>
        Membeli Score seharga {score.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">Score</h2>
        <p class="text-muted-foreground">{score.title}</p>
      </div>
      <div class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">Penulis</h2>
        <p class="text-muted-foreground">{score.full_name}</p>
      </div>
    </div>
    <AlertDialog.Footer>
      <form use:enhance method="POST" id="purchase-score-form">
        <input value={$formData.id} name="id" type="hidden" />
        <AlertDialog.Action type="submit">Beli</AlertDialog.Action>
      </form>
      <AlertDialog.Cancel>Batal</AlertDialog.Cancel>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
