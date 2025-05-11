<script lang="ts">
	import ArrowLeft from "lucide-svelte/icons/arrow-left";
	import type { LayoutData } from "./$types";
	import { MainLayout } from "$lib/components/common";
	import type { Snippet } from "svelte";
	let { children, data }: { data: LayoutData; children: Snippet } = $props();
</script>

<MainLayout user={data.user}>
	<main class="flex-1">
		<div class="">
			<a
				href="/"
				class="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
			>
				<ArrowLeft class="mr-2 h-4 w-4" />
				Kembali ke profil
			</a>
		</div>
		{@render children()}
	</main>
</MainLayout>
