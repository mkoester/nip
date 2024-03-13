CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (id, username) VALUES (0, 'admin');

CREATE TABLE games (
    id INTEGER PRIMARY KEY,
    lang CHARACTER(2) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE game_participations (
    game_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, user_id),
    FOREIGN KEY(game_id) REFERENCES games(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
CREATE INDEX u ON game_participations (user_id);

CREATE TABLE questions (
    id INTEGER PRIMARY KEY,
    lang CHARACTER(2) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    author INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(author) REFERENCES users(id)
);

CREATE TABLE game_questions (
    game_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, question_id),
    FOREIGN KEY(game_id) REFERENCES games(id),
    FOREIGN KEY(question_id) REFERENCES questions(id)
);

/* TODO: how to do something like this?
   CONSTRAINT lang_match CHECK ((SELECT 1 FROM games g JOIN questions q ON g.lang = q.lang WHERE g.id = game_id AND q.id = question_id) NOT NULL) ON CONFLICT ROLLBACK
   making sure that only questions with matching language can be added to a game
 */

CREATE TABLE answers (
    game_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    id INTEGER NOT NULL,
    answer TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, user_id, question_id),
    FOREIGN KEY(game_id) REFERENCES game_questions(game_id),
    FOREIGN KEY(user_id) REFERENCES game_participations(user_id)
    FOREIGN KEY(question_id) REFERENCES game_questions(question_id),
    CONSTRAINT unique_id UNIQUE (game_id, question_id, id) ON CONFLICT ROLLBACK
);

CREATE TABLE choices (
    game_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    answer_id INTEGER NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, user_id, question_id),
    FOREIGN KEY(game_id) REFERENCES game_questions(game_id),
    FOREIGN KEY(user_id) REFERENCES game_participations(user_id)
    FOREIGN KEY(question_id) REFERENCES game_questions(question_id),
    FOREIGN KEY(answer_id) REFERENCES answers(id)
);
