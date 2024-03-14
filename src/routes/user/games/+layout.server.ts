import { get_games } from '$lib/db/sqlite';
import type { Game, User } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ locals }): Promise<{ games: Game[] }> {
	const user: User | undefined = locals.user;

	if (!user) {
		error(403, `You have to be logged in`);
	} else {
		return get_games(user.id).then((g) => {
			return { games: g };
		});
	}
}
