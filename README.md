# Bamazon Project 

## Overview
In this project, I created an open source relational database management system using MySQL. Combining JavaScript, Node, and MySQL I was able to create a database that contains a list of 10 items with the following info about each item:
  - Item Id
  - Product Name 
  - Department Name
  - Price 
  - Stock Quantity 

In MySQL, the database table looks as follows: 

![Image of MySQL WorkBench Table](images/mysql.png)

In the .sql file the original quantities were set to 40, but as users bought items using Node, a function was created to dynamically substract the quantity of the item available from the database. 

### Steps of the Project
1.  
By typing the following code in a node terminal: 
```
node bamazonCustomer.js
```
the list of ten items inputted into the database appears in the terminal as shown: 

![Image of Items Shown to User in Terminal](images/listofitems.png)

2. 
Inquirer then prompts the user to select which item they would like to buy using the Product ID number, and secondly how many units of that item they would like to buy. Once the user answers the questions, the item and the quantity is displayed in their cart. The total amount due is also diplayed in the terminal, and remianing number of items left in store are also shown in the terminal. 
  - Item 10 (which corresponds to the Tide Pods) was selected at a quantity of 1

![Image of Inquirer Prompts and Total Price](images/inquirer.png)

3. 
Looking back at the MySQl workbench, the quantity of Item 10 decreased by one based on step 2. The previous quantity was at 39 shown in "Image of MySQL WorkBench Table". The new quantity is shown below: 

![MySQL WorkBench Quantity Decreased](images/quantity.png)

4. 
Additionally, when an item runs out in the store the console prompts the user: 

![Out of Stock](images/outofstock.png)