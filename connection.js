
var mysql = require("mysql");

module.exports = function Connection(database) {
    this.database = database;


    this.dbConnection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: this.database
    })


    this.getConnection = function () {

        this.dbConnection.connect(function (err) {
            if (err) throw err;
           // return this.connection;
        })

    }


}



