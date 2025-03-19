<script lang="ts">
	import { Button } from "$lib/components/ui/";
	import { cn } from "$lib/utils.js";
	import Play from "lucide-svelte/icons/play";
	import Pause from "lucide-svelte/icons/pause";

	type AudioPlayerProps = {
		src: string;
		className?: string;
	};

	let paused = $state(false);

	let { src, className }: AudioPlayerProps = $props();
	let player: HTMLAudioElement;
	$effect(() => {
		if (player) {
			player.load();
		}
	  return () => {
	    player.remove();
	  }
	});
	const play = () => {
		if (paused) {
			player.play();
		} else {
			player.pause();
		}
	};
</script>

<audio controls class="hidden" bind:this={player} bind:paused>
	<source {src} type="audio/mpeg" />
	Your browser does not support the audio element.
</audio>

<Button onclick={play} class={cn("rounded-full aspect-1",className)} variant="outline">
	{#if paused}
		<Play />
	{:else}
		<Pause />
	{/if}
</Button>
