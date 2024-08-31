CREATE TABLE movies (movie_id INT GENERATED ALWAYS AS IDENTITY, title VARCHAR(255) UNIQUE NOT NULL,movie_genre INT,studio INT,PRIMARY KEY(movie_id),CONSTRAINT fk_movie_genre FOREIGN KEY (movie_genre) REFERENCES movie_genre(movie_genre_id) ON DELETE CASCADE,CONSTRAINT fk_studio FOREIGN KEY (studio) REFERENCES studio(studio_id) ON DELETE CASCADE);

CREATE TABLE movie_genre(movie_genre_id INT GENERATED ALWAYS AS IDENTITY,genre_name VARCHAR(255) UNIQUE NOT NULL, PRIMARY KEY(movie_genre_id));

CREATE TABLE studio(studio_id INT GENERATED ALWAYS AS IDENTITY, studio_name VARCHAR(255) UNIQUE NOT NULL,PRIMARY KEY(studio_id));


INSERT INTO movie_genre(genre_name) VALUES('Action'),('Drama'),('Sci-fi'),('Comedy');
INSERT INTO studio(studio_name) VALUES('Warner Bros'),('Universal Pictures'),('Paramount Pictures'),('Walt Disney Pictures');
INSERT INTO movies(title, movie_genre, studio) VALUES('Man of Steel', 1, 1),('Justice League', 1, 1),('The Batman', 1, 1),('Minions', 4, 2),('Jurassic Park', 1, 2),('Interstellar', 3, 3),('World War Z', 1, 3),('Zootopia', 1, 4),('Moana', 4, 4);
DELETE FROM studio WHERE studio_id = 4;
SELECT title FROM movies LEFT JOIN movie_genre ON movie_genre=movie_genre_id LEFT JOIN studio ON studio=studio_id WHERE genre_name=genreName;