const pool = require("../db");

// create the users table schema definition
const createUsersTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created users table");
    } catch (err) {
        console.error("Error creating users table", err);
    }
};

module.exports = {createUsersTable};