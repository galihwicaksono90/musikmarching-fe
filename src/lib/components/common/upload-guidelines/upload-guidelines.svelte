<script lang="ts">
  import * as Card from "$lib/components/ui/card";

  let { class: className }: { class?: string } = $props();
</script>

<Card.Root class={className}>
  <Card.Header>
    <Card.Title>
      <h3 class="text-2xl font-bold">Petunjuk Upload</h3>
    </Card.Title>
  </Card.Header>
  <Card.Content>
    <div>
      <h3 class="font-medium">File Requirements</h3>
      <ul class="mt-2 list-inside list-disc text-sm text-muted-foreground">
        <li>PDF scores must be high quality and readable</li>
        <li>Maximum file size: 20MB for PDFs, 10MB for MP3s</li>
        <li>Cover images should be clear and relevant</li>
        <li>All uploads must be your original work or public domain</li>
      </ul>
    </div>

    <div>
      <h3 class="font-medium">Pricing Guidelines</h3>
      <ul class="mt-2 list-inside list-disc text-sm text-muted-foreground">
        <li>Set competitive prices based on complexity</li>
        <li>Beginner scores: $1.99 - $3.99</li>
        <li>Intermediate scores: $3.99 - $5.99</li>
        <li>Advanced scores: $5.99 - $9.99</li>
      </ul>
    </div>

    <div>
      <h3 class="font-medium">Revenue Share</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        You receive 70% of each sale. Payments are processed monthly for
        balances over $20.
      </p>
    </div>
  </Card.Content>
</Card.Root>
