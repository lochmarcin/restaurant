const { Pool } = require("pg");

const pool = new Pool(
  {user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGPASSWORD,
  password: process.env.PGDATABASE,
  port: process.env.PGPORT
}
);
module.exports = {
    query: (text, params) => pool.query(text, params),  
}