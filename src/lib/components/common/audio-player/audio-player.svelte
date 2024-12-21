<script lang="ts">
	import { cn } from "$lib/utils.js";
  type AudioPlayerProps = {
    src: string;
    className?: string;
  };

  let { src, className }: AudioPlayerProps = $props();
  let player: HTMLAudioElement;
  $effect(() => {
    if (player) {
      player.load();
    }
  });
</script>

<audio controls class={cn("w-full", className )} bind:this={player}>
  <source {src} type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
