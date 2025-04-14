<script lang="ts">
  import type { PageData } from "./$types";
  import { PurchaseTable } from "$lib/components/table";

  let { data }: { data: PageData } = $props();
</script>

<PurchaseTable purchases={data.purchases} />
