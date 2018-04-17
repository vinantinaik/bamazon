
var exports = module.exports = {};
var mySqlConnection = require("./connection.js");
var connection = new mySqlConnection("bamazon");
var Table = require("easy-table");


/**Create new product */

exports.createProduct = function (product_name, price, dept, stock_quantity) {
    var sql = "INSERT INTO products SET?";
    connection.getConnection();
    connection.dbConnection.query(sql, {
        product_name: product_name,
        price: price,
        department_name: dept,
        stock_quantity: stock_quantity
    }, function (err, res) {
        if (err) throw err
        exports.getProducts();
    })

}


/** Read products */
exports.getProducts = function (callback) {
    var sql = "SELECT * FROM products";
    connection.getConnection();

    connection.dbConnection.query(sql, function (err, res) {
        if (err) throw err;
        var t = new Table;
        res.forEach(element => {
            t.cell("Product Id", element.item_id);
            t.cell("Product Name", element.product_name);
            t.cell("Price", element.price);
            t.cell("Qty in Stock", element.stock_quantity);
            t.newRow();
        });
        console.log(t.toString());
        // connection.endConnection();

        // console.log("I am in second function"); 
        if (callback) {

            return callback(null)
        }

    });


}

exports.updateInventory = function (id, oroginalQty, qty, product_sales, addFlag) {

    var finalQty = 0

    if (addFlag) {
        finalQty = parseInt(oroginalQty) + parseInt(qty);

    }
    else {
        finalQty = oroginalQty - qty;
    }
    var sql = "UPDATE products SET ? WHERE?";
    connection.getConnection();
    connection.dbConnection.query(sql, [
        {
            stock_quantity: finalQty,
            product_sales: product_sales
        },
        {
            item_id: id
        }
    ], function (err, res) {
        if (err) throw err;


    });
}

/**Low inventrory */
exports.getLowInventory = function (qty) {
    // console.log(id,qty);
    var sql = "SELECT * FROM products WHERE stock_quantity < 6";
    connection.getConnection();


    connection.dbConnection.query(sql,
        function (err, res) {
            if (err) throw err;

            var t = new Table;
            res.forEach(element => {
                t.cell("Product Id", element.item_id);
                t.cell("Product Name", element.product_name);
                t.cell("Price", element.price);
                t.cell("Qty in Stock", element.stock_quantity);
                t.newRow();
            });
            console.log(t.toString());
        });


}

/** Read products */
exports.getProductDetail = function (id, qty, flag) {
    // console.log(id,qty);
    var sql = "SELECT * FROM products WHERE?";
    connection.getConnection();


    connection.dbConnection.query(sql, { item_id: id }, function (err, res) {
        if (err) throw err;

        if (flag) {

            exports.updateInventory(id, res[0].stock_quantity, qty,0, flag);
        }
        else {
            var product_sales =0;
            if (res[0].stock_quantity >= qty) {
                var t = new Table;
                product_sales = parseFloat(res[0].product_sales) + qty,parseFloat(res[0].price) * parseInt(qty)
                t.cell("Product Id", res[0].item_id);
                t.cell("Product Name", res[0].product_name);
                t.cell("Total", parseFloat(res[0].price) * parseInt(qty));
                t.newRow();

                console.log(t.toString());
                console.log("Thank you for your order.");

                exports.updateInventory(id, res[0].stock_quantity,product_sales , flag);

            }
            else {
                console.log("Sorry , we do not have this item in the stock");
            }
        }



    });


}







