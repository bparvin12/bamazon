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

inquirer.prompt([
    {
        type: "list",
        name: "action",
        message: "What would you like to accomplish today?",
        choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
]).then(function(user) {
    switch (user.action) {
        case "View Products For Sale": viewProducts();
            break;
        case "View Low Inventory": lowInventory();
            break;
        case "Add to Inventory": addInventory();
            break;
        case "Add New Product": newProduct();
            break;
        default: viewProducts();
            break;
    }
});

function viewProducts() {
    // console.log("view products");
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) throw error;
        console.log(results);
    });
    connection.end();
}

function lowInventory() {
    // console.log("low inventory");
    connection.query('SELECT * FROM products WHERE ?',
    [
        {
            stock_quantity: "<=5"
        },
    ],
    function(error, results) {
        if (error) throw error;
        console.log(results);
    });
    connection.end();
}

function addInventory () {
    // console.log("add inventory");
    //which item would you like to add inventory to? 
    inquirer.prompt([
        {
            type: "input",
            message: "Which item would you like to add inventory to (use product ID number)?",
            name: "addInventory",
        }
    ]).then(function(user) {
        console.log(user.addInventory);
        connection.query('UPDATE products SET stock_quantity = stock_quantity + 10 WHERE ?',
        [
            {
                item_id: user.addInventory
            }
        ],
        function(error, results) {
            if (error) throw error;
            connection.query('SELECT * FROM products', function(err, res) {
                if (error) throw error;
                console.log(res);
                connection.end();
            })
        })
        
    })
    
    
}

function newProduct () {
    // console.log("new product");
    inquirer.prompt([
        {
            type: "input",
            message: "What item would you like to add to your store?",
            name: "newProduct"
        },
        {
            type: "input",
            message: "What department will this item belong in?",
            name: "department"
        },
        {
            type: "input",
            message: "How much would you like to sell this item for?",
            name: "price"
        },
        {
            type: "input",
            message: "How many of this item do you have in stock?",
            name: "stock"
        }
    ]).then(function(results) {
        // console.log(results);
        // console.log(results.newProduct);
        var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?";
        var values = 
        [
            [results.newProduct, results.department, results.price, results.stock]
        ];
        connection.query(sql, [values], function(err, res) {
            if (err) throw err;
            console.log("Congrats! Your store is expanding, you just added another item to sell!");
            console.log(res);
            connection.end();
        });
    });
}