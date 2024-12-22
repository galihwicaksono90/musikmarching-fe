<script lang="ts">
	import { AdminPurchaseTable } from "$lib/components/table";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();
</script>

<h1>Purchase Page</h1>
<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
<AdminPurchaseTable data={data.purchases} />
