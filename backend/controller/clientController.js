'use strict';
const pool = require('../db/database');
const createClient = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO clients (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllClient = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM clients WHERE deleted_at IS NULL'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching clients: ', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createClient,
  getAllClient
};
