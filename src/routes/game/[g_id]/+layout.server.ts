import { get_game } from '$lib/db/sqlite.js';
import type { Game, UserInformation } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ parent, params }): Promise<{ game: Game }> {
	const id = Number(params.g_id);
	return get_game(id).then((g) => {
		if (!g) {
			error(404, `Game with id '${params.g_id}' not found`);
		} else {
			const userInformation: Promise<UserInformation> = parent();
			return userInformation.then((u) => {
				if (!u) {
					error(403, `You have to be logged in to access game '${params.g_id}'`);
				} else if (!g.participants.find((user) => user.id == u.user?.id)) {
					error(403, `You have to be a participant of game '${params.g_id}'`);
				} else {
					return {
						game: g
					};
				}
			});
		}
	});
}
