<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { t } from '$lib/translations/index';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a on:click={drawerClose} href="/">{$t('navigation.home')}</a></li>
		<li><a on:click={drawerClose} href="/user/games">{$t('navigation.my_games')}</a></li>
		<li><a on:click={drawerClose} href="/about" class="line-through">About</a></li>
		<li><a on:click={drawerClose} href="/user/login">{$t('navigation.login')}</a></li>
		<li><a on:click={drawerClose} href="/game/1">G1</a></li>
		<li><a on:click={drawerClose} href="/game/5" class="line-through">G5</a></li>
		<li><a on:click={drawerClose} href="/game/1/question/1">G1, Q1</a></li>
		<li><a on:click={drawerClose} href="/game/1/question/1/answers">G1, Q1 + answers</a></li>
		<li><a on:click={drawerClose} href="/game/1/question/2">G1, Q2</a></li>
		<li><a on:click={drawerClose} href="/game/1/question/2/answers">G1, Q2 + answers</a></li>
		<li><a on:click={drawerClose} href="/game/2/question/2/answers">G2, Q2 + answers</a></li>
		<li><a on:click={drawerClose} href="/game/3/question/3/answers">G3, Q3 + answers</a></li>
		<li>
			<a on:click={drawerClose} href="/game/4/question/4/answers" class="line-through"
				>G4, Q4 + answers</a
			>
		</li>
		<li>
			<a on:click={drawerClose} href="/game/5/question/4/answers" class="line-through"
				>G5, Q4 + answers</a
			>
		</li>
	</ul>
</nav>
