<script lang="ts">
	import type { Game, QnA, UserInformation } from '$lib/types';
	import QuestionCard from '$lib/ui/QuestionCard.svelte';

	export let data: QnA & { game: Game } & UserInformation;
</script>

<h2>something</h2>

<div class="grid place-content-center">
	<!-- TODO proper output -->
	{JSON.stringify(data)}
</div>

<div class="grid place-content-center">
	<QuestionCard data={data.question} />
</div>
