import { get_answers } from '$lib/db/sqlite.js';
import type { Answer, Answers } from '$lib/types';

export async function load({ params }): Promise<Answers> {
	const id = Number(params.id);
	return get_answers(1, id).then((a: Answer[]) => {
		return { answers: a } satisfies Answers;
	});
}
