CREATE DATABASE mus_list;

\c mus_list;

CREATE TABLE IF NOT EXISTS artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    origin VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS albums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
    genre VARCHAR(255),
    publication_date DATE,
    duration INTEGER
);

INSERT INTO artists (name, origin) VALUES
    ('The Smashing Pumpkins', 'Чикаго, Иллинойс, С.Ш.А.'),
    ('Михей И Джуманджи', 'Москва, Россия'),
    ('Yann Tiersen', 'Брест, Бретань, Франция');

INSERT INTO albums (title, artist_id, genre, publication_date, duration) 
SELECT 
    'La Valse des Monstres', (SELECT id FROM artists WHERE name = 'Yann Tiersen'), 'Минимализм', DATE '1995-06-13', 2684
UNION ALL
SELECT 
    'Le Phare', (SELECT id FROM artists WHERE name = 'Yann Tiersen'), 'Минимализм', DATE '1998-02-20', 2636
UNION ALL
SELECT 
    'Сука любовь', (SELECT id FROM artists WHERE name = 'Михей И Джуманджи'), 'Регги, Эйсид-джаз, Фанк, Соул, Драм-н-бейс', DATE '1999-05-25', 2659
UNION ALL
SELECT 
    'Mellon Collie and the Infinite Sadness', (SELECT id FROM artists WHERE name = 'The Smashing Pumpkins'), 'Alternative rock, Grunge, Alternative metal, Art rock, Heavy metal', DATE '1995-10-24', 7299
UNION ALL
SELECT 
    'Siamese Dream', (SELECT id FROM artists WHERE name = 'The Smashing Pumpkins'), 'Alternative rock, Grunge, Alternative metal, Psychedelic rock, Indie rock, Hard rock', DATE '1993-07-27', 3728;
