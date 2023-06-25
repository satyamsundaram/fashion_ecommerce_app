const pool = require("../db");

// create the userPhoneNumbers table schema definition
const createUserPhoneNumbersTable = async () => {
    try {
        const client = await pool.connect();
        await client.query(`
            CREATE TABLE IF NOT EXISTS userPhoneNumbers (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) NOT NULL,
                phone_number VARCHAR(255) NOT NULL,
                country_code VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `);
        client.release();
        console.log("Created userPhoneNumbers table");
    } catch (err) {
        console.error("Error creating userPhoneNumbers table", err);
    }
};

module.exports = {createUserPhoneNumbersTable};