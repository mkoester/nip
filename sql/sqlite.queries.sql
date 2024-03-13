SELECT * FROM users;
SELECT * FROM games;
SELECT * FROM game_participations;
SELECT * FROM questions;
SELECT * FROM game_questions;
SELECT * FROM answers;
SELECT * FROM choices;

SELECT g.id AS game_id, lang, username 
FROM games AS g
LEFT JOIN game_participations AS p ON g.id = p.game_id
LEFT JOIN users AS u ON p.user_id = u.id
LIMIT 30;

SELECT g.id AS game_id, g.lang, username, q.question, q.author, q.answer AS correct_answer, a.answer AS user_answer
FROM games AS g
LEFT JOIN game_participations AS p ON g.id = p.game_id
LEFT JOIN users AS u ON p.user_id = u.id
LEFT JOIN answers AS a ON a.game_id = g.id AND a.user_id = u.id
LEFT JOIN questions AS q ON a.question_id = q.id
LIMIT 30;

SELECT id, lang, question FROM questions WHERE id = 1;
SELECT id, answer FROM answers WHERE question_id = 1 ORDER BY id;

INSERT INTO answers (game_id, user_id, question_id, id, answer)
SELECT game_id, user_id, question_id, id, 'should not work' FROM answers WHERE game_id = 1 AND user_id = 2 AND question_id = 1;

SELECT * FROM answers WHERE user_id = 2;

SELECT q.id, q.question, q.created_at AS added
FROM game_questions AS gq
LEFT JOIN questions AS q
ON gq.question_id = q.id
WHERE gq.game_id = 1
ORDER BY added;
