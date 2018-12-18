var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon_db'
});

connection.connect();

//starting connect and grabbing everything from products table in bamazon database
connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    console.log("\n\nHere is a list of items available in store today!");
    for (i = 0; i < 10; i++) {
        console.log(
            "-----------------------------------\n" +
            "Product ID: " + results[i].item_id +
            "\nProduct: " + results[i].product_name +
            "\nPrice: $" + results[i].price) +
            "\n-----------------------------------";
    }

    questions = function () {

        inquirer.prompt([
            {
                type: "input",
                message: "Which item would you like to buy today (Use the Product ID Number)?",
                name: "productid"
            },
            {
                type: "input",
                message: "How many units would you like to buy?",
                name: "quantity"
            },
        ]).then(function (user) {
            var idNum = user.productid
            console.log("----------------------------------------");
            console.log("Item in cart: " + results[idNum - 1].product_name);
            console.log("Quantity desired: " + user.quantity);
            console.log("----------------------------------------");
            if (user.quantity > results[idNum - 1].stock_quantity) {
                console.log("I am sorry, but we do not have enough of this item in stock.")
            } else {
                console.log("You are buying (" + user.quantity + ") " + results[idNum - 1].product_name
                    + ". \nYour total amount due is: $" + results[idNum - 1].price * user.quantity +
                    "\n------------------------------");
                var newQuantity = parseInt(results[idNum - 1].stock_quantity) - parseInt(user.quantity);
                substractFromDatabase(newQuantity, idNum);
            }
        });
    }
    questions();
});

function substractFromDatabase(amazonQuantity, amazonID) {
    var query = connection.query('UPDATE products SET ? WHERE ?',
        [
            {
                stock_quantity: amazonQuantity
            },
            {
                item_id: amazonID - 1
            }
        ],
        function (error, results) {
            // if (error) throw error;
            console.log(query.sql);
            connection.end();
        }
    );
};







