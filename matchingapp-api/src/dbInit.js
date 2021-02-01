//Can follow this structure to create our API https://bezkoder.com/node-js-rest-api-express-mysql/
var config = require('./config.js')
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbconfig);

var sql_conn = connection.connect();

exports.dbConn = sql_conn;
