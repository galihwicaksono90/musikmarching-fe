<script lang="ts">
  import * as Pagination from "$lib/components/ui/pagination";
  import ChevronsLeft from "lucide-svelte/icons/chevrons-left";
  import ChevronsRight from "lucide-svelte/icons/chevrons-right";

  let {
    page: currentPage,
    count,
    limit,
    setPage,
  }: {
    page: number;
    count: number;
    limit: number;
    setPage: (page: number) => void;
  } = $props();
</script>

<div>
  <Pagination.Root
    {count}
    perPage={limit}
    bind:page={() => currentPage, setPage}
  >
    {#snippet children({ pages, page })}
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.PrevButton disabled={page === 1}
            ><ChevronsLeft /></Pagination.PrevButton
          >
        </Pagination.Item>
        {#each pages as page (page.key)}
          {#if page.type === "ellipsis"}
            <Pagination.Item>
              <Pagination.Ellipsis />
            </Pagination.Item>
          {:else}
            <Pagination.Item>
              <Pagination.Link {page} isActive={currentPage == page.value}>
                {page.value}
              </Pagination.Link>
            </Pagination.Item>
          {/if}
        {/each}
        <Pagination.Item>
          <Pagination.NextButton disabled={currentPage === pages.length}>
            <ChevronsRight />
          </Pagination.NextButton>
        </Pagination.Item>
      </Pagination.Content>
    {/snippet}
  </Pagination.Root>
</div>
