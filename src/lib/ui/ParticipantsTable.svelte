<script lang="ts">
	import type { User } from '$lib/types';
	export let data: User[];
</script>

<h3 class="h3">Participants</h3>

<div class="table-container">
	<table class="table table-hover">
		<thead><tr><th>id</th><th>name</th></tr></thead>
		<tbody>
			{#each data as user}
				<tr>
					<td>{user.id}</td>
					<td>{user.username}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
