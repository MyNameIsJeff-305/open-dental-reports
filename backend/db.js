require("dotenv").config();
const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,   // MySQL server host
  user: process.env.DB_USER,   // MySQL username
  password: process.env.DB_PASS, // MySQL password
  database: process.env.DB_NAME, // MySQL database name
  waitForConnections: true,
  connectionLimit: 10,  // Maximum connections
  queueLimit: 0,
});

// Convert pool to use promises
const promisePool = pool.promise();

module.exports = promisePool;
