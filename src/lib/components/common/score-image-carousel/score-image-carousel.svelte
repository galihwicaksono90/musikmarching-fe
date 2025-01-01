<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel";
  import * as Card from "$lib/components/ui/card";
  let { images }: { images: string[] } = $props();
</script>

<Carousel.Root class="w-full max-w-xs">
  <Carousel.Content>
    {#each images as image, index (index)}
      <Carousel.Item>
        <div class="p-1">
          <Card.Root>
            <Card.Content
              class="flex aspect-square items-center justify-center p-6"
            >
              <img src={image} alt="Score Page" />
            </Card.Content>
          </Card.Root>
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>
