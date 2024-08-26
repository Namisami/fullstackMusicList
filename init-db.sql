CREATE DATABASE mus_list;

\c mus_list;

CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    origin VARCHAR(255)
);

CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id INTEGER REFERENCES artists(id),
    genre VARCHAR(255),
    publication_date DATE,
    duration INTEGER
);

INSERT INTO artists (name, origin) VALUES
    ('The Smashing Pumpkins', '	Чикаго, Иллинойс, С.Ш.А.'),
    ('Михей И Джуманджи', 'Москва, Россия'),
    ('Yann Tiersen', 'Брест, Бретань, Франция');

INSERT INTO books (title, artist_id, genre, publication_date, duration) VALUES
    ('La Valse des Monstres', 3, 'Минимализм', '1995-06-13', 2684),
    ('Le Phare', 3, 'Минимализм', '1998-02-20', 2636),
    ('Сука любовь', 2, 'Регги, Эйсид-джаз, Фанк, Соул, Драм-н-бейс', '1999-05-25', 2659),
    ('Mellon Collie and the Infinite Sadness', 1, 'Alternative rock, Grunge, Alternative metal, Art rock, Heavy metal', '1995-10-24', 7299),
    ('Siamese Dream', 1, 'Alternative rock, Grunge, Alternative metal, Psychedelic rock, Indie rock, Hard rock', '1993-07-27', 3728);