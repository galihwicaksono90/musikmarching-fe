<script lang="ts">
	import { page } from "$app/stores";
	import type { PageData } from "./$types";
	import {
		PublicScoreCard,
		MainPagination,
		SearchNotFound,
	} from "$lib/components/common";
	import { Separator } from "$lib/components/ui";
	import { MainSearchForm } from "$lib/components/form";

	let { data }: { data: PageData } = $props();

	let hasFilters = $derived(() => {
		return $page.url.searchParams.size > 0;
	});
</script>

<div class="flex flex-col md:flex-row gap-8">
	<div class="min-w-48 relative">
		<div class="sticky top-6">
			<MainSearchForm
				data={data.form}
				instrumentOptions={data.instrumentOptions}
				categoryOptions={data.categoryOptions}
				allocationOptions={data.allocationOptions}
			/>
		</div>
	</div>
	<Separator orientation="vertical" />

	{#if data.count === 0}
		<SearchNotFound {hasFilters} />
	{:else}
		<div class="flex flex-col gap-8 w-full">
			<MainPagination count={data.count} limit={data.limit} page={data.page} />
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between"
			>
				{#each data.scores as score}
					<PublicScoreCard {score} />
				{/each}
			</div>
			<MainPagination count={data.count} limit={data.limit} page={data.page} />
		</div>
	{/if}
</div>
