import { get_question } from '$lib/db/sqlite';
import type { QnA } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }): Promise<QnA> {
	const g_id = Number(params.g_id);
	const q_id = Number(params.q_id);
	return get_question(g_id, q_id).then((q) => {
		if (q == undefined) {
			error(404, `Question with id '${params.q_id}' not found`);
		} else {
			return {
				question: q,
				answers: []
			} satisfies QnA;
		}
	});
}
