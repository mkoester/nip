<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.url.searchParams.has('/login')}
	<h3>successfully logged in</h3>
{/if}
{#if $page.url.searchParams.has('/logout')}
	<h3>successfully logged out</h3>
{/if}
