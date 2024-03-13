<script lang="ts">
	import type { Game, QnA, UserInformation } from '$lib/types';
	import QuestionCard from '$lib/ui/QuestionCard.svelte';

	export let data: QnA & { game: Game } & UserInformation;
	export let form: { success: boolean };
</script>

<h2>something</h2>

<div class="grid place-content-center">
	<!-- TODO proper output -->
	{JSON.stringify(data)}
</div>

<div class="grid place-content-center">
	<QuestionCard data={data.question} />
</div>

<h2>your answer</h2>

<form method="POST" action="/game/{data.game.id}/question/{data.question.id}">
	<label class="label">
		<span>Game</span>
		<input readonly class="input" type="text" name="game" value={data.game.id} />
	</label>
	<label class="label">
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
