const {Pool} = require("pg");

// create a new PostgreSQL connection pool
const pool = new Pool({
    user: 'fashun',
    host: 'localhost',
    database: 'fashun',
    password: process.env.DB_PASSWORD,
    port: 5432
});

// test connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log('Error connecting to the db', err);
    } else {
        console.log('Connected to db');
    }
});

module.exports = pool;