# NodeJS Todo list

This is a simple project to practise node js.

## Used

- NodeJS
- Express.js framework
- JQuery
- AJAX
- MongoDB

## Installation

1. Create a new db using the mongo shell and link it to the project.
2. Create a collection with the name __items__.
3. The documents attributes are __author__ and __body__.
    ex. 
    ```sh
    {
        "_id" : ObjectId("-"),
        "author" : "Author's Name",
        "body" : "Item's Name",
        "__v" : 0
    }
    ```
4. Download to your project directory and commit:
	```sh
	npm install
	```

5. Run:
   ```sh
   node app.js
   ```
   or
   ```sh
   nodemon
   ```


