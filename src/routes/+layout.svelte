<script lang="ts">
	import type { LayoutData } from "./$types";
	import "../app.css";
	import type { Snippet } from "svelte";

	let { children }: { data: LayoutData; children: Snippet } = $props();
</script>

{@render children()}
