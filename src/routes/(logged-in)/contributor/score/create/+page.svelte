<script lang="ts">
  import type { PageData } from "./$types.js";
  import { ContributorScoreForm } from "$lib/components/form";
  let { data }: { data: PageData } = $props();
</script>

<ContributorScoreForm data={data.form} />
