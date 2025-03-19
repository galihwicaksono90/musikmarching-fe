<script lang="ts">
  import { enhance } from "$app/forms";
  import { AudioPlayer, ScoreImageCarousel } from "$lib/components/common";
  import {
    type PublicScore,
    contentTypeLabels,
    difficultyLabels,
  } from "$lib/model";
  import { Badge, Button } from "$lib/components/ui";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const { user } = data;

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    console.log("submit");
  };
</script>

{#snippet badges(names: string[])}
  <!-- <div class="truncate"> -->
  <!--   : {renderTags(names)} -->
  <!-- </div> -->
  <div class="flex gap-1 flex-wrap">
    {#each names as name}
      <Badge>{name}</Badge>
    {/each}
  </div>
{/snippet}

{#snippet items(score: PublicScore)}
  <div class="grid grid-cols-[80px,_1fr] gap-4 justify-center text-sm">
    <div>Penulis</div>
    <div>: {score.full_name}</div>
    <div>Kesulitan</div>
    <div>: {difficultyLabels[score.difficulty]}</div>
    <div>Jenis konten</div>
    <div>: {contentTypeLabels[score.content_type]}</div>
    <div>Kategori</div>
    {@render badges(score.categories)}
    <div>Instrumen</div>
    {@render badges(score.instruments)}
    <div>Peruntukan</div>
    {@render badges(score.allocations)}
  </div>
{/snippet}

<section class="flex flex-col gap-8">
  <h1 class="text-5xl font-bold">Score {data.score.title}</h1>
  <div class="flex gap-8">
    <div class="flex flex-col gap-8 flex-1">
      <p>{data.score.description}</p>
      {@render items(data.score)}
    </div>
    <div class="w-[400px] flex flex-col gap-8">
      <div class="flex justify-center">
        <ScoreImageCarousel images={data.score.pdf_image_urls} />
      </div>
      {#if !!data.score.audio_url}
        <AudioPlayer src={data.score.audio_url} />
      {/if}
    </div>
  </div>

  {#if !!user}
    <form method="POST" onsubmit={onSubmit} use:enhance>
      <Button type="submit">Beli</Button>
    </form>
  {/if}
</section>
