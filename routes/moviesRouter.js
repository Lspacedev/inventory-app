// routes/moviesRouter.js
const { Router } = require("express");
const moviesController = require("../controllers/moviesController");
const moviesRouter = Router();

moviesRouter.get("/", moviesController.getMovies);

moviesRouter.get("/add", moviesController.createMovieGet);
moviesRouter.post("/add", moviesController.createMoviePost);

moviesRouter.get("/:movieId", moviesController.getMovie);

moviesRouter.get("/:movieId/update", moviesController.updateMovieGet);
moviesRouter.post("/:movieId/update", moviesController.updateMoviePost);

moviesRouter.get("/:movieId/delete", moviesController.deleteMovieGet);



//moviesRouter.all("/:*", moviesController.errorRoute);
;
module.exports = moviesRouter;