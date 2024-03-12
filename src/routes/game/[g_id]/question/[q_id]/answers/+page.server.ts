import { get_answers } from '$lib/db/sqlite.js';
import type { Answer, Answers, UserInformation } from '$lib/types';

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
