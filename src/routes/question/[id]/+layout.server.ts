import type { Question } from '$lib/types';

export async function load(): Promise<Question> {
	const res: Question = {
		id: 0,
		question: 'What did the fox say?',
		lang: 'en'
	};
	return res;
}
