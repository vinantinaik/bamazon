var inquirer = require("inquirer");
var departments = require("./departments.js");
var clear = require("clear");
clear();
start();

function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"],
            message: "Please select option"

        }
    ]).then(function (answer) {
        //console.log(answer);
        clear();
        switch (answer.menu) {
            case "View Product Sales by Department":
                departments.getProductSalesByDept(start);
                break;
            case "Create New Department":
                addNewDept();
                break;
            case "Exit":
                process.exit();
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

        departments.createDepartment(newDept.deptName, newDept.overHeadCosts,start);

    })

}