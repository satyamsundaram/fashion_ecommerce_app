const pool = require("../db");

// create the orders table schema definition
const createOrdersTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) NOT NULL,
                order_status VARCHAR(255) NOT NULL,
                order_total DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created orders table");
    } catch (err) {
        console.error("Error creating orders table", err);
    }
};

module.exports = {createOrdersTable};