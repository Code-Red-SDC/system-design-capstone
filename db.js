const { Pool } = require('pg');

const poolConfig = process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnAuthorized: false,
  },
} : {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: '5432',
  database: 'products',
};

const pool = new Pool(poolConfig);

module.exports = { pool };
