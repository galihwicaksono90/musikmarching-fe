<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { type PublicScore } from "$lib/model";
  import { Badge, Button } from "$lib/components/ui";
  import AudioPlayerButton from "../audio-player-button/audio-player-button.svelte";
  import FileMusic from "lucide-svelte/icons/file-music";

  let { score }: { score: PublicScore } = $props();
</script>

<Card.Root>
  <Card.Header
    class="p-0 relative aspect-[1] overflow-hidden bg-gray-100 rounded-t-lg"
  >
    <img
      src={score.pdf_image_urls[0]}
      class="h-full w-full object-cover"
      alt={score.title}
    />
    {#if score.content_type === "exclusive"}
      <Badge class="absolute top-2 left-2">Exclusive</Badge>
    {/if}
  </Card.Header>
  <Card.Content class="flex flex-col gap-2">
    <a href={`/score/${score.id}`}>
      <h3 class="line-clamp-1 text-lg font-bold hover:underline">
        {score.title}
      </h3>
    </a>
    <p class="text-sm text-muted-foreground">{score.full_name}</p>
    <div class="mt-2 flex items-center justify-between">
      <span class="font-medium"
        >{score.price.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}</span
      >
      <div class="flex items-center gap-1">
        <FileMusic class="h-4 w-4 text-muted-foreground" />
        <span class="text-xs text-muted-foreground">PDF + MP3</span>
      </div>
    </div>
  </Card.Content>
  <Card.Footer class="flex flex-row gap-2">
    <div>
      <AudioPlayerButton src={score.audio_url} />
    </div>
    <div class="flex-1">
      <a href={`/score/${score.id}`}>
        <Button class="w-full">Lihat</Button>
      </a>
    </div>
  </Card.Footer>
</Card.Root>
