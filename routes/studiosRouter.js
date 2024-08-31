// routes/studiosRouter.js
const { Router } = require("express");
const studiosController = require("../controllers/studiosController");
const studiosRouter = Router();

studiosRouter.get("/", studiosController.getStudios);
studiosRouter.get("/add", studiosController.createStudioGet);
studiosRouter.post("/add", studiosController.createStudioPost);
studiosRouter.get("/:studioName", studiosController.getStudio);
studiosRouter.get("/:studioName/update", studiosController.updateStudioGet);
studiosRouter.post("/:studioName/update", studiosController.updateStudioPost);

studiosRouter.get("/:studioName/delete", studiosController.deleteStudioGet);
//studiosRouter.all("/:*", studiosController.errorRoute);
;
module.exports = studiosRouter;