export interface Question {
	id: number;
	question: string;
	lang: string;
}

export interface Answer {
	id: number;
	user?: number;
	answer: string;
}

export interface Answers {
	answers: Answer[];
}

export interface QnA {
	question: Question;
	answers: Answer[];
}

export interface User {
	id: number;
	username: string;
}

export interface UserInformation {
	user: User | undefined;
}
