<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import {
    type PublicScore,
    contentTypeLabels,
    difficultyLabels,
  } from "$lib/model";
  import { Badge, Button } from "$lib/components/ui";

  let { score }: { score: PublicScore; isVerified: boolean } = $props();

  const renderTags = (tags: string[]) => {
    return tags.join(", ");
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

<Card.Root class="h-fit">
  <Card.Header>
    <Card.Title>{score.title}</Card.Title>
    <Card.Description class="line-clamp-2">{score.description}</Card.Description
    >
  </Card.Header>
  <Card.Content class="grid grid-cols-[80px,_1fr] gap-4 justify-center text-sm">
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
  </Card.Content>
  <Card.Footer>
    <div class="w-full">
      <a href={`/score/${score.id}`}>
        <Button class="w-full">Lihat</Button>
      </a>
    </div>
  </Card.Footer>
</Card.Root>
