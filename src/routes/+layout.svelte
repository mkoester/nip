<script lang="ts">
	import {
		AppShell,
		AppBar,
		Avatar,
		initializeStores,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import Navigation from '$lib/Navigation.svelte';
	import '../app.postcss';
	import type { PageData } from './$types';

	initializeStores();
	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}

	export let data: PageData;
</script>

<Drawer>
	<h2 class="p-4">Navigation</h2>
	<hr />
	<Navigation />
</Drawer>
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-48">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong class="text-xl">I don't know a single person who is perfect</strong>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if data?.user}
					<form method="POST" action="/user?/logout">
						<button formaction="/user?/logout"
							><Avatar initials={data?.user.user_name} background="bg-primary-500" /></button
						>
					</form>
				{:else}
					<span class="badge variant-filled"><a href="/user/login">Log in</a></span>
				{/if}
			</svelte:fragment>
		</AppBar>
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
