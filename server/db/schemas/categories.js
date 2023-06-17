const pool = require("../db");

// create the categories table schema definition
const createCategoriesTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created categories table");
    } catch (err) {
        console.error("Error creating categories table", err);
    }
};

module.exports = {createCategoriesTable};