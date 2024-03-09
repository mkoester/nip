<script lang="ts">
	import type { User } from '$lib/types';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import type { ActionData } from './$types';

	export let data: { users: User[] };
	let selectedUserId: number;
	$: chosenUser = data.users.find((user) => user.id == selectedUserId);

	export let form: ActionData;
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
	<form method="POST">
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

{#if form?.logged_in}
	<p class="input-success">
		successfully logged in user '{form.user_name}' with id '{form.user_id}'
	</p>
{/if}
