import { get_question, get_answer } from '$lib/db/sqlite';
import type { Answer, QnA } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }): Promise<QnA & { my_answer: Answer | undefined }> {
	const g_id = Number(params.g_id);
	const q_id = Number(params.q_id);
	const u_id = locals.user?.id;
	let myAnswer: Promise<Answer | undefined>;
	if (u_id) {
		myAnswer = get_answer(g_id, u_id, q_id);
	} else {
		myAnswer = Promise.resolve(undefined);
	}

	return get_question(g_id, q_id).then((q) => {
		if (q == undefined) {
			error(404, `Question with id '${params.q_id}' not found`);
		} else {
			return myAnswer.then((a) => {
				return {
					question: q,
					answers: [],
					my_answer: a
				} satisfies QnA & { my_answer: Answer | undefined };
			});
		}
	});
}
