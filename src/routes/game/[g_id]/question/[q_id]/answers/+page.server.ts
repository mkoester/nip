import { get_answers, insert_choice } from '$lib/db/sqlite.js';
import type { Answer, Answers, User } from '$lib/types';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ locals, params }): Promise<Answers> {
	const user: User | undefined = locals.user;
	const g_id = Number(params.g_id);
	const q_id = Number(params.q_id);
	const userID: number = user?.id || -1;
	return get_answers(g_id, q_id, userID).then((a: Answer[]) => {
		return { answers: a } satisfies Answers;
	});
}

export const actions = {
	default: async ({ request, locals }) => {
		// TODO a lot of code duplication with .../[q_id]/+page.server.ts
		return request.formData().then((formData) => {
			const user: User | undefined = locals.user;
			if (!user) {
				return fail(403, { error: true, message: 'you have to be logged in to submit an answer' });
			} else {
				const game: FormDataEntryValue | null = formData.get('game');
				const question: FormDataEntryValue | null = formData.get('question'); //TODO rather get these first 2 from the url
				const answer: FormDataEntryValue | null = formData.get('answer');
				if (!game) {
					return fail(400, { game: true, missing: true });
				}
				if (!question) {
					return fail(400, { question: true, missing: true });
				}
				if (!answer) {
					return fail(400, { answer: true, missing: true });
				}
				const game_id = Number(game?.toString());
				const user_id = user.id;
				const question_id = Number(question?.toString());
				const answer_id = Number(answer?.toString());
				// TODO check values and permissions
				return insert_choice(game_id, user_id, question_id, answer_id).then((success) => {
					console.log(
						`DEBUG: insert_choice for user '${user_id}', game '${game_id}', question '${question_id}: ${success}'`
					);
					return { success };
				});
			}
		});
	}
} satisfies Actions;
