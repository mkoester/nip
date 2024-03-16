export interface User {
	id: number;
	username: string;
}

export interface UserInformation {
	user: User | undefined;
}

export interface Game {
	id: number;
	lang: string;
	created_at: string;
	joined: string | undefined;
	participants: User[];
}

export interface Question {
	id: number;
	question: string;
	lang: string;
}

export interface Answer {
	id: number;
	user?: number;
	answer: string;
	my_answer: boolean;
}

export interface Answers {
	answers: Answer[];
}

export interface QnA {
	question: Question;
	answers: Answer[];
}

export enum JwtVerifyResult {
	no_cookie = 1,
	token_expired,
	unknown_error,
	unknown_payload
}

export enum JwtType {
	auth = 1,
	refresh
}
