<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<h1>Contributor Score Page</h1>
<pre>{JSON.stringify(data.score, null, 4)}</pre>
