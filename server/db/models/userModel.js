const { Pool } = require('pg');

// Get the PostgreSQL connection pool from db.js
const pool = require('../db');

// Get the users table name
const TABLE_NAME = 'users';

// Create a new user
const createUser = async ({name, email, password}) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO ${TABLE_NAME} (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${TABLE_NAME}`);
    client.release();
    return result.rows;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

// Get a user by id
const getUser = async(id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [id]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
};

// Update a user by id
const updateUser = async(id, {name, email, password}) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `UPDATE ${TABLE_NAME} SET name = $1, email = $2, password = $3, updated_at = NOW() WHERE id = $4 RETURNING *`,
      [name, email, password, id]
    );
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user by id
const deleteUser = async(id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`DELETE FROM ${TABLE_NAME} WHERE id = $1`, [id]);
    client.release();
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = { createUser, getAllUsers, getUser, updateUser, deleteUser };
