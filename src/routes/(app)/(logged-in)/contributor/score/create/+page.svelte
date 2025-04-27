<script lang="ts">
  import type { PageData } from "./$types";
  import { ContributorScoreForm } from "$lib/components/form";
  import * as Card from "$lib/components/ui/card";
  import { UploadGuidelines } from "$lib/components/common";

  let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col xl:flex-row gap-8 w-full">
  <Card.Root class="basis-3/5">
    <Card.Header>
      <Card.Title>
        <h3 class="text-2xl font-bold">Buat Score</h3>
      </Card.Title>
    </Card.Header>
    <Card.Content>
      <ContributorScoreForm
        data={data.form}
        instrumentOptions={data.tags.instrumentOptions}
        categoryOptions={data.tags.categoryOptions}
        allocationOptions={data.tags.allocationOptions}
      />
    </Card.Content>
  </Card.Root>
  <UploadGuidelines class="h-fit basis-2/5"/>
</div>
