<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const { purchase } = data;
</script>

<pre>{JSON.stringify(purchase, null, 4)}</pre>
<pre>{purchase.created_at}</pre>
