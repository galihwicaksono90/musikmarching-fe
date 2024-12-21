<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "$lib/components/ui";

	let { data }: { data: PageData } = $props();
</script>

<a href="http://localhost:8080/oauth2/google">Login</a>
<a href="http://localhost:8080/oauth2/logout/google">Logout</a>

<pre>{JSON.stringify(data.user, null, 4)}</pre>
{#if data.user?.email}
	<h1>{data.user.email}</h1>
{/if}
<div class="flex gap-8">
	{#each data.scores as score}
		<a href={`/score/${score.id}`}>
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
{#if !!data.user}
	<a href="/profile">
		<Button>My Profile</Button>
	</a>
{/if}
