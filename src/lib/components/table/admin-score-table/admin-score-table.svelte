<script lang="ts">
  import type { AdminScore } from "$lib/model";
  import { Button } from "$lib/components/ui";
  import { VerifiedStatusBadge } from "$lib/components/common";
  import * as Table from "$lib/components/ui/table";
  let {
    scores,
    onOpen,
  }: {
    scores: AdminScore[];
    onOpen: (id: string) => void;
  } = $props();
</script>

{#snippet TableBody({
  item,
  onOpen,
}: {
  item: AdminScore;
  onOpen: (id: string) => void;
})}
  <Table.Row>
    <Table.Cell class="font-medium">{item.title}</Table.Cell>
    <Table.Cell>
      <VerifiedStatusBadge isVerified={item.is_verified} />
    </Table.Cell>
    <Table.Cell>{item.id}</Table.Cell>
    <Table.Cell class="text-right">100</Table.Cell>
    <Table.Cell class="text-right">
      <Button onclick={() => onOpen(item.id)}>View</Button>
    </Table.Cell>
  </Table.Row>
{/snippet}

<Table.Root>
  <Table.Header>
    <Table.Row>
	    <Table.Head class="">Title</Table.Head>
	    <Table.Head>Status</Table.Head>
	    <Table.Head>conrtibutor</Table.Head>
	    <Table.Head class="text-right">Price</Table.Head>
	    <Table.Head class="text-right"></Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each scores as item}
      {@render TableBody({ item, onOpen })}
    {/each}
  </Table.Body>
  <Table.Caption>A list of submitted scores.</Table.Caption>
</Table.Root>

