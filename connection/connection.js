const mysql = require('mysql2');
require('dotenv').config()
const connection = mysql.createConnection({
    host: process.env.DB_Host,
    user: process.env.DB_User,
    password:process.env.DB_password,
    port:process.env.DB_Port,
    database:process.env.DB

})
module.exports = connection


