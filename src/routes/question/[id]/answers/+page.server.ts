import { get_answers } from '$lib/db/sqlite.js';
import type { Answer, Answers, UserInformation } from '$lib/types';

export async function load({ parent, params }): Promise<Answers> {
	const id = Number(params.id);
	return parent().then((u: UserInformation) => {
		const userID: number = u.user?.id || -1;
		return get_answers(1, id, userID).then((a: Answer[]) => {
			return { answers: a } satisfies Answers;
		});
	});
}
