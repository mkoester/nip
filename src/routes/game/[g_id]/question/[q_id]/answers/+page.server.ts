import { get_answers, insert_choice } from '$lib/db/sqlite.js';
import { getUserInformation } from '$lib/helper';
import type { Answer, Answers, UserInformation } from '$lib/types';
import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export async function load({ parent, params }): Promise<Answers> {
	const g_id = Number(params.g_id);
	const q_id = Number(params.q_id);
	return parent().then((u: UserInformation) => {
		const userID: number = u.user?.id || -1;
		return get_answers(g_id, q_id, userID).then((a: Answer[]) => {
			return { answers: a } satisfies Answers;
		});
	});
}

export const actions = {
	default: async (event: RequestEvent) => {
		// TODO a lot of code duplication with .../[q_id]/+page.server.ts
		return event.request.formData().then((formData) => {
			const userInformation: UserInformation = getUserInformation(event.cookies);
			if (!userInformation.user) {
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
				const user_id = userInformation.user.id;
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
