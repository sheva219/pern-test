'use strict';
const pool = require('../db/database');

const createOrder = async (req, res) => {
  const { client_id, name } = req.body;
  if (!name || !client_id) {
    res.status(400).json({ error: 'Order name and client id is required' });
  }
  try {
    const order = await pool.query(
      `INSERT INTO orders (client_id, name) VALUES ($1, $2) RETURNING *`,
      [client_id, name]
    );

    res.status(200).json(order.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrdersByClientId = async (req, res) => {
  const { client_id } = req.body;
  if (!client_id) {
    res.status(400).json({ error: 'Client ID is required' });
  }
  try {
    const orders = await pool.query(
      `SELECT * FROM orders WHERE client_id = $1`,
      [client_id]
    );
    res.status(200).json(orders.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        o.id AS order_id,
        o.name AS order_name,
        c.name AS client_name
      FROM
        orders o
      LEFT JOIN
        clients c ON o.client_id = c.id;`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createOrder,
  getOrdersByClientId,
  getAllOrders
};
