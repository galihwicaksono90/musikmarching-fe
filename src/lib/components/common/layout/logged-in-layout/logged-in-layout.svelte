<script lang="ts">
  import type { Snippet } from "svelte";
  import Sidebar from "./sidebar.svelte";
  import Menu from "./menu.svelte";
  import { page } from "$app/stores";

  import type { LoggedInLayoutProps } from "./logged-in-layout.model";

  let { data, children }: { children: Snippet; data: LoggedInLayoutProps } =
    $props();

  let title = $derived(
    data.items.find((item) => $page.url.pathname.startsWith(item.href))?.title,
  );
</script>

<div
  class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
>
  <div class="bg-muted/40 hidden border-r md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <span class="">{data.title}</span>
        </a>
      </div>
      <div class="flex-1">
        <Sidebar {data} />
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <Menu {data} />
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold">My Account</h1>
      <p class="text-sm text-muted-foreground">
        Manage your account settings and purchased music scores.
      </p>
      </div>
      <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h3>
      {@render children()}
    </main>
  </div>
</div>
