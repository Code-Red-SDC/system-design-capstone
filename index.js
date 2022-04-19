const express = require('express');
const cors = require('cors');
// import pool from './db.js';

const app = express();
const PORT = process.env.port || 5000;
const corsOptions = { origin: process.env.URL || '*' };

app.use(cors(corsOptions));
app.use(express.json());

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error in server setup');
  }
  console.log(`Server listening on port ${PORT}`);
});
