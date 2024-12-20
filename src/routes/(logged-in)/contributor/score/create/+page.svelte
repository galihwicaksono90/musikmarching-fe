<script lang="ts">
  import type { PageData } from "./$types";
  import { ContributorScoreForm } from "$lib/components/form";
  let { data }: { data: PageData } = $props();
</script>

<ContributorScoreForm data={data.form} />
