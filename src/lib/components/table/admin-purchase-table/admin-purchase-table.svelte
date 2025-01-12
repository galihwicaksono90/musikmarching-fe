<script lang="ts">
  import type { Purchase } from "$lib/model";
  import * as Table from "$lib/components/ui/table";
  import * as Dialog from "$lib/components/ui/dialog";
  import { VerifiedStatusBadge } from "$lib/components/common";
  import { Button } from "$lib/components/ui";
  import { enhance } from "$app/forms";
  import { toast } from "$lib/util";
    import { invalidateAll } from "$app/navigation";

  let { data }: { data: Purchase[] } = $props();
</script>

{#snippet imagePreview(url: string)}
  <Dialog.Root>
    <Dialog.Trigger>
      <Button variant="link" size="icon">View</Button>
    </Dialog.Trigger>
    <Dialog.Content class="max-w-3xl h-fit">
      <div class="max-h-screen h-full w-full">
        <img src={url} alt="Purchase Proof" />
      </div>
    </Dialog.Content>
  </Dialog.Root>
{/snippet}

{#snippet TableBody({ item }: { item: Purchase })}
  <Table.Row>
    <Table.Cell class="font-medium">{item.full_name ?? "-"}</Table.Cell>
    <Table.Cell>{item.title}</Table.Cell>
    <Table.Cell>
      <VerifiedStatusBadge isVerified={item.is_verified} />
    </Table.Cell>
    <Table.Cell class="flex items-center">
      {#if !!item.paid_at && item.payment_proof_url}
        {@render imagePreview(item.payment_proof_url)}
      {/if}
    </Table.Cell>
    <Table.Cell>
      {#if !item.is_verified}
        <form
          method="POST"
          action={`?/verify&id=${item.id}`}
          use:enhance={() => {
            return ({ result,  }) => {
              if (result.type === "success") {
                toast({
                  type: "success",
                  message: "Pembelian telah berhasil divalidasi",
                });
                invalidateAll();
              } else {
                toast({
                  type: "error",
                  message: "Gagal validasi pembelian",
                });
              }
            };
          }}
        >
          <Button type="submit">Verify</Button>
        </form>
      {/if}
    </Table.Cell>
  </Table.Row>
{/snippet}

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>User</Table.Head>
      <Table.Head>Title</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Proof</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data as item}
      {@render TableBody({ item })}
    {/each}
  </Table.Body>
  <Table.Caption>A list of purchases.</Table.Caption>
</Table.Root>
