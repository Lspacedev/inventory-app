const pool = require("./pool");

async function getAllMovies() {

  const { rows } = await pool.query("SELECT movie_id, movie_genre_id, studio_id, title, genre_name, studio_name FROM movies LEFT JOIN movie_genre ON movie_genre=movie_genre_id LEFT JOIN studio ON studio=studio_id;");
  return rows;
}

async function insertMovie(movieTitle, movie_genre_id, movie_studio_id) {
  await pool.query("INSERT INTO movies (title, movie_genre, studio) VALUES ($1, $2, $3)", [movieTitle, movie_genre_id, movie_studio_id]);
}


async function updateMovie(movieId, movieTitle, movie_genre_id, movie_studio_id) {
  await pool.query("UPDATE movies SET title=$1, movie_genre=$2, studio=$3 WHERE movie_id=$4", [movieTitle, movie_genre_id, movie_studio_id, movieId]);
}

async function deleteMovie(movieId) {
  await pool.query("DELETE FROM movies WHERE movie_id=$1", [movieId]);
}


async function getAllGenres() {

    const { rows } = await pool.query("SELECT * FROM movie_genre");
    return rows;
  }
  
async function getGenreMovies(genreName) {
  const {rows} = await pool.query(`SELECT title, movie_id FROM movies LEFT JOIN movie_genre ON movie_genre=movie_genre_id LEFT JOIN studio ON studio=studio_id WHERE genre_name='${genreName}'`)
  return rows;
}

async function insertGenre(genreName) {
  await pool.query("INSERT INTO movie_genre (genre_name) VALUES ($1)", [genreName]);
}

async function updateGenre(genre_id, genreName) {
  await pool.query("UPDATE movie_genre SET genre_name=$1 WHERE movie_genre_id=$2", [genreName, genre_id]);
}

async function deleteGenre(genreName) {
  await pool.query("DELETE FROM movie_genre WHERE genre_name=$1", [genreName]);
}


async function getAllStudios() {

  const { rows } = await pool.query("SELECT * FROM studio");
  return rows;
}


async function getStudioMovies(studioName) {
const {rows} = await pool.query(`SELECT title, movie_id  FROM movies LEFT JOIN movie_genre ON movie_genre=movie_genre_id LEFT JOIN studio ON studio=studio_id WHERE studio_name='${studioName}'`)
return rows;
}

async function insertStudio(studioName) {
  await pool.query("INSERT INTO studio (studio_name) VALUES ($1)", [studioName]);
}

async function updateStudio(studio_id, studioName) {
  await pool.query("UPDATE studio SET studio_name=$1 WHERE studio_id=$2", [studioName,studio_id]);
}

async function deleteStudio(studioName) {
  await pool.query("DELETE FROM studio WHERE studio_name=$1", [studioName]);
}


module.exports = {
    getAllMovies,
    insertMovie,
    updateMovie,
    deleteMovie,
    getAllGenres,
    getGenreMovies,
    insertGenre,
    updateGenre,
    deleteGenre,
    getAllStudios,
    getStudioMovies,
    insertStudio,
    updateStudio,
    deleteStudio,
}