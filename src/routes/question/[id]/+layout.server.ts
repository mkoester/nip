import type { Question } from '$lib/types';
import { error } from '@sveltejs/kit';

const questions = new Map<number, string>([
	[0, 'What did the fox say?'],
	[
		1,
		"You spot a boat full of people but there isn't a single person on board. How is that possible?"
	],
	[
		2,
		"Two mothers and two daughters went out to eat, everyone ate one slice of pizza, yet only three slices were eaten. How's that possible?"
	]
]);

export async function load({ params }): Promise<Question> {
	const id = Number(params.id);
	const question = questions.get(id);

	if (question == undefined) {
		error(404, `Question with id '${params.id}' not found`);
	} else {
		const res: Question = {
			id,
			question,
			lang: 'en'
		};
		return res;
	}
}
