<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import type { PublicScore } from "$lib/model";
  import {ScoreImageCarousel} from "$lib/components/common"

  let { score }: { score: PublicScore } = $props();
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{score.title}</Card.Title>
    <Card.Description>Lorem ipsum dolor sit amet</Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="max-w-sm">
    <ScoreImageCarousel images={score.pdf_image_urls} />
    </div>
    hello world
  </Card.Content>
</Card.Root>
