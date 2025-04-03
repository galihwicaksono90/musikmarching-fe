<script lang="ts">
  import { Input } from "$lib/components/ui";
  import {
    FormLegend,
    FormControl,
    FormField,
    FormLabel,
    FormFieldErrors,
    FormFieldset,
  } from "$lib/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
  } from "$lib/components/ui/select";
  import {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger,
  } from "$lib/components/ui/accordion";
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
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  let { data, instrumentOptions, categoryOptions, allocationOptions }: Props =
    $props();

  const form = superForm(data, { resetForm: false });

  const { form: formData, enhance, isTainted, tainted } = form;

  function addItem(id: string, name: "instrument" | "category" | "allocation") {
    $formData[name] = [...$formData[name], id];
  }

  function removeItem(
    id: string,
    name: "instrument" | "category" | "allocation",
  ) {
    $formData[name] = $formData[name].filter((i) => i !== id);
  }

  const triggerContent = $derived({
    difficulty:
      difficultyLabels[$formData.difficulty as Difficulty] ??
      "Tingkat Kesulitan",
    contentType:
      contentTypeLabels[$formData.contentType as ContentType] ?? "Jenis Konten",
  });
</script>

<Accordion type="multiple">
  <form
    class="flex flex-col gap-4"
    method="POST"
    use:enhance
    id="main-search-form"
    onreset={() => goto("/")}
  >
    <div class="flex items-center gap-2 flex-1">
      <FormField {form} name="title" class="flex-1">
        <FormControl>
          <Input
            placeholder="Cari judul"
            bind:value={$formData.title}
            name="title"
            type="text"
          />
        </FormControl>
      </FormField>
    </div>

    <div class="flex flex-col gap-2">
      <Button type="submit" disabled={!isTainted($tainted)}>Cari</Button>
      <Button type="reset" variant="outline" class="w-full" disabled={$page.url.searchParams.size === 0}>Reset</Button>
    </div>
    <FormFieldset {form} name="category" class="space-y-0">
      <AccordionItem value="category">
        <AccordionTrigger>
          <FormLegend class="text-base">Kategori</FormLegend>
        </AccordionTrigger>
        <AccordionContent>
          <div class="space-y-2">
            {#each categoryOptions as item}
              {@const checked = $formData.category.includes(item.name)}
              <div class="flex flex-row items-center space-x-3">
                <FormControl>
                  {#snippet children({ props })}
                    <Checkbox
                      {checked}
                      onCheckedChange={(v) => {
                        if (v) {
                          addItem(item.name, "category");
                        } else {
                          removeItem(item.name, "category");
                        }
                      }}
                    />
                    <FormLabel class="font-normal">
                      {item.name}
                    </FormLabel>
                    <input
                      hidden
                      type="checkbox"
                      name={props.name}
                      value={item.name}
                      {checked}
                    />
                  {/snippet}
                </FormControl>
              </div>
            {/each}
            <FormFieldErrors />
          </div>
        </AccordionContent>
      </AccordionItem>
    </FormFieldset>

    <FormFieldset {form} name="instrument" class="space-y-0">
      <AccordionItem value="intrument">
        <AccordionTrigger>
          <FormLegend class="text-base">Instrumen</FormLegend>
        </AccordionTrigger>
        <AccordionContent>
          <div class="mb-4"></div>
          <div class="space-y-2">
            {#each instrumentOptions as item}
              {@const checked = $formData.instrument.includes(item.name)}
              <div class="flex flex-row items-start space-x-3">
                <FormControl>
                  {#snippet children({ props })}
                    <Checkbox
                      {...props}
                      {checked}
                      onCheckedChange={(v) => {
                        if (v) {
                          addItem(item.name, "instrument");
                        } else {
                          removeItem(item.name, "instrument");
                        }
                      }}
                    />
                    <FormLabel class="font-normal">
                      {item.name}
                    </FormLabel>
                    <input
                      hidden
                      type="checkbox"
                      {...props}
                      value={item.name}
                      {checked}
                    />
                  {/snippet}
                </FormControl>
              </div>
            {/each}
            <FormFieldErrors />
          </div>
        </AccordionContent>
      </AccordionItem>
    </FormFieldset>

    <FormFieldset {form} name="allocation" class="space-y-0">
      <AccordionItem value="allocation">
        <AccordionTrigger>
          <FormLegend class="text-base">Peruntukan</FormLegend>
        </AccordionTrigger>
        <AccordionContent>
          <div class="space-y-2">
            {#each allocationOptions as item}
              {@const checked = $formData.allocation.includes(item.name)}
              <div class="flex flex-row items-start space-x-3">
                <FormControl>
                  {#snippet children({ props })}
                    <Checkbox
                      {...props}
                      {checked}
                      onCheckedChange={(v) => {
                        if (v) {
                          addItem(item.name, "allocation");
                        } else {
                          removeItem(item.name, "allocation");
                        }
                      }}
                    />
                    <FormLabel class="font-normal">
                      {item.name}
                    </FormLabel>
                    <input
                      hidden
                      type="checkbox"
                      {...props}
                      value={item.name}
                      {checked}
                    />
                  {/snippet}
                </FormControl>
              </div>
            {/each}
            <FormFieldErrors />
          </div>
        </AccordionContent>
      </AccordionItem>
    </FormFieldset>

    <FormField {form} name="difficulty">
      <FormControl>
        {#snippet children({ props })}
          <FormLabel>Tingkat Kesulitan</FormLabel>

          <Select
            type="single"
            bind:value={$formData.difficulty}
            name="difficulty"
          >
            <div class="flex items-center gap-2">
              <SelectTrigger {...props}>
                {triggerContent.difficulty}
              </SelectTrigger>
              <button
                class="rounded-full"
                onclick={() => ($formData.difficulty = "")}
                type="button"><CircleX class="h-4 w-4" /></button
              >
            </div>
            <SelectContent>
              {#each difficulties as item}
                <SelectItem value={item} label={difficultyLabels[item]} />
              {/each}
            </SelectContent>
          </Select>
        {/snippet}
      </FormControl>
    </FormField>

    <FormField {form} name="contentType">
      <FormControl>
        {#snippet children({ props })}
          <FormLabel>Jenis Konten</FormLabel>
          <Select
            type="single"
            bind:value={$formData.contentType}
            name="contentType"
          >
            <div class="flex items-center gap-2">
              <SelectTrigger {...props}>
                {triggerContent.contentType}
              </SelectTrigger>
              <button
                class="rounded-full"
                onclick={() => ($formData.contentType = "")}
                type="button"><CircleX class="h-4 w-4" /></button
              >
            </div>
            <SelectContent>
              {#each contentType as item}
                <SelectItem value={item} label={contentTypeLabels[item]} />
              {/each}
            </SelectContent>
          </Select>
        {/snippet}
      </FormControl>
    </FormField>
  </form>
</Accordion>

<!-- <pre>{JSON.stringify($tainted, null, 4)}</pre> -->
