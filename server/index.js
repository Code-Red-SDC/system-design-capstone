const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.port || 5000;
const corsOptions = { origin: process.env.URL || '*' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error in server setup');
  }
  console.log(`Server listening on port ${PORT}`);
});
