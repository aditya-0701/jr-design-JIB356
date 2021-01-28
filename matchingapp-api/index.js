//Can follow this structure to create our API https://bezkoder.com/node-js-rest-api-express-mysql/
var config = require('./config.js')
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbconfig);

connection.connect();
connection.query('SELECT * FROM Students', (error, result, fields) => {
    if (error) {
        console.error(error);
    }
    console.log(result);
    console.log(`Fields: ${fields}`)
});

connection.end();
