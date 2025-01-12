<script lang="ts">
  import { VerifiedStatusBadge } from "$lib/components/common";
  import { Button } from "$lib/components/ui";
  import * as Table from "$lib/components/ui/table";
  import type { Purchase } from "$lib/model";
  import type { Props } from "./purchase-table.model";

  let { purchases }: Props = $props();
</script>

{#snippet tableBody({ item }: { item: Purchase })}
  <Table.Row>
    <Table.Cell>{item.title}</Table.Cell>
    <Table.Cell>
      <VerifiedStatusBadge isVerified={item.is_verified} />
    </Table.Cell>
    <Table.Cell>
      <a href={`/profile/purchase/${item.id}`}>
        <Button variant="link">Buka</Button>
      </a>
    </Table.Cell>
  </Table.Row>
{/snippet}

<section class="flex flex-col gap-8 w-full">
  <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">Pembelian</h3>
  <Table.Root class="w-full">
    <Table.Header>
      <Table.Row>
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
    <Table.Caption>Dafter pembelian</Table.Caption>
  </Table.Root>
</section>
