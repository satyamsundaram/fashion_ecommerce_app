const {Pool} = require('pg');

// Get the PostgreSQL connection pool from db.js
const pool = require('../db');  

// Get the subcategories table name
const TABLE_NAME = 'subcategories';

// Create a new subcategory
const createSubcategory = async ({name, category_id}) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
        `INSERT INTO ${TABLE_NAME} (name, category_id) VALUES ($1, $2) RETURNING *`,
        [name, category_id]
        );
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error creating subcategory:', error);
        throw error;
    }
};

// Get all subcategories
const getAllSubcategories = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${TABLE_NAME}`);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error retrieving subcategories:', error);
        throw error;
    }
};

// Get a subcategory by id
const getSubcategory = async(id) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error retrieving subcategory:', error);
        throw error;
    }
};

// Update a subcategory by id
const updateSubcategory = async(id, {name, category_id}) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
        `UPDATE ${TABLE_NAME} SET name = $1, category_id = $2, updated_at = NOW() WHERE id = $3 RETURNING *`,
        [name, category_id, id]
        );
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error updating subcategory:', error);
        throw error;
    }
};

// Delete a subcategory by id
const deleteSubcategory = async(id) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1`, [id]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting subcategory:', error);
        throw error;
    }
};

module.exports = { createSubcategory, getAllSubcategories, getSubcategory, updateSubcategory, deleteSubcategory };