<script lang="ts">
	import type { User } from '$lib/types';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { t } from '$lib/translations/index';

	export let data: { users: User[] };
	let selectedUserId: number;
	$: chosenUser = data.users.find((user) => user.id == selectedUserId);
</script>

<h2 class="h2">{$t('navigation.login')}</h2>

<ListBox>
	{#each data.users as user}
		<ListBoxItem bind:group={selectedUserId} name="medium" value={user.id}
			>{user.username}</ListBoxItem
		>
	{/each}
</ListBox>

{#if chosenUser}
	<h3>{$t('navigation.login')}</h3>
	<form method="POST" action="/user?/login">
		<label class="label">
			{$t('general.user')}
			<input readonly class="input" name="username" type="text" value={chosenUser.username} />
		</label>
		<label class="label">
			id
			<input readonly class="input" name="id" type="text" value={chosenUser.id} />
		</label>
		<button class="btn">{$t('navigation.login')}</button>
	</form>
{/if}
