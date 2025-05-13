<script lang="ts">
  import { type ContributorApply } from "$lib/model";
  import * as Table from "$lib/components/ui/table";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { verifyContributorSchema } from "./admin-contributor-apply-table.model";
  let {
    applications,
    form,
  }: {
    applications: ContributorApply[];
    form: SuperValidated<Infer<typeof verifyContributorSchema>>;
  } = $props();

  const { formId, enhance } = superForm(form);
</script>

{#snippet ApplicationDialog(item: ContributorApply)}
  <Dialog.Root>
    <Dialog.Trigger>
      <Button>View</Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Contributor Data</Dialog.Title>
      </Dialog.Header>
      <div class="flex gap-2">
        <span class="font-bold">Full Name: </span>
        {item.full_name}
      </div>
      <div class="flex gap-2">
        <span class="font-bold">Created At: </span>
        {item.created_at}
      </div>
      <div class="flex gap-2">
        <span class="font-bold">Phone Number: </span>
        {item.phone_number}
      </div>
      <div class="flex gap-2">
        <span class="font-bold">Musical Background:</span>
        {item.musical_background}
      </div>
      <div class="flex gap-2">
        <span class="font-bold">Education: </span>
        {item.education ?? "N/A"}
      </div>
      <div class="flex gap-2">
        <span class="font-bold">Experience: </span>
        {item.experience ?? "N/A"}
      </div>
      <Dialog.Footer>
        <form action="?/verify" method="POST" use:enhance>
          <Button
            name="id"
            type="submit"
            value={item.id}
            onclick={() => ($formId = item.id)}>Verify</Button
          >
          hello
        </form>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
{/snippet}

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Full Name</Table.Head>
      <Table.Head>Created At</Table.Head>
      <Table.Head>Actions</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each applications as item (item.id)}
      <Table.Row>
        <Table.Cell>{item.full_name}</Table.Cell>
        <Table.Cell>{item.created_at}</Table.Cell>
        <Table.Cell>
          {#if !item.is_verified}
            {@render ApplicationDialog(item)}
          {/if}
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
