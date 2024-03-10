<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a on:click={drawerClose} href="/">Home</a></li>
		<li><a on:click={drawerClose} href="/about" class="line-through">About</a></li>
		<li><a on:click={drawerClose} href="/user/login">Login</a></li>
		<li><a on:click={drawerClose} href="/question/1">Q1</a></li>
		<li><a on:click={drawerClose} href="/question/1/answers">Q1 + answers</a></li>
		<li><a on:click={drawerClose} href="/question/2/answers">Q2 + answers</a></li>
		<li><a on:click={drawerClose} href="/question/3/answers">Q3 + answers</a></li>
		<li>
			<a on:click={drawerClose} href="/question/4/answers" class="line-through">Q4 + answers</a>
		</li>
	</ul>
</nav>
