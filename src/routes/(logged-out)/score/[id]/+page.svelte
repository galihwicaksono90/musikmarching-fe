<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const { user } = data;
</script>

<pre>{JSON.stringify(data.user, null, 4)}</pre>
<pre>{JSON.stringify(data.score, null, 4)}</pre>
{#if !!user}
  <form method="POST" action={`?/purchase`}>
    <button type="submit">Purchase!</button>
  </form>
{/if}
