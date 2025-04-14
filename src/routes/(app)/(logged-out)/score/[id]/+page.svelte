<script lang="ts">
  import ArrowLeft from "lucide-svelte/icons/arrow-left";
  import { Separator } from "$lib/components/ui";
  import { AudioPlayer, ScoreImageCarousel } from "$lib/components/common";
  import { difficultyLabels } from "$lib/model";
  import { Badge } from "$lib/components/ui";
  import type { PageData } from "./$types";
  import { PurchaseScoreForm } from "$lib/components/form";

  let { data }: { data: PageData } = $props();

  const { user } = data;
</script>

{#snippet scoreProperty(title: string, content: string | string[])}
  <div>
    <p class="font-medium">{title}</p>
    <p class="text-muted-foreground">
      {#if Array.isArray(content)}
        {content.join(", ")}
      {:else}
        {content}
      {/if}
    </p>
  </div>
{/snippet}

<main class="flex-1">
  <div class="container px-4 py-6 md:px-6 md:py-12">
    <a
      href="/"
      class="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft class="mr-2 h-4 w-4" />
      Kembali ke katalog
    </a>
    <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
      <div class="flex flex-col gap-4">
        <div class="relative overflow-hidden rounded-lg border">
          <div>
            <ScoreImageCarousel
              images={data.score.pdf_image_urls}
              className="w-full h-full max-w-full"
            />
          </div>
          {#if data.score.content_type === "exclusive"}
            <Badge class="absolute left-2 top-2">Exclusive</Badge>
          {/if}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <h1 class="text-3xl font-bold">{data.score.title}</h1>
          <p class="text-lg text-muted-foreground">{data.score.full_name}</p>
        </div>
        <div class="text-3xl font-bold">
          {data.score.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </div>
        <AudioPlayer src={data.score.audio_url} />
        <Separator />
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-bold">Deskripsi</h2>
          <p class="text-muted-foreground">
            {data.score.description}
          </p>
        </div>
        <Separator />
        <div class="grid grid-cols-2 gap-4 text-sm">
          {@render scoreProperty(
            "Tingkat Kesulitan",
            difficultyLabels[data.score.difficulty],
          )}
          {@render scoreProperty("Instrumen", data.score.instruments)}
          {@render scoreProperty("Peruntukan", data.score.allocations)}
          {@render scoreProperty("Kategori", data.score.categories)}
        </div>
        {#if !!user}
          <Separator />
          <PurchaseScoreForm data={data.form} score={data.score}/>
        {/if}
      </div>
    </div>
  </div>
</main>
