<script lang="ts">
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	const { scores, user } = data;
</script>

<a href="http://localhost:8080/oauth2/google">Login</a>
<a href="http://localhost:8080/oauth2/logout/google">Logout</a>

<!-- <pre>{JSON.stringify(data, null, 4)}</pre> -->
{#if user?.email}
	<h1>{user.email}</h1>
{/if}
{#each scores as score}
	<div class="w-32 bg-red-500 flex gap-8 w-full">
		<div class="flex flex-col">
			<p>{score.id}</p>
			<p>{score.title}</p>
			<p>{score.price}</p>
			<p>{score.pdf_url}</p>
			<p>{score.music_url}</p>
			<p>{score.is_verified}</p>
			<a href={`/score/${score.id}`}>View</a>
		</div>
	</div>
{/each}
