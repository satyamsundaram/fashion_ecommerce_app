const pool = require("../db");

// create the products table schema definition
const createProductsTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
                description TEXT,
                category_id INT REFERENCES categories(id),
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created products table");
    } catch (err) {
        console.error("Error creating products table", err);
    }
};

module.exports = {createProductsTable};