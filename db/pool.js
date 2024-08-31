const { Pool } = require("pg");
require('dotenv').config()
const fs = require('fs');



module.exports = new Pool({
    connectionString: process.env.CONNECTION_STR
});