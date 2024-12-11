<script lang="ts">
  let { data } = $props();
</script>

<pre>{JSON.stringify(data, null, 4)}</pre>
<form method="POST">
  <button type="submit">Purchase!</button>
</form>
