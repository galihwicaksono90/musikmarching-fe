<script lang="ts">
  import type { ContributorScore } from "$lib/model";

  let { score }: { score: ContributorScore } = $props();
</script>

<div>
  <h5 class="card-title">{score.title}</h5>
  <audio controls>
    <source src={score.music_url} type="audio/mpeg" />
  </audio>
</div>
