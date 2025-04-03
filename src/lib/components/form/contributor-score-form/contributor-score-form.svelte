<script lang="ts">
  import { Input, Checkbox, Textarea } from "$lib/components/ui";
  import {
    FormField,
    FormLegend,
    FormDescription,
    FormLabel,
    FormControl,
    FormFieldset,
    FormFieldErrors,
    FormButton,
  } from "$lib/components/ui/form";
  import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
  } from "$lib/components/ui/select";
  import {
    contentType,
    contentTypeLabels,
    difficulties,
    difficultyLabels,
    type ContentType,
    type Difficulty,
    type Instrument,
    type Category,
    type Allocation,
    type TagType,
  } from "$lib/model";
  import {
    createScoreFormSchema,
    updateScoreFormSchema,
  } from "./contributor-score-form.model";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms/client";
  import { zodClient } from "sveltekit-superforms/adapters";
  import { invalidateAll } from "$app/navigation";
  import { toast } from "$lib/util";
  import SuperDebug, { fileProxy } from "sveltekit-superforms";

  type Props = {
    data: SuperValidated<
      Infer<typeof createScoreFormSchema | typeof updateScoreFormSchema>
    >;
    isEditing?: boolean;
    instrumentOptions: Instrument[];
    allocationOptions: Allocation[];
    categoryOptions: Category[];
  };

  let {
    data,
    isEditing = false,
    instrumentOptions = [],
    categoryOptions = [],
    allocationOptions = [],
  }: Props = $props();

  const form = superForm(data, {
    validators: zodClient(
      isEditing ? updateScoreFormSchema : createScoreFormSchema,
    ),
    onUpdated: ({ form }) => {
      if (!form.message) return;

      toast({
        type: form.message.type,
        message: form.message.message,
      });

      if (isEditing) {
        invalidateAll();
      }
    },
  });

  const pdfFileProxy = fileProxy(form.form, "pdfFile");
  const audioFileProxy = fileProxy(form.form, "audioFile");

  const { form: formData, enhance, delayed, isTainted, tainted } = form;

  function addItem(id: number, name: TagType) {
    $formData[name] = [...$formData[name], id];
  }

  function removeItem(id: number, name: TagType) {
    $formData[name] = $formData[name].filter((i) => i !== id);
  }

  const triggerContent = $derived({
    difficulty: difficultyLabels[$formData.difficulty as Difficulty],
    contentType: contentTypeLabels[$formData.contentType as ContentType],
  });
</script>

<form
  method="POST"
  use:enhance
  id="score-form"
  class="flex flex-col gap-8"
  enctype="multipart/form-data"
  action={isEditing ? "?/updateScore" : "?/createScore"}
