<script lang="ts">
  import { VerifiedStatusBadge } from "$lib/components/common";
  import { Button } from "$lib/components/ui";
  import * as Table from "$lib/components/ui/table";
  import type { Purchase } from "$lib/model";
  import { getPurchaseInvoiceNumber, getPurchaseStatusLabel } from "$lib/util";
  import type { Props } from "./purchase-table.model";
  import * as Dialog from "$lib/components/ui/dialog";

  let { purchases }: Props = $props();
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

{#snippet purchaseDialog(purchase: Purchase)}
  <Dialog.Root>
    <Dialog.Trigger>
      <Button>Pembayaran</Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Pembayaran</Dialog.Title>
      </Dialog.Header>
      {@render purcaseInvoice(purchase)}
    </Dialog.Content>
  </Dialog.Root>
{/snippet}

{#snippet tableBody({ item }: { item: Purchase })}
  <Table.Row>
    <Table.Cell>{getPurchaseInvoiceNumber(item.invoice_serial)}</Table.Cell>
    <Table.Cell>{item.title}</Table.Cell>
    <Table.Cell>
      <VerifiedStatusBadge isVerified={item.is_verified} />
    </Table.Cell>
    <Table.Cell>
      {@render purchaseDialog(item)}
    </Table.Cell>
  </Table.Row>
{/snippet}

<section class="flex flex-col gap-8 w-full">
  <Table.Root class="w-full">
    <Table.Header>
      <Table.Row>
        <Table.Head>Invoice</Table.Head>
        <Table.Head>Title</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head></Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each purchases as item}
        {@render tableBody({ item })}
      {/each}
    </Table.Body>
    <Table.Caption>Daftar pembelian</Table.Caption>
  </Table.Root>
</section>
