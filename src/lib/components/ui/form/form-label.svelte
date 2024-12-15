<script lang="ts">
	import type { Label as LabelPrimitive } from "bits-ui";
	import { getFormControl } from "formsnap";
	import { cn } from "$lib/utils.js";
	import { Label } from "$lib/components/ui/label/index.js";

	type $$Props = LabelPrimitive.Props & {
		required?: boolean;
	};

	let className: $$Props["class"] = undefined;
	export let required: boolean | undefined = false;
	export { className as class };

	const { labelAttrs } = getFormControl();
</script>

<Label
	{...$labelAttrs}
	class={cn("data-[fs-error]:text-red-500", className)}
	{...$$restProps}
>
	<slot {labelAttrs} />
	{#if required}
		<span class="text-red-500">*</span>
	{/if}
</Label>
