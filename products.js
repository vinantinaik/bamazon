
var exports = module.exports = {};
var mySqlConnection = require("./connection.js");
var inquirer = require("inquirer");
var connection = new mySqlConnection("bamazon");
var Table = require("easy-table");



/** Read products */
exports.getProducts = function () {
    var sql = "SELECT * FROM products";
    connection.getConnection();

    connection.dbConnection.query(sql, function (err, res) {
        if (err) throw err;
        var t = new Table;
        res.forEach(element => {
            t.cell("Product Id", element.item_id);
            t.cell("Product Name", element.product_name);
            t.cell("Price", element.price);
            t.newRow();
        });
        console.log(t.toString());
        startShopping();
    });


}

function updateProduct(id,originalQty, qty) {
    var sql = "UPDATE products SET ? WHERE?";
    connection.dbConnection.query(sql, [
        {
            stock_quantity: originalQty - qty
        },
        {
            item_id: id
        }
    ], function (err, res) {
        if (err) throw err;

    });
}

/** Read products */
function getProductDetail(id, qty) {
    // console.log(id,qty);
    var sql = "SELECT * FROM products WHERE?";
    // connection.getConnection();


    connection.dbConnection.query(sql, { item_id: id }, function (err, res) {
        if (err) throw err;
        console.log(qty);
        console.log(res[0].stock_quantity);
        if (res[0].stock_quantity >= qty) {
            var t = new Table;
            t.cell("Product Id", res[0].item_id);
            t.cell("Product Name", res[0].product_name);
            t.cell("Total", parseFloat(res[0].price) * parseInt(qty));
            t.newRow();

            console.log(t.toString());
            console.log("Thank you for your order.");
            updateProduct(id, res[0].stock_quantity,qty);

        }
        else {
            console.log("Sorry , we do not have this item in the stock");
        }


    });


}

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
        getProductDetail(answer.itemID, answer.itemQty);

    })
}






