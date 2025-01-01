<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import type { PublicScore } from "$lib/model";
  import { Button } from "$lib/components/ui";

  let { score, isVerified }: { score: PublicScore; isVerified: boolean } =
    $props();

  const renderTags = (tags: string[]) => {
    return tags.join(", ");
  };
</script>

{#snippet badges(names: string[])}
  <div class="truncate">
    : {renderTags(names)}
  </div>
{/snippet}

<Card.Root class="h-[300px]">
  <Card.Header>
    <Card.Title>{score.title}</Card.Title>
    <Card.Description class="line-clamp-2">{score.description}</Card.Description>
  </Card.Header>
  <Card.Content
    class="grid grid-cols-[100px,_1fr] gap-4 justify-center text-sm"
  >
    <div>Kategori</div>
    {@render badges(score.categories)}
    <div>Instrumen</div>
    {@render badges(score.instruments)}
    <div>Peruntukan</div>
    {@render badges(score.allocations)}
  </Card.Content>
  {#if isVerified}
    <Card.Footer>
      <div class="w-full">
        <a href={`/score/${score.id}`}>
          <Button class="w-full">View</Button>
        </a>
      </div>
    </Card.Footer>
  {/if}
</Card.Root>
