<script lang="ts">
	import type { Game, Question, UserInformation } from '$lib/types';
	import ParticipantsTable from '$lib/ui/ParticipantsTable.svelte';
	import { page } from '$app/stores';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';

	export let data: { game: Game; questions: ({ added: string } & Question)[] } & UserInformation;

	let debug = false;
</script>

<ol class="breadcrumb">
	<li class="crumb"><a class="anchor" href="/"><HomeIcon /></a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>Game {$page.params.g_id}</li>
</ol>

{#if debug}
	<div class="grid place-content-center">
		{JSON.stringify(data)}
	</div>
{/if}

<h2 class="h2">Game {$page.params.g_id}</h2>

<ParticipantsTable data={data.game.participants} />

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
