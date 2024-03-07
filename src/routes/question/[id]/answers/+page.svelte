<script lang="ts">
	import type { QnA } from '$lib/types';
	import AnswerCard from '$lib/ui/AnswerCard.svelte';
	import QuestionCard from '$lib/ui/QuestionCard.svelte';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	export let data: QnA;

	let choice: number;
</script>

<h2>make a choice</h2>

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

{#if choice >= 0}
	<h3>your choice</h3>

	<div class="grid place-content-center">
		<AnswerCard data={data.answers.find((answer) => answer.id == choice)} />
		<!-- TODO: how to deal with (a just theoretically possible) undefined? -->
		<button>commit choice (TODO)</button>
	</div>
{/if}
