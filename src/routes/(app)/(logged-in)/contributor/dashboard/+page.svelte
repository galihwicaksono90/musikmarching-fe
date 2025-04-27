<script lang="ts">
	import type { Icon as IconType } from "@lucide/svelte";
	import type { PageData } from "./$types";
	import { Button } from "$lib/components/ui";
	import Chart from "@lucide/svelte/icons/chart-column-increasing";
	import HandCoins from "@lucide/svelte/icons/hand-coins";
	import Music from "@lucide/svelte/icons/music";
	import * as Card from "$lib/components/ui/card";
	import * as Table from "$lib/components/ui/table";


	type CardData = {
		title: string;
		description?: string;
		icon: typeof IconType;
		content: string;
	};

	let { data }: { data: PageData } = $props();

	const revenue = $derived(data.statistics?.revenue ?? 0);
</script>

{#snippet itemCard({ title, description, content, icon }: CardData)}
	{@const Icon = icon}
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between">
			<Card.Title class="font-bold">{title}</Card.Title>
			<Icon class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{content}</div>
			{#if description}
				<p class="text-xs text-muted-foreground">{description}</p>
			{/if}
		</Card.Content>
	</Card.Root>
{/snippet}

<div class="grid grid-cols-3 gap-4">
	{@render itemCard({
		title: "Total Sales",
		icon: Chart,
		content: String(data.statistics?.purchase_count ?? 0),
	})}
	{@render itemCard({
		title: "Total Revenue",
		icon: HandCoins,
		content: revenue.toLocaleString("id-ID", {
			style: "currency",
			currency: "IDR",
		}),
	})}
	{@render itemCard({
		title: "Total Scores",
		icon: Music,
		content: String(data.statistics?.score_count ?? 0),
	})}
</div>

<Card.Root>
	<Card.Header>
		<Card.Title>Top Performing Scores</Card.Title>
		<Card.Description>Your best-selling music scores</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Judul</Table.Head>
					<Table.Head>Sales</Table.Head>
					<Table.Head>Revenue</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.scores as score (score.id)}
					<Table.Row>
						<Table.Cell class="font-medium">
							<div class="flex items-center gap-3 h-10">
									<div class="font-medium">{score.title}</div>
									<!-- <div class="text-sm text-muted-foreground"> -->
									<!-- 	{score.title} -->
									<!-- </div> -->
							</div>
						</Table.Cell>
						<Table.Cell>{score.count}</Table.Cell>
						<Table.Cell
							>{score.revenue.toLocaleString("id-ID", {
								style: "currency",
								currency: "IDR",
							})}</Table.Cell
						>
						<!-- <Table.Cell> -->
						<!-- 	{score.rating} ({score.reviews}) -->
						<!-- </Table.Cell> -->
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<Button href="/contributor/score" variant="outline" class="w-full">
			View All Scores
		</Button>
	</Card.Footer>
</Card.Root>
