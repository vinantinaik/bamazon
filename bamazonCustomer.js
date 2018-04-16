
var products = require("./products.js");
var inquirer = require("inquirer");



viewbamazonProducts(startShopping);

function startShopping() {
    console.log("Let's shop");
    inquirer.prompt([{
        type: "input",
        name: "itemID",
        message: "Please type item id you want to purchase\n"

    },
    {
        type: "input",
        name: "itemQty",
        message: "Please enter quanity of the  item id you want to purchase\n"
    }]).then(function (answer) {
        //console.log(answer.itemQty);
        products.getProductDetail(answer.itemID, answer.itemQty);

    })
}

function viewbamazonProducts(callback) {
    products.getProducts(callback);
}

