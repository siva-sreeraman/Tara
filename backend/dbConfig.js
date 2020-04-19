const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 100,
  port: "3306",
  host: "database-1.cjxz8c5b9z40.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "taradatabase",
  database: "taradatabase",
  debug: false,
  multipleStatements: true,
});

module.exports = pool;
