<script lang="ts">
	import type { Game, QnA, UserInformation } from '$lib/types';
	import ParticipantsTable from '$lib/ui/ParticipantsTable.svelte';
	import QuestionCard from '$lib/ui/QuestionCard.svelte';
	import { page } from '$app/stores';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';

	export let data: QnA & { game: Game } & UserInformation;
	export let form: { success: boolean };

	let debug = false;
</script>

<ol class="breadcrumb">
	<li class="crumb"><a class="anchor" href="/"><HomeIcon /></a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">
		<a class="anchor" href="/game/{$page.params.g_id}">Game {$page.params.g_id}</a>
	</li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>Question {$page.params.q_id}</li>
</ol>

{#if debug}
	<div class="grid place-content-center">
		{JSON.stringify(data)}
	</div>
{/if}

<h2 class="h2">Game {$page.params.g_id}</h2>

<ParticipantsTable data={data.game.participants} />

<h2 class="h2">Question</h2>

<div class="grid place-content-center">
	<QuestionCard data={data.question} />
</div>

<h2 class="h2">your answer</h2>

<form method="POST" action="/game/{data.game.id}/question/{data.question.id}">
	<label hidden class="label">
		<span>Game</span>
		<input readonly class="input" type="text" name="game" value={data.game.id} />
	</label>
	<label hidden class="label">
		<span>Question</span>
		<input readonly class="input" type="text" name="question" value={data.question.id} />
	</label>
	<label class="label">
		<span>Your answer</span>
		<textarea
			class="textarea"
			rows="4"
			placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
			name="answer"
		/>
	</label>
	<button class="btn">submit</button>
</form>

{#if form}
	{#if form.success}
		<p class="input-success">Successfully submitted your answer</p>
	{:else}
		<p class="input-error">
			While submitting your answer, some error occurred (most likely you already submitted an answer
			before)
		</p>
	{/if}
{/if}
