<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { AdminSidebar } from "$lib/components/common";
	import CircleUser from "lucide-svelte/icons/circle-user";
	import Menu from "lucide-svelte/icons/menu";

	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Sheet from "$lib/components/ui/sheet/index.js";

	let { children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div
	class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
>
	<div class="bg-muted/40 hidden border-r md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/admin" class="flex items-center gap-2 font-semibold">
					<span class="">Musikmarching Admin</span>
				</a>
			</div>
			<div class="flex-1">
				<AdminSidebar />
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header
			class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6"
		>
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button
						variant="outline"
						size="icon"
						class="shrink-0 md:hidden"
						builders={[builder]}
					>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<AdminSidebar size="large" />
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<a href="/admin" class="flex items-center gap-2 font-semibold md:hidden">
				<span class="">Musikmarching Admin</span>
			</a>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="secondary"
						size="icon"
						class="rounded-full ml-auto"
					>
						<CircleUser class="h-5 w-5" />
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<DropdownMenu.Item>Support</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Logout</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			{@render children()}
			<!-- <div class="flex items-center"> -->
			<!-- 	<h1 class="text-lg font-semibold md:text-2xl">Inventory</h1> -->
			<!-- </div> -->
			<!-- <div -->
			<!-- 	class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" -->
			<!-- > -->
			<!-- 	<div class="flex flex-col items-center gap-1 text-center"> -->
			<!-- 		<h3 class="text-2xl font-bold tracking-tight"> -->
			<!-- 			You have no products -->
			<!-- 		</h3> -->
			<!-- 		<p class="text-muted-foreground text-sm"> -->
			<!-- 			You can start selling as soon as you add a product. -->
			<!-- 		</p> -->
			<!-- 		<Button class="mt-4">Add Product</Button> -->
			<!-- 	</div> -->
			<!-- </div> -->
		</main>
	</div>
</div>
