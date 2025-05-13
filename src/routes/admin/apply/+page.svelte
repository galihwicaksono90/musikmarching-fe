<script lang="ts">
	import type { PageData } from "./$types";
	import { AdminContributorApplyTable } from "$lib/components/table";

	let { data }: { data: PageData } = $props();
</script>

<AdminContributorApplyTable applications={data.applications} form={data.form} />
