import type { Question, QnA, Answer } from '$lib/types';

export async function load({ parent }): Promise<QnA> {
	const answers: Answer[] = [
		{
			id: 0,
			answer: "Nothing. Foxes can't speak English.",
			lang: 'en'
		},
		{
			id: 1,
			answer: 'You already know the Answer.',
			lang: 'en'
		},
		{
			id: 2,
			answer: 'Eat less, move more.',
			lang: 'en'
		},
		{
			id: 3,
			answer: 'Use your lucky color.',
			lang: 'en'
		},
		{
			id: 4,
			answer: 'Climb a hill and look around the world.',
			lang: 'en'
		},
		{
			id: 5,
			answer: 'Sorry, but this is a really stupid question.',
			lang: 'en'
		},
		{
			id: 6,
			answer: 'You are the master of your life.',
			lang: 'en'
		},
		{
			id: 7,
			answer: 'If you are asking this, you already know the answer.',
			lang: 'en'
		},
		{
			id: 8,
			answer: '42',
			lang: 'en'
		}
	];

	const question: Promise<Question> = parent();
	const res: Promise<QnA> = question.then((question: Question) => ({
		question,
		answers
	}));

	return res;
}
