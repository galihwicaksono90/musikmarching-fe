<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "$lib/components/ui";
	import {
		AudioPlayer,
		VerifiedStatusBadge,
		ScoreImageCarousel,
	} from "$lib/components/common";
	import * as Dialog from "$lib/components/ui/dialog";
	import { enhance } from "$app/forms";
	import { toast } from "svelte-sonner";
	import { invalidateAll } from "$app/navigation";
	import { AdminScoreTable } from "$lib/components/table";
	let {
		data,
	}: {
		data: PageData;
	} = $props();

	let currentScoreId = $state<string | null>(null);

	let currentScore = $derived(
		data.scores.find((score) => score.id === currentScoreId),
	);

	const onOpen = (id: string) => {
		currentScoreId = id;
	};
</script>

<h2
	class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>
	Submitted Scores
</h2>
<AdminScoreTable scores={data.scores} {onOpen} />
<Dialog.Root
	open={!!currentScoreId}
	onOpenChange={(open) => {
		if (!open) {
			currentScoreId = null;
		}
	}}
>
	<Dialog.Content class="max-w-7xl" withCloseButton>
		<Dialog.Header>
			<Dialog.Title>{currentScore?.title}</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you're done.
			</Dialog.Description>
		</Dialog.Header>
		<VerifiedStatusBadge isVerified={!!currentScore?.is_verified} />
		{#if currentScore?.pdf_image_urls && currentScore?.pdf_image_urls.length > 0}
			<div class="flex justify-center w-full">
				<ScoreImageCarousel images={currentScore.pdf_image_urls} />
			</div>
		{/if}
		{#if currentScore?.audio_url}
			<AudioPlayer src={currentScore?.audio_url} />
		{/if}

		<Dialog.Footer class="mt-8">
			{#if !currentScore?.is_verified}
				<form
					action={`?/verify&id=${currentScore?.id}`}
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							switch (result.type) {
								case "success":
									toast.success(result.data?.message as string);
									currentScoreId = null;
									invalidateAll();
									break;
								case "error":
									toast.error("Error");
									break;
								default:
									break;
							}
						};
					}}
				>
					<Button type="submit">Verify Score</Button>
				</form>
			{/if}
			<Button
				type="submit"
				variant="outline"
				on:click={() => (currentScoreId = null)}>Close</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
