<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "$lib/components/ui";

	let { data }: { data: PageData } = $props();
</script>

<h1>Contributor Page</h1>
<div class="flex gap-8">
	{#each data.scores as score}
		<a href={`/contributor/score/${score.id}`}>
			<div class="w-32 flex gap-8 w-full border-2 rounded-xl shadow-md p-8">
				<div class="flex flex-col">
					<p>{score.title}</p>
					<p>{score.price}</p>
					<p>{String(score.is_verified)}</p>
					<button> View </button>
				</div>
			</div>
		</a>
	{/each}
</div>
<a href="/contributor/score/create">
	<Button>Create Score</Button>
</a>
