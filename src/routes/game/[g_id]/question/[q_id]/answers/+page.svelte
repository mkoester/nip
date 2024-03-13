<script lang="ts">
	import type { Game, QnA, UserInformation } from '$lib/types';
	import AnswerCard from '$lib/ui/AnswerCard.svelte';
	import ParticipantsTable from '$lib/ui/ParticipantsTable.svelte';
	import QuestionCard from '$lib/ui/QuestionCard.svelte';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	export let data: QnA & { game: Game } & UserInformation;

	let choice: number;
	$: chosenAnswer = data.answers.find((answer) => answer.id == choice);
	export let form: { success: boolean };

	let debug = false;
</script>

{#if debug}
	<div class="grid place-content-center">
		{JSON.stringify(data)}
	</div>
{/if}

<ParticipantsTable data={data.game.participants} />

<h2 class="h2">make a choice</h2>

<div class="grid place-content-center">
	<QuestionCard data={data.question} />
</div>

<div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10">
	<RadioGroup
		active="variant-filled-primary"
		hover="hover:variant-soft-primary"
		rounded="rounded-2xl"
	>
		{#each data.answers as answer}
			<RadioItem bind:group={choice} name="justify" value={answer.id}>
				<AnswerCard data={answer} />
			</RadioItem>
		{/each}
	</RadioGroup>
</div>

{#if chosenAnswer}
	<h3 class="h3">your choice</h3>

	{#if !chosenAnswer.my_answer}
		<div class="grid place-content-center">
			<AnswerCard data={chosenAnswer} />
			<form method="POST" action="/game/{data.game.id}/question/{data.question.id}/answers">
				<label hidden class="label">
					<span>Game</span>
					<input readonly class="input" type="text" name="game" value={data.game.id} />
				</label>
				<label hidden class="label">
					<span>Question</span>
					<input readonly class="input" type="text" name="question" value={data.question.id} />
				</label>
				<label hidden class="label">
					<span>Your choice</span>
					<input readonly class="input" type="text" name="answer" value={chosenAnswer.id} />
				</label>
				<label hidden class="label">
					<span>Your choice</span>
					<input
						readonly
						class="input"
						type="text"
						name="answer_text"
						value={chosenAnswer.answer}
					/>
				</label>
				<button class="btn">commit choice</button>
			</form>
		</div>
	{/if}
{/if}

{#if form}
	{#if form.success}
		<p class="input-success">Successfully submitted your answer</p>
	{:else}
		<p class="input-error">
			While submitting your answer, some error occurred (most likely you already submitted a choice
			before)
		</p>
	{/if}
{/if}
