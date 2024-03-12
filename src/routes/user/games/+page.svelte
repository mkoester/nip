<script lang="ts">
	import type { Game, UserInformation } from '$lib/types';

	export let data: { games: Game[] } & UserInformation;
</script>

<h2>User '{data.user?.username}' with id '{data.user?.id}'</h2>

<div class="grid place-content-center">
	<!-- TODO proper output -->
	{JSON.stringify(data)}
</div>

<div class="table-container">
	<table class="table table-hover">
		<thead><tr><th>id</th><th>lang</th><th>created</th><th>joined</th></tr></thead>
		<tbody>
			{#each data.games as game}
				<tr>
					<td><a href="/game/{game.id}">{game.id}</a></td>
					<td>{game.lang}</td>
					<td>{game.created_at}</td>
					<td>{game.joined}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
