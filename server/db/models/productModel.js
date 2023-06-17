const {Pool} = require('pg');

// Get the PostgreSQL connection pool from db.js
const pool = require('../db');

// Get the products table name
const TABLE_NAME = 'products';

// Create a new product
const createProduct = async ({name, price, description, category_id}) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
        `INSERT INTO ${TABLE_NAME} (name, price, description, category_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, price, description, category_id]
        );
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

// Get all products
const getAllProducts = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${TABLE_NAME}`);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error retrieving products:', error);
        throw error;
    }
};

// Get a product by id
const getProduct = async(id) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error retrieving product:', error);
        throw error;
    }
};

// Update a product by id
const updateProduct = async(id, {name, price, description, category_id}) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
        `UPDATE ${TABLE_NAME} SET name = $1, price = $2, description = $3, category_id = $4, updated_at = NOW() WHERE id = $5 RETURNING *`,
        [name, price, description, category_id, id]
        );
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Delete a product by id
const deleteProduct = async(id) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1`, [id]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct };