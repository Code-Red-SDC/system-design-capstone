const express = require('express');
const cors = require('cors');
const { pool } = require('./db');

const app = express();
const PORT = process.env.port || 5000;
const corsOptions = { origin: process.env.URL || '*' };

app.use(cors(corsOptions));
app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error in server setup');
  }
  console.log(`Server listening on port ${PORT}`);
});
