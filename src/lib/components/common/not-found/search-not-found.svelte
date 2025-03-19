<script lang="ts">
  import { Button } from "$lib/components/ui/";
  import FileMusic from "lucide-svelte/icons/file-music";
  import RefreshCw from "lucide-svelte/icons/refresh-cw";

  let { hasFilters } = $props();
</script>

<div
  class="flex flex-col items-center justify-center py-16 text-center bg-gray-100 w-full"
>
  <div class="mb-6 rounded-full bg-muted p-6">
      <FileMusic class="h-12 w-12 text-muted-foreground" />
  </div>

  <h3 class="mb-2 text-2xl font-bold">
    {hasFilters ? "Tidak ada hasil yang sesuai" : "Tidak ada hasil"}
  </h3>

  <p class="mb-8 max-w-md text-muted-foreground">
    {hasFilters
      ? "Kami tidak dapat menemukan skor musik yang cocok dengan kriteria pencarian Anda saat ini. Coba sesuaikan filter atau kata pencarian Anda."
      : "Saat ini tidak ada skor musik yang tersedia di katalog kami. Silakan periksa kembali nanti karena kami terus menambahkan skor musik baru."}
  </p>

  {#if hasFilters}
    <div class="flex flex-col gap-4 sm:flex-row">
      <Button class="flex items-center gap-2">
        <a href="/" class="flex items-center gap-2">
          <RefreshCw class="h-4 w-4" />
          Hapus Semua Filter
        </a>
      </Button>
    </div>
  {/if}
</div>
