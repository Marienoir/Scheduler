/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS schedule (
    id SERIAL PRIMARY KEY,
    email varchar REFERENCES users(email),
    name_of_schedule varchar NOT NULL,
    time_of_schedule varchar NOT NULL,
    place_of_schedule varchar NOT NULL,
    purpose_of_schedule varchar,
    created_at timestamp default now(),
    updated_at timestamp default now()
);