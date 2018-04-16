var exports = module.exports = {};
var mySqlConnection = require("./connection.js");
var connection = new mySqlConnection("bamazon");
var Table = require("easy-table");

/**Create new department */
exports.createDepartment = function (dept_name, over_head_costs) {
    var sql = "INSERT INTO departments SET?";
    connection.getConnection();
    connection.dbConnection.query(sql, {
        department_name: dept_name,
        over_head_costs: over_head_costs
    }, function (err, res) {
        if (err) throw err
        exports.getDepartments();
    })

}


exports.getDepartments = function () {
    var sql = "SELECT * FROM departments";
    connection.getConnection();
    connection.dbConnection.query(sql, function (err, res) {
        if (err) throw err
        var t = new Table;
        res.forEach(element => {
            t.cell("Department Id", element.department_id);
            t.cell("Department Name", element.department_name);
            t.cell("Over Head Costs", element.over_head_costs);
            t.newRow();
        });
        console.log(t.toString());

    })


}
