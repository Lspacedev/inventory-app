const db = require("../db/queries");

async function getStudios (req, res) {
    const studios = await db.getAllStudios();
   
    res.render("studios", {studios: studios})

}

async function getStudio (req, res) {
    const {studioName} = req.params;
    const studioMovies = await db.getStudioMovies(studioName);
    
    res.render("studio", {studioName:studioName,studioMovies: studioMovies})
}

async function createStudioGet(req, res) {
    const studios = await db.getAllStudios();

    res.render("studioForm", {studios: studios});
}

async function createStudioPost(req, res) {
    const {studioName} = req.body;
    await db.insertStudio(studioName)
    res.redirect("/");
    
}

async function updateStudioGet(req, res) {
    const {studioName} = req.params;


    res.render("updateStudio", {studioName: studioName});
}

async function updateStudioPost(req, res) {
    const {studioName} = req.params;
    const {studioNameUpdate} = req.body;

    const studios = await db.getAllStudios();
    const [studio] = studios.filter((studioObj)=> studioObj.studio_name == studioName);
    let stuName = studioNameUpdate === ""? studio.studio_name : studioNameUpdate;
  
    await db.updateStudio(studio.studio_id, stuName);
    res.redirect("/");
}

async function deleteStudioGet(req, res) {
    const {studioName} = req.params;
    await db.deleteStudio(studioName);
    res.redirect("/");


}


async function errorRoute(req, res) {
    res.send("Sorry studio doesn't exist");
    
}


module.exports = { getStudios, getStudio, createStudioGet, createStudioPost,updateStudioGet, updateStudioPost, deleteStudioGet, errorRoute};