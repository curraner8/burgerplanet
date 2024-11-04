DROP TABLE IF EXISTS members;

CREATE TABLE members
(
    user_id TEXT PRIMARY KEY,
    password TEXT NOT NULL
);