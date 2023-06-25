const pool = require("../db");

// create the productImages table schema definition
const createProductImagesTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS productImages (
                id SERIAL PRIMARY KEY,
                product_id INTEGER REFERENCES products(id) NOT NULL,
                image_url VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created productImages table");
    } catch (err) {
        console.error("Error creating productImages table", err);
    }
};

module.exports = {createProductImagesTable};