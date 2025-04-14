<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { LoggedInLayout } from "$lib/components/common";
	import { adminLayoutData } from "$lib/components/common/layout/logged-in-layout/logged-in-layout.model";

	let { children }: { data: LayoutData; children: Snippet } = $props();
</script>

<LoggedInLayout data={adminLayoutData}>
	<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
		{@render children()}
	</main>
</LoggedInLayout>
