<script lang="ts">
  import type {
    LoggedInLayoutProps,
    LoggedInLayoutItem,
  } from "./logged-in-layout.model";
  import { page } from "$app/stores";
  import { Button, Separator } from "$lib/components/ui";

  type SidebarItem = LoggedInLayoutItem;
  type Size = "large" | "normal";

  let { data, size = "normal" }: { data: LoggedInLayoutProps; size?: Size } =
    $props();

  const sidebarItems = data.items;
  let pathname = $derived($page.url.pathname);
</script>

{#snippet adminSidebarItemNormal({ title, href, icon }: SidebarItem)}
  {@const Icon = icon}
  <Button
    {href}
    variant={pathname.startsWith(href) ? "default" : "ghost"}
    class="justify-start text-lg py-6"
  >
    <Icon class="h-4 w-4" />
    {title}
  </Button>
{/snippet}

{#snippet adminSidebarItemLarge({ title, href, icon }: SidebarItem)}
  {@const Icon = icon}
  <a
    {href}
    class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
  >
    <Icon class="h-6 w-6" />
    {title}
  </a>
{/snippet}

{#if size === "normal"}
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
    {#each sidebarItems as item}
      {#if item.type === "separator"}
        <Separator />
      {:else}
        {@render adminSidebarItemNormal(item)}
      {/if}
    {/each}
  </nav>
{:else if size === "large"}
  <nav class="grid gap-2 text-lg font-medium">
    {#each sidebarItems as item}
      {#if item.type === "separator"}
        <Separator />
      {:else}
        {@render adminSidebarItemLarge(item)}
      {/if}
    {/each}
  </nav>
{/if}
