<script lang="ts">
  import type { PageData } from "./$types";
  import { LibraryScoreCard } from "$lib/components/common";

  let { data }: { data: PageData } = $props();
</script>

<div
  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between w-full"
>
  {#each data.scores as score}
    <LibraryScoreCard {score} />
  {/each}
</div>


