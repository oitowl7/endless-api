var mysql = require('mysql');

const connectionData = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

exports.connectionData = connectionData;
exports.mysql = mysql;