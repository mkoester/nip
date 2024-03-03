<script lang="ts">
	import type { Question } from '$lib/types';
	import QuestionCard from '$lib/QuestionCard.svelte';
    
    export let data: Question;
</script>

<h2>something</h2>

<div class="grid place-content-center">
    <QuestionCard id={data.id} question={data.question} lang={data.lang}/>
</div>
