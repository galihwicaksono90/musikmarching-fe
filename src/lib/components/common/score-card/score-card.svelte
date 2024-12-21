<script lang="ts">
  import type { ContributorScore } from "$lib/model";

  let { score }: { score: ContributorScore } = $props();
  let player: HTMLAudioElement;

  $effect(() => {
    if (score.audio_url) {
      player.load();
    }
  });
</script>

<div>
  <h5 class="card-title">{score.title}</h5>
  <iframe
    title={score.title}
    src={score.pdf_url}
    frameBorder="0"
    scrolling="auto"
    height="500px"
    width="500px"
  ></iframe>
  <audio controls bind:this={player}>
    <source src={score.audio_url} type="audio/mpeg" />
  </audio>
  {#each score.pdf_image_urls as image}
    <img src={image} alt={score.title} />
  {/each}
</div>
