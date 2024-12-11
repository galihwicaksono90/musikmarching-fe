<script lang="ts">
	// import { onMount } from "svelte";

	let { data } = $props();

	// onMount(async () => {
	// 	const data = await fetch("http://localhost:8080/svelte/me").then((r) => r.json());
	// 	console.log({ y: data });
	// });
</script>

<a href="http://localhost:8080/oauth2/google">Login</a>
<a href="http://localhost:8080/oauth2/logout/google">Logout</a>
<pre>{JSON.stringify(data, null, 4)}</pre>
