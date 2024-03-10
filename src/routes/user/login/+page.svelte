<script lang="ts">
	import type { User } from '$lib/types';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let data: { users: User[] };
	let selectedUserId: number;
	$: chosenUser = data.users.find((user) => user.id == selectedUserId);
</script>

<ListBox>
	{#each data.users as user}
		<ListBoxItem bind:group={selectedUserId} name="medium" value={user.id}
			>{user.username}</ListBoxItem
		>
	{/each}
</ListBox>

{#if chosenUser}
	<h3>Log in</h3>
	<form method="POST" action="/user?/login">
		<label class="label">
			username
			<input readonly class="input" name="username" type="text" value={chosenUser.username} />
		</label>
		<label class="label">
			id
			<input readonly class="input" name="id" type="text" value={chosenUser.id} />
		</label>
		<button class="btn">login</button>
	</form>
{/if}
