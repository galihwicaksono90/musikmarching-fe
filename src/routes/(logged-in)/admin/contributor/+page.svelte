<script lang="ts">
	import type { PageData } from "./$types";
	import { AdminContributorTable } from "$lib/components/table";
	let { data }: { data: PageData } = $props();
</script>

<AdminContributorTable data={data.contributors} />
