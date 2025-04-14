<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import type { LibraryScore } from "$lib/model";
  import { Badge, Button } from "$lib/components/ui";
  import FileAudio from "lucide-svelte/icons/file-audio";

  let { score }: { score: LibraryScore } = $props();

  const downloadFile = (type: "pdf" | "audio") => {
    const link = type === "audio" ? score.audio_url : score.pdf_url; // relative to the static/ folder
    fetch(link) // path to your file in the `static/` folder
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${score.title}.${type === "audio" ? "mp3" : "pdf"}`; // Suggested download filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const date = new Date(score.created_at);
  const createdAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
      <h3 class="line-clamp-1 text-2xl font-bold hover:underline">
        {score.title}
      </h3>
    </a>
    <p class="text-sm text-muted-foreground">{score.author_name}</p>
  </Card.Content>
  <Card.Footer class="flex flex-col gap-2">
    <div class="flex flex-col gap-4 w-full">
      <p class="text-sm text-muted-foreground">Purchased: {createdAt}</p>
      <div class="flex flex-row w-full flex-1 gap-4">
        <Button class="w-full flex-1" onclick={() => downloadFile("audio")}>
          <FileAudio />
          Audio</Button
        >
        <Button class="w-full flex-1" onclick={() => downloadFile("pdf")}>
          <FileAudio />
          PDF</Button
        >
      </div>
    </div>
  </Card.Footer>
</Card.Root>
