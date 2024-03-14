import { insert_answer } from '$lib/db/sqlite';
import type { User } from '$lib/types';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, locals }) => {
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
				const answer_text = answer?.toString();
				// TODO check values and permissions
				return insert_answer(game_id, user_id, question_id, answer_text).then((success) => {
					console.log(
						`DEBUG: insert_answer for user '${user_id}', game '${game_id}', question '${question_id}: success? ${success}'`
					);
					return { success };
				});
			}
		});
	}
} satisfies Actions;
