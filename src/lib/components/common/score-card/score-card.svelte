<script lang="ts">
  import type { ContributorScore } from "$lib/model";
  import { ScoreImageCarousel } from "../score-image-carousel";

  let { score }: { score: ContributorScore } = $props();
  let player: HTMLAudioElement;

  $effect(() => {
    if (score.audio_url) {
      player.load();
    }
  });
</script>

<div>
  <h3
    class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    {score.title}
  </h3>
  <div class="flex gap-8 justify-between">
    <div>
      <iframe
        title={score.title}
        src={score.pdf_url}
        frameBorder="0"
        scrolling="auto"
        height="500px"
        width="500px"
      ></iframe>
    </div>
    <div>
      <audio controls bind:this={player}>
        <source src={score.audio_url} type="audio/mpeg" />
      </audio>
      <ScoreImageCarousel images={score.pdf_image_urls} />
    </div>
  </div>
</div>
