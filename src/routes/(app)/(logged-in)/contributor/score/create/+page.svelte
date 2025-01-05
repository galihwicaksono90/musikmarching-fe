<script lang="ts">
  import type { PageData } from "./$types";
  import { ContributorScoreForm } from "$lib/components/form";
  let { data }: { data: PageData } = $props();
</script>

<div class="p-8 w-full">
  <div class="w-full border p-8 rounded-md">
    <h3 class="mb-8 text-2xl font-bold">Buat Score</h3>
    <ContributorScoreForm
      data={data.form}
      instrumentOptions={data.tags.instrumentOptions}
      categoryOptions={data.tags.categoryOptions}
      allocationOptions={data.tags.allocationOptions}
    />
  </div>
</div>
