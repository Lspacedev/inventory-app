const db = require("../db/queries");

//validation
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 25 characters.";

const validateGenre = [
  body("genreName").trim()
    .isAlpha().withMessage(`Genre Name ${alphaErr}`)
    .isLength({ min: 1, max: 25 }).withMessage(`Genre Name ${lengthErr}`),
];


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

 const createGenrePost = [validateGenre, async(req, res) =>{
    const errors = validationResult(req);
    const genres = await db.getAllGenres();

    if (!errors.isEmpty()) {
        return res.status(400).render("genreForm", {
          title: "Add genre",
          errors: errors.array(),
          genres: genres, 
          
        });
      }
    const {genreName} = req.body;
    await db.insertGenre(genreName)
    res.redirect("/");
    
}]

async function updateGenreGet(req, res) {
    const {genreName} = req.params;


    res.render("updateGenre", {genreName: genreName});
}

const updateGenrePost= [validateGenre, async(req, res) =>{
    const {genreName} = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("updateGenre", {
          title: "Update genre",
          errors: errors.array(),
          genreName:genreName
        });
      }
  

    const genreNameUpdate = req.body.genreName;

    const genres = await db.getAllGenres();
    const [genre] = genres.filter((genreObj)=> genreObj.genre_name == genreName);
    let genName = genreNameUpdate === ""? genre.genre_name : genreNameUpdate;
  
    await db.updateGenre(genre.movie_genre_id, genName);
    res.redirect("/");
}]

async function deleteGenreGet(req, res) {
    const {genreName} = req.params;
    await db.deleteGenre(genreName);
    res.redirect("/");


}


async function errorRoute(req, res) {
    res.send("Sorry genre doesn't exist");
    
}


module.exports = { getGenres, getGenre, createGenreGet, createGenrePost,updateGenreGet, updateGenrePost, deleteGenreGet, errorRoute};