<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel";
  import * as Card from "$lib/components/ui/card";
  import { cn } from "$lib/utils";
  let { images, className }: { images: string[]; className?: string } =
    $props();
</script>

<Carousel.Root class={cn("w-full max-w-xs relative", className)}>
  <Carousel.Content class="relative">
    {#each images as image, index (index)}
      <Carousel.Item>
        <div>
          <Card.Root class="border-0">
            <Card.Content class="flex items-center justify-center border-0">
              <img src={image} alt="Score Page" />
            </Card.Content>
          </Card.Root>
        </div>
      </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous class="absolute top-[50%] left-4" />
  <Carousel.Next class="absolute top-[50%] right-4" />
</Carousel.Root>
