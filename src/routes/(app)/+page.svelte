<script lang="ts">
	import type { PageData } from "./$types";
	import { PublicScoreCard } from "$lib/components/common";
	import { Button, Separator } from "$lib/components/ui";
	import { MainSearchForm } from "$lib/components/form";

	let { data }: { data: PageData } = $props();

</script>

<div class="flex flex-col md:flex-row gap-8">
	<div class="min-w-48">
		<MainSearchForm
			data={data.form}
			instrumentOptions={data.instrumentOptions}
			categoryOptions={data.categoryOptions}
			allocationOptions={data.allocationOptions}
		/>
	</div>
	<Separator orientation="vertical" />
	<div
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-between"
	>
		{#each data.scores as score}
			<PublicScoreCard {score} isVerified={!!data.user} />
		{/each}
	</div>
</div>
