<script lang="ts">
  import type { PageData } from "./$types";
  import { ScoreCard } from "$lib/components/common";
  import { ContributorScoreForm } from "$lib/components/form";

  let { data }: { data: PageData } = $props();
  const { form, score } = data;
</script>

<h1>Contributor Score Page</h1>

<ContributorScoreForm data={form} isEditing />
<ScoreCard {score} />
