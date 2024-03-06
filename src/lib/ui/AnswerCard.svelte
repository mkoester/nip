<script lang="ts">
	import type { Answer } from '$lib/types';
	export let data: Answer;
</script>

<div class="card p-4 min-w-56 max-w-96">
	<h3 class="h3">
		<span
			class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
			>Answer</span
		>
		<span class="text-xs font-thin">(id: {data.id}, lang: {data.lang})</span>
	</h3>
	<p class="text-center pt-3">{data.answer}</p>
</div>
