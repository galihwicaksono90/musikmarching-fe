<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const { user, purchases } = data;
</script>

<pre>{JSON.stringify(user, null, 4)}</pre>
<div class="flex gap-8">
  {#each purchases as purchase}
    <div class="flex flex-col gap-6">
      <h1>{purchase.title}</h1>
      <p>{purchase.price}</p>
      {#if purchase.is_verified}
        <p>Verified</p>
      {/if}
      <a href={`/profile/purchase/${purchase.id}`}> View </a>
    </div>
  {/each}
</div>
