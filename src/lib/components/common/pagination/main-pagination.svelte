<script lang="ts">
  import { goto } from "$app/navigation";
  import * as Pagination from "$lib/components/ui/pagination";
  import ChevronsLeft from "lucide-svelte/icons/chevrons-left";
  import ChevronsRight from "lucide-svelte/icons/chevrons-right";

  let {
    page = 1,
    count,
    limit,
  }: { page: number; count: number; limit: number } = $props();

  $effect(() => {});

  const addQueryParams = (newPage: string) => {
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("page", newPage);
    goto(`${window.location.pathname}?${newParams.toString()}`);
  };

  function setPage(newPage: number) {
    addQueryParams(newPage.toString());
  }
</script>

<div>
  <Pagination.Root
    {count}
    perPage={limit}
    let:pages
    let:currentPage
    bind:page={() => page, setPage}
  >
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton disabled={currentPage === 1}
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
  </Pagination.Root>
</div>
