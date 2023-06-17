const pool = require("../db");

// create the addresses table schema definition
const createAddressesTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS addresses (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) NOT NULL,
                street VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                state VARCHAR(255) NOT NULL,
                zip_code VARCHAR(20) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created addresses table");
    } catch (err) {
        console.error("Error creating addresses table", err);
    }
};

module.exports = {createAddressesTable};