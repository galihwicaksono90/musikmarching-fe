<script lang="ts">
	import type { WithoutChild } from "bits-ui";
	import * as FormPrimitive from "formsnap";
	import { Label } from "$lib/components/ui/label/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		children,
		class: className,
		required,
		...restProps
	}: WithoutChild<FormPrimitive.LabelProps> & { required?: boolean } = $props();
</script>

<FormPrimitive.Label {...restProps} bind:ref>
	{#snippet child({ props })}
		<Label {...props} class={cn("data-[fs-error]:text-destructive", className)}>
			{@render children?.()}
			{#if required}
				<span class="text-destructive">*</span>
			{/if}
		</Label>
	{/snippet}
</FormPrimitive.Label>
