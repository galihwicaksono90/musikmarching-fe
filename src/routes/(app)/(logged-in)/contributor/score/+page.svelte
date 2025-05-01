<script lang="ts">
	import { Input, Button, Badge } from "$lib/components/ui";
	import { ContributorScoresPagination } from "$lib/components/common";
	import { usePagination, useDebounce } from "$lib/hooks";
	import Upload from "@lucide/svelte/icons/upload";
	import * as Card from "$lib/components/ui/card";
	import * as Table from "$lib/components/ui/table";
	import * as Select from "$lib/components/ui/select";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import Ellipsis from "@lucide/svelte/icons/ellipsis";
	import Edit from "@lucide/svelte/icons/edit";
	import Download from "@lucide/svelte/icons/download";
	import Trash from "@lucide/svelte/icons/trash";
	import { page } from "$app/stores";
	import { getFlash } from "sveltekit-flash-message/client";
	import { toast } from "$lib/util";
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";

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

	const { enhance, formId } = superForm(data.form, {
		delayMs: 300,
		clearOnSubmit: "errors",
	});

	let verifiedSort = $state<"asc" | "desc">("asc");
	let countSort = $state<"asc" | "desc">("asc");

	const debouncedText = useDebounce("");

	let pagination = usePagination({
		items: data.scores,
		sort: (a, b) => {
			if (a.is_verified !== b.is_verified) {
				return verifiedSort === "asc"
					? Number(b.is_verified) - Number(a.is_verified)
					: Number(a.is_verified) - Number(b.is_verified);
			}
			return countSort === "asc"
				? b.purchase_count - a.purchase_count
				: a.purchase_count - b.purchase_count;
		},
		limit: 4,
		filter: (item) =>
			item.title.toLowerCase().includes(debouncedText.value.toLowerCase()),
	});

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
		<form method="POST" use:enhance>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Score</Table.Head>
						<Table.Head>Price</Table.Head>
						<Table.Head class="hidden md:table-cell">Sales</Table.Head>
						<Table.Head class="hidden md:table-cell">Revenue</Table.Head>
						<Table.Head class="hidden md:table-cell">Status</Table.Head>
						<Table.Head class="text-right">Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each pagination.paginatedItems as score (score.id)}
						<Table.Row>
							<Table.Cell>
								<div class="flex items-center gap-3">
									<!-- <div class="relative h-12 w-12 overflow-hidden rounded"> -->
									<!-- 	<img -->
									<!-- 		src={score. || "/placeholder.svg"} -->
									<!-- 		alt={score.title} -->
									<!-- 		fill -->
									<!-- 		class="object-cover" -->
									<!-- 	/> -->
									<!-- </div> -->
									<div>
										<div class="font-medium">{score.title}</div>
										<!-- <div class="text-sm text-muted-foreground"> -->
										<!-- 	{score?.full_name} -->
										<!-- </div> -->
									</div>
								</div>
							</Table.Cell>
							<Table.Cell
								>{score.price.toLocaleString("id-ID", {
									style: "currency",
									currency: "IDR",
								})}</Table.Cell
							>
							<Table.Cell class="hidden md:table-cell"
								>{score.purchase_count}</Table.Cell
							>
							<Table.Cell class="hidden md:table-cell">revenue</Table.Cell>
							<Table.Cell class="hidden md:table-cell">
								<Badge variant={score.is_verified ? "default" : "secondary"}>
									<!-- {score.status.charAt(0).toUpperCase() + score.status.slice(1)} -->
									{score.is_verified ? "Verified" : "Not Verified"}
								</Badge>
							</Table.Cell>
							<Table.Cell class="text-right">
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										<Button variant="ghost" size="icon">
											<Ellipsis class="h-4 w-4" />
											<span class="sr-only">Open menu</span>
										</Button>
									</DropdownMenu.Trigger>
									<DropdownMenu.Content align="end">
										<DropdownMenu.Label>Actions</DropdownMenu.Label>
										<!-- <DropdownMenu.Item> -->
										<!-- 	<Eye class="mr-2 h-4 w-4" /> -->
										<!-- 	<span>View Details</span> -->
										<!-- </DropdownMenu.Item> -->
										<DropdownMenu.Item>
											<a
												href="/contributor/score/{score.id}"
												class="flex items-center gap-2"
											>
												<Edit class="mr-2 h-4 w-4" />
												<span>Edit Score</span>
											</a>
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<Download class="mr-2 h-4 w-4" />
											<span>Download Files</span>
										</DropdownMenu.Item>
										<DropdownMenu.Separator />
										<DropdownMenu.Item class="text-destructive">
											<button 
												class="flex flex-row gap-2 justify-center items-center"
												formaction="?/delete"
												name="id"
												value={score.id}
												onclick={() => $formId = score.id}
											>
												<Trash class="mr-2 h-4 w-4" />
												<span>Delete Score</span>
												{$formId}
											</button>
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</form>
	</Card.Content>
	<Card.Footer class="flex justify-between p-4">
		<div class="text-sm text-muted-foreground">
			Showing {pagination.showingRange} of {pagination.count} scores
		</div>

		{#if pagination.count > pagination.limit}
			<ContributorScoresPagination
				page={pagination.page}
				count={pagination.count}
				setPage={pagination.setPage}
				limit={pagination.limit}
			/>
		{/if}

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
