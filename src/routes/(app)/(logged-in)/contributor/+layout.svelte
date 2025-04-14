<script lang="ts">
	import type { Snippet } from "svelte";
	import { LoggedInLayout } from "$lib/components/common";
	import { contributorLayoutData } from "$lib/components/common/layout/logged-in-layout/logged-in-layout.model";

	let { children }: { children: Snippet } = $props();
</script>

<LoggedInLayout data={contributorLayoutData}>
	<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
		{@render children?.()}
	</main>
</LoggedInLayout>
