<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button, Badge, buttonVariants } from "$lib/components/ui";
  import type { ContributorScore } from "$lib/model";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

  import Ellipsis from "@lucide/svelte/icons/ellipsis";
  import Edit from "@lucide/svelte/icons/edit";
  import Download from "@lucide/svelte/icons/download";
  import Trash from "@lucide/svelte/icons/trash";
  import type { Infer, SuperValidated } from "sveltekit-superforms";
  import { deleteScoreSchema } from "$lib/model";
  import { superForm } from "sveltekit-superforms/client";
  import { toast } from "$lib/util";
  import { invalidateAll } from "$app/navigation";
  import { cn } from "$lib/utils";

  type Props = {
    scores: ContributorScore[];
    form: SuperValidated<Infer<typeof deleteScoreSchema>>;
  };

  let { scores = [], form }: Props = $props();

  const { enhance, formId } = superForm(form, {
    onUpdated: ({ form }) => {
      if (form.message) {
        toast(form.message);
      }
      invalidateAll();
    },
  });
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Score</Table.Head>
      <Table.Head>Price</Table.Head>
      <Table.Head class="hidden md:table-cell">Sales</Table.Head>
      <Table.Head class="hidden md:table-cell">Status</Table.Head>
      <Table.Head class="text-right">Actions</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each scores as score (score.id)}
      <Table.Row>
        <Table.Cell>
          <div class="flex items-center gap-3">
            <!-- <div class="relative h-12 w-12 overflow-hidden rounded"> -->
            <!-- 	<img -->
            <!-- 		src={score. || "/placeholder.svg"} -->
            <!-- 		alt={score.title} -->
            <!-- 		fill -->
            <!-- 		class="object-cover" -->
            <!-- 	/> -->
            <!-- </div> -->
            <div>
              <div class="font-medium">{score.title}</div>
              <!-- <div class="text-sm text-muted-foreground"> -->
              <!-- 	{score?.full_name} -->
              <!-- </div> -->
            </div>
          </div>
        </Table.Cell>
        <Table.Cell
          >{score.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}</Table.Cell
        >
        <Table.Cell class="hidden md:table-cell"
          >{score.purchase_count}</Table.Cell
        >
        <Table.Cell class="hidden md:table-cell">
          <Badge variant={score.is_verified ? "default" : "secondary"}>
            <!-- {score.status.charAt(0).toUpperCase() + score.status.slice(1)} -->
            {#if !!score.deleted_at}
              Deleted
            {:else}
              {score.is_verified ? "Verified" : "Not Verified"}
            {/if}
          </Badge>
        </Table.Cell>
        <Table.Cell class="text-right">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="ghost" size="icon">
                <Ellipsis class="h-4 w-4" />
                <span class="sr-only">Open menu</span>
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Label>Actions</DropdownMenu.Label>
              <DropdownMenu.Item class="cursor-pointer">
                <a
                  href="/contributor/score/{score.id}"
                  class="flex items-center gap-2 cursor-pointer"
                >
                  <Edit class="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </a>
              </DropdownMenu.Item>

              {#if !score.deleted_at}
                <DropdownMenu.Separator />
                <AlertDialog.Root>
                  <AlertDialog.Trigger class="w-full flex items-center py-1 px-2 gap-2 hover:bg-red-50 text-sm text-destructive rounded">
                    <Trash class="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </AlertDialog.Trigger>
                  <AlertDialog.Content>
                    <AlertDialog.Header>
                      <AlertDialog.Title>Hapus score</AlertDialog.Title>
                      <AlertDialog.Description>
                        Apakah kamu yakin ingin menghapus score {score.title}?
                      </AlertDialog.Description>
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                      <form action="?/delete" method="POST" use:enhance>
                        <AlertDialog.Action
                          name="id"
                          class={cn(buttonVariants({ variant: "destructive" }))}
                          type="submit"
                          value={score.id}
                          onclick={() => ($formId = score.id)}
                        >
                          Ya
                        </AlertDialog.Action>
                      </form>
                      <AlertDialog.Cancel>Batal</AlertDialog.Cancel>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog.Root>
              {/if}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
