export interface Question {
	id: number;
	question: string;
	lang: string;
}

export interface Answer {
	id: number;
	user?: number;
	answer: string;
	lang: string;
}

export interface QnA {
	question: Question;
	answers: Answer[];
}
