<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const { form } = superForm(data.form);
</script>

<form method="POST">
  <label for="title"
    >Title
    <input type="text" name="title" bind:value={$form.title} />
  </label>
  <label for="price"
    >Price
    <input type="number" name="price" bind:value={$form.number} />
  </label>
  <label for="pdf-file"
    >PDF File
    <input type="file" name="pdf_file" bind:files={$form.pdf_file} />
  </label>
  <label for="music-file"
    >Music File
    <input type="file" name="music_file" bind:files={$form.music_file} />
  </label>
  <button type="submit">Submit</button>
</form>
