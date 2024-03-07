import type { Question, QnA, Answer } from '$lib/types';
import { error } from '@sveltejs/kit';

const preparedAnswers = new Map<number, string[]>([
	[
		0,
		[
			"Nothing. Foxes can't speak English.",
			'You already know the Answer.',
			'Eat less, move more.',
			'Use your lucky color.',
			'Climb a hill and look around the world.',
			'Sorry, but this is a really stupid question.',
			'You are the master of your life.',
			'If you are asking this, you already know the answer.',
			'42'
		]
	],
	[1, ['Everyone on board is married']],
	[
		2,
		[
			'one person just pretended to eat.',
			"The group consisted of a grandmother, her daughter and her daughter's daughter.",
			'some other reason.',
			'how would I know?'
		]
	]
]);

export async function load({ parent, params }): Promise<QnA> {
	const id = Number(params.id);
	const answerArray = preparedAnswers.get(id);

	if (answerArray == undefined) {
		error(404, `Question with id '${params.id}' not found`);
	} else {
		const answers: Answer[] = answerArray.map(function (val, index) {
			return {
				id: index, // fake IDs
				answer: val,
				lang: 'en'
			};
		});

		const question: Promise<Question> = parent();
		const res: Promise<QnA> = question.then((question: Question) => ({
			question,
			answers
		}));

		return res;
	}
}
