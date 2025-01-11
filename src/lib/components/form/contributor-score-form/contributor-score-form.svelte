<script lang="ts">
  import { Input, Checkbox, Textarea } from "$lib/components/ui";
  import * as Form from "$lib/components/ui/form";
  import * as Select from "$lib/components/ui/select";
  import { Control } from "formsnap";
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
  // import SuperDebug from "sveltekit-superforms";

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

  const { form: formData, enhance, delayed, isTainted, tainted } = form;

  function addItem(id: number, name: TagType) {
    $formData[name] = [...$formData[name], id];
  }

  function removeItem(id: number, name: TagType) {
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
  method="POST"
  use:enhance
  id="score-form"
  class="flex flex-col gap-8"
  enctype="multipart/form-data"
  action={isEditing ? "?/updateScore" : "?/createScore"}
>
  <div class="flex flex-col md:flex-row gap-8">
    <div class="w-full flex flex-col gap-6">
      <Form.Field {form} name="title">
        <Form.Control>
          {#snippet children({ props }: { props: Control })}
            <Form.Label required>Title</Form.Label>
            <Input
              {...props}
              bind:value={$formData.title}
              name="title"
              type="text"
            />
          {/snippet}
        </Form.Control>
        <Form.Description>Judul Score</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="description">
        <Form.Control>
          {#snippet children({ props }: { props: Control })}
            <Form.Label required>Deskripsi</Form.Label>
            <Textarea
              {...props}
              bind:value={$formData.description}
              name="description"
            />
          {/snippet}
        </Form.Control>
        <Form.Description>Deskripsi Score</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="price">
        <Form.Control>
          {#snippet children({ props }: { props: Control })}
            <Form.Label required>Price</Form.Label>
            <Input
              {...props}
              bind:value={$formData.price}
              name="price"
              type="number"
            />
          {/snippet}
        </Form.Control>
        <Form.Description>Enter the price of your score</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="difficulty">
        <Form.Control let:attrs>
          <Form.Label required>Tingkat Kesulitan</Form.Label>
          <Select.Root
            selected={difficultyValue as any}
            onSelectedChange={(v) => {
              v && ($formData.difficulty = v.value as Difficulty);
            }}
          >
            <div class="flex items-center gap-2">
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Tingkat Kesulitan" />
              </Select.Trigger>
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
          <Form.Label required>Jenis Konten</Form.Label>
          <Select.Root
            selected={contentTypeValue as any}
            onSelectedChange={(v) => {
              v && ($formData.contentType = v.value as ContentType);
            }}
          >
            <div class="flex items-center gap-2">
              <Select.Trigger {...attrs}>
                <Select.Value placeholder="Jenis konten" />
              </Select.Trigger>
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
    </div>

    <div class="w-full flex flex-col gap-6">
      <Form.Field {form} name="pdfFile">
        <Form.Control>
          {#snippet children({ props }: { props: Control })}
            <Form.Label required={!isEditing}>PDF File</Form.Label>
            <Input
              {...props}
              on:input={(e) =>
                ($formData.pdfFile = e.currentTarget.files?.item(0) as File)}
              name="pdfFile"
              type="file"
              accept="application/pdf"
            />
          {/snippet}
        </Form.Control>
        <Form.Description>Upload your score PDF file</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="audioFile">
        <Form.Control>
          {#snippet children({ props }: { props: Control })}
            <Form.Label required={!isEditing}>Audio File</Form.Label>
            <Input
              {...props}
              on:input={(e) =>
                ($formData.audioFile = e.currentTarget.files?.item(0) as File)}
              name="audioFile"
              type="file"
              accept="audio/mpeg"
            />
          {/snippet}
        </Form.Control>
        <Form.Description>Upload your audio MP3 file</Form.Description>
        <Form.FieldErrors />
      </Form.Field>

      <div class="grid grid-cols-3 gap-4">
        <Form.Fieldset {form} name="instruments" class="space-y-0">
          <div class="mb-4">
            <Form.Legend class="text-base">Instrumen</Form.Legend>
          </div>
          <div class="space-y-2">
            {#each instrumentOptions as item}
              {@const checked = $formData.instruments.includes(item.id)}
              <div class="flex flex-row items-start space-x-3">
                <Form.Control let:attrs>
                  <Checkbox
                    {...attrs}
                    {checked}
                    onCheckedChange={(v: any) => {
                      if (v) {
                        addItem(item.id, "instruments");
                      } else {
                        removeItem(item.id, "instruments");
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
                    value={item.id}
                    {checked}
                  />
                </Form.Control>
              </div>
            {/each}
            <Form.FieldErrors />
          </div>
        </Form.Fieldset>

        <Form.Fieldset {form} name="categories" class="space-y-0">
          <div class="mb-4">
            <Form.Legend class="text-base">Kategori</Form.Legend>
          </div>
          <div class="space-y-2">
            {#each categoryOptions as item}
              {@const checked = $formData.categories.includes(item.id)}
              <div class="flex flex-row items-start space-x-3">
                <Form.Control let:attrs>
                  <Checkbox
                    {...attrs}
                    {checked}
                    onCheckedChange={(v: any) => {
                      if (v) {
                        addItem(item.id, "categories");
                      } else {
                        removeItem(item.id, "categories");
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
                    value={item.id}
                    {checked}
                  />
                </Form.Control>
              </div>
            {/each}
            <Form.FieldErrors />
          </div>
        </Form.Fieldset>

        <Form.Fieldset {form} name="allocations" class="space-y-0">
          <div class="mb-4">
            <Form.Legend class="text-base">Peruntukan</Form.Legend>
          </div>
          <div class="space-y-2">
            {#each allocationOptions as item}
              {@const checked = $formData.allocations.includes(item.id)}
              <div class="flex flex-row items-start space-x-3">
                <Form.Control let:attrs>
                  <Checkbox
                    {...attrs}
                    {checked}
                    onCheckedChange={(v: any) => {
                      if (v) {
                        addItem(item.id, "allocations");
                      } else {
                        removeItem(item.id, "allocations");
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
                    value={item.id}
                    {checked}
                  />
                </Form.Control>
              </div>
            {/each}
            <Form.FieldErrors />
          </div>
        </Form.Fieldset>
      </div>
    </div>
  </div>
  <Form.Button loading={$delayed} disabled={!isTainted($tainted)}
    >Submit</Form.Button
  >
</form>

<!-- <SuperDebug data={$formData} /> -->
