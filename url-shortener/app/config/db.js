/**
 * PostgreSQL connection pool
 */

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

// Test connection
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Postgres connection error:", err));

module.exports = pool;