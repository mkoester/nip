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
 ( 1, 'en', 'What did the fox say?', 'Nothing. Foxes can''t speak English.'),
 ( 2, 'en', 'You spot a boat full of people but there isn''t a single person on board. How is that possible?', 'Everyone on board is married.'),
 ( 3, 'en', 'Two mothers and two daughters went out to eat, everyone ate one slice of pizza, yet only three slices were eaten. How''s that possible?', 'The group consisted of a grandmother, her daughter and her daughter''s daughter.'),
 ( 4, 'de', 'Was verbirgt sich hinter dem Begriff Orchideenfach?', 'Ein Studienfach, welches nur an wenigen Universitäten angeboten und von wenigen Studenten studiert wird.'),
 ( 5, 'de', 'Was ist der/die/das Zehnmond?', 'Ein altes Wort für den Dezember.'),
 ( 6, 'de', 'Was meint man mit Hirnholz?', 'Ein Holz, welches längs geschnitten wurde, sodass die Jahresringe zu erkennen sind.'),
 ( 7, 'de', 'Na klar, der/die/das Portierzwiebel ist ...', '... ein kleinen Haarknoten von Frauen, früher von Portierfrauen getragen.'),
 ( 8, 'de', 'Was bezeichnet man als Quetschkommode?', 'Eine Ziehharmonika oder ein Akkordeon.'),
 ( 9, 'de', 'Sapperlot, was ist ein Vatermörder?', 'Ein gestärkter Hemdkragen, der vor allem im 19. Jahrhundert verbreitet war.'),
 (10, 'de', 'Was war noch einmal der/die/das godspot?', 'Das freie WLAN der evangelischen Kirche.'),
 (11, 'de', 'Was ist wohl ein/eine Googol?', 'Eine Zahl mit 100 Nullen.'),
 (12, 'de', 'Was meint man mit Asphyxie?', 'Der medizinische Begriff für Atemstillstand.'),
 (13, 'de', 'Was bezeichnet man als aerob?', 'Einen Organismus, der Sauerstoff zur Energiegewinnung nutzt.'),
 (14, 'de', 'Na klar, der/die/das Gluon ist ...', '... subatomare Elementarteilchen, die indirekt für die Anziehung von Protonen und Neutronen in einem Atomkern verantwortlich sind.'),
 (15, 'de', 'Was ist der/die/das Kohorte?', 'In der Soziologie bezeichnet man so Altersgruppen.'),
 (16, 'de', 'Sapperlot, was ist ein/eine Allegorie?', 'Bildhafte Wiedergabe von Begriffen und Idealvorstellungen in menschlicher Gestalt.'),
 (17, 'de', 'Was war noch einmal der/die/das ?', 'Das Bilden und schlagartige Zusammenfallen von mit Dampf gefüllten Blasen.');

INSERT INTO game_questions(game_id, question_id ) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);

INSERT INTO answers (game_id, user_id, question_id, id, answer) VALUES
 (1,  1, 1, random() / 10000, 'You already know the Answer.'),
 (1,  2, 1, random() / 10000, 'Eat less, move more.'),
 (1,  3, 1, random() / 10000, 'Use your lucky color.'),
 (1,  4, 1, random() / 10000, 'Climb a hill and look around the world.'),
 (1,  5, 1, random() / 10000, 'Sorry, but this is a really stupid question.'),
 (1,  6, 1, random() / 10000, 'You are the master of your life.'),
 (1,  7, 1, random() / 10000, 'If you are asking this, you already know the answer.'),
 (1,  8, 1, random() / 10000, '42'),
 (2,  9, 2, random() / 10000, 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'),
 (2, 10, 2, random() / 10000, 'Months on ye at by esteem desire warmth former. Sure that that way gave any fond now. His boy middleton sir nor engrossed affection excellent.'),
 (3,  8, 3, random() / 10000, 'One person just pretended to eat.'),
 (3,  9, 3, random() / 10000, 'Some other reason.'),
 (3, 10, 3, random() / 10000, 'How would I know?');

INSERT INTO answers (game_id, user_id, question_id, id, answer)
SELECT 1, 0, id, random() / 10000, answer FROM questions WHERE id = 1
UNION
SELECT 1, 0, id, random() / 10000, answer FROM questions WHERE id = 2
UNION
SELECT 2, 0, id, random() / 10000, answer FROM questions WHERE id = 2
UNION
SELECT 3, 0, id, random() / 10000, answer FROM questions WHERE id = 3;
