const db = require("../db/queries");

async function getGenres (req, res) {
    const genres = await db.getAllGenres();
   
    res.render("genres", {genres: genres})
}

async function getGenre (req, res) {
    const {genreName} = req.params;
    const genreMovies = await db.getGenreMovies(genreName);
    res.render("genre", {genreName:genreName,genreMovies: genreMovies})
}
async function createGenreGet(req, res) {
    const genres = await db.getAllGenres();

    res.render("genreForm", {genres: genres});
}

async function createGenrePost(req, res) {
    const {genreName} = req.body;
    console.log(genreName)
    await db.insertGenre(genreName)
    res.redirect("/");
    
}

async function updateGenreGet(req, res) {
    const {genreName} = req.params;


    res.render("updateGenre", {genreName: genreName});
}

async function updateGenrePost(req, res) {
    const {genreName} = req.params;
    const {genreNameUpdate} = req.body;

    const genres = await db.getAllGenres();
    const [genre] = genres.filter((genreObj)=> genreObj.genre_name == genreName);
    let genName = genreNameUpdate === ""? genre.genre_name : genreNameUpdate;
  
    await db.updateGenre(genre.movie_genre_id, genName);
    res.redirect("/");
}

async function deleteGenreGet(req, res) {
    const {genreName} = req.params;
    await db.deleteGenre(genreName);
    res.redirect("/");


}


async function errorRoute(req, res) {
    res.send("Sorry genre doesn't exist");
    
}


module.exports = { getGenres, getGenre, createGenreGet, createGenrePost,updateGenreGet, updateGenrePost, deleteGenreGet, errorRoute};