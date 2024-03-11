import { get_game } from '$lib/db/sqlite.js';
import type { Game } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }): Promise<{ game: Game }> {
	const id = Number(params.g_id);
	return get_game(id).then((g) => {
		if (g == undefined) {
			error(404, `Game with id '${params.g_id}' not found`);
		} else {
			// TODO check user membership
			return {
				game: g
			};
		}
	});
}
