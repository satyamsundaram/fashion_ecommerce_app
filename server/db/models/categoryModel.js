const {Pool} = require('pg');

// Get the PostgreSQL connection pool from db.js
const pool = require('../db');

// Get the categories table name
const TABLE_NAME = 'categories';

// Create a new category
const createCategory = async ({name}) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
        `INSERT INTO ${TABLE_NAME} (name) VALUES ($1) RETURNING *`,
        [name]
        );
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Get all categories
const getAllCategories = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${TABLE_NAME}`);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error retrieving categories:', error);
        throw error;
    }
};

// Get a category by id
const getCategory = async(id) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error retrieving category:', error);
        throw error;
    }
};

// Update a category by id
const updateCategory = async(id, {name}) => {
    try {
        const client = await pool.connect();
        const result = await client.query(
        `UPDATE ${TABLE_NAME} SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
        [name, id]
        );
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Delete a category by id
const deleteCategory = async(id) => {
    try {
        const client = await pool.connect();
        const result = await client.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1`, [id]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

module.exports = { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory };