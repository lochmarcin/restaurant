const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "marcous23",
    host: "localhost",
    port: 52091,
    database: "restaurant"
})

module.exports = pool