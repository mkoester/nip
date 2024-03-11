<script lang="ts">
	import type { Game, UserInformation } from '$lib/types';

	export let data: { game: Game } & UserInformation;
</script>

<h2>Game {data.game.id}</h2>

<div class="grid place-content-center">
	<!-- TODO proper output -->
	{JSON.stringify(data)}
</div>
