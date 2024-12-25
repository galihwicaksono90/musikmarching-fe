<script lang="ts">
	import type { LayoutData } from "./$types";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Avatar, AvatarFallback, Button } from "$lib/components/ui";
	import type { Snippet } from "svelte";
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="w-full bg-blue-900">
	<nav class="flex justify-between h-16 container mx-auto items-center">
		<a href="/">
			<p class="text-lg font-semibold md:text-2xl">Musik Marching</p>
		</a>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="secondary"
					size="icon"
					class="rounded-full ml-auto"
				>
					<Avatar>
						<AvatarFallback>GA</AvatarFallback>
					</Avatar>
					<span class="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<a href="/profile">
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
				</a>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Item>Support</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Logout</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</nav>
</div>
<main class="container mx-auto py-8">
	{@render children()}
</main>
