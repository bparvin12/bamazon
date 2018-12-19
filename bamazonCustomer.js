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
    //shows list of the ten items hard coded into mysql
    console.log("\n\nHere is a list of items available in store today!");
    for (i = 0; i < 10; i++) {
        console.log(
            "-----------------------------------\n" +
            "Product ID: " + results[i].item_id +
            "\nProduct: " + results[i].product_name +
            "\nPrice: $" + results[i].price +
            "\n-----------------------------------");
    }
    questions();
});
//this function brings up inqurier 
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
        connection.query('SELECT * FROM products WHERE ?',
            [
                {
                    item_id: user.productid
                },
            ],
            function (error, results) {
                console.log("----------------------------------------");
                console.log("Item in cart: " + results[0].product_name);
                console.log("Quantity desired: " + user.quantity);
                console.log("----------------------------------------");
                var idNum = results[0].item_id;

                if (user.quantity > results[0].stock_quantity) {
                    console.log("I am sorry, but we do not have enough of this item in stock.");
                    connection.end();
                } else {
                    var newQuantity = parseInt(results[0].stock_quantity) - parseInt(user.quantity);
                    console.log("You are buying (" + user.quantity + ") " + results[0].product_name
                        + ". \nYour total amount due is: $" + results[0].price * user.quantity +
                        "\nThere are only " + newQuantity + " of this item left!" +
                        "\n------------------------------");
                    
                    substractFromDatabase(newQuantity, idNum);
                    
                }
            });
    });
}


function substractFromDatabase(amazonQuantity, amazonID) {
    var query = connection.query('UPDATE products SET ? WHERE ?',
        [
            {
                stock_quantity: amazonQuantity
            },
            {
                item_id: amazonID
            }
        ],
        function (results) {
            connection.end();
        }
    );
};









