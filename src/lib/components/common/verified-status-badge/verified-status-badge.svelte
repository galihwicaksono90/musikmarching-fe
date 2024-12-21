<script lang="ts">
  import { Badge } from "$lib/components/ui";
  let { isVerified }: { isVerified: boolean } = $props();
</script>

<div class="max-h-4">
  {#if isVerified}
    <Badge variant="outline" class="bg-blue-500">Verified</Badge>
  {:else}
    <Badge variant="destructive">Not Verified</Badge>
  {/if}
</div>
