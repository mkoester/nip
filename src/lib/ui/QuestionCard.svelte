<script lang="ts">
	import type { Question } from '$lib/types';
	import { t } from '$lib/translations/index';
	export let data: Question;

	let debug = true;
</script>

<div class="card p-4 min-w-56 max-w-96">
	<h3 class="h3">
		<span
			class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
			>{$t('general.question')}</span
		>
		{#if debug}<span class="text-xs font-thin">(id: {data.id}, lang: {data.lang})</span>{/if}
	</h3>
	<p class="text-center pt-3">{data.question}</p>
</div>
