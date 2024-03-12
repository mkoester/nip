<script lang="ts">
	import type { Game, Question, UserInformation } from '$lib/types';

	export let data: { game: Game; questions: ({ added: string } & Question)[] } & UserInformation;
</script>

<h2>Game {data.game.id}</h2>

<div class="grid place-content-center">
	<!-- TODO proper output -->
	{JSON.stringify(data)}
</div>

<h3>Participants</h3>

<div class="table-container">
	<table class="table table-hover">
		<thead><tr><th>id</th><th>name</th></tr></thead>
		<tbody>
			{#each data.game.participants as user}
				<tr>
					<td>{user.id}</td>
					<td>{user.username}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<h3>Questions</h3>

<div class="table-container">
	<table class="table table-hover">
		<thead><tr><th>id</th><th>question</th><th>added</th></tr></thead>
		<tbody>
			{#each data.questions as q}
				<tr>
					<td><a href="/game/{data.game.id}/question/{q.id}">{q.id}</a></td>
					<td>{q.question}</td>
					<td>{q.added}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
