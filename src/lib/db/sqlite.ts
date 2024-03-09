import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import type { Answer, Question } from '$lib/types';

// you would have to import / invoke this in another file
async function openDb(): Promise<Database> {
	return open({
		filename: './database.dev.sqlite',
		driver: sqlite3.cached.Database
	});
}

export async function get_question(
	game: number,
	question_id: number
): Promise<Question | undefined> {
	return openDb().then((db) =>
		db.get<Question>('SELECT id, lang, question FROM questions WHERE id = ?', question_id)
	);
}

export async function get_answers(game: number, question_id: number): Promise<Answer[]> {
	return openDb().then((db) =>
		db.all<Answer[]>(
			'SELECT id, answer FROM answers WHERE question_id = ? ORDER BY id',
			question_id
		)
	);
}
