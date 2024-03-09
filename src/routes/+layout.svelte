<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation.svelte';
	import '../app.postcss';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>I don't know a single person who is perfect</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- (footer) -->
</AppShell>
