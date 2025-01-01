<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import type { SelectProps } from "./main-search-form.model";
  let {
    label,
    placeholder = "Select an option",
    options,
    name,
  }: SelectProps = $props();
</script>

<Select.Root {name} multiple>
  <Select.Trigger class="xl:w-[180px] w-full">
    <Select.Value {placeholder} />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>{label}</Select.Label>
      {#each options as item}
        <Select.Item value={item.id} label={item.name}>{item.name}</Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
  <Select.Input name="instrument" />
</Select.Root>
