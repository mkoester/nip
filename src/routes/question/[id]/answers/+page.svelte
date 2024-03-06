<script lang="ts">
	import type { QnA } from '$lib/types';
	import AnswerCard from '$lib/ui/AnswerCard.svelte';
	import QuestionCard from '$lib/ui/QuestionCard.svelte';

	export let data: QnA;
</script>

<h2>something else</h2>

<div class="grid place-content-center">
	<QuestionCard data={data.question} />
</div>

<div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10">
	{#each data.answers as answer}
		<AnswerCard data={answer} />
	{/each}
</div>
