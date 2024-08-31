const { Pool } = require("pg");
require('dotenv').config()
const fs = require('fs');



module.exports = new Pool({
    connectionString: process.env.CONNECTION_STR
    /*host: "localhost", // or wherever the db is hosted
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASS,
    port: 5432 // The default port*/
});