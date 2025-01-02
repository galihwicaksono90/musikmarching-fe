<script lang="ts">
  import { Input } from "$lib/components/ui";
  import * as Form from "$lib/components/ui/form";
  import * as Select from "$lib/components/ui/select";
  import { Button, Checkbox } from "$lib/components/ui";
  import CircleX from "lucide-svelte/icons/circle-x";
  import type { Props } from "./main-search-form.model";
  import { superForm } from "sveltekit-superforms/client";
  import {
    contentType,
    contentTypeLabels,
    difficulties,
    difficultyLabels,
    type ContentType,
    type Difficulty,
  } from "$lib/model";

  let { data, instrumentOptions, categoryOptions, allocationOptions }: Props =
    $props();

  const form = superForm(data, {
    resetForm: false,
    onUpdated: (form) => {
      console.log({ form });
    },
  });

  const { form: formData, enhance, reset } = form;

  function addItem(id: string, name: "instrument" | "category" | "allocation") {
    $formData[name] = [...$formData[name], id];
  }

  function removeItem(
    id: string,
    name: "instrument" | "category" | "allocation",
  ) {
    $formData[name] = $formData[name].filter((i) => i !== id);
  }

  let difficultyValue = $derived(
    $formData.difficulty
      ? {
          value: $formData.difficulty,
          label: difficultyLabels[$formData.difficulty as Difficulty],
        }
      : null,
  );

  let contentTypeValue = $derived(
    $formData.contentType
      ? {
          value: $formData.contentType,
          label: contentTypeLabels[$formData.contentType as ContentType],
        }
      : null,
  );
</script>

<form
  class="flex flex-col gap-4"
  method="POST"
  use:enhance
  id="main-search-form"
>
  <div class="flex items-center gap-2 flex-1">
    <!-- <SearchIcon class="h-6 w-6" /> -->
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

  <Form.Field {form} name="difficulty">
    <Form.Control let:attrs>
      <Form.Label>Tingkat Kesulitan</Form.Label>

      <Select.Root
        selected={difficultyValue as any}
        onSelectedChange={(v) => {
          v && ($formData.difficulty = v.value as string);
        }}
      >
        <div class="flex items-center gap-2">
          <Select.Trigger {...attrs}>
            <Select.Value placeholder="Tingkat Kesulitan" />
          </Select.Trigger>
          <button
            class="rounded-full"
            onclick={() => ($formData.difficulty = undefined)}
            type="button"><CircleX class="h-4 w-4" /></button
          >
        </div>
        <Select.Content>
          {#each difficulties as item}
            <Select.Item value={item} label={difficultyLabels[item]} />
          {/each}
        </Select.Content>
      </Select.Root>
      <input hidden bind:value={$formData.difficulty} name={attrs.name} />
    </Form.Control>
  </Form.Field>

  <Form.Field {form} name="contentType">
    <Form.Control let:attrs>
      <Form.Label>Jenis Konten</Form.Label>
      <Select.Root
        selected={contentTypeValue as any}
        onSelectedChange={(v) => {
          v && ($formData.contentType = v.value as string);
        }}
      >
        <div class="flex items-center gap-2">
          <Select.Trigger {...attrs}>
            <Select.Value placeholder="Jenis konten" />
          </Select.Trigger>
          <button
            class="rounded-full"
            onclick={() => ($formData.contentType = undefined)}
            type="button"><CircleX class="h-4 w-4" /></button
          >
        </div>
        <Select.Content>
          {#each contentType as item}
            <Select.Item value={item} label={contentTypeLabels[item]} />
          {/each}
        </Select.Content>
      </Select.Root>
      <input hidden bind:value={$formData.contentType} name={attrs.name} />
    </Form.Control>
  </Form.Field>

  <div class="flex flex-col gap-2 mt-8">
    <Button type="submit">Cari</Button>
    <a href="/">
      <Button type="button" variant="ghost" class="w-full">Reset</Button>
    </a>
  </div>
</form>
