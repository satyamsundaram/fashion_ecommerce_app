const pool = require("../db");

// create the cartItems table schema definition
const createOrderItemsTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS orderItems (
                id SERIAL PRIMARY KEY,
                order_id INTEGER REFERENCES orders(id) NOT NULL,
                product_id INTEGER REFERENCES products(id) NOT NULL,
                quantity INTEGER NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created orderItems table");
    } catch (err) {
        console.error("Error creating orderItems table", err);
    }
};

module.exports = {createOrderItemsTable};