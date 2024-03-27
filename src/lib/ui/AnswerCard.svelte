<script lang="ts">
	import type { Answer } from '$lib/types';
	import { t } from '$lib/translations/index';
	export let data: Answer;

	let debug = false;
</script>

<div class="card p-4 min-w-56 max-w-96 {data.my_answer ? 'border-2' : ''}">
	<h3 class="h3">
		<span
			class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
			>{#if data.my_answer}{$t('general.my')}
			{/if}{$t('general.answer')}</span
		>
		{#if debug}<span class="text-xs font-thin">(id: {data.id})</span>{/if}
	</h3>
	<p class="text-center pt-3">{data.answer}</p>
</div>
