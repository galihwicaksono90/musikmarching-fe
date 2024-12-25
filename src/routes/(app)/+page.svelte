<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "$lib/components/ui";
	import { PublicScoreCard } from "$lib/components/common";

	let { data }: { data: PageData } = $props();
</script>

<a href="http://localhost:8080/oauth2/google">Login</a>
<a href="http://localhost:8080/oauth2/logout/google">Logout</a>

<div class="flex mb-8 justify-between">
{#if data.user?.email}
	<h1>{data.user.email}</h1>
{/if}
{#if !!data.user}
	<a href="/profile">
		<Button>My Profile</Button>
	</a>
{/if}
</div>
<div class="flex gap-8 justify-between">
	{#each data.scores as score}
		<PublicScoreCard {score} isVerified={!!data.user}/>
	{/each}
</div>
