<script lang="ts">
  import { Input } from "$lib/components/ui";
  import * as Form from "$lib/components/ui/form";
  import { Button, Checkbox } from "$lib/components/ui";
  import SearchIcon from "lucide-svelte/icons/search";
  import type { Props } from "./main-search-form.model";
  import { superForm } from "sveltekit-superforms/client";
  import { Tag } from "lucide-svelte";

  let { data, instrumentOptions, categoryOptions, allocationOptions }: Props =
    $props();

  const form = superForm(data, {
    resetForm: false,
    onUpdated: (form) => {
      console.log({ form });
    },
  });

  const { form: formData, enhance } = form;

  function addItem(id: string, name: "instrument" | "category" | "allocation") {
    $formData[name] = [...$formData[name], id];
  }

  function removeItem(
    id: string,
    name: "instrument" | "category" | "allocation",
  ) {
    $formData[name] = $formData[name].filter((i) => i !== id);
  }
</script>

<form
  class="flex flex-col gap-2"
  method="POST"
  use:enhance
  id="main-search-form"
>
  <div class="flex items-center gap-2 flex-1">
    <SearchIcon class="h-6 w-6" />
    <Form.Field {form} name="title" class="flex-1">
      <Form.Control>
        <Input
          placeholder="Cari judul"
          bind:value={$formData.title}
          name="title"
          type="text"
        />
      </Form.Control>
    </Form.Field>
  </div>

  <Form.Fieldset {form} name="category" class="space-y-0">
    <div class="mb-4">
      <Form.Legend class="text-base">Kategori</Form.Legend>
    </div>
    <div class="space-y-2">
      {#each categoryOptions as item}
        {@const checked = $formData.category.includes(item.name)}
        <div class="flex flex-row items-start space-x-3">
          <Form.Control let:attrs>
            <Checkbox
              {...attrs}
              {checked}
              onCheckedChange={(v: any) => {
                if (v) {
                  addItem(item.name, "category");
                } else {
                  removeItem(item.name, "category");
                }
              }}
            />
            <Form.Label class="font-normal">
              {item.name}
            </Form.Label>
            <input
              hidden
              type="checkbox"
              name={attrs.name}
              value={item.name}
              {checked}
            />
          </Form.Control>
        </div>
      {/each}
      <Form.FieldErrors />
    </div>
  </Form.Fieldset>

  <Form.Fieldset {form} name="instrument" class="space-y-0">
    <div class="mb-4">
      <Form.Legend class="text-base">Instrumen</Form.Legend>
    </div>
    <div class="space-y-2">
      {#each instrumentOptions as item}
        {@const checked = $formData.instrument.includes(item.name)}
        <div class="flex flex-row items-start space-x-3">
          <Form.Control let:attrs>
            <Checkbox
              {...attrs}
              {checked}
              onCheckedChange={(v: any) => {
                if (v) {
                  addItem(item.name, "instrument");
                } else {
                  removeItem(item.name, "instrument");
                }
              }}
            />
            <Form.Label class="font-normal">
              {item.name}
            </Form.Label>
            <input
              hidden
              type="checkbox"
              name={attrs.name}
              value={item.name}
              {checked}
            />
          </Form.Control>
        </div>
      {/each}
      <Form.FieldErrors />
    </div>
  </Form.Fieldset>

  <Form.Fieldset {form} name="allocation" class="space-y-0">
    <div class="mb-4">
      <Form.Legend class="text-base">Peruntukan</Form.Legend>
    </div>
    <div class="space-y-2">
      {#each allocationOptions as item}
        {@const checked = $formData.allocation.includes(item.name)}
        <div class="flex flex-row items-start space-x-3">
          <Form.Control let:attrs>
            <Checkbox
              {...attrs}
              {checked}
              onCheckedChange={(v: any) => {
                if (v) {
                  addItem(item.name, "allocation");
                } else {
                  removeItem(item.name, "allocation");
                }
              }}
            />
            <Form.Label class="font-normal">
              {item.name}
            </Form.Label>
            <input
              hidden
              type="checkbox"
              name={attrs.name}
              value={item.name}
              {checked}
            />
          </Form.Control>
        </div>
      {/each}
      <Form.FieldErrors />
    </div>
  </Form.Fieldset>

  <div class="flex gap-4">
    <!-- <Form.Field {form} name="instrument"> -->
    <!--   <Form.Control> -->
    <!--     <Select.Root multiple> -->
    <!--       <Select.Trigger class="xl:w-[180px] w-full"> -->
    <!--         <Select.Value placeholder="Pilih instrumen" /> -->
    <!--       </Select.Trigger> -->
    <!--       <Select.Content> -->
    <!--         <Select.Group> -->
    <!--           <Select.Label>Instrumen</Select.Label> -->
    <!--           {#each instrumentOptions as item} -->
    <!--             <Select.Item value={item.name} label={item.name} -->
    <!--               >{item.name}</Select.Item -->
    <!--             > -->
    <!--           {/each} -->
    <!--         </Select.Group> -->
    <!--       </Select.Content> -->
    <!--       <Select.Input name="instrument" /> -->
    <!--     </Select.Root> -->
    <!--   </Form.Control> -->
    <!-- </Form.Field> -->

    <!-- <Form.Field {form} name="allocation"> -->
    <!--   <Form.Control> -->
    <!--     <Select.Root multiple> -->
    <!--       <Select.Trigger class="xl:w-[180px] w-full"> -->
    <!--         <Select.Value placeholder="Pilih Peruntukan" /> -->
    <!--       </Select.Trigger> -->
    <!--       <Select.Content> -->
    <!--         <Select.Group> -->
    <!--           <Select.Label>Peruntukan</Select.Label> -->
    <!--           {#each allocationOptions as item} -->
    <!--             <Select.Item value={item.name} label={item.name} -->
    <!--               >{item.name}</Select.Item -->
    <!--             > -->
    <!--           {/each} -->
    <!--         </Select.Group> -->
    <!--       </Select.Content> -->
    <!--       <Select.Input name="allocation" /> -->
    <!--     </Select.Root> -->
    <!--   </Form.Control> -->
    <!-- </Form.Field> -->

    <!-- <TagSelect -->
    <!--   options={instrumentOptions} -->
    <!--   label="Instrumen" -->
    <!--   name="instrument" -->
    <!--   placeholder="Jenis instrumen" -->
    <!-- /> -->
    <!-- <TagSelect -->
    <!--   options={categoryOptions} -->
    <!--   label="Kategori" -->
    <!--   name="category" -->
    <!--   placeholder="Kategori" -->
    <!-- /> -->
    <!-- <TagSelect -->
    <!--   options={allocationOptions} -->
    <!--   label="Peruntukan" -->
    <!--   name="allocation" -->
    <!--   placeholder="Peruntukan" -->
    <!-- /> -->
  </div>
  <Button type="submit">Cari</Button>
</form>
