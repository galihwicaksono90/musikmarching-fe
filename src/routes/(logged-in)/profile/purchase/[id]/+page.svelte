<script lang="ts">
  import type { PageData } from "./$types";
  import { UploadPurchaseProofForm } from "$lib/components/form";

  let { data }: { data: PageData } = $props();
</script>

<div class="flex gap-8 max-w-xl">
  <UploadPurchaseProofForm data={data.form} />
</div>
<pre>{JSON.stringify(data.purchase, null, 4)}</pre>
{#if data.purchase.payment_proof_url}
  <div class="aspect-square max-w-3xl">
  <img src={data.purchase.payment_proof_url} alt="Purchase Proof" />
  </div>
{/if}