>
  <div class="flex flex-col md:flex-row gap-8">
    <div class="w-full flex flex-col gap-6">
      <FormField {form} name="title">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel required>Title</FormLabel>
            <Input
              {...props}
              bind:value={$formData.title}
              name="title"
              type="text"
            />
          {/snippet}
        </FormControl>
        <FormDescription>Judul Score</FormDescription>
        <FormFieldErrors />
      </FormField>

      <FormField {form} name="description">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel required>Deskripsi</FormLabel>
            <Textarea
              {...props}
              bind:value={$formData.description}
              name="description"
            />
          {/snippet}
        </FormControl>
        <FormDescription>Deskripsi Score</FormDescription>
        <FormFieldErrors />
      </FormField>

      <FormField {form} name="price">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel required>Price</FormLabel>
            <Input
              {...props}
              bind:value={$formData.price}
              name="price"
              type="number"
            />
          {/snippet}
        </FormControl>
        <FormDescription>Enter the price of your score</FormDescription>
        <FormFieldErrors />
      </FormField>

      <FormField {form} name="difficulty">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel required>Tingkat Kesulitan</FormLabel>
            <Select
              bind:value={$formData.difficulty}
              name="difficulty"
              type="single"
            >
              <div class="flex items-center gap-2">
                <SelectTrigger {...props}>
                  {triggerContent.difficulty}
                </SelectTrigger>
              </div>
              <SelectContent>
                {#each difficulties as item}
                  <SelectItem value={item} label={difficultyLabels[item]} />
                {/each}
              </SelectContent>
            </Select>
            <input hidden {...props} bind:value={$formData.difficulty} />
          {/snippet}
        </FormControl>
      </FormField>

      <FormField {form} name="contentType">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel required>Jenis Konten</FormLabel>
            <Select
              bind:value={$formData.contentType}
              name="contentType"
              type="single"
            >
              <div class="flex items-center gap-2">
                <SelectTrigger {...props}>
                  {triggerContent.contentType}
                </SelectTrigger>
              </div>
              <SelectContent>
                {#each contentType as item}
                  <SelectItem value={item} label={contentTypeLabels[item]} />
                {/each}
              </SelectContent>
            </Select>
            <input hidden bind:value={$formData.contentType} {...props} />
          {/snippet}
        </FormControl>
      </FormField>
    </div>

    <div class="w-full flex flex-col gap-6">
      <FormField {form} name="pdfFile">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel required={!isEditing}>PDF File</FormLabel>
            <Input
              {...props}
              oninput={(e) =>
                ($formData.pdfFile = e.currentTarget.files?.item(0) as File)}
              bind:files={$pdfFileProxy}
              name="pdfFile"
              type="file"
              accept="application/pdf"
            />
          {/snippet}
        </FormControl>
        <FormDescription>Upload your score PDF file</FormDescription>
        <FormFieldErrors />
      </FormField>

      <FormField {form} name="audioFile">
        <FormControl>
          {#snippet children({ props })}
            <FormLabel required={!isEditing}>Audio File</FormLabel>
            <Input
              {...props}
              oninput={(e) =>
                ($formData.audioFile = e.currentTarget.files?.item(0) as File)}
              bind:files={$audioFileProxy}
              name="audioFile"
              type="file"
              accept="audio/mpeg"
            />
          {/snippet}
        </FormControl>
        <FormDescription>Upload your audio MP3 file</FormDescription>
        <FormFieldErrors />
      </FormField>

      <div class="grid grid-cols-3 gap-4">
        <FormFieldset {form} name="instruments" class="space-y-0">
          <div class="mb-4">
            <FormLegend class="text-base">Instrumen</FormLegend>
          </div>
          <div class="space-y-2">
            {#each instrumentOptions as item}
              {@const checked = $formData.instruments.includes(item.id)}
              <div class="flex flex-row items-start space-x-3">
                <FormControl>
                  {#snippet children({ props })}
                    <Checkbox
                      {...props}
                      {checked}
                      value={item.id.toString()}
                      onCheckedChange={(v) => {
                        if (v) {
                          addItem(item.id, "instruments");
                        } else {
                          removeItem(item.id, "instruments");
                        }
                      }}
                    />
                    <FormLabel class="font-normal">
                      {item.name}
                    </FormLabel>
                  {/snippet}
                </FormControl>
              </div>
            {/each}
            <FormFieldErrors />
          </div>
        </FormFieldset>

        <FormFieldset {form} name="categories" class="space-y-0">
          <div class="mb-4">
            <FormLegend class="text-base">Kategori</FormLegend>
          </div>
          <div class="space-y-2">
            {#each categoryOptions as item}
              {@const checked = $formData.categories.includes(item.id)}
              <div class="flex flex-row items-start space-x-3">
                <FormControl>
                  {#snippet children({ props })}
                    <Checkbox
                      {...props}
                      {checked}
                      value={item.id.toString()}
                      onCheckedChange={(v) => {
                        if (v) {
                          addItem(item.id, "categories");
                        } else {
                          removeItem(item.id, "categories");
                        }
                      }}
                    />
                    <FormLabel class="font-normal">
                      {item.name}
                    </FormLabel>
                  {/snippet}
                </FormControl>
              </div>
            {/each}
            <FormFieldErrors />
          </div>
        </FormFieldset>

        <FormFieldset {form} name="allocations" class="space-y-0">
          <div class="mb-4">
            <FormLegend class="text-base">Peruntukan</FormLegend>
          </div>
          <div class="space-y-2">
            {#each allocationOptions as item}
              {@const checked = $formData.allocations.includes(item.id)}
              <div class="flex flex-row items-start space-x-3">
                <FormControl>
                  {#snippet children({ props })}
                    <Checkbox
                      {...props}
                      {checked}
                      value={item.id.toString()}
                      onCheckedChange={(v) => {
                        if (v) {
                          addItem(item.id, "allocations");
                        } else {
                          removeItem(item.id, "allocations");
                        }
                      }}
                    />
                    <FormLabel class="font-normal">
                      {item.name}
                    </FormLabel>
                  {/snippet}
                </FormControl>
              </div>
            {/each}
            <FormFieldErrors />
          </div>
        </FormFieldset>
      </div>
    </div>
  </div>
  <FormButton loading={$delayed} disabled={!isTainted($tainted)}>
    Submit
  </FormButton>
</form>

<SuperDebug data={$formData} />
