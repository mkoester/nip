import { get_games } from '$lib/db/sqlite';
import type { Game, UserInformation } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ parent }): Promise<{ games: Game[] }> {
	const userInformation: Promise<UserInformation> = parent();

	return userInformation.then((u) => {
		if (!u?.user) {
			error(403, `You have to be logged in`);
		} else {
			return get_games(u.user.id).then((g) => {
				return { games: g };
			});
		}
	});
}
