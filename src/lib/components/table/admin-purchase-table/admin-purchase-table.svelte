<script lang="ts">
  import type { Purchase } from "$lib/model";
  import * as Table from "$lib/components/ui/table";
  import { VerifiedStatusBadge } from "$lib/components/common";
  import { Button } from "$lib/components/ui";
  import { enhance } from "$app/forms";

  let { data }: { data: Purchase[] } = $props();
</script>

{#snippet TableBody({ item }: { item: Purchase })}
  <Table.Row>
    <Table.Cell class="font-medium">{item.account_id}</Table.Cell>
    <Table.Cell>{item.title}</Table.Cell>
    <Table.Cell>
      <VerifiedStatusBadge isVerified={item.is_verified} />
    </Table.Cell>
    <Table.Cell class="flex items-center">
      {#if !!item.paid_at}
        <div class="w-16 aspect-square">
          <img src={item.payment_proof_url} alt="Payment Proof" />
        </div>
      {/if}
    </Table.Cell>
    <Table.Cell>
      {#if !item.is_verified}
        <form method="POST" action={`?/verify&id=${item.id}`} use:enhance>
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
      <Table.Head>Paid</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data as item}
      {@render TableBody({ item })}
    {/each}
  </Table.Body>
  <Table.Caption>A list of purchases.</Table.Caption>
</Table.Root>
