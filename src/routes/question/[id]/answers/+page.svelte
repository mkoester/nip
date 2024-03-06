<script lang="ts">
	import type { Answers } from '$lib/types';
	import AnswerCard from '$lib/ui/AnswerCard.svelte';

	export let data: Answers;
</script>

<h2>something else</h2>

<div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10">
	{#each data.answers as answer}
		<AnswerCard data={answer} />
	{/each}
</div>
