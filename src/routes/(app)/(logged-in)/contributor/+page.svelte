<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "$lib/components/ui";
	import * as Card from "$lib/components/ui/card";
	import { ContributorRegisterForm } from "$lib/components/form";
	import type { ContributorScore } from "$lib/model";
	import { VerifiedStatusBadge } from "$lib/components/common";

	import { AudioPlayer, ScoreImageCarousel } from "$lib/components/common";

	let { data }: { data: PageData } = $props();
</script>

{#snippet contributorScoreCard({ score }: { score: ContributorScore })}
	<Card.Root class="h-full w-full">
		<Card.Header>
			<div class="flex flex-col">
				<div class="flex flex-row justify-between -center min-h-8">
					<Card.Title>{score.title}</Card.Title>
					<VerifiedStatusBadge isVerified={score.is_verified} />
				</div>
				<Card.Description>{score.description}</Card.Description>
			</div>
		</Card.Header>
		<Card.Content>
			<div>
				<ScoreImageCarousel images={score.pdf_image_urls} />
				<AudioPlayer src={score.audio_url} />
			</div>
		</Card.Content>
		<Card.Footer class="flex justify-end">
			<a href={`/contributor/score/${score.id}`}>
				<Button>View</Button>
			</a>
		</Card.Footer>
	</Card.Root>
{/snippet}

<section class="flex flex-col gap-8">
	<div class="flex flex-row justify-between w-full">
		<h2
			class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			Daftar Score
		</h2>
		<a href="/contributor/score/create">
			<Button>Create Score</Button>
		</a>
	</div>
	{#if !data.user?.is_verified}
		<div>
			<div class="w-full border-2 rounded-xl shadow-md p-4 bg-green-700 mb-8">
				<h3>
					Your account is not verified yet. Please wait for the admin to verify
					your account
				</h3>
			</div>
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
		</div>
	{:else}
		<div class="flex flex-col gap-8">
			<div class="grid grid-cols-3 min-h-[16rem] gap-8">
				{#each data.scores as score}
					{@render contributorScoreCard({ score })}
				{/each}
			</div>
		</div>
	{/if}
</section>
