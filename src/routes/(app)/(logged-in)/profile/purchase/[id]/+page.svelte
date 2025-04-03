<script lang="ts">
  import type { PageData } from "./$types";
  import { UploadPurchaseProofForm } from "$lib/components/form";
  import { Button } from "$lib/components/ui";
  import { AudioPlayer } from "$lib/components/common";
  import type { PurchasedScore, Purchase } from "$lib/model";
  import {
    getPurchaseStatusLabel,
    getPurchaseInvoiceNumber,
    toast,
  } from "$lib/util";
  import * as Dialog from "$lib/components/ui/dialog";
  import { getFlash } from "sveltekit-flash-message/client";
  import { page } from "$app/stores";

  const flash = getFlash(page);

  $effect(() => {
    console.log({ flash: $flash });
    if (!$flash) return;

    toast({
      type: $flash.type,
      message: $flash?.message,
    });

    // $flash = undefined;
  });

  let { data }: { data: PageData } = $props();

  const onclick = () => {
    toast({
      type: "success",
      message: "hello world",
    });
  };
</script>

{#snippet purchaseProofModal(url: string)}
  <Dialog.Root>
    <Dialog.Trigger>
      <Button variant="link" class="w-full" size="icon">Terunggah</Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <div class="">
        <img
          src={url}
          alt="Purchase Proof"
          class="h-auto max-h-full max-w-[92]"
        />
      </div>
    </Dialog.Content>
  </Dialog.Root>
{/snippet}

{#snippet purchasedScore(score: PurchasedScore)}
  <h3 class="text-xl font-bold">{score.title}</h3>
  <div>
    <h4 class="text-md font-bold">PDF</h4>
    <iframe
      src={score.pdf_url}
      title={score.title}
      frameBorder="0"
      scrolling="auto"
      height="600px"
      width="100%"
    ></iframe>
  </div>
  <div>
    <h4 class="text-md font-bold">Audio</h4>
    <AudioPlayer src={score.audio_url} />
  </div>
{/snippet}

{#snippet purcaseInvoice(purchase: Purchase)}
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <div>Invoice</div>
      <div>
        : INV-{getPurchaseInvoiceNumber(purchase.invoice_serial)}
      </div>
      <div>Judul</div>
      <div>: {purchase.title}</div>
      <div>Bukti pembayaran</div>
      <div>
        : {#if purchase.payment_proof_url}
          {@render purchaseProofModal(purchase.payment_proof_url)}
        {:else}
          -
        {/if}
      </div>
      <div>Jumlah untuk dibayar</div>
      <div>
        :
        {Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(purchase.price + purchase.invoice_serial)}
      </div>
      <div>Status</div>
      <div>: {getPurchaseStatusLabel(purchase.is_verified)}</div>
    </div>
  </div>
{/snippet}

<section class="flex flex-col gap-8">
  {#if data.score}
    {@render purchasedScore(data.score)}
  {/if}
  {#if !data.purchase.is_verified}
    {@render purcaseInvoice(data.purchase)}
    <div class="flex gap-8 max-w-xl">
      <UploadPurchaseProofForm data={data.form} score={data}/>
    </div>
  {:else}
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Pembayaran</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Pembayaran</Dialog.Title>
        </Dialog.Header>
        {@render purcaseInvoice(data.purchase)}
      </Dialog.Content>
    </Dialog.Root>
  {/if}
</section>
