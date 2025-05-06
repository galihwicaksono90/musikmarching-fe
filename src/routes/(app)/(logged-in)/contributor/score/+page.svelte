<script lang="ts">
	import { Input, Button } from "$lib/components/ui";
	import { ContributorScoresPagination } from "$lib/components/common";
	import { usePagination, useDebounce } from "$lib/hooks";
	import Upload from "@lucide/svelte/icons/upload";
	import * as Card from "$lib/components/ui/card";
	import * as Select from "$lib/components/ui/select";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message/client";
	import { toast } from "$lib/util";
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";
	import { invalidateAll } from "$app/navigation";

	import { ContributorScoreTable } from "$lib/components/table";

	const flash = getFlash(page);

	const sortOptions = [
		{ value: "asc", label: "Ascending" },
		{ value: "desc", label: "Descending" },
	];

	$effect(() => {
		if (!$flash) return;

		toast({
			type: $flash.type,
			message: $flash?.message,
		});

		$flash = undefined;
	});

	let { data }: { data: PageData } = $props();

	let verifiedSort = $state<"asc" | "desc">("asc");
	let countSort = $state<"asc" | "desc">("asc");

	const debouncedText = useDebounce("");

	const scores = $derived.by(() => {
		const filtered = data.scores.filter((item) =>
			item.title.toLowerCase().includes(debouncedText.value.toLowerCase()),
		);
		return filtered.sort((a, b) => {
			if (a.is_verified !== b.is_verified) {
				return verifiedSort === "asc"
					? Number(b.is_verified) - Number(a.is_verified)
					: Number(a.is_verified) - Number(b.is_verified);
			}
			return countSort === "asc"
				? b.purchase_count - a.purchase_count
				: a.purchase_count - b.purchase_count;
		});
	});

	let pagination = usePagination({
		limit: 4,
		count: () => scores.length,
	});

	$effect(() => {
		if (debouncedText.value) {
			pagination.setPage(1);
		}
	});

	const paginatedItems = $derived(
		scores.slice(
			(pagination.page - 1) * pagination.limit,
			pagination.page * pagination.limit,
		),
	);

	const onValueChange = () => {
		pagination.setPage(1);
	};
</script>

<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
	<div class="flex w-full max-w-sm items-center space-x-2">
		<Input
			placeholder="Search scores..."
			value={debouncedText.value}
			onkeyup={(e) => debouncedText.update(e.currentTarget.value)}
		/>
	</div>
	<div class="flex flex-wrap gap-2">
		<Select.Root type="single" bind:value={verifiedSort} {onValueChange}>
			<Select.Trigger class="w-[140px]"
				>{sortOptions.find((o) => o.value === verifiedSort)
					?.label}</Select.Trigger
			>
			<Select.Content>
				{#each sortOptions as option}
					<Select.Item value={option.value}>{option.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<Select.Root type="single" bind:value={countSort} {onValueChange}>
			<Select.Trigger class="w-[140px]"
				>{sortOptions.find((o) => o.value === countSort)?.label}</Select.Trigger
			>
			<Select.Content>
				{#each sortOptions as option}
					<Select.Item value={option.value}>{option.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
</div>

<Card.Root>
	<Card.Content class="p-0">
		<ContributorScoreTable scores={paginatedItems} form={data.form} />
	</Card.Content>
	<Card.Footer class="flex justify-between p-4">
		<div class="text-sm text-muted-foreground">
			Showing {pagination.showingRange} of {scores.length} scores
		</div>

		<ContributorScoresPagination
			page={pagination.page}
			count={scores.length}
			limit={pagination.limit}
			setPage={pagination.setPage}
		/>

		<Button href="/contributor/score/create">
			<Upload class="mr-2 h-4 w-4" />
			Upload New Score
			<!-- <Link href="/contributor/upload"> -->
			<!-- 	<Upload class="mr-2 h-4 w-4" /> -->
			<!-- 	Upload New Score -->
			<!-- </Link> -->
		</Button>
	</Card.Footer>
</Card.Root>
