// app.js
const express = require("express");
const app = express();
const path = require('node:path');

const indexRouter = require("./routes/indexRouter");
const moviesRouter = require("./routes/moviesRouter");
const genresRouter = require("./routes/genresRouter");
const studiosRouter = require("./routes/studiosRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRouter);
app.use("/movies", moviesRouter);
app.use("/genres", genresRouter);
app.use("/studios", studiosRouter);
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));