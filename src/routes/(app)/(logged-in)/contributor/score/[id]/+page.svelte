<script lang="ts">
  import type { PageData } from "./$types";
  import { ScoreCard } from "$lib/components/common";
  import { ContributorScoreForm } from "$lib/components/form";

  let { data }: { data: PageData } = $props();
</script>

<h1>Contributor Score Page</h1>

<section class="flex flex-col gap-8">
<ContributorScoreForm
  data={data.form}
  isEditing
  instrumentOptions={data.tags.instrumentOptions}
  categoryOptions={data.tags.categoryOptions}
  allocationOptions={data.tags.allocationOptions}
/>
<ScoreCard score={data.score} />
</section>
