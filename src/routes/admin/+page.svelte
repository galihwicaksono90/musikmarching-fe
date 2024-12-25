<script lang="ts">
	import type { PageData } from "./$types";
	let { data }: { data: PageData } = $props();
</script>

<div class="flex">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
		Hello Admin {data.user.name}!
	</h1>
</div>
