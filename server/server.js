const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const createServer = () => {
  const app = express();

  const corsOptions = { origin: process.env.URL || '*' };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', routes);

  return app;
};

module.exports = { createServer };
