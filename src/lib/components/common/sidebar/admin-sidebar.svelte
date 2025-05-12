<script lang="ts">
  import CircleUser from "lucide-svelte/icons/circle-user";
  import ShoppingCart from "lucide-svelte/icons/shopping-cart";
  import type { Icon as IconType } from "lucide-svelte";

  let { size = "normal" }: { size?: "large" | "normal" } = $props();

  type SidebarItem = {
    title: string;
    href: string;
    icon: typeof IconType;
  };

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: CircleUser,
    },
    {
      title: "Scores",
      href: "/admin/scores",
      icon: ShoppingCart,
    },
    {
      title: "Contributor",
      href: "/admin/contributor",
      icon: ShoppingCart,
    },
    {
      title: "Purchases",
      href: "/admin/purchases",
      icon: ShoppingCart,
    },
    {
      title: "Contributor Apply",
      href: "/admin/contributor-apply",
      icon: ShoppingCart,
    },
  ];
</script>

{#snippet adminSidebarItemNormal({ title, href, icon }: SidebarItem)}
  {@const Icon = icon}
  <a
    {href}
    class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
  >
    <Icon class="h-4 w-4" />
    {title}
  </a>
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
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
    {#each sidebarItems as item}
      {@render adminSidebarItemNormal(item)}
    {/each}
  </nav>
{:else if size === "large"}
  <nav class="grid gap-2 text-lg font-medium">
    {#each sidebarItems as item}
      {@render adminSidebarItemLarge(item)}
    {/each}
  </nav>
{/if}
