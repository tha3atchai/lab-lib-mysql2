require("dotenv").config();
const mysql = require("mysql2/promise");

const password = process.env.PASSWORD;
module.exports = mysql.createPool({
    host: "localhost",
    user: "root",
    password,
    database: "mysql_todo_list",
    connectionLimit: 20,
});


