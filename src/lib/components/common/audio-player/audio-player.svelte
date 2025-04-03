<script lang="ts">
	type AudioPlayerProps = {
		src: string;
		className?: string;
	};

	let { src }: AudioPlayerProps = $props();
	let player: HTMLAudioElement;
	$effect(() => {
		if (player) {
			player.load();
		}
		return () => {
			player.remove();
		};
	});
</script>

<audio controls bind:this={player} class="w-full bg-red-500">
	<source {src} type="audio/mpeg" />
	Your browser does not support the audio element.
</audio>
