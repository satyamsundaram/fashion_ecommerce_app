const pool = require("../db");

// create the subCategories table schema definition
const createSubcategoriesTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS subcategories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category_id INT REFERENCES categories(id),
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created subcategories table");
    } catch (err) {
        console.error("Error creating subcategories table", err);
    }
};

module.exports = {createSubcategoriesTable};