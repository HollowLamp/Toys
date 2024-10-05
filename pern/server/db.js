const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  database: "pernstack",
  port: "5432"
});

module.exports = pool;