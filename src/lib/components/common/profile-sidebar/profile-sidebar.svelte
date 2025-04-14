<script lang="ts">
	import {
		Sidebar,
		SidebarHeader,
		SidebarContent,
		SidebarGroup,
		SidebarFooter,
	} from "$lib/components/ui/sidebar";
	import * as Sheet from "$lib/components/ui/sheet/index.js";
</script>

<Sidebar class="h-[calc(100vh-4rem)] bottom-0 top-auto">
	<SidebarHeader>Sidebar header</SidebarHeader>

	<SidebarContent>
		<SidebarGroup>Group one</SidebarGroup>
		<SidebarGroup>Group two</SidebarGroup>
	</SidebarContent>
	<SidebarFooter>Sidebar footer</SidebarFooter>
</Sidebar>
