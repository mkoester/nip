<script lang="ts">
	import type { Game, QnA, UserInformation, Answer } from '$lib/types';
	import { t } from '$lib/translations/index';
	import AnswerCard from '$lib/ui/AnswerCard.svelte';
	import ParticipantsTable from '$lib/ui/ParticipantsTable.svelte';
	import QuestionCard from '$lib/ui/QuestionCard.svelte';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';

	export let data: QnA & { my_choice: Answer | undefined } & { game: Game } & UserInformation;

	let choice: number;
	$: chosenAnswer = data.answers.find((answer) => answer.id == choice);
	export let form: { success: boolean };

	let debug = false;
</script>

<ol class="breadcrumb">
	<li class="crumb"><a class="anchor" href="/"><HomeIcon /></a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">
		<a class="anchor" href="/game/{$page.params.g_id}">{$t('general.game')} {$page.params.g_id}</a>
	</li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">
		<a class="anchor" href="/game/{$page.params.g_id}/question/{$page.params.q_id}"
			>{$t('general.question')} {$page.params.q_id}</a
		>
	</li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>{$t('general.answers')}</li>
</ol>

{#if debug}
	<div class="grid place-content-center">
		{JSON.stringify(data)}
	</div>
{/if}

<h2 class="h2">{$t('general.game')} {$page.params.g_id}</h2>

<ParticipantsTable data={data.game.participants} />

<h2 class="h2">{$t('general.question')} {$page.params.q_id}</h2>

<div class="grid place-content-center">
	<QuestionCard data={data.question} />
</div>

{#if data.my_choice}
	<h3 class="h3">your choice</h3>
	<div class="grid place-content-center">
		<AnswerCard data={data.my_choice} />
	</div>
{:else}
	<h3 class="h3">{$t('general.make_a_choice')}</h3>
	<div
		class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10"
	>
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
		<h3 class="h3">{$t('general.your_choice')}</h3>

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
					<button class="btn">{$t('general.commit_choice')}</button>
				</form>
			</div>
		{/if}
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
