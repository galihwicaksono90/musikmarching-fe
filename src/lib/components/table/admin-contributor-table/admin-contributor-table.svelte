<script lang="ts">
  import type { ContributorAccountScore } from "$lib/model";
  import * as Table from "$lib/components/ui/table";
  import { VerifiedStatusBadge } from "$lib/components/common";
  import { Button } from "$lib/components/ui";
    import { enhance } from "$app/forms";

  let { data }: { data: ContributorAccountScore[] } = $props();
</script>

{#snippet TableBody({ item }: { item: ContributorAccountScore })}
  <Table.Row>
    <Table.Cell class="font-medium">{item.full_name}</Table.Cell>
    <Table.Cell>{item.scores?.length}</Table.Cell>
    <Table.Cell>{item.email}</Table.Cell>
    <Table.Cell class="flex items-center">
      <VerifiedStatusBadge isVerified={item.is_verified} />
    </Table.Cell>
    <Table.Cell>
      {#if !item.is_verified}
        <form method="POST" action={`?/verify&id=${item.id}`} use:enhance >
          <Button type="submit">Verify</Button>
        </form>
      {/if}
    </Table.Cell>
  </Table.Row>
{/snippet}

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Name</Table.Head>
      <Table.Head>Score Count</Table.Head>
      <Table.Head>Email</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Action</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data as contributor}
      {@render TableBody({ item: contributor })}
    {/each}
  </Table.Body>
  <Table.Caption>A list of contributors.</Table.Caption>
</Table.Root>
