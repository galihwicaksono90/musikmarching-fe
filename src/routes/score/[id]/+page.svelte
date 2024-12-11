<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<form method="POST">
  <pre>{JSON.stringify(data.score, null, 4)}</pre>
  <button type="submit">Purchase!</button>
</form>
