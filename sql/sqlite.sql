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

CREATE TABLE answers (
    game_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    id INTEGER UNIQUE NOT NULL,
    answer TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (game_id, user_id, question_id),
    FOREIGN KEY(game_id) REFERENCES game_participations(game_id),
    FOREIGN KEY(user_id) REFERENCES game_participations(user_id)
    FOREIGN KEY(question_id) REFERENCES questions(id)
);
