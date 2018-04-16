var inquirer = require("inquirer");
var products = require("./products.js")


start();


function updateProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "productId",
            message: "Product Id?"
        },
        {
            type: "input",
            name: "productQty",
            message: "Product Qty?"
        }

    ]).then(function (product) {

        products.getProductDetail(product.productId, product.productQty, true);

    })

}

function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "productName",
            message: "Product Name?"
        },
        {
            type: "input",
            name: "productPrice",
            message: "Product Price?"
        },
        {
            type: "input",
            name: "productDept",
            message: "Product Department?"
        },
        {
            type: "input",
            name: "productQty",
            message: "Product stock?"
        }
    ]).then(function (newProduct) {

        products.createProduct(newProduct.productName, newProduct.productPrice, newProduct.productDept, newProduct.productQty);

    })

}
function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "Please select option"

        }
    ]).then(function (answer) {
        //console.log(answer);
        switch (answer.menu) {
            case "View Products for Sale":
                products.getProducts();
                break;
            case "View Low Inventory":
                products.getLowInventory(5);
                break;
            case "Add to Inventory":
                products.getProducts(updateProduct)
                break;
            case "Add New Product":
                addNewProduct();
                break;
            default:
                break;
        }
    })
}