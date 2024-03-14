import { get_game, get_questions } from '$lib/db/sqlite.js';
import type { Game, Question, User } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }): Promise<{ game: Game }> {
	const id = Number(params.g_id);
	const questions: Promise<({ added: string } & Question)[]> = get_questions(id);
	return get_game(id).then((g) => {
		if (!g) {
			error(404, `Game with id '${params.g_id}' not found`);
		} else {
			const user: User | undefined = locals.user;
			if (!user) {
				error(403, `You have to be logged in to access game '${params.g_id}'`);
			} else if (!g.participants.find((user) => user.id == user?.id)) {
				error(403, `You have to be a participant of game '${params.g_id}'`);
			} else {
				return questions.then((q) => {
					return {
						game: g,
						questions: q
					};
				});
			}
		}
	});
}
