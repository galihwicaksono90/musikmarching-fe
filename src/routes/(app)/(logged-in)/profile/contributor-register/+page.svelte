<script lang="ts">
  import type { PageData } from "./$types";
  import { ContributorRegisterForm } from "$lib/components/form";

  let { data }: { data: PageData } = $props();
</script>

<div class="max-w-xl mx-auto p-8 border rounded-xl flex flex-col gap-8">
  <h1 class="text-2xl font-bold">Register as Contributor</h1>
  <ContributorRegisterForm data={data.form} />
</div>
