SELECT * FROM users;
SELECT * FROM games;
SELECT * FROM game_participations;
SELECT * FROM questions;
SELECT * FROM answers;

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
