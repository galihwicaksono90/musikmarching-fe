<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "$lib/components/ui";
	import * as Card from "$lib/components/ui/card";
	import { ContributorRegisterForm } from "$lib/components/form";

	let { data }: { data: PageData } = $props();
</script>

<h1>Contributor Page</h1>
{#if !data.user?.is_verified}
	<h3>
		Your account is not verified yet. Please wait for the admin to verify your
		account
	</h3>
	<Card.Root class="max-w-xl mx-auto">
		<Card.Header>
			<Card.Title>Your Contributor Profile</Card.Title>
			<Card.Description>
				Please fill in your profile to become a contributor
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<ContributorRegisterForm data={data.form} />
		</Card.Content>
	</Card.Root>
{:else}
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
{/if}
