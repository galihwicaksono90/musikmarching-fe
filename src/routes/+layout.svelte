<script lang="ts">
	import { Toaster } from "$lib/components/ui/sonner";
	import type { LayoutData } from "./$types";
	import "../app.css";
	import type { Snippet } from "svelte";
	// import { ModeWatcher } from "mode-watcher";

	let { children }: { data: LayoutData; children: Snippet } = $props();
</script>

<!-- <ModeWatcher /> -->
{@render children()}
<!-- <Toaster /> -->
