var inquirer = require("inquirer");
var departments = require("./departments.js")

start();

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            choices: ["View Product Sales by Department", "Create New Department"],
            message: "Please select option"

        }
    ]).then(function (answer) {
        //console.log(answer);
        switch (answer.menu) {
            case "View Product Sales by Department":
                departments.getDepartments();
                break;
            case "Create New Department":
                addNewDept();
                break;
            default:
                break;
        }
    })
}

function addNewDept() {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "Department Name?"
        },
        {
            type: "input",
            name: "overHeadCosts",
            message: "over head costs?"
        }

    ]).then(function (newDept) {

        departments.createDepartment(newDept.deptName, newDept.overHeadCosts);

    })

}