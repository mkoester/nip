<script lang="ts">
	import type { User } from '$lib/types';
	import { t } from '$lib/translations/index';
	export let data: User[];
</script>

<h3 class="h3">{$t('general.participants')}</h3>

<div class="table-container">
	<table class="table table-hover">
		<thead><tr><th>id</th><th>name</th></tr></thead>
		<tbody>
			{#each data as user}
				<tr>
					<td>{user.id}</td>
					<td>{user.username}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
