<script lang="ts">
	import type { LayoutData } from "./$types";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Avatar, AvatarFallback, Button } from "$lib/components/ui";
	import Music from "lucide-svelte/icons/music";
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
		<DropdownMenu.Trigger asChild>
			{#snippet children()}
				<Button variant="secondary" size="icon" class="rounded-full ml-auto">
					<Avatar>
						<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<span class="sr-only">Toggle user menu</span>
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			<a href="/profile">
				<DropdownMenu.Item>Profil</DropdownMenu.Item>
			</a>
			{#if user.role_name === "contributor"}
				<a href="/contributor">
					<DropdownMenu.Item>Kontributor</DropdownMenu.Item>
				</a>
			{/if}
			{#if user.role_name === "admin"}
				<a href="/admin">
					<DropdownMenu.Item>Admin</DropdownMenu.Item>
				</a>
			{/if}
			<DropdownMenu.Separator />
			<a href={PUBLIC_GOOGLE_LOGOUT_URL}>
				<DropdownMenu.Item>Logout</DropdownMenu.Item>
			</a>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

{#snippet loggedOut()}
	<a href={PUBLIC_GOOGLE_LOGIN_URL}>
		<Button variant="outline" class="font-bold">LOGIN</Button>
	</a>
{/snippet}

<header class="w-full shadow">
	<nav class="flex justify-between h-16 container mx-auto items-center">
		<a href="/" class="flex flex-row gap-2 items-center">
			<Music />
			<h1 class="text-lg font-extrabold md:text-2xl uppercase">
				Musik Marching
			</h1>
		</a>
		{#if data.user}
			<div class="flex flex-row items-center gap-4">
				<div>{data.user.name}</div>
				{@render loggedIn(data.user)}
			</div>
		{:else}
			{@render loggedOut()}
		{/if}
	</nav>
</header>

<main class="container mx-auto py-8">
	{@render children()}
</main>

<footer class="bg-gray-100 mt-auto">
	<div class="container mx-auto py-4 flex justify-center">
		Copyright © 2025 MusikMarching
	</div>
</footer>
