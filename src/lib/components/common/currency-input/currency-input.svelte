<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import type { WithElementRef } from "bits-ui";
  import { Input, Button } from "$lib/components/ui";
  import ChevronsLeft from "@lucide/svelte/icons/chevrons-left";
  import ChevronsRight from "@lucide/svelte/icons/chevrons-right";
  import { cn } from "$lib/utils";

  type Props = WithElementRef<
    Omit<HTMLInputAttributes, "type"> & {
      factor?: number;
    }
  >;

  let {
    value = $bindable(0),
    factor = 50,
    class: className,
    ...restProps
  }: Props = $props();

  const reduce = () => {
    if (value - factor < 0) return;
    value -= factor;
  };

  const add = () => {
    value += factor;
  };
</script>

<div class={cn("flex flex-row", className)}>
  <Button onclick={reduce} variant="ghost" size="icon"><ChevronsLeft /></Button>
  <Input type="number" bind:value {...restProps} />
  <Button onclick={add} variant="ghost" size="icon"><ChevronsRight /></Button>
</div>
