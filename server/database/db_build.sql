BEGIN;

    DROP TABLE IF EXISTS users, familyHistory
    cascade;

DROP EXTENSION
IF EXISTS "uuid-ossp"
    cascade;

-- Add Jerusalem Time Zone
set TIMEZONE
='Asia/Jerusalem';

-- create extension to user uuid_generate_v4 ()
--https://www.postgresql.org/docs/9.4/uuid-ossp.html
-- CREATE EXTENSION
-- IF NOT EXISTS "uuid-ossp";


-- create extension to user uuid_generate_v4 ()
-- https://www.postgresqltutorial.com/postgresql-uuid/

CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";




CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    gid uuid DEFAULT uuid_generate_v4 (),
    user_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL
);



CREATE TABLE familyHistory
(
    id SERIAL PRIMARY KEY NOT NULL,
    gid uuid DEFAULT uuid_generate_v4 (),
    name VARCHAR(500) NOT NULL,
    birthday DATE,
    dateDeath DATE,
    profileImageUrl VARCHAR(500),
    public_id VARCHAR(500),
    age integer
);

COMMIT;


