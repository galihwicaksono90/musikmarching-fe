<script lang="ts">
  import type {
    LoggedInLayoutProps,
    LoggedInLayoutItem,
  } from "./logged-in-layout.model";
  import CircleUser from "lucide-svelte/icons/circle-user";
  import Menu from "lucide-svelte/icons/menu";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";

  let { data }: { data: LoggedInLayoutProps } = $props();
</script>

<header
  class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6"
>
  <Sheet.Root>
    <Sheet.Trigger>
      {#snippet children()}
        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      {/snippet}
    </Sheet.Trigger>
    <Sheet.Content side="left" class="flex flex-col">
      <!-- <nav class="grid gap-2 text-lg font-medium"> -->
      <!--   <Sidebar size="large" {data} /> -->
      <!-- </nav> -->
    </Sheet.Content>
  </Sheet.Root>
  <a href="/" class="flex items-center gap-2 font-semibold md:hidden">
    <span class="">Musikmarching Admin</span>
  </a>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="ml-auto">
      {#snippet children()}
        <Button variant="secondary" size="icon" class="rounded-full ml-auto">
          <CircleUser class="h-5 w-5" />
          <span class="sr-only">Toggle user menu</span>
        </Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      {#each data.menuItems as item}
        {#if item.type === "separator"}
          <DropdownMenu.Separator />
        {:else if item.type === "label"}
          <DropdownMenu.Label>{item.title}</DropdownMenu.Label>
        {:else if item.type === "link"}
          {@const Icon = item.icon}
          <DropdownMenu.Item>
            <Button
              href={item.href}
              variant="ghost"
              class="justify-start text-lg py-6"
              size="sm"
            >
              <Icon class="h-4 w-4" />
              {item.title}
            </Button>
          </DropdownMenu.Item>
        {/if}
      {/each}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</header>
