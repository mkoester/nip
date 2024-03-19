import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import type { Answer, Game, Question, User } from '$lib/types';
import { dev } from '$app/environment';

let db_path: string;
if (dev) db_path = './database.dev.sqlite';
else db_path = '/app/data/database.sqlite'; // TODO /app is specific for the node docker image; rather via ENV variable

async function openDb(): Promise<Database> {
	return open({
		filename: db_path,
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
			'SELECT id, answer, user_id == ? AS my_answer FROM answers WHERE game_id = ? AND question_id = ? ORDER BY id',
			current_user,
			game,
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

const getQuestionsForGameQuery = `
SELECT q.id, q.question, q.created_at AS added
FROM game_questions AS gq
LEFT JOIN questions AS q
ON gq.question_id = q.id
WHERE gq.game_id = ?
ORDER BY added
`;

export async function get_questions(game_id: number): Promise<({ added: string } & Question)[]> {
	return openDb().then((db) =>
		db.all<({ added: string } & Question)[]>(getQuestionsForGameQuery, game_id)
	);
}

const insertAnswerQuery = `
INSERT INTO answers (game_id, user_id, question_id, id, answer) VALUES
 (?, ?, ?, random() / 10000, ?)
`; //TODO maybe this should be an INSERT OR UPDATE / UPSERT

export async function insert_answer(
	game_id: number,
	user_id: number,
	question_id: number,
	answer: string
): Promise<boolean> {
	return openDb()
		.then((db) => db.run(insertAnswerQuery, game_id, user_id, question_id, answer))
		.then((result) => {
			if (result.lastID) {
				return result.lastID > 0;
			} else {
				return false;
			}
		})
		.catch((onrejected) => {
			console.log(
				`error during sqlite *insert_answer* with user '${user_id}', game '${game_id}', question '${question_id}' and some answer\n`,
				onrejected
			);
			return false;
		});
} // TODO: since this query might fail (UNIQUE constraint failed: answers.game_id, answers.user_id, answers.question_id) I need to handle these possible cases properly (also with a proper logging library)

const insertAnswerChoiceQuery = `
INSERT INTO choices (game_id, user_id, question_id, answer_id) VALUES
 (?, ?, ?, ?)
`; //TODO maybe this should be an INSERT OR UPDATE / UPSERT

export async function insert_choice( // TODO a lot of duplicated code (insert_answer, insert_choice)
	game_id: number,
	user_id: number,
	question_id: number,
	answer_id: number
): Promise<boolean> {
	return openDb()
		.then((db) => db.run(insertAnswerChoiceQuery, game_id, user_id, question_id, answer_id))
		.then((result) => {
			if (result.lastID) {
				return result.lastID > 0;
			} else {
				return false;
			}
		})
		.catch((onrejected) => {
			console.log(
				`error during sqlite *insert_choice* with user '${user_id}', game '${game_id}', question '${question_id}' and some choice (answer id)\n`,
				onrejected
			);
			return false;
		});
}

export async function get_answer(
	game_id: number,
	user_id: number,
	question_id: number
): Promise<Answer | undefined> {
	return openDb().then((db) =>
		db.get<Answer>(
			'SELECT id, user_id, answer, true AS my_answer FROM answers WHERE game_id = ? AND user_id = ? AND question_id = ?',
			game_id,
			user_id,
			question_id
		)
	);
}

const getAnswerChoiceQuery = `
SELECT a.id, answer, false AS my_answer
FROM choices AS c
JOIN answers AS a
ON c.answer_id = a.id AND c.game_id = a.game_id AND c.question_id = a.question_id
WHERE c.game_id = ? AND c.user_id = ? AND c.question_id = ?
`;

export async function get_choice(
	game_id: number,
	user_id: number,
	question_id: number
): Promise<Answer | undefined> {
	return openDb().then((db) => db.get<Answer>(getAnswerChoiceQuery, game_id, user_id, question_id));
}
