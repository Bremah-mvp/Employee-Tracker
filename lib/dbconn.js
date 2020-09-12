const mysql = require("mysql");

// create db connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Employeesmgt_DB"

});

// open mysql connection
connection.connect(error => {
    if(error) throw error;
    // console.log("successfully connected to DB");

    
});

module.exports = connection;

