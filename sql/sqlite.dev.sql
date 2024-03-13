INSERT INTO users (id, username) VALUES
 (1,  'Anna'),
 (2,  'Berta'),
 (3,  'Claudia'),
 (4,  'Detlef'),
 (5,  'Emily'),
 (6,  'Franziskus the XVIII'),
 (7,  'Gunther'),
 (8,  'HAL'),
 (9,  'Ida'),
 (10, 'Jürgen');

INSERT INTO games (id, lang) VALUES
 (1, 'en'),
 (2, 'en'),
 (3, 'en'),
 (4, 'de');

INSERT INTO game_participations (game_id, user_id) VALUES
 (1, 1),
 (1, 2),
 (1, 3),
 (1, 4),
 (1, 5),
 (1, 6),
 (1, 7),
 (1, 8),
 (2, 9),
 (2, 10),
 (3, 8),
 (3, 9),
 (3, 10);

INSERT INTO questions (id, lang, question, answer) VALUES
 (1, 'en', 'What did the fox say?', 'Nothing. Foxes can''t speak English.'),
 (2, 'en', 'You spot a boat full of people but there isn''t a single person on board. How is that possible?', 'Everyone on board is married.'),
 (3, 'en', 'Two mothers and two daughters went out to eat, everyone ate one slice of pizza, yet only three slices were eaten. How''s that possible?', 'The group consisted of a grandmother, her daughter and her daughter''s daughter.');

INSERT INTO game_questions(game_id, question_id ) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);

INSERT INTO answers (game_id, user_id, question_id, id, answer) VALUES
 (1,  1, 1, random(), 'You already know the Answer.'),
 (1,  2, 1, random(), 'Eat less, move more.'),
 (1,  3, 1, random(), 'Use your lucky color.'),
 (1,  4, 1, random(), 'Climb a hill and look around the world.'),
 (1,  5, 1, random(), 'Sorry, but this is a really stupid question.'),
 (1,  6, 1, random(), 'You are the master of your life.'),
 (1,  7, 1, random(), 'If you are asking this, you already know the answer.'),
 (1,  8, 1, random(), '42'),
 (2,  9, 2, random(), 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'),
 (2, 10, 2, random(), 'Months on ye at by esteem desire warmth former. Sure that that way gave any fond now. His boy middleton sir nor engrossed affection excellent.'),
 (3,  8, 3, random(), 'One person just pretended to eat.'),
 (3,  9, 3, random(), 'Some other reason.'),
 (3, 10, 3, random(), 'How would I know?');

INSERT INTO answers (game_id, user_id, question_id, id, answer)
SELECT 1, 0, id, random(), answer FROM questions WHERE id = 1
UNION
SELECT 1, 0, id, random(), answer FROM questions WHERE id = 2
UNION
SELECT 2, 0, id, random(), answer FROM questions WHERE id = 2
UNION
SELECT 3, 0, id, random(), answer FROM questions WHERE id = 3;