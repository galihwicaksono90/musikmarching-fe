<script lang="ts">
	import type { PageData } from "./$types";
	import { Button } from "$lib/components/ui";
	import * as Card from "$lib/components/ui/card";
	import { ContributorRegisterForm } from "$lib/components/form";
	import type { ContributorScore } from "$lib/model";
	import { VerifiedStatusBadge } from "$lib/components/common";

	import { AudioPlayer, ScoreImageCarousel } from "$lib/components/common";

	let { data }: { data: PageData } = $props();
</script>

