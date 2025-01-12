<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui";
  import { PurchaseTable } from "$lib/components/table";

  let { data }: { data: PageData } = $props();
</script>

<div class="flex gap-8">
    <PurchaseTable purchases={data.purchases} />
</div>
{#if data.user?.role_name === "user"}
  <a href="/profile/contributor-register">
    <Button>Register as contributor</Button>
  </a>
{/if}

{#if data.user?.role_name === "contributor"}
  <a href="/contributor">
    <Button>Contributor Page</Button>
  </a>
{/if}
