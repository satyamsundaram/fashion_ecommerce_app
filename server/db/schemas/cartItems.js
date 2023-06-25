const pool = require("../db");

// create the cartItems table schema definition
const createCartItemsTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS cartItems (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) NOT NULL,
                product_id INTEGER REFERENCES products(id) NOT NULL,
                quantity INTEGER NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created cartItems table");
    } catch (err) {
        console.error("Error creating cartItems table", err);
    }
};

module.exports = {createCartItemsTable};