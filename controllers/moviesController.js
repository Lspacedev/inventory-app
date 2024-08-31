const db = require("../db/queries");

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

async function createMoviePost(req, res) {
    const {movieTitle, movie_genre_id, movie_studio_id} = req.body;
    await db.insertMovie(movieTitle, movie_genre_id, movie_studio_id)
    res.redirect("/")
    
}

async function updateMovieGet(req, res) {
    const genres = await db.getAllGenres();
    const studios = await db.getAllStudios();
    const {movieId} = req.params;


    res.render("updateMovie", {movieId:movieId, genres: genres, studios: studios});
}

async function updateMoviePost(req, res) {
    const {movieId} = req.params;
    const {movieTitle, movie_genre_id, movie_studio_id} = req.body;

    const movies = await db.getAllMovies();
    const [movie] = movies.filter((movieObj)=> movieObj.movie_id == movieId);
    let title = movieTitle === ""? movie.title : movieTitle;
    let genre_id = movie_genre_id === ""? movie.movie_genre_id : movie_genre_id;
    let studio_id = movie_studio_id === ""? movie.movie_studio_id : movie_studio_id;



    await db.updateMovie(movieId, title, genre_id, studio_id);
    res.redirect("/");


}

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