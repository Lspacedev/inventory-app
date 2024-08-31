const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 25 characters.";

const validateStudio = [
  body("studioName").trim()
    .isAlpha().withMessage(`Studio Name ${alphaErr}`)
    .isLength({ min: 1, max: 25 }).withMessage(`Studio Name ${lengthErr}`),
];


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

const createStudioPost = [validateStudio, async(req, res)=> {
    const errors = validationResult(req);
    const studios = await db.getAllStudios();
        
    if (!errors.isEmpty()) {
        return res.status(400).render("studioForm", {
          title: "Create studio",
          errors: errors.array(),
          studios: studios
        });
      }

    const {studioName} = req.body;
    await db.insertStudio(studioName)
    res.redirect("/");
    
}]

async function updateStudioGet(req, res) {
    const {studioName} = req.params;


    res.render("updateStudio", {studioName: studioName});
}

const updateStudioPost = [validateStudio, async(req, res) =>{
    const {studioName} = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("updateStudio", {
          title: "Update studio",
          errors: errors.array(),
          studioName: studioName
          
        });
      }
    const studioNameUpdate = req.body.studioName;

    const studios = await db.getAllStudios();
    const [studio] = studios.filter((studioObj)=> studioObj.studio_name == studioName);
    let stuName = studioNameUpdate === ""? studio.studio_name : studioNameUpdate;
  
    await db.updateStudio(studio.studio_id, stuName);
    res.redirect("/");
}];

async function deleteStudioGet(req, res) {
    const {studioName} = req.params;
    await db.deleteStudio(studioName);
    res.redirect("/");


}


async function errorRoute(req, res) {
    res.send("Sorry studio doesn't exist");
    
}


module.exports = { getStudios, getStudio, createStudioGet, createStudioPost,updateStudioGet, updateStudioPost, deleteStudioGet, errorRoute};