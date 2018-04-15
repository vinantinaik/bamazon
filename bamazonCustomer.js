
var products = require("./products.js")





viewbamazonProducts();

// function startShopping() {
//     console.log("Let's shop");
//     inquirer.prompt([{
//         type: "input",
//         name: "itemID",
//         message: "Please type item id you want to purchase\n"

//     }]).then(function (answer) {
//         console.log(answer.itemID);
//     })
// }

function viewbamazonProducts() {

    products.getProducts();
   
    //startShopping();



}