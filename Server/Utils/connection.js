const mysql2 = require("mysql2");

let conection = mysql2.createPool({
    host : "localhost",
    user : "root",
    password : "12345678",
    database : "project_module4"
})

let database = conection.promise();
module.exports= database