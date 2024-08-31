// routes/genresRouter.js
const { Router } = require("express");
const genresController = require("../controllers/genresController");
const genresRouter = Router();

genresRouter.get("/", genresController.getGenres);
genresRouter.get("/add", genresController.createGenreGet);
genresRouter.post("/add", genresController.createGenrePost);

genresRouter.get("/:genreName", genresController.getGenre);
genresRouter.get("/:genreName/update", genresController.updateGenreGet);
genresRouter.post("/:genreName/update", genresController.updateGenrePost);

genresRouter.get("/:genreName/delete", genresController.deleteGenreGet);


module.exports = genresRouter;