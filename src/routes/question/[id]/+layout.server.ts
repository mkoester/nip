import { get_question } from '$lib/db/sqlite';
import type { QnA } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params }): Promise<QnA> {
	const id = Number(params.id);
	return get_question(1, id).then((q) => {
		if (q == undefined) {
			error(404, `Question with id '${params.id}' not found`);
		} else {
			return {
				question: q,
				answers: []
			} satisfies QnA;
		}
	});
}
