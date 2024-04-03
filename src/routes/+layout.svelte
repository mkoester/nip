<script lang="ts">
	import {
		AppShell,
		AppBar,
		Avatar,
		initializeStores,
		Drawer,
		getDrawerStore
	} from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import Navigation from '$lib/Navigation.svelte';
	import { loadTranslations, t, config } from '$lib/translations/index';
	import type { UserInformation } from '$lib/types';
	import { page } from '$app/stores';

	initializeStores();
	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}

	export let data: UserInformation & { locale: string };
	let form_language: HTMLFormElement;
	let lang: string = data.locale;
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
					<strong class="text-xl">{$t('header.title')}</strong>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if config.translations}
					<form bind:this={form_language} method="POST" action="/?/language_change">
						<input hidden type="text" name="curent_url" value={$page.url.pathname} />
						<select
							class="select"
							name="lang"
							bind:value={lang}
							on:change={() => form_language.requestSubmit()}
						>
							{#each Object.keys(config.translations) as lang}
								<option value={lang}>{lang}</option>
							{/each}
						</select>
					</form>
				{/if}
				{#if data?.user}
					<form method="POST">
						<button formaction="/user?/logout"
							><Avatar initials={data?.user.username} background="bg-primary-500" /></button
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
	<svelte:fragment slot="pageFooter">
		{#await loadTranslations(data.locale, $page.url.pathname)}
			<div class="grid place-items-center">loading translations...</div>
		{/await}
	</svelte:fragment>
	<!-- (footer) -->
</AppShell>
