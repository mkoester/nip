import { get_answers } from '$lib/db/sqlite.js';
import type { Question, QnA, Answer } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ parent, params }): Promise<QnA> {
	const id = Number(params.id);
	return get_answers(1, id).then((a) => {
		const q: Promise<Question> = parent();
		const answers: Answer[] = a;
		const res: Promise<QnA> = q.then((question: Question) => ({
			question,
			answers
		}));

		return res;
	});
}
