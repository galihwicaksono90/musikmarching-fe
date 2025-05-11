<script lang="ts">
	import type { LayoutData } from "./$types";
	import { MainLayout } from "$lib/components/common";
	import type { Snippet } from "svelte";
	let { children, data }: { data: LayoutData; children: Snippet } = $props();
</script>

<MainLayout user={data.user}>
	{@render children()}
</MainLayout>
