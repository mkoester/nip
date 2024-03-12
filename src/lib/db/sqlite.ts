import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import type { Answer, Game, Question, User } from '$lib/types';

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

export async function get_answers(
	game: number,
	question_id: number,
	current_user: number
): Promise<Answer[]> {
	return openDb().then((db) =>
		db.all<Answer[]>(
			'SELECT id, answer, user_id == ? AS my_answer FROM answers WHERE question_id = ? ORDER BY id',
			current_user,
			question_id
		)
	);
}

export async function get_users(): Promise<User[]> {
	return openDb().then((db) =>
		db.all<User[]>('SELECT id, username FROM users WHERE id > 0 ORDER BY id')
	);
}

const getGameParticipantsQuery = `
SELECT u.id, u.username
FROM game_participations AS gp
JOIN users AS u
ON gp.user_id = u.id
WHERE gp.game_id = ?
ORDER BY gp.created_at
`;

export async function get_game(id: number): Promise<Game | undefined> {
	const db_con = openDb();
	const game: Promise<Game | undefined> = db_con.then((db) => {
		return db.get<Game>('SELECT id, lang, created_at FROM games WHERE id = ?', id);
	});
	const participants: Promise<User[]> = db_con.then((db) => {
		return db.all<User[]>(getGameParticipantsQuery, id);
	});
	return game.then((game) => {
		if (!game) {
			return undefined;
		} else {
			return participants.then((participants) => {
				game.participants = participants;
				return game;
			});
		}
	});
}

const getUserParticipationsQuery = `
SELECT g.id, g.lang, g.created_at, gp.created_at AS joined
FROM games AS g
JOIN game_participations AS gp
ON g.id = gp.game_id
WHERE gp.user_id = ?
ORDER BY gp.created_at DESC
`;

export async function get_games(user_id: number): Promise<Game[]> {
	return openDb().then((db) => db.all<Game[]>(getUserParticipationsQuery, user_id));
}
