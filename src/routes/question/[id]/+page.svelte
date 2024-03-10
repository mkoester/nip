<script lang="ts">
	import type { QnA, UserInformation } from '$lib/types';
	import QuestionCard from '$lib/ui/QuestionCard.svelte';

	export let data: QnA & UserInformation;
	console.log(data);
</script>

<h2>something</h2>

<div class="grid place-content-center">
	<QuestionCard data={data.question} />
</div>
