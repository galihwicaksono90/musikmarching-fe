<script lang="ts">
	import type { LayoutData } from "./$types";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Avatar, AvatarFallback, Button } from "$lib/components/ui";
	import type { User } from "$lib/model";
	import type { Snippet } from "svelte";
	let { children, data }: { data: LayoutData; children: Snippet } = $props();
	import {
		PUBLIC_GOOGLE_LOGIN_URL,
		PUBLIC_GOOGLE_LOGOUT_URL,
	} from "$env/static/public";
</script>

{#snippet loggedIn(user: User)}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="secondary"
				size="icon"
				class="rounded-full ml-auto"
			>
				<Avatar>
					<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
				</Avatar>
				<span class="sr-only">Toggle user menu</span>
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<a href="/profile">
				<DropdownMenu.Item>My Profile</DropdownMenu.Item>
			</a>
			<DropdownMenu.Separator />
			<a href={PUBLIC_GOOGLE_LOGOUT_URL}>
				<DropdownMenu.Item>Logout</DropdownMenu.Item>
			</a>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

{#snippet loggedOut()}
	<a href={PUBLIC_GOOGLE_LOGIN_URL}>
		<Button variant="outline" class="font-bold" >
			LOGIN
		</Button>
	</a>
{/snippet}

<div class="w-full bg-blue-900">
	<nav class="flex justify-between h-16 container mx-auto items-center">
		<a href="/">
			<h1 class="text-lg font-semibold md:text-2xl text-white">Musik Marching</h1>
		</a>
		{#if data.user}
			{@render loggedIn(data.user)}
		{:else}
			{@render loggedOut()}
		{/if}
	</nav>
</div>

<main class="container mx-auto py-8">
	{@render children()}
</main>
