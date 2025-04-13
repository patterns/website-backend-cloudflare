-- Migration number: 0001 	 2025-04-05T02:03:21.114Z


DROP TABLE IF EXISTS roles;
CREATE TABLE IF NOT EXISTS roles (
    -- Access control roles for administration activities.
    -- (not using foreign key constraint for now, but make business logic manually validate user-create activities.)
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rawdata TEXT NOT NULL,
    created TEXT DEFAULT CURRENT_TIMESTAMP,
    name AS (json_extract(rawdata, '$.name')) STORED
);

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rawdata TEXT NOT NULL,
    created TEXT DEFAULT CURRENT_TIMESTAMP,
    email AS (json_extract(rawdata, '$.email')) STORED,
    rolename AS (json_extract(rawdata, '$.role.name')) STORED,
    useruuid AS (json_extract(rawdata, '$.userUuid')) STORED
);

DROP TABLE IF EXISTS lessons;
CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rawdata TEXT NOT NULL,
    created TEXT DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS courses;
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rawdata TEXT NOT NULL,
    created TEXT DEFAULT CURRENT_TIMESTAMP
);

