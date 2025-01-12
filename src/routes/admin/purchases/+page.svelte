<script lang="ts">
	import { AdminPurchaseTable } from "$lib/components/table";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<h1>Purchase Page</h1>
<AdminPurchaseTable data={data.purchases} />
