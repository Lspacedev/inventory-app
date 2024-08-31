const db = require("../db/queries");

//validation
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 25 characters.";

const validateMovie = [
  body("movieTitle").trim()
    .isAlpha().withMessage(`Movie Title ${alphaErr}`)
    .isLength({ min: 1, max: 25 }).withMessage(`Movie Title ${lengthErr}`),
];


async function getMovies (req, res) {
    const movies = await db.getAllMovies();
    res.render("movies", {title: "Movies", movies: movies});
}

async function getMovie (req, res) {
    const {movieId} = req.params;
    const movies = await db.getAllMovies();
    const [movie] = movies.filter((movieObj)=> movieObj.movie_id == movieId);
    res.render("movie", {title: "Movie", movie: movie});
}

async function createMovieGet(req, res) {
    const genres = await db.getAllGenres();
    const studios = await db.getAllStudios();


    res.render("movieForm", {genres: genres, studios: studios});
}

const createMoviePost = [validateMovie, async (req, res) => {
    const errors = validationResult(req);
    const genres = await db.getAllGenres();
    const studios = await db.getAllStudios();

    
    if (!errors.isEmpty()) {
      return res.status(400).render("movieForm", {
        title: "Add movie",
        errors: errors.array(),
        genres: genres, 
        studios: studios
      });
    }
    const {movieTitle, movie_genre_id, movie_studio_id} = req.body;
    await db.insertMovie(movieTitle, movie_genre_id, movie_studio_id)
    res.redirect("/")
    
}]

async function updateMovieGet(req, res) {
    const genres = await db.getAllGenres();
    const studios = await db.getAllStudios();
    const {movieId} = req.params;


    res.render("updateMovie", {movieId:movieId, genres: genres, studios: studios});
}

const updateMoviePost = [validateMovie, async (req, res)=> {
    const {movieId} = req.params;
    const errors = validationResult(req);
    const genres = await db.getAllGenres();
    const studios = await db.getAllStudios();
   
    if (!errors.isEmpty()) {
      return res.status(400).render("updateMovie", {
        title: "Update movie",
        errors: errors.array(),
        movieId:movieId,
        genres: genres, 
        studios: studios
      });
    }

    const {movieTitle, movie_genre_id, movie_studio_id} = req.body;

    const movies = await db.getAllMovies();
    const [movie] = movies.filter((movieObj)=> movieObj.movie_id == movieId);
    let title = movieTitle === ""? movie.title : movieTitle;
    let genre_id = movie_genre_id === ""? movie.movie_genre_id : movie_genre_id;
    let studio_id = movie_studio_id === ""? movie.movie_studio_id : movie_studio_id;

    await db.updateMovie(movieId, title, genre_id, studio_id);
    res.redirect("/");


}]

async function errorRoute(req, res) {
    res.send("Sorry movie doesn't exist");
}

async function deleteMovieGet(req, res) {
    const {movieId} = req.params;
    console.log(movieId)
    await db.deleteMovie(movieId);
    res.redirect("/");


}


module.exports = { getMovies, getMovie, createMovieGet, createMoviePost,updateMovieGet, updateMoviePost, deleteMovieGet, errorRoute};