<script lang="ts">
	import type { Game, UserInformation } from '$lib/types';
	import { t } from '$lib/translations/index';

	export let data: { games: Game[] } & UserInformation;

	let debug = false;
</script>

{#if debug}
	<div class="grid place-content-center">
		{JSON.stringify(data)}
	</div>
{/if}

<h2 class="h2">{$t('navigation.my_games')}</h2>

<h3 class="h3">User '{data.user?.username}' with id '{data.user?.id}'</h3>

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
