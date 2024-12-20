<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui";

  let { data }: { data: PageData } = $props();
</script>

<div class="flex gap-8">
  {#each data.purchases as purchase}
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
{#if data.user?.role_name === "user"}
  <a href="/profile/contributor-register">
    <Button>Register as contributor</Button>
  </a>
{/if}
