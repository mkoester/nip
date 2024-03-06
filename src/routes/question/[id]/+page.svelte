<script lang="ts">
	import type { Question } from '$lib/types';
	import QuestionCard from '$lib/ui/QuestionCard.svelte';

	export let data: Question;
</script>

<h2>something</h2>

<div class="grid place-content-center">
	<QuestionCard {data} />
</div>
