-- Drops the bamazon_db -- 
DROP DATABASE IF EXISTS bamazon_db;
-- creates database -- 
CREATE DATABASE bamazon_db;
-- everything under this will use the bamazon database--
USE bamazon_db; 

CREATE TABLE products (
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL, 
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(40) NOT NULL, 
    price DECIMAL(6, 2),
    stock_quantity INTEGER(3) NOT NULL,
    PRIMARY KEY (item_id)
);
-- 1 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose Solo 5 TV Sound System", "Electronics", 199.00, 40);
-- 2 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toshiba 50-Inch 4k Ultra HD Smart LED TV", "Electronics", 329.00, 40);
-- 3 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot(2nd Generation) - Smart Speaker with Alexa", "Electronics", 19.99, 40);
-- 4 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NIKE Performance Cushion Crew Training Socks (3 Pairs)", "Clothing", 9.80, 40);
-- 5 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Dead Redemption II", "Games", 59.88, 40);
-- 6 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("'Becoming' by Michelle Obama", "Books", 18.38, 40);
-- 7 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gillette Fusion5 ProGlide Men's Razor Blades", "Beauty & Personal Care", 25.17, 40);
-- 8 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("STANLEY 65 Piece Homeownder's DIY Tool Kit", "Tools & Home Improvement", 45.99, 40);
-- 9 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Muscle Milk Pro Series Protein Shake", "Sports Nutrition", 23.67, 40);
-- 10 --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tide PODS 3 in 1 HE Turbo Laundry Detergent Pacs", "Laundry", 19.97, 40);