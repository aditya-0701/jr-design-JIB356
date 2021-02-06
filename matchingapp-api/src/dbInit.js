//Can follow this structure to create our API https://bezkoder.com/node-js-rest-api-express-mysql/
const config = require('./config.js')
const mysql = require('mysql');
const util = require('util');


var connection = mysql.createConnection(config.dbconfig);
connection.connect();

//Promisifying to avoid callback hell. Can use either async/await or pure promises to run all queries now.
connection.query = util.promisify(connection.query);

module.exports = connection;
