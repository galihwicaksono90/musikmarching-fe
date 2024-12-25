<script lang="ts">
  import type { PageData } from "./$types";
  import { ScoreCard } from "$lib/components/common";
  import { ContributorScoreForm } from "$lib/components/form";

  let { data }: { data: PageData } = $props();
</script>

<h1>Contributor Score Page</h1>

<ContributorScoreForm data={data.form} isEditing />
<ScoreCard score={data.score} />
