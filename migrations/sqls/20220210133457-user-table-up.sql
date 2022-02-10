/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar not null UNIQUE,
    password varchar not null,
    created_at timestamp default now(),
    updated_at timestamp default now()
);