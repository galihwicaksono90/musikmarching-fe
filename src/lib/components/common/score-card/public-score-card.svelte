<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import type { PublicScore } from "$lib/model";
  import { ScoreImageCarousel } from "$lib/components/common";
  import { Button } from "$lib/components/ui";

  let { score, isVerified }: { score: PublicScore; isVerified: boolean } =
    $props();
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{score.title}</Card.Title>
    <Card.Description>Lorem ipsum dolor sit amet</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="max-w-32">
      <ScoreImageCarousel images={score.pdf_image_urls} />
    </div>
  </Card.Content>
  {#if isVerified}
    <Card.Footer>
      <a href={`/score/${score.id}`}>
        <Button>Buy</Button>
      </a>
    </Card.Footer>
  {/if}
</Card.Root>
